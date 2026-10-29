import {
  loadGlobalConfig,
  normalizeRepoUrl,
  saveGlobalConfig,
  upsertRepo,
} from '../lib/config.mjs';
import { ensureRepoCloned } from '../lib/git.mjs';
import { inferPrefixes } from '../lib/infer-prefixes.mjs';
import { installRepoDependencies } from '../lib/repo-install.mjs';
import { parseGitUrl, repoDir, storageRoot } from '../lib/paths.mjs';
import { readRepoConfig } from '../lib/repo-config.mjs';
import { runRefresh } from './refresh.mjs';

/**
 * @param {string} url
 * @param {{ scope?: 'global' | 'project', project?: string }} opts
 */
export function runAdd(url, opts = {}) {
  const { config: existing, file } = loadGlobalConfig();
  if (!existing) {
    console.error('Agent Modules is not initialized. Run: agent-modules');
    process.exit(1);
  }

  const normalized = normalizeRepoUrl(url);
  const scope = opts.scope === 'project' ? 'project' : 'global';
  const project = scope === 'project' ? opts.project || process.cwd() : undefined;

  const parsed = parseGitUrl(normalized);
  const store = storageRoot(existing);
  const dest = repoDir(store, parsed);

  console.log(`Adding ${parsed.host}/${parsed.org}/${parsed.repo}`);
  console.log(`  url: ${normalized}`);
  console.log(`  scope: ${scope}${project ? ` (${project})` : ''}`);

  ensureRepoCloned(normalized, dest);
  installRepoDependencies(dest);

  const repoCfg = readRepoConfig(dest);
  let fallbackPrefixes;
  if (repoCfg.prefixes?.length) {
    console.log(`  prefixes from repo: ${repoCfg.prefixes.join(', ')} (${repoCfg.file})`);
  } else {
    fallbackPrefixes = inferPrefixes(dest);
    if (!fallbackPrefixes.length) {
      console.error('Could not determine prefixes from repo config or repository layout.');
      console.error('Add skills/ or rules/ with SKILL.md / .mdc files, or create config.yaml with prefixes.');
      process.exit(1);
    }
    console.log(`  inferred fallback prefixes for agent-modules.yaml: ${fallbackPrefixes.join(', ')}`);
  }

  const entry = {
    url: normalized,
    scope,
    ...(project ? { project } : {}),
    ...(fallbackPrefixes ? { prefixes: fallbackPrefixes } : {}),
  };

  const config = upsertRepo({ ...existing }, entry);
  saveGlobalConfig(config);
  console.log(`  updated ${file}`);

  console.log('\nRunning refresh…');
  runRefresh({ upgradeNpm: false });
}
