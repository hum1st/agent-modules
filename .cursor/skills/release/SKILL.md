---
name: release
description: >-
  Release Agent Bay: review changes, commit on main with fixed author metadata,
  push, and optionally create a GitHub release. Use when the user invokes /release
  or asks to publish this repo. Report in English.
disable-model-invocation: true
---

# release — commit and publish Agent Bay

This skill applies to the **agent-bay** repository (`/release`). There is **no** `npm run sync`; the flow is **commit → push → (optional) GitHub Release**.

## Response language

**Use English** for all step-by-step reports and summaries.

## Commit policy (mandatory)

| Item | Requirement |
|------|-------------|
| Author / Committer | **Dennis Chen** `<dennis@lycoo.com>` (set via env vars on each commit; **do not** change `git config`) |
| Format | **`<type>: <summary>`** (Conventional Commits; `type` from the table below only; **one space** after the colon; English imperative `summary`, lowercase start) |
| Length | **Whole subject under 100 characters** (no body; scope prefix not required) |
| Forbidden | **`Co-authored-by`**, Cursor/AI/Agent attribution lines, `Made-with` tool markers |

### Allowed `type` values (fixed list)

| type | Use for |
|------|---------|
| `feat` | New feature or user-visible behavior |
| `fix` | Bug fix |
| `docs` | Documentation only (README, comments, skills, etc.) |
| `style` | Formatting; no semantic change (not CSS) |
| `refactor` | Code change that is neither feat nor fix |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or external dependencies |
| `ci` | CI configuration and scripts |
| `chore` | Other maintenance (tooling, repo init; not src/test logic) |
| `revert` | Revert a prior commit |

Self-check before commit: subject must match `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert): .+`

Example: `docs: add multilingual readme and mit license`

### Commit command template (prefer **`git commit-tree`**; single-line subject, no body/trailers)

```bash
cd /path/to/agent-bay
git add <paths>
TREE=$(git write-tree)
NEW=$(GIT_AUTHOR_NAME='Dennis Chen' GIT_AUTHOR_EMAIL='dennis@lycoo.com' \
  GIT_COMMITTER_NAME='Dennis Chen' GIT_COMMITTER_EMAIL='dennis@lycoo.com' \
  git commit-tree "$TREE" -m 'docs: your imperative summary under 100 chars')
git reset --hard "$NEW"
```

To append on existing history: `git commit-tree "$TREE" -p HEAD -m '...'` then `git reset --hard "$NEW"`.

## Prerequisites

- Do not commit `.env`, secrets, or credentials; warn if the user insists.
- If there is nothing to commit, **do not** create an empty commit; push or release only if asked.

## Steps (run commands for real)

### 1. Review changes

Run in parallel:

```bash
git status
git diff && git diff --staged
git log -5 --oneline
```

Draft the subject per the policy above; ensure the staged diff has **no** AI trailers.

### 2. Commit (when there are changes)

Use **commit policy** (`git add` + **`git commit-tree`**), then `git log -1 --format=full` and confirm **no** `Co-authored-by` trailers.

- Use plain `git commit` only if `commit-tree` is impossible; if trailers appear, redo with `commit-tree`.
- On hook failure (other than forbidden trailers): fix and make a **new** commit; do not amend unless user rules allow and HEAD is not pushed.

### 3. Push to origin

```bash
git push origin main
```

After history rewrite (e.g. single root commit), only when **explicitly requested**:

```bash
git push --force-with-lease origin main
```

Never force-push `main`/`master` without authorization.

### 4. GitHub Release (when publishing)

```bash
gh release create <tag> --title '<tag>' --notes '...'
```

Pick tag and notes from the user or repo state; early stage often uses `v0.1.0`.

### 5. Report

Summarize in English: commit hash (if any), author Dennis Chen, subject format/length, push/release outcome.

## History rewrite

Only when the user asks to squash into one initial commit (or similar):

1. Finish workspace changes (including this skill).
2. `git checkout --orphan <tmp>` → `git add -A` → **`git commit-tree`** (no `-p`) for a single root commit → `git branch -M main`.
3. `git push --force-with-lease origin main` and note that remote history was rewritten.
