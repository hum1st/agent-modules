#!/usr/bin/env sh
# 将本地 clone 快进到远端（git pull --ff-only）
set -e

# shellcheck disable=SC1091
. "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/lib/common.sh"

ROOT=$(agentbay_require_root)
if [ ! -d "${ROOT}/.git" ]; then
  agentbay_die "Not a git repository: ${ROOT}"
fi

if ! git -C "$ROOT" pull --ff-only; then
  agentbay_die "git pull --ff-only failed in ${ROOT}"
fi
