import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const KNOWN_MANAGERS = new Set(['npm', 'pnpm', 'yarn', 'bun']);

/** lockfile 优先于默认 npm；package.json 的 packageManager 字段再优先于 lockfile */
const LOCKFILES = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
];

/**
 * 仓库根目录无 package.json 时返回 null。
 * @param {string} repoRoot
 * @returns {'npm' | 'pnpm' | 'yarn' | 'bun' | null}
 */
export function resolvePackageManager(repoRoot) {
  const pkgPath = path.join(repoRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }

  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid package.json in ${repoRoot}: ${message}`);
  }

  const declared = typeof pkg.packageManager === 'string' ? pkg.packageManager.split('@')[0] : '';
  if (KNOWN_MANAGERS.has(declared)) {
    return declared;
  }

  for (const [file, manager] of LOCKFILES) {
    if (fs.existsSync(path.join(repoRoot, file))) {
      return manager;
    }
  }

  return 'npm';
}

/**
 * @param {string} command
 * @param {string[]} args
 * @param {string} cwd
 */
function runInstall(command, args, cwd) {
  return spawnSync(command, args, {
    cwd,
    env: process.env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}

/**
 * 订阅仓库根目录存在 package.json 时安装依赖。无 package.json 则跳过。
 * @param {string} repoRoot
 * @param {{ run?: typeof runInstall, log?: (message: string) => void }} [opts]
 * @returns {{ installed: boolean, manager: string | null }}
 */
export function installRepoDependencies(repoRoot, opts = {}) {
  const run = opts.run ?? runInstall;
  const log = opts.log ?? console.log;
  const manager = resolvePackageManager(repoRoot);
  if (!manager) {
    return { installed: false, manager: null };
  }

  log(`  dependencies: ${manager} install`);
  const result = run(manager, ['install'], repoRoot);
  if (result.error && result.error.code === 'ENOENT') {
    throw new Error(
      `${manager} was not found. Install ${manager}, then retry, to install dependencies in ${repoRoot}.`,
    );
  }
  if (result.status !== 0) {
    throw new Error(`${manager} install failed in ${repoRoot} (exit ${result.status ?? 'unknown'})`);
  }
  return { installed: true, manager };
}
