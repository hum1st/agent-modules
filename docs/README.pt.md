# Agent Modules

<p align="center">
  <strong>Ler em outros idiomas</strong><br>
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

**Agent Modules** — **skills** e **rules** para coding agents (Cursor, Claude Code, Codex, GitHub Copilot e outros), a partir do Git.

---

## Instalação

### 1. Instalar Git e Node.js

Instale [Git](https://git-scm.com/downloads) e [Node.js](https://nodejs.org/) (LTS, 18+).

### 2. Instalar e inicializar

Execute **em ordem** no Terminal do macOS, Linux, Git Bash ou PowerShell. Linhas que começam com **`#`** são comentários (pode colar como estão em shells tipo Bash; no Prompt de Comando execute só as linhas `npm` e `agent-modules`).

```sh
# Instale a CLI Agent Modules a partir do registro npm.
npm install -g agent-modules

# Configuração única: crie ~/.agentModules e copie as skills agent-modules* incluídas
# para a pasta global de skills de cada agent detectado (Cursor, Claude Code, Copilot CLI, Codex).
agent-modules
```

Depois disso, não precisa executar **`agent-modules`** de novo para atualizações diárias — use **`/agent-modules-sync`** no seu agent.

### 3. Adicionar repositórios de skills

No Cursor ou outro agent compatível, execute **`/agent-modules-add`** para assinar um repositório Git — por exemplo **[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)**. Escolha escopo **global** ou **project** quando solicitado.

Não edite **`~/.agentModules`** manualmente; use **`/agent-modules-add`** e **`/agent-modules-sync`**.

---

## Repositório de exemplo oficial

**[agent-modules-demo](https://github.com/hum1st/agent-modules-demo)** mostra um layout pequeno para um repositório de dependência (`skills/`, `rules/` opcional). Assine com **`/agent-modules-add`**, depois execute **`/agent-modules-sync`**.

---

## Links

- [Agent Modules demo (repositório de exemplo oficial)](https://github.com/hum1st/agent-modules-demo)
- [Especificação Agent Skills](https://agentskills.io)
- [Skills de exemplo da Anthropic](https://github.com/anthropics/skills)

---

## Licença

[MIT](https://github.com/hum1st/agent-modules/blob/main/LICENSE)

<!-- agent-modules-readme-locale:pt via readme-translations-write -->
