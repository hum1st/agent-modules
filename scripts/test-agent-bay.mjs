#!/usr/bin/env node
/**
 * 跨平台集成测试：通过 Node 子进程调用 bin/agent-bay 与 POSIX sh 脚本。
 * CI 在 ubuntu / macOS / Windows（Git Bash 的 sh）上运行。
 */

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function resolveSh() {
  if (process.env.AGENTBAY_TEST_SH) {
    return process.env.AGENTBAY_TEST_SH;
  }
  if (process.platform === 'win32') {
    const candidates = [
      path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Git', 'bin', 'sh.exe'),
      path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'Git', 'bin', 'sh.exe'),
    ];
    for (const c of candidates) {
      if (c && fs.existsSync(c)) {
        return c;
      }
    }
  }
  return 'sh';
}

const SH = resolveSh();

function runSh(args, { env = {}, cwd = REPO_ROOT } = {}) {
  return spawnSync(SH, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
}

function runAgentBay(argv, env = {}) {
  return runSh([path.join(REPO_ROOT, 'bin/agent-bay'), ...argv], {
    env: {
      AGENTBAY_ROOT: REPO_ROOT,
      ...env,
    },
  });
}

function makeIsolatedHome() {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'agentbay-home-'));
  fs.mkdirSync(path.join(home, '.cursor'), { recursive: true });
  return home;
}

function minimalSkillMd(name) {
  return `---
name: ${name}
description: Test fixture skill for Agent Bay CI.
---

# ${name}
`;
}

test('agent-bay help exits 0', () => {
  const r = runAgentBay(['help']);
  assert.equal(r.status, 0, r.stderr || r.stdout);
  assert.match(r.stdout, /Usage: agent-bay/);
});

test('agent-bay rejects unknown command', () => {
  const r = runAgentBay(['not-a-command']);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr + r.stdout, /Unknown command/);
});

test('sync installs agent-bay* skills under isolated HOME', () => {
  const home = makeIsolatedHome();
  try {
    const r = runAgentBay([], { HOME: home });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    const installed = path.join(home, '.cursor/skills/agent-bay-version/SKILL.md');
    assert.ok(fs.existsSync(installed), 'expected agent-bay-version to be synced');
    assert.ok(fs.existsSync(path.join(home, '.cursor/skills/agent-bay-version/DO_NOT_EDIT.md')));
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('second sync is idempotent (up to date)', () => {
  const home = makeIsolatedHome();
  try {
    const first = runAgentBay([], { HOME: home });
    assert.equal(first.status, 0, first.stderr || first.stdout);
    const second = runAgentBay([], { HOME: home });
    assert.equal(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stdout, /up to date/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('sync removes stale agent-bay* directories', () => {
  const home = makeIsolatedHome();
  const orphan = path.join(home, '.cursor/skills/agent-bay-stale-ci');
  try {
    fs.mkdirSync(orphan, { recursive: true });
    fs.writeFileSync(path.join(orphan, 'SKILL.md'), minimalSkillMd('agent-bay-stale-ci'));

    const r = runAgentBay([], { HOME: home });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    assert.ok(!fs.existsSync(orphan), 'stale agent-bay skill should be removed');
    assert.ok(fs.existsSync(path.join(home, '.cursor/skills/agent-bay-version/SKILL.md')));
    assert.match(r.stdout, /remove agent-bay-stale-ci/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('sync from fixture repo ignores non agent-bay* skills', () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agentbay-fixture-'));
  const home = makeIsolatedHome();
  try {
    fs.mkdirSync(path.join(fixtureRoot, 'skills/agent-bay-fixture'), { recursive: true });
    fs.writeFileSync(
      path.join(fixtureRoot, 'skills/agent-bay-fixture/SKILL.md'),
      minimalSkillMd('agent-bay-fixture'),
    );
    fs.mkdirSync(path.join(fixtureRoot, 'skills/other-skill'), { recursive: true });
    fs.writeFileSync(path.join(fixtureRoot, 'skills/other-skill/SKILL.md'), minimalSkillMd('other-skill'));

    const r = runAgentBay([], { HOME: home, AGENTBAY_ROOT: fixtureRoot });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    assert.ok(fs.existsSync(path.join(home, '.cursor/skills/agent-bay-fixture/SKILL.md')));
    assert.ok(!fs.existsSync(path.join(home, '.cursor/skills/other-skill')));
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('agent-bay.cmd help on Windows when Git sh is available', { skip: process.platform !== 'win32' }, () => {
  const cmdPath = path.join(REPO_ROOT, 'bin', 'agent-bay.cmd');
  assert.ok(fs.existsSync(cmdPath));
  const r = spawnSync('cmd.exe', ['/c', cmdPath, 'help'], {
    cwd: REPO_ROOT,
    env: { ...process.env, AGENTBAY_ROOT: REPO_ROOT },
    encoding: 'utf8',
  });
  assert.equal(r.status, 0, r.stderr || r.stdout);
  assert.match(r.stdout, /Usage: agent-bay/);
});
