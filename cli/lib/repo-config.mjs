import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

const REPO_CONFIG_NAMES = ['config.yaml', 'agent-modules.yaml'];

/** 读取仓库内 config.yaml（或 agent-modules.yaml）中的 prefixes */
export function readRepoConfig(repoRoot) {
  for (const name of REPO_CONFIG_NAMES) {
    const file = path.join(repoRoot, name);
    if (!fs.existsSync(file)) {
      continue;
    }
    const doc = yaml.parse(fs.readFileSync(file, 'utf8'));
    if (doc && Array.isArray(doc.prefixes) && doc.prefixes.length > 0) {
      return { file, prefixes: doc.prefixes.map(String), source: 'repo' };
    }
  }
  return { file: null, prefixes: null, source: null };
}

/**
 * 同步时解析前缀：优先仓库 config.yaml，否则 agent-modules.yaml 中该仓库的 fallback
 */
export function resolvePrefixes(repoRoot, fallbackPrefixes) {
  const repo = readRepoConfig(repoRoot);
  if (repo.prefixes?.length) {
    return { prefixes: repo.prefixes, source: 'repo', configFile: repo.file };
  }
  if (fallbackPrefixes?.length) {
    return { prefixes: fallbackPrefixes.map(String), source: 'fallback', configFile: null };
  }
  return { prefixes: [], source: 'none', configFile: null };
}
