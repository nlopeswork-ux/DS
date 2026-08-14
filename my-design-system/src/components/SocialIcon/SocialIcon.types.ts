import type { HTMLAttributes } from 'react';

/** 22 supported platforms — Social Icon component set. */
export type SocialIconPlatform =
  | 'AngelList'
  | 'Apple'
  | 'Clubhouse'
  | 'Discord'
  | 'Dribbble'
  | 'Facebook'
  | 'Figma'
  | 'GitHub'
  | 'Google'
  | 'Instagram'
  | 'LinkedIn'
  | 'Notion'
  | 'PayPal'
  | 'Pinterest'
  | 'Reddit'
  | 'Slack'
  | 'Spotify'
  | 'TikTok'
  | 'Twitch'
  | 'WhatsApp'
  | 'X'
  | 'YouTube';

/**
 * 'Brand' — the platform's official brand colors. No Hover state.
 * 'Gray' — monochrome neutral gray. Has a Default/Hover state.
 */
export type SocialIconStyle = 'Brand' | 'Gray';

/** Only meaningful when `style` is `'Gray'` — `'Brand'` has no Hover treatment. */
export type SocialIconState = 'Default' | 'Hover';

export interface SocialIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'style'> {
  platform?: SocialIconPlatform;
  style?: SocialIconStyle;
  state?: SocialIconState;
}
