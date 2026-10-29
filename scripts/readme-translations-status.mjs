#!/usr/bin/env node
/**
 * 对比 README.md 与 docs/README.lock.json；供 /release skill 决定是否启动译文 subagent。
 *
 * 用法：
 *   node scripts/readme-translations-status.mjs
 *   node scripts/readme-translations-status.mjs --print-source-body
 */
import { readFileSync, existsSync } from "node:fs";
import {
  LOCK_PATH,
  LOCALES,
  computeSourceHash,
  validateTranslationSet,
  extractTranslatableBodyFromSource,
} from "./readme-translations-lib.mjs";

const printBody = process.argv.includes("--print-source-body");

if (printBody) {
  process.stdout.write(`${extractTranslatableBodyFromSource()}\n`);
  process.exit(0);
}

if (!existsSync(LOCK_PATH)) {
  console.log("readme-translations-status: 缺少 docs/README.lock.json，需更新全部 locale");
  console.log(`locales: ${LOCALES.join(", ")}`);
  process.exit(1);
}

let lock;
try {
  lock = JSON.parse(readFileSync(LOCK_PATH, "utf8"));
} catch (e) {
  console.error(`readme-translations-status: 锁文件无效: ${e.message}`);
  process.exit(1);
}

const currentHash = computeSourceHash();
const hashOk = lock.sourceHash === currentHash;
const { sourceSig, errors: structureErrors } = validateTranslationSet();
const headingOk =
  !lock.headingSignature || lock.headingSignature === sourceSig;

if (hashOk && headingOk && structureErrors.length === 0) {
  console.log(
    `readme-translations-status: OK (hash ${currentHash.slice(0, 12)}…, ${LOCALES.length} locales)`,
  );
  process.exit(0);
}

console.log("readme-translations-status: 需要同步译文");
if (!hashOk) {
  console.log(
    `  sourceHash: lock ${lock.sourceHash.slice(0, 12)}… ≠ 当前 ${currentHash.slice(0, 12)}…`,
  );
}
if (!headingOk) {
  console.log(
    `  headingSignature: lock [${lock.headingSignature}] ≠ 当前 [${sourceSig}]`,
  );
}
if (structureErrors.length) {
  console.log("  结构问题:");
  for (const err of structureErrors) {
    console.log(`    - ${err}`);
  }
}
console.log(`  locales (${LOCALES.length}): ${LOCALES.join(", ")}`);
console.log(
  "  下一步: /release skill — 并行 subagent 翻译后 node scripts/readme-translations-apply.mjs",
);
process.exit(1);
