import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** 仅允许通过 readme-translations-write 写入的 provenance 标记。 */
export const WRITE_PROVENANCE_MARKER =
  /<!-- agent-modules-readme-locale:[\w-]+ via readme-translations-write -->/;

export function writeProvenanceComment(locale) {
  return `<!-- agent-modules-readme-locale:${locale} via readme-translations-write -->`;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(__dirname, "..");

export const SOURCE_README = join(REPO_ROOT, "README.md");
export const LOCK_PATH = join(REPO_ROOT, "docs", "README.lock.json");
export const DOCS_DIR = join(REPO_ROOT, "docs");

/** npm 包内相对链接无效；语言切换与 LICENSE 使用 GitHub 绝对 URL。 */
export const GITHUB_BLOB_BASE = "https://github.com/hum1st/agent-modules/blob/main";

export function githubBlobUrl(repoRelativePath) {
  return `${GITHUB_BLOB_BASE}/${repoRelativePath}`;
}

export const LICENSE_URL = githubBlobUrl("LICENSE");

/** 与仓库内 docs/README.<locale>.md 一致；新增语言时扩展此列表并补译文。 */
export const LOCALES = [
  "zh-CN",
  "hi",
  "es",
  "fr",
  "ar",
  "bn",
  "pt",
  "ru",
  "ur",
];

/** locale 元数据：切换器标题与展示名。 */
export const LOCALE_META = {
  "zh-CN": { label: "简体中文", switcherTitle: "其他语言" },
  hi: { label: "हिन्दी", switcherTitle: "अन्य भाषाएँ" },
  es: { label: "Español", switcherTitle: "Leer en otros idiomas" },
  fr: { label: "Français", switcherTitle: "Lire dans d'autres langues" },
  ar: { label: "العربية", switcherTitle: "اقرأ بلغات أخرى" },
  bn: { label: "বাংলা", switcherTitle: "অন্যান্য ভাষায় পড়ুন" },
  pt: { label: "Português", switcherTitle: "Ler em outros idiomas" },
  ru: { label: "Русский", switcherTitle: "Читать на других языках" },
  ur: { label: "اردو", switcherTitle: "دیگر زبانوں میں پڑھیں" },
};

export function buildDocsLanguageSwitcher(activeLocale) {
  const meta = LOCALE_META[activeLocale];
  if (!meta) {
    throw new Error(`未知 locale: ${activeLocale}`);
  }
  const links = [
    `<a href="${githubBlobUrl("README.md")}">English</a>`,
    ...LOCALES.map(
      (loc) =>
        `<a href="${githubBlobUrl(`docs/README.${loc}.md`)}">${LOCALE_META[loc].label}</a>`,
    ),
  ];
  return [
    '<p align="center">',
    `  <strong>${meta.switcherTitle}</strong><br>`,
    `  ${links.join(" ·\n  ")}`,
    "</p>",
  ].join("\n");
}

/** 组装完整的 docs/README.<locale>.md（含标题、切换器、正文与 provenance）。 */
export function assembleLocaleReadme(locale, bodyMarkdown) {
  const body = normalizeForHash(bodyMarkdown);
  const switcher = buildDocsLanguageSwitcher(locale);
  const marker = writeProvenanceComment(locale);
  return `# Agent Modules\n\n${switcher}\n\n${body}\n\n${marker}\n`;
}

export function extractTranslatableBodyFromSource() {
  const raw = readFileSync(SOURCE_README, "utf8");
  return normalizeForHash(stripLanguageSwitcher(raw));
}

const SWITCHER_RE = /<p align="center">[\s\S]*?<\/p>\s*/;

/** 去掉文首语言切换器，仅对正文做一致性校验。 */
export function stripLanguageSwitcher(content) {
  return content.replace(SWITCHER_RE, "");
}

export function normalizeForHash(text) {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function hashText(text) {
  return createHash("sha256").update(normalizeForHash(text), "utf8").digest("hex");
}

/** 英文源 README 正文的 SHA-256（不含语言切换器）。 */
export function computeSourceHash() {
  const raw = readFileSync(SOURCE_README, "utf8");
  return hashText(stripLanguageSwitcher(raw));
}

/** 各级标题深度序列，用于结构对齐（不比较标题译文）。 */
export function headingSignature(content) {
  const body = stripLanguageSwitcher(content);
  const levels = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^(#{2,3})\s+/);
    if (m) levels.push(m[1].length);
  }
  return levels.join(",");
}

export function localeReadmePath(locale) {
  return join(DOCS_DIR, `README.${locale}.md`);
}

export function discoverLocalePaths() {
  const map = {};
  for (const locale of LOCALES) {
    map[locale] = `docs/README.${locale}.md`;
  }
  return map;
}

export function readRepoFile(relativePath) {
  const abs = join(REPO_ROOT, relativePath);
  if (!existsSync(abs)) {
    throw new Error(`缺少文件: ${relativePath}`);
  }
  return readFileSync(abs, "utf8");
}

export function validateTranslationSet() {
  const sourceRaw = readFileSync(SOURCE_README, "utf8");
  const sourceSig = headingSignature(sourceRaw);
  const errors = [];

  for (const locale of LOCALES) {
    const rel = `docs/README.${locale}.md`;
    const abs = join(REPO_ROOT, rel);
    if (!existsSync(abs)) {
      errors.push(`缺少译文: ${rel}`);
      continue;
    }
    const sig = headingSignature(readFileSync(abs, "utf8"));
    if (sig !== sourceSig) {
      errors.push(
        `${rel} 标题结构与 README.md 不一致 (期望 [${sourceSig}]，实际 [${sig}])`,
      );
    }
  }

  return { sourceSig, errors };
}

export function validateWriteProvenance() {
  const errors = [];
  for (const locale of LOCALES) {
    const rel = `docs/README.${locale}.md`;
    const abs = join(REPO_ROOT, rel);
    if (!existsSync(abs)) {
      continue;
    }
    const text = readFileSync(abs, "utf8");
    if (!WRITE_PROVENANCE_MARKER.test(text)) {
      errors.push(
        `${rel} 缺少写入 provenance 标记；须通过 readme-translations-apply 写入，禁止手改`,
      );
    }
  }
  return errors;
}

/** 在结构校验通过后写入 lock；失败则返回 { ok: false, errors }。 */
export function saveReadmeTranslationsLock() {
  const { sourceSig, errors } = validateTranslationSet();
  if (errors.length) {
    return { ok: false, errors };
  }

  const sourceHash = computeSourceHash();
  const locales = discoverLocalePaths();
  const lock = {
    lockVersion: 1,
    sourcePath: "README.md",
    sourceHash,
    headingSignature: sourceSig,
    locales,
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
  return { ok: true, sourceHash, headingSignature: sourceSig, locales };
}
