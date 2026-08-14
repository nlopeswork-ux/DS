import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { IconSize } from '../Icon';
import { AvatarOnlineIndicator } from './AvatarOnlineIndicator';
import { AvatarCompanyIcon } from './AvatarCompanyIcon';
import { VerifiedBadge } from './VerifiedBadge';
import type { AvatarProps, AvatarSize } from './Avatar.types';

/** docs (Avatar spec) §3 — Avatar dimension per size. */
const boxSizeStyles: Record<AvatarSize, string> = {
  xs: 'size-6', // 24px
  sm: 'size-8', // 32px
  md: 'size-10', // 40px
  lg: 'size-12', // 48px
  xl: 'size-14', // 56px
  '2xl': 'size-16', // 64px
};

/** docs (Avatar spec) §3 — contrast-border stroke width per size. */
const borderWidthStyles: Record<AvatarSize, string> = {
  xs: 'border-[0.5px]',
  sm: 'border-[0.5px]',
  md: 'border-[0.75px]',
  lg: 'border-[0.75px]',
  xl: 'border-[0.75px]',
  '2xl': 'border-[0.75px]',
};

/** Initials font size — not pinned to a single token across every size in the spec (only "Font size/text-md" is named), scaled here for legibility across the full xs–2xl range. */
const textSizeStyles: Record<AvatarSize, string> = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl',
};

/**
 * Placeholder person-icon size, scaled with the avatar box — mapped onto
 * Icon's own discrete size scale (never an arbitrary className shrink)
 * so its Material Symbols `opsz` axis stays matched to the rendered box;
 * a mismatch there is what produced distorted/overflowing glyphs at small
 * sizes (see Badge.tsx, which embeds this Avatar at `size="xs"`).
 */
const placeholderIconSize: Record<AvatarSize, IconSize> = {
  xs: 'xs', // 16px
  sm: 'sm', // 20px
  md: 'md', // 24px
  lg: 'lg', // 28px
  xl: 'xl', // 32px
  '2xl': 'xl', // 32px (Icon's ceiling)
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      size = 'md',
      src,
      alt = '',
      placeholder = false,
      text,
      statusIcon = 'false',
      online = true,
      companySwap,
      contrastBorder = true,
      className,
      ...rest
    },
    ref,
  ) => {
    let content;
    if (src) {
      content = <img src={src} alt={alt} className="size-full object-cover" />;
    } else if (text) {
      content = <span className={cn('font-semibold text-utility-gray-500', textSizeStyles[size])}>{text}</span>;
    } else {
      // `placeholder` explicitly requested, or nothing else to render — the generic person glyph is the component's own fallback.
      void placeholder;
      content = <Icon name="person" filled size={placeholderIconSize[size]} className="text-utility-gray-500" />;
    }

    return (
      <span ref={ref} className={cn('relative inline-flex shrink-0', boxSizeStyles[size], className)} {...rest}>
        <span className="relative flex size-full items-center justify-center overflow-hidden rounded-full bg-utility-gray-100">
          {content}
          {contrastBorder && (
            <span
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-0 rounded-full border-black/[0.08]', borderWidthStyles[size])}
            />
          )}
        </span>

        {statusIcon === 'online-indicator' && (
          <AvatarOnlineIndicator size={size} online={online} className="absolute right-0 bottom-0 translate-x-[8%] translate-y-[8%]" />
        )}
        {statusIcon === 'company' && (
          <AvatarCompanyIcon size={size} swap={companySwap} className="absolute right-0 bottom-0 translate-x-[15%] translate-y-[15%]" />
        )}
        {statusIcon === 'verified' && (
          <VerifiedBadge size={size} className="absolute right-0 bottom-0 translate-x-[8%] translate-y-[8%]" />
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
