#!/usr/bin/env node
import { runAdd } from './commands/add.mjs';
import { runInit } from './commands/init.mjs';
import { runRefresh } from './commands/refresh.mjs';
import { readInstalledVersion } from './lib/npm-upgrade.mjs';

/** 面向终端用户的说明（不含内部子命令） */
function userUsage() {
  console.log(`Usage: agent-modules

Initialize Agent Modules: create ~/.agentModules and sync bundled agent-modules* skills
to detected agents (Cursor, Claude Code, Copilot CLI, Codex).

Run once after:
  npm install -g agent-modules
  agent-modules
`);
}

function parseRefreshOptions(args) {
  return { upgradeNpm: !args.includes('--no-upgrade') };
}

function parseAddOptions(args) {
  const opts = { scope: 'global', project: undefined };
  const rest = [];
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--scope' && args[i + 1]) {
      opts.scope = args[i + 1] === 'project' ? 'project' : 'global';
      i += 1;
    } else if (a === '--project' && args[i + 1]) {
      opts.project = args[i + 1];
      i += 1;
    } else if (a.startsWith('--scope=')) {
      opts.scope = a.split('=')[1] === 'project' ? 'project' : 'global';
    } else {
      rest.push(a);
    }
  }
  return { opts, url: rest[0] };
}

const argv = process.argv.slice(2);

if (argv.length === 0 || argv[0] === 'init') {
  try {
    runInit();
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
  process.exit(0);
}

const cmd = argv[0];
const rest = argv.slice(1);

if (cmd === '--version' || cmd === '-V' || cmd === 'version') {
  const v = readInstalledVersion();
  if (!v) {
    console.error('agent-modules version unknown (package.json not found)');
    process.exit(1);
  }
  console.log(v);
  process.exit(0);
}

if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
  userUsage();
  process.exit(0);
}

try {
  if (cmd === 'refresh') {
    runRefresh(parseRefreshOptions(rest));
  } else if (cmd === 'add') {
    const { opts, url } = parseAddOptions(rest);
    if (!url) {
      console.error('Missing repository URL.');
      process.exit(1);
    }
    runAdd(url, opts);
  } else {
    console.error(`Unknown command: ${cmd}`);
    userUsage();
    process.exit(1);
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
