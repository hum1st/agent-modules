#!/usr/bin/env node
/**
 * 可选：外部翻译 API CLI（非 /release 主路径）。落盘请优先 readme-translations-apply.mjs。
 *
 * 用法：
 *   node scripts/translate-readme.mjs [--locale zh-CN] [--body-file path] [--from-existing] [--dry-run]
 *
 * - 默认：调用 API 翻译全部 LOCALES（需 README_TRANSLATE_API_KEY 或 OPENAI_API_KEY）
 * - --body-file：跳过 API，经写入接口落盘（与 readme-translations-apply 等价）
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
