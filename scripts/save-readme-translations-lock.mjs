#!/usr/bin/env node
/**
 * 内部：手动刷新 lock（维护者应急用）。Agent / release 须使用 npm run docs:readme-translate，禁止直接改 docs 译文或单独依赖本脚本。
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
