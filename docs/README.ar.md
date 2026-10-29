# Agent Bay

<p align="center">
  <strong>اقرأ بلغات أخرى</strong><br>
  <a href="../README.md">English</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.hi.md">हिन्दी</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.ar.md">العربية</a> ·
  <a href="README.bn.md">বাংলা</a> ·
  <a href="README.pt.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.ur.md">اردو</a>
</p>

# Agent Bay

<p dir="rtl">**Agent Bay** — **skills** و**rules** لوكلاء البرمجة (Cursor وClaude Code وCodex وGitHub Copilot وغيرها)، مُستقاة من Git.</p>

---

## Installation

### 1. Install Git

<p dir="rtl">ثبّت [Git](https://git-scm.com/downloads). على Windows، يتضمّن Git **Git Bash**؛ يمكنك أيضًا استخدام **موجه الأوامر** (Command Prompt) مع ملف `.cmd` في الخطوة 3.</p>

### 2. Clone the repository

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Sync skills

<p dir="rtl">شغّل **agent-bay** لمزامنة skills التي تبدأ بـ **agent-bay\*** إلى دليل skills العام لكل وكيل مثبّت (Cursor وClaude Code وCopilot CLI وCodex). تُزال نسخ `agent-bay*` القديمة؛ وتُطبَّق الإضافات والتحديثات والحذف في المستودع في التشغيل التالي.</p>

#### macOS, Linux, and Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Test with your agent

<p dir="rtl">في Cursor أو Claude Code أو وكيل مدعوم آخر، نفّذ **`/agent-bay-version`**. يجب أن يُبلغ الوكيل عن الإصدار من تثبيت `~/.agentBay` لديك (مثلًا القيمة في `package.json`).</p>

---

## Official example repository

<p dir="rtl">استخدم **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** كمرجع لتخطيط Git لمشروع صغير متوافق مع Agent Bay.</p>

```
skills/<skill-name>/   # Agent Skills (SKILL.md, optional scripts)
rules/                 # Agent rules (e.g. Cursor .mdc)
package.json           # Optional dependencies for skill tooling
```

<p dir="rtl">**Skills** — مجلد واحد لكل skill تحت `skills/`، وفق تخطيط [Agent Skills](https://agentskills.io).</p>

<p dir="rtl">**Rules** — إرشادات مشتركة تحت `rules/` للوكلاء الذين يحمّلون قواعد المشروع أو العامة إلى جانب skills.</p>

<p dir="rtl">**Dependencies** — عندما يتضمّن المستودع `package.json`، نفّذ **`npm install`** في جذر المستودع بعد الاستنساخ (أو كجزء من سكript المزامنة) حتى تُثبَّت تلقائيًا المكتبات المدرجة في `dependencies` / `devDependencies` قبل أن تستخدمها skills.</p>

<p dir="rtl">استنسخ المثال، ثبّت الاعتماديات إن وُجد `package.json`، واربط `skills/` بوكيلك، واستدعِ skill المثال للتحقق من التحميل من البداية إلى النهاية.</p>

---

## Links

- [Agent Bay demo (official example repository)](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:ar via readme-translations-write -->
