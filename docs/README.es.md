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

**Agent Bay** — **skills** y **rules** para agentes de codificación (Cursor, Claude Code, Codex, GitHub Copilot y otros), obtenidos desde Git.

---

## Instalación

### 1. Instalar Git

Instala [Git](https://git-scm.com/downloads). En Windows, Git incluye **Git Bash**; también puedes usar **Símbolo del sistema** con el contenedor `.cmd` del paso 3.

### 2. Clonar el repositorio

```sh
git clone https://github.com/hum1st/agent-bay.git ~/.agentBay
```

### 3. Sincronizar skills

Ejecuta **agent-bay** para sincronizar los skills **agent-bay\*** en el directorio global de skills de cada agente instalado (Cursor, Claude Code, Copilot CLI, Codex). Se eliminan las copias obsoletas de `agent-bay*`; las altas, actualizaciones y bajas del repositorio se aplican en la siguiente ejecución.

#### macOS, Linux y Git Bash

```sh
sh ~/.agentBay/bin/agent-bay
```

#### Windows (Símbolo del sistema)

```cmd
%USERPROFILE%\.agentBay\bin\agent-bay.cmd
```

### 4. Probar con tu agente

En Cursor, Claude Code u otro agente compatible, ejecuta **`/agent-bay-version`**. El agente debería informar la versión de tu instalación en `~/.agentBay` (por ejemplo, el valor en `package.json`).

---

## Repositorio de ejemplo oficial

Usa **[agent-bay-demo](https://github.com/hum1st/agent-bay-demo)** como referencia de estructura Git para un proyecto pequeño compatible con Agent Bay.

```
skills/<skill-name>/   # Agent Skills (SKILL.md, scripts opcionales)
rules/                 # Reglas del agente (p. ej. Cursor .mdc)
package.json           # Dependencias opcionales para herramientas de skills
```

**Skills** — una carpeta por skill en `skills/`, siguiendo el diseño de [Agent Skills](https://agentskills.io).

**Rules** — orientación compartida en `rules/` para agentes que cargan reglas de proyecto o globales junto con los skills.

**Dependencies** — cuando un repositorio incluye `package.json`, ejecuta **`npm install`** en la raíz del repo tras clonar (o como parte de tu script de sincronización) para que las bibliotecas listadas en `dependencies` / `devDependencies` se instalen automáticamente antes de que los skills las usen.

Clona el demo, instala dependencias si hay `package.json`, conecta `skills/` con tu agente e invoca el skill de demo para verificar la carga de extremo a extremo.

---

## Enlaces

- [Agent Bay demo (repositorio de ejemplo oficial)](https://github.com/hum1st/agent-bay-demo)
- [Especificación de Agent Skills](https://agentskills.io)
- [Skills de ejemplo de Anthropic](https://github.com/anthropics/skills)

---

## Licencia

[MIT](./LICENSE)

<!-- agent-bay-readme-locale:es via readme-translations-write -->
