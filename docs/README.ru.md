# Agent Bay

<p align="center">
  <strong>Читать на других языках</strong><br>
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

**Agent Bay** — **навыки (skills)** и **правила (rules)** для агентов программирования (Cursor, Claude Code, Codex, GitHub Copilot и другие), получаемые из Git.

---

## Установка

### 1. Установите Git

Установите [Git](https://git-scm.com/downloads). В Windows Git включает **Git Bash**; на шаге 3 можно также использовать **командную строку** с обёрткой `.cmd`.

### 2. Клонируйте репозиторий

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Синхронизируйте skills

Запустите **agent-bay**, чтобы синхронизировать skills **agent-bay\*** в глобальные каталоги skills каждого установленного агента (Cursor, Claude Code, Copilot CLI, Codex). Устаревшие копии `agent-bay*` удаляются; добавления, обновления и удаления в репозитории применяются при следующем запуске.

#### macOS, Linux и Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (командная строка)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Проверьте через агента

В Cursor, Claude Code или другом поддерживаемом агенте выполните **`/agent-bay-version`**. Агент должен сообщить версию вашей установки в `~/.agentBay` (например, значение в `package.json`).

---

## Официальный пример репозитория

Используйте **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** как эталонную структуру Git для небольшого проекта, совместимого с Agent Bay.

```
skills/<skill-name>/   # Agent Skills (SKILL.md, необязательные скрипты)
rules/                 # Правила агента (например, Cursor .mdc)
package.json           # Необязательные зависимости для инструментов skills
```

**Skills** — одна папка на skill в `skills/` по схеме [Agent Skills](https://agentskills.io).

**Rules** — общие указания в `rules/` для агентов, загружающих правила проекта или глобальные правила вместе со skills.

**Dependencies** — если в репозитории есть `package.json`, после клонирования выполните **`npm install`** в корне (или в рамках скрипта синхронизации), чтобы библиотеки из `dependencies` / `devDependencies` установились до использования skills.

Клонируйте demo, установите зависимости при наличии `package.json`, подключите `skills/` к агенту и вызовите demo skill для проверки загрузки end to end.

---

## Ссылки

- [Agent Bay demo (официальный пример репозитория)](https://github.com/hum1st/agent-bay-demo)
- [Спецификация Agent Skills](https://agentskills.io)
- [Примеры skills от Anthropic](https://github.com/anthropics/skills)

---

## Лицензия

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:ru via readme-translations-write -->
