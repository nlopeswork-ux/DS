import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import type { BadgeColor } from '../Badge';
import type { TabsSize } from './Tabs.types';

export type TabVariant = 'brand' | 'underline' | 'line' | 'border';

interface TabButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: TabVariant;
  size: TabsSize;
  current: boolean;
  badge?: ReactNode;
  /** Stretch to the full cross-axis (vertical tabs) or share the row equally (full width). */
  block?: boolean;
}

/** Heights in px: pill / border tabs 36 / 44, underline 32 / 36 (text + 12px padding below). */
const heightStyles: Record<TabVariant, Record<TabsSize, string>> = {
  brand: { sm: 'h-9', md: 'h-11' },
  border: { sm: 'h-9', md: 'h-11' },
  line: { sm: 'h-9', md: 'h-11' },
  underline: { sm: 'h-8', md: 'h-9' },
};

const textStyles: Record<TabsSize, string> = {
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
};

/** The underline / left line are inset shadows so the 2px mark never shifts the label (Figma draws it inside). */
const currentStyles: Record<TabVariant, string> = {
  brand: 'bg-brand-primary text-brand-secondary',
  border: 'bg-primary-alt text-secondary shadow-sm',
  underline: 'text-brand-secondary shadow-[inset_0_-2px_0_0_var(--color-fg-brand-primary)]',
  line: 'text-brand-secondary shadow-[inset_2px_0_0_0_var(--color-fg-brand-primary)]',
};

const idleStyles: Record<TabVariant, string> = {
  brand: 'text-quaternary hover:bg-primary-hover hover:text-tertiary-hover',
  border: 'text-quaternary hover:text-tertiary-hover',
  underline: 'text-quaternary hover:text-tertiary-hover',
  line: 'text-quaternary hover:text-tertiary-hover',
};

const shapeStyles: Record<TabVariant, string> = {
  brand: 'rounded-sm px-lg py-md',
  border: 'rounded-sm px-lg py-md',
  line: 'px-lg py-md',
  underline: 'px-xs pb-lg',
};

/**
 * Single tab (Figma "_Tab button base"). Internal to Tabs / VerticalTabs:
 * `role="tab"`, roving tabindex handled by the parent.
 */
export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ variant, size, current, badge, block, className, children, ...rest }, ref) => {
    const badgeColor: BadgeColor = current && variant !== 'border' ? 'Brand' : 'Gray';
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={current}
        tabIndex={current ? 0 : -1}
        className={cn(
          'inline-flex shrink-0 items-center gap-md whitespace-nowrap font-semibold outline-none',
          'transition-colors duration-150 ease-in-out',
          'focus-visible:ring-4 focus-visible:ring-brand-500',
          'disabled:pointer-events-none disabled:text-disabled',
          variant === 'underline' ? 'justify-center' : block ? 'justify-start' : 'justify-center',
          block && 'w-full',
          heightStyles[variant][size],
          textStyles[size],
          shapeStyles[variant],
          current ? currentStyles[variant] : idleStyles[variant],
          className,
        )}
        {...rest}
      >
        {children}
        {badge !== undefined && badge !== null && (
          <Badge size={size === 'sm' ? 'sm' : 'md'} type="Pill color" color={badgeColor}>
            {badge}
          </Badge>
        )}
      </button>
    );
  },
);

TabButton.displayName = 'TabButton';
