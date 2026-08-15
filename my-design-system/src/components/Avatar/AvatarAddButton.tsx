import { forwardRef, useId, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import type { AvatarSize } from './Avatar.types';

/** Reuses the Avatar size scale so the add button sits flush at the end of an Avatar group. */
const boxSizeStyles: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  '2xl': 'size-16',
};

export interface AvatarAddButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  size?: AvatarSize;
}

/**
 * `_Avatar add button` — docs (Avatar spec) §5. Default/Hover/Focus/Disabled,
 * an "Add user" tooltip on hover (real `:hover`/`:focus-visible`, CSS-only)
 * built from the shared `Tooltip` component — same pattern as `HelpIcon`.
 */
export const AvatarAddButton = forwardRef<HTMLButtonElement, AvatarAddButtonProps>(
  ({ size = 'md', className, disabled, ...rest }, ref) => {
    const tooltipId = useId();

    return (
      <span className="group relative inline-flex shrink-0">
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-label="Add user"
          aria-describedby={disabled ? undefined : tooltipId}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-utility-gray-400 transition-colors duration-150',
            'hover:bg-primary-hover hover:text-utility-gray-600',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            'disabled:border-disabled disabled:bg-disabled-subtle disabled:text-disabled disabled:pointer-events-none',
            boxSizeStyles[size],
            className,
          )}
          {...rest}
        >
          <Icon name="add" size="sm" />
        </button>
        {!disabled && (
          <span
            id={tooltipId}
            className={cn(
              // `w-max` — see the same comment in HelpIcon.tsx: without it,
              // this `absolute`+`auto`-width box's shrink-to-fit width is
              // computed against the button's own small containing block
              // instead of the Tooltip's content, wrapping the text.
              'pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2.5 w-max -translate-x-1/2 opacity-0 transition-opacity duration-150',
              'group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100',
            )}
          >
            <Tooltip text="Add user" arrow="Bottom" />
          </span>
        )}
      </span>
    );
  },
);

AvatarAddButton.displayName = 'AvatarAddButton';
