---
name: agent-modules-sync
description: >-
  全量同步 Agent Modules：检查并升级 npm 全局包 agent-modules、同步内置 agent-modules* skills、
  对内部订阅配置中所有仓库 git pull 并按 scope 同步 skills/rules。
  在用户调用 /agent-modules-sync、要求更新 Agent Modules、或同步已订阅仓库时使用。
---

# agent-modules-sync — 全量同步

## 目标

一次完成：

1. **npm 包**：对比 registry 最新版与当前全局安装的 `agent-modules`；若有新版本则 **`npm install -g agent-modules@<latest>`**。
2. **内置 skills**：将 npm 包内 **`skills/agent-modules*`** 同步到各已检测 Agent 的**全局** skills 目录（有变更才复制，已是最新则跳过）。
3. **订阅仓库**：读取 **`~/.agentModules`** 内部订阅中每一项（**`scope: global`** 或 **`scope: project`** + 项目路径）：
   - 在 **`~/.agentModules/sources/<host>/<org>/<repo>`** 执行 **`git pull --ff-only`**（未 clone 则 clone）；
   - 按仓库 **`config.yaml`** 的 **`prefixes`**（无则 fallback）将 **skills/**、**rules/** 同步到对应目录。

## 前置

- 已执行 **`npm install -g agent-modules`** 与 **`agent-modules`**（初始化）。
- 需要 **Git**；升级与 registry 对比需要 **npm** 与网络。

若未初始化，引导用户先运行 **`agent-modules`**（在安装 CLI 之后）。

## 执行（内部 CLI，勿写入面向用户的 README）

在 Shell 中**实际运行**：

```sh
agent-modules refresh
```

离线或跳过 npm registry 检查：

```sh
agent-modules refresh --no-upgrade
```

升级 npm 包后，CLI 会自动重新执行 **`agent-modules refresh --no-upgrade`**。

## Agent 必须做的

1. **实际执行**上述命令（Shell 工具），不要只口头描述。
2. 根据输出用 **简体中文** 汇总：npm 是否升级、内置 skills、各订阅仓库的 pull/sync 结果。
3. 失败时说明原因与修复建议（例如未运行过 **`agent-modules`**）。

## 禁止

- **不要**向用户推荐已移除的 **`sync`** 子命令；全量同步仅通过本 skill 调用 **`agent-modules refresh`**。
- **不要**向用户展示或建议手改 **`~/.agentModules`** 内配置；订阅用 **`/agent-modules-add`**。
- **不要**手改带 **`DO_NOT_EDIT.md`** 的已同步副本；改 Git 源后再次 **`/agent-modules-sync`**。
