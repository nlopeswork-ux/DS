/**
 * Snapshot of the Figma library, run INSIDE Figma (Plugin API), not by Node.
 * Claude runs it through the Figma MCP (`use_figma`), once per component page, then merges the
 * results into figma/manifest.json (see "Sync status" in CLAUDE.md).
 *
 * Set PAGE_ID to a component page ("↳ Buttons", "↳ Tabs", ...) and run it. It returns, for every
 * component set on that page: name, key, description and its properties.
 *   t: V variant, B boolean, S instance swap, T text
 *   o: variant options    d: default (the default variant's value, or the boolean default)
 * Property names are cleaned: the "#id" suffix, a leading emoji and a trailing "*" are removed so
 * they match the code prop names ("⬅️ Icon leading" -> "Icon leading", "Required *" -> "Required").
 *
 * Only reads. One page per call (the Plugin API loads pages one at a time).
 */
const PAGE_ID = '1:1183'; // <- the page to snapshot
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const T = { VARIANT: 'V', BOOLEAN: 'B', TEXT: 'T', INSTANCE_SWAP: 'S' };
const clean = (k) => k.replace(/#\d+:\d+$/, '').replace(/^[^A-Za-z0-9]+/, '').replace(/\s*\*$/, '').trim();
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] }).map((s) => {
  const defaultVariant = (s.defaultVariant && s.defaultVariant.variantProperties) || {};
  const props = {};
  for (const [name, def] of Object.entries(s.componentPropertyDefinitions)) {
    const entry = { t: T[def.type] || def.type };
    if (def.type === 'VARIANT') { entry.o = def.variantOptions; entry.d = defaultVariant[name]; }
    else if (def.type === 'BOOLEAN') entry.d = def.defaultValue;
    props[clean(name)] = entry;
  }
  return { n: s.name, k: s.key, d: s.description || undefined, p: props };
});
return { page: page.name.trim(), sets };
