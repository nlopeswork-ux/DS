import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import type { AvatarProps } from '../Avatar';
import type { BadgeColor } from '../Badge';

/** How rows are told apart - Figma `Dividers` variant. */
export type TableDividers = 'line' | 'alternating';

/** Sort direction shown by a header label. `'none'` renders no arrow. */
export type TableSortDirection = 'none' | 'asc' | 'desc';

/** Visual state of a cell - Figma `State` variant. Default/Hover/Focus also react to the real pointer and keyboard. */
export type TableCellState = 'default' | 'hover' | 'selected' | 'focus' | 'disabled' | 'loading' | 'error' | 'editing';

export interface TableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title. Omit it (and `badge`, `supportingText`, `actions`, `menu`) to render the bare table. */
  title?: ReactNode;
  /** Text of the brand badge shown next to the title, e.g. "100 users". */
  badge?: ReactNode;
  /** Supporting text under the title. */
  supportingText?: ReactNode;
  /** Buttons rendered at the right of the card header. */
  actions?: ReactNode;
  /** Shows the "more options" icon button at the far right of the card header. */
  menu?: boolean;
  /** Called when the "more options" button is activated. */
  onMenuClick?: () => void;
  /** Row separator: a divider line under every row, or an alternating fill. Default: `'line'`. */
  dividers?: TableDividers;
  /** Content under the table - normally a `Pagination`. */
  footer?: ReactNode;
  /** Accessible name of the `<table>` (falls back to `title` when it is a string). */
  tableLabel?: string;
  /** `TableHead` + `TableBody`. */
  children: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Selected-row fill (`bg-brand-primary`). */
  selected?: boolean;
  /** Dims the row and removes hover. */
  disabled?: boolean;
}

export interface TableHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Column label. */
  children: ReactNode;
  /** Adds a help icon with a tooltip. */
  helpIcon?: boolean;
  /** Tooltip text of the help icon. */
  helpText?: string;
  /** Sort arrow. `'none'` shows no arrow. */
  sort?: TableSortDirection;
  /** Forces the hover look (Storybook). The real `:hover` always applies when `onClick` is set. */
  hover?: boolean;
  /** Makes the label a button (sortable column). */
  onClick?: () => void;
}

export interface TableHeaderCellProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Column label - rendered through `TableHeader`. */
  children?: ReactNode;
  /** Header fill. `'gray'` (default) is `bg-secondary`; `'white'` is `bg-primary`. */
  color?: 'white' | 'gray';
  align?: 'left' | 'right';
  /** Shows the select-all checkbox. */
  checkbox?: boolean;
  /** State of the select-all checkbox. */
  selectAll?: 'unchecked' | 'indeterminate' | 'checked';
  onSelectAllChange?: (checked: boolean) => void;
  helpIcon?: boolean;
  helpText?: string;
  sort?: TableSortDirection;
  /** Called when the label is activated (turns it into a sort button). */
  onSort?: () => void;
  /** Forces the keyboard-focus outline (Storybook). */
  focused?: boolean;
  /** Forces the label hover look (Storybook). */
  hover?: boolean;
}

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Cell content - usually one of the `TableCell*` parts. */
  children?: ReactNode;
  state?: TableCellState;
  align?: 'left' | 'right';
  /** Message shown under the content when `state="error"`. */
  errorMessage?: string;
  /** Number of skeleton lines when `state="loading"` (1 or 2). Default: 2. */
  skeletonLines?: 1 | 2;
}

export interface TableCellTextProps {
  /** Main text. */
  primary: ReactNode;
  /** Second line, in `text-tertiary`. */
  supporting?: ReactNode;
  /** `true` for the primary column: heavier, `text-primary`. Default: false. */
  lead?: boolean;
  /** Tabular numerals, for numbers. */
  numeric?: boolean;
}

export interface TableCellLeadProps extends TableCellTextProps {
  /** Control before the visual: a `Checkbox`, `Radio` or `TableToggle`. */
  control?: ReactNode;
  /** Avatar, icon or payment-method icon before the text. */
  visual?: ReactNode;
}

export interface TableCellBadgesProps {
  badges: { label: ReactNode; color?: BadgeColor }[];
}

export interface TableCellAvatarGroupProps {
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'placeholder' | 'text'>[];
  /** Overflow count shown as a "+N" avatar. */
  extra?: number;
  /** Text next to the stack, e.g. "10 users". */
  label?: ReactNode;
}

export interface TableCellTrendProps {
  /** Value text, e.g. "$1,800". */
  value?: ReactNode;
  /** Percentage inside the badge. */
  percentage: number;
  trend: 'positive' | 'negative';
}

export interface TableCellProgressProps {
  /** 0–100. */
  value: number;
  /** Hides the percentage label. */
  hideLabel?: boolean;
}

export interface TableCellActionButtonsProps {
  onDelete?: () => void;
  onEdit?: () => void;
  deleteLabel?: string;
  editLabel?: string;
}

export interface TableCellActionIconsProps {
  actions: { icon: string; label: string; onClick?: () => void }[];
}

export interface TableCellRatingProps {
  /** 0–5, halves allowed. */
  value: number;
}

export interface TableCellExpandProps {
  open?: boolean;
  onToggle?: () => void;
  label?: string;
}

export interface TableToggleProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label': string;
}

export interface TableMobileRowProps {
  /** Left side: checkbox, avatar and name. */
  lead: ReactNode;
  /** Right side, before the chevron - typically a status badge. */
  trailing?: ReactNode;
  /** Key/value pairs revealed when the row is expanded. */
  details?: { label: ReactNode; value: ReactNode }[];
  selected?: boolean;
  /** Controlled expanded state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
