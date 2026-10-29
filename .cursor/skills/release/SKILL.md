---
name: release
description: >-
  发布 Agent Bay：审查变更、在 main 上以固定作者信息提交、推送，可选创建 GitHub Release。
  在用户调用 /release 或要求发布本仓库时使用。步骤报告使用简体中文。
disable-model-invocation: true
---

# release — 提交并发布 Agent Bay

本 skill 适用于 **agent-bay** 仓库（`/release`）。**没有** `npm run sync`；流程为 **提交 → 推送 →（可选）GitHub Release**。

## 回复语言

**使用简体中文** 汇报各步骤与总结。

## 提交策略（强制）

| 项 | 要求 |
|----|------|
| Author / Committer | **Dennis Chen** `<dennis@lycoo.com>`（每次提交通过环境变量设置；**不要**改 `git config`） |
| 格式 | **`<type>: <summary>`**（Conventional Commits；`type` 仅限下表；冒号后 **一个空格**；`summary` 为英文祈使句、小写开头） |
| 长度 | **整条 subject 少于 100 字符**（无 body；不要求 scope 前缀） |
| 禁止 | **`Co-authored-by`**、Cursor/AI/Agent 署名行、`Made-with` 等工具标记 |

### 允许的 `type`（固定列表）

| type | 用途 |
|------|------|
| `feat` | 新功能或用户可见行为 |
| `fix` | 缺陷修复 |
| `docs` | 仅文档（README、注释、skill 等） |
| `style` | 格式调整，无语义变更（非 CSS） |
| `refactor` | 既非 feat 也非 fix 的代码调整 |
| `perf` | 性能改进 |
| `test` | 测试的新增或修复 |
| `build` | 构建系统或外部依赖 |
| `ci` | CI 配置与脚本 |
| `chore` | 其他维护（工具、仓库初始化；非 src/test 逻辑） |
| `revert` | 回滚先前提交 |

提交前自检：subject 须匹配 `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert): .+`

示例：`docs: add multilingual readme and mit license`

### 提交命令模板（优先 **`git commit-tree`**；单行 subject，无 body/trailer）

```bash
cd /path/to/agent-bay
git add <paths>
TREE=$(git write-tree)
NEW=$(GIT_AUTHOR_NAME='Dennis Chen' GIT_AUTHOR_EMAIL='dennis@lycoo.com' \
  GIT_COMMITTER_NAME='Dennis Chen' GIT_COMMITTER_EMAIL='dennis@lycoo.com' \
  git commit-tree "$TREE" -m 'docs: your imperative summary under 100 chars')
git reset --hard "$NEW"
```

在已有历史上追加：`git commit-tree "$TREE" -p HEAD -m '...'` 再 `git reset --hard "$NEW"`。

## 前置条件

- 不要提交 `.env`、密钥或凭据；若用户坚持则警告。
- 若无变更可提交，**不要** 空提交；仅在用户要求时推送或发 Release。

## 步骤（须真实执行命令）

### 1. 审查变更

并行执行：

```bash
git status
git diff && git diff --staged
git log -5 --oneline
```

按上表拟定 subject；确认暂存 diff **无** AI trailer。

### 2. 提交（有变更时）

按 **提交策略**（`git add` + **`git commit-tree`**），然后 `git log -1 --format=full`，确认 **无** `Co-authored-by`。

- 仅当无法使用 `commit-tree` 时用普通 `git commit`；若出现 trailer，改用 `commit-tree` 重做。
- 若 hook 失败（非禁止 trailer）：修复后 **新提交**；除非用户规则允许且 HEAD 未推送，否则不要 amend。

### 3. 推送到 origin

```bash
git push origin main
```

历史重写后（例如合并为单一根提交），**仅在用户明确要求时**：

```bash
git push --force-with-lease origin main
```

未经授权 **不要** 对 `main`/`master` force-push。

### 4. GitHub Release（发布时）

```bash
gh release create <tag> --title '<tag>' --notes '...'
```

tag 与说明由用户或仓库状态决定；早期常用 `v0.1.0`。

### 5. 汇报

用 **简体中文** 总结：提交 hash（如有）、作者 Dennis Chen、subject 格式/长度、推送/Release 结果。

## 历史重写

仅当用户要求 squash 为单一初始化提交（或类似）时：

1. 先完成工作区变更（含本 skill）。
2. `git checkout --orphan <tmp>` → `git add -A` → **`git commit-tree`**（无 `-p`）生成单一根提交 → `git branch -M main`。
3. `git push --force-with-lease origin main`，并说明远程历史已重写。
