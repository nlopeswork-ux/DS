import type { HTMLAttributes, ReactNode } from 'react';

/** Size scale shared by Avatar and its status-icon overlays. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Overlay shown at the avatar's bottom-right corner — mutually exclusive with the others. */
export type AvatarStatusIcon = 'false' | 'online-indicator' | 'company' | 'verified';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  size?: AvatarSize;
  /** Photo URL. Takes priority over `placeholder`/`text` when present. */
  src?: string;
  alt?: string;
  /** Shows the generic person icon. Used when no `src` and no `text` are available. */
  placeholder?: boolean;
  /** Initials shown instead of a photo (e.g. "OR"). A non-empty string also implies `text` mode. */
  text?: string;
  statusIcon?: AvatarStatusIcon;
  /** For `statusIcon="online-indicator"` — online (success green) vs. offline (neutral gray). Default: true. */
  online?: boolean;
  /** Custom node for `statusIcon="company"`, replacing the default placeholder glyph. */
  companySwap?: ReactNode;
  /** Subtle inner border (`rgba(0,0,0,0.08)`) that keeps light photos from blending into a light background. Default: true. */
  contrastBorder?: boolean;
}
