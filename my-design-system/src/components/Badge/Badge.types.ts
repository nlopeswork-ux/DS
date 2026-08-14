import type { HTMLAttributes, ReactNode } from 'react';

/** Size scale shared by every Badge type. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Visual container style.
 * 'Pill color'/'Pill outline' — fully rounded (radius-full).
 * 'Badge color'/'Badge modern' — radius-sm (6px), 'Badge modern' adds a
 * white fill + shadow-xs for a raised, skeuomorphic-adjacent look.
 */
export type BadgeType = 'Pill color' | 'Pill outline' | 'Badge color' | 'Badge modern';

/**
 * Icon slot shown alongside (or instead of) the label.
 * 'Dot' — small solid-color indicator dot.
 * 'Country' — flag instance-swap slot (`flagSwap`), placeholder until the
 * Flag component exists.
 * 'Avatar' — avatar instance-swap slot (`avatarSwap`), placeholder until
 * the Avatar component exists.
 * 'X close' — trailing dismiss button (`_Badge close X`).
 * 'Icon leading'/'Icon trailing' — generic icon instance-swap slots.
 * 'Only' — icon-only badge, no label text rendered.
 */
export type BadgeIcon =
  | 'False'
  | 'Dot'
  | 'Country'
  | 'X close'
  | 'Avatar'
  | 'Icon trailing'
  | 'Icon leading'
  | 'Only';

/**
 * Multi-color palette shared by Badge, `_Badge close X` and Badge group —
 * docs/components/badges-tags.md §1.2.4. Each color maps to a
 * `utility-{slug}-*` token triplet (50/200/700 fill/border/text, plus
 * 400/500/600/100 for close-X and dot states).
 */
export type BadgeColor =
  | 'Gray'
  | 'Brand'
  | 'Error'
  | 'Warning'
  | 'Success'
  | 'Blue light'
  | 'Blue'
  | 'Indigo'
  | 'Purple'
  | 'Pink'
  | 'Orange'
  | 'Gray blue';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  size?: BadgeSize;
  type?: BadgeType;
  icon?: BadgeIcon;
  color?: BadgeColor;
  /** Label text — ignored when `icon` is `'Only'`. */
  children?: ReactNode;
  /** Country flag instance swap, rendered when `icon` is `'Country'`. Falls back to a placeholder. */
  flagSwap?: ReactNode;
  /** Avatar instance swap, rendered when `icon` is `'Avatar'`. Falls back to a placeholder. */
  avatarSwap?: ReactNode;
  /** Leading icon instance swap, rendered when `icon` is `'Icon leading'` or `'Only'`. */
  iconLeadingSwap?: ReactNode;
  /** Trailing icon instance swap, rendered when `icon` is `'Icon trailing'`. */
  iconTrailingSwap?: ReactNode;
  /** Fires when the `'X close'` icon is activated. */
  onClose?: () => void;
}
