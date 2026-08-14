import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { IconProps, IconSize } from './Icon.types';

/** Box size in px, matched 1:1 to the glyph's font-size — Tailwind's size-4..8 scale (4px steps). */
const sizeStyles: Record<IconSize, string> = {
  xs: 'size-4 text-[16px]',
  sm: 'size-5 text-[20px]',
  md: 'size-6 text-[24px]',
  lg: 'size-7 text-[28px]',
  xl: 'size-8 text-[32px]',
};

/** Material Symbols opsz axis is only defined for 20–48 — clamp the smallest box to the font's own floor. */
const opticalSize: Record<IconSize, number> = {
  xs: 20,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ name, size = 'md', color, filled = false, weight = 400, label, className, style, ...rest }, ref) => {
    const a11yProps = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };

    return (
      <span
        ref={ref}
        {...a11yProps}
        className={cn('material-symbols-outlined inline-block shrink-0 select-none leading-none', sizeStyles[size], className)}
        style={{
          color,
          fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${opticalSize[size]}`,
          ...style,
        }}
        {...rest}
      >
        {name}
      </span>
    );
  },
);

Icon.displayName = 'Icon';
