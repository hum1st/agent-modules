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

# Agent Bay

**Agent Bay** — 面向 coding agent 的 **skills** 与 **rules**（Cursor、Claude Code、Codex、GitHub Copilot 等），源自 Git。

---

## 安装

### 1. 安装 Git

安装 [Git](https://git-scm.com/downloads)。在 Windows 上，Git 自带 **Git Bash**；也可在步骤 3 中使用 **命令提示符** 配合 `.cmd` 包装脚本。

### 2. 克隆仓库

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. 同步 skills

运行 **agent-bay**，将 **agent-bay\*** skills 同步到各已安装 agent 的全局 skills 目录（Cursor、Claude Code、Copilot CLI、Codex）。上述目录下过期的 `agent-bay*` 副本会被移除；仓库中的新增、更新与删除会在下次运行时生效。

#### macOS、Linux 与 Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows（命令提示符）

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. 在 agent 中测试

在 Cursor、Claude Code 或其他受支持的 agent 中运行 **`/agent-bay-version`**。agent 应报告你 `~/.agentBay` 安装目录中的版本（例如 `package.json` 里的值）。

---

## 官方示例仓库

以 **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** 作为小型 Agent Bay 兼容项目的参考 Git 布局。

```
skills/<skill-name>/   # Agent Skills（SKILL.md，可选脚本）
rules/                 # Agent rules（如 Cursor 的 .mdc）
package.json           # skill 工具链的可选依赖
```

**Skills** — 在 `skills/` 下每个 skill 一个文件夹，遵循 [Agent Skills](https://agentskills.io) 布局。

**Rules** — 在 `rules/` 下存放共享指引，供在加载 skills 的同时加载项目或全局 rules 的 agent 使用。

**Dependencies** — 当仓库包含 `package.json` 时，在克隆后于仓库根目录运行 **`npm install`**（或作为同步脚本的一部分），以便 skills 使用前自动安装 `dependencies` / `devDependencies` 中列出的库。

克隆 demo、在存在 `package.json` 时安装依赖、将 `skills/` 接入你的 agent，并调用 demo skill 以端到端验证加载是否正常。

---

## 链接

- [Agent Bay demo（官方示例仓库）](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills 规范](https://agentskills.io)
- [Anthropic 示例 skills](https://github.com/anthropics/skills)

---

## 许可证

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:zh-CN via readme-translations-write -->
