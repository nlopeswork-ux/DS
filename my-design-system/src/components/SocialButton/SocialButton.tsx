import { forwardRef, type ReactElement } from 'react';
import { cn } from '../../utils/cn';
import {
  AppleIcon,
  DribbbleIcon,
  FacebookIcon,
  FigmaIcon,
  GoogleIcon,
  TwitterIcon,
  type SocialIconTone,
} from '../SocialIcon/brandIcons';
import type { SocialButtonProps, SocialProvider } from './SocialButton.types';

const providerLabel: Record<SocialProvider, string> = {
  Google: 'Google',
  Facebook: 'Facebook',
  Apple: 'Apple',
  Twitter: 'X',
  Figma: 'Figma',
  Dribbble: 'Dribbble',
};

const ProviderIcon: Record<SocialProvider, (props: { tone: SocialIconTone; className?: string }) => ReactElement> = {
  Google: GoogleIcon,
  Facebook: FacebookIcon,
  Apple: AppleIcon,
  Twitter: TwitterIcon,
  Figma: FigmaIcon,
  Dribbble: DribbbleIcon,
};

/** docs/components/buttons.md §3.4 — background fill per provider, `Brand` theme only. */
const brandBackground: Record<SocialProvider, string> = {
  Google: '#FFFFFF',
  Facebook: '#1877F2',
  Apple: '#000000',
  Twitter: '#000000',
  Figma: '#000000',
  Dribbble: '#EA4C89',
};

/**
 * §3.4 — Figma's mark stays multicolor on any background (its official
 * asset), and Google's Brand button is an outline style over a white fill,
 * so both keep the colored icon even under `theme="Brand"`. Every other
 * provider fills the background with its own brand color, so the icon
 * switches to a flat white mark for contrast.
 */
function getIconTone(theme: SocialButtonProps['theme'], social: SocialProvider): SocialIconTone {
  if (theme === 'Gray') return 'mono';
  if (theme === 'Color') return 'color';
  return social === 'Google' || social === 'Figma' ? 'color' : 'white';
}

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  (
    {
      social = 'Google',
      supportingText = true,
      theme = 'Color',
      state = 'Default',
      className,
      style,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const Icon = ProviderIcon[social];
    const tone = getIconTone(theme, social);
    const isBrand = theme === 'Brand';
    const isGoogleBrand = isBrand && social === 'Google';
    const label = `Sign in with ${providerLabel[social]}`;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={supportingText ? undefined : label}
        className={cn(
          'inline-flex items-center justify-center shrink-0 rounded-md font-semibold whitespace-nowrap shadow-xs',
          'transition-colors duration-150 ease-in-out outline-none',
          'focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-brand-500',
          supportingText ? 'h-11 gap-lg px-xl py-2.5' : 'size-11 p-2.5',
          isBrand
            ? cn(
                // docs/components/buttons.md §3.4 — 2px stroke, gradient white→transparent on
                // Brand. Google keeps the neutral outline border (visible over a white fill);
                // the other providers get a subtle white/10 border over their own solid fill.
                isGoogleBrand ? 'border border-primary text-secondary' : 'border-2 border-white/10 text-white',
                'hover:brightness-95',
              )
            : 'bg-primary text-secondary border border-primary hover:bg-primary-hover hover:text-secondary-hover',
          // Forced state preview (Storybook) — doesn't replace the real pseudo-classes.
          state === 'Hover' && (isBrand ? 'brightness-95' : 'bg-primary-hover text-secondary-hover'),
          state === 'Focused' && 'ring-4 ring-offset-2 ring-offset-white ring-brand-500',
          className,
        )}
        style={{ backgroundColor: isBrand ? brandBackground[social] : undefined, ...style }}
        {...rest}
      >
        <Icon tone={tone} className="size-6 shrink-0" />
        {supportingText ? <span>{label}</span> : null}
      </button>
    );
  },
);

SocialButton.displayName = 'SocialButton';
