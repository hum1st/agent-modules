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

**Módulos de capacidade plugáveis para agentes de codificação** — adicione, atualize e expanda skills e regras a partir do Git no Cursor, Claude Code, Codex, GitHub Copilot e outros agentes.

---

## Objetivos

Agent Bay é uma ferramenta open source (em planejamento) que trata de **configuração fragmentada de agentes, controle de versão fraco e perda de setup ao trocar de máquina** para equipes e pessoas que usam vários agentes de codificação.

Tratamos **Agent Skills** (formato aberto [`SKILL.md`](https://agentskills.io)) e **regras de agentes** (ex.: `.cursor/rules`, `AGENTS.md`) como **módulos plugáveis**:

1. **Atualização vertical** — Buscar ou atualizar pacotes de capacidade no Git para os agentes adotarem fluxos, padrões e conhecimento de domínio com rapidez.
2. **Alcance horizontal** — Mapear os mesmos módulos para os caminhos nativos de cada produto (Cursor, Claude Code, Codex, Copilot, …) sem copiar dotfiles manualmente.
3. **Colaboração auditável** — Git é a fonte da verdade; cópias instaladas são artefatos gerenciados com sincronização incremental e limpeza.
4. **Skills vs regras** — **Skills** sob demanda e **Rules** sempre ativas ou por caminho em trilhas separadas, alinhado à tendência do setor em skills mantendo `alwaysApply` / globs onde couber.

Agent Bay **não** é um crawler web e **não substitui** registros públicos de skills (ex.: [skills.sh](https://skills.sh) / `npx skills`). Foca em **seus repositórios Git** como autoridade para **instalar módulos e implantá-los em vários canais de agentes**.

---

## Metáfora: a baia (bay)

Como **baias de expansão** em um robô: cada baia abriga um módulo de capacidade (pacote skill, fragmento de regra ou catálogo). Trocar, adicionar e atualizar módulos deve ser **rápido** e **repetível**.

---

## Status

**Fase inicial** — Este repositório define objetivos, convenções e implementação; APIs e CLI ainda não são estáveis.

Issues e PRs são bem-vindos sobre formatos de módulo e semântica de sincronização.

---

## Links

- [Especificação Agent Skills](https://agentskills.io)
- [Skills de exemplo da Anthropic](https://github.com/anthropics/skills)

---

## Licença

[MIT](../LICENSE)
