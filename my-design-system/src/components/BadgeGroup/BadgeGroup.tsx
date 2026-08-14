import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Badge, badgeColorStyles } from '../Badge';
import type { BadgeGroupProps, BadgeGroupSize } from './BadgeGroup.types';

/** docs/components/badges-tags.md §2.2 — height + item spacing + font size per size. */
const sizeStyles: Record<BadgeGroupSize, string> = {
  md: 'h-[30px] gap-md text-xs',
  lg: 'h-8 gap-lg text-sm',
};

export const BadgeGroup = forwardRef<HTMLSpanElement, BadgeGroupProps>(
  (
    {
      badge = 'Leading',
      size = 'md',
      color = 'Brand',
      theme = 'Light',
      state = 'Default',
      icon = true,
      badgeLabel = 'New',
      children = 'Additional text',
      className,
      ...rest
    },
    ref,
  ) => {
    const styles = badgeColorStyles[color];
    const isLeading = badge === 'Leading';
    const forceHover = state === 'Hover';
    const isModern = theme === 'Modern';
    const isOutline = theme === 'Outline';

    const badgeChip = (
      <Badge size="sm" type="Badge color" color={color} icon={icon ? 'Dot' : 'False'}>
        {badgeLabel}
      </Badge>
    );

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium whitespace-nowrap',
          isModern ? 'rounded-lg' : 'rounded-full',
          // Padding: 4px both on the text side, 10px on the far side — the
          // badge chip already carries its own padding, so the side next
          // to it stays compact (docs/components/badges-tags.md §2.2).
          isLeading ? 'pl-1 pr-2.5' : 'pl-2.5 pr-1',
          sizeStyles[size],
          isOutline
            ? cn('border-[1.5px] bg-primary', styles.outlineBorder, styles.text)
            : isModern
              ? cn('border border-primary bg-primary shadow-xs', styles.text)
              : cn(
                  'border transition-colors duration-200',
                  forceHover ? styles.hoverFillBg : styles.fillBg,
                  styles.fillBorder,
                  styles.text,
                  !forceHover && styles.hoverBg,
                ),
          className,
        )}
        {...rest}
      >
        {isLeading && badgeChip}
        {children}
        {!isLeading && badgeChip}
      </span>
    );
  },
);

BadgeGroup.displayName = 'BadgeGroup';
