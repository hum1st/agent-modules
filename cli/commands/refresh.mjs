import os from 'node:os';
import { loadGlobalConfig } from '../lib/config.mjs';
import { ensureRepoCloned } from '../lib/git.mjs';
import { globalAgentTargets, projectAgentTargets } from '../lib/agents.mjs';
import { expandHome, parseGitUrl, repoDir, storageRoot } from '../lib/paths.mjs';
import { resolvePrefixes } from '../lib/repo-config.mjs';
import { syncRepoToTarget } from '../lib/sync-tree.mjs';
import { syncBundledSkills } from '../lib/bundled-sync.mjs';
import { reexecAgentModulesRefresh, upgradeNpmIfNeeded } from '../lib/npm-upgrade.mjs';

function printTargetResult(result) {
  if (result.skipped) {
    console.log(`  [${result.agentId}] skipped — agent not detected`);
    return;
  }
  const dir = result.skillsTarget;
  if (result.actions.length === 0) {
    console.log(`  [${result.agentId}] ${dir} — up to date`);
  } else {
    console.log(`  [${result.agentId}] ${dir}`);
    for (const a of result.actions) {
      console.log(`         ${a.type.replace('-', ' ')} ${a.name}`);
    }
  }
}

/**
 * 内部子命令 refresh：npm 升级、内置 skills、订阅仓库 pull + 同步（/agent-modules-sync skill 调用）
 * @param {{ upgradeNpm?: boolean }} [options]
 */
export function runRefresh(options = {}) {
  const upgradeNpm = options.upgradeNpm !== false;

  if (upgradeNpm) {
    console.log('Agent Modules refresh');
    console.log('Step 1 — npm package:');
    const upgrade = upgradeNpmIfNeeded();
    if (upgrade.upgraded) {
      console.log('Re-running refresh with upgraded CLI…');
      reexecAgentModulesRefresh();
      return;
    }
    console.log('');
  }

  const { config } = loadGlobalConfig();
  if (!config) {
    console.error('Agent Modules is not initialized. Run: agent-modules');
    process.exit(1);
  }

  if (!upgradeNpm) {
    console.log('Agent Modules refresh');
  }
  console.log(`${upgradeNpm ? 'Step 2' : 'Bundled skills'} — bundled agent-modules* skills:`);
  syncBundledSkills();

  const store = storageRoot(config);
  const home = process.env.HOME || process.env.USERPROFILE || os.homedir();
  const repos = config.repos || [];

  if (repos.length === 0) {
    console.log('\nNo subscribed repositories in config.');
    console.log('Done.');
    return;
  }

  console.log(`\n${upgradeNpm ? 'Step 3' : 'Subscribed repositories'} — subscribed repositories:`);
  for (const entry of repos) {
    const url = entry.url;
    const parsed = parseGitUrl(url);
    const dest = repoDir(store, parsed);
    console.log(`\n  ${parsed.host}/${parsed.org}/${parsed.repo}`);
    console.log(`  clone: ${dest}`);

    ensureRepoCloned(url, dest);

    const { prefixes, source, configFile } = resolvePrefixes(dest, entry.prefixes);
    if (!prefixes.length) {
      console.warn('  warning: no prefixes (repo config or fallback); skipping content sync');
      continue;
    }
    console.log(`  prefixes: ${prefixes.join(', ')} (${source}${configFile ? `, ${configFile}` : ''})`);

    const scope = entry.scope || 'global';
    let targets;
    if (scope === 'project') {
      const projectPath = expandHome(entry.project || '');
      if (!projectPath) {
        console.warn('  warning: project scope but no project path; skipping');
        continue;
      }
      targets = projectAgentTargets(projectPath);
      console.log(`  scope: project (${projectPath})`);
    } else {
      targets = globalAgentTargets(home);
      console.log('  scope: global');
    }

    console.log('  Targets:');
    for (const t of targets) {
      const result = syncRepoToTarget({
        agentId: t.id,
        skillsTarget: t.skillsDir,
        rulesTarget: t.rulesDir,
        repoRoot: dest,
        prefixes,
        detect: t.detect,
        skipDetect: scope === 'project',
      });
      printTargetResult(result);
    }
  }
  console.log('\nDone.');
}
