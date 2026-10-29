# Agent Bay

<p align="center">
  <strong>Leer en otros idiomas</strong><br>
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

**Módulos de capacidad conectables para agentes de codificación** — añade, actualiza y amplía skills y reglas desde Git en Cursor, Claude Code, Codex, GitHub Copilot y otros agentes.

---

## Objetivos

Agent Bay es una herramienta de código abierto (en planificación) que aborda **configuración dispersa de agentes, poco control de versiones y pérdida del entorno al cambiar de máquina** para equipos y personas que usan varios agentes de codificación.

Tratamos **Agent Skills** (formato abierto [`SKILL.md`](https://agentskills.io)) y **reglas de agentes** (p. ej. `.cursor/rules`, `AGENTS.md`) como **módulos conectables**:

1. **Actualización vertical** — Obtener o actualizar paquetes de capacidades desde Git para que los agentes adopten flujos, estándares y conocimiento de dominio con rapidez.
2. **Alcance horizontal** — Mapear los mismos módulos a las rutas nativas de cada producto (Cursor, Claude Code, Codex, Copilot, …) sin copiar dotfiles a mano.
3. **Colaboración auditable** — Git es la fuente de verdad; las copias instaladas son artefactos gestionados con sincronización incremental y limpieza.
4. **Skills frente a reglas** — **Skills** bajo demanda y **Rules** siempre activas o por ruta en pistas separadas, alineado con la tendencia del sector hacia skills manteniendo `alwaysApply` / globs donde corresponda.

Agent Bay **no** es un rastreador web ni **sustituye** registros públicos de skills (p. ej. [skills.sh](https://skills.sh) / `npx skills`). Se centra en **tus repos Git** como autoridad para **instalar módulos y desplegarlos en varios canales de agentes**.

---

## Metáfora: la bahía (bay)

Como **bahías de expansión** en un robot: cada bahía aloja un módulo de capacidad (paquete skill, fragmento de regla o catálogo). Cambiar, añadir y actualizar módulos debe ser **rápido** y **repetible**.

---

## Estado

**Fase inicial** — Este repositorio define objetivos, convenciones e implementación; las API y la CLI aún no son estables.

Issues y PR bienvenidos sobre formatos de módulo y semántica de sincronización.

---

## Documentación y convenciones

- **Inglés** es la entrada por defecto: [`README.md`](../README.md). Otros idiomas están en este directorio como `README.<locale>.md` (selector de idioma arriba).
- Los artefactos **para mantenedores** — comentarios en código, `.cursor/rules`, `.cursor/skills` — están en **chino simplificado** (简体中文), salvo documentación de usuario en otro locale.
- **Versiones** con SemVer en [`package.json`](../package.json) (desde `1.0.0`); tags Git con prefijo `v`. Los bumps de release están en el skill `release`.

---

## Enlaces

- [Especificación Agent Skills](https://agentskills.io)
- [Skills de ejemplo de Anthropic](https://github.com/anthropics/skills)

---

## Licencia

[MIT](../LICENSE)

<!-- agent-bay-readme-locale:es via readme-translations-write -->
