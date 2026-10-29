# Agent Bay

<p align="center">
  <strong>其他语言</strong><br>
  <a href="../README.md">English</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.hi.md">हिन्दी</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.ar.md">العربية</a> ·
  <a href="README.bn.md">বাংলা</a> ·
  <a href="README.pt.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.ur.md">اردو</a>
</p>

**面向 coding agent 的可插拔能力模块** — 从 Git 添加、升级并扩展技能与规则，覆盖 Cursor、Claude Code、Codex、GitHub Copilot 等多种 AI 编程工具。

---

## 项目目标

Agent Bay 是一个开源工具（规划中），用来解决团队和个人在多 Agent 环境下 **能力配置分散、难以版本化、换机器就丢** 的问题。

我们将 **Agent Skills**（开放格式 [`SKILL.md`](https://agentskills.io)）与 **编码 Agent 规则**（如 `.cursor/rules`、`AGENTS.md` 等）当作 **可插拔模块**：

1. **纵向升级** — 从 Git 仓库拉取或更新能力包，让 Agent 迅速获得新工作流、规范与领域知识。
2. **横向拓展** — 同一套模块 **映射** 到不同产品的原生目录（Cursor / Claude Code / Codex / Copilot …），避免手工复制 dotfiles。
3. **可审计、可协作** — 权威源码在 Git；安装到本机的是受管副本，支持增量同步与清理。
4. **分型而非堆砌** — 按需加载的 **Skills** 与常驻/按路径生效的 **Rules** 分轨管理，符合行业从「智能 rule」向 Skill 迁移、同时保留 alwaysApply / globs 的趋势。

Agent Bay **不是** 网页爬虫，也 **不替代** 公共 skill 目录（如 [skills.sh](https://skills.sh) / `npx skills`）；它专注 **自有 Git 真源** 下的 **模块装卸与多通道部署**。

---

## 隐喻：扩展坞（Bay）

像机器人身上的 **扩展槽（bay）**：每个 bay 里挂载一个能力模块（skill 包、rule 片段或组合 catalog）。换模块、加模块、升级模块，都应 **快** 且 **可重复**。

---

## 状态

**早期阶段** — 本仓库用于定义目标、约定与实现；API 与 CLI 尚未稳定。

欢迎 Issue / PR 讨论模块格式与同步语义。

---

## 相关链接

- [Agent Skills 规范](https://agentskills.io)
- [Anthropic 示例 Skills](https://github.com/anthropics/skills)

---

## 许可证

[MIT](../LICENSE)
