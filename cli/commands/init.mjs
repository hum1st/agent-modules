import {
  defaultGlobalConfig,
  loadGlobalConfig,
  saveGlobalConfig,
} from '../lib/config.mjs';
import { syncBundledSkills } from '../lib/bundled-sync.mjs';
import { globalConfigPath } from '../lib/paths.mjs';

export function runInit() {
  const { config: existing } = loadGlobalConfig();
  if (!existing) {
    const config = defaultGlobalConfig();
    const file = saveGlobalConfig(config);
    console.log(`Created ${file}`);
  } else {
    console.log(`Config already exists: ${globalConfigPath()}`);
  }

  console.log('Agent Modules — sync bundled skills');
  console.log('Targets:');
  syncBundledSkills();
  console.log('Done.');
}
