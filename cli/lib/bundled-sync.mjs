import os from 'node:os';
import { globalAgentTargets } from './agents.mjs';
import { packageRoot } from './paths.mjs';
import { syncRepoToTarget } from './sync-tree.mjs';

export function syncBundledSkills({ log = console.log } = {}) {
  const repoRoot = packageRoot();
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
