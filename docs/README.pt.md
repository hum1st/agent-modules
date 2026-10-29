# Agent Bay

<p align="center">
  <strong>Ler em outros idiomas</strong><br>
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

**Agent Bay** — **skills** e **rules** para agentes de codificação (Cursor, Claude Code, Codex, GitHub Copilot e outros), obtidos a partir do Git.

---

## Instalação

### 1. Instalar o Git

Instale o [Git](https://git-scm.com/downloads). No Windows, o Git inclui **Git Bash**; também pode usar o **Command Prompt** com o wrapper `.cmd` no passo 3.

### 2. Clonar o repositório

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Sincronizar skills

Execute **agent-bay** para sincronizar skills **agent-bay\*** no diretório global de skills de cada agente instalado (Cursor, Claude Code, Copilot CLI, Codex). Cópias obsoletas de `agent-bay*` são removidas; adições, atualizações e exclusões no repositório são aplicadas na próxima execução.

#### macOS, Linux e Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Command Prompt)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Testar com o seu agente

No Cursor, Claude Code ou noutro agente suportado, execute **`/agent-bay-version`**. O agente deve reportar a versão da sua instalação em `~/.agentBay` (por exemplo, o valor em `package.json`).

---

## Repositório de exemplo oficial

Use **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** como referência de layout Git para um projeto pequeno compatível com Agent Bay.

```
skills/<skill-name>/   # Agent Skills (SKILL.md, scripts opcionais)
rules/                 # Regras do agente (ex.: Cursor .mdc)
package.json           # Dependências opcionais para ferramentas das skills
```

**Skills** — uma pasta por skill em `skills/`, seguindo o layout [Agent Skills](https://agentskills.io).

**Rules** — orientação partilhada em `rules/` para agentes que carregam regras de projeto ou globais juntamente com skills.

**Dependências** — quando um repositório inclui `package.json`, execute **`npm install`** na raiz do repositório após o clone (ou como parte do seu script de sincronização) para que as bibliotecas listadas em `dependencies` / `devDependencies` sejam instaladas automaticamente antes das skills as utilizarem.

Clone a demo, instale as dependências se existir `package.json`, ligue `skills/` ao seu agente e invoque a skill de demonstração para verificar o carregamento de ponta a ponta.

---

## Ligações

- [Agent Bay demo (repositório de exemplo oficial)](https://github.com/hum1st/agent-bay-demo)
- [Especificação Agent Skills](https://agentskills.io)
- [Skills de exemplo da Anthropic](https://github.com/anthropics/skills)

---

## Licença

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:pt via readme-translations-write -->
