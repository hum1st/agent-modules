---
name: agent-bay-version
description: >-
  读取本机 Agent Bay 安装目录（默认 ~/.agentBay）根目录 package.json 的 version 字段并告知用户。
  在用户调用 /agent-bay-version、询问 Agent Bay 版本号、或需要确认本地安装版本时使用。
---

# agent-bay-version — 查询 Agent Bay 版本

## 目标

从 **`package.json` 的 `version`** 读取当前本机 Agent Bay 的 **SemVer**，用 **简体中文** 明确告诉用户（例如：「当前 Agent Bay 版本为 **1.1.0**。」）。

## 安装路径

按以下顺序确定根目录（与 `src/lib/common.sh` 一致）：

1. 若设置了 **`AGENTBAY_ROOT`** 且该路径存在，使用该目录。
2. 否则使用 **`$HOME/.agentBay`**（即 `~/agentBay` 在 macOS/Linux 上的常规写法）。

若根目录不存在或没有 **`package.json`**，向 stderr 说明原因并以非零退出码结束，不要编造版本号。

## 读取版本（仅 Git / POSIX shell，不要 Node）

在 Shell 中执行（将 `ROOT` 替换为上面解析出的路径）：

```sh
ROOT="${AGENTBAY_ROOT:-$HOME/.agentBay}"
PKG="${ROOT}/package.json"
test -f "$PKG" || { echo "package.json not found: $PKG" >&2; exit 1; }
sed -n 's/^[[:space:]]*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$PKG" | head -n 1
```

- 命令 **stdout** 即为版本号；为空则报告无法解析。
- **不要** 修改 `package.json`，除非用户另外要求。
- 全局 skill 安装由用户运行 **`sh ~/.agentBay/bin/agent-bay`** 完成，本 skill 只读版本号。

## 回复格式

- 一句结论 + 可选一行说明路径，例如：`当前 Agent Bay 版本为 **x.y.z**（读取自 ~/.agentBay/package.json）。`
- 若用户在开发仓库内提问且 `AGENTBAY_ROOT` 指向该克隆，在回复中写出实际使用的路径。
