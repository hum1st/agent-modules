---
name: agent-modules-version
description: >-
  读取本机 agent-modules CLI 的版本号并告知用户。
  在用户调用 /agent-modules-version、询问 Agent Modules 版本号、或需要确认本地安装版本时使用。
---

# agent-modules-version — 查询 Agent Modules 版本

## 目标

读取当前正在使用的 **agent-modules** 的 **SemVer**，用 **简体中文** 告诉用户（例如：「当前 Agent Modules 版本为 **1.3.0**。」）。

## 读取方式（优先）

在 Shell 中执行：

```sh
agent-modules --version
```

- **stdout** 即为版本号（单行）。
- 若命令不存在，提示用户 **`npm install -g agent-modules`** 并确认 `agent-modules` 在 PATH 中。
- **不要**编造版本号。

## 说明

- 版本来自**当前执行的 CLI 所对应的 npm 包**根目录 `package.json`（全局安装、`npm link` 或 `npm run agent-modules` 均与运行中的代码一致）。
- 全量同步由 **`/agent-modules-sync`** 完成；本 skill 只读版本。

## 回复格式

一句结论即可，例如：`当前 Agent Modules 版本为 **x.y.z**。`
