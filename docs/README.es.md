# Agent Modules

<p align="center">
  <strong>Leer en otros idiomas</strong><br>
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

**Agent Modules** — **skills** y **rules** para coding agents (Cursor, Claude Code, Codex, GitHub Copilot y otros), desde Git.

---

## Instalación

### 1. Instalar Git y Node.js

Instala [Git](https://git-scm.com/downloads) y [Node.js](https://nodejs.org/) (LTS, 18+).

### 2. Instalar e inicializar

Ejecuta lo siguiente **en orden** en Terminal de macOS, Linux, Git Bash o PowerShell. Las líneas que empiezan por **`#`** son comentarios (puedes pegarlas tal cual en shells tipo Bash; en Símbolo del sistema ejecuta solo las líneas `npm` y `agent-modules`).

```sh
# Instala la CLI de Agent Modules desde el registro npm.
npm install -g agent-modules

# Configuración única: crea ~/.agentModules y copia las skills agent-modules* incluidas
# a la carpeta global de skills de cada agent detectado (Cursor, Claude Code, Copilot CLI, Codex).
agent-modules
```

Después no necesitas volver a ejecutar **`agent-modules`** para actualizaciones diarias: usa **`/agent-modules-sync`** en tu agent.

### 3. Añadir repositorios de skills

En Cursor u otro agent compatible, ejecuta **`/agent-modules-add`** para suscribirte a un repositorio Git, por ejemplo **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. Elige alcance **global** o **project** cuando se te pida.

No edites **`~/.agentModules`** a mano; usa **`/agent-modules-add`** y **`/agent-modules-sync`**.

---

## Repositorio de ejemplo oficial

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** muestra un diseño pequeño para un repo de dependencias (`skills/`, `rules/` opcional). Suscríbete con **`/agent-modules-add`** y luego ejecuta **`/agent-modules-sync`**.

---

## Enlaces

- [Agent Modules demo (repositorio de ejemplo oficial)](https://github.com/hum1st/agent-modules-demo)
- [Especificación Agent Skills](https://agentskills.io)
- [Skills de ejemplo de Anthropic](https://github.com/anthropics/skills)

---

## Licencia

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:es via readme-translations-write -->
