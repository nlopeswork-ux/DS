/**
 * Sync status: are the code and the Figma library still describing the same components?
 * One row per component, one column per check, code and Figma side by side.
 *
 *   npm run sync-status               rewrites docs/sync-status.md + docs/sync-status.json, prints the summary
 *   npm run sync-status -- --summary  prints the summary only (the Claude session-start hook)
 *   npm run sync-status -- --strict   also exits 1 when something differs (for CI)
 *
 * Code is the source: it is read straight from src/components (scripts/code-manifest.mjs).
 * The Figma side is figma/manifest.json, the last snapshot of the library, NOT the live file.
 * This script cannot reach Figma; only Claude can, through the Figma MCP, by taking a new
 * snapshot. So every output says when the snapshot was taken and how to refresh it.
 * It checks names, options and defaults, not the look: a padding changed in Figma does not show here.
 *
 * Which Figma set is which code component, and what is deliberately not mirrored, is
 * written down in figma/map.json.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { writeCodeManifest } from './code-manifest.mjs';

const SUMMARY_ONLY = process.argv.includes('--summary');
const STRICT = process.argv.includes('--strict');
const FIGMA = 'figma/manifest.json';
const MAP = 'figma/map.json';

const git = (cmd) => {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
const bool = (v) => (/^(true|false)$/i.test(String(v)) ? String(v).toLowerCase() : v);

const code = writeCodeManifest().components;
const fm = existsSync(FIGMA) ? JSON.parse(readFileSync(FIGMA, 'utf8')) : null;
const map = JSON.parse(readFileSync(MAP, 'utf8'));

// When the Figma side was last read, and whether the code moved since.
const takenAt = fm?.takenAt ? new Date(fm.takenAt) : null;
const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) => (d && !isNaN(d) ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` : 'never');
const ago = (d) => {
  if (!d || isNaN(d)) return '';
  const min = Math.max(0, Math.round((Date.now() - d) / 60000));
  return min < 60 ? `${min} min ago` : min < 60 * 48 ? `${Math.round(min / 60)} h ago` : `${Math.round(min / 1440)} days ago`;
};
const codeChangedAt = git('git log -1 --format=%cI -- src/components');
const codeDirty = git('git status --porcelain -- src/components') !== '';
const codeNewer = takenAt && (codeDirty || (codeChangedAt && new Date(codeChangedAt) > takenAt));
const HOW_TO_REFRESH =
  'To check the live library: ask Claude "take a snapshot of the Figma library" (it reads the file through the Figma MCP and rewrites figma/manifest.json), then run npm run sync-status.';

const CHECKS = [
  { id: 'keys', label: 'Figma key', means: 'The snapshot has the key needed to find the component and place it in another file' },
  { id: 'name', label: 'Same name', means: 'The Figma component is called what the code calls it (or the map says why not)' },
  { id: 'names', label: 'Same property names', means: 'Every variant and boolean property in Figma is a prop in code' },
  { id: 'options', label: 'Same options', means: 'Every variant option in Figma is an allowed value in code' },
  { id: 'defaults', label: 'Same defaults', means: 'The default Figma variant uses the code defaults' },
  { id: 'rules', label: 'Code follows the rules', means: 'No raw colours in the component code' },
];

const rows = [];
for (const [folder, c] of Object.entries(code)) {
  const entry = map.components[folder];
  const issues = [];
  const add = (check, message) => issues.push({ check, message });
  const row = { name: folder, figma: [], figmaProps: [], codeProps: Object.keys(c.props), checks: {}, issues, status: 'match', why: null, note: entry?.note ?? null };

  if (!entry) {
    add('name', `${folder} is not listed in figma/map.json: map it to a Figma set or mark it notMirrored`);
    row.status = 'missing in Figma';
  } else if (entry.notMirrored) {
    row.status = 'not mirrored';
    row.why = entry.notMirrored;
  } else {
    const ignore = new Set([...(map.ignoreProps ?? []), ...(entry.ignoreProps ?? [])].map(norm));
    for (const figmaName of entry.figma) {
      const set = fm?.components?.[figmaName];
      if (!set) {
        add('name', `${figmaName}: not in the Figma snapshot (renamed, removed, or the snapshot is old)`);
        add('keys', `${figmaName}: no key`);
        continue;
      }
      row.figma.push(figmaName);
      if (!set.key) add('keys', `${figmaName}: no key in the snapshot`);
      const leaf = figmaName.split('/').pop();
      if (!entry.note && !norm(leaf).includes(norm(folder)) && !norm(figmaName).includes(norm(folder))) add('name', `Figma calls it "${figmaName}", code calls it ${folder}`);
      for (const [pName, p] of Object.entries(set.props)) {
        if (p.t !== 'V' && p.t !== 'B') continue;
        if (ignore.has(norm(pName))) continue;
        row.figmaProps.push(pName);
        const codeKey = Object.keys(c.props).find((k) => norm(k) === norm(entry.propAliases?.[pName] ?? pName));
        if (!codeKey) {
          add('names', `${figmaName}: Figma property "${pName}" is not a prop in code`);
          continue;
        }
        const cp = c.props[codeKey];
        if (p.t === 'V' && cp.options) {
          const allowed = new Set(cp.options.map(norm));
          const unknown = (p.o ?? []).filter((o) => !/^\+\d+$/.test(o) && !allowed.has(norm(o)));
          if (unknown.length) add('options', `${figmaName}: "${pName}" has options code does not allow: ${unknown.join(', ')}`);
        }
        if (cp.default !== undefined && p.d !== undefined) {
          if (norm(bool(p.d)) !== norm(bool(cp.default))) add('defaults', `${figmaName}: default "${pName}" is ${p.d} in Figma, ${cp.default} in code`);
        }
      }
    }
    if (c.hardcoded.length && !entry.rulesException) add('rules', `${c.hardcoded.length} raw colour(s), first in ${c.hardcoded[0].file}:${c.hardcoded[0].line}`);
    row.figmaProps = [...new Set(row.figmaProps)];
    if (issues.some((i) => i.check === 'name' && /not in the Figma snapshot/.test(i.message))) row.status = 'missing in Figma';
    else if (issues.length) row.status = 'drift';
  }
  for (const { id } of CHECKS) {
    if (row.status === 'not mirrored') row.checks[id] = id === 'rules' ? !(c.hardcoded.length && !entry?.rulesException) : null;
    else row.checks[id] = !issues.some((i) => i.check === id);
  }
  if (entry?.rulesException) row.rulesException = entry.rulesException;
  rows.push(row);
}

const count = (s) => rows.filter((r) => r.status === s).length;
const attention = rows.filter((r) => r.status === 'drift' || r.status === 'missing in Figma');
const mirrored = rows.length - count('not mirrored');
const mappedFigma = new Set(Object.values(map.components).flatMap((e) => e.figma ?? []));
const figmaOnly = fm?.figmaOnly ?? [];

const total = (r) => r.issues.length;
const worst = [...attention].sort((a, b) => total(b) - total(a)).slice(0, 5);
const summary = [
  `Sync status: ${count('match')} of ${mirrored} mirrored components match` +
    (attention.length
      ? `, ${attention.length} differ (${rows.flatMap((r) => r.issues).length} findings: ${Object.entries(
          rows.flatMap((r) => r.issues).reduce((n, i) => ({ ...n, [i.check]: (n[i.check] ?? 0) + 1 }), {}),
        )
          .map(([k, v]) => `${v} ${CHECKS.find((c) => c.id === k)?.label.toLowerCase()}`)
          .join(', ')}). Most to fix: ${worst.map((r) => `${r.name} (${total(r)})`).join(', ')}`
      : '') +
    '. Details: docs/sync-status.md, or Sync status in Storybook.',
  fm
    ? `Figma side: the snapshot taken ${stamp(takenAt)} (${ago(takenAt)}), not the live file.` + (codeNewer ? ' The code changed after that snapshot, so Figma may have moved on or the code may need mirroring.' : '')
    : 'No Figma snapshot yet (figma/manifest.json).',
  figmaOnly.length ? `${figmaOnly.length} Figma component(s) have no code yet: ${figmaOnly.slice(0, 6).join(', ')}${figmaOnly.length > 6 ? ', ...' : ''}.` : '',
  HOW_TO_REFRESH,
].filter(Boolean);

if (SUMMARY_ONLY) {
  console.log(summary.join('\n'));
  process.exit(STRICT && attention.length ? 1 : 0);
}

// docs/sync-status.json feeds the Storybook page; the Markdown is for people reading the repo.
const json = {
  snapshot: { takenAt: fm?.takenAt ?? null, takenAtLabel: stamp(takenAt), ago: ago(takenAt), codeNewer: Boolean(codeNewer) },
  summary,
  checks: CHECKS,
  counts: { total: rows.length, match: count('match'), drift: count('drift'), missing: count('missing in Figma'), notMirrored: count('not mirrored') },
  rows,
  figmaOnly,
  howToRefresh: HOW_TO_REFRESH,
};
writeFileSync('docs/sync-status.json', JSON.stringify(json, null, 2) + '\n');

const cell = (v) => (v === null ? '-' : v ? 'Yes' : 'No');
const md = [];
md.push('# Sync status', '');
md.push('> Generated by `npm run sync-status`. Do not edit by hand.', '');
md.push(...summary.map((l) => l + '  '), '');
md.push('It checks names, options and defaults, not the look. The Figma side is the last snapshot, not the live file.', '');
md.push('## Components', '');
md.push(`| Component | Status | ${CHECKS.map((c) => c.label).join(' | ')} |`);
md.push(`| --- | --- | ${CHECKS.map(() => '---').join(' | ')} |`);
for (const r of rows) md.push(`| ${r.name} | ${r.status}${r.why ? ` (${r.why})` : ''} | ${CHECKS.map((c) => cell(r.checks[c.id])).join(' | ')} |`);
md.push('', '## What each check means', '');
for (const c of CHECKS) md.push(`- **${c.label}:** ${c.means}.`);
md.push('', '## Findings', '');
const withIssues = rows.filter((r) => r.issues.length);
if (!withIssues.length) md.push('None.');
for (const r of withIssues) {
  md.push(`### ${r.name}`, '');
  for (const i of r.issues) md.push(`- ${CHECKS.find((c) => c.id === i.check)?.label ?? i.check}: ${i.message}`);
  md.push('');
}
const exceptions = rows.filter((r) => r.rulesException);
if (exceptions.length) {
  md.push('## Decided exceptions', '');
  for (const r of exceptions) md.push(`- ${r.name} may hard-code colours: ${r.rulesException}.`);
  md.push('');
}
if (figmaOnly.length) md.push('## In Figma, not in code yet', '', figmaOnly.join(', '), '');
writeFileSync('docs/sync-status.md', md.join('\n') + '\n');

console.log(summary.join('\n'));
console.log('\nWrote docs/sync-status.md and docs/sync-status.json');
if (STRICT && attention.length) process.exit(1);
