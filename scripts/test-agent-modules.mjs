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

    const linked = path.join(skillsTarget, 'agent-modules-fixture/SKILL.md');
    assert.ok(fs.existsSync(linked));
    const linkText = fs.readFileSync(linked, 'utf8');
    assert.match(linkText, /agent-modules-skill-link: v1/);
    assert.match(linkText, new RegExp(fixtureRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(!fs.existsSync(path.join(skillsTarget, 'other-skill')));
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('sync replaces stale full skill tree with link-only SKILL.md', async () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-modules-link-'));
  const home = makeIsolatedHome();
  const { syncRepoToTarget } = await import('../cli/lib/sync-tree.mjs');
  try {
    fs.mkdirSync(path.join(fixtureRoot, 'skills/ly-fixture'), { recursive: true });
    fs.writeFileSync(
      path.join(fixtureRoot, 'skills/ly-fixture/SKILL.md'),
      minimalSkillMd('ly-fixture'),
    );
    const skillsTarget = path.join(home, '.cursor/skills');
    const dest = path.join(skillsTarget, 'ly-fixture');
    fs.mkdirSync(dest, { recursive: true });
    fs.writeFileSync(path.join(dest, 'SKILL.md'), '# stale copy\n');
    fs.mkdirSync(path.join(dest, 'scripts'), { recursive: true });
    fs.writeFileSync(path.join(dest, 'scripts/run.mjs'), 'import "missing"\n');

    syncRepoToTarget({
      agentId: 'cursor',
      skillsTarget,
      rulesTarget: null,
      repoRoot: fixtureRoot,
      repoUrl: 'https://github.com/example/fixture.git',
      prefixes: ['ly'],
      detect: () => true,
      skipDetect: true,
    });

    assert.ok(!fs.existsSync(path.join(dest, 'scripts')));
    assert.equal(fs.readdirSync(dest).length, 1);
    assert.match(fs.readFileSync(path.join(dest, 'SKILL.md'), 'utf8'), /agent-modules-skill-link: v1/);
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

test('subscribed repo package.json selects install command', async () => {
  const { resolvePackageManager, installRepoDependencies } = await import('../cli/lib/repo-install.mjs');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agent-modules-pkg-'));
  try {
    assert.equal(resolvePackageManager(root), null);

    const skipped = installRepoDependencies(root, {
      run() {
        throw new Error('should not install without package.json');
      },
    });
    assert.deepEqual(skipped, { installed: false, manager: null });

    fs.writeFileSync(path.join(root, 'package.json'), '{"name":"fixture"}\n');
    assert.equal(resolvePackageManager(root), 'npm');

    fs.writeFileSync(path.join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9\n');
    assert.equal(resolvePackageManager(root), 'pnpm');

    fs.writeFileSync(
      path.join(root, 'package.json'),
      '{"name":"fixture","packageManager":"yarn@4.0.0"}\n',
    );
    assert.equal(resolvePackageManager(root), 'yarn');

    /** @type {string[]} */
    const calls = [];
    const installed = installRepoDependencies(root, {
      log() {},
      run(command, args, cwd) {
        calls.push(`${command} ${args.join(' ')} ${cwd}`);
        return { status: 0 };
      },
    });
    assert.deepEqual(installed, { installed: true, manager: 'yarn' });
    assert.deepEqual(calls, [`yarn install ${root}`]);

    assert.throws(
      () =>
        installRepoDependencies(root, {
          log() {},
          run() {
            return { status: 1 };
          },
        }),
      /yarn install failed/,
    );

    assert.throws(
      () =>
        installRepoDependencies(root, {
          log() {},
          run() {
            const error = new Error('spawn yarn ENOENT');
            error.code = 'ENOENT';
            return { status: null, error };
          },
        }),
      /yarn was not found/,
    );

    fs.writeFileSync(path.join(root, 'package.json'), '{');
    assert.throws(() => resolvePackageManager(root), /Invalid package.json/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
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
