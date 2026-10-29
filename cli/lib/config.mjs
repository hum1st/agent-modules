import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { ensureDir, globalConfigPath } from './paths.mjs';

const DEFAULT_CONFIG = {
  version: 1,
  repos: [],
};

export function loadGlobalConfig() {
  const file = globalConfigPath();
  if (!fs.existsSync(file)) {
    return { file, config: null };
  }
  const text = fs.readFileSync(file, 'utf8');
  const config = yaml.parse(text);
  if (!config || typeof config !== 'object') {
    throw new Error(`Invalid config (not an object): ${file}`);
  }
  return { file, config };
}

export function saveGlobalConfig(config) {
  const file = globalConfigPath();
  ensureDir(path.dirname(file));
  const doc = yaml.stringify(config, { lineWidth: 0 });
  fs.writeFileSync(file, doc.endsWith('\n') ? doc : `${doc}\n`, 'utf8');
  return file;
}

export function defaultGlobalConfig() {
  return structuredClone(DEFAULT_CONFIG);
}

export function findRepoEntry(config, url) {
  const normalized = normalizeRepoUrl(url);
  return config.repos?.find((r) => normalizeRepoUrl(r.url) === normalized);
}

export function normalizeRepoUrl(url) {
  const trimmed = url.trim();
  if (/^[\w.-]+\/[\w.-]+$/.test(trimmed)) {
    return `https://github.com/${trimmed}.git`;
  }
  let u = trimmed.replace(/\.git$/, '');
  if (!u.includes('://') && u.includes('@')) {
    return `${u}.git`;
  }
  if (!u.endsWith('.git')) {
    u = `${u}.git`;
  }
  return u;
}

export function upsertRepo(config, entry) {
  if (!Array.isArray(config.repos)) {
    config.repos = [];
  }
  const url = normalizeRepoUrl(entry.url);
  const idx = config.repos.findIndex((r) => normalizeRepoUrl(r.url) === url);
  const merged = { ...entry, url };
  if (idx >= 0) {
    config.repos[idx] = { ...config.repos[idx], ...merged };
  } else {
    config.repos.push(merged);
  }
  return config;
}
