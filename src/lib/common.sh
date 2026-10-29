# 用户向 shell 子命令共用逻辑（POSIX sh）

# 解析 Agent Bay 安装根目录；成功时 stdout 输出路径并返回 0
agentbay_resolve_root() {
  if [ -n "${AGENTBAY_ROOT:-}" ] && [ -d "${AGENTBAY_ROOT}/.git" ]; then
    printf '%s\n' "$AGENTBAY_ROOT"
    return 0
  fi

  if [ -n "${AGENTBAY_ROOT:-}" ] && [ -d "$AGENTBAY_ROOT" ]; then
    printf '%s\n' "$AGENTBAY_ROOT"
    return 0
  fi

  _ab_home="${HOME:-}"
  if [ -z "$_ab_home" ]; then
    agentbay_die "HOME is not set; set AGENTBAY_ROOT to your clone path."
  fi

  _ab_default="${_ab_home}/.agentBay"
  if [ -d "${_ab_default}/.git" ]; then
    printf '%s\n' "$_ab_default"
    return 0
  fi

  # 从 src/ 或 src/lib/ 推断仓库根（开发或未设置 AGENTBAY_ROOT 时）
  _ab_script="${1:-}"
  if [ -n "$_ab_script" ]; then
    _ab_dir=$(CDPATH= cd -- "$(dirname -- "$_ab_script")" && pwd) || return 1
    case "$_ab_dir" in
      */src/lib)
        _ab_candidate=$(CDPATH= cd -- "$_ab_dir/../.." && pwd) || return 1
        ;;
      */src)
        _ab_candidate=$(CDPATH= cd -- "$_ab_dir/.." && pwd) || return 1
        ;;
      *)
        _ab_candidate=""
        ;;
    esac
    if [ -n "$_ab_candidate" ] && [ -d "${_ab_candidate}/.git" ]; then
      printf '%s\n' "$_ab_candidate"
      return 0
    fi
  fi

  return 1
}

agentbay_require_root() {
  _ab_root=$(agentbay_resolve_root "$0") || agentbay_die \
    "Cannot find Agent Bay install. Clone to ~/.agentBay or set AGENTBAY_ROOT."
  printf '%s\n' "$_ab_root"
}

agentbay_die() {
  printf '%s\n' "$*" >&2
  exit 1
}
