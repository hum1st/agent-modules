import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { globalAgentTargets } from './agents.mjs';
import { packageRoot } from './paths.mjs';
import { syncRepoToTarget } from './sync-tree.mjs';

function bundledRepoUrl(repoRoot) {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
    const raw = pkg.repository?.url || pkg.homepage;
    if (!raw || typeof raw !== 'string') {
      return undefined;
    }
    return raw.replace(/^git\+/, '').replace(/\.git$/, '');
  } catch {
    return undefined;
  }
}

export function syncBundledSkills({ log = console.log } = {}) {
  const repoRoot = packageRoot();
  const repoUrl = bundledRepoUrl(repoRoot);
  const home =
    process.env.HOME ||
    process.env.USERPROFILE ||
    os.homedir();
  const targets = globalAgentTargets(home);

  log(`  package: ${repoRoot}`);
  log('  prefix: agent-modules*');

  let any = false;
  for (const t of targets) {
    const result = syncRepoToTarget({
      agentId: t.id,
      skillsTarget: t.skillsDir,
      rulesTarget: t.rulesDir,
      repoRoot,
      repoUrl,
      prefixes: ['agent-modules'],
      detect: t.detect,
    });
    if (result.skipped) {
      log(`  [${t.id}] skipped — agent not detected`);
      continue;
    }
    any = true;
    if (result.actions.length === 0) {
      log(`  [${t.id}] ${t.skillsDir} — up to date`);
    } else {
      log(`  [${t.id}] ${t.skillsDir}`);
      for (const a of result.actions) {
        log(`         ${a.type} ${a.name}`);
      }
    }
  }
  return any;
}
