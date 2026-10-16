import type { HTMLAttributes } from 'react';

/** Colour scale shared by both Featured icon components. */
export type FeaturedIconColor = 'brand' | 'gray' | 'error' | 'warning' | 'success' | 'info';

/** Figma sm / md / lg / xl. Circle: 32 / 40 / 48 / 56px — Outline glyph: 16 / 20 / 24 / 28px. */
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FeaturedIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Material Symbols glyph name from the Icon set (see the Icons page). Default: "error" (Figma "alert-circle"). */
  name?: string;
  color?: FeaturedIconColor;
  size?: FeaturedIconSize;
}
