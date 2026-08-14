import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { RadioProps } from './Radio.types';

/** docs/components/form-controls.md §4.3 — control dimensions per size (radius is always full for radio). */
const controlSizeStyles: Record<'sm' | 'md', string> = {
  sm: 'size-4',
  md: 'size-5',
};

const dotSizeStyles: Record<'sm' | 'md', string> = {
  sm: 'size-1.5',
  md: 'size-2',
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { size = 'md', label, supportingText, error = false, disabled = false, className, id, ...rest },
    ref,
  ) => {
    const generatedId = useId();
    const radioId = id ?? generatedId;

    return (
      <div className="flex items-start gap-md">
        {/*
         * `pt-xxs` aligns the control with a multi-line label's first line.
         * It must live on this outer, non-positioned wrapper — putting it on
         * the `relative` element below would inflate the box that `inset-0
         * m-auto` centers the dot within (padding adds to the box height,
         * but the input itself doesn't grow), pushing the dot off-center.
         */}
        <div className="pt-xxs">
        <div className="relative flex shrink-0 items-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            aria-invalid={error || undefined}
            className={cn(
              'peer shrink-0 cursor-pointer appearance-none rounded-full border bg-primary',
              'checked:border-brand',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0',
              error ? 'border-error-subtle focus-visible:ring-error-500' : 'border-primary focus-visible:ring-brand-500',
              'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled-subtle',
              controlSizeStyles[size],
              className,
            )}
            {...rest}
          />
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 m-auto hidden rounded-full bg-brand-solid peer-checked:block',
              /**
               * `bg-disabled`/`bg-disabled-subtle` (gray-100/gray-50) are
               * background tokens, too close in luminosity to the input's
               * own `bg-disabled-subtle` fill and `border-disabled` outline
               * — the dot was reading as invisible. `bg-gray-400` matches
               * the `fg-disabled` foreground token for real contrast.
               */
              'peer-disabled:bg-gray-400',
              dotSizeStyles[size],
            )}
          />
        </div>
        </div>

        {label || supportingText ? (
          <div className="flex flex-col gap-xxs">
            {label ? (
              <label
                htmlFor={radioId}
                className={cn('cursor-pointer text-sm font-medium text-secondary', disabled && 'cursor-not-allowed opacity-60')}
              >
                {label}
              </label>
            ) : null}
            {supportingText ? <p className="text-sm text-tertiary">{supportingText}</p> : null}
          </div>
        ) : null}
      </div>
    );
  },
);

Radio.displayName = 'Radio';
