# Agent Modules

<p align="center">
  <strong>Lire dans d'autres langues</strong><br>
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

**Agent Modules** — **skills** et **rules** pour les coding agents (Cursor, Claude Code, Codex, GitHub Copilot, etc.), depuis Git.

---

## Installation

### 1. Installer Git et Node.js

Installez [Git](https://git-scm.com/downloads) et [Node.js](https://nodejs.org/) (LTS, 18+).

### 2. Installer et initialiser

Exécutez **dans l’ordre** dans le Terminal macOS, Linux, Git Bash ou PowerShell. Les lignes commençant par **`#`** sont des commentaires (vous pouvez les coller telles quelles dans un shell type Bash ; dans l’invite de commandes Windows, exécutez uniquement les lignes `npm` et `agent-modules`).

```sh
# Installez la CLI Agent Modules depuis le registre npm.
npm install -g agent-modules

# Configuration unique : créez ~/.agentModules et copiez les skills agent-modules* fournies
# dans le dossier global de skills de chaque agent détecté (Cursor, Claude Code, Copilot CLI, Codex).
agent-modules
```

Ensuite, inutile de relancer **`agent-modules`** pour les mises à jour courantes — utilisez **`/agent-modules-sync`** dans votre agent.

### 3. Ajouter des dépôts de skills

Dans Cursor ou un autre agent pris en charge, exécutez **`/agent-modules-add`** pour vous abonner à un dépôt Git — par exemple **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. Choisissez la portée **global** ou **project** lorsque demandé.

Ne modifiez pas **`~/.agentModules`** à la main ; utilisez **`/agent-modules-add`** et **`/agent-modules-sync`**.

---

## Dépôt d’exemple officiel

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** montre une petite disposition pour un dépôt de dépendances (`skills/`, `rules/` optionnel). Abonnez-vous avec **`/agent-modules-add`**, puis exécutez **`/agent-modules-sync`**.

---

## Liens

- [Agent Modules demo (dépôt d’exemple officiel)](https://github.com/hum1st/agent-modules-demo)
- [Spécification Agent Skills](https://agentskills.io)
- [Exemples de skills Anthropic](https://github.com/anthropics/skills)

---

## Licence

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:fr via readme-translations-write -->

<!-- agent-modules-readme-locale:fr via readme-translations-write -->
