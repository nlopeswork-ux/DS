import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

/**
 * Placeholder for the "Button close X" component (docs/components/buttons.md §6),
 * which doesn't exist in the Design System yet — 36px variant used by Alert.
 * Internal for now — promote to `src/components/CloseButton` when it is built.
 */
export const AlertCloseButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-md p-md text-quaternary outline-none',
        'transition-colors duration-150 ease-in-out hover:bg-primary-hover hover:text-tertiary',
        'focus-visible:ring-4 focus-visible:ring-brand-500',
        className,
      )}
      {...rest}
    >
      <Icon name="close" size="sm" />
    </button>
  ),
);

AlertCloseButton.displayName = 'AlertCloseButton';
