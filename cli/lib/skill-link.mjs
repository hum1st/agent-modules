import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ensureDir } from './paths.mjs';

export const SKILL_LINK_MARKER = 'agent-modules-skill-link: v1';

/**
 * @param {string} skillMdPath
 */
export function readSkillSource(skillMdPath) {
  const text = fs.readFileSync(skillMdPath, 'utf8');
  const hash = crypto.createHash('sha256').update(text).digest('hex');
  if (!text.startsWith('---\n')) {
    return { frontmatterBlock: '', body: text, hash };
  }
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatterBlock: '', body: text, hash };
  }
  return {
    frontmatterBlock: text.slice(4, end),
    body: text.slice(end + 5),
    hash,
  };
}

/**
 * @param {object} opts
 * @param {string} opts.skillName
 * @param {string} opts.canonicalSkillDir 源仓库内 skills/<name> 绝对路径
 * @param {string} opts.repoRoot 含 node_modules 的克隆根目录
 * @param {string} [opts.repoUrl] 订阅 Git URL（展示用）
 * @param {string} opts.sourceHash 源 SKILL.md 内容哈希
 */
export function renderSkillLinkMarkdown(opts) {
  const { skillName, canonicalSkillDir, repoRoot, repoUrl, sourceHash } = opts;
  const skillMd = path.join(canonicalSkillDir, 'SKILL.md');
  const { frontmatterBlock } = readSkillSource(skillMd);

  const extraFrontmatter = [
    'agent-modules-link: true',
    `agent-modules-source-dir: ${canonicalSkillDir}`,
    `agent-modules-source-sha256: ${sourceHash}`,
  ].join('\n');

  const frontmatter = frontmatterBlock
    ? `${frontmatterBlock}\n${extraFrontmatter}`
    : extraFrontmatter;

  const repoLine = repoUrl ? `- **Git 仓库**：\`${repoUrl}\`\n` : '';

  const body = `# ${skillName}（Agent Modules 链接）

<!-- ${SKILL_LINK_MARKER} -->

此目录**不是** skill 的完整安装副本，仅保留本文件供 Agent 发现 \`/${skillName}\`。
**阅读说明、修改 skill、运行脚本**请直接使用下方源路径（含仓库根 \`node_modules\`）。

${repoLine}- **Skill 源目录**：\`${canonicalSkillDir}\`
- **Skill 正文**：\`${skillMd}\`
- **仓库根（运行 \`node …/scripts/…\` 时的工作目录）**：\`${repoRoot}\`

## 修改与发布

1. 编辑源目录中的 \`SKILL.md\` 及 \`scripts/\` 等文件（勿改本链接文件）。
2. 在源仓库 \`git commit\` / \`git push\`。
3. 在本机 Agent 中运行 \`/agent-modules-sync\`（\`agent-modules refresh\`）以更新链接元数据。

执行本 skill 前，请用 Read 工具打开 **Skill 正文** 路径中的 \`SKILL.md\`，并按其中说明在 **仓库根** 运行 \`node …/scripts/…\`（勿从本链接目录运行脚本）。
`;

  return `---\n${frontmatter}\n---\n\n${body}`;
}

/**
 * @param {string} destDir
 */
export function skillDestIsLinkOnly(destDir) {
  if (!fs.existsSync(destDir)) {
    return false;
  }
  const skillMd = path.join(destDir, 'SKILL.md');
  if (!fs.existsSync(skillMd)) {
    return false;
  }
  const entries = fs.readdirSync(destDir);
  if (entries.length !== 1 || entries[0] !== 'SKILL.md') {
    return false;
  }
  const text = fs.readFileSync(skillMd, 'utf8');
  return text.includes(SKILL_LINK_MARKER);
}

/**
 * @param {object} opts
 * @param {string} opts.srcSkillDir
 * @param {string} opts.destDir
 * @param {string} opts.repoRoot
 * @param {string} [opts.repoUrl]
 */
export function installSkillLink(opts) {
  const { srcSkillDir, destDir, repoRoot, repoUrl } = opts;
  const skillName = path.basename(srcSkillDir);
  const skillMd = path.join(srcSkillDir, 'SKILL.md');
  const { hash } = readSkillSource(skillMd);
  const content = renderSkillLinkMarkdown({
    skillName,
    canonicalSkillDir: srcSkillDir,
    repoRoot,
    repoUrl,
    sourceHash: hash,
  });
  fs.rmSync(destDir, { recursive: true, force: true });
  ensureDir(destDir);
  fs.writeFileSync(path.join(destDir, 'SKILL.md'), content, 'utf8');
}

/**
 * @param {string} srcSkillDir
 * @param {string} destDir
 * @param {object} meta
 * @param {string} meta.repoRoot
 * @param {string} [meta.repoUrl]
 */
export function skillLinkMatches(srcSkillDir, destDir, meta) {
  if (!skillDestIsLinkOnly(destDir)) {
    return false;
  }
  const skillMd = path.join(srcSkillDir, 'SKILL.md');
  const { hash } = readSkillSource(skillMd);
  const expected = renderSkillLinkMarkdown({
    skillName: path.basename(srcSkillDir),
    canonicalSkillDir: srcSkillDir,
    repoRoot: meta.repoRoot,
    repoUrl: meta.repoUrl,
    sourceHash: hash,
  });
  const actual = fs.readFileSync(path.join(destDir, 'SKILL.md'), 'utf8');
  return actual === expected;
}
