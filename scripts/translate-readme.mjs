#!/usr/bin/env node
/**
 * 翻译接口 CLI：调用翻译 API，并通过 readme-translations-write 落盘；全部 locale 就绪后自动更新 lock。
 *
 * 用法：
 *   npm run docs:readme-translate -- [--locale zh-CN] [--body-file path] [--from-existing] [--dry-run]
 *
 * - 默认：翻译 LOCALES 全部语言（需 README_TRANSLATE_API_KEY 或 OPENAI_API_KEY）
 * - --locale：仅处理一种语言
 * - --body-file：跳过 API，将译文正文经写入接口落盘
 * - --from-existing：不调用 API，从当前 docs/README.<locale>.md 提取正文后重新经写入接口落盘（补 provenance）
 * - --dry-run：仅打印将处理的 locale
 */
import { parseArgs } from "node:util";
import { readFileSync } from "node:fs";
import {
  LOCALES,
  extractTranslatableBodyFromSource,
  localeReadmePath,
  stripLanguageSwitcher,
  normalizeForHash,
} from "./readme-translations-lib.mjs";
import { writeLocaleReadmeBody } from "./readme-translations-write.mjs";
import { translateReadmeBody } from "./readme-translate-provider.mjs";

const { values } = parseArgs({
  options: {
    locale: { type: "string" },
    "body-file": { type: "string" },
    "from-existing": { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
  allowPositionals: true,
});

const locales = values.locale ? [values.locale] : LOCALES;

for (const loc of locales) {
  if (!LOCALES.includes(loc)) {
    console.error(`未知 locale: ${loc}`);
    process.exit(1);
  }
}

if (values["body-file"] && (values["from-existing"] || locales.length > 1)) {
  console.error("--body-file 仅能与单一 --locale 联用");
  process.exit(1);
}

if (values["dry-run"]) {
  console.log(`将处理: ${locales.join(", ")}`);
  process.exit(0);
}

const sourceBody = extractTranslatableBodyFromSource();
let lockUpdated = false;

for (const locale of locales) {
  let body;
  if (values["body-file"]) {
    body = readFileSync(values["body-file"], "utf8").trim();
  } else if (values["from-existing"]) {
    const raw = readFileSync(localeReadmePath(locale), "utf8");
    body = normalizeForHash(stripLanguageSwitcher(raw));
  } else {
    console.log(`翻译 ${locale} …`);
    body = await translateReadmeBody(sourceBody, locale);
  }

  const result = writeLocaleReadmeBody(locale, body);
  console.log(`已写入 docs/README.${locale}.md`);
  if (result.lockUpdated) {
    lockUpdated = true;
    console.log(
      `docs/README.lock.json 已更新 (hash ${result.lock.sourceHash.slice(0, 12)}…)`,
    );
  } else if (result.pendingLocales?.length) {
    console.log("lock 尚未更新，仍待对齐：");
    for (const line of result.pendingLocales) {
      console.log(`  - ${line}`);
    }
  }
}

if (!lockUpdated) {
  console.log(
    "提示：全部 locale 经写入接口对齐后，lock 会自动更新；可继续对其余 locale 运行本命令。",
  );
}
