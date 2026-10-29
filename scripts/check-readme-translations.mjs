#!/usr/bin/env node
/**
 * 校验 docs/README.lock.json 是否与当前 README.md 及全部 locale 译文一致。
 */
import { readFileSync, existsSync } from "node:fs";
import {
  LOCK_PATH,
  computeSourceHash,
  validateTranslationSet,
  validateWriteProvenance,
} from "./readme-translations-lib.mjs";

function fail(message) {
  console.error(`readme-translations: ${message}`);
  console.error(
    "请通过翻译接口更新译文: npm run docs:readme-translate（禁止手改 docs/README.*.md）",
  );
  process.exit(1);
}

if (!existsSync(LOCK_PATH)) {
  fail(`缺少锁文件 ${LOCK_PATH.replace(/.*\//, "docs/")}`);
}

let lock;
try {
  lock = JSON.parse(readFileSync(LOCK_PATH, "utf8"));
} catch (e) {
  fail(`锁文件 JSON 无效: ${e.message}`);
}

const currentHash = computeSourceHash();

if (lock.sourceHash !== currentHash) {
  fail(
    `README.md 已变更 (锁内 hash ${lock.sourceHash.slice(0, 12)}… ≠ 当前 ${currentHash.slice(0, 12)}…)`,
  );
}

const { sourceSig, errors } = validateTranslationSet();
if (lock.headingSignature && lock.headingSignature !== sourceSig) {
  fail(
    `README.md 标题结构与锁不一致 (锁 [${lock.headingSignature}]，当前 [${sourceSig}])`,
  );
}

const structureErrors = errors;
const provenanceErrors = validateWriteProvenance();
const allErrors = [...structureErrors, ...provenanceErrors];

if (allErrors.length) {
  for (const err of allErrors) {
    console.error(`readme-translations: ${err}`);
  }
  console.error("请运行: npm run docs:readme-translate");
  process.exit(1);
}

console.log(
  `readme-translations: OK (${lock.locales ? Object.keys(lock.locales).length : "?"} locales, hash ${currentHash.slice(0, 12)}…)`,
);
