import type { HTMLAttributes, ReactNode } from 'react';

/** Size scale shared by the Tag and its internal sub-components. */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Icon slot shown before the label.
 * 'Dot' — small solid-color indicator dot.
 * 'Country' — flag instance-swap slot (`flagSwap`).
 * 'Avatar' — avatar instance-swap slot (`avatarSwap`).
 */
export type TagIcon = 'False' | 'Country' | 'Avatar' | 'Dot';

/**
 * Trailing action slot.
 * 'Text only' — no trailing action.
 * 'X close' — trailing dismiss button (`_Tag close X`), fires `onClose`.
 * 'Count' — a numeric badge (`count`).
 */
export type TagAction = 'Text only' | 'X close' | 'Count';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  size?: TagSize;
  icon?: TagIcon;
  action?: TagAction;
  /** Renders the leading `_Tag checkbox` sub-component. Default: false. */
  checkbox?: boolean;
  /** Checkbox checked state — only meaningful when `checkbox` is true. */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Disables the checkbox sub-control — only meaningful when `checkbox` is true. */
  disabled?: boolean;
  /** Label text/content. */
  children?: ReactNode;
  /** Country flag instance swap, rendered when `icon` is `'Country'`. Falls back to a placeholder. */
  flagSwap?: ReactNode;
  /** Avatar instance swap, rendered when `icon` is `'Avatar'`. Falls back to a placeholder. */
  avatarSwap?: ReactNode;
  /** Count badge content, rendered when `action` is `'Count'`. */
  count?: ReactNode;
  /** Fires when the `'X close'` action is activated. */
  onClose?: () => void;
}
