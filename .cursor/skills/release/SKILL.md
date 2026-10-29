---
name: release
description: >-
  Release Agent Bay: review changes, commit on main with fixed author metadata,
  push, and optionally create a GitHub release. Use when the user invokes /release
  or asks to publish this repo. Always reply in Simplified Chinese unless the user
  explicitly requests another language.
disable-model-invocation: true
---

# release — Agent Bay 提交与发布

本 skill 用于 **`agent-bay`** 仓库（`/release`）。本仓库 **没有** `npm run sync`；发布流程为 **commit → push →（可选）GitHub Release**。

## 回复语言

**必须使用简体中文**汇报每一步结果。仅当用户**明确要求**其他语言时才切换。

## 提交规范（必须遵守）

| 项 | 要求 |
|----|------|
| Author / Committer | **Dennis Chen** `<dennis@lycoo.com>`（每次 commit 用环境变量，**不要**改 `git config`） |
| 格式 | **`<type>: <summary>`**（Conventional Commits；`type` 只能从下表选取；冒号后 **一个空格**；`summary` 英文、祈使语气、小写开头） |
| 长度 | **整条 subject 少于 100 个字符**（无 body、无 scope 前缀要求） |
| 禁止 | **`Co-authored-by`**、Cursor/AI/Agent 等协作署名行、`Made-with` 等工具标记 |

### 允许的 `type`（写死，不得自造）

| type | 用途 |
|------|------|
| `feat` | 新功能或面向用户的行为变化 |
| `fix` | 缺陷修复 |
| `docs` | 仅文档（README、comments、skill 说明等） |
| `style` | 格式/排版，不改变语义（非 CSS） |
| `refactor` | 重构；非 feat 非 fix |
| `perf` | 性能改进 |
| `test` | 测试的新增或修正 |
| `build` | 构建系统或外部依赖 |
| `ci` | CI 配置与脚本 |
| `chore` | 其它维护（工具链、仓库初始化等，不含 src/test 逻辑） |
| `revert` | 回滚某次 commit |

提交前自检：`subject` 必须匹配 `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert): .+`

示例 message：`docs: add multilingual readme and mit license`

提交命令模板（**默认 `git commit-tree`**，message 仅一行 subject，无 body / trailer）：

```bash
cd /path/to/agent-bay
git add <paths>
TREE=$(git write-tree)
NEW=$(GIT_AUTHOR_NAME='Dennis Chen' GIT_AUTHOR_EMAIL='dennis@lycoo.com' \
  GIT_COMMITTER_NAME='Dennis Chen' GIT_COMMITTER_EMAIL='dennis@lycoo.com' \
  git commit-tree "$TREE" -m 'docs: your imperative summary under 100 chars')
git reset --hard "$NEW"
```

在已有历史上追加 commit 时：`git commit-tree "$TREE" -p HEAD -m '...'` 再 `git reset --hard "$NEW"`。

## 前置

- 勿提交 `.env`、密钥等敏感文件；若用户坚持，先警告。
- 无待提交变更时：**不要**空 commit；可按用户要求只 push 或只打 release。

## 执行步骤（必须实际运行命令）

### 1. 审查变更

并行执行：

```bash
git status
git diff && git diff --staged
git log -5 --oneline
```

按上表撰写 commit message（**必须** `<type>: …` 且 type 来自允许列表）；确认 staged diff 中 **没有** AI 协作 trailer。

### 2. 提交（有待提交文件时）

使用上文 **提交规范** 中的 `git add` + **`git commit-tree`**，然后 `git log -1 --format=full` 确认 **无** `Co-authored-by` 等 trailer。

- 仅在无法使用 `commit-tree` 时再用 `git commit`；若环境仍注入禁止 trailer，改用 `commit-tree` 重做。
- hook 失败（非上述署名问题）：修复后 **新 commit**；不要 amend（除非用户规则允许且 HEAD 未 push）。

### 3. 推送到 origin

```bash
git push origin main
```

若历史被重写（例如合并为单一初始化提交），在 **用户已明确要求** 的前提下使用：

```bash
git push --force-with-lease origin main
```

**不要**对 `main`/`master` 做未授权的 force push。

### 4. GitHub Release（用户要求发布时）

```bash
gh release create <tag> --title '<tag>' --notes '...'
```

版本号与 release notes 按用户指示或仓库状态决定；early stage 常用 `v0.1.0`。

### 5. 汇报

用简体中文说明：commit hash（若有）、author 是否为 Dennis Chen、message 是否符合 `<type>:` 规范及字数、push / release 是否成功。

## 历史整理

仅当用户明确要求「合并为一个初始化提交」等时：

1. 先完成工作区改动（含本 skill 更新）。
2. `git checkout --orphan <tmp>` → `git add -A` → 用 **`git commit-tree`**（无 `-p`）生成 **一条** 根 commit → `git branch -M main`。
3. `git push --force-with-lease origin main`，并说明远程历史已重写。
