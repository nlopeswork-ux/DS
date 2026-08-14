import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
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
 * a "Add user" tooltip on hover (real `:hover`/`:focus-visible`, CSS-only —
 * no JS positioning library needed for a fixed top-center tooltip).
 */
export const AvatarAddButton = forwardRef<HTMLButtonElement, AvatarAddButtonProps>(
  ({ size = 'md', className, disabled, ...rest }, ref) => (
    <span className="group relative inline-flex shrink-0">
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label="Add user"
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
          role="tooltip"
          className={cn(
            'pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-utility-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150',
            'group-hover:opacity-100 group-focus-within:opacity-100',
          )}
        >
          Add user
        </span>
      )}
    </span>
  ),
);

AvatarAddButton.displayName = 'AvatarAddButton';
