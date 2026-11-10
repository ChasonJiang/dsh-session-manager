import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Host-side maintenance endpoint for the Session manager UI.
 *
 * The DSH persistence seam deliberately has no delete API; pruning stored
 * Sessions is documented as out-of-band backend maintenance. This endpoint is
 * therefore deliberately narrow:
 *
 * - only the authenticated owner browses it (the Connection fetch registry
 *   enforces the owner Peer);
 * - only a POST with the manager header and an explicit `confirmed: true`
 *   reaches the maintenance code;
 * - a Session is refused while a live Agent, live Session, or active job still
 *   references it;
 * - the target must match the shipped JSONL backend's project/session layout;
 * - every directory is validated before anything moves, then the directories
 *   are renamed into a sibling trash transaction and only removed after every
 *   rename succeeded. A rename failure rolls the transaction back.
 */

const ROUTE = "/api/session.manager.delete";
const MAX_SESSIONS = 100;
const TRASH_DIRECTORY = ".session-manager-trash";
const LOG_PATTERN = /^session(?:\.v\d+)?\.jsonl(?:\.zstd)?$/;
const MIGRATION_PATTERN = /^session\.migration\.[A-Za-z0-9._-]+\.tmp$/;

/** Services required by the maintenance endpoint. */
export const inject = ["connection", "sessionPersistence", "sessions", "agents", "workspaceRegistry"];

/** The package's Host plugin name, used by the plugin inventory. */
export const name = "session-manager";

/**
 * Register the authenticated deletion route.
 * @param ctx - Host plugin context.
 */
export function apply(ctx) {
	const remove = createDeleter(ctx);
	ctx.effect(
		() =>
			ctx.connection.fetch.register({
				path: ROUTE,
				methods: ["POST"],
				requestBody: "buffered",
				fetch: async (request) => {
					try {
						if (request.headers.get("x-dsh-session-manager") !== "delete") {
							return jsonResponse(400, { ok: false, code: "session/bad-request", message: "Missing session manager request header." });
						}
						if (!/^application\/json\b/i.test(request.headers.get("content-type") ?? "")) {
							return jsonResponse(415, { ok: false, code: "session/bad-request", message: "Expected an application/json request." });
						}
						const body = await request.json();
						if (body === null || typeof body !== "object" || Array.isArray(body)) {
							return jsonResponse(400, { ok: false, code: "session/bad-request", message: "Invalid request body." });
						}
						if (body.confirmed !== true) {
							return jsonResponse(400, { ok: false, code: "session/not-confirmed", message: "Permanent deletion requires explicit confirmation." });
						}
						const ids = body.sessionIds;
						if (
							!Array.isArray(ids) ||
							ids.length === 0 ||
							ids.length > MAX_SESSIONS ||
							ids.some((id) => typeof id !== "string" || id.length === 0 || id.length > 512)
						) {
							return jsonResponse(400, {
								ok: false,
								code: "session/bad-request",
								message: `sessionIds must contain 1-${String(MAX_SESSIONS)} non-empty strings.`,
							});
						}
						const result = await remove(ids);
						return jsonResponse(200, result);
					} catch (error) {
						ctx.logger?.warn?.(`session-manager: delete request failed: ${error instanceof Error ? error.message : String(error)}`);
						return jsonResponse(500, {
							ok: false,
							code: error?.code ?? "session/delete-failed",
							message: error instanceof Error ? error.message : String(error),
							failed: [],
							deleted: [],
							warnings: [],
						});
					}
				},
			}),
		"session-manager: delete route",
	);
}

/**
 * Serialize deletion requests. A maintenance operation must not interleave with
 * another one: the directory validation and rollback bookkeeping assume a
 * stable tree.
 * @param ctx - Host plugin context.
 * @returns queued deletion entry point.
 */
function createDeleter(ctx) {
	let queue = Promise.resolve();
	return (ids) => {
		const next = queue.then(() => deleteSessions(ctx, ids));
		queue = next.catch(() => {});
		return next;
	};
}

/**
 * Delete accepted Session groups.
 * @param ctx - Host plugin context.
 * @param ids - requested root Session ids.
 * @returns deletion result with per-target failures.
 */
async function deleteSessions(ctx, ids) {
	const persistence = ctx.sessionPersistence;
	const configuredRoot = persistence?.root;
	if (typeof configuredRoot !== "string" || configuredRoot.length === 0) {
		const failed = ids.map((sessionId) => failure(sessionId, "session/delete-unsupported", "The mounted Session persistence backend does not expose a deletable root."));
		return { ok: false, deleted: [], failed, warnings: [] };
	}

	const root = await fs.realpath(configuredRoot);
	const snapshots = await persistence.list();
	const byId = new Map(snapshots.map((snapshot) => [snapshot.header.id, snapshot]));
	const children = new Map();
	for (const snapshot of snapshots) {
		if (snapshot.header.origin !== "subagent" || typeof snapshot.header.parentSession !== "string") continue;
		const list = children.get(snapshot.header.parentSession) ?? [];
		list.push(snapshot);
		children.set(snapshot.header.parentSession, list);
	}

	const failed = [];
	const deleted = [];
	const warnings = [];
	const claimed = new Set();

	for (const id of ids) {
		if (claimed.has(id)) continue;
		const snapshot = byId.get(id);
		if (snapshot === undefined) {
			failed.push(failure(id, "session/not-found", "Session no longer exists in stored history."));
			continue;
		}
		if (snapshot.header.origin === "subagent") {
			failed.push(failure(id, "session/delete-subagent", "Delete the parent Session; subagent Sessions are removed with their parent."));
			continue;
		}
		const group = collectGroup(snapshot, children);
		if (group.some((entry) => claimed.has(entry.header.id))) continue;

		const live = group.find((entry) => liveBlock(ctx, entry.header.id) !== undefined);
		if (live !== undefined) {
			const block = liveBlock(ctx, live.header.id);
			failed.push(failure(id, block.code, block.message));
			continue;
		}
		if (liveDescendantExists(ctx, group.map((entry) => entry.header.id))) {
			failed.push(
				failure(
					id,
					"session/descendant-live",
					"A subagent Session is still open. Close it before deleting this parent Session.",
				),
			);
			continue;
		}

		for (const entry of group) claimed.add(entry.header.id);
		try {
			const result = await deleteGroup(ctx, group, root);
			deleted.push(...result.deleted);
			warnings.push(...result.warnings);
		} catch (error) {
			failed.push(failure(id, error?.code ?? "session/delete-failed", error instanceof Error ? error.message : String(error)));
		}
	}

	return { ok: failed.length === 0, deleted, failed, warnings };
}

/**
 * Check whether a Session still has work that should not be deleted underneath.
 * An idle Agent is closable by the maintenance path; a running Agent is not.
 * @param ctx - Host plugin context.
 * @param sessionId - Session id.
 * @returns blocking code and message, or undefined when safe.
 */
function liveBlock(ctx, sessionId) {
	const agent = ctx.agents?.get?.(sessionId);
	if (agent !== undefined && agent.status === "running") {
		return { code: "session/live", message: "The Session is still running. Stop its turn before deleting." };
	}
	const jobs = ctx.get?.("jobs");
	if (jobs !== undefined && typeof jobs.list === "function") {
		try {
			const active = jobs.list(sessionId).filter((job) => job.status === "running" || job.status === "stopping");
			if (active.length > 0) {
				return { code: "session/active-job", message: "A background job owned by this Session is still active." };
			}
		} catch (_error) {
			// A missing job projection is not itself evidence of live work.
		}
	}
	return undefined;
}

/**
 * Detect a live subagent Agent whose parent is inside the deletion group and
 * which therefore is not represented by a persistent artifact in the group.
 * Idle agents on known group members are closed by {@link closeGroupAgents}.
 * @param ctx - Host plugin context.
 * @param groupIds - root plus stored descendant ids.
 * @returns whether an unaccounted live descendant exists.
 */
function liveDescendantExists(ctx, groupIds) {
	const group = new Set(groupIds);
	let agents;
	try {
		agents = ctx.agents?.list?.() ?? [];
	} catch (_error) {
		return true;
	}
	for (const agent of agents) {
		const id = agent?.id;
		const parent = agent?.session?.header?.parentSession;
		if (id !== undefined && group.has(id)) continue;
		if (typeof parent === "string" && group.has(parent)) return true;
	}
	return false;
}

/**
 * Close the idle Host Agents that still hold write handles for a Session group.
 * The loop's scope disposal is the teardown boundary available to a maintenance
 * consumer: it cancels the driver, closes the persistence handle, and detaches
 * the Agent/Session registrations. Running agents were already refused.
 * @param ctx - Host plugin context.
 * @param group - root plus subagent snapshots.
 */
async function closeGroupAgents(ctx, group) {
	for (const entry of group) {
		const id = entry.header.id;
		const agent = ctx.agents?.get?.(id);
		if (agent === undefined) continue;
		if (agent.status === "running") {
			throw codedError("session/live", `Session "${id}" is still running.`);
		}
		const disposeScope =
			typeof agent.scope?.dispose === "function"
				? () => agent.scope.dispose()
				: typeof agent.ctx?.fiber?.dispose === "function"
					? () => Promise.resolve(agent.ctx.fiber.dispose())
					: undefined;
		if (disposeScope === undefined) {
			throw codedError("session/close-failed", `Session "${id}" has a live Agent without a closable scope.`);
		}
		try {
			await withTimeout(disposeScope(), 10000, `Timed out closing the Agent for Session "${id}".`);
		} catch (error) {
			// A concurrent disposal may make scope.dispose() reject after the
			// Agent already detached; accept that state and verify below.
			if (ctx.agents?.get?.(id) !== undefined) {
				throw codedError("session/close-failed", `Could not close the Agent for Session "${id}": ${errorMessage(error)}`);
			}
		}
		await waitUntil(
			() => ctx.agents?.get?.(id) === undefined,
			5000,
			"session/close-failed",
			`The Agent for Session "${id}" did not detach after closing.`,
		);
	}
}

/**
 * Poll a predicate until it is true or the deadline expires.
 * @param predicate - condition to satisfy.
 * @param timeoutMs - maximum wait.
 * @param code - failure code.
 * @param message - failure message.
 */
async function waitUntil(predicate, timeoutMs, code, message) {
	const deadline = Date.now() + timeoutMs;
	for (;;) {
		if (predicate()) return;
		if (Date.now() >= deadline) throw codedError(code, message);
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
}

/**
 * Await a promise with a bounded wait, clearing the timer on either outcome.
 * @param promise - operation to await.
 * @param timeoutMs - maximum wait.
 * @param message - timeout failure message.
 * @returns operation result.
 */
async function withTimeout(promise, timeoutMs, message) {
	let timer;
	try {
		return await Promise.race([
			promise,
			new Promise((_resolve, reject) => {
				timer = setTimeout(() => reject(codedError("session/close-failed", message)), timeoutMs);
			}),
		]);
	} finally {
		clearTimeout(timer);
	}
}

/**
 * Collect a root Session and all of its subagent descendants.
 * @param root - root snapshot.
 * @param children - parent id to direct-subagent rows.
 * @returns root-first group.
 */
function collectGroup(root, children) {
	const group = [root];
	const seen = new Set([root.header.id]);
	for (let index = 0; index < group.length; index += 1) {
		for (const child of children.get(group[index].header.id) ?? []) {
			if (seen.has(child.header.id)) continue;
			seen.add(child.header.id);
			group.push(child);
		}
	}
	return group;
}

/**
 * Delete one root group after validating every directory.
 * @param ctx - Host plugin context.
 * @param group - root plus subagent snapshots.
 * @param root - real persistence root.
 * @returns ids and non-fatal warnings.
 */
async function deleteGroup(ctx, group, root) {
	const plans = await planGroup(group, root);
	const registry = ctx.workspaceRegistry;
	const rootId = group[0].header.id;
	const wasArchived = registry.archivedSessionIds.includes(rootId);
	let archived = false;

	// Descendants are not archived individually, so drop any pin they own
	// before their directories disappear.
	for (const entry of group) {
		if (registry.pinnedSessionIds?.includes(entry.header.id) === true) {
			await registry.unpinSession(entry.header.id).catch(() => {});
		}
	}

	try {
		if (!wasArchived) {
			// Mark the attempt before awaiting: a provider rejection can arrive
			// after the durable archive write, and the failure path must still
			// restore the visible state.
			archived = true;
			await registry.archiveSession(rootId, { stopActivity: true });
		}
		await waitForJobsToSettle(ctx, group);
		await closeGroupAgents(ctx, group);
	} catch (error) {
		if (archived) {
			await registry.unarchiveSession(rootId).catch((reason) => {
				ctx.logger?.warn?.(`session-manager: could not restore archive state for ${rootId}: ${String(reason)}`);
			});
		}
		throw error;
	}

	const warnings = [];
	try {
		const trashRoot = path.join(path.dirname(root), TRASH_DIRECTORY);
		await fs.mkdir(trashRoot, { recursive: true });
		const transaction = await fs.mkdtemp(path.join(trashRoot, "tx-"));
		const moved = [];
		try {
			for (const [index, plan] of plans.entries()) {
				const destination = path.join(transaction, `${String(index).padStart(3, "0")}-${path.basename(plan.directory)}`);
				await fs.rename(plan.directory, destination);
				moved.push({ from: plan.directory, to: destination });
			}
		} catch (error) {
			let rollbackFailed = false;
			for (const entry of moved.reverse()) {
				try {
					await fs.rename(entry.to, entry.from);
				} catch (rollbackError) {
					rollbackFailed = true;
					warnings.push(`Rollback could not restore ${entry.from}: ${errorMessage(rollbackError)}`);
				}
			}
			if (rollbackFailed) {
				throw codedError(
					"session/delete-rollback",
					`Deletion was interrupted and rollback was incomplete. Recover the remaining directories from ${transaction}. ${warnings.join(" ")}`,
				);
			}
			await fs.rm(transaction, { recursive: true, force: true }).catch(() => {});
			throw codedError("session/delete-io", `Could not move the Session artifact: ${errorMessage(error)}`);
		}

		// The Session is no longer addressable through persistence. Remove stale
		// archive/pin bookkeeping so a deleted id cannot become a ghost filter row.
		for (const entry of group) {
			await registry.unarchiveSession(entry.header.id).catch((reason) => {
				warnings.push(`Could not clear archive state for ${entry.header.id}: ${errorMessage(reason)}`);
			});
		}

		try {
			await fs.rm(transaction, { recursive: true, force: true });
		} catch (error) {
			warnings.push(`Deleted Session directories were moved to ${transaction} but cleanup failed: ${errorMessage(error)}`);
		}

		return { deleted: group.map((entry) => entry.header.id), warnings };
	} catch (error) {
		if (archived) {
			await registry.unarchiveSession(rootId).catch(() => {});
		}
		throw error;
	}
}

/**
 * Wait briefly for jobs stopped by archive admission to settle.
 * @param ctx - Host plugin context.
 * @param group - Session group.
 */
async function waitForJobsToSettle(ctx, group) {
	const jobs = ctx.get?.("jobs");
	if (jobs === undefined || typeof jobs.list !== "function") return;
	const deadline = Date.now() + 3000;
	for (;;) {
		const active = group.flatMap((entry) => {
			try {
				return jobs.list(entry.header.id).filter((job) => job.status === "running" || job.status === "stopping");
			} catch (_error) {
				return [];
			}
		});
		if (active.length === 0) return;
		if (Date.now() >= deadline) {
			throw codedError("session/active-job", "A background job owned by this Session did not stop in time.");
		}
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
}

/**
 * Validate all directories before mutating the tree.
 * @param group - Session snapshots.
 * @param root - real persistence root.
 * @returns directories to move.
 */
async function planGroup(group, root) {
	const plans = [];
	const seen = new Set();
	for (const entry of group) {
		const location = entry.location?.path;
		if (typeof location !== "string" || location.length === 0) {
			throw codedError("session/no-artifact", "The Session has no stored log artifact.");
		}
		const directory = path.dirname(location);
		const stats = await fs.lstat(directory);
		if (!stats.isDirectory() || stats.isSymbolicLink()) {
			throw codedError("session/delete-unsafe", "The Session artifact path is not a regular directory.");
		}
		const realDirectory = await fs.realpath(directory);
		if (!isInside(root, realDirectory) || path.relative(root, realDirectory).split(path.sep).filter(Boolean).length !== 2) {
			throw codedError("session/delete-unsafe", "The Session artifact is outside the expected persistence layout.");
		}
		const realFile = await fs.realpath(location);
		if (path.dirname(realFile) !== realDirectory || !LOG_PATTERN.test(path.basename(realFile))) {
			throw codedError("session/delete-unsafe", "The Session log is not a recognized artifact.");
		}

		const entries = await fs.readdir(realDirectory, { withFileTypes: true });
		let hasLog = false;
		for (const artifact of entries) {
			if (!artifact.isFile()) {
				throw codedError("session/delete-unsafe", "The Session directory contains an unexpected non-file entry.");
			}
			if (LOG_PATTERN.test(artifact.name)) {
				hasLog = true;
				continue;
			}
			if (artifact.name === "session.lock" || MIGRATION_PATTERN.test(artifact.name)) continue;
			throw codedError("session/delete-unsafe", `The Session directory contains an unexpected artifact: ${artifact.name}`);
		}
		if (!hasLog) throw codedError("session/no-artifact", "The Session has no recognized stored log.");
		if (seen.has(realDirectory)) throw codedError("session/delete-unsafe", "Two Sessions resolve to the same artifact directory.");
		seen.add(realDirectory);
		plans.push({ directory: realDirectory });
	}
	return plans;
}

/**
 * Whether a path is strictly below another path.
 * @param root - real parent.
 * @param target - real candidate.
 * @returns true when target is a descendant.
 */
function isInside(root, target) {
	const relative = path.relative(root, target);
	return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative);
}

/**
 * Build a structured failure.
 * @param sessionId - target id.
 * @param code - stable machine code.
 * @param message - user-facing reason.
 * @returns failure entry.
 */
function failure(sessionId, code, message) {
	return { sessionId, code, message };
}

/**
 * Create an Error carrying a stable machine code.
 * @param code - stable machine code.
 * @param message - user-facing reason.
 * @returns coded error.
 */
function codedError(code, message) {
	const error = new Error(message);
	error.code = code;
	return error;
}

/**
 * Format an unknown error.
 * @param error - rejection value.
 * @returns message text.
 */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}

/**
 * Build a no-store JSON response.
 * @param status - HTTP status.
 * @param value - JSON value.
 * @returns response.
 */
function jsonResponse(status, value) {
	return new Response(JSON.stringify(value), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
			"x-content-type-options": "nosniff",
		},
	});
}
