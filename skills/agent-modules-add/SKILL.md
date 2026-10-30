---
name: agent-modules-add
description: >-
  将 Git 依赖仓库（如 hum1st/agent-modules-demo）加入 Agent Modules：克隆到 ~/.agentModules/sources/<host>/<org>/<repo>，
  若仓库根目录有 package.json 则安装依赖，更新内部订阅配置，并按仓库 config.yaml 中的 prefixes 同步 skills 与 rules。
  在用户要订阅示例仓库、团队 skill 包、或说「add agent-modules-demo」时使用。
---

# agent-modules-add — 订阅 Git 仓库

## 前置

- 本机已按顺序执行 **`npm install -g agent-modules`** 与 **`agent-modules`**（macOS / Linux / Windows 各终端均适用；两条命令分行执行，勿用 `&&`）。
- 需要 **Git** 与网络。

## 流程

### 1. 确认仓库 URL

向用户确认要添加的仓库（默认示例：`hum1st/agent-modules-demo` 或 `https://github.com/hum1st/agent-modules-demo.git`）。

### 2. 选择订阅范围

用选择题让用户选一项：

- **global**：同步到各 Agent 的**全局** skills/rules 目录（与 **`agent-modules`** 初始化目标一致）。
- **project**：仅同步到**当前工作区项目**下的 `.cursor/skills`、`.cursor/rules` 等。

### 3. 执行内部 CLI（勿改写成用户文档）

在 Shell 中执行（将 `URL` 与 scope 替换为用户选择）：

**global：**

```sh
agent-modules add URL --scope global
```

**project（当前目录为项目根）：**

```sh
agent-modules add URL --scope project
```

简写：`agent-modules add hum1st/agent-modules-demo --scope global`

克隆完成后，若仓库根目录有 **`package.json`**，CLI 会安装依赖（`packageManager` 字段或 lockfile 对应 `pnpm` / `yarn` / `bun`，否则 **`npm install`**）。随后的 refresh 会再检查一次。无 **`package.json`** 则跳过。

### 4. 前缀

- **优先**克隆仓库根目录 **`config.yaml`** 中的 **`prefixes`**。
- 若无有效配置，CLI 分析 `skills/`、`rules/` 并写入内部 fallback；之后 **`/agent-modules-sync`**（**`agent-modules refresh`**）仍优先读仓库内 config。

### 5. 回复用户

说明克隆路径（`~/.agentModules/sources/...`）、scope、前缀来源与结果摘要。**不要**引导用户编辑 **`~/.agentModules`** 内配置文件。

## 禁止

- **不要**向用户推荐 **`agent-modules add`** 作为日常操作说明；用户应通过 **`/agent-modules-add`** 由 Agent 执行上述命令。
- **不要**手改 Agent 目录下的 **skill 链接 `SKILL.md`**；改 **`~/.agentModules/sources/...`** 源仓库后 **`/agent-modules-sync`**。rules 副本仍随同步覆盖。
