/**
 * 调用 OpenAI 兼容 Chat Completions 接口翻译 README 正文。
 *
 * 环境变量：
 * - README_TRANSLATE_API_KEY 或 OPENAI_API_KEY（必填，除非 --body-file）
 * - README_TRANSLATE_API_URL（默认 https://api.openai.com/v1/chat/completions）
 * - README_TRANSLATE_MODEL（默认 gpt-4o-mini）
 */

import { LOCALE_META } from "./readme-translations-lib.mjs";

const DEFAULT_API_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";

function apiConfig() {
  const apiKey =
    process.env.README_TRANSLATE_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "缺少 README_TRANSLATE_API_KEY 或 OPENAI_API_KEY，无法调用翻译接口",
    );
  }
  return {
    apiKey,
    apiUrl: process.env.README_TRANSLATE_API_URL || DEFAULT_API_URL,
    model: process.env.README_TRANSLATE_MODEL || DEFAULT_MODEL,
  };
}

/**
 * @param {string} sourceBody 英文 markdown 正文（已去掉语言切换器）
 * @param {string} locale
 */
export async function translateReadmeBody(sourceBody, locale) {
  const meta = LOCALE_META[locale];
  if (!meta) {
    throw new Error(`未知 locale: ${locale}`);
  }

  const { apiKey, apiUrl, model } = apiConfig();

  const system = `You are a technical translator. Translate GitHub README markdown from English to ${meta.label} (${locale}).
Rules:
- Preserve all markdown structure: same number and depth of headings (## / ###), lists, bold, links, code spans.
- Do NOT translate proper nouns: Agent Bay, Agent Skills, SKILL.md, Cursor, Claude Code, Codex, GitHub Copilot, MIT, SemVer, husky, npm.
- Rewrite relative links for files under docs/: use ../README.md for English root README, ../package.json, ../LICENSE, and README.<locale>.md for sibling locale files (no docs/ prefix).
- Output ONLY the translated markdown body: no # Agent Bay title, no language switcher HTML, no commentary.`;

  const user = `Translate this README body:\n\n${sourceBody}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`翻译 API 失败 (${response.status}): ${text.slice(0, 500)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("翻译 API 返回格式无效");
  }

  return content.replace(/^```markdown?\s*\n?/i, "").replace(/\n?```\s*$/, "").trim();
}
