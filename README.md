# Agent Bay

<p align="center">
  <strong>Read this in other languages</strong><br>
  <a href="README.md">English</a> ·
  <a href="docs/README.zh-CN.md">简体中文</a> ·
  <a href="docs/README.hi.md">हिन्दी</a> ·
  <a href="docs/README.es.md">Español</a> ·
  <a href="docs/README.fr.md">Français</a> ·
  <a href="docs/README.ar.md">العربية</a> ·
  <a href="docs/README.bn.md">বাংলা</a> ·
  <a href="docs/README.pt.md">Português</a> ·
  <a href="docs/README.ru.md">Русский</a> ·
  <a href="docs/README.ur.md">اردو</a>
</p>

**Agent Bay** — **skills** and **rules** for coding agents (Cursor, Claude Code, Codex, GitHub Copilot, and others), sourced from Git.

---

## Installation

### 1. Install Git

Install [Git](https://git-scm.com/downloads). On Windows, Git includes **Git Bash**; you can also use **Command Prompt** with the `.cmd` wrapper in step 3.

### 2. Clone the repository

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Sync skills

Run **agent-bay** to sync **agent-bay\*** skills into each installed agent’s global skills directory (Cursor, Claude Code, Copilot CLI, Codex). Stale `agent-bay*` copies are removed; adds, updates, and deletes in the repo are applied on the next run.

#### macOS, Linux, and Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Test with your agent

In Cursor, Claude Code, or another supported agent, run **`/agent-bay-version`**. The agent should report the version from your `~/.agentBay` install (for example, the value in `package.json`).

---

## Official example repository

Use **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** as the reference Git layout for a small Agent Bay–compatible project.

```
skills/<skill-name>/   # Agent Skills (SKILL.md, optional scripts)
rules/                 # Agent rules (e.g. Cursor .mdc)
package.json           # Optional dependencies for skill tooling
```

**Skills** — one folder per skill under `skills/`, following the [Agent Skills](https://agentskills.io) layout.

**Rules** — shared guidance under `rules/` for agents that load project or global rules alongside skills.

**Dependencies** — when a repo includes `package.json`, run **`npm install`** at the repo root after clone (or as part of your sync script) so libraries listed in `dependencies` / `devDependencies` are installed automatically before skills use them.

Clone the demo, install dependencies if `package.json` is present, wire `skills/` into your agent, and invoke the demo skill to verify loading end to end.

---

## Links

- [Agent Bay demo (official example repository)](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](./LICENSE)
