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

**Modules de capacités branchables pour agents de codage** — ajoutez, mettez à jour et étendez skills et règles depuis Git pour Cursor, Claude Code, Codex, GitHub Copilot et d’autres agents.

---

## Objectifs

Agent Bay est un outil open source (en conception) qui répond à **configuration d’agents éclatée, versioning faible et perte de setup au changement de machine** pour les équipes et les personnes utilisant plusieurs agents de codage.

Nous traitons **Agent Skills** (format ouvert [`SKILL.md`](https://agentskills.io)) et **règles d’agents** (p. ex. `.cursor/rules`, `AGENTS.md`) comme **modules branchables** :

1. **Montée en version verticale** — Tirer ou mettre à jour des packs de capacités depuis Git pour que les agents adoptent rapidement workflows, normes et connaissance métier.
2. **Extension horizontale** — Mapper les mêmes modules vers les chemins natifs de chaque produit (Cursor, Claude Code, Codex, Copilot, …) sans copier les dotfiles à la main.
3. **Collaboration auditable** — Git est la source de vérité ; les copies installées sont des artefacts gérés avec sync incrémentale et nettoyage.
4. **Skills vs règles** — **Skills** à la demande et **Rules** permanentes ou par chemin sur des rails séparés, aligné avec la tendance du secteur vers les skills tout en conservant `alwaysApply` / globs là où il faut.

Agent Bay **n’est pas** un crawler web et **ne remplace pas** les registres publics de skills (p. ex. [skills.sh](https://skills.sh) / `npx skills`). Il se concentre sur **vos dépôts Git** comme autorité pour **installer des modules et les déployer sur plusieurs canaux d’agents**.

---

## Métaphore : la baie (bay)

Comme des **baies d’extension** sur un robot : chaque baie accueille un module de capacité (pack skill, fragment de règle ou catalogue). Changer, ajouter et mettre à jour des modules doit être **rapide** et **reproductible**.

---

## Statut

**Phase initiale** — Ce dépôt définit objectifs, conventions et implémentation ; API et CLI ne sont pas encore stables.

Issues et PR bienvenues sur les formats de modules et la sémantique de synchronisation.

---

## Documentation et conventions

- **Anglais** : entrée par défaut [`README.md`](../README.md). Les autres langues sont ici en `README.<locale>.md` (sélecteur en tête de page).
- Artefacts **mainteneurs** — commentaires, `.cursor/rules`, `.cursor/skills` — en **chinois simplifié** (简体中文), sauf docs utilisateur dans la locale concernée.
- **Versions** : SemVer dans [`package.json`](../package.json) (à partir de `1.0.0`) ; tags Git préfixés `v`. Règles de bump dans le skill `release`.

---

## Liens

- [Spécification Agent Skills](https://agentskills.io)
- [Exemples de skills Anthropic](https://github.com/anthropics/skills)

---

## Licence

[MIT](../LICENSE)

<!-- agent-bay-readme-locale:fr via readme-translations-write -->
