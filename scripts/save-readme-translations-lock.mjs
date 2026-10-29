#!/usr/bin/env node
/**
 * 内部：手动刷新 lock（维护者应急用）。/release 须在全部 locale 经 readme-translations-apply 对齐后由写入接口自动更新 lock；禁止手改 docs 译文。
 */
import { saveReadmeTranslationsLock } from "./readme-translations-lib.mjs";

const result = saveReadmeTranslationsLock();
if (!result.ok) {
  for (const err of result.errors) {
    console.error(`readme-translations: ${err}`);
  }
  process.exit(1);
}

console.log("readme-translations: 已写入 docs/README.lock.json");
console.log(`  sourceHash: ${result.sourceHash}`);
console.log(`  headingSignature: ${result.headingSignature}`);
console.log(`  locales: ${Object.keys(result.locales).join(", ")}`);
