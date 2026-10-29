# Agent Bay

<p align="center">
  <strong>अन्य भाषाएँ</strong><br>
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

**Agent Bay** — Git से स्रोतित कोडिंग एजेंट (Cursor, Claude Code, Codex, GitHub Copilot और अन्य) के लिए **skills** और **rules**।

---

## Installation

### 1. Git इंstall करें

[Git](https://git-scm.com/downloads) इंstall करें। Windows पर Git में **Git Bash** शामिल होता है; आप चरण 3 में `.cmd` wrapper के साथ **Command Prompt** भी उपयोग कर सकते हैं।

### 2. रिपॉज़िटरी क्लोन करें

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Skills सिंक करें

प्रत्येक इंstall किए गए एजेंट के global skills directory (Cursor, Claude Code, Copilot CLI, Codex) में **agent-bay\*** skills सिंक करने के लिए **agent-bay** चलाएँ। पुराने `agent-bay*` कॉपी हटा दी जाती हैं; repo में add, update और delete अगली रन पर लागू होते हैं।

#### macOS, Linux, और Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. अपने एजेंट से परीक्षण करें

Cursor, Claude Code, या किसी अन्य समर्थित एजेंट में **`/agent-bay-version`** चलाएँ। एजेंट को आपके `~/.agentBay` इंstall से version रिपोर्ट करना चाहिए (उदाहरण के लिए, `package.json` में मान)।

---

## Official example repository

छोटे Agent Bay–संगत प्रोजेक्ट के लिए Git layout के संदर्भ के रूप में **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** उपयोग करें।

```
skills/<skill-name>/   # Agent Skills (SKILL.md, optional scripts)
rules/                 # Agent rules (e.g. Cursor .mdc)
package.json           # Optional dependencies for skill tooling
```

**Skills** — [Agent Skills](https://agentskills.io) layout के अनुसार `skills/` के अंतर्गत प्रति skill एक folder।

**Rules** — ऐसे एजेंटों के लिए `rules/` के अंतर्गत साझा मार्गदर्शन जो skills के साथ project या global rules लोड करते हैं।

**Dependencies** — जब repo में `package.json` हो, तो clone के बाद (या अपने sync script के हिस्से के रूप में) repo root पर **`npm install`** चलाएँ ताकि `dependencies` / `devDependencies` में सूचीबद्ध libraries skills के उपयोग से पहले स्वचालित रूप से इंstall हो जाएँ।

Demo क्लोन करें, यदि `package.json` मौजूद हो तो dependencies इंstall करें, `skills/` को अपने एजेंट से जोड़ें, और end-to-end loading सत्यापित करने के लिए demo skill invoke करें।

---

## Links

- [Agent Bay demo (official example repository)](https://github.com/hum1st/agent-bay-demo)
- [Agent Skills specification](https://agentskills.io)
- [Anthropic example skills](https://github.com/anthropics/skills)

---

## License

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:hi via readme-translations-write -->
