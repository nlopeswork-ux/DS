import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { IconSize } from '../Icon';
import type { FeaturedIconColor, FeaturedIconProps, FeaturedIconSize } from './FeaturedIcon.types';

/** Tinted circle + glyph colour per colour (Figma "Featured icon" light fills). */
const colorStyles: Record<FeaturedIconColor, string> = {
  brand: 'bg-brand-secondary fg-brand-primary',
  gray: 'bg-tertiary fg-quaternary',
  error: 'bg-error-secondary fg-error',
  warning: 'bg-warning-secondary fg-warning',
  success: 'bg-success-secondary fg-success',
  info: 'bg-info-secondary fg-info',
};

const circleSize: Record<FeaturedIconSize, string> = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
};

/** Glyph box inside the circle: 16 / 20 / 24 / 28px. */
const glyphSize: Record<FeaturedIconSize, IconSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

/**
 * Featured icon — Figma "Featured icon" (sm / md / lg / xl × Brand, Gray, Error,
 * Warning, Success, Info). A tinted circle around a glyph from the `Icon` set.
 * Decorative by default (`aria-hidden`); pair it with visible text.
 */
export const FeaturedIcon = forwardRef<HTMLSpanElement, FeaturedIconProps>(
  ({ name = 'error', color = 'brand', size = 'sm', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full', circleSize[size], colorStyles[color], className)}
      {...rest}
    >
      <Icon name={name} size={glyphSize[size]} />
    </span>
  ),
);

FeaturedIcon.displayName = 'FeaturedIcon';
