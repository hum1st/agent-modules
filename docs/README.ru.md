# Agent Modules

<p align="center">
  <strong>Читать на других языках</strong><br>
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

**Agent Modules** — **skills** и **rules** для coding agents (Cursor, Claude Code, Codex, GitHub Copilot и др.), из Git.

---

## Установка

### 1. Установите Git и Node.js

Установите [Git](https://git-scm.com/downloads) и [Node.js](https://nodejs.org/) (LTS, 18+).

### 2. Установка и инициализация

Выполните **по порядку** в Terminal macOS, Linux, Git Bash или PowerShell. Строки, начинающиеся с **`#`**, — комментарии (в Bash-подобных shell можно вставлять как есть; в командной строке Windows выполняйте только строки `npm` и `agent-modules`).

```sh
# Установите CLI Agent Modules из npm registry.
npm install -g agent-modules

# Однократная настройка: создайте ~/.agentModules и скопируйте встроенные skills agent-modules*
# в глобальную папку skills каждого обнаруженного agent (Cursor, Claude Code, Copilot CLI, Codex).
agent-modules
```

После этого для повседневных обновлений **`agent-modules`** снова запускать не нужно — используйте **`/agent-modules-sync`** в agent.

### 3. Добавление репозиториев skills

В Cursor или другом поддерживаемом agent выполните **`/agent-modules-add`**, чтобы подписаться на Git-репозиторий — например **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. Выберите область **global** или **project**, когда будет запрошено.

Не редактируйте **`~/.agentModules`** вручную; используйте **`/agent-modules-add`** и **`/agent-modules-sync`**.

---

## Официальный пример репозитория

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** показывает небольшую структуру репозитория-зависимости (`skills/`, опционально `rules/`). Подпишитесь через **`/agent-modules-add`**, затем выполните **`/agent-modules-sync`**.

---

## Ссылки

- [Agent Modules demo (официальный пример репозитория)](https://github.com/hum1st/agent-modules-demo)
- [Спецификация Agent Skills](https://agentskills.io)
- [Примеры skills от Anthropic](https://github.com/anthropics/skills)

---

## Лицензия

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:ru via readme-translations-write -->
