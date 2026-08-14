/**
 * Local provider logo marks for SocialButton — this project has no icon
 * library with brand/social logos (only Material Symbols via `Icon`, see
 * CLAUDE.md), so each mark is a hand-drawn SVG component, following the
 * same local-icon pattern already used in Introduction.mdx.
 *
 * `tone` selects the rendered palette:
 * - 'color'  → the provider's real brand colors (theme Color, and Brand for
 *   Google/Figma, whose official mark stays multicolor on any background).
 * - 'mono'   → single neutral gray fill (theme Gray).
 * - 'white'  → single white fill, for Brand buttons with a solid dark/tinted
 *   background (Facebook, Apple, Twitter/X, Dribbble).
 */
export type SocialIconTone = 'color' | 'mono' | 'white';

export interface SocialIconProps {
  tone: SocialIconTone;
  className?: string;
}

const MONO_FILL = '#667085';

export const GoogleIcon = ({ tone, className }: SocialIconProps) => {
  if (tone === 'mono') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill={MONO_FILL}
          d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
        />
        <path
          fill={MONO_FILL}
          d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"
        />
        <path fill={MONO_FILL} d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.75l4.01-3.11Z" />
        <path
          fill={MONO_FILL}
          d="M12 4.77c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"
      />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.75l4.01-3.11Z" />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
      />
    </svg>
  );
};

export const FacebookIcon = ({ tone, className }: SocialIconProps) => {
  const fFill = tone === 'white' ? '#FFFFFF' : tone === 'mono' ? MONO_FILL : '#FFFFFF';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {tone !== 'white' && <circle cx="12" cy="12" r="12" fill={tone === 'mono' ? '#F2F4F7' : '#1877F2'} />}
      <path
        fill={fFill}
        d="M15.4 12.5H13.2V20H10.1V12.5H8.6V9.9H10.1V8.2C10.1 6.9 10.7 5 13.2 5L15.5 5V7.5H13.8C13.5 7.5 13.2 7.6 13.2 8.3V9.9H15.6L15.4 12.5Z"
      />
    </svg>
  );
};

export const AppleIcon = ({ tone, className }: SocialIconProps) => {
  const fill = tone === 'white' ? '#FFFFFF' : tone === 'mono' ? MONO_FILL : '#000000';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={fill}
        d="M17.05 12.63c-.02-2.06 1.68-3.05 1.76-3.1-1-1.45-2.55-1.65-3.1-1.67-1.32-.13-2.58.78-3.25.78-.67 0-1.7-.76-2.8-.74-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.45 1.07 8.56.71 1.03 1.56 2.19 2.68 2.15 1.08-.04 1.49-.7 2.79-.7 1.3 0 1.67.7 2.8.68 1.16-.02 1.89-1.05 2.6-2.09.82-1.2 1.15-2.36 1.17-2.42-.03-.01-2.24-.86-2.21-3.58Z"
      />
      <path
        fill={fill}
        d="M14.98 6.32c.6-.72 1-1.72.89-2.72-.86.03-1.9.57-2.52 1.29-.55.63-1.03 1.65-.9 2.62.95.07 1.93-.48 2.53-1.19Z"
      />
    </svg>
  );
};

export const TwitterIcon = ({ tone, className }: SocialIconProps) => {
  const fill = tone === 'white' ? '#FFFFFF' : tone === 'mono' ? MONO_FILL : '#000000';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill={fill} d="M13.9 10.4 21.2 2h-1.7l-6.3 7.3L8.2 2H2l7.6 11-7.6 9h1.7l6.7-7.7L15.9 22H22l-8.1-11.6Zm-2.4 2.7-.8-1.1L4.6 3.3h2.7l5 7.1.8 1.1 6.5 9.3h-2.7l-5.4-7.7Z" />
    </svg>
  );
};

export const FigmaIcon = ({ tone, className }: SocialIconProps) => {
  if (tone === 'mono') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path fill={MONO_FILL} d="M9 0h6a4.5 4.5 0 0 1 0 9H9V0Z" opacity="0.9" />
        <path fill={MONO_FILL} d="M4.5 4.5A4.5 4.5 0 0 1 9 0v9a4.5 4.5 0 1 1-4.5-4.5Z" opacity="0.6" />
        <path fill={MONO_FILL} d="M4.5 13.5A4.5 4.5 0 0 1 9 9h0v4.5a4.5 4.5 0 1 1-4.5 4.5v-4.5Z" opacity="0.75" />
        <path fill={MONO_FILL} d="M9 9h4.5a4.5 4.5 0 1 1-4.5 4.5V9Z" opacity="0.45" />
        <circle cx="13.5" cy="4.5" r="4.5" fill={MONO_FILL} opacity="0.3" />
      </svg>
    );
  }
  const fill = tone === 'white' ? '#FFFFFF' : undefined;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill={fill ?? '#0ACF83'} d="M4.5 19.5A4.5 4.5 0 0 1 9 15v4.5a4.5 4.5 0 1 1-4.5 0Z" />
      <path fill={fill ?? '#A259FF'} d="M4.5 13.5A4.5 4.5 0 0 1 9 9h0v9H9a4.5 4.5 0 0 1-4.5-4.5Z" />
      <path fill={fill ?? '#F24E1E'} d="M4.5 4.5A4.5 4.5 0 0 1 9 0h0v9H9a4.5 4.5 0 0 1-4.5-4.5Z" />
      <path fill={fill ?? '#FF7262'} d="M9 0h4.5a4.5 4.5 0 1 1 0 9H9V0Z" />
      <circle cx="13.5" cy="13.5" r="4.5" fill={fill ?? '#1ABCFE'} />
    </svg>
  );
};

export const DribbbleIcon = ({ tone, className }: SocialIconProps) => {
  const fill = tone === 'white' ? '#FFFFFF' : tone === 'mono' ? MONO_FILL : '#EA4C89';
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm8.3 5.5a10.3 10.3 0 0 1 2.3 6.3c-.3-.1-3.6-.7-6.9-.3-.15-.35-.3-.7-.45-1.05a30 30 0 0 0-.75-1.65c3.6-1.5 5.25-3.6 5.8-3.3Zm-1.1-1.15c-.5.7-2 2.6-5.4 3.95a52 52 0 0 0-4.1-6.05A10.3 10.3 0 0 1 12 1.7c2.7 0 5.15 1.05 7.2 2.65ZM8.4 2.75a49 49 0 0 1 4.05 6c-5.1 1.35-9.6 1.3-10.1 1.3A10.4 10.4 0 0 1 8.4 2.75ZM1.7 12v-.3c.45.01 5.75.08 11.2-1.55.3.6.6 1.2.85 1.8l-.4.12C7.8 13.85 4.9 18.35 4.65 18.75A10.3 10.3 0 0 1 1.7 12Zm4.35 7.9c.2-.4 2.6-4.75 8.15-6.55l.1-.03c1.35 3.55 1.9 6.5 2.05 7.35A10.3 10.3 0 0 1 6.05 19.9Zm11.9-.15a44 44 0 0 0-1.9-7.15c3.1-.5 5.8.3 6.15.4a10.35 10.35 0 0 1-4.25 6.75Z"
      />
    </svg>
  );
};
