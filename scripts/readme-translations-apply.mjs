#!/usr/bin/env node
/**
 * 经写入接口落盘单个 locale 译文（无翻译 API）。/release subagent 产出正文后调用。
 *
 * 用法：
 *   node scripts/readme-translations-apply.mjs --locale zh-CN --body-file /path/to/body.md
 */
import { parseArgs } from "node:util";
import { writeLocaleReadmeFromFile } from "./readme-translations-write.mjs";

const { values } = parseArgs({
  options: {
    locale: { type: "string" },
    "body-file": { type: "string" },
  },
});

if (!values.locale || !values["body-file"]) {
  console.error(
    "用法: node scripts/readme-translations-apply.mjs --locale <locale> --body-file <path>",
  );
  process.exit(1);
}

const result = writeLocaleReadmeFromFile(values.locale, values["body-file"]);
console.log(`已写入 docs/README.${values.locale}.md`);
if (result.lockUpdated) {
  console.log(
    `docs/README.lock.json 已更新 (hash ${result.lock.sourceHash.slice(0, 12)}…)`,
  );
} else if (result.pendingLocales?.length) {
  console.log("lock 尚未更新，仍待对齐：");
  for (const line of result.pendingLocales) {
    console.log(`  - ${line}`);
  }
}
