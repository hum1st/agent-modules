# Agent Modules

<p align="center">
  <strong>دیگر زبانوں میں پڑھیں</strong><br>
  <a href="https://github.com/hum1st/agent-modules/blob/main/README.md">English</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.zh-CN.md">简体中文</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.hi.md">हिन्दी</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.es.md">Español</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.fr.md">Français</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ar.md">العربية</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.bn.md">বাংলা</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.pt.md">Português</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ru.md">Русский</a> ·
  <a href="https://github.com/hum1st/agent-modules/blob/main/docs/README.ur.md">اردو</a>
</p>

# Agent Modules

**Agent Modules** — coding agents کے لیے **skills** اور **rules** (Cursor، Claude Code، Codex، GitHub Copilot وغیرہ)، Git سے۔

---

## تنصیب

### 1. Git اور Node.js انسٹال کریں

[Git](https://git-scm.com/downloads) اور [Node.js](https://nodejs.org/) (LTS، 18+) انسٹال کریں۔

### 2. انسٹال اور ابتدائی سیٹ اپ

macOS Terminal، Linux، Git Bash یا PowerShell میں درج ذیل **ترتیب سے** چلائیں۔ **`#`** سے شروع ہونے والی لائنیں تبصرے ہیں (Bash جیسے shell میں ویسے ہی پیسٹ کر سکتے ہیں؛ Command Prompt میں صرف `npm` اور `agent-modules` لائنیں چلائیں)۔

```sh
# npm registry سے Agent Modules CLI انسٹال کریں۔
npm install -g agent-modules

# یک بار کی سیٹ اپ: ~/.agentModules بنائیں اور bundled agent-modules* skills
# ہر پائے گئے agent کے global skills فولڈر میں کاپی کریں (Cursor، Claude Code، Copilot CLI، Codex)۔
agent-modules
```

اس کے بعد روزمرہ اپڈیٹس کے لیے **`agent-modules`** دوبارہ چلانے کی ضرورت نہیں — agent میں **`/agent-modules-sync`** استعمال کریں۔

### 3. Skill repositories شامل کریں

Cursor یا کسی اور supported agent میں **`/agent-modules-add`** چلا کر Git repository سبسکرائب کریں — مثال **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**۔ prompt پر **global** یا **project** scope منتخب کریں۔

**`~/.agentModules`** دستی طور پر نہ بدلیں؛ **`/agent-modules-add`** اور **`/agent-modules-sync`** استعمال کریں۔

---

## سرکاری مثالی repository

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** dependency repo کے لیے چھوٹا layout دکھاتا ہے (`skills/`، optional `rules/`)۔ **`/agent-modules-add`** سے سبسکرائب کریں، پھر **`/agent-modules-sync`** چلائیں۔

---

## لنکس

- [Agent Modules demo (سرکاری مثالی repository)](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## لائسنس

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:ur via readme-translations-write -->
