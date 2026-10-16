import type { HTMLAttributes } from 'react';

/**
 * Forced visual state (Storybook previews). `Default` leaves hover and focus to
 * the browser (`:hover`, `:focus-visible`), like Button's `state`.
 */
export type BreadcrumbState = 'Default' | 'Hover' | 'Focused';

export interface BreadcrumbItem {
  /** Text of the crumb. Optional for an icon-only crumb (then `ariaLabel` is required). */
  label?: string;
  /** Material Symbols glyph from the Icon set, shown before the label (Figma "home-line" → `home`). */
  icon?: string;
  /** Accessible name for an icon-only crumb, e.g. "Home". */
  ariaLabel?: string;
  /** Renders a link. */
  href?: string;
  /** Click handler — renders a link when `href` is set, otherwise a button. */
  onClick?: () => void;
  /** Forces a visual state for previews. */
  state?: BreadcrumbState;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The trail, root first. The last item is the current page (not a link). */
  items: BreadcrumbItem[];
  /**
   * Maximum crumbs shown before the middle ones collapse into "…". The first
   * `maxItems - 2` crumbs and the last one stay visible, as in the Figma
   * default (`Home › Settings › … › Team`). Default: 4. Activating "…"
   * reveals the full trail.
   */
  maxItems?: number;
  /** Accessible name of the landmark. Default: "Breadcrumb". */
  'aria-label'?: string;
}
