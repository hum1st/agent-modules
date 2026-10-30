# Agent Modules

<p align="center">
  <strong>अन्य भाषाएँ</strong><br>
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

**Agent Modules** — coding agent के लिए **skills** और **rules** (Cursor, Claude Code, Codex, GitHub Copilot आदि), Git से।

---

## स्थापना

### 1. Git और Node.js इंstall करें

[Git](https://git-scm.com/downloads) और [Node.js](https://nodejs.org/) (LTS, 18+) इंstall करें।

### 2. इंstall और प्रारंभिक सेटअप

macOS Terminal, Linux, Git Bash या PowerShell में निम्नलिखित **क्रम में** चलाएँ। **`#`** से शुरू होने वाली पंक्तियाँ टिप्पणियाँ हैं (Bash जैसे shell में as-is पेस्ट कर सकते हैं; Command Prompt में केवल `npm` और `agent-modules` पंक्तियाँ चलाएँ)।

```sh
# npm registry से Agent Modules CLI इंstall करें।
npm install -g agent-modules

# एक बार की सेटअप: ~/.agentModules बनाएँ और bundled agent-modules* skills
# प्रत्येक पाए गए agent के global skills फ़ोल्डर में कॉपी करें (Cursor, Claude Code, Copilot CLI, Codex)।
agent-modules
```

इसके बाद दैनिक अपडेट के लिए **`agent-modules`** दोबारा चलाने की ज़रूरत नहीं—अपने agent में **`/agent-modules-sync`** उपयोग करें।

### 3. Skill रिपॉज़िटरी जोड़ें

Cursor या किसी अन्य समर्थित agent में **`/agent-modules-add`** चलाकर Git रिपॉज़िटरी सब्सक्राइब करें—उदाहरण **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**। संकेत मिलने पर **global** या **project** स्कोप चुनें।

**`~/.agentModules`** हाथ से न बदलें; **`/agent-modules-add`** और **`/agent-modules-sync`** उपयोग करें।

---

## आधिकारिक उदाहरण रिपॉज़िटरी

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** निर्भरता रिपॉज़िटरी के लिए छोटा लेआउट दिखाता है (`skills/`, वैकल्पिक `rules/`)। **`/agent-modules-add`** से सब्सक्राइब करें, फिर **`/agent-modules-sync`** चलाएँ।

---

## लिंक

- [Agent Modules demo (official example repository)](https://github.com/hum1st/agent-modules-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## लाइसेंस

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:hi via readme-translations-write -->

<!-- agent-modules-readme-locale:hi via readme-translations-write -->
