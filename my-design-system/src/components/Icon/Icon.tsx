import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { IconProps, IconSize } from './Icon.types';

/** Box size in px — Tailwind's size-4..8 scale (4px steps). Font-size is set inline (see below), not here. */
const sizeStyles: Record<IconSize, string> = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
  xl: 'size-8',
};

/**
 * Font-size in px, matched 1:1 to the box. Applied via inline `style`
 * rather than a `text-[Npx]` Tailwind class — Google Fonts' icon stylesheet
 * ships a legacy "fallback" `.material-symbols-outlined { font-size: 24px; ... }`
 * rule for browsers it detects as lacking variable-font support. That rule
 * is unlayered plain CSS, which the CSS cascade always ranks above ANY
 * `@layer`-wrapped rule (Tailwind's utilities are `@layer utilities`)
 * regardless of specificity or source order — so it silently wins over
 * `text-[16px]` etc. and every icon renders at a fixed 24px, oversized and
 * off-center in smaller boxes (`xs`/`sm`). An inline style has no such
 * competition — it always wins short of `!important`.
 */
const fontSizeStyles: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
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
        className={cn('material-symbols-outlined inline-block shrink-0 select-none', sizeStyles[size], className)}
        style={{
          color,
          fontSize: fontSizeStyles[size],
          lineHeight: 1,
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
