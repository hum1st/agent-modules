# Agent Modules

<p align="center">
  <strong>অন্যান্য ভাষায় পড়ুন</strong><br>
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

# Agent Modules

**Agent Modules** — coding agent-এর জন্য **skills** ও **rules** (Cursor, Claude Code, Codex, GitHub Copilot ইত্যাদি), Git থেকে।

---

## ইনস্টলেশন

### 1. Git ও Node.js ইনস্টল করুন

[Git](https://git-scm.com/downloads) ও [Node.js](https://nodejs.org/) (LTS, 18+) ইনস্টল করুন।

### 2. ইনস্টল ও প্রাথমিক সেটআপ

macOS Terminal, Linux, Git Bash বা PowerShell-এ নিচের কমান্ডগুলো **ক্রম অনুযায়ী** চালান। **`#`** দিয়ে শুরু হওয়া লাইনগুলো মন্তব্য (Bash-সদৃশ shell-এ যেমন আছে তেমন পেস্ট করতে পারেন; Command Prompt-এ শুধু `npm` ও `agent-modules` লাইন চালান)।

```sh
# npm registry থেকে Agent Modules CLI ইনস্টল করুন।
npm install -g agent-modules

# একবারের সেটআপ: ~/.agentModules তৈরি করুন এবং বান্ডেল করা agent-modules* skills
# প্রতিটি শনাক্ত করা agent-এর global skills ফোল্ডারে কপি করুন (Cursor, Claude Code, Copilot CLI, Codex)।
agent-modules
```

এরপর দৈনন্দিন আপডেটের জন্য **`agent-modules`** আবার চালাতে হবে না — agent-এ **`/agent-modules-sync`** ব্যবহার করুন।

### 3. Skill রিপোজিটরি যোগ করুন

Cursor বা অন্য সমর্থিত agent-এ **`/agent-modules-add`** চালিয়ে Git রিপোজিটরি সাবস্ক্রাইব করুন — উদাহরণ **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**। অনুরোধ করলে **global** বা **project** scope বেছে নিন।

**`~/.agentModules`** হাতে সম্পাদনা করবেন না; **`/agent-modules-add`** ও **`/agent-modules-sync`** ব্যবহার করুন।

---

## সরকারি উদাহরণ রিপোজিটরি

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** একটি dependency রিপোর ছোট লেআউট দেখায় (`skills/`, optional `rules/`)। **`/agent-modules-add`** দিয়ে সাবস্ক্রাইব করুন, তারপর **`/agent-modules-sync`** চালান।

---

## লিংক

- [Agent Modules demo (official example repository)](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## লাইসেন্স

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:bn via readme-translations-write -->

<!-- agent-modules-readme-locale:bn via readme-translations-write -->
