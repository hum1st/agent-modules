---
name: release
description: >-
  发布 Agent Bay：审查变更、在 main 上以固定作者信息提交、推送，可选创建 GitHub Release。
  在用户调用 /release 或要求发布本仓库时使用。步骤报告使用简体中文。
disable-model-invocation: true
---

# release — 提交并发布 Agent Bay

本 skill 适用于 **agent-bay** 仓库（`/release`）。**没有** `npm run sync`；流程为 **提交 →（发布时）版本号与 tag → 推送 → GitHub Release**。

仓库 **SemVer** 以根目录 **`package.json` 的 `version`** 为准，**从 `1.0.0` 起**；Git tag 为 **`v` + 该版本**（例如 `v1.0.0`）。

## 回复语言

**使用简体中文** 汇报各步骤与总结。

## 提交策略（强制）

| 项 | 要求 |
|----|------|
| Author / Committer | **Dennis Chen** `<dennis@lycoo.com>`（每次提交通过环境变量设置；**不要**改 `git config`） |
| 格式 | **`<type>: <summary>`**（Conventional Commits；`type` 仅限下表且保持 **英文**；冒号后 **一个空格**；`summary` 为 **简体中文** 简短说明） |
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

提交前自检：subject 须匹配 `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert): .+`，且冒号后 summary **以中文为主**（专有名词、命令、包名可保留英文）。

示例：`docs: 添加多语言 readme 与 mit 许可证`

### 提交命令模板（优先 **`git commit-tree`**；单行 subject，无 body/trailer）

```bash
cd /path/to/agent-bay
git add <paths>
TREE=$(git write-tree)
NEW=$(GIT_AUTHOR_NAME='Dennis Chen' GIT_AUTHOR_EMAIL='dennis@lycoo.com' \
  GIT_COMMITTER_NAME='Dennis Chen' GIT_COMMITTER_EMAIL='dennis@lycoo.com' \
  git commit-tree "$TREE" -m 'docs: 简体中文 summary，总长小于 100 字符')
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

### 1b. README 译文（`README.md` 变更或 lock 不一致时）

**禁止** 直接编辑 `docs/README.*.md` 或手改 **`docs/README.lock.json`**。译文 **只能** 经 `scripts/readme-translations-apply.mjs`（内部调用 `readme-translations-write.mjs`）落盘；**全部 locale 结构对齐后 lock 自动更新**。

#### 1b.1 对比 lock

在仓库根目录：

```bash
node scripts/readme-translations-status.mjs
```

- 退出码 **0**：译文与 lock 已对齐，可跳过 1b.2。
- 退出码 **1**：需要同步；输出会列出待处理的 **locales**（与 `scripts/readme-translations-lib.mjs` 中 `LOCALES` 一致：`zh-CN`, `hi`, `es`, `fr`, `ar`, `bn`, `pt`, `ru`, `ur`）。

提取英文正文（供 subagent 输入，**不含** 文首语言切换器）：

```bash
node scripts/readme-translations-status.mjs --print-source-body
```

#### 1b.2 并行 subagent 翻译

对 **每个** 待同步 locale **并行** 启动 **Task subagent**（同一轮内尽量一次发齐，不要串行 nine 次）。

**Subagent 任务模板**（将 `<locale>`、`<locale-label>` 替换为实际值；`<source-body>` 为上一步英文正文）：

```text
Full Repository Path: <本仓库绝对路径，即 agent-bay 根目录>
Change Description: Translate the English README body to <locale> (<locale-label>).
Custom Instructions:
- Input is markdown body only (no # Agent Bay H1, no language switcher).
- Preserve heading levels exactly (same count and ## / ### depth as source); translate heading text naturally.
- Preserve markdown links, code spans, and table structure.
- Output ONLY the translated body markdown — no fences, no preamble.
--- SOURCE ---
<source-body>
```

Locale 参考：`zh-CN` 简体中文，`hi` हिन्दी，`es` Español，`fr` Français，`ar` العربية（RTL 段落可用 HTML dir="rtl" 若必要），`bn` বাংলা，`pt` Português，`ru` Русский，`ur` اردو。

#### 1b.3 落盘（主 Agent 执行）

每个 subagent 返回的正文写入临时文件（如 `/tmp/agent-bay-readme-<locale>.md`），再 **逐 locale** 调用：

```bash
node scripts/readme-translations-apply.mjs --locale <locale> --body-file /tmp/agent-bay-readme-<locale>.md
```

**不要** 跳过 apply 脚本直接写 `docs/`。最后一个 locale 成功且结构一致时，脚本会打印 **`docs/README.lock.json 已更新`**。

#### 1b.4 校验

```bash
npm run check:readme-translations
```

须通过：hash 与 lock 一致、标题结构与英文一致、各文件含 provenance 标记。

推送后 **GitHub Actions**（`.github/workflows/ci.yml`）在 `main` 的 push/PR 上运行 `node scripts/check-readme-translations.mjs`；合并前须绿。

**可选（非 release 主路径）**：`node scripts/translate-readme.mjs` 仍可通过外部翻译 API 落盘；**不得** 在 release 中依赖 `npm run docs:readme-translate`（已从 `package.json` 移除）。

### 2. 提交（有变更时）

按 **提交策略**（`git add` + **`git commit-tree`**），然后 `git log -1 --format=full`，确认 **无** `Co-authored-by`。

- 仅当无法使用 `commit-tree` 时用普通 `git commit`；若出现 trailer，改用 `commit-tree` 重做。
- 若 hook 失败（非禁止 trailer）：修复后 **新提交**；除非用户规则允许且 HEAD 未推送，否则不要 amend。

### 3. 推送到 origin

```bash
git push origin main
```

若本次发布已创建版本 tag，一并推送：

```bash
git push origin main --tags
```

历史重写后（例如合并为单一根提交），**仅在用户明确要求时**：

```bash
git push --force-with-lease origin main
```

未经授权 **不要** 对 `main`/`master` force-push。

### 4. 版本号（用户要求 **发布** 时必做）

在 **工作区已反映本次要发布的变更**（通常已完成步骤 2 的提交，或确认 HEAD 即发布内容）后：

1. 读取当前 `package.json` 的 `version`（记为 `MAJOR.MINOR.PATCH`）。
2. 确定 **版本增量基准**：
   - 若存在最新 tag `v*.*.*`：统计 **`git log <该tag>..HEAD --format=%s`** 中的提交 subject；
   - 若尚无 tag：统计 **`git log --format=%s`**（自仓库有历史以来至 HEAD）。
3. **升级规则**（只升 **minor** 或 **patch**，**不升 major**，除非用户明确要求）：
   - 若任一 subject 以 **`feat:`** 开头（或等价地，本次变更包含 **用户可见的新功能/新行为**）→ **minor +1**，**patch 归零**（例：`1.0.0` → `1.1.0`）。
   - 否则（`fix` / `docs` / `refactor` / `chore` / `ci` 等，或无新提交仅发版）→ **patch +1**（例：`1.0.0` → `1.0.1`）。
   - 若同一发布范围内 **同时** 有 `feat` 与其它 type，仍按 **minor** 处理（取较高语义版本）。
4. 更新 `package.json` 的 `version`，单独提交（subject 示例：`chore: 升级版本至 1.1.0`），仍用 **`git commit-tree`** 与作者策略。
5. 打 annotated tag（与 `package.json` 一致）：

```bash
git tag -a v1.1.0 -m 'v1.1.0'
```

6. Release 说明（`gh release create --notes`）应简要列出自上一 tag 以来按 Conventional Commits 分类的变更要点。

**注意**：首次仓库版本为 **`1.0.0`**；若 `1.0.0` 从未打过 tag 且用户要发首版，可在 **无新提交** 时对 `1.0.0` 直接打 `v1.0.0`，或若自初始化以来仅有非 `feat` 提交却尚未发版，按规则先 bump patch 再发——以 **「上一已发布 tag」与 HEAD 之间的 commits** 为准，避免重复发同一版本。

### 5. GitHub Release（发布时）

```bash
gh release create v1.1.0 --title 'v1.1.0' --notes '...'
```

`<tag>` / `<title>` **必须** 与步骤 4 中 `package.json` 的版本一致（带 `v` 前缀）。

### 6. 汇报

用 **简体中文** 总结：提交 hash（如有）、作者 Dennis Chen、subject 格式/长度、**新版本号与 bump 理由（minor/patch）**、tag、推送/Release 结果。

## 历史重写

仅当用户要求 squash 为单一初始化提交（或类似）时：

1. 先完成工作区变更（含本 skill）。
2. `git checkout --orphan <tmp>` → `git add -A` → **`git commit-tree`**（无 `-p`）生成单一根提交 → `git branch -M main`。
3. `git push --force-with-lease origin main`，并说明远程历史已重写。
