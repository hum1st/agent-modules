import fs from 'node:fs';
import path from 'node:path';

function listSkillNames(repoRoot) {
  const skillsDir = path.join(repoRoot, 'skills');
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(skillsDir, name, 'SKILL.md')));
}

function listRuleNames(repoRoot) {
  const rulesDir = path.join(repoRoot, 'rules');
  if (!fs.existsSync(rulesDir)) {
    return [];
  }
  return fs
    .readdirSync(rulesDir, { withFileTypes: true })
    .filter((d) => d.isFile() && /\.mdc$/.test(d.name))
    .map((d) => d.name.replace(/\.mdc$/, ''));
}

function sharedHyphenPrefix(names) {
  if (names.length < 2) {
    return null;
  }
  const parts = names.map((n) => n.split('-'));
  const minLen = Math.min(...parts.map((p) => p.length));
  const shared = [];
  for (let i = 0; i < minLen; i += 1) {
    const seg = parts[0][i];
    if (parts.every((p) => p[i] === seg)) {
      shared.push(seg);
    } else {
      break;
    }
  }
  if (shared.length === 0) {
    return null;
  }
  const prefix = shared.join('-');
  if (names.every((n) => n === prefix || n.startsWith(`${prefix}-`))) {
    return prefix;
  }
  return null;
}

/**
 * 仓库无 config.yaml 时，根据 skills/、rules/ 推断前缀建议
 * @returns {string[]}
 */
export function inferPrefixes(repoRoot) {
  const names = [...new Set([...listSkillNames(repoRoot), ...listRuleNames(repoRoot)])];
  if (names.length === 0) {
    return [];
  }
  const shared = sharedHyphenPrefix(names);
  const out = new Set();
  if (shared) {
    out.add(shared);
  }
  for (const n of names) {
    out.add(n);
  }
  return [...out].sort();
}
