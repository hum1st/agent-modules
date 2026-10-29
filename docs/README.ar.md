# Agent Modules

<p align="center">
  <strong>اقرأ بلغات أخرى</strong><br>
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

**Agent Modules** — **skills** و **rules** لوكلاء البرمجة (Cursor وClaude Code وCodex وGitHub Copilot وغيرها)، من Git.

---

## التثبيت

### 1. تثبيت Git وNode.js

ثبّت [Git](https://git-scm.com/downloads) و[Node.js](https://nodejs.org/) (LTS، 18+).

### 2. التثبيت والتهيئة

نفّذ التالي **بالترتيب** في Terminal على macOS أو Linux أو Git Bash أو PowerShell. الأسطر التي تبدأ بـ **`#`** تعليقات (يمكن لصقها كما هي في shells شبيهة بـ Bash؛ في موجه الأوامر نفّذ أسطر `npm` و`agent-modules` فقط).

```sh
# ثبّت CLI الخاص بـ Agent Modules من سجل npm.
npm install -g agent-modules

# إعداد لمرة واحدة: أنشئ ~/.agentModules وانسخ skills المضمّنة agent-modules*
# إلى مجلد skills العام لكل agent مُكتشَف (Cursor، Claude Code، Copilot CLI، Codex).
agent-modules
```

بعد ذلك لا حاجة لتشغيل **`agent-modules`** مجددًا للتحديثات اليومية — استخدم **`/agent-modules-sync`** في الـ agent.

### 3. إضافة مستودعات skills

في Cursor أو agent مدعوم آخر، نفّذ **`/agent-modules-add`** للاشتراك في مستودع Git — مثل **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. اختر نطاق **global** أو **project** عند المطالبة.

لا تعدّل **`~/.agentModules`** يدويًا؛ استخدم **`/agent-modules-add`** و**`/agent-modules-sync`**.

---

## مستودع المثال الرسمي

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** يعرض تخطيطًا صغيرًا لمستودع تبعية (`skills/`، و`rules/` اختياري). اشترك عبر **`/agent-modules-add`** ثم نفّذ **`/agent-modules-sync`**.

---

## روابط

- [Agent Modules demo (official example repository)](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## الترخيص

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:ar via readme-translations-write -->
