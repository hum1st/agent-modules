import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __cliDir = path.dirname(fileURLToPath(import.meta.url));

/** npm 包根目录（含 skills/、package.json） */
export function packageRoot() {
  return path.resolve(__cliDir, '../..');
}

export function homeDir() {
  const h = os.homedir();
  if (!h) {
    throw new Error('Cannot resolve home directory (HOME / USERPROFILE).');
  }
  return h;
}

/** Agent Modules 本机数据目录（内部配置与依赖 clone 均在此下） */
export function agentModulesHome() {
  return path.join(homeDir(), '.agentModules');
}

/** 内部订阅配置（用户勿手改；由 CLI / Agent skills 维护） */
export function globalConfigPath() {
  return path.join(agentModulesHome(), 'agent-modules.yaml');
}

/** 依赖仓库 clone 根目录：`~/.agentModules/sources` */
export function storageRoot(_config) {
  return path.join(agentModulesHome(), 'sources');
}

export function expandHome(p) {
  if (p === '~') {
    return homeDir();
  }
  if (p.startsWith('~/') || p.startsWith('~\\')) {
    return path.join(homeDir(), p.slice(2));
  }
  return path.resolve(p);
}

/**
 * 将 git URL 解析为 host/org/repo 与磁盘路径
 * @returns {{ host: string, org: string, repo: string, clonePath: string }}
 */
export function parseGitUrl(url) {
  let u = url.trim().replace(/\.git$/, '');
  let host;
  let pathname;

  const scp = /^[^@]+@([^:]+):(.+)$/.exec(u);
  if (scp) {
    host = scp[1];
    pathname = scp[2];
  } else if (u.includes('://')) {
    const parsed = new URL(u);
    host = parsed.hostname;
    pathname = parsed.pathname.replace(/^\//, '');
  } else if (/^[\w.-]+\/[\w.-]+$/.test(u)) {
    host = 'github.com';
    pathname = u;
  } else {
    throw new Error(`Unrecognized repository URL: ${url}`);
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) {
    throw new Error(`Expected host/org/repo in URL, got: ${url}`);
  }
  const org = parts[parts.length - 2];
  const repo = parts[parts.length - 1];
  return {
    host,
    org,
    repo,
    clonePath: path.join(host, org, repo),
  };
}

export function repoDir(storageRootPath, parsed) {
  return path.join(storageRootPath, parsed.clonePath);
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function bundledSkillsDir() {
  return path.join(packageRoot(), 'skills');
}
