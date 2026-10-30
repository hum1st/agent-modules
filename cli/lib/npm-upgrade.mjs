import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { packageRoot } from './paths.mjs';

/** @returns {string | null} 当前正在执行的 CLI 包版本 */
export function readRunningCliVersion() {
  const candidates = [];
  if (process.env.AGENT_MODULES_ROOT) {
    candidates.push(path.join(process.env.AGENT_MODULES_ROOT, 'package.json'));
  }
  candidates.push(path.join(packageRoot(), 'package.json'));

  for (const pkg of candidates) {
    if (fs.existsSync(pkg)) {
      return JSON.parse(fs.readFileSync(pkg, 'utf8')).version ?? null;
    }
  }
  return null;
}

/** @returns {string | null} 全局 npm 安装的 agent-modules 版本（/agent-modules-sync 升级对比用） */
export function readGlobalInstalledVersion() {
  const r = spawnSync('npm', ['list', '-g', 'agent-modules', '--json', '--depth=0'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.status === 0) {
    try {
      const parsed = JSON.parse(r.stdout || '{}');
      const entry = parsed.dependencies?.['agent-modules'];
      if (entry?.version) {
        return String(entry.version);
      }
    } catch {
      /* fall through */
    }
  }
  return readRunningCliVersion();
}

/** @returns {string | null} */
export function readInstalledVersion() {
  return readGlobalInstalledVersion();
}

/** @returns {number[]} */
function parseSemver(version) {
  const m = /^(\d+)\.(\d+)\.(\d+)/.exec(String(version).trim());
  if (!m) {
    return [];
  }
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** @returns {-1 | 0 | 1} */
export function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa.length || !pb.length) {
    return 0;
  }
  for (let i = 0; i < 3; i += 1) {
    if (pa[i] > pb[i]) {
      return 1;
    }
    if (pa[i] < pb[i]) {
      return -1;
    }
  }
  return 0;
}

/** @returns {string | null} */
export function readRegistryLatestVersion() {
  const r = spawnSync('npm', ['view', 'agent-modules', 'version', '--json'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (r.status !== 0) {
    return null;
  }
  const raw = (r.stdout || '').trim();
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'string' ? parsed : String(parsed);
  } catch {
    return raw.replace(/^"|"$/g, '') || null;
  }
}

function runNpmGlobalInstall(version) {
  const spec = version ? `agent-modules@${version}` : 'agent-modules@latest';
  const r = spawnSync('npm', ['install', '-g', spec], {
    encoding: 'utf8',
    stdio: ['ignore', 'inherit', 'pipe'],
  });
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || '').trim();
    throw new Error(`npm install -g ${spec} failed${err ? `: ${err}` : ''}`);
  }
}

/**
 * 若 registry 上有较新版本则全局安装
 * @returns {{ upgraded: boolean, installed: string | null, latest: string | null }}
 */
export function upgradeNpmIfNeeded({ log = console.log } = {}) {
  const installed = readInstalledVersion();
  const latest = readRegistryLatestVersion();

  if (!latest) {
    log('  npm registry: could not read latest version (skipped upgrade check)');
    return { upgraded: false, installed, latest: null };
  }

  if (!installed) {
    log(`  installed version unknown; registry latest is ${latest}`);
    return { upgraded: false, installed: null, latest };
  }

  log(`  installed: ${installed}`);
  log(`  registry:  ${latest}`);

  if (compareSemver(latest, installed) <= 0) {
    log('  npm package is up to date');
    return { upgraded: false, installed, latest };
  }

  log(`  upgrading: npm install -g agent-modules@${latest}`);
  runNpmGlobalInstall(latest);
  log(`  upgraded agent-modules ${installed} → ${latest}`);
  return { upgraded: true, installed, latest };
}

/** 升级后重新执行 agent-modules refresh（避免当前进程仍为旧代码） */
export function reexecAgentModulesRefresh(extraArgs = []) {
  const argv = ['refresh', '--no-upgrade', ...extraArgs];
  const r = spawnSync('agent-modules', argv, {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  process.exit(r.status === null ? 1 : r.status);
}
