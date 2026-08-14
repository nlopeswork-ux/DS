import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Internal primitive (`_Mega input field base`, docs/components/form-controls.md §2) —
 * a single large digit box. Not exported from the component's public `index.ts`;
 * used only by `VerificationCodeInput`.
 */
export type MegaInputFieldBaseSize = 'sm' | 'md' | 'lg';

export interface MegaInputFieldBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: MegaInputFieldBaseSize;
  /** True once the digit has a value — renders the `Filled` state (brand border) even when not focused. */
  filled?: boolean;
  error?: boolean;
}

/** docs/components/form-controls.md §2.3 — dimension, radius and padding per size. */
const sizeStyles: Record<MegaInputFieldBaseSize, string> = {
  sm: 'size-16 rounded-lg px-md py-xxs text-2xl',
  md: 'size-20 rounded-xl px-md py-md text-3xl',
  lg: 'size-24 rounded-xl px-md py-lg text-4xl',
};

export const MegaInputFieldBase = forwardRef<HTMLInputElement, MegaInputFieldBaseProps>(
  ({ size = 'md', filled = false, error = false, disabled = false, className, ...rest }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      aria-invalid={error || undefined}
      className={cn(
        'shrink-0 border bg-primary text-center font-semibold text-primary shadow-xs outline-none',
        'transition-colors duration-150 ease-in-out',
        'focus-visible:border-2 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-offset-0',
        error ? 'focus-visible:ring-error-500' : 'focus-visible:ring-brand-500',
        error ? 'border-error-subtle' : filled ? 'border-2 border-brand' : 'border-primary',
        disabled && 'cursor-not-allowed border-disabled bg-disabled-subtle text-disabled opacity-60',
        sizeStyles[size],
        className,
      )}
      {...rest}
    />
  ),
);

MegaInputFieldBase.displayName = 'MegaInputFieldBase';
