import type { ButtonHTMLAttributes } from 'react';

/** Providers supported by the Social button — docs/components/buttons.md §3.1. */
export type SocialProvider = 'Google' | 'Facebook' | 'Apple' | 'Twitter' | 'Figma' | 'Dribbble';

/**
 * Color theme of the button.
 * 'Color' / 'Gray' — white background, colored or monochrome provider icon.
 * 'Brand' — background filled with the provider's own brand color.
 */
export type SocialButtonTheme = 'Brand' | 'Color' | 'Gray';

/**
 * Visual state of the Social button.
 * 'Default' leaves the real state governed by the browser (:hover, :focus-visible).
 * 'Hover' and 'Focused' force a preview of that state (mainly used in Storybook).
 * There is no 'Disabled' variant in this component set (docs/components/buttons.md §3.6).
 */
export type SocialButtonState = 'Default' | 'Hover' | 'Focused';

export interface SocialButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  social?: SocialProvider;
  /** true = "Sign in with X" label visible; false = icon-only, square 44×44 button. */
  supportingText?: boolean;
  theme?: SocialButtonTheme;
  state?: SocialButtonState;
}
