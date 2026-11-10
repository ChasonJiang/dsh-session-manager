# DSH Session manager

A local Web UI bundle for DeepSeek Harness that adds a dedicated **会话 / Sessions** panel to the sidebar. It turns the session catalog into a manageable list without changing the Session log or replacing any host UI.

[中文说明](README.zh.md)

## What it does

- **Browse everything** — all ordinary sessions, including blank and archived ones, with workspace, status, and relative update time.
- **Search** — filters by title and session ID immediately, and searches message content through the Host `session.search` endpoint.
- **Filter and sort** — all / running / archived / blank, sorted by recent update, title, or workspace.
- **Manage sessions**
  - open a session in the main conversation view;
  - rename;
  - pin / unpin;
  - archive, with an explicit warning when running work would be stopped;
  - restore;
  - create a branch (fork);
  - copy the session ID;
  - inspect full details in a side panel.
- **Delete permanently** — remove a closed Session's stored log behind an explicit confirmation checkbox; deleting a parent also removes its subagent logs. Requests are refused while an Agent, live Session, or background job still references the target.
- **Pagination** — numbered pages, previous/next controls, and a per-page selector (20/50/100). Selecting a page or page size clears the batch selection.
- **Floating details** — the details drawer overlays the list from the right and follows the selected row instead of becoming a layout column; click outside, press Escape, or use its close button to dismiss it.
- **Batch operations** — select rows to archive, restore, or permanently delete several sessions at once.
- **Live state** — titles, running state, archive membership, pinned order, and the workspace list update from the existing Client services.

## Where it lives

- Sidebar entry: **会话 / Sessions**, order 20.
- Main panel key: `session-manager`.
- Locale namespace: `sessionManager`.
- Package name: `@local/dsh-session-manager`.

The Host side owns only the guarded permanent-delete maintenance route. Every other operation is a browser-side call to an existing Host API.

## APIs used

| Need | API |
| --- | --- |
| Session catalog, rename, content search | `ctx.sessions` (`list`, `refresh`, `search`, `manager.rename`) |
| Open, archive, restore, fork, pin | `ctx.uiWorkspace` |
| Workspace names, archive set, pinned set | `ctx.workspaces.list` |
| Panel registration | `ctx.slots.inject("main")`, `ctx.slots.inject("sidebar.panellist")` |
| Localization | `ctx.locale` |
| Permanent delete | authenticated `POST /api/session.manager.delete` Host route |

The Host maintenance route uses the shipped JSONL backend's `sessionPersistence.root` and `location.path` metadata. DSH's persistence seam has no deletion API — pruning is documented as out-of-band maintenance — so this plugin implements that maintenance with explicit guard rails rather than pretending a Host delete endpoint exists.

### Delete guard rails

1. The browser must POST the exact authenticated route with the manager header and `confirmed: true`.
2. A target is refused while `ctx.agents.get(id)` or `ctx.sessions.get(id)` still finds it, or while it owns a running/stopping background job.
3. The target's stored directories are validated against the JSONL project/session layout before anything is touched. The Session directory must be a real directory (not a symlink), artifacts must be regular files with recognized generation/lock/migration names, and the path must stay under the configured persistence root.
4. The root is archived with `stopActivity: true` before deletion, so reminders and descendant work are gated/stopped.
5. All directories are first renamed into a sibling `.session-manager-trash/tx-*` transaction. Only after every rename succeeds are they removed; a failed rename rolls back.
6. Subagent descendants are included with their parent. Archive/pin bookkeeping is cleared afterwards.

### Delete limits

- A **running** Session and active background job are refused. An idle Host Agent left behind by archive/navigation is closed through its loop scope before the files move; the current conversation cannot delete itself while it is running.
- A Session with a still-active background job is refused until that job is stopped.
- Permanent deletion currently supports the shipped JSONL persistence layout. A different backend without a deletable `root` and `location` metadata is refused.
- Projection-cache rows and attachment objects are not removed; they are external caches/content not owned by the session directory. They may remain on disk until the owning store is pruned.
- Workspace membership can retain a stale id until the next workspace mutation; the Session list itself is authoritative.

## Design notes

- The page is a normal React component registered in the `main` slot; it does not replace the app root.
- All styling uses `--dsw-alias-*` theme tokens and inherits light/dark mode.
- Dialogs implement Escape, focus entry, focus return, and a basic Tab trap; destructive archive defaults focus to **Cancel**.
- Search requests are debounced and aborted when the query changes.
- No dependency on `@deepseek-ai/dsh-client-ui-primitives` or any other Client package is loaded as a module. Only `react` comes from the browser module table.
- The list is paginated in pages of 20 by default, with 20/50/100 per-page choices, so large catalogs stay responsive without a Load more tail.
- The details panel is an overlay drawer: the list keeps its full width and the panel floats above the rows with a shadow. A transparent scrim closes it on an outside click, and Escape/close also dismiss it.

## Known limits

- **Permanent delete needs settled work.** Running Sessions and active background jobs are refused, not silently stopped. An idle Host Agent for an archived Session is closed automatically before its files are moved. Use **Archive** to hide a running Session now; delete it after its work has settled.
- **Archived sessions cannot be opened.** Use **Restore and open**; this follows the host's own archived-session rule.
- Subagent child Sessions are not listed as top-level rows; they remain managed from their parent conversation and are deleted with it.
- Branches that require a format migration first must be opened once, then forked again.
- Delete is JSONL-backend-only and leaves projection-cache/attachment caches for their owning services to prune.
- Content search needs the opt-in session-query index. With the shipped `session-query-sqlite` row kept at `openAt: never`, the manager falls back to title/ID matching and shows a neutral availability note; enable content search by overriding that row to `openAt: first-search` (or `startup`) with a durable `path`.

## Development

The package is plain JavaScript with no build step:

```text
index.js            Host route: guarded permanent deletion + trash transaction
client.js           sidebar icon + management page
cordis.patch.yml    inserts the session-manager row
locale/en.json      inventory metadata
locale/zh.json      inventory metadata
icon.svg            inventory and sidebar artwork
```

Install it into the current profile with the DSH plugin manager (`install_bundle`, target: this directory), then reload the Web page. A replacement of an already-loaded Host bundle may require a Harness restart before the new `/api/session.manager.delete` route is served. Removing or disabling the bundle removes the sidebar entry, panel, and delete route.
