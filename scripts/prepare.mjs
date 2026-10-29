#!/usr/bin/env node
/** 仅在 git 仓库根目录安装 dev 依赖时运行 husky；npm 消费者安装/global 安装跳过。 */
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const root = process.cwd();
if (!existsSync(join(root, '.git')) || !existsSync(join(root, 'node_modules', 'husky'))) {
  process.exit(0);
}
const r = spawnSync('husky', [], { stdio: 'inherit', shell: process.platform === 'win32' });
process.exit(r.status === null ? 0 : r.status);
