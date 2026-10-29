#!/usr/bin/env sh
# 将 skills/agent-bay* 同步到各 Agent 全局 skills 目录
set -e

# shellcheck disable=SC1091
. "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/lib/common.sh"
# shellcheck disable=SC1091
. "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/lib/sync-skills.sh"

ROOT=$(agentbay_require_root)
agentbay_sync_skills "$ROOT"
