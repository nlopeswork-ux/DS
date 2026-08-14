import type { HTMLAttributes } from 'react';
import type { SocialButtonTheme, SocialProvider } from '../SocialButton/SocialButton.types';

/**
 * Layout style of the group.
 * 'Buttons' — full-width, labeled buttons stacked vertically.
 * 'Icons' — icon-only buttons laid out in a single horizontal row.
 */
export type SocialButtonGroupStyle = 'Buttons' | 'Icons';

export interface SocialButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  style?: SocialButtonGroupStyle;
  theme?: SocialButtonTheme;
  /** Providers rendered by the group, in order — 3 to 4 entries. Default: Google, Facebook, Apple. */
  providers?: SocialProvider[];
}
