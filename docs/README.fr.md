# Agent Bay

<p align="center">
  <strong>Lire dans d'autres langues</strong><br>
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

**Agent Bay** — **skills** et **règles** pour les agents de codage (Cursor, Claude Code, Codex, GitHub Copilot, et autres), issus de Git.

---

## Installation

### 1. Installer Git

Installez [Git](https://git-scm.com/downloads). Sous Windows, Git inclut **Git Bash** ; vous pouvez aussi utiliser l’**Invite de commandes** avec l’enveloppe `.cmd` à l’étape 3.

### 2. Cloner le dépôt

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Synchroniser les skills

Exécutez **agent-bay** pour synchroniser les skills **agent-bay\*** dans le répertoire global de skills de chaque agent installé (Cursor, Claude Code, Copilot CLI, Codex). Les copies obsolètes de `agent-bay*` sont supprimées ; les ajouts, mises à jour et suppressions dans le dépôt sont appliqués à la prochaine exécution.

#### macOS, Linux et Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Invite de commandes)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Tester avec votre agent

Dans Cursor, Claude Code ou un autre agent pris en charge, exécutez **`/agent-bay-version`**. L’agent doit indiquer la version de votre installation `~/.agentBay` (par exemple, la valeur dans `package.json`).

---

## Dépôt d’exemple officiel

Utilisez **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** comme disposition Git de référence pour un petit projet compatible Agent Bay.

```
skills/<skill-name>/   # Agent Skills (SKILL.md, scripts optionnels)
rules/                 # Règles pour agents (p. ex. Cursor .mdc)
package.json           # Dépendances optionnelles pour les outils des skills
```

**Skills** — un dossier par skill sous `skills/`, conformément à la disposition [Agent Skills](https://agentskills.io).

**Règles** — directives partagées sous `rules/` pour les agents qui chargent des règles de projet ou globales en complément des skills.

**Dépendances** — lorsqu’un dépôt inclut un `package.json`, exécutez **`npm install`** à la racine du dépôt après le clone (ou dans votre script de synchronisation) afin que les bibliothèques listées dans `dependencies` / `devDependencies` soient installées automatiquement avant que les skills ne les utilisent.

Clonez la démo, installez les dépendances si `package.json` est présent, branchez `skills/` dans votre agent et invoquez le skill de démo pour vérifier le chargement de bout en bout.

---

## Liens

- [Agent Bay demo (dépôt d’exemple officiel)](https://github.com/hum1st/agent-bay-demo)
- [Spécification Agent Skills](https://agentskills.io)
- [Exemples de skills Anthropic](https://github.com/anthropics/skills)

---

## Licence

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:fr via readme-translations-write -->
