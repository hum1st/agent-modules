import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function runGit(args, opts = {}) {
  const r = spawnSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts,
  });
  return r;
}

export function ensureRepoCloned(url, dest) {
  if (fs.existsSync(dest) && fs.existsSync(`${dest}/.git`)) {
    const pull = runGit(['-C', dest, 'pull', '--ff-only']);
    if (pull.status !== 0) {
      throw new Error(`git pull failed in ${dest}: ${pull.stderr || pull.stdout}`);
    }
    return { cloned: false, path: dest };
  }
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const clone = runGit(['clone', url, dest]);
  if (clone.status !== 0) {
    throw new Error(`git clone failed: ${clone.stderr || clone.stdout}`);
  }
  return { cloned: true, path: dest };
}
