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

**Pluggable capability modules for coding agents** — add, upgrade, and expand skills and rules from Git across Cursor, Claude Code, Codex, GitHub Copilot, and other agents.

---

## Goals

Agent Bay is an open-source tool (in planning) that addresses **fragmented agent configuration, poor version control, and lost setup when changing machines** for teams and individuals working across multiple coding agents.

We treat **Agent Skills** (open format [`SKILL.md`](https://agentskills.io)) and **coding-agent rules** (e.g. `.cursor/rules`, `AGENTS.md`) as **pluggable modules**:

1. **Vertical upgrades** — Pull or update capability packs from Git so agents quickly gain new workflows, standards, and domain knowledge.
2. **Horizontal reach** — Map the same modules to each product’s native paths (Cursor, Claude Code, Codex, Copilot, …) instead of hand-copying dotfiles.
3. **Auditable collaboration** — Git is the source of truth; installed copies on disk are managed artifacts with incremental sync and cleanup.
4. **Skills vs rules** — On-demand **Skills** and always-on or path-scoped **Rules** on separate tracks, aligned with the industry shift toward skills while keeping `alwaysApply` / globs where they belong.

Agent Bay is **not** a web crawler and does **not** replace public skill registries (e.g. [skills.sh](https://skills.sh) / `npx skills`). It focuses on **your Git repos** as the authority for **installing modules and deploying them across agent channels**.

---

## Metaphor: the bay

Like **expansion bays** on a robot: each bay holds one capability module (skill pack, rule slice, or bundled catalog). Swapping, adding, and upgrading modules should be **fast** and **repeatable**.

---

## Status

**Early stage** — This repository defines goals, conventions, and implementation; APIs and CLI are not stable yet.

Issues and PRs welcome for module formats and sync semantics.

## Documentation and conventions

- **English** is the default entry: this file (`README.md`). Other languages live under [`docs/`](./docs/) as `README.<locale>.md` (see the language switcher at the top).
- **Maintainer-facing** artifacts in the repo — source comments, `.cursor/rules`, and `.cursor/skills` — are written in **Simplified Chinese** (简体中文), unless a file’s locale is explicitly something else (e.g. translated end-user READMEs).

---

## Links

- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](./LICENSE)
