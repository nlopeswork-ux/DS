/**
 * Code manifest: what every component in src/components exposes, read from the TypeScript source.
 * For each folder: the props declared in its `*Props` interfaces, each prop's allowed values
 * (string-literal unions, resolved through type aliases) and its default (from the component's
 * destructuring defaults, or a "Default: x" note in the prop's JSDoc).
 *
 * Also reports where a component hard-codes a colour (the "code follows the rules" check).
 *
 *   node scripts/code-manifest.mjs            writes figma/code-manifest.json
 *   import { readCodeManifest } from './code-manifest.mjs'   (used by sync-status.mjs)
 *
 * Inherited props (extends HTMLAttributes...) are ignored: only what the component declares.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = 'src/components';
const isSource = (f) => /\.(ts|tsx)$/.test(f) && !/\.(stories|examples)\.tsx?$/.test(f) && !f.endsWith('.d.ts');

const text = (node, sf) => node.getText(sf);
const stripQuotes = (s) => s.replace(/^['"`]|['"`]$/g, '');

/** String-literal options of a type node, or null when it is not a closed set of strings. */
function optionsOf(typeNode, aliases, sf, seen = new Set()) {
  if (!typeNode) return null;
  if (ts.isParenthesizedTypeNode(typeNode)) return optionsOf(typeNode.type, aliases, sf, seen);
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) return [typeNode.literal.text];
  if (ts.isUnionTypeNode(typeNode)) {
    const parts = typeNode.types.map((t) => optionsOf(t, aliases, sf, seen));
    // `'a' | undefined` still counts as a closed set.
    const real = typeNode.types.filter((t) => t.kind !== ts.SyntaxKind.UndefinedKeyword && !(ts.isLiteralTypeNode(t) && t.literal.kind === ts.SyntaxKind.NullKeyword));
    const optionLists = real.map((t) => optionsOf(t, aliases, sf, seen));
    if (optionLists.some((o) => o === null)) return null;
    return [...new Set(optionLists.flat())];
  }
  if (ts.isTypeReferenceNode(typeNode)) {
    const name = text(typeNode.typeName, sf);
    if (seen.has(name) || !aliases.has(name)) return null;
    seen.add(name);
    const { node, file } = aliases.get(name);
    return optionsOf(node, aliases, file, seen);
  }
  return null;
}

function kindOf(typeNode, sf) {
  if (!typeNode) return 'unknown';
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return 'boolean';
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return 'string';
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return 'number';
  return text(typeNode, sf).replace(/\s+/g, ' ');
}

const jsdocDefault = (member, sf) => {
  const doc = ts.getJSDocCommentsAndTags(member).map((d) => d.getText(sf)).join(' ');
  const m = doc.match(/Default:\s*"?([^".*\n]+?)"?\s*(?:\.|\*\/|$)/);
  return m ? m[1].trim() : undefined;
};

/** name -> default text, from `({ a = 'x', b = false })` parameters of components in this folder. */
function destructuringDefaults(sf) {
  const found = {};
  const visit = (node) => {
    if (ts.isParameter(node) && ts.isObjectBindingPattern(node.name)) {
      for (const el of node.name.elements) {
        if (el.initializer && ts.isIdentifier(el.propertyName ?? el.name)) {
          const key = text(el.propertyName ?? el.name, sf);
          const init = el.initializer;
          const simple = ts.isStringLiteralLike(init) || ts.isNumericLiteral(init) || init.kind === ts.SyntaxKind.TrueKeyword || init.kind === ts.SyntaxKind.FalseKeyword;
          if (simple) found[key] = stripQuotes(text(init, sf));
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

const HEX = /(['"`(\s:])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])/;
const RGB = /\brgba?\(\s*\d/;

export function buildCodeManifest() {
  const folders = readdirSync(ROOT).filter((d) => statSync(`${ROOT}/${d}`).isDirectory()).sort();
  const components = {};
  for (const folder of folders) {
    const files = readdirSync(`${ROOT}/${folder}`).filter(isSource);
    const sources = files.map((f) => {
      const path = `${ROOT}/${folder}/${f}`;
      const content = readFileSync(path, 'utf8');
      return { path, content, sf: ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true, f.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS) };
    });
    const aliases = new Map();
    for (const { sf } of sources) for (const st of sf.statements) if (ts.isTypeAliasDeclaration(st)) aliases.set(st.name.text, { node: st.type, file: sf });
    const defaults = Object.assign({}, ...sources.map(({ sf }) => destructuringDefaults(sf)));
    const props = {};
    const interfaces = [];
    for (const { sf } of sources) {
      for (const st of sf.statements) {
        if (!ts.isInterfaceDeclaration(st) || !/Props$/.test(st.name.text)) continue;
        interfaces.push(st.name.text);
        for (const m of st.members) {
          if (!ts.isPropertySignature(m) || !m.name) continue;
          const name = text(m.name, sf);
          const options = optionsOf(m.type, aliases, sf);
          const entry = props[name] ?? (props[name] = { kind: kindOf(m.type, sf), required: !m.questionToken });
          if (options) entry.options = [...new Set([...(entry.options ?? []), ...options])];
          const d = defaults[name] ?? jsdocDefault(m, sf);
          if (d !== undefined && entry.default === undefined) entry.default = d;
        }
      }
    }
    // The "rules" check: no raw colours in the component code.
    const hardcoded = [];
    for (const { path, content } of sources) {
      content.split('\n').forEach((line, i) => {
        if (/^\s*(\/\*|\*|\/\/)/.test(line) || line.includes('ds-allow-hardcode')) return;
        const code = line.replace(/\/\/.*$/, '');
        if (HEX.test(code) || RGB.test(code)) hardcoded.push({ file: path, line: i + 1, text: line.trim().slice(0, 100) });
      });
    }
    components[folder] = { source: `${ROOT}/${folder}/`, interfaces, props, hardcoded };
  }
  return { generatedBy: 'scripts/code-manifest.mjs', components };
}

export function writeCodeManifest(path = 'figma/code-manifest.json') {
  const manifest = buildCodeManifest();
  mkdirSync('figma', { recursive: true });
  writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const m = writeCodeManifest();
  console.log(`Code manifest: ${Object.keys(m.components).length} components written to figma/code-manifest.json`);
}
