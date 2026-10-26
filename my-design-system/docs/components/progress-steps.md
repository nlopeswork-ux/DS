# Progress steps

Source: Figma KDS Design System, page "Progress steps" (node 53:1288). Component: `src/components/ProgressSteps`.

## Anatomy and variants

Three independent properties replace the four named layouts of the Figma file.

| Prop | Values | Notes |
| --- | --- | --- |
| `orientation` | `horizontal`, `vertical`, `auto` | `auto` (default) is horizontal when the component's container is 512px or wider, vertical below (container query, not the viewport) |
| `content` | `text`, `minimal` | `text` = icon + title + supporting text. `minimal` = icons only (always horizontal under `auto`) |
| `connector` | `true` (default), `false` | line between icons, horizontal or vertical |
| `showStepLabel` | `false` | `minimal` only: "Step n of N" |
| `size` | `sm`, `md`, `lg` | |

| Figma layout | Props |
| --- | --- |
| Icons centered | `orientation="horizontal"` `content="text"` (mobile frame = `vertical`) |
| Icons with text | `orientation="vertical"` `content="text"` (`Connector` True / False = `connector`) |
| Minimal icons | `orientation="horizontal"` `content="minimal"` `connector={false}` `showStepLabel` |
| Minimal icons connected | `orientation="horizontal"` `content="minimal"` |
| (new) vertical minimal | `orientation="vertical"` `content="minimal"` |

Layout details: horizontal text puts the icon above centered text with the line through the icon centres (steps share the width, 240px in the Figma frame). Vertical text puts the icon left, the text right and the connector below the icon.

## Step icon (`_Step icon base`)

| Size | Circle | Dot | Outline |
| --- | --- | --- | --- |
| sm | 24px | 8px | 1.5px |
| md | 32px | 10px | 2px |
| lg | 40px | 12px | 2px |

- Incomplete: `bg-disabled-subtle`, outline `border-disabled-subtle`, dot `fg-disabled-subtle`.
- Current: `bg-brand-solid`, white dot, ring 2px gap (`bg-primary`) + 2px `focus-ring`.
- Complete: `bg-brand-solid`, white `check` glyph (from the Icon set, never the Figma example asset).
- Focused: the same ring as Current. Hover has no visible change in the Figma file.

## Text and spacing

- Title: semibold, `text-secondary`. Supporting text: regular, `text-tertiary`. Current step: `text-brand-secondary` / `text-brand-tertiary`.
- Text size per icon size: sm `text-sm`, md `text-md` (Tailwind `text-base`), lg `text-lg`.
- Icon-to-text gap `spacing-xl`; title-to-supporting gap `spacing-xxs`; row padding md: top `spacing-xs`, bottom `spacing-4xl`.
- Connector: 2px, 4px (`spacing-xs`) clear of the icons. Brand (`fg-brand-primary`) when the step is complete, `bg-quaternary` otherwise.
- Minimal icons gap: sm `spacing-lg`, md `spacing-xl`, lg `spacing-2xl`. Label "Step n of N": `text-sm` medium `text-secondary`.

## Known deviations

- Row heights of the vertical list were inferred from the Figma frame (66 / 86 / 88px); sm uses `spacing-2xl` bottom padding (64px row, 2px short) to stay on tokens.
- The lg text size (`text-lg`) and the check sizes were read from the screenshot; the Figma code export for the composed variants was not available.
