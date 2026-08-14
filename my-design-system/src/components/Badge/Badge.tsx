import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { CountryIcon } from '../CountryIcon';
import { Avatar } from '../Avatar';
import { BadgeCloseX } from './BadgeCloseX';
import { colorStyles } from './colorStyles';
import type { BadgeProps, BadgeSize } from './Badge.types';

/** docs/components/badges-tags.md §1.2.1/§1.2.2 — padding + typography per size. */
const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs leading-[18px]',
  md: 'px-2.5 py-0.5 text-sm leading-5',
  lg: 'px-3 py-1 text-sm leading-5',
};

/**
 * `icon="Only"` drops the label — padding shrinks toward a square footprint
 * instead of the text paddings above. Sized to comfortably fit a real 16px
 * icon (Icon's `xs` floor — see comment on the icon slots below).
 */
const onlySizeStyles: Record<BadgeSize, string> = {
  sm: 'p-1', // 24px box
  md: 'p-1.5', // 28px box
  lg: 'p-2', // 32px box
};

/** `icon="Dot"` indicator size — docs don't specify a value, extrapolated from the Untitled UI reference (6px sm, 8px md/lg). */
const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size = 'md',
      type = 'Pill color',
      icon = 'False',
      color = 'Gray',
      children,
      flagSwap,
      avatarSwap,
      iconLeadingSwap,
      iconTrailingSwap,
      onClose,
      className,
      ...rest
    },
    ref,
  ) => {
    const styles = colorStyles[color];
    const isOutline = type === 'Pill outline';
    const isModern = type === 'Badge modern';
    const isPill = type === 'Pill color' || type === 'Pill outline';
    const isOnly = icon === 'Only';

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-xs font-medium whitespace-nowrap',
          isPill ? 'rounded-full' : 'rounded-sm',
          isOnly ? onlySizeStyles[size] : sizeStyles[size],
          isOutline
            ? cn('border-[1.5px] bg-transparent', styles.outlineBorder, styles.text)
            : isModern
              ? cn('border border-primary bg-primary shadow-xs', styles.text)
              : cn('border', styles.fillBg, styles.fillBorder, styles.text),
          className,
        )}
        {...rest}
      >
        {icon === 'Dot' && (
          <span aria-hidden="true" className={cn('shrink-0 rounded-full', styles.dot, dotSizeStyles[size])} />
        )}
        {icon === 'Country' &&
          (flagSwap ? (
            <span
              aria-hidden="true"
              className="inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-utility-gray-100"
            >
              {flagSwap}
            </span>
          ) : (
            // Generic globe mark until a specific country is known — pass `flagSwap={<CountryIcon code="PT" />}` for a real flag.
            <CountryIcon code="earth" size={20} aria-hidden="true" className="shrink-0" />
          ))}
        {icon === 'Avatar' &&
          (avatarSwap ? (
            <span
              aria-hidden="true"
              className="inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-utility-gray-200"
            >
              {avatarSwap}
            </span>
          ) : (
            <Avatar size="xs" placeholder contrastBorder={false} aria-hidden="true" className="size-5 shrink-0" />
          ))}
        {/*
          Icon's Material Symbols `opsz` axis floors at 20 (see Icon.tsx),
          matched to its own `xs` = 16px box — shrinking below that via an
          arbitrary className (e.g. `size-3.5`/`text-[14px]`) desyncs the
          glyph's optical size from its rendered box, producing the
          distorted/overflowing icons seen at Badge's smallest sizes.
          `xs` (16px) is therefore the floor used everywhere in this file.
        */}
        {(icon === 'Icon leading' || isOnly) && (iconLeadingSwap ?? <Icon name="add" size="xs" />)}
        {!isOnly && children}
        {icon === 'Icon trailing' && (iconTrailingSwap ?? <Icon name="arrow_forward" size="xs" />)}
        {icon === 'X close' && <BadgeCloseX color={color} rounded={isPill} onClick={onClose} />}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
