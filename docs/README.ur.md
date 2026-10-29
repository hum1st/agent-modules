# Agent Bay

<p align="center">
  <strong>دیگر زبانوں میں پڑھیں</strong><br>
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

**Agent Bay** — کوڈنگ ایجنٹس (Cursor، Claude Code، Codex، GitHub Copilot، وغیرہ) کے لیے **skills** اور **rules**، Git سے حاصل کیے گئے۔

---

## تنصیب (Installation)

### 1. Git انسٹال کریں

[Git](https://git-scm.com/downloads) انسٹال کریں۔ Windows پر Git میں **Git Bash** شامل ہوتا ہے؛ آپ مرحلہ 3 میں `.cmd` wrapper کے ساتھ **Command Prompt** بھی استعمال کر سکتے ہیں۔

### 2. ریپوزٹری کلون کریں

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. skills سنک کریں

**agent-bay** چلائیں تاکہ **agent-bay\*** skills ہر انسٹال شدہ ایجنٹ کی global skills ڈائریکٹری میں سنک ہوں (Cursor، Claude Code، Copilot CLI، Codex)۔ پرانی `agent-bay*` کاپیاں ہٹا دی جاتی ہیں؛ ریپو میں شامل، اپڈیٹ اور حذف اگلے رن پر لاگو ہوتے ہیں۔

#### macOS، Linux، اور Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. اپنے ایجنٹ سے ٹیسٹ کریں

Cursor، Claude Code، یا کسی اور معاون ایجنٹ میں **`/agent-bay-version`** چلائیں۔ ایجنٹ کو آپ کی `~/.agentBay` تنصیب سے ورژن رپورٹ کرنا چاہیے (مثلاً `package.json` میں موجود value)۔

---

## سرکاری مثالی ریپوزٹری

چھوٹے Agent Bay–موافق پروجیکٹ کے لیے Git layout کا حوالہ **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** استعمال کریں۔

```
skills/<skill-name>/   # Agent Skills (SKILL.md، اختیاری scripts)
rules/                 # Agent rules (مثلاً Cursor .mdc)
package.json           # skill tooling کے لیے اختیاری dependencies
```

**Skills** — `skills/` کے تحت ہر skill کے لیے ایک فولڈر، [Agent Skills](https://agentskills.io) layout کے مطابق۔

**Rules** — `rules/` کے تحت مشترکہ رہنمائی، ان ایجنٹس کے لیے جو skills کے ساتھ project یا global rules لوڈ کرتے ہیں۔

**Dependencies** — جب ریپو میں `package.json` ہو، clone کے بعد (یا اپنی sync script کا حصہ بن کر) ریپo root پر **`npm install`** چلائیں تاکہ `dependencies` / `devDependencies` میں درج libraries skills کے استعمال سے پہلے خودکار طور پر انسٹال ہوں۔

ڈیمو کلون کریں، اگر `package.json` موجود ہو تو dependencies انسٹال کریں، `skills/` کو اپنے ایجنٹ سے جوڑیں، اور end to end لوڈنگ کی تصدیق کے لیے ڈیمو skill invoke کریں۔

---

## لنکس

- [Agent Bay demo (سرکاری مثالی ریپوزٹری)](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## لائسنس

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:ur via readme-translations-write -->
