window.__ModuleLoader__.load({
	id: "@local/dsh-session-manager",
	factory: (require) => {
		const React = require("react");
		const h = React.createElement;
		const module = { exports: {} };
		const exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const NS = "sessionManager";
		const PANEL_ID = "session-manager";
		const DELETE_ROUTE = "api/session.manager.delete";
		const PAGE_SIZES = [20, 50, 100];
		const inject = ["slots", "locale", "sessions", "workspaces", "uiWorkspace", "layout"];

		const en = {
			panel: "Sessions",
			title: "Session manager",
			subtitle: "Browse, search, organize, and reopen your sessions.",
			refresh: "Refresh",
			refreshing: "Refreshing…",
			statAll: "All sessions",
			statRunning: "Running",
			statArchived: "Archived",
			statBlank: "Blank",
			searchPlaceholder: "Search title, content, or session ID",
			searchAria: "Search sessions",
			clearSearch: "Clear search",
			searching: "Searching session content…",
			searchUnavailable: "Content search is unavailable in this deployment; matching titles and session IDs only.",
			searchMatches: "{n} content matches",
			searchMore: "Content results are capped. Refine the search to narrow them.",
			searchFailed: "Content search failed: {message}",
			filterAll: "All",
			filterRunning: "Running",
			filterArchived: "Archived",
			filterBlank: "Blank",
			sortLabel: "Sort",
			sortUpdated: "Recently updated",
			sortTitle: "Title",
			sortWorkspace: "Workspace",
			colSession: "Session",
			colUpdated: "Updated",
			colActions: "Actions",
			loading: "Loading sessions…",
			loadFailed: "Could not load sessions.",
			retry: "Retry",
			emptyTitle: "No sessions here yet",
			emptyBody: "Start a conversation and it will appear in this list.",
			noResultsTitle: "No matching sessions",
			noResultsBody: "Try another search or filter.",
			clearFilters: "Clear filters",
			selectAll: "Select all visible sessions",
			selectSession: "Select {name}",
			selected: "{n} selected",
			bulkArchive: "Archive",
			bulkRestore: "Restore",
			bulkDelete: "Delete",
			clearSelection: "Clear selection",
			bulkArchived: "Archived {n} sessions.",
			bulkRestored: "Restored {n} sessions.",
			bulkPartial: "{ok} succeeded, {failed} failed.",
			delete: "Delete",
			deleteTitle: "Delete session",
			deleteTitlePlural: "Delete {n} sessions",
			deleteBody: "Permanently delete the stored session logs and their subagent sessions. Workspace folders and files are not affected. This cannot be undone.",
			deleteRunningBody: "{n} selected sessions are still running or open. Close them before deleting; the Host will refuse those.",
			deleteBlankBody: "{n} selected blank sessions are skipped because they have no stored log.",
			deleteListMore: "and {n} more",
			deleteConfirm: "I understand this permanently deletes the selected session logs.",
			deleteConfirmRequired: "Confirm permanent deletion first.",
			confirmDelete: "Delete permanently",
			deleting: "Deleting…",
			deleted: "Deleted {n} sessions.",
			deletedWithWarnings: "Deleted {n} sessions with {warnings} cleanup warning(s).",
			deleteFailed: "Delete failed: {message}",
			deletePartial: "{ok} deleted, {failed} refused.",
			deleteEmpty: "Blank sessions have no stored log to delete.",
			deleteLive: "The session is still open or running. Close it before deleting.",
			deleteDescendantLive: "A subagent session is still open. Close it before deleting its parent.",
			deleteCloseFailed: "Could not close the session's Host agent. Refresh or restart DSH, then retry.",
			deleteActiveJob: "A background job owned by this session is still active.",
			deleteUnsupported: "The mounted storage backend does not support deletion.",
			deleteUnsafe: "The session files did not match the expected layout; deletion was refused.",
			deleteNoArtifact: "This session has no stored log to delete.",
			deleteNotFound: "The session no longer exists.",
			deleteSubagent: "Delete the parent session; subagent sessions are removed with it.",
			deleteRollback: "Deletion was interrupted and rollback was incomplete. Recover files from the reported trash path.",
			deleteIO: "Could not remove the session files.",
			deleteWarnings: "Cleanup warnings",
			loadMore: "Load more",
			shownCount: "Showing {shown} of {total}",
			pagination: "Pagination",
			pageSize: "Per page",
			pageRange: "{from}–{to} of {total}",
			previousPage: "Previous page",
			nextPage: "Next page",
			pageNumber: "Page {n}",
			open: "Open session",
			rename: "Rename",
			pin: "Pin",
			unpin: "Unpin",
			archive: "Archive",
			restore: "Restore",
			fork: "Create branch",
			forkNeedsTurn: "This session has no completed turn to branch.",
			details: "Details",
			copyId: "Copy session ID",
			copied: "Session ID copied.",
			copyFailed: "Could not copy the session ID.",
			statusRunning: "Running",
			statusArchived: "Archived",
			statusBlank: "Blank",
			statusIdle: "Idle",
			statusBranch: "Branch",
			statusSubagent: "Subagent",
			statusMigration: "Migration needed",
			statusPinned: "Pinned",
			ungrouped: "Ungrouped",
			unknownWorkspace: "Unknown workspace",
			timeJustNow: "just now",
			timeMinutes: "{n} min ago",
			timeHours: "{n} h ago",
			timeDays: "{n} d ago",
			renameTitle: "Rename session",
			renameLabel: "Session name",
			renamePlaceholder: "Enter a session name",
			renameRequired: "Enter a name.",
			save: "Save",
			saving: "Saving…",
			cancel: "Cancel",
			renamed: "Session renamed.",
			renameFailed: "Rename failed: {message}",
			archiveTitle: "Archive session",
			archiveTitlePlural: "Archive {n} sessions",
			archiveBody: "Archived sessions are hidden from the sidebar. You can restore them from the Archived filter at any time.",
			archiveRunningBody: "This session is running. Archiving stops its current work.",
			archiveRunningBodyPlural: "{n} selected sessions are running. Archiving stops their current work.",
			confirmArchive: "Archive",
			confirmStopArchive: "Stop and archive",
			archived: "Archived {n} sessions.",
			archiveFailed: "Archive failed: {message}",
			restored: "Restored {n} sessions.",
			restoreFailed: "Restore failed: {message}",
			forked: "Created branch {id}.",
			forkFailed: "Could not create a branch: {message}",
			forkNeedsOpen: "Open this session once before creating a branch.",
			pinned: "Session pinned.",
			unpinned: "Session unpinned.",
			pinFailed: "Could not pin the session: {message}",
			unpinFailed: "Could not unpin the session: {message}",
			openFailed: "Could not open the session: {message}",
			archivedNotOpenable: "Archived sessions cannot be opened. Restore it first.",
			restoreAndOpen: "Restore and open",
			detailsTitle: "Session details",
			detailsClose: "Close details",
			idLabel: "Session ID",
			workspaceLabel: "Workspace",
			pathLabel: "Path",
			statusLabel: "Status",
			updatedLabel: "Last updated",
			sourceLabel: "Source",
			parentLabel: "Parent session",
			presetLabel: "Agent preset",
			formatLabel: "Format",
			formatCurrent: "Current",
			formatMigration: "Migration needed",
			sourceMain: "Main session",
			sourceSubagent: "Subagent",
			sourceBranch: "Branch",
			errorSessionActive: "The session is still running. Confirm stopping it before archiving.",
			errorMigration: "This session needs a format migration. Open it once, then try again.",
			errorWriterHeld: "Another process is writing to this session.",
			errorNotFound: "The session no longer exists.",
			errorGeneric: "Something went wrong.",
			close: "Close",
			refreshFailed: "Refresh failed: {message}",
		};

		const zh = {
			panel: "会话",
			title: "会话管理",
			subtitle: "浏览、搜索、整理并重新打开你的会话。",
			refresh: "刷新",
			refreshing: "正在刷新…",
			statAll: "全部会话",
			statRunning: "运行中",
			statArchived: "已归档",
			statBlank: "空白会话",
			searchPlaceholder: "搜索标题、内容或会话 ID",
			searchAria: "搜索会话",
			clearSearch: "清除搜索",
			searching: "正在搜索会话内容…",
			searchUnavailable: "当前部署未启用内容搜索，仅按标题和会话 ID 匹配。",
			searchMatches: "内容匹配 {n} 个会话",
			searchMore: "内容搜索结果有上限，请缩小搜索范围。",
			searchFailed: "内容搜索失败：{message}",
			filterAll: "全部",
			filterRunning: "运行中",
			filterArchived: "已归档",
			filterBlank: "空白",
			sortLabel: "排序",
			sortUpdated: "最近更新",
			sortTitle: "标题",
			sortWorkspace: "工作区",
			colSession: "会话",
			colUpdated: "最近更新",
			colActions: "操作",
			loading: "正在加载会话…",
			loadFailed: "无法加载会话。",
			retry: "重试",
			emptyTitle: "还没有会话",
			emptyBody: "开始一段对话后，它会出现在这里。",
			noResultsTitle: "没有匹配的会话",
			noResultsBody: "试试其他搜索词或筛选条件。",
			clearFilters: "清除筛选",
			selectAll: "选择当前列出的全部会话",
			selectSession: "选择 {name}",
			selected: "已选择 {n} 个会话",
			bulkArchive: "归档",
			bulkRestore: "恢复",
			bulkDelete: "删除",
			clearSelection: "取消选择",
			bulkArchived: "已归档 {n} 个会话。",
			bulkRestored: "已恢复 {n} 个会话。",
			bulkPartial: "成功 {ok} 个，失败 {failed} 个。",
			delete: "删除",
			deleteTitle: "删除会话",
			deleteTitlePlural: "删除 {n} 个会话",
			deleteBody: "永久删除已存储的会话日志及其子会话。工作区目录和文件不会受到影响，此操作无法撤销。",
			deleteRunningBody: "选中的 {n} 个会话仍在运行或打开。请先关闭它们，Host 会拒绝删除这些会话。",
			deleteBlankBody: "选中的 {n} 个空白会话没有存储日志，将被跳过。",
			deleteListMore: "以及另外 {n} 个",
			deleteConfirm: "我确认永久删除所选会话的日志。",
			deleteConfirmRequired: "请先确认永久删除。",
			confirmDelete: "永久删除",
			deleting: "正在删除…",
			deleted: "已删除 {n} 个会话。",
			deletedWithWarnings: "已删除 {n} 个会话，有 {warnings} 条清理警告。",
			deleteFailed: "删除失败：{message}",
			deletePartial: "已删除 {ok} 个，拒绝 {failed} 个。",
			deleteEmpty: "空白会话没有可删除的日志。",
			deleteLive: "会话仍在打开或运行中，请先关闭后再删除。",
			deleteDescendantLive: "子会话仍在打开中，请先关闭后再删除父会话。",
			deleteCloseFailed: "无法关闭会话的 Host Agent，请刷新或重启 DSH 后重试。",
			deleteActiveJob: "该会话拥有的后台任务仍在运行。",
			deleteUnsupported: "当前挂载的存储后端不支持删除。",
			deleteUnsafe: "会话文件结构不符合预期，已拒绝删除。",
			deleteNoArtifact: "该会话没有可删除的存储日志。",
			deleteNotFound: "会话已不存在。",
			deleteSubagent: "请删除父会话；子会话会随父会话一起删除。",
			deleteRollback: "删除被中断，回滚不完整，请从报告的回滚目录恢复文件。",
			deleteIO: "无法删除会话文件。",
			deleteWarnings: "清理警告",
			loadMore: "加载更多",
			shownCount: "显示 {shown} / {total} 个会话",
			pagination: "分页",
			pageSize: "每页",
			pageRange: "{from}–{to}，共 {total} 个",
			previousPage: "上一页",
			nextPage: "下一页",
			pageNumber: "第 {n} 页",
			open: "打开会话",
			rename: "重命名",
			pin: "置顶",
			unpin: "取消置顶",
			archive: "归档",
			restore: "恢复",
			fork: "创建分支",
			forkNeedsTurn: "该会话还没有已完成的一轮对话，无法创建分支。",
			details: "详情",
			copyId: "复制会话 ID",
			copied: "已复制会话 ID。",
			copyFailed: "无法复制会话 ID。",
			statusRunning: "运行中",
			statusArchived: "已归档",
			statusBlank: "空白",
			statusIdle: "空闲",
			statusBranch: "分支",
			statusSubagent: "子会话",
			statusMigration: "待迁移",
			statusPinned: "已置顶",
			ungrouped: "未归组",
			unknownWorkspace: "未知工作区",
			timeJustNow: "刚刚",
			timeMinutes: "{n} 分钟前",
			timeHours: "{n} 小时前",
			timeDays: "{n} 天前",
			renameTitle: "重命名会话",
			renameLabel: "会话名称",
			renamePlaceholder: "输入会话名称",
			renameRequired: "请输入名称。",
			save: "保存",
			saving: "正在保存…",
			cancel: "取消",
			renamed: "会话已重命名。",
			renameFailed: "重命名失败：{message}",
			archiveTitle: "归档会话",
			archiveTitlePlural: "归档 {n} 个会话",
			archiveBody: "归档后会话会从侧边栏隐藏，可随时在“已归档”筛选中恢复。",
			archiveRunningBody: "该会话正在运行，归档会停止它当前的工作。",
			archiveRunningBodyPlural: "选中的 {n} 个会话正在运行，归档会停止它们当前的工作。",
			confirmArchive: "归档",
			confirmStopArchive: "停止并归档",
			archived: "已归档 {n} 个会话。",
			archiveFailed: "归档失败：{message}",
			restored: "已恢复 {n} 个会话。",
			restoreFailed: "恢复失败：{message}",
			forked: "已创建分支 {id}。",
			forkFailed: "无法创建分支：{message}",
			forkNeedsOpen: "请先打开一次该会话，再创建分支。",
			pinned: "会话已置顶。",
			unpinned: "已取消置顶。",
			pinFailed: "置顶失败：{message}",
			unpinFailed: "取消置顶失败：{message}",
			openFailed: "无法打开会话：{message}",
			archivedNotOpenable: "已归档的会话无法打开，请先恢复。",
			restoreAndOpen: "恢复并打开",
			detailsTitle: "会话详情",
			detailsClose: "关闭详情",
			idLabel: "会话 ID",
			workspaceLabel: "工作区",
			pathLabel: "路径",
			statusLabel: "状态",
			updatedLabel: "最近更新",
			sourceLabel: "来源",
			parentLabel: "父会话",
			presetLabel: "Agent 预设",
			formatLabel: "格式",
			formatCurrent: "当前格式",
			formatMigration: "需要迁移",
			sourceMain: "主会话",
			sourceSubagent: "子会话",
			sourceBranch: "分支",
			errorSessionActive: "会话仍在运行，请确认停止后再归档。",
			errorMigration: "该会话需要格式迁移，请先打开一次再重试。",
			errorWriterHeld: "另一个进程正在写入该会话。",
			errorNotFound: "会话已不存在。",
			errorGeneric: "操作未完成。",
			close: "关闭",
			refreshFailed: "刷新失败：{message}",
		};

		const css = `
.dsm-page{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;line-height:1.5;overflow:hidden}
.dsm-scroll{flex:1;min-height:0;overflow:auto}
.dsm-inner{width:100%;max-width:1240px;margin:0 auto;padding:28px 32px 48px;box-sizing:border-box}
.dsm-header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:24px}
.dsm-headerText{min-width:0}
.dsm-h1{margin:0;font-size:24px;line-height:32px;font-weight:600;letter-spacing:-.01em}
.dsm-sub{margin:6px 0 0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px;max-width:660px}
.dsm-headerActions{display:flex;gap:8px;align-items:center;flex:none}
.dsm-btn{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:32px;padding:0 12px;border-radius:var(--dsw-radius-md,8px);border:.5px solid var(--dsw-alias-border-l4);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap;transition:background .14s ease,border-color .14s ease,opacity .14s ease}
.dsm-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}
.dsm-btn:disabled{opacity:.45;cursor:default}
.dsm-btn.secondary{background:var(--dsw-alias-bg-layer-1)}
.dsm-btn.primary{background:var(--dsw-alias-state-business-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff)}
.dsm-btn.primary:hover:not(:disabled){background:var(--dsw-alias-state-business-primary);opacity:.9}
.dsm-btn.danger{color:var(--dsw-alias-state-error-primary)}
.dsm-btn.danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}
.dsm-btn.dangerSolid{background:var(--dsw-alias-state-error-primary);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff)}
.dsm-btn.dangerSolid:hover:not(:disabled){opacity:.9;background:var(--dsw-alias-state-error-primary)}
.dsm-btn:focus-visible,.dsm-iconBtn:focus-visible,.dsm-filter:focus-visible,.dsm-stat:focus-visible,.dsm-searchClear:focus-visible,.dsm-titleBtn:focus-visible,.dsm-toastClose:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}
.dsm-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:20px}
.dsm-stat{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:13px 15px;text-align:left;color:inherit;background:var(--dsw-alias-settings-card-fill);border:.5px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-lg,12px);cursor:pointer;font:inherit;transition:background .14s ease,border-color .14s ease,box-shadow .14s ease}
.dsm-stat:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dsm-stat[aria-pressed=true]{border-color:var(--dsw-alias-state-business-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-business-primary)}
.dsm-statLabel{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;white-space:nowrap}
.dsm-statValue{font-size:22px;line-height:30px;font-weight:600;font-variant-numeric:tabular-nums}
.dsm-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.dsm-search{position:relative;flex:1 1 300px;min-width:220px}
.dsm-searchIcon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--dsw-alias-label-tertiary);pointer-events:none;display:inline-flex}
.dsm-search input{box-sizing:border-box;width:100%;height:36px;padding:0 34px 0 33px;border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md,8px);background:transparent;color:inherit;font:inherit;font-size:13px;outline:none}
.dsm-search input::placeholder{color:var(--dsw-alias-label-tertiary)}
.dsm-search input:focus{border-color:var(--dsw-alias-state-business-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-business-primary)}
.dsm-search input::-webkit-search-cancel-button{display:none}
.dsm-searchClear{position:absolute;right:5px;top:50%;transform:translateY(-50%);width:25px;height:25px;display:inline-flex;align-items:center;justify-content:center;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;padding:0}
.dsm-searchClear:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dsm-filters{display:flex;align-items:center;gap:2px;padding:2px;border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2);overflow:auto;max-width:100%}
.dsm-filter{display:inline-flex;align-items:center;gap:4px;height:30px;padding:0 9px;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap}
.dsm-filter:hover{color:var(--dsw-alias-label-primary)}
.dsm-filter[aria-pressed=true]{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);box-shadow:inset 0 0 0 .5px var(--dsw-alias-border-l2)}
.dsm-count{color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:16px;font-variant-numeric:tabular-nums}
.dsm-sort{display:flex;align-items:center;gap:6px;flex:none}
.dsm-sortLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:nowrap}
.dsm-select{box-sizing:border-box;height:32px;padding:0 8px;border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;cursor:pointer;outline:none}
.dsm-select:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}
.dsm-searchNote{display:flex;align-items:center;gap:6px;margin:0 0 10px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px;min-height:17px;overflow-wrap:anywhere}
.dsm-searchNote.error{color:var(--dsw-alias-state-error-primary)}
.dsm-bulk{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:7px 10px;margin-bottom:8px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2);font-size:12px;line-height:18px}
.dsm-bulkText{color:var(--dsw-alias-label-secondary);font-weight:500}
.dsm-bulkSpacer{flex:1}
.dsm-listCard{background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg,12px);overflow:hidden;min-width:0}
.dsm-tableHead,.dsm-row{display:grid;grid-template-columns:32px minmax(0,1fr) 118px 218px;align-items:center;column-gap:10px;padding:0 14px}
.dsm-tableHead{height:36px;border-bottom:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:500;letter-spacing:.04em;text-transform:uppercase}
.dsm-row{min-height:64px;padding-top:10px;padding-bottom:10px;border-bottom:.5px solid var(--dsw-alias-border-l1);transition:background .12s ease}
.dsm-row:last-of-type{border-bottom:none}
.dsm-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dsm-row.is-checked{background:var(--dsw-alias-interactive-bg-active)}
.dsm-checkCell{display:flex;align-items:center;justify-content:center}
.dsm-checkbox{width:15px;height:15px;margin:0;accent-color:var(--dsw-alias-state-business-primary);cursor:pointer}
.dsm-sessionCell{display:flex;align-items:flex-start;gap:9px;min-width:0;padding:1px 0}
.dsm-dot{width:8px;height:8px;border-radius:999px;flex:none;margin-top:6px;box-sizing:border-box;background:var(--dsw-alias-label-quaternary)}
.dsm-dot.running{background:var(--dsw-alias-state-success-primary);animation:dsm-pulse 2s ease-in-out infinite}
.dsm-dot.archived{background:transparent;border:1.5px solid var(--dsw-alias-label-quaternary)}
.dsm-dot.blank{background:transparent;border:1.5px solid var(--dsw-alias-label-caption)}
.dsm-dot.idle{opacity:.5}
@keyframes dsm-pulse{0%,100%{opacity:1}50%{opacity:.42}}
.dsm-sessionText{min-width:0;flex:1}
.dsm-titleLine{display:flex;align-items:center;gap:6px;min-width:0}
.dsm-titleBtn{flex:0 1 auto;min-width:0;max-width:100%;padding:0;border:none;background:transparent;color:inherit;font:inherit;font-size:14px;font-weight:500;line-height:20px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}
.dsm-titleBtn:hover{color:var(--dsw-alias-state-business-primary);text-decoration:underline;text-underline-offset:2px}
.dsm-pinMark{display:inline-flex;align-items:center;color:var(--dsw-alias-label-caption);flex:none}
.dsm-badge{display:inline-flex;align-items:center;height:18px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-secondary);font-size:10px;font-weight:500;line-height:1;white-space:nowrap;flex:none}
.dsm-badge.running{color:var(--dsw-alias-state-success-primary)}
.dsm-badge.archived{color:var(--dsw-alias-label-tertiary)}
.dsm-badge.blank{color:var(--dsw-alias-label-tertiary)}
.dsm-badge.warn{color:var(--dsw-alias-state-warn-label)}
.dsm-badge.branch{color:var(--dsw-alias-state-business-primary)}
.dsm-metaLine{display:flex;align-items:center;gap:6px;min-width:0;margin-top:2px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px;overflow:hidden;white-space:nowrap}
.dsm-metaWorkspace{min-width:0;overflow:hidden;text-overflow:ellipsis}
.dsm-metaSep{opacity:.55;flex:none}
.dsm-metaId{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;opacity:.8;flex:none}
.dsm-snippet{margin-top:3px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:17px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow-wrap:anywhere}
.dsm-updated{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsm-actions{display:flex;align-items:center;justify-content:flex-end;gap:2px;min-width:0}
.dsm-iconBtn{width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;padding:0;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer;transition:background .12s ease,color .12s ease}
.dsm-iconBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dsm-iconBtn.danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}
.dsm-iconBtn:disabled{opacity:.35;cursor:default}
.dsm-listFoot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 14px;border-top:.5px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px}
.dsm-range{white-space:nowrap;font-variant-numeric:tabular-nums}
.dsm-pager{display:flex;align-items:center;justify-content:flex-end;gap:3px;flex-wrap:wrap;margin-left:auto}
.dsm-pageSize{display:inline-flex;align-items:center;gap:5px;margin-right:4px;white-space:nowrap;color:var(--dsw-alias-label-tertiary);font-size:11px}
.dsm-pageSelect{height:26px;padding:0 5px;font-size:11px;background:transparent}
.dsm-pageBtn{box-sizing:border-box;min-width:26px;height:26px;padding:0 5px;border:.5px solid transparent;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:16px;cursor:pointer;font-variant-numeric:tabular-nums}
.dsm-pageBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dsm-pageBtn[aria-current=page]{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-weight:600}
.dsm-pageBtn:disabled{opacity:.35;cursor:default}
.dsm-pageBtn:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}
.dsm-pageEllipsis{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:26px;color:var(--dsw-alias-label-caption);font-size:11px}
.dsm-empty{padding:56px 24px;text-align:center;color:var(--dsw-alias-label-tertiary)}
.dsm-emptyIcon{color:var(--dsw-alias-label-caption);display:flex;justify-content:center;margin-bottom:10px}
.dsm-emptyTitle{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:600;line-height:20px;margin-bottom:4px}
.dsm-emptyBody{margin:0 0 14px;font-size:12px;line-height:19px}
.dsm-skeleton{padding:12px 14px;display:flex;flex-direction:column;gap:10px}
.dsm-skeletonRow{height:48px;border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-skeleton);animation:dsm-skeleton 1.7s ease-in-out infinite}
@keyframes dsm-skeleton{0%,100%{opacity:1}50%{opacity:.55}}
.dsm-content{position:relative;min-width:0}
.dsm-detailsScrim{position:fixed;inset:0;z-index:850;background:transparent}
.dsm-details{position:absolute;z-index:900;top:var(--dsm-details-top,0);right:0;width:min(360px,100%);max-height:calc(100vh - 150px);overflow:auto;box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-lg,12px);padding:18px;box-shadow:0 18px 50px var(--dsw-alias-bg-mask-1)}
.dsm-detailsHead{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}
.dsm-detailsTitle{color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.dsm-detailsNameRow{display:flex;align-items:flex-start;gap:8px;min-width:0}
.dsm-detailsName{font-size:16px;line-height:23px;font-weight:600;overflow-wrap:anywhere;min-width:0}
.dsm-detailsActions{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0 18px}
.dsm-detailsActions .dsm-btn{font-size:11px;min-height:29px;padding:0 9px}
.dsm-detailList{margin:0;display:flex;flex-direction:column;gap:12px}
.dsm-detailRow{display:grid;grid-template-columns:84px minmax(0,1fr);gap:8px;align-items:start;font-size:12px;line-height:18px}
.dsm-detailLabel{color:var(--dsw-alias-label-tertiary)}
.dsm-detailValue{min-width:0;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}
.dsm-detailValue.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:17px}
.dsm-copyRow{display:flex;align-items:center;gap:3px;min-width:0}
.dsm-copyRow .dsm-iconBtn{width:22px;height:22px;flex:none}
.dsm-inlineWarn{display:flex;gap:7px;align-items:flex-start;margin-top:4px;color:var(--dsw-alias-state-warn-label);font-size:11px;line-height:17px}
.dsm-inlineWarn svg{flex:none;margin-top:1px}
.dsm-backdrop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;background:var(--dsw-alias-bg-mask-1)}
.dsm-modal{width:min(440px,100%);box-sizing:border-box;padding:20px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-alias-bg-base);box-shadow:0 16px 48px var(--dsw-alias-bg-mask-1)}
.dsm-modalTitle{margin:0 0 8px;font-size:16px;line-height:24px;font-weight:600}
.dsm-modalBody{margin:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.dsm-modalFooter{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}
.dsm-fieldLabel{display:block;margin-bottom:6px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.dsm-input{box-sizing:border-box;width:100%;height:38px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:14px;outline:none}
.dsm-input:focus{border-color:var(--dsw-alias-state-business-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-state-business-primary)}
.dsm-error{margin-top:8px;color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px;overflow-wrap:anywhere}
.dsm-warning{margin-top:12px;padding:9px 11px;border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-state-warn-primary);color:var(--dsw-alias-state-warn-label);font-size:12px;line-height:18px}
.dsm-deleteList{margin:10px 0 0;padding:0 0 0 18px;max-height:150px;overflow:auto;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;overflow-wrap:anywhere}
.dsm-deleteList li+li{margin-top:2px}
.dsm-confirmRow{display:flex;align-items:flex-start;gap:8px;margin-top:14px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;cursor:pointer}
.dsm-confirmRow input{width:15px;height:15px;margin:2px 0 0;accent-color:var(--dsw-alias-state-error-primary);cursor:pointer;flex:none}
.dsm-toast{position:fixed;left:50%;bottom:28px;z-index:1100;transform:translateX(-50%);display:flex;align-items:center;gap:9px;max-width:min(560px,calc(100vw - 32px));box-sizing:border-box;padding:9px 10px 9px 13px;border:.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-primary);font-size:12px;line-height:18px;box-shadow:0 10px 30px var(--dsw-alias-bg-mask-1)}
.dsm-toastIcon{display:inline-flex;flex:none}
.dsm-toast.success .dsm-toastIcon{color:var(--dsw-alias-state-success-primary)}
.dsm-toast.error .dsm-toastIcon{color:var(--dsw-alias-state-error-primary)}
.dsm-toastText{min-width:0;overflow-wrap:anywhere}
.dsm-toastClose{width:23px;height:23px;display:inline-flex;align-items:center;justify-content:center;flex:none;padding:0;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
.dsm-toastClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dsm-spinning{animation:dsm-spin 1s linear infinite}
@keyframes dsm-spin{to{transform:rotate(360deg)}}
.dsm-srOnly{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@media (max-width:1080px){
.dsm-details{position:fixed;z-index:900;right:16px;top:16px;bottom:16px;width:min(360px,calc(100vw - 32px));max-height:none;box-shadow:0 16px 48px var(--dsw-alias-bg-mask-1)}
}
@media (max-width:900px){
.dsm-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
.dsm-inner{padding:24px 20px 40px}
.dsm-tableHead,.dsm-row{grid-template-columns:32px minmax(0,1fr) 100px 200px}
}
@media (max-width:760px){
.dsm-inner{padding:20px 16px 36px}
.dsm-header{flex-direction:column;gap:12px}
.dsm-headerActions{width:100%}
.dsm-toolbar{align-items:stretch}
.dsm-search{flex-basis:100%}
.dsm-filters{order:3;width:100%}
.dsm-sort{order:2;margin-left:auto}
.dsm-tableHead{display:none}
.dsm-row{grid-template-columns:26px minmax(0,1fr);row-gap:8px;padding:12px}
.dsm-updated{display:none}
.dsm-actions{grid-column:2;justify-content:flex-start;flex-wrap:wrap}
.dsm-listFoot{flex-wrap:wrap}
}
@media (prefers-reduced-motion:reduce){
.dsm-dot.running,.dsm-skeletonRow,.dsm-spinning{animation:none}
}
`;

		function iconChildren(name) {
			switch (name) {
				case "search":
					return [
						h("circle", { key: "c", cx: "11", cy: "11", r: "7" }),
						h("path", { key: "p", d: "m16.5 16.5 4.5 4.5" }),
					];
				case "refresh":
					return [
						h("path", { key: "a", d: "M20 11a8 8 0 1 0-2.35 5.65" }),
						h("path", { key: "b", d: "M20 4v7h-7" }),
					];
				case "open":
					return [
						h("path", { key: "a", d: "M14 4h6v6" }),
						h("path", { key: "b", d: "M20 4 11 13" }),
						h("path", { key: "c", d: "M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" }),
					];
				case "pencil":
					return [
						h("path", { key: "a", d: "M4 20h4L19 9l-4-4L4 16v4Z" }),
						h("path", { key: "b", d: "m13.5 6.5 4 4" }),
					];
				case "pin":
					return [
						h("path", { key: "a", d: "M9 4h6l-1 5 4 4H6l4-4-1-5Z" }),
						h("path", { key: "b", d: "M12 13v7" }),
					];
				case "archive":
					return [
						h("path", { key: "a", d: "M4 7h16v13H4z" }),
						h("path", { key: "b", d: "M3 4h18v3H3z" }),
						h("path", { key: "c", d: "M10 11h4" }),
					];
				case "trash":
					return [
						h("path", { key: "a", d: "M4 7h16" }),
						h("path", { key: "b", d: "M9 7V4h6v3" }),
						h("path", { key: "c", d: "m6 7 1 13h10l1-13" }),
						h("path", { key: "d", d: "M10 11v5M14 11v5" }),
					];
				case "unarchive":
					return [
						h("path", { key: "a", d: "M4 7h16v13H4z" }),
						h("path", { key: "b", d: "M3 4h18v3H3z" }),
						h("path", { key: "c", d: "M12 19v-6" }),
						h("path", { key: "d", d: "m9 16 3-3 3 3" }),
					];
				case "fork":
					return [
						h("circle", { key: "a", cx: "6", cy: "5", r: "2.5" }),
						h("circle", { key: "b", cx: "18", cy: "5", r: "2.5" }),
						h("circle", { key: "c", cx: "12", cy: "19", r: "2.5" }),
						h("path", { key: "d", d: "M6 7.5v2A3.5 3.5 0 0 0 9.5 13h5a3.5 3.5 0 0 0 3.5-3.5v-2" }),
						h("path", { key: "e", d: "M12 13v3.5" }),
					];
				case "info":
					return [
						h("circle", { key: "a", cx: "12", cy: "12", r: "9" }),
						h("path", { key: "b", d: "M12 11v5" }),
						h("path", { key: "c", d: "M12 7.75v.5" }),
					];
				case "close":
					return [
						h("path", { key: "a", d: "m6 6 12 12" }),
						h("path", { key: "b", d: "m18 6-12 12" }),
					];
				case "copy":
					return [
						h("rect", { key: "a", x: "9", y: "9", width: "11", height: "11", rx: "2" }),
						h("path", { key: "b", d: "M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" }),
					];
				case "check":
					return [h("path", { key: "a", d: "m5 12 4.5 4.5L19 7" })];
				case "warning":
					return [
						h("path", { key: "a", d: "M12 4 3.5 19h17L12 4Z" }),
						h("path", { key: "b", d: "M12 9v4.5" }),
						h("path", { key: "c", d: "M12 16.5v.25" }),
					];
				case "sessions":
					return [
						h("path", { key: "a", d: "M4 6.5h16M4 12h11M4 17.5h7" }),
						h("circle", { key: "b", cx: "17.5", cy: "17.5", r: "3.2" }),
						h("path", { key: "c", d: "m20 20 2 2" }),
					];
				default:
					return [h("circle", { key: "a", cx: "12", cy: "12", r: "8" })];
			}
		}

		function Icon({ name, size = 16, className }) {
			return h(
				"svg",
				{
					width: size,
					height: size,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: 1.7,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className,
					"aria-hidden": "true",
					focusable: "false",
				},
				iconChildren(name),
			);
		}

		function SidebarIcon({ size = 18 }) {
			return h(
				"svg",
				{
					width: size,
					height: size,
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: 1.8,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": "true",
					focusable: "false",
				},
				h("path", { d: "M4 7h16M4 12h11M4 17h7" }),
				h("circle", { cx: "17.5", cy: "17.5", r: "3.2" }),
				h("path", { d: "m20 20 2 2" }),
			);
		}

		const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

		function shortId(id) {
			const text = String(id);
			return text.length > 10 ? text.slice(0, 8) : text;
		}

		function baseName(value) {
			if (typeof value !== "string" || value.trim() === "") return "";
			const parts = value.split(/[\\/]+/).filter((part) => part !== "");
			return parts[parts.length - 1] ?? value;
		}

		function rpcFailure(error) {
			const failure = new Error(error?.message ?? "Request failed");
			failure.rpcError = error;
			failure.name = "SessionManagerRequestError";
			return failure;
		}

		function describeError(error, t) {
			const code = error?.rpcError?.code;
			switch (code) {
				case "workspace/session-active":
					return t("errorSessionActive");
				case "session/migration-required":
					return t("errorMigration");
				case "session/writer-held":
					return t("errorWriterHeld");
				case "session/not-found":
					return t("errorNotFound");
				default:
					break;
			}
			const message = error?.rpcError?.message ?? error?.message ?? String(error ?? "");
			return message.trim() === "" ? t("errorGeneric") : message;
		}

		/**
		 * Recognize a deployment that has no session-query content index.
		 * The Host reports this as a SessionQueryError with openAt "never",
		 * not a transport failure; title/ID filtering still works.
		 * @param error - search rejection or Remote failure.
		 * @returns whether content search is disabled for this deployment.
		 */
		function contentSearchDisabled(error) {
			const text = [
				error?.rpcError?.code,
				error?.rpcError?.message,
				error?.code,
				error?.message,
				String(error ?? ""),
			]
				.filter((value) => typeof value === "string" && value.length > 0)
				.join(" ");
			return /session search is disabled|session-query index.{0,80}never|SESSION_QUERY_INDEX_DISABLED/i.test(text);
		}

		function formatAbsolute(ts) {
			if (!ts) return "—";
			try {
				return new Date(ts).toLocaleString();
			} catch (_error) {
				return String(ts);
			}
		}

		function relativeTime(ts, t, now) {
			if (!ts) return "—";
			const diff = Math.max(0, now - ts);
			if (diff < 45_000) return t("timeJustNow");
			if (diff < 3_600_000) return t("timeMinutes", { n: Math.max(1, Math.floor(diff / 60_000)) });
			if (diff < 86_400_000) return t("timeHours", { n: Math.max(1, Math.floor(diff / 3_600_000)) });
			if (diff < 604_800_000) return t("timeDays", { n: Math.max(1, Math.floor(diff / 86_400_000)) });
			try {
				return new Date(ts).toLocaleDateString();
			} catch (_error) {
				return formatAbsolute(ts);
			}
		}

		/**
		 * Build compact page numbers around the current page.
		 * @param total - total page count, at least 1.
		 * @param current - current page, 1-based.
		 * @returns page numbers and ellipsis markers.
		 */
		function paginationItems(total, current) {
			if (total <= 7) return Array.from({ length: total }, (_value, index) => index + 1);
			const items = [1];
			let start;
			let end;
			if (current <= 4) {
				start = 2;
				end = 5;
			} else if (current >= total - 3) {
				start = total - 4;
				end = total - 1;
			} else {
				start = current - 1;
				end = current + 1;
			}
			if (start > 2) items.push("start-ellipsis");
			for (let page = start; page <= end; page += 1) items.push(page);
			if (end < total - 1) items.push("end-ellipsis");
			items.push(total);
			return items;
		}

		async function copyText(text) {
			if (navigator.clipboard !== undefined && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
				return;
			}
			const area = document.createElement("textarea");
			area.value = text;
			area.setAttribute("readonly", "");
			area.style.position = "fixed";
			area.style.opacity = "0";
			document.body.appendChild(area);
			area.select();
			const copied = document.execCommand("copy");
			area.remove();
			if (!copied) throw new Error("copy command was rejected");
		}

		/**
		 * Ask the Host maintenance route to delete stored Sessions.
		 * @param sessionIds - root Session ids.
		 * @returns Host result with deleted ids, failures, and cleanup warnings.
		 */
		async function requestSessionDeletion(sessionIds) {
			const response = await fetch(DELETE_ROUTE, {
				method: "POST",
				credentials: "same-origin",
				headers: {
					"content-type": "application/json",
					accept: "application/json",
					"x-dsh-session-manager": "delete",
				},
				body: JSON.stringify({ sessionIds, confirmed: true }),
			});
			const text = await response.text();
			let payload;
			try {
				payload = text === "" ? undefined : JSON.parse(text);
			} catch (_error) {
				payload = undefined;
			}
			if (!response.ok) {
				const error = new Error(payload?.message ?? `Delete request failed with HTTP ${String(response.status)}`);
				error.code = payload?.code;
				throw error;
			}
			if (payload === null || typeof payload !== "object") {
				throw new Error("The deletion endpoint returned an invalid response.");
			}
			return payload;
		}

		function useStore(store) {
			return React.useSyncExternalStore(
				(listener) => store.subscribe(listener),
				() => store.getSnapshot(),
				() => store.getSnapshot(),
			);
		}

		function statusOf(row, archived, t) {
			if (archived) return { key: "archived", tone: "archived", label: t("statusArchived") };
			if (row.running) return { key: "running", tone: "running", label: t("statusRunning") };
			if (row.blank) return { key: "blank", tone: "blank", label: t("statusBlank") };
			return { key: "idle", tone: "idle", label: t("statusIdle") };
		}

		/**
		 * A Session with a local reference is open in this page or another view.
		 * It must be closed before its log can be removed.
		 * @param row - Session list row.
		 * @returns whether a positive reference count exists.
		 */
		function isRetained(row) {
			const counts = row?.retainedBy;
			if (counts === undefined || counts === null) return false;
			return Object.values(counts).some((count) => typeof count === "number" && count > 0);
		}

		/**
		 * Return the localization key explaining why deletion is unavailable.
		 * @param row - Session list row.
		 * @returns block reason key, or undefined when deletion is allowed locally.
		 */
		function deletionBlock(row) {
			if (row.blank) return "deleteEmpty";
			if (row.running) return "deleteLive";
			if (isRetained(row)) return "deleteLive";
			return undefined;
		}

		/**
		 * Localized text for one Host deletion failure.
		 * @param failure - Host failure entry.
		 * @param t - locale binding.
		 * @returns display text.
		 */
		function deletionFailureText(failure, t) {
			switch (failure?.code) {
				case "session/live":
					return t("deleteLive");
				case "session/descendant-live":
					return t("deleteDescendantLive");
				case "session/close-failed":
					return t("deleteCloseFailed");
				case "session/active-job":
					return t("deleteActiveJob");
				case "session/delete-unsupported":
					return t("deleteUnsupported");
				case "session/delete-unsafe":
					return t("deleteUnsafe");
				case "session/no-artifact":
					return t("deleteNoArtifact");
				case "session/not-found":
					return t("deleteNotFound");
				case "session/delete-subagent":
					return t("deleteSubagent");
				case "session/delete-rollback":
					return t("deleteRollback") + " " + (failure.message ?? "");
				case "session/delete-io":
					return t("deleteIO") + " " + (failure.message ?? "");
				default:
					return failure?.message ?? t("errorGeneric");
			}
		}

		function IconButton({ icon, label, onClick, disabled, danger }) {
			return h(
				"button",
				{
					type: "button",
					className: "dsm-iconBtn" + (danger === true ? " danger" : ""),
					title: label,
					"aria-label": label,
					disabled: disabled === true,
					onClick,
				},
				h(Icon, { name: icon, size: 15 }),
			);
		}

		function TriCheckbox({ checked, indeterminate, onChange, label }) {
			const ref = React.useRef(null);
			React.useEffect(() => {
				if (ref.current !== null) ref.current.indeterminate = indeterminate === true;
			}, [indeterminate]);
			return h("input", {
				ref,
				type: "checkbox",
				className: "dsm-checkbox",
				checked,
				onChange,
				"aria-label": label,
			});
		}

		function Modal({ title, children, footer, onClose }) {
			const dialogRef = React.useRef(null);
			const closeRef = React.useRef(onClose);
			closeRef.current = onClose;

			React.useEffect(() => {
				const dialog = dialogRef.current;
				const previous = document.activeElement;
				const previousOverflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
				if (dialog !== null) {
					const preferred = dialog.querySelector("[data-autofocus]");
					const candidates = getFocusable(dialog);
					(preferred ?? candidates[0] ?? dialog).focus();
				}
				return () => {
					document.body.style.overflow = previousOverflow;
					if (previous !== null && typeof previous.focus === "function") previous.focus();
				};
			}, []);

			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					closeRef.current();
					return;
				}
				if (event.key !== "Tab") return;
				const dialog = dialogRef.current;
				if (dialog === null) return;
				const focusable = getFocusable(dialog);
				if (focusable.length === 0) {
					event.preventDefault();
					return;
				}
				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			};

			return h(
				"div",
				{
					className: "dsm-backdrop",
					onMouseDown: (event) => {
						if (event.target === event.currentTarget) closeRef.current();
					},
				},
				h(
					"div",
					{
						ref: dialogRef,
						className: "dsm-modal",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": title,
						tabIndex: -1,
						onKeyDown,
					},
					h("h2", { className: "dsm-modalTitle" }, title),
					children,
					footer === undefined ? null : h("div", { className: "dsm-modalFooter" }, footer),
				),
			);
		}

		function getFocusable(root) {
			const selector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
			return Array.from(root.querySelectorAll(selector)).filter((element) => {
				const style = window.getComputedStyle(element);
				return style.display !== "none" && style.visibility !== "hidden";
			});
		}

		function Toast({ notice, onClose, closeLabel }) {
			const closeRef = React.useRef(onClose);
			closeRef.current = onClose;
			React.useEffect(() => {
				const timer = window.setTimeout(() => closeRef.current(), notice.tone === "error" ? 7000 : 4500);
				return () => window.clearTimeout(timer);
			}, [notice.id, notice.tone]);
			return h(
				"div",
				{ className: "dsm-toast " + notice.tone, role: "status", "aria-live": "polite" },
				h("span", { className: "dsm-toastIcon" }, h(Icon, { name: notice.tone === "error" ? "warning" : "check", size: 16 })),
				h("span", { className: "dsm-toastText" }, notice.text),
				h(
					"button",
					{ type: "button", className: "dsm-toastClose", onClick: onClose, "aria-label": closeLabel, title: closeLabel },
					h(Icon, { name: "close", size: 13 }),
				),
			);
		}

		function RenameDialog({ session, onClose, onSubmit, t }) {
			const [name, setName] = React.useState(session.title ?? "");
			const [saving, setSaving] = React.useState(false);
			const [error, setError] = React.useState(null);
			const trimmed = name.trim();

			const submit = async (event) => {
				event.preventDefault();
				if (saving) return;
				if (trimmed === "") {
					setError(t("renameRequired"));
					return;
				}
				setSaving(true);
				setError(null);
				try {
					await onSubmit(trimmed);
					onClose();
				} catch (reason) {
					setSaving(false);
					setError(describeError(reason, t));
				}
			};

			return h(
				Modal,
				{
					title: t("renameTitle"),
					onClose: () => {
						if (!saving) onClose();
					},
					footer: [
						h(
							"button",
							{ key: "cancel", type: "button", className: "dsm-btn secondary", disabled: saving, onClick: onClose },
							t("cancel"),
						),
						h(
							"button",
							{ key: "save", type: "submit", form: "dsm-rename-form", className: "dsm-btn primary", disabled: saving || trimmed === "" },
							saving ? t("saving") : t("save"),
						),
					],
				},
				h(
					"form",
					{ id: "dsm-rename-form", onSubmit: submit },
					h("label", { className: "dsm-fieldLabel", htmlFor: "dsm-rename-input" }, t("renameLabel")),
					h("input", {
						id: "dsm-rename-input",
						className: "dsm-input",
						value: name,
						maxLength: 200,
						placeholder: t("renamePlaceholder"),
						"data-autofocus": true,
						disabled: saving,
						onChange: (event) => {
							setName(event.target.value);
							setError(null);
						},
					}),
					error === null ? null : h("div", { className: "dsm-error", role: "alert" }, error),
				),
			);
		}

		function ArchiveDialog({ rows, onClose, onConfirm, t }) {
			const [saving, setSaving] = React.useState(false);
			const [error, setError] = React.useState(null);
			const count = rows.length;
			const runningCount = rows.filter((row) => row.running).length;
			const body = t("archiveBody");
			const runningWarning =
				runningCount === 0
					? null
					: count === 1
						? t("archiveRunningBody")
						: t("archiveRunningBodyPlural", { n: runningCount });

			const confirm = async () => {
				if (saving) return;
				setSaving(true);
				setError(null);
				try {
					await onConfirm();
					onClose();
				} catch (reason) {
					setSaving(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};

			return h(
				Modal,
				{
					title: count === 1 ? t("archiveTitle") : t("archiveTitlePlural", { n: count }),
					onClose: () => {
						if (!saving) onClose();
					},
					footer: [
						h(
							"button",
							{
								key: "cancel",
								type: "button",
								className: "dsm-btn secondary",
								disabled: saving,
								onClick: onClose,
								"data-autofocus": true,
							},
							t("cancel"),
						),
						h(
							"button",
							{
								key: "confirm",
								type: "button",
								className: "dsm-btn primary",
								disabled: saving,
								onClick: confirm,
							},
							saving ? t("saving") : runningCount > 0 ? t("confirmStopArchive") : t("confirmArchive"),
						),
					],
				},
				h("p", { className: "dsm-modalBody" }, body),
				runningWarning === null ? null : h("div", { className: "dsm-warning" }, runningWarning),
				error === null ? null : h("div", { className: "dsm-error", role: "alert" }, error),
			);
		}

		function DeleteDialog({ rows, blockedCount = 0, blankCount = 0, onClose, onConfirm, t }) {
			const [confirmed, setConfirmed] = React.useState(false);
			const [saving, setSaving] = React.useState(false);
			const [error, setError] = React.useState(null);
			const count = rows.length;
			const preview = rows.slice(0, 5);
			const more = count - preview.length;
			const blocked = blockedCount + rows.filter((row) => row.running || isRetained(row)).length;

			const confirm = async () => {
				if (saving) return;
				if (!confirmed) {
					setError(t("deleteConfirmRequired"));
					return;
				}
				setSaving(true);
				setError(null);
				try {
					await onConfirm();
					onClose();
				} catch (reason) {
					setSaving(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};

			return h(
				Modal,
				{
					title: count === 1 ? t("deleteTitle") : t("deleteTitlePlural", { n: count }),
					onClose: () => {
						if (!saving) onClose();
					},
					footer: [
						h(
							"button",
							{
								key: "cancel",
								type: "button",
								className: "dsm-btn secondary",
								disabled: saving,
								onClick: onClose,
								"data-autofocus": true,
							},
							t("cancel"),
						),
						h(
							"button",
							{
								key: "delete",
								type: "button",
								className: "dsm-btn dangerSolid",
								disabled: saving || !confirmed,
								onClick: confirm,
							},
							saving ? t("deleting") : t("confirmDelete"),
						),
					],
				},
				h("p", { className: "dsm-modalBody" }, t("deleteBody")),
				h(
					"ul",
					{ className: "dsm-deleteList" },
					preview.map((row) => h("li", { key: row.id }, row.displayTitle ?? shortId(row.id))),
					more > 0 ? h("li", { key: "more" }, t("deleteListMore", { n: more })) : null,
				),
				blocked > 0 ? h("div", { className: "dsm-warning" }, t("deleteRunningBody", { n: blocked })) : null,
				blankCount > 0 ? h("div", { className: "dsm-warning" }, t("deleteBlankBody", { n: blankCount })) : null,
				h(
					"label",
					{ className: "dsm-confirmRow" },
					h("input", {
						type: "checkbox",
						checked: confirmed,
						onChange: (event) => {
							setConfirmed(event.target.checked);
							setError(null);
						},
					}),
					h("span", null, t("deleteConfirm")),
				),
				error === null ? null : h("div", { className: "dsm-error", role: "alert" }, error),
			);
		}

		function DetailRow({ label, children, mono }) {
			return h(
				"div",
				{ className: "dsm-detailRow" },
				h("div", { className: "dsm-detailLabel" }, label),
				h("div", { className: "dsm-detailValue" + (mono === true ? " mono" : "") }, children),
			);
		}

		function SessionRow({ row, workspace, archived, pinned, checked, busy, snippet, now, t, actions }) {
			const status = statusOf(row, archived, t);
			const blockKey = deletionBlock(row);
			const workspaceTitle = workspace?.title ?? (baseName(row.cwd) || t("ungrouped"));
			const title = row.displayTitle ?? shortId(row.id);
			return h(
				"div",
				{ className: "dsm-row" + (archived ? " is-archived" : "") + (checked ? " is-checked" : ""), "data-session-id": row.id },
				h(
					"div",
					{ className: "dsm-checkCell" },
					h("input", {
						type: "checkbox",
						className: "dsm-checkbox",
						checked,
						"aria-label": t("selectSession", { name: title }),
						onChange: () => actions.toggleChecked(row.id),
					}),
				),
				h(
					"div",
					{ className: "dsm-sessionCell" },
					h("span", { className: "dsm-dot " + status.tone, title: status.label, "aria-hidden": "true" }),
					h(
						"div",
						{ className: "dsm-sessionText" },
						h(
							"div",
							{ className: "dsm-titleLine" },
							h(
								"button",
								{
									type: "button",
									className: "dsm-titleBtn",
									onClick: () => actions.open(row),
									title: archived ? t("archivedNotOpenable") : t("open"),
								},
								title,
							),
							pinned
								? h("span", { className: "dsm-pinMark", title: t("statusPinned") }, h(Icon, { name: "pin", size: 12 }))
								: null,
							status.key === "idle" ? null : h("span", { className: "dsm-badge " + status.tone }, status.label),
							row.parentId === undefined ? null : h("span", { className: "dsm-badge branch" }, t("statusBranch")),
							row.formatStatus === "migration-required"
								? h("span", { className: "dsm-badge warn" }, t("statusMigration"))
								: null,
						),
						h(
							"div",
							{ className: "dsm-metaLine" },
							h(
								"span",
								{ className: "dsm-metaWorkspace", title: workspace?.path ?? row.cwd ?? "" },
								workspaceTitle,
							),
							h("span", { className: "dsm-metaSep" }, "·"),
							h("span", { className: "dsm-metaId" }, shortId(row.id)),
						),
						snippet === undefined || snippet === "" ? null : h("div", { className: "dsm-snippet" }, snippet),
					),
				),
				h(
					"div",
					{ className: "dsm-updated", title: formatAbsolute(row.updatedAt) },
					relativeTime(row.updatedAt, t, now),
				),
				h(
					"div",
					{ className: "dsm-actions" },
					archived
						? [
								h(IconButton, {
									key: "restore-open",
									icon: "unarchive",
									label: t("restoreAndOpen"),
									disabled: busy,
									onClick: () => actions.restoreAndOpen(row),
								}),
								h(IconButton, {
									key: "rename",
									icon: "pencil",
									label: t("rename"),
									disabled: busy,
									onClick: () => actions.rename(row),
								}),
								h(IconButton, {
									key: "delete",
									icon: "trash",
									label: blockKey === undefined ? t("delete") : t(blockKey),
									disabled: busy || blockKey !== undefined,
									danger: true,
									onClick: () => actions.delete(row),
								}),
								h(IconButton, {
									key: "details",
									icon: "info",
									label: t("details"),
									disabled: busy,
									onClick: () => actions.details(row),
								}),
							]
						: [
								h(IconButton, {
									key: "open",
									icon: "open",
									label: t("open"),
									disabled: busy,
									onClick: () => actions.open(row),
								}),
								h(IconButton, {
									key: "rename",
									icon: "pencil",
									label: t("rename"),
									disabled: busy,
									onClick: () => actions.rename(row),
								}),
								h(IconButton, {
									key: "pin",
									icon: "pin",
									label: pinned ? t("unpin") : t("pin"),
									disabled: busy,
									onClick: () => actions.pin(row, pinned),
								}),
								h(IconButton, {
									key: "archive",
									icon: "archive",
									label: t("archive"),
									disabled: busy,
									danger: true,
									onClick: () => actions.archive(row),
								}),
								h(IconButton, {
									key: "fork",
									icon: "fork",
									label: row.blank ? t("forkNeedsTurn") : t("fork"),
									disabled: busy || row.blank,
									onClick: () => actions.fork(row),
								}),
								h(IconButton, {
									key: "delete",
									icon: "trash",
									label: blockKey === undefined ? t("delete") : t(blockKey),
									disabled: busy || blockKey !== undefined,
									danger: true,
									onClick: () => actions.delete(row),
								}),
								h(IconButton, {
									key: "details",
									icon: "info",
									label: t("details"),
									disabled: busy,
									onClick: () => actions.details(row),
								}),
							],
				),
			);
		}

		function DetailsPanel({ row, workspace, archived, pinned, busy, t, actions, onClose }) {
			const status = statusOf(row, archived, t);
			const source = row.parentId !== undefined ? t("sourceBranch") : row.origin === "subagent" ? t("sourceSubagent") : t("sourceMain");
			const preset = typeof row.projectionValues?.agentPreset === "string" ? row.projectionValues.agentPreset : undefined;
			const blockKey = deletionBlock(row);
			return h(
				"aside",
				{ className: "dsm-details", "aria-label": t("detailsTitle") },
				h(
					"div",
					{ className: "dsm-detailsHead" },
					h("span", { className: "dsm-detailsTitle" }, t("detailsTitle")),
					h(
						"button",
						{
							type: "button",
							className: "dsm-iconBtn",
							onClick: onClose,
							title: t("detailsClose"),
							"aria-label": t("detailsClose"),
						},
						h(Icon, { name: "close", size: 15 }),
					),
				),
				h(
					"div",
					{ className: "dsm-detailsNameRow" },
					h("span", { className: "dsm-dot " + status.tone, title: status.label, "aria-hidden": "true" }),
					h("div", { className: "dsm-detailsName" }, row.displayTitle ?? shortId(row.id)),
				),
				h(
					"div",
					{ className: "dsm-detailsActions" },
					archived
						? h(
								"button",
								{
									type: "button",
									className: "dsm-btn primary",
									disabled: busy,
									onClick: () => actions.restoreAndOpen(row),
								},
								t("restoreAndOpen"),
							)
						: h(
								"button",
								{
									type: "button",
									className: "dsm-btn primary",
									disabled: busy,
									onClick: () => actions.open(row),
								},
								t("open"),
							),
					h(
						"button",
						{ type: "button", className: "dsm-btn secondary", disabled: busy, onClick: () => actions.rename(row) },
						t("rename"),
					),
					archived
						? null
						: h(
								"button",
								{
									type: "button",
									className: "dsm-btn secondary",
									disabled: busy,
									onClick: () => actions.pin(row, pinned),
								},
								pinned ? t("unpin") : t("pin"),
							),
					archived
						? null
						: h(
								"button",
								{
									type: "button",
									className: "dsm-btn secondary",
									disabled: busy || row.blank,
									title: row.blank ? t("forkNeedsTurn") : undefined,
									onClick: () => actions.fork(row),
								},
								t("fork"),
							),
					archived
						? null
						: h(
								"button",
								{
									type: "button",
									className: "dsm-btn secondary danger",
									disabled: busy,
									onClick: () => actions.archive(row),
								},
								t("archive"),
							),
					h(
						"button",
						{
							type: "button",
							className: "dsm-btn secondary danger",
							disabled: busy || blockKey !== undefined,
							title: blockKey === undefined ? undefined : t(blockKey),
							onClick: () => actions.delete(row),
						},
						t("delete"),
					),
				),
				h(
					"div",
					{ className: "dsm-detailList" },
					h(
						DetailRow,
						{ label: t("idLabel"), mono: true },
						h(
							"div",
							{ className: "dsm-copyRow" },
							h("span", null, row.id),
							h(
								"button",
								{
									type: "button",
									className: "dsm-iconBtn",
									onClick: () => actions.copyId(row.id),
									title: t("copyId"),
									"aria-label": t("copyId"),
								},
								h(Icon, { name: "copy", size: 13 }),
							),
						),
					),
					h(DetailRow, { label: t("statusLabel") }, status.label),
					h(DetailRow, { label: t("workspaceLabel") }, workspace?.title ?? (baseName(row.cwd) || t("ungrouped"))),
					row.cwd === undefined ? null : h(DetailRow, { label: t("pathLabel"), mono: true }, row.cwd),
					h(DetailRow, { label: t("updatedLabel") }, formatAbsolute(row.updatedAt)),
					h(DetailRow, { label: t("sourceLabel") }, source),
					row.parentId === undefined ? null : h(DetailRow, { label: t("parentLabel"), mono: true }, row.parentId),
					preset === undefined ? null : h(DetailRow, { label: t("presetLabel") }, preset),
					row.formatStatus === undefined
						? null
						: h(
								DetailRow,
								{ label: t("formatLabel") },
								row.formatStatus === "migration-required" ? t("formatMigration") : t("formatCurrent"),
							),
				),
				row.formatStatus === "migration-required"
					? h(
							"div",
							{ className: "dsm-inlineWarn" },
							h(Icon, { name: "warning", size: 14 }),
							h("span", null, t("errorMigration")),
						)
					: null,
			);
		}

		/**
		 * Register the sidebar entry and the main management panel.
		 * @param ctx - browser plugin context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { en, zh }), "session-manager: dictionaries");
			const t = ctx.locale.bind(NS);

			ctx.slots.inject("sidebar.panellist", () =>
				ctx.slots.register(
					{
						name: "sidebar.panellist",
						id: PANEL_ID,
						order: 20,
						label: () => ctx.locale.bind(NS)("panel"),
						locale: NS,
					},
					SidebarIcon,
				),
			);

			function SessionManagerPage(props) {
				const tr = props.t ?? t;
				const sessions = ctx.sessions;
				const workspaces = ctx.workspaces;
				const list = useStore(sessions.list);
				const workspaceState = useStore(workspaces.list);
				const [query, setQuery] = React.useState("");
				const [filter, setFilter] = React.useState("all");
				const [sort, setSort] = React.useState("updated");
				const [contentHits, setContentHits] = React.useState({});
				const [searchHasMore, setSearchHasMore] = React.useState(false);
				const [searching, setSearching] = React.useState(false);
				const [searchError, setSearchError] = React.useState(null);
				const [searchDisabled, setSearchDisabled] = React.useState(false);
				const [selectedId, setSelectedId] = React.useState(null);
				const [checked, setChecked] = React.useState(() => new Set());
				const [busy, setBusy] = React.useState(() => new Set());
				const [notice, setNotice] = React.useState(null);
				const [dialog, setDialog] = React.useState(null);
				const [refreshing, setRefreshing] = React.useState(false);
				const [page, setPage] = React.useState(1);
				const [pageSize, setPageSize] = React.useState(PAGE_SIZES[0]);
				const [detailsTop, setDetailsTop] = React.useState(0);
				const contentRef = React.useRef(null);
				const [now, setNow] = React.useState(() => Date.now());
				const [listSettled, setListSettled] = React.useState(false);
				const [listFailure, setListFailure] = React.useState(null);
				const refreshingRef = React.useRef(false);
				const trRef = React.useRef(tr);
				trRef.current = tr;

				const notify = React.useCallback((tone, text) => {
					setNotice({ id: Date.now() + Math.random(), tone, text });
				}, []);

				const workspaceUi = () => {
					const service = ctx.get("uiWorkspace");
					if (service === undefined) throw new Error("Workspace UI is unavailable");
					return service;
				};

				const markBusy = React.useCallback((ids, value) => {
					setBusy((previous) => {
						const next = new Set(previous);
						for (const id of ids) {
							if (value) next.add(id);
							else next.delete(id);
						}
						return next;
					});
				}, []);

				const allRows = React.useMemo(
					() => list.ids.map((id) => list.byId[id]).filter((row) => row !== undefined && row.origin !== "subagent"),
					[list],
				);
				const rowsById = React.useMemo(() => new Map(allRows.map((row) => [row.id, row])), [allRows]);
				const archivedSet = React.useMemo(() => new Set(workspaceState.archivedSessionIds), [workspaceState.archivedSessionIds]);
				const pinnedSet = React.useMemo(() => new Set(workspaceState.pinnedSessionIds), [workspaceState.pinnedSessionIds]);
				const workspaceBySession = React.useMemo(() => {
					const map = new Map();
					for (const workspace of workspaceState.items) {
						for (const id of workspace.sessionIds) map.set(id, workspace);
					}
					return map;
				}, [workspaceState.items]);

				const counts = React.useMemo(() => {
					let running = 0;
					let archived = 0;
					let blank = 0;
					for (const row of allRows) {
						if (row.running) running += 1;
						if (archivedSet.has(row.id)) archived += 1;
						else if (row.blank) blank += 1;
					}
					return { all: allRows.length, running, archived, blank };
				}, [allRows, archivedSet]);

				React.useEffect(() => {
					setPage(1);
					setChecked(new Set());
				}, [query, filter, sort]);

				React.useEffect(() => {
					const timer = window.setInterval(() => setNow(Date.now()), 60_000);
					return () => window.clearInterval(timer);
				}, []);

				React.useEffect(() => {
					if (selectedId !== null && !allRows.some((row) => row.id === selectedId)) setSelectedId(null);
				}, [allRows, selectedId]);

				React.useEffect(() => {
					if (selectedId === null || dialog !== null) return;
					const onKeyDown = (event) => {
						if (event.key === "Escape") setSelectedId(null);
					};
					window.addEventListener("keydown", onKeyDown);
					return () => window.removeEventListener("keydown", onKeyDown);
				}, [selectedId, dialog]);

				const refreshCatalog = React.useCallback(async () => {
					if (refreshingRef.current) return;
					refreshingRef.current = true;
					setRefreshing(true);
					try {
						await sessions.refresh();
						const failure = sessions.manager?.listError;
						if (failure !== undefined && failure !== null) {
							const message =
								typeof failure === "string"
									? failure
									: (failure.message ?? failure.code ?? trRef.current("errorGeneric"));
							setListFailure(message);
							notify("error", trRef.current("refreshFailed", { message }));
						} else {
							setListFailure(null);
						}
					} catch (reason) {
						const message = describeError(reason, trRef.current);
						setListFailure(message);
						notify("error", trRef.current("refreshFailed", { message }));
					} finally {
						refreshingRef.current = false;
						setRefreshing(false);
						setListSettled(true);
					}
				}, [sessions, notify]);

				React.useEffect(() => {
					void refreshCatalog();
				}, [refreshCatalog]);

				React.useEffect(() => {
					const text = query.trim();
					if (text.length < 2 || searchDisabled) {
						setContentHits({});
						setSearchHasMore(false);
						setSearching(false);
						setSearchError(null);
						return;
					}
					const controller = new AbortController();
					setSearching(true);
					setSearchError(null);
					const timer = window.setTimeout(async () => {
						try {
							const result = await sessions.search(text, controller.signal);
							if (controller.signal.aborted) return;
							if (!result.ok) {
								const failure = rpcFailure(result.error);
								if (contentSearchDisabled(failure)) {
									setSearchDisabled(true);
									setContentHits({});
									setSearchHasMore(false);
									setSearchError(null);
									return;
								}
								setContentHits({});
								setSearchHasMore(false);
								setSearchError(describeError(failure, tr));
								return;
							}
							const hits = {};
							for (const item of result.value.items) hits[item.sessionId] = item.snippet;
							setContentHits(hits);
							setSearchHasMore(result.value.hasMore);
						} catch (reason) {
							if (controller.signal.aborted || reason?.name === "AbortError") return;
							if (contentSearchDisabled(reason)) {
								setSearchDisabled(true);
								setContentHits({});
								setSearchHasMore(false);
								setSearchError(null);
								return;
							}
							setContentHits({});
							setSearchHasMore(false);
							setSearchError(describeError(reason, tr));
						} finally {
							if (!controller.signal.aborted) setSearching(false);
						}
					}, 280);
					return () => {
						window.clearTimeout(timer);
						controller.abort();
					};
				}, [query, sessions, searchDisabled]);

				const queryNorm = query.trim().toLocaleLowerCase();
				const filtered = React.useMemo(() => {
					const rows = allRows.filter((row) => {
						const archived = archivedSet.has(row.id);
						if (filter === "running" && !row.running) return false;
						if (filter === "archived" && !archived) return false;
						if (filter === "blank" && (archived || !row.blank)) return false;
						if (queryNorm === "") return true;
						if ((row.displayTitle ?? "").toLocaleLowerCase().includes(queryNorm)) return true;
						if (String(row.id).toLocaleLowerCase().includes(queryNorm)) return true;
						return Object.prototype.hasOwnProperty.call(contentHits, row.id);
					});
					rows.sort((left, right) => {
						if (sort === "title") {
							return collator.compare(left.displayTitle ?? "", right.displayTitle ?? "");
						}
						if (sort === "workspace") {
							const leftWorkspace = workspaceBySession.get(left.id)?.title ?? "";
							const rightWorkspace = workspaceBySession.get(right.id)?.title ?? "";
							const byWorkspace = collator.compare(leftWorkspace, rightWorkspace);
							if (byWorkspace !== 0) return byWorkspace;
						}
						const byUpdated = right.updatedAt - left.updatedAt;
						if (byUpdated !== 0) return byUpdated;
						return collator.compare(left.displayTitle ?? "", right.displayTitle ?? "");
					});
					return rows;
				}, [allRows, archivedSet, filter, queryNorm, contentHits, sort, workspaceBySession]);

				const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
				const currentPage = Math.min(page, pageCount);
				const pageStart = (currentPage - 1) * pageSize;
				const visible = filtered.slice(pageStart, pageStart + pageSize);
				const pageFrom = filtered.length === 0 ? 0 : pageStart + 1;
				const pageTo = Math.min(pageStart + pageSize, filtered.length);
				const visibleIds = visible.map((row) => row.id);
				const allVisibleChecked = visibleIds.length > 0 && visibleIds.every((id) => checked.has(id));
				const someVisibleChecked = visibleIds.some((id) => checked.has(id));
				const selectedRows = allRows.filter((row) => checked.has(row.id));
				const selectedActive = selectedRows.filter((row) => !archivedSet.has(row.id));
				const selectedArchived = selectedRows.filter((row) => archivedSet.has(row.id));
				const selectedRow = selectedId === null ? undefined : allRows.find((row) => row.id === selectedId);

				const goToPage = (next) => {
					setPage(Math.max(1, Math.min(next, pageCount)));
					setChecked(new Set());
				};

				React.useEffect(() => {
					if (page > pageCount) setPage(pageCount);
				}, [page, pageCount]);

				React.useLayoutEffect(() => {
					const content = contentRef.current;
					if (selectedId === null || content === null) {
						setDetailsTop(0);
						return;
					}
					const measure = () => {
						const row = [...content.querySelectorAll("[data-session-id]")].find(
							(element) => element.getAttribute("data-session-id") === selectedId,
						);
						if (row === undefined) return;
						const contentRect = content.getBoundingClientRect();
						const list = content.querySelector(".dsm-listCard");
						const drawer = content.querySelector(".dsm-details");
						const listHeight = list?.getBoundingClientRect().height ?? contentRect.height;
						const drawerHeight = drawer?.getBoundingClientRect().height ?? 0;
						const desired = Math.max(0, row.getBoundingClientRect().top - contentRect.top);
						const top = Math.max(0, Math.min(desired, Math.max(0, listHeight - drawerHeight)));
						setDetailsTop((previous) => (Math.abs(previous - top) < 1 ? previous : top));
					};
					measure();
					window.addEventListener("resize", measure);
					return () => window.removeEventListener("resize", measure);
				}, [selectedId, page, pageSize, filtered]);

				const runBusy = async (ids, operation) => {
					const unique = [...new Set(ids)];
					markBusy(unique, true);
					try {
						return await operation();
					} finally {
						markBusy(unique, false);
					}
				};

				const renameSession = async (id, title) => {
					if (typeof sessions.manager?.rename === "function") {
						const result = await sessions.manager.rename(id, title);
						if (!result.ok) throw rpcFailure(result.error);
						return;
					}
					const result = await sessions.using(id, { source: "sessionManager" }, (reference) =>
						reference.binding.session.rename(title),
					);
					if (!result.ok) throw rpcFailure(result.error);
				};

				const archiveMany = async (ids) => {
					const succeeded = [];
					const failures = [];
					for (const id of ids) {
						const row = rowsById.get(id);
						try {
							await workspaceUi().archiveSession(id, { stopActivity: row?.running === true });
							succeeded.push(id);
						} catch (reason) {
							failures.push(reason);
						}
					}
					if (succeeded.length > 0) Promise.resolve(sessions.refresh()).catch(() => {});
					return { ok: succeeded.length, failed: failures.length, firstError: failures[0] };
				};

				const unarchiveMany = async (ids) => {
					const succeeded = [];
					const failures = [];
					for (const id of ids) {
						try {
							await workspaceUi().unarchiveSession(id);
							succeeded.push(id);
						} catch (reason) {
							failures.push(reason);
						}
					}
					return { ok: succeeded.length, failed: failures.length, firstError: failures[0] };
				};

				const openSession = (row) => {
					if (archivedSet.has(row.id)) {
						notify("error", tr("archivedNotOpenable"));
						return;
					}
					try {
						workspaceUi().openSession(row.id);
					} catch (reason) {
						notify("error", tr("openFailed", { message: describeError(reason, tr) }));
					}
				};

				const restoreAndOpen = async (row) => {
					await runBusy([row.id], async () => {
						try {
							await workspaceUi().unarchiveSession(row.id);
							workspaceUi().openSession(row.id);
						} catch (reason) {
							notify("error", tr("restoreFailed", { message: describeError(reason, tr) }));
						}
					});
				};

				const togglePin = async (row, pinned) => {
					await runBusy([row.id], async () => {
						try {
							if (pinned) await workspaceUi().unpinSession(row.id);
							else await workspaceUi().pinSession(row.id);
							notify("success", pinned ? tr("unpinned") : tr("pinned"));
						} catch (reason) {
							notify("error", tr(pinned ? "unpinFailed" : "pinFailed", { message: describeError(reason, tr) }));
						}
					});
				};

				const forkSession = async (row) => {
					await runBusy([row.id], async () => {
						try {
							const childId = await workspaceUi().forkSession(row.id, undefined, { allowMigration: false });
							notify("success", tr("forked", { id: shortId(childId) }));
						} catch (reason) {
							if (reason?.rpcError?.code === "session/migration-required") notify("error", tr("forkNeedsOpen"));
							else notify("error", tr("forkFailed", { message: describeError(reason, tr) }));
						} finally {
							Promise.resolve(sessions.refresh()).catch(() => {});
						}
					});
				};

				const copyId = async (id) => {
					try {
						await copyText(id);
						notify("success", tr("copied"));
					} catch (_reason) {
						notify("error", tr("copyFailed"));
					}
				};

				const archiveForDialog = async (ids) => {
					const result = await archiveMany(ids);
					if (result.failed > 0) {
						throw new Error(
							result.ok > 0
								? tr("bulkPartial", { ok: result.ok, failed: result.failed }) +
										" " +
										describeError(result.firstError, tr)
								: tr("archiveFailed", { message: describeError(result.firstError, tr) }),
						);
					}
					setChecked((previous) => {
						const next = new Set(previous);
						for (const id of ids) next.delete(id);
						return next;
					});
					notify("success", tr("archived", { n: result.ok }));
				};

				const bulkArchive = () => {
					const ids = selectedActive.map((row) => row.id);
					if (ids.length === 0) return;
					setDialog({ kind: "archive", ids });
				};

				const bulkUnarchive = async () => {
					const ids = selectedArchived.map((row) => row.id);
					if (ids.length === 0) return;
					await runBusy(ids, async () => {
						const result = await unarchiveMany(ids);
						if (result.failed > 0) {
							notify(
								"error",
								tr("bulkPartial", { ok: result.ok, failed: result.failed }) +
									" " +
									describeError(result.firstError, tr),
							);
						} else {
							notify("success", tr("bulkRestored", { n: result.ok }));
							setChecked(new Set());
						}
					});
				};

				const deleteForDialog = async (ids) => {
					const result = await requestSessionDeletion(ids);
					await Promise.resolve(sessions.refresh()).catch(() => {});
					const deleted = Array.isArray(result.deleted) ? result.deleted : [];
					const failures = Array.isArray(result.failed) ? result.failed : [];
					if (deleted.length > 0) {
						setChecked((previous) => {
							const next = new Set(previous);
							for (const id of deleted) next.delete(id);
							return next;
						});
					}
					if (failures.length > 0) {
						const failedIds = new Set(failures.map((failure) => failure.sessionId));
						setDialog((previous) =>
							previous?.kind === "delete"
								? { ...previous, ids: previous.ids.filter((id) => failedIds.has(id)) }
								: previous,
						);
						const first = deletionFailureText(failures[0], tr);
						throw new Error(
							deleted.length > 0
								? tr("deletePartial", { ok: deleted.length, failed: failures.length }) + " " + first
								: tr("deleteFailed", { message: first }),
						);
					}
					setChecked((previous) => {
						const next = new Set(previous);
						for (const id of ids) next.delete(id);
						return next;
					});
					const warnings = Array.isArray(result.warnings) ? result.warnings : [];
					notify(
						"success",
						warnings.length > 0
							? tr("deletedWithWarnings", { n: deleted.length, warnings: warnings.length }) + " " + warnings[0]
							: tr("deleted", { n: deleted.length }),
					);
				};

				const bulkDelete = () => {
					const eligible = selectedRows.filter((row) => deletionBlock(row) === undefined);
					const blocked = selectedRows.filter((row) => !row.blank && deletionBlock(row) !== undefined).length;
					const blank = selectedRows.filter((row) => row.blank).length;
					if (eligible.length === 0) {
						notify("error", tr("deleteEmpty"));
						return;
					}
					setDialog({ kind: "delete", ids: eligible.map((row) => row.id), blocked, blank });
				};

				const handleRefresh = () => {
					void refreshCatalog();
				};

				const toggleChecked = (id) => {
					setChecked((previous) => {
						const next = new Set(previous);
						if (next.has(id)) next.delete(id);
						else next.add(id);
						return next;
					});
				};

				const toggleAll = () => {
					if (allVisibleChecked) {
						setChecked((previous) => {
							const next = new Set(previous);
							for (const id of visibleIds) next.delete(id);
							return next;
						});
						return;
					}
					setChecked((previous) => {
						const next = new Set(previous);
						for (const id of visibleIds) next.add(id);
						return next;
					});
				};

				const actions = {
					open: openSession,
					rename: (row) => setDialog({ kind: "rename", id: row.id, title: row.title ?? "" }),
					pin: togglePin,
					archive: (row) => setDialog({ kind: "archive", ids: [row.id] }),
					delete: (row) => setDialog({ kind: "delete", ids: [row.id], blocked: 0, blank: 0 }),
					restoreAndOpen,
					fork: forkSession,
					details: (row) => setSelectedId(row.id),
					copyId,
					toggleChecked,
				};

				const filterOptions = [
					{ key: "all", label: tr("filterAll"), count: counts.all },
					{ key: "running", label: tr("filterRunning"), count: counts.running },
					{ key: "archived", label: tr("filterArchived"), count: counts.archived },
					{ key: "blank", label: tr("filterBlank"), count: counts.blank },
				];
				const statOptions = [
					{ key: "all", label: tr("statAll"), count: counts.all },
					{ key: "running", label: tr("statRunning"), count: counts.running },
					{ key: "archived", label: tr("statArchived"), count: counts.archived },
					{ key: "blank", label: tr("statBlank"), count: counts.blank },
				];
				const hasFilters = query.trim() !== "" || filter !== "all";
				const contentSearchNote =
					query.trim().length < 2
						? null
						: searchDisabled
							? { tone: "muted", text: tr("searchUnavailable") }
							: searchError !== null
								? { tone: "error", text: tr("searchFailed", { message: searchError }) }
								: searching
									? { tone: "muted", text: tr("searching") }
									: {
											tone: "muted",
											text:
												tr("searchMatches", { n: Object.keys(contentHits).length }) +
												(searchHasMore ? " · " + tr("searchMore") : ""),
										};

				const renderEmpty = () => {
					const noRows = allRows.length === 0;
					return h(
						"div",
						{ className: "dsm-empty" },
						h("div", { className: "dsm-emptyIcon" }, h(Icon, { name: "sessions", size: 30 })),
						h("div", { className: "dsm-emptyTitle" }, noRows ? tr("emptyTitle") : tr("noResultsTitle")),
						h("p", { className: "dsm-emptyBody" }, noRows ? tr("emptyBody") : tr("noResultsBody")),
						noRows
							? null
							: h(
									"button",
									{
										type: "button",
										className: "dsm-btn secondary",
										onClick: () => {
											setQuery("");
											setFilter("all");
										},
									},
									tr("clearFilters"),
								),
					);
				};

				const renderBody = () => {
					if (!listSettled && list.phase === "pending" && allRows.length === 0) {
						return h(
							"div",
							{ className: "dsm-skeleton", "aria-label": tr("loading") },
							Array.from({ length: 6 }, (_value, index) =>
								h("div", { key: index, className: "dsm-skeletonRow" }),
							),
						);
					}
					if (listFailure !== null && allRows.length === 0) {
						return h(
							"div",
							{ className: "dsm-empty" },
							h("div", { className: "dsm-emptyIcon" }, h(Icon, { name: "warning", size: 30 })),
							h("div", { className: "dsm-emptyTitle" }, tr("loadFailed")),
							h("p", { className: "dsm-emptyBody" }, listFailure),
							h("button", { type: "button", className: "dsm-btn secondary", onClick: handleRefresh }, tr("retry")),
						);
					}
					if (filtered.length === 0) return renderEmpty();
					return h(
						React.Fragment,
						null,
						h(
							"div",
							{ className: "dsm-tableHead" },
							h(
								"div",
								{ className: "dsm-checkCell" },
								h(TriCheckbox, {
									checked: allVisibleChecked,
									indeterminate: !allVisibleChecked && someVisibleChecked,
									onChange: toggleAll,
									label: tr("selectAll"),
								}),
							),
							h("div", null, tr("colSession")),
							h("div", null, tr("colUpdated")),
							h("div", { style: { textAlign: "right" } }, tr("colActions")),
						),
						visible.map((row) =>
							h(SessionRow, {
								key: row.id,
								row,
								workspace: workspaceBySession.get(row.id),
								archived: archivedSet.has(row.id),
								pinned: pinnedSet.has(row.id),
								checked: checked.has(row.id),
								busy: busy.has(row.id),
								snippet: contentHits[row.id],
								now,
								t: tr,
								actions,
							}),
						),
						h(
							"div",
							{ className: "dsm-listFoot" },
							h("span", { className: "dsm-range" }, tr("pageRange", { from: pageFrom, to: pageTo, total: filtered.length })),
							h(
								"div",
								{ className: "dsm-pager", role: "navigation", "aria-label": tr("pagination") },
								h(
									"label",
									{ className: "dsm-pageSize" },
									h("span", null, tr("pageSize")),
									h(
										"select",
										{
											className: "dsm-select dsm-pageSelect",
											value: pageSize,
											onChange: (event) => {
												setPageSize(Number(event.target.value));
												setPage(1);
												setChecked(new Set());
											},
										},
										PAGE_SIZES.map((size) => h("option", { key: size, value: size }, size)),
									),
								),
								h(
									"button",
									{
										type: "button",
										className: "dsm-pageBtn",
										onClick: () => goToPage(currentPage - 1),
										disabled: currentPage <= 1,
										title: tr("previousPage"),
										"aria-label": tr("previousPage"),
									},
									"‹",
								),
								paginationItems(pageCount, currentPage).map((item) =>
									typeof item === "string"
										? h("span", { key: item, className: "dsm-pageEllipsis", "aria-hidden": "true" }, "…")
										: h(
												"button",
												{
													key: item,
													type: "button",
													className: "dsm-pageBtn" + (item === currentPage ? " is-current" : ""),
													onClick: () => goToPage(item),
													"aria-current": item === currentPage ? "page" : undefined,
													"aria-label": tr("pageNumber", { n: item }),
												},
												item,
											),
								),
								h(
									"button",
									{
										type: "button",
										className: "dsm-pageBtn",
										onClick: () => goToPage(currentPage + 1),
										disabled: currentPage >= pageCount,
										title: tr("nextPage"),
										"aria-label": tr("nextPage"),
									},
									"›",
								),
							),
						),
					);
				};

				const dialogRows =
					dialog?.kind === "archive" || dialog?.kind === "delete"
						? dialog.ids.map((id) => rowsById.get(id)).filter((row) => row !== undefined)
						: [];
				const renameTarget = dialog?.kind === "rename" ? rowsById.get(dialog.id) : undefined;

				return h(
					"div",
					{ className: "dsm-page" },
					h("style", null, css),
					h(
						"div",
						{ className: "dsm-scroll" },
						h(
							"div",
							{ className: "dsm-inner" },
							h(
								"header",
								{ className: "dsm-header" },
								h(
									"div",
									{ className: "dsm-headerText" },
									h("h1", { className: "dsm-h1" }, tr("title")),
									h("p", { className: "dsm-sub" }, tr("subtitle")),
								),
								h(
									"div",
									{ className: "dsm-headerActions" },
									h(
										"button",
										{
											type: "button",
											className: "dsm-btn secondary",
											onClick: handleRefresh,
											disabled: refreshing,
										},
										h(Icon, { name: "refresh", size: 15, className: refreshing ? "dsm-spinning" : undefined }),
										h("span", null, refreshing ? tr("refreshing") : tr("refresh")),
									),
								),
							),
							h(
								"section",
								{ className: "dsm-stats", "aria-label": tr("title") },
								statOptions.map((stat) =>
									h(
										"button",
										{
											key: stat.key,
											type: "button",
											className: "dsm-stat",
											"aria-pressed": filter === stat.key,
											onClick: () => setFilter(stat.key),
										},
										h("span", { className: "dsm-statLabel" }, stat.label),
										h("span", { className: "dsm-statValue" }, stat.count),
									),
								),
							),
							h(
								"div",
								{ className: "dsm-toolbar" },
								h(
									"div",
									{ className: "dsm-search" },
									h(Icon, { name: "search", size: 15, className: "dsm-searchIcon" }),
									h("input", {
										type: "search",
										value: query,
										placeholder: tr("searchPlaceholder"),
										"aria-label": tr("searchAria"),
										onChange: (event) => setQuery(event.target.value),
										onKeyDown: (event) => {
											if (event.key === "Escape") setQuery("");
										},
									}),
									query === ""
										? null
										: h(
												"button",
												{
													type: "button",
													className: "dsm-searchClear",
													onClick: () => setQuery(""),
													title: tr("clearSearch"),
													"aria-label": tr("clearSearch"),
												},
												h(Icon, { name: "close", size: 13 }),
											),
								),
								h(
									"div",
									{ className: "dsm-filters", role: "group", "aria-label": tr("title") },
									filterOptions.map((option) =>
										h(
											"button",
											{
												key: option.key,
												type: "button",
												className: "dsm-filter",
												"aria-pressed": filter === option.key,
												onClick: () => setFilter(option.key),
											},
											h("span", null, option.label),
											h("span", { className: "dsm-count" }, option.count),
										),
									),
								),
								h(
									"label",
									{ className: "dsm-sort" },
									h("span", { className: "dsm-sortLabel" }, tr("sortLabel")),
									h(
										"select",
										{
											className: "dsm-select",
											value: sort,
											onChange: (event) => setSort(event.target.value),
											"aria-label": tr("sortLabel"),
										},
										h("option", { value: "updated" }, tr("sortUpdated")),
										h("option", { value: "title" }, tr("sortTitle")),
										h("option", { value: "workspace" }, tr("sortWorkspace")),
									),
								),
							),
							contentSearchNote === null
								? null
								: h(
										"div",
										{
											className: "dsm-searchNote" + (contentSearchNote.tone === "error" ? " error" : ""),
											"aria-live": "polite",
										},
										contentSearchNote.text,
									),
							checked.size === 0
								? null
								: h(
										"div",
										{ className: "dsm-bulk" },
										h("span", { className: "dsm-bulkText" }, tr("selected", { n: checked.size })),
										selectedActive.length === 0
											? null
											: h(
													"button",
													{ type: "button", className: "dsm-btn secondary danger", onClick: bulkArchive },
													tr("bulkArchive"),
												),
										selectedArchived.length === 0
											? null
											: h(
													"button",
													{ type: "button", className: "dsm-btn secondary", onClick: bulkUnarchive },
													tr("bulkRestore"),
												),
										selectedRows.some((row) => deletionBlock(row) === undefined)
											? h(
													"button",
													{ type: "button", className: "dsm-btn secondary danger", onClick: bulkDelete },
													tr("bulkDelete"),
												)
											: null,
										h("span", { className: "dsm-bulkSpacer" }),
										h(
											"button",
											{ type: "button", className: "dsm-btn secondary", onClick: () => setChecked(new Set()) },
											tr("clearSelection"),
										),
									),
							h(
								"div",
								{
									className: "dsm-content",
									ref: contentRef,
									style: { "--dsm-details-top": `${detailsTop}px` },
								},
								h("div", { className: "dsm-listCard" }, renderBody()),
								selectedRow === undefined
									? null
									: h(
											React.Fragment,
											null,
											h("div", {
												className: "dsm-detailsScrim",
												onClick: () => setSelectedId(null),
												"aria-hidden": "true",
											}),
											h(DetailsPanel, {
												row: selectedRow,
												workspace: workspaceBySession.get(selectedRow.id),
												archived: archivedSet.has(selectedRow.id),
												pinned: pinnedSet.has(selectedRow.id),
												busy: busy.has(selectedRow.id),
												t: tr,
												actions,
												onClose: () => setSelectedId(null),
											}),
										),
							),
						),
					),
					dialog?.kind === "rename" && renameTarget !== undefined
						? h(RenameDialog, {
								key: "rename:" + renameTarget.id,
								session: renameTarget,
								t: tr,
								onClose: () => setDialog(null),
								onSubmit: async (title) => {
									await renameSession(renameTarget.id, title);
									notify("success", tr("renamed"));
								},
							})
						: null,
					dialog?.kind === "archive"
						? h(ArchiveDialog, {
								key: "archive:" + dialog.ids.join(","),
								rows: dialogRows,
								t: tr,
								onClose: () => setDialog(null),
								onConfirm: () => archiveForDialog(dialog.ids),
							})
						: null,
					dialog?.kind === "delete"
						? h(DeleteDialog, {
								key: "delete",
								rows: dialogRows,
								blockedCount: dialog.blocked ?? 0,
								blankCount: dialog.blank ?? 0,
								t: tr,
								onClose: () => setDialog(null),
								onConfirm: () => deleteForDialog(dialog.ids),
							})
						: null,
					notice === null ? null : h(Toast, { key: notice.id, notice, closeLabel: tr("close"), onClose: () => setNotice(null) }),
				);
			}

			ctx.slots.inject("main", () =>
				ctx.slots.register(
					{
						name: "main",
						key: PANEL_ID,
						locale: NS,
					},
					SessionManagerPage,
				),
			);
		}

		exports.NS = NS;
		exports.PANEL_ID = PANEL_ID;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	},
});
