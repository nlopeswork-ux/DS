# Progress steps

Source: Figma KDS Design System, page "Progress steps" (node 53:1288). Component: `src/components/ProgressSteps`.

## Variants

| Type | Layout | Desktop | Mobile |
| --- | --- | --- | --- |
| Icons centered | icon above centered text, horizontal line through the icons | row, steps share the width (240px in the Figma frame) | vertical list, icon left, connector below the icon |
| Icons with text | vertical list, icon left | same | same (`Connector` on / off) |
| Minimal icons | icons only, optional "Step n of N" | row | row, centered |
| Minimal icons connected | icons joined by 80px lines | row | row |

Sizes: `sm` / `md` / `lg`.

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
