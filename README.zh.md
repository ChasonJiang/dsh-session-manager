# DSH 会话管理插件

一个本地 DSH Web UI 插件，在左侧边栏增加 **会话** 面板，用来集中浏览、搜索和整理 Harness 会话。

## 功能

- 浏览全部普通会话，显示工作区、状态和最近更新时间
- 按标题、会话 ID 即时筛选，并通过 Host 的 `session.search` 搜索消息内容
- 按 全部 / 运行中 / 已归档 / 空白 过滤，按最近更新、标题或工作区排序
- 对单个会话执行：打开、重命名、置顶/取消置顶、归档、恢复、创建分支、复制 ID、查看详情
- **永久删除**：删除已关闭会话的存储日志；删除父会话时一并删除子会话
- **分页**：页码、上一页/下一页和每页数量选择（20/50/100）；切换页面或每页数量会清空批量选择
- **浮动详情**：详情从右侧浮在会话列表之上，并跟随选中行的高度，不再占用列表宽度；点击浮层外、按 Escape 或点关闭按钮都可收起
- 批量选择后归档、恢复或永久删除
- 归档或删除前会明确提示影响范围，并要求确认
- 跟随现有 Client 服务实时更新标题、运行状态、归档状态和置顶状态

## 位置

- 侧边栏入口：**会话 / Sessions**，排序值 20
- 主面板 key：`session-manager`
- 语言命名空间：`sessionManager`
- 包名：`@local/dsh-session-manager`

## 使用的 API

| 能力 | API |
| --- | --- |
| 会话列表、重命名、内容搜索 | `ctx.sessions` |
| 打开、归档、恢复、创建分支、置顶 | `ctx.uiWorkspace` |
| 工作区名称、归档集合、置顶集合 | `ctx.workspaces.list` |
| 面板注册 | `ctx.slots.inject("main")`、`ctx.slots.inject("sidebar.panellist")` |
| 本地化 | `ctx.locale` |
| 永久删除 | 需要认证的 Host 路由 `POST /api/session.manager.delete` |

Host 侧删除使用 JSONL 后端的 `sessionPersistence.root` 和 `location.path`。DSH 的持久化层明确没有删除 API，官方把清理定义为“带外维护”；插件按这个边界实现，并加了下面这些保护：

1. 浏览器必须携带管理请求头并发送 `confirmed: true`。
2. `ctx.agents.get(id)` 或 `ctx.sessions.get(id)` 仍能找到会话，或会话拥有运行中/停止中的后台任务时，拒绝删除。
3. 删除前校验 JSONL 的 project/session 目录结构：会话目录必须是真实目录而不是符号链接；只允许已知的 generation、锁和迁移临时文件；路径必须位于持久化根目录内。
4. 先对根会话执行 `archiveSession(..., { stopActivity: true })`，让归档门禁和停止流程覆盖提醒与子会话工作。
5. 所有目录先原子重命名到同级的 `.session-manager-trash/tx-*` 事务目录；全部成功后才删除，任一重命名失败则回滚。
6. 子会话随父会话一起删除，并清理归档/置顶记录。

### 删除限制

- 运行中的会话和活动后台任务会被拒绝；归档/切换会话后遗留的 idle Host Agent 会先通过 loop scope 关闭，再移动日志文件。当前正在运行的对话不能删除自己。
- 仍有活动后台任务的会话会被拒绝，需先停止任务。
- 永久删除目前只支持随附的 JSONL 持久化布局；没有可删除 `root` 和 `location` 元数据的后端会被拒绝。
- 投影缓存和附件对象不会删除；它们属于外部缓存/内容存储，可能继续占用磁盘，需由对应存储清理。
- 工作区成员记录可能在下一次工作区变更前保留失效 ID；会话列表本身以持久化结果为准。

Host 侧没有任何伪造的“官方删除 API”：删除是受控的带外维护，其他管理操作继续调用 DSH 已有的 Host API。

## 设计说明

- 页面是注册在 `main` 插槽中的普通 React 组件，不替换应用根节点。
- 只使用 `--dsw-alias-*` 主题 token，自动适配明暗主题。
- 弹窗支持 Escape、初始焦点、焦点归还和基础 Tab 焦点循环；归档弹窗默认聚焦“取消”。
- 搜索做了防抖和取消，切换查询时不会让旧结果覆盖新结果。
- 不加载 `@deepseek-ai/dsh-client-ui-primitives` 等 Client 包；只从浏览器模块表取 `react`。
- 列表默认每页 20 个会话，可切换 20/50/100，采用页码分页，不再使用“加载更多”式长列表。
- 详情面板是浮动抽屉：会话列表保持全宽，详情覆盖在行内容之上并带阴影；点击浮层外、按 Escape 或点关闭按钮都可收起。

## 已知限制

- **永久删除需要工作已停止**：运行中的会话和活动后台任务会被拒绝，不会静默停止。归档会话遗留的 idle Host Agent 会自动关闭后再移动文件。可以先用**归档**隐藏运行中的会话，等任务结束后再删除。
- **已归档会话不能直接打开**：使用“恢复并打开”，与 Host 自身规则一致。
- 子会话（subagent）不列入顶层列表，仍从父会话管理，并随父会话删除。
- 需要格式迁移的会话，需先打开一次再创建分支。
- 删除仅支持 JSONL 后端；投影缓存/附件缓存留给各自存储服务清理。
- 内容搜索依赖可选的 session-query 索引。随附的 `session-query-sqlite` 行保持 `openAt: never` 时，插件会降级为标题/ID 匹配并显示中性提示；如需启用内容搜索，可在后续 patch 层把该行覆盖为 `openAt: first-search`（或 `startup`）并配置持久化 `path`。

## 开发与安装

无需构建步骤：

```text
index.js            Host 路由：受控永久删除 + 回收站事务
client.js           侧边栏图标 + 管理页面
cordis.patch.yml    插入 session-manager 行
locale/en.json      英文元数据
locale/zh.json      中文元数据
icon.svg            插件图标
```

通过 DSH 插件管理器的 `install_bundle` 安装本目录，然后刷新 Web 页面。如果替换的是已经加载过的 Host bundle，可能需要重启 Harness 才会加载新的 `/api/session.manager.delete` 路由。禁用或移除 bundle 会同时移除侧边栏入口、面板和删除路由。
