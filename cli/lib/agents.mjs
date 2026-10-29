import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

function makeDetectCursor(home) {
  return () => {
    if (fs.existsSync(path.join(home, '.cursor'))) {
      return true;
    }
    if (path.resolve(home) !== path.resolve(os.homedir())) {
      return false;
    }
    if (process.platform === 'darwin') {
      if (fs.existsSync('/Applications/Cursor.app')) {
        return true;
      }
      if (fs.existsSync(path.join(home, 'Applications/Cursor.app'))) {
        return true;
      }
    }
    return false;
  };
}

function makeDetectDir(home, subdir) {
  return () => fs.existsSync(path.join(home, subdir));
}

function makeDetectCodex(home) {
  return () =>
    fs.existsSync(path.join(home, '.codex')) || fs.existsSync(path.join(home, '.agents'));
}

/**
 * @typedef {{ id: string, skillsDir: string, rulesDir: string | null, detect: () => boolean }} AgentTarget
 */

/** @returns {AgentTarget[]} */
export function globalAgentTargets(home = os.homedir()) {
  return [
    {
      id: 'cursor',
      skillsDir: path.join(home, '.cursor', 'skills'),
      rulesDir: path.join(home, '.cursor', 'rules'),
      detect: makeDetectCursor(home),
    },
    {
      id: 'claude',
      skillsDir: path.join(home, '.claude', 'skills'),
      rulesDir: null,
      detect: makeDetectDir(home, '.claude'),
    },
    {
      id: 'copilot',
      skillsDir: path.join(home, '.copilot', 'skills'),
      rulesDir: null,
      detect: makeDetectDir(home, '.copilot'),
    },
    {
      id: 'codex',
      skillsDir: path.join(home, '.agents', 'skills'),
      rulesDir: null,
      detect: makeDetectCodex(home),
    },
  ];
}

/** @returns {AgentTarget[]} */
export function projectAgentTargets(projectRoot) {
  const root = path.resolve(projectRoot);
  return [
    {
      id: 'cursor',
      skillsDir: path.join(root, '.cursor', 'skills'),
      rulesDir: path.join(root, '.cursor', 'rules'),
      detect: () => true,
    },
    {
      id: 'claude',
      skillsDir: path.join(root, '.claude', 'skills'),
      rulesDir: null,
      detect: () => true,
    },
    {
      id: 'copilot',
      skillsDir: path.join(root, '.copilot', 'skills'),
      rulesDir: null,
      detect: () => true,
    },
    {
      id: 'codex',
      skillsDir: path.join(root, '.agents', 'skills'),
      rulesDir: null,
      detect: () => true,
    },
  ];
}
