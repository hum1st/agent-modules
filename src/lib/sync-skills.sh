# 将 skills/ 下 agent-bay* 目录镜像到各 Agent 全局 skills 目录（POSIX sh）

AGENTBAY_SKILL_PREFIX='agent-bay'

agentbay_has_command() {
  command -v "$1" >/dev/null 2>&1
}

agentbay_detect_cursor() {
  if [ -d '/Applications/Cursor.app' ] || [ -d "${HOME}/Applications/Cursor.app" ]; then
    return 0
  fi
  if agentbay_has_command cursor; then
    return 0
  fi
  if [ -d "${HOME}/.cursor" ]; then
    return 0
  fi
  return 1
}

agentbay_detect_claude() {
  if agentbay_has_command claude; then
    return 0
  fi
  if [ -d "${HOME}/.claude" ]; then
    return 0
  fi
  return 1
}

agentbay_detect_copilot() {
  if agentbay_has_command copilot; then
    return 0
  fi
  if [ -d "${HOME}/.copilot" ]; then
    return 0
  fi
  return 1
}

agentbay_detect_codex() {
  if agentbay_has_command codex; then
    return 0
  fi
  if [ -d "${HOME}/.codex" ]; then
    return 0
  fi
  return 1
}

# stdout：每行一个 skill 目录名（已排序）
agentbay_list_repo_skills() {
  _ab_skills_root="$1"
  if [ ! -d "$_ab_skills_root" ]; then
    return 0
  fi
  _ab_names=""
  for _ab_entry in "$_ab_skills_root"/*; do
    [ -d "$_ab_entry" ] || continue
    _ab_name=$(basename "$_ab_entry")
    case "$_ab_name" in
      "${AGENTBAY_SKILL_PREFIX}"*) ;;
      *) continue ;;
    esac
    if [ ! -f "${_ab_entry}/SKILL.md" ]; then
      continue
    fi
    _ab_names="${_ab_names}${_ab_name}
"
  done
  printf '%s' "$_ab_names" | sed '/^$/d' | sort
}

agentbay_skill_in_list() {
  _ab_want="$1"
  _ab_list="$2"
  printf '%s\n' "$_ab_list" | grep -Fx "$_ab_want" >/dev/null 2>&1
}

agentbay_write_do_not_edit() {
  _ab_dest="$1"
  _ab_canonical="$2"
  _ab_file="${_ab_dest}/DO_NOT_EDIT.md"
  : >"$_ab_file"
  {
    printf '%s\n' '# 请勿直接编辑此目录'
    printf '\n'
    printf '%s\n' '此 skill 为 Agent Bay 仓库中 git 源码的安装副本，运行 `agent-bay` 同步时会被覆盖。'
    printf '\n'
    printf '%s\n' "1. 编辑：\`${_ab_canonical}\`"
    printf '%s\n' '2. 提交并推送 Agent Bay 仓库'
    printf '%s\n' '3. 在本机再次运行：`sh ~/.agentBay/bin/agent-bay`'
  } >>"$_ab_file"
}

agentbay_install_skill_copy() {
  _ab_src="$1"
  _ab_dest="$2"
  _ab_canonical="$3"

  rm -rf "$_ab_dest"
  mkdir -p "$_ab_dest"
  # shellcheck disable=SC2035
  cp -R "$_ab_src"/. "$_ab_dest"/
  agentbay_write_do_not_edit "$_ab_dest" "$_ab_canonical"
}

# 比较安装目录与源码（忽略 DO_NOT_EDIT.md）；一致返回 0
agentbay_skill_tree_matches() {
  _ab_src="$1"
  _ab_dest="$2"
  if [ ! -d "$_ab_dest" ]; then
    return 1
  fi

  _ab_src=$(CDPATH= cd -- "$_ab_src" && pwd)
  _ab_dest=$(CDPATH= cd -- "$_ab_dest" && pwd)

  _ab_file=
  while IFS= read -r _ab_file; do
    [ -n "$_ab_file" ] || continue
    _ab_rel=${_ab_file#"${_ab_src}/"}
    if [ ! -f "${_ab_dest}/${_ab_rel}" ]; then
      return 1
    fi
    if ! cmp -s "$_ab_file" "${_ab_dest}/${_ab_rel}" 2>/dev/null; then
      return 1
    fi
  done <<EOF
$(find "$_ab_src" -type f 2>/dev/null)
EOF

  _ab_file=
  while IFS= read -r _ab_file; do
    [ -n "$_ab_file" ] || continue
    _ab_rel=${_ab_file#"${_ab_dest}/"}
    case "$_ab_rel" in
      DO_NOT_EDIT.md) continue ;;
    esac
    if [ ! -f "${_ab_src}/${_ab_rel}" ]; then
      return 1
    fi
  done <<EOF
$(find "$_ab_dest" -type f 2>/dev/null)
EOF

  return 0
}

agentbay_sync_target() {
  _ab_agent="$1"
  _ab_target_dir="$2"
  _ab_detect_fn="$3"
  _ab_repo_root="$4"
  _ab_skills_src="${_ab_repo_root}/skills"
  _ab_desired=$(agentbay_list_repo_skills "$_ab_skills_src")

  if ! "$_ab_detect_fn"; then
    printf '  [%s] skipped — agent not detected\n' "$_ab_agent"
    return 0
  fi

  mkdir -p "$_ab_target_dir"
  _ab_actions=0

  for _ab_installed in "$_ab_target_dir"/${AGENTBAY_SKILL_PREFIX}*; do
    [ -e "$_ab_installed" ] || continue
    _ab_iname=$(basename "$_ab_installed")
    if ! agentbay_skill_in_list "$_ab_iname" "$_ab_desired"; then
      rm -rf "$_ab_installed"
      printf '         remove %s\n' "$_ab_iname"
      _ab_actions=1
    fi
  done

  _ab_oldifs=$IFS
  IFS='
'
  # shellcheck disable=SC2086
  set -- $_ab_desired
  IFS=$_ab_oldifs

  for _ab_skill in "$@"; do
    [ -n "$_ab_skill" ] || continue
    _ab_from="${_ab_skills_src}/${_ab_skill}"
    _ab_to="${_ab_target_dir}/${_ab_skill}"
    if agentbay_skill_tree_matches "$_ab_from" "$_ab_to"; then
      continue
    fi
    agentbay_install_skill_copy "$_ab_from" "$_ab_to" "$_ab_from"
    printf '         sync %s\n' "$_ab_skill"
    _ab_actions=1
  done

  if [ "$_ab_actions" -eq 0 ]; then
    printf '  [%s] %s — up to date\n' "$_ab_agent" "$_ab_target_dir"
  else
    printf '  [%s] %s\n' "$_ab_agent" "$_ab_target_dir"
  fi
}

# 主入口：将仓库 skills/agent-bay* 同步到已检测到的 Agent 全局目录
agentbay_sync_skills() {
  _ab_repo_root="$1"
  _ab_skills_src="${_ab_repo_root}/skills"

  if [ ! -d "$_ab_skills_src" ]; then
    agentbay_die "Skills directory not found: ${_ab_skills_src}"
  fi

  _ab_desired=$(agentbay_list_repo_skills "$_ab_skills_src")
  printf 'Agent Bay skill sync\n'
  printf '  repo: %s\n' "$_ab_repo_root"
  printf '  prefix: %s*\n' "$AGENTBAY_SKILL_PREFIX"
  printf 'Skills to sync:\n'
  if [ -z "$_ab_desired" ]; then
    printf '  (none)\n'
  else
    printf '%s\n' "$_ab_desired" | sed 's/^/  - /'
  fi
  printf 'Targets:\n'

  _ab_home="${HOME:-}"
  if [ -z "$_ab_home" ]; then
    agentbay_die 'HOME is not set.'
  fi

  agentbay_sync_target cursor "${_ab_home}/.cursor/skills" agentbay_detect_cursor "$_ab_repo_root"
  agentbay_sync_target claude "${_ab_home}/.claude/skills" agentbay_detect_claude "$_ab_repo_root"
  agentbay_sync_target copilot "${_ab_home}/.copilot/skills" agentbay_detect_copilot "$_ab_repo_root"
  agentbay_sync_target codex "${_ab_home}/.agents/skills" agentbay_detect_codex "$_ab_repo_root"

  printf 'Done.\n'
}
