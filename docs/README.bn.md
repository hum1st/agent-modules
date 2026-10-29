# Agent Bay

<p align="center">
  <strong>অন্যান্য ভাষায় পড়ুন</strong><br>
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

**Agent Bay** — Git থেকে আনা কোডিং এজেন্ট (Cursor, Claude Code, Codex, GitHub Copilot এবং অন্যদের) জন্য **skills** ও **rules**।

---

## Installation

### 1. Git ইনস্টল করুন

[Git](https://git-scm.com/downloads) ইনস্টল করুন। Windows-এ Git-এর সাথে **Git Bash** অন্তর্ভুক্ত; ৩ নম্বর ধাপের `.cmd` wrapper দিয়ে **Command Prompt**-ও ব্যবহার করতে পারেন।

### 2. রিপোজিটরি ক্লোন করুন

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Skills সিঙ্ক করুন

প্রতিটি ইনস্টল করা এজেন্টের global skills ডিরেক্টরিতে (Cursor, Claude Code, Copilot CLI, Codex) **agent-bay\*** skills সিঙ্ক করতে **agent-bay** চালান। পুরনো `agent-bay*` কপি সরিয়ে দেওয়া হয়; রিপোতে যোগ, আপডেট ও মুছে ফেলার পরিবর্তনগুলো পরের রানে প্রয়োগ হয়।

#### macOS, Linux, and Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. আপনার এজেন্ট দিয়ে পরীক্ষা করুন

Cursor, Claude Code বা অন্য কোনো সমর্থিত এজেন্টে **`/agent-bay-version`** চালান। এজেন্টটি আপনার `~/.agentBay` ইনস্টলের সংস্করণ জানাবে (যেমন `package.json`-এর মান)।

---

## Official example repository

ছোট Agent Bay–সামঞ্জস্যপূর্ণ প্রজেক্টের রেফারেন্স Git লেআউট হিসেবে **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** ব্যবহার করুন।

```
skills/<skill-name>/   # Agent Skills (SKILL.md, optional scripts)
rules/                 # Agent rules (e.g. Cursor .mdc)
package.json           # Optional dependencies for skill tooling
```

**Skills** — `skills/`-এর নিচে skill প্রতি একটি ফোল্ডার, [Agent Skills](https://agentskills.io) লেআউট অনুসরণ করে।

**Rules** — skills-এর পাশাপাশি প্রজেক্ট বা global rules লোড করা এজেন্টদের জন্য `rules/`-এর অধীনে ভাগ করা নির্দেশনা।

**Dependencies** — রিপোতে `package.json` থাকলে, ক্লোনের পর (বা সিঙ্ক স্ক্রিপ্টের অংশ হিসেবে) রিপোর root-এ **`npm install`** চালান, যাতে `dependencies` / `devDependencies`-এ তালিকাভুক্ত লাইব্রেরিগুলো skills ব্যবহারের আগে স্বয়ংক্রিয়ভাবে ইনস্টল হয়।

ডemo ক্লোন করুন, `package.json` থাকলে dependencies ইনস্টল করুন, আপনার এজেন্টে `skills/` সংযুক্ত করুন এবং end-to-end লোডিং যাচাই করতে demo skill invoke করুন।

---

## Links

- [Agent Bay demo (official example repository)](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:bn via readme-translations-write -->
