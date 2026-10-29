/**
 * 译文写入接口：唯一允许落盘 docs/README.<locale>.md 的路径。
 * 写入后若全部 locale 结构对齐，自动更新 docs/README.lock.json。
 */
import { readFileSync, writeFileSync } from "node:fs";
import {
  LOCALES,
  SOURCE_README,
  localeReadmePath,
  assembleLocaleReadme,
  headingSignature,
  saveReadmeTranslationsLock,
  stripLanguageSwitcher,
  normalizeForHash,
} from "./readme-translations-lib.mjs";

function readSourceHeadingSignature() {
  const raw = readFileSync(SOURCE_README, "utf8");
  return headingSignature(raw);
}

/**
 * @param {string} locale
 * @param {string} bodyMarkdown 译文正文（不含 # 标题与语言切换器，与英文 strip 后正文同结构）
 * @returns {{ lockUpdated: boolean, lock?: object, pendingLocales?: string[] }}
 */
export function writeLocaleReadmeBody(locale, bodyMarkdown) {
  if (!LOCALES.includes(locale)) {
    throw new Error(`不支持的 locale: ${locale}`);
  }

  const sourceSig = readSourceHeadingSignature();
  const draft = assembleLocaleReadme(locale, bodyMarkdown);
  const draftSig = headingSignature(draft);
  if (draftSig !== sourceSig) {
    throw new Error(
      `locale ${locale} 标题结构与 README.md 不一致 (期望 [${sourceSig}]，实际 [${draftSig}])`,
    );
  }

  writeFileSync(localeReadmePath(locale), draft, "utf8");

  const lockResult = saveReadmeTranslationsLock();
  if (lockResult.ok) {
    return { lockUpdated: true, lock: lockResult };
  }

  return {
    lockUpdated: false,
    pendingLocales: lockResult.errors,
  };
}

/**
 * @param {string} locale
 * @param {string} markdownPath 含译文的 markdown 文件（仅用 strip 后正文部分）
 */
export function writeLocaleReadmeFromFile(locale, markdownPath) {
  const raw = readFileSync(markdownPath, "utf8");
  const body = normalizeForHash(stripLanguageSwitcher(raw));
  return writeLocaleReadmeBody(locale, body);
}
