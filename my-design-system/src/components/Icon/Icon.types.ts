import type { HTMLAttributes } from 'react';

/** Icon box size — also drives the Material Symbols optical size (opsz) axis. */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Material Symbols variable-font stroke weight (wght axis). */
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Material Symbols icon name, e.g. "home", "search", "settings" (see fonts.google.com/icons). */
  name: string;
  size?: IconSize;
  /** CSS color value. Defaults to `currentColor` — inherits the surrounding text/fg-* color. */
  color?: string;
  /** Uses the filled variant of the glyph (FILL axis = 1) instead of the outlined default. */
  filled?: boolean;
  weight?: IconWeight;
  /**
   * Accessible label for icons that carry meaning on their own (e.g. an
   * icon-only button). When omitted, the icon is treated as decorative
   * (`aria-hidden`) — the default for icons paired with visible text.
   */
  label?: string;
}
