import type { HTMLAttributes, ReactNode } from 'react';
import type { BadgeColor } from '../Badge';

/** Position of the inner Badge chip relative to the descriptive text. */
export type BadgeGroupBadgePosition = 'Leading' | 'Trailing';

export type BadgeGroupSize = 'md' | 'lg';

/**
 * Outer pill treatment — mirrors Badge's `type` for the 3 non-squared
 * looks (docs/components/badges-tags.md §2.2).
 * 'Light' — solid `utility-{color}-50` fill.
 * 'Outline' — white fill, `utility-{color}-600` 1.5px border.
 * 'Modern' — white fill, `border-primary`, `shadow-xs`, radius-lg.
 */
export type BadgeGroupTheme = 'Light' | 'Outline' | 'Modern';

/**
 * Visual state.
 * 'Default' lets the real state be governed by the browser (:hover).
 * 'Hover' forces the hover preview (Storybook use).
 */
export type BadgeGroupState = 'Default' | 'Hover';

/** docs/components/badges-tags.md §2 — only the 5 semantic colors are documented for Badge group. */
export type BadgeGroupColor = Extract<BadgeColor, 'Gray' | 'Brand' | 'Error' | 'Warning' | 'Success'>;

export interface BadgeGroupProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  badge?: BadgeGroupBadgePosition;
  size?: BadgeGroupSize;
  color?: BadgeGroupColor;
  theme?: BadgeGroupTheme;
  state?: BadgeGroupState;
  /** Shows a `Dot` indicator inside the inner Badge chip. Default: true. */
  icon?: boolean;
  /** Text inside the small inner Badge chip. */
  badgeLabel?: ReactNode;
  /** Descriptive text next to the Badge chip. */
  children?: ReactNode;
}
