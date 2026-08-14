import { forwardRef, type ComponentType, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  AppleIcon,
  DribbbleIcon,
  FacebookIcon,
  FigmaIcon,
  GoogleIcon,
  LinkedInIcon,
  SlackIcon,
  TwitterIcon,
  type SocialIconProps as BrandMarkProps,
} from './brandIcons';
import { simpleIconMarks } from './simpleIconMarks.generated';
import type { SocialIconPlatform, SocialIconProps } from './SocialIcon.types';

/** docs (Social Icon spec) §"Cores — Style Gray". */
const GRAY_DEFAULT = '#98A2B3'; // fg-quinary (400)
const GRAY_HOVER = '#667085'; // fg-quinary_hover

/** Multi-tone marks that need a hand-drawn component (see brandIcons.tsx). */
const HAND_DRAWN_MARKS: Partial<Record<SocialIconPlatform, ComponentType<BrandMarkProps>>> = {
  Apple: AppleIcon,
  Dribbble: DribbbleIcon,
  Facebook: FacebookIcon,
  Figma: FigmaIcon,
  Google: GoogleIcon,
  LinkedIn: LinkedInIcon,
  Slack: SlackIcon,
  X: TwitterIcon,
};

export const SocialIcon = forwardRef<HTMLSpanElement, SocialIconProps>(
  ({ platform = 'Facebook', style = 'Brand', state = 'Default', className, ...rest }, ref) => {
    const isGray = style === 'Gray';
    const grayColor = isGray && state === 'Hover' ? GRAY_HOVER : GRAY_DEFAULT;

    const HandDrawnMark = HAND_DRAWN_MARKS[platform];

    let glyph: ReactNode;
    if (HandDrawnMark) {
      glyph = <HandDrawnMark tone={isGray ? 'mono' : 'color'} monoColor={grayColor} className="size-full" />;
    } else {
      const mark = simpleIconMarks[platform];
      glyph = (
        <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
          <path fill={isGray ? grayColor : mark.brandHex} d={mark.path} />
        </svg>
      );
    }

    return (
      <span
        ref={ref}
        role="img"
        aria-label={platform}
        className={cn('inline-flex size-6 shrink-0 items-center justify-center bg-primary', className)}
        {...rest}
      >
        {glyph}
      </span>
    );
  },
);

SocialIcon.displayName = 'SocialIcon';
