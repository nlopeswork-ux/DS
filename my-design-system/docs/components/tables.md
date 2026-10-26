# Tables

> Covers: Table, Table header, Table header cell, Table cell (all styles and states), Table mobile row.
> Source: Figma "KDS - Design System", page "Tables" (node 214:0). The empty-state examples are out of scope.
> Code: `src/components/Table/`.

## 1. Table

Card that frames tabular data: `bg-primary`, `border-secondary`, `radius-xl` (12px), `shadow-xs`.

| Part | Spec |
| --- | --- |
| Card header | Optional. `px-3xl pt-2xl`, 52px text block, gap `spacing-2xl`, bottom border. Title `text-lg` semibold `text-primary`; badge is Badge sm Brand; supporting text `text-sm` `text-tertiary`; actions are Buttons; "more options" is a 20px `dots-vertical` in `fg-quinary`. |
| Table | `<table>` inside a horizontally scrollable wrapper. |
| Footer | Optional `Pagination`, `px-3xl pb-xl`. |

`dividers`: `line` (1px `border-secondary` under every cell) or `alternating` (even rows `bg-secondary`).

## 2. Table header and header cell

- **Table header** (label): `text-xs` medium, `text-tertiary`; hover `text-tertiary-hover`. Optional Help icon (16px) and sort arrow (`arrow-down` / `arrow-up`, 16px). Gap `spacing-xs`.
- **Table header cell**: 44px, `px-3xl py-lg`, bottom border `border-secondary`, gap `spacing-lg`. `color`: gray (`bg-secondary`) or white (`bg-primary`). `align`: left or right. Optional select-all Checkbox (unchecked, indeterminate, checked). Focus: inset 2px `border-brand`.

## 3. Table cell

`px-3xl py-xl`, bottom border `border-secondary`, content vertically centered, 72px with a 40px avatar. Text is `text-sm` (20px): lead text `text-primary`, supporting and plain text `text-tertiary`.

### Styles

Lead text, Text, Badge, Badges multiple, Avatar group, Avatar, Payment method, Lead + checkbox / radio / toggle, Lead avatar (+ checkbox / radio / toggle), Lead icon (+ checkbox / radio / toggle), Lead payment method (+ checkbox / radio / toggle), Checkbox only, Radio only, Toggle only, Trend positive / negative, Progress bar, Action buttons, Action dropdown icon, Action icons, Star ratings, Number, Expand toggle (closed / open). Each "Supporting text" True/False variant is the presence of the second line.

### States

| State | Style |
| --- | --- |
| Default | No fill. |
| Hover | `bg-primary-hover`. |
| Selected | `bg-brand-primary`. |
| Focus | Inset 2px `border-brand`. |
| Disabled | `bg-disabled-subtle`, text `text-disabled`. |
| Loading | Skeleton lines 12px tall, `bg-tertiary`, full radius (120px and 80px wide). |
| Error | `bg-error-primary`, inset 2px `border-error`, message `text-error`, error icon `fg-error`. |
| Editing | `bg-primary`, inset 2px `border-brand`. |

### Cell internals

- Avatar group: 24px avatars, -4px overlap, 1.5px `bg-primary` ring, "+N" avatar on `bg-tertiary`.
- Badges: sm size; trend badge uses Success / Error with an `arrow_upward` / `arrow_downward` icon.
- Progress bar: 8px track `bg-quaternary`, fill `bg-brand-solid`, percentage `text-sm` medium `text-secondary`.
- Star ratings: 5 stars, 20px, gap `spacing-xs`, filled `warning-400`, empty `bg-tertiary`.
- Action buttons: Link gray "Delete" and Link color "Edit". Action icons: 36px square icon buttons.
- Toggle: 36x20 track, 16px thumb.
- Payment method icon: 46x32, 1px `border-secondary`, radius 4px.

## 4. Mobile

Columns collapse to one row: checkbox, avatar and name, status badge, chevron. The expanded row lists the other columns as label / value pairs. Footer pagination uses the mobile arrows.

## 5. Props

```ts
type TableProps = {
  title?: ReactNode; badge?: ReactNode; supportingText?: ReactNode;
  actions?: ReactNode; menu?: boolean; onMenuClick?: () => void;
  dividers?: 'line' | 'alternating'; footer?: ReactNode; tableLabel?: string;
  children: ReactNode; // TableHead + TableBody
};
type TableHeaderCellProps = {
  color?: 'white' | 'gray'; align?: 'left' | 'right'; checkbox?: boolean;
  selectAll?: 'unchecked' | 'indeterminate' | 'checked'; onSelectAllChange?: (checked: boolean) => void;
  helpIcon?: boolean; helpText?: string; sort?: 'none' | 'asc' | 'desc'; onSort?: () => void;
};
type TableCellProps = {
  state?: 'default' | 'hover' | 'selected' | 'focus' | 'disabled' | 'loading' | 'error' | 'editing';
  align?: 'left' | 'right'; errorMessage?: string; skeletonLines?: 1 | 2;
};
```

## 6. Usage notes (from the Figma notes)

- Keep tables minimal: no excess elements in an already dense UI.
- Distinguish sections clearly (divider line or alternating fill).
- Always have a clear primary column, almost always the first.
- Make interactions obvious: search, buttons, bulk-select, sortable headers.
- Let columns hug their content and let the primary column fill the rest; use fixed widths for sparse tables.
