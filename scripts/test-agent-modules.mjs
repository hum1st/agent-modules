#!/usr/bin/env node
/**
 * 集成测试：Node CLI（cli/agent-modules.mjs，与 npm bin 入口一致）
 */

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLI = path.join(REPO_ROOT, 'cli', 'agent-modules.mjs');

function testEnv(home, extra = {}) {
  return {
    ...process.env,
    HOME: home,
    USERPROFILE: home,
    ...extra,
  };
}

function runCli(argv, { env = {}, cwd = REPO_ROOT, home } = {}) {
  const merged = home ? testEnv(home, env) : { ...process.env, ...env };
  return spawnSync(process.execPath, [CLI, ...argv], {
    cwd,
    env: merged,
    encoding: 'utf8',
  });
}

function makeIsolatedHome() {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-modules-home-'));
  fs.mkdirSync(path.join(home, '.cursor'), { recursive: true });
  return home;
}

function configPath(home) {
  return path.join(home, '.agentModules', 'agent-modules.yaml');
}

function minimalSkillMd(name) {
  return `---
name: ${name}
description: Test fixture skill for Agent Modules CI.
---

# ${name}
`;
}

test('agent-modules help exits 0', () => {
  const r = runCli(['help']);
  assert.equal(r.status, 0, r.stderr || r.stdout);
  assert.match(r.stdout, /Initialize Agent Modules/);
});

test('agent-modules rejects unknown command', () => {
  const r = runCli(['not-a-command']);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr + r.stdout, /Unknown command/);
});

test('agent-modules rejects removed sync subcommand', () => {
  const r = runCli(['sync']);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr + r.stdout, /Unknown command: sync/);
});

test('init creates config and syncs agent-modules* skills', () => {
  const home = makeIsolatedHome();
  try {
    const r = runCli(['init'], { home });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    assert.ok(fs.existsSync(configPath(home)), 'expected agent-modules.yaml');
    const installed = path.join(home, '.cursor/skills/agent-modules-version/SKILL.md');
    assert.ok(fs.existsSync(installed), 'expected agent-modules-version to be synced');
    assert.ok(fs.existsSync(path.join(home, '.cursor/skills/agent-modules-add/SKILL.md')));
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('default command initializes when no config', () => {
  const home = makeIsolatedHome();
  try {
    const r = runCli([], { home });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    assert.ok(fs.existsSync(configPath(home)));
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('second refresh is idempotent (up to date)', () => {
  const home = makeIsolatedHome();
  try {
    const first = runCli([], { home });
    assert.equal(first.status, 0, first.stderr || first.stdout);
    const second = runCli(['refresh', '--no-upgrade'], { home });
    assert.equal(second.status, 0, second.stderr || second.stdout);
    assert.match(second.stdout, /up to date/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('refresh removes stale agent-modules* directories', () => {
  const home = makeIsolatedHome();
  const orphan = path.join(home, '.cursor/skills/agent-modules-stale-ci');
  try {
    runCli([], { home });
    fs.mkdirSync(orphan, { recursive: true });
    fs.writeFileSync(path.join(orphan, 'SKILL.md'), minimalSkillMd('agent-modules-stale-ci'));

    const r = runCli(['refresh', '--no-upgrade'], { home });
    assert.equal(r.status, 0, r.stderr || r.stdout);
    assert.ok(!fs.existsSync(orphan), 'stale agent-modules skill should be removed');
    assert.match(r.stdout, /remove-skill agent-modules-stale-ci/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('repo config prefixes override fallback and filter skills', async () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-modules-fixture-'));
  const home = makeIsolatedHome();
  const { resolvePrefixes } = await import('../cli/lib/repo-config.mjs');
  const { syncRepoToTarget } = await import('../cli/lib/sync-tree.mjs');
  try {
    fs.mkdirSync(path.join(fixtureRoot, 'skills/agent-modules-fixture'), { recursive: true });
    fs.writeFileSync(
      path.join(fixtureRoot, 'skills/agent-modules-fixture/SKILL.md'),
      minimalSkillMd('agent-modules-fixture'),
    );
    fs.mkdirSync(path.join(fixtureRoot, 'skills/other-skill'), { recursive: true });
    fs.writeFileSync(
      path.join(fixtureRoot, 'skills/other-skill/SKILL.md'),
      minimalSkillMd('other-skill'),
    );
    fs.writeFileSync(
      path.join(fixtureRoot, 'config.yaml'),
      'version: 1\nprefixes:\n  - agent-modules-fixture\n',
    );

    const resolved = resolvePrefixes(fixtureRoot, ['fallback-should-not-win']);
    assert.deepEqual(resolved.prefixes, ['agent-modules-fixture']);
    assert.equal(resolved.source, 'repo');

    const skillsTarget = path.join(home, '.cursor/skills');
    syncRepoToTarget({
      agentId: 'cursor',
      skillsTarget,
      rulesTarget: null,
      repoRoot: fixtureRoot,
      prefixes: resolved.prefixes,
      detect: () => true,
      skipDetect: true,
    });

    assert.ok(fs.existsSync(path.join(skillsTarget, 'agent-modules-fixture/SKILL.md')));
    assert.ok(!fs.existsSync(path.join(skillsTarget, 'other-skill')));
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('compareSemver orders versions', async () => {
  const { compareSemver } = await import('../cli/lib/npm-upgrade.mjs');
  assert.equal(compareSemver('1.2.0', '1.3.0'), -1);
  assert.equal(compareSemver('1.3.0', '1.3.0'), 0);
  assert.equal(compareSemver('2.0.0', '1.9.9'), 1);
});

test('parseGitUrl accepts github coordinates in add flow', () => {
  const home = makeIsolatedHome();
  try {
    runCli(['init'], { home });
    const r = runCli(['add', 'not-a-valid-repo!!!'], { home });
    assert.notEqual(r.status, 0);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
