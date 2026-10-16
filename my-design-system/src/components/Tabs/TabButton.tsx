import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import type { BadgeColor } from '../Badge';
import type { TabState, TabsSize } from './Tabs.types';

export type TabVariant = 'underline' | 'line' | 'button';

interface TabButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: TabVariant;
  size: TabsSize;
  current: boolean;
  badge?: ReactNode;
  /** Forces Hover or Focus for previews; Default leaves them to the browser. */
  state?: TabState;
  /** Stretch to the full cross-axis (vertical tabs). */
  block?: boolean;
}

/** Heights in px: button / line tabs 36 / 44, underline 32 / 36 (text + 12px padding below). */
const heightStyles: Record<TabVariant, Record<TabsSize, string>> = {
  button: { sm: 'h-9', md: 'h-11' },
  line: { sm: 'h-9', md: 'h-11' },
  underline: { sm: 'h-8', md: 'h-9' },
};

const textStyles: Record<TabsSize, string> = {
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
};

const shapeStyles: Record<TabVariant, string> = {
  button: 'rounded-sm px-lg py-md',
  line: 'px-lg py-md',
  underline: 'px-xs pb-lg',
};

/**
 * The marked look: the white raised chip (button) or the brand text with a 2px
 * underline / left line. The line is an inset shadow so it never shifts the
 * label (Figma draws it inside). Hover on a non-current tab previews this look,
 * as in the Figma states.
 */
const markedStyles: Record<TabVariant, string> = {
  button: 'bg-primary-alt text-secondary shadow-sm',
  underline: 'text-brand-secondary shadow-[inset_0_-2px_0_0_var(--color-fg-brand-primary)]',
  line: 'text-brand-secondary shadow-[inset_2px_0_0_0_var(--color-fg-brand-primary)]',
};

/**
 * Single tab (Figma "_Tab button base": Current × Size × Type × State).
 * Internal to Tabs / VerticalTabs: `role="tab"`, roving tabindex handled by the parent.
 */
export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ variant, size, current, badge, state = 'Default', block, className, children, onMouseEnter, onMouseLeave, ...rest }, ref) => {
    const [pointerOver, setPointerOver] = useState(false);
    const hovered = state === 'Hover' || pointerOver;
    // Hover borrows the current look; the badge follows the text colour (brand for underline / line, gray in a button chip).
    const marked = current || hovered;
    const badgeColor: BadgeColor = marked && variant !== 'button' ? 'Brand' : 'Gray';

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={current}
        tabIndex={current ? 0 : -1}
        onMouseEnter={(event) => {
          setPointerOver(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setPointerOver(false);
          onMouseLeave?.(event);
        }}
        className={cn(
          'inline-flex shrink-0 items-center justify-center gap-md whitespace-nowrap font-semibold outline-none',
          'transition-colors duration-150 ease-in-out',
          // Focus ring: 2px page-coloured gap + 2px ring (Figma focus-ring on bg-primary).
          'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          state === 'Focus' && 'ring-2 ring-brand-500 ring-offset-2',
          'disabled:pointer-events-none disabled:text-disabled',
          block && 'w-full justify-start',
          heightStyles[variant][size],
          textStyles[size],
          shapeStyles[variant],
          marked ? markedStyles[variant] : 'text-quaternary',
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
