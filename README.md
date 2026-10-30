# Agent Modules

<p align="center">
  <strong>Read this in other languages</strong><br>
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

**Agent Modules** — **skills** and **rules** for coding agents (Cursor, Claude Code, Codex, GitHub Copilot, and others), sourced from Git.

---

## Installation

### 1. Install Git and Node.js

Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) (LTS, 18+).

### 2. Install and initialize

Run the following **in order** in macOS Terminal, Linux, Git Bash, or PowerShell. Lines starting with **`#`** are comments (you can paste them as-is in Bash-like shells; in Command Prompt, run only the `npm` and `agent-modules` lines).

```sh
# Install the Agent Modules CLI from the npm registry.
npm install -g agent-modules

# One-time setup: create ~/.agentModules and install bundled agent-modules* skill links
# into each detected agent’s global skills folder (Cursor, Claude Code, Copilot CLI, Codex).
agent-modules
```

After this, you do not need to run **`agent-modules`** again for day-to-day updates—use **`/agent-modules-sync`** in your agent instead.

### 3. Add skill repositories

In Cursor or another supported agent, run **`/agent-modules-add`** to subscribe to a Git repository—for example **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. Choose **global** or **project** scope when prompted.

Do **not** edit **`~/.agentModules`** by hand; use **`/agent-modules-add`** and **`/agent-modules-sync`**.

---

## Official example repository

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** shows a small layout for a dependency repo (`skills/`, optional `rules/`). Subscribe with **`/agent-modules-add`**, then run **`/agent-modules-sync`**.

---

## Links

- [Agent Modules demo (official example repository)](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)
