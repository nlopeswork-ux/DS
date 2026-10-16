import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { IconSize } from '../Icon';
import type { FeaturedIconColor, FeaturedIconProps, FeaturedIconSize } from './FeaturedIcon.types';

const toneStyles: Record<FeaturedIconColor, string> = {
  brand: 'fg-brand-primary',
  gray: 'fg-quaternary',
  error: 'fg-error',
  warning: 'fg-warning',
  success: 'fg-success',
  info: 'fg-info',
};

/** Glyph box: 16 / 20 / 24 / 28px. The two rings extend 4px and 9px beyond it at every size. */
const glyphSize: Record<FeaturedIconSize, { box: string; icon: IconSize }> = {
  sm: { box: 'size-4', icon: 'xs' },
  md: { box: 'size-5', icon: 'sm' },
  lg: { box: 'size-6', icon: 'md' },
  xl: { box: 'size-7', icon: 'lg' },
};

/**
 * Featured icon outline — Figma "Featured icon outline" (sm / md / lg / xl ×
 * Brand, Gray, Error, Warning, Success, Info). A bare glyph from the `Icon` set
 * with two concentric rings at 30% / 10%. The rings overflow the box, so leave
 * ~9px of room around it. Decorative by default; pair it with visible text.
 */
export const FeaturedIconOutline = forwardRef<HTMLSpanElement, FeaturedIconProps>(
  ({ name = 'error', color = 'brand', size = 'sm', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn('relative inline-flex shrink-0 rounded-full', glyphSize[size].box, toneStyles[color], className)}
      {...rest}
    >
      <span aria-hidden="true" className="absolute -inset-1 rounded-full border-2 border-current opacity-30" />
      <span aria-hidden="true" className="absolute -inset-[9px] rounded-full border-2 border-current opacity-10" />
      <Icon name={name} size={glyphSize[size].icon} />
    </span>
  ),
);

FeaturedIconOutline.displayName = 'FeaturedIconOutline';
