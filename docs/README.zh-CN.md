# Agent Modules

<p align="center">
  <strong>其他语言</strong><br>
  <a href="https://github.com/hum1st/agent-modules/blob/main/README.md">English</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.zh-CN.md">简体中文</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.hi.md">हिन्दी</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.es.md">Español</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.fr.md">Français</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ar.md">العربية</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.bn.md">বাংলা</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.pt.md">Português</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ru.md">Русский</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ur.md">اردو</a>
</p>

# Agent Modules

**Agent Modules** — 面向 coding agent 的 **skills** 与 **rules**（Cursor、Claude Code、Codex、GitHub Copilot 等），源自 Git。

---

## 安装

### 1. 安装 Git 与 Node.js

安装 [Git](https://git-scm.com/downloads) 与 [Node.js](https://nodejs.org/)（LTS，18+）。

### 2. 安装并初始化

在 macOS 终端、Linux、Git Bash 或 PowerShell 中**按顺序**运行以下命令。以 **`#`** 开头的行是注释（在 Bash 类 shell 中可原样粘贴；在命令提示符中仅运行 `npm` 与 `agent-modules` 行）。

```sh
# 从 npm registry 安装 Agent Modules CLI。
npm install -g agent-modules

# 一次性设置：创建 ~/.agentModules，并将内置 agent-modules* skills
# 复制到各已检测 agent 的全局 skills 目录（Cursor、Claude Code、Copilot CLI、Codex）。
agent-modules
```

此后日常更新无需再次运行 **`agent-modules`**——请在 agent 中使用 **`/agent-modules-sync`**。

### 3. 添加 skill 仓库

在 Cursor 或其他受支持的 agent 中运行 **`/agent-modules-add`**，订阅 Git 仓库——例如 **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**。按提示选择 **global** 或 **project** 范围。

请勿手改 **`~/.agentModules`**；请使用 **`/agent-modules-add`** 与 **`/agent-modules-sync`**。

---

## 官方示例仓库

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** 展示依赖仓库的小型布局（`skills/`、可选 `rules/`）。用 **`/agent-modules-add`** 订阅，再运行 **`/agent-modules-sync`**。

---

## 链接

- [Agent Modules demo（官方示例仓库）](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills 规范](https://agentskills.io)
- [Anthropic 示例 skills](https://github.com/anthropics/skills)

---

## 许可证

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:zh-CN via readme-translations-write -->
