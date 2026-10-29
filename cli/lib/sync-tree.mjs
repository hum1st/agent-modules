import fs from 'node:fs';
import path from 'node:path';
import { ensureDir } from './paths.mjs';

export function matchesAnyPrefix(name, prefixes) {
  return prefixes.some((p) => {
    if (!p) {
      return false;
    }
    return name === p || name.startsWith(`${p}-`);
  });
}

function listMatchingSkillDirs(skillsRoot, prefixes) {
  if (!fs.existsSync(skillsRoot)) {
    return [];
  }
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(skillsRoot, name, 'SKILL.md')))
    .filter((name) => matchesAnyPrefix(name, prefixes))
    .sort();
}

function listMatchingRuleFiles(rulesRoot, prefixes) {
  if (!fs.existsSync(rulesRoot)) {
    return [];
  }
  return fs
    .readdirSync(rulesRoot, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.mdc'))
    .map((d) => d.name)
    .filter((name) => matchesAnyPrefix(name.replace(/\.mdc$/, ''), prefixes))
    .sort();
}

function writeDoNotEdit(destDir, canonical) {
  const file = path.join(destDir, 'DO_NOT_EDIT.md');
  const body = `# 请勿直接编辑此目录

此内容为 Agent Modules 从 Git 依赖仓库同步的安装副本，在 Agent 中运行 \`/agent-modules-sync\` 时会被覆盖。

1. 编辑源码：\`${canonical}\`
2. 提交并推送对应仓库
3. 在本机 Agent 中再次运行：\`/agent-modules-sync\`
`;
  fs.writeFileSync(file, body, 'utf8');
}

function copyDirRecursive(src, dest) {
  ensureDir(dest);
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      copyDirRecursive(from, to);
    } else if (ent.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

function treeMatches(src, dest, ignore = new Set(['DO_NOT_EDIT.md'])) {
  if (!fs.existsSync(dest)) {
    return false;
  }
  function walkFiles(root, base = root) {
    const files = [];
    for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
      const full = path.join(root, ent.name);
      if (ent.isDirectory()) {
        files.push(...walkFiles(full, base));
      } else if (ent.isFile()) {
        files.push(path.relative(base, full));
      }
    }
    return files;
  }
  const srcFiles = walkFiles(src).sort();
  const destFiles = walkFiles(dest)
    .filter((f) => !ignore.has(path.basename(f)))
    .sort();
  if (srcFiles.length !== destFiles.length) {
    return false;
  }
  for (let i = 0; i < srcFiles.length; i += 1) {
    if (srcFiles[i] !== destFiles[i]) {
      return false;
    }
    const a = fs.readFileSync(path.join(src, srcFiles[i]));
    const b = fs.readFileSync(path.join(dest, destFiles[i]));
    if (!a.equals(b)) {
      return false;
    }
  }
  return true;
}

function installSkillCopy(src, dest, canonical) {
  fs.rmSync(dest, { recursive: true, force: true });
  copyDirRecursive(src, dest);
  writeDoNotEdit(dest, canonical);
}

function installRuleCopy(srcFile, destFile, canonical) {
  ensureDir(path.dirname(destFile));
  fs.copyFileSync(srcFile, destFile);
  writeDoNotEdit(path.dirname(destFile), canonical);
}

/**
 * @param {object} opts
 * @param {string} opts.agentId
 * @param {string} opts.skillsTarget
 * @param {string | null} opts.rulesTarget
 * @param {string} opts.repoRoot skills/ rules/ 所在仓库根
 * @param {string[]} opts.prefixes
 * @param {boolean} opts.skipDetect
 * @param {() => boolean} opts.detect
 */
export function syncRepoToTarget(opts) {
  const { agentId, skillsTarget, rulesTarget, repoRoot, prefixes, detect, skipDetect } = opts;
  if (!skipDetect && !detect()) {
    return { agentId, skipped: true, actions: [] };
  }

  const skillsSrc = path.join(repoRoot, 'skills');
  const rulesSrc = path.join(repoRoot, 'rules');
  const desiredSkills = listMatchingSkillDirs(skillsSrc, prefixes);
  const desiredRules = listMatchingRuleFiles(rulesSrc, prefixes);

  ensureDir(skillsTarget);
  const actions = [];

  if (rulesTarget) {
    ensureDir(rulesTarget);
  }

  for (const ent of fs.readdirSync(skillsTarget, { withFileTypes: true })) {
    if (!ent.isDirectory()) {
      continue;
    }
    const name = ent.name;
    if (matchesAnyPrefix(name, prefixes) && !desiredSkills.includes(name)) {
      fs.rmSync(path.join(skillsTarget, name), { recursive: true, force: true });
      actions.push({ type: 'remove-skill', name });
    }
  }

  for (const skill of desiredSkills) {
    const from = path.join(skillsSrc, skill);
    const to = path.join(skillsTarget, skill);
    if (treeMatches(from, to)) {
      continue;
    }
    installSkillCopy(from, to, from);
    actions.push({ type: 'sync-skill', name: skill });
  }

  if (rulesTarget) {
    for (const ent of fs.readdirSync(rulesTarget, { withFileTypes: true })) {
      if (!ent.isFile() || !ent.name.endsWith('.mdc')) {
        continue;
      }
      const base = ent.name.replace(/\.mdc$/, '');
      if (matchesAnyPrefix(base, prefixes) && !desiredRules.includes(ent.name)) {
        fs.rmSync(path.join(rulesTarget, ent.name), { force: true });
        actions.push({ type: 'remove-rule', name: ent.name });
      }
    }

    for (const ruleFile of desiredRules) {
      const from = path.join(rulesSrc, ruleFile);
      const to = path.join(rulesTarget, ruleFile);
      if (fs.existsSync(to)) {
        const a = fs.readFileSync(from);
        const b = fs.readFileSync(to);
        if (a.equals(b)) {
          continue;
        }
      }
      installRuleCopy(from, to, from);
      actions.push({ type: 'sync-rule', name: ruleFile });
    }
  }

  return { agentId, skipped: false, actions, skillsTarget, rulesTarget };
}
