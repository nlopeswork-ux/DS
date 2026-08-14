import type { BadgeColor } from './Badge.types';

/**
 * docs/components/badges-tags.md §1.2.4/§2/§3 — one literal Tailwind class
 * set per color. Kept as fully-written strings (never template-built from
 * the color slug) so Tailwind's static scanner can find every class; a
 * `` `bg-utility-${slug}-50` `` interpolation would never make it into the
 * production CSS bundle.
 */
export interface BadgeColorStyleSet {
  /** `Pill color` / `Badge color` fill. */
  fillBg: string;
  /** `Pill color` / `Badge color` border. */
  fillBorder: string;
  /** `Pill outline` border (1.5px stroke). */
  outlineBorder: string;
  /** Text color, shared by every type. */
  text: string;
  /** `Dot` icon fill. */
  dot: string;
  /** Badge group `Light` theme hover fill (one step darker than `fillBg`). */
  hoverFillBg: string;
  /** `_Badge close X` idle icon color. */
  closeIdle: string;
  /** Real `:hover` pseudo-class fill — shared by `_Badge close X` and Badge group's `Light` theme. */
  hoverBg: string;
  /** `_Badge close X` hover icon color. */
  closeHoverText: string;
}

export const colorStyles: Record<BadgeColor, BadgeColorStyleSet> = {
  Gray: {
    fillBg: 'bg-utility-gray-50',
    fillBorder: 'border-utility-gray-200',
    outlineBorder: 'border-utility-gray-600',
    text: 'text-utility-gray-700',
    dot: 'bg-utility-gray-500',
    hoverFillBg: 'bg-utility-gray-100',
    closeIdle: 'text-utility-gray-400',
    hoverBg: 'hover:bg-utility-gray-100',
    closeHoverText: 'hover:text-utility-gray-600',
  },
  Brand: {
    fillBg: 'bg-utility-brand-50',
    fillBorder: 'border-utility-brand-200',
    outlineBorder: 'border-utility-brand-600',
    text: 'text-utility-brand-700',
    dot: 'bg-utility-brand-500',
    hoverFillBg: 'bg-utility-brand-100',
    closeIdle: 'text-utility-brand-400',
    hoverBg: 'hover:bg-utility-brand-100',
    closeHoverText: 'hover:text-utility-brand-600',
  },
  Error: {
    fillBg: 'bg-utility-error-50',
    fillBorder: 'border-utility-error-200',
    outlineBorder: 'border-utility-error-600',
    text: 'text-utility-error-700',
    dot: 'bg-utility-error-500',
    hoverFillBg: 'bg-utility-error-100',
    closeIdle: 'text-utility-error-400',
    hoverBg: 'hover:bg-utility-error-100',
    closeHoverText: 'hover:text-utility-error-600',
  },
  Warning: {
    fillBg: 'bg-utility-warning-50',
    fillBorder: 'border-utility-warning-200',
    outlineBorder: 'border-utility-warning-600',
    text: 'text-utility-warning-700',
    dot: 'bg-utility-warning-500',
    hoverFillBg: 'bg-utility-warning-100',
    closeIdle: 'text-utility-warning-400',
    hoverBg: 'hover:bg-utility-warning-100',
    closeHoverText: 'hover:text-utility-warning-600',
  },
  Success: {
    fillBg: 'bg-utility-success-50',
    fillBorder: 'border-utility-success-200',
    outlineBorder: 'border-utility-success-600',
    text: 'text-utility-success-700',
    dot: 'bg-utility-success-500',
    hoverFillBg: 'bg-utility-success-100',
    closeIdle: 'text-utility-success-400',
    hoverBg: 'hover:bg-utility-success-100',
    closeHoverText: 'hover:text-utility-success-600',
  },
  'Blue light': {
    fillBg: 'bg-utility-blue-light-50',
    fillBorder: 'border-utility-blue-light-200',
    outlineBorder: 'border-utility-blue-light-600',
    text: 'text-utility-blue-light-700',
    dot: 'bg-utility-blue-light-500',
    hoverFillBg: 'bg-utility-blue-light-100',
    closeIdle: 'text-utility-blue-light-400',
    hoverBg: 'hover:bg-utility-blue-light-100',
    closeHoverText: 'hover:text-utility-blue-light-600',
  },
  Blue: {
    fillBg: 'bg-utility-blue-50',
    fillBorder: 'border-utility-blue-200',
    outlineBorder: 'border-utility-blue-600',
    text: 'text-utility-blue-700',
    dot: 'bg-utility-blue-500',
    hoverFillBg: 'bg-utility-blue-100',
    closeIdle: 'text-utility-blue-400',
    hoverBg: 'hover:bg-utility-blue-100',
    closeHoverText: 'hover:text-utility-blue-600',
  },
  Indigo: {
    fillBg: 'bg-utility-indigo-50',
    fillBorder: 'border-utility-indigo-200',
    outlineBorder: 'border-utility-indigo-600',
    text: 'text-utility-indigo-700',
    dot: 'bg-utility-indigo-500',
    hoverFillBg: 'bg-utility-indigo-100',
    closeIdle: 'text-utility-indigo-400',
    hoverBg: 'hover:bg-utility-indigo-100',
    closeHoverText: 'hover:text-utility-indigo-600',
  },
  Purple: {
    fillBg: 'bg-utility-purple-50',
    fillBorder: 'border-utility-purple-200',
    outlineBorder: 'border-utility-purple-600',
    text: 'text-utility-purple-700',
    dot: 'bg-utility-purple-500',
    hoverFillBg: 'bg-utility-purple-100',
    closeIdle: 'text-utility-purple-400',
    hoverBg: 'hover:bg-utility-purple-100',
    closeHoverText: 'hover:text-utility-purple-600',
  },
  Pink: {
    fillBg: 'bg-utility-pink-50',
    fillBorder: 'border-utility-pink-200',
    outlineBorder: 'border-utility-pink-600',
    text: 'text-utility-pink-700',
    dot: 'bg-utility-pink-500',
    hoverFillBg: 'bg-utility-pink-100',
    closeIdle: 'text-utility-pink-400',
    hoverBg: 'hover:bg-utility-pink-100',
    closeHoverText: 'hover:text-utility-pink-600',
  },
  Orange: {
    fillBg: 'bg-utility-orange-50',
    fillBorder: 'border-utility-orange-200',
    outlineBorder: 'border-utility-orange-600',
    text: 'text-utility-orange-700',
    dot: 'bg-utility-orange-500',
    hoverFillBg: 'bg-utility-orange-100',
    closeIdle: 'text-utility-orange-400',
    hoverBg: 'hover:bg-utility-orange-100',
    closeHoverText: 'hover:text-utility-orange-600',
  },
  'Gray blue': {
    fillBg: 'bg-utility-gray-blue-50',
    fillBorder: 'border-utility-gray-blue-200',
    outlineBorder: 'border-utility-gray-blue-600',
    text: 'text-utility-gray-blue-700',
    dot: 'bg-utility-gray-blue-500',
    hoverFillBg: 'bg-utility-gray-blue-100',
    closeIdle: 'text-utility-gray-blue-400',
    hoverBg: 'hover:bg-utility-gray-blue-100',
    closeHoverText: 'hover:text-utility-gray-blue-600',
  },
};
