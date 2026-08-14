import { forwardRef, useEffect, useId, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { cn } from '../../utils/cn';
import type { CheckboxProps } from './Checkbox.types';

/** docs/components/form-controls.md §4.3 — control dimensions and radius per size. */
const controlSizeStyles: Record<'sm' | 'md', string> = {
  sm: 'size-4 rounded-xs',
  md: 'size-5 rounded-sm',
};

const iconSizeStyles: Record<'sm' | 'md', string> = {
  sm: 'size-3',
  md: 'size-3.5',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      label,
      supportingText,
      error = false,
      indeterminate = false,
      disabled = false,
      className,
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const internalRef = useRef<HTMLInputElement | null>(null);

    /** `indeterminate` is a DOM property, not an HTML attribute — must be set imperatively. */
    useEffect(() => {
      if (internalRef.current) internalRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    };

    return (
      <div className="flex items-start gap-md">
        {/*
         * `pt-xxs` aligns the control with a multi-line label's first line.
         * It must live on this outer, non-positioned wrapper — putting it on
         * the `relative` element below would inflate the box that `inset-0
         * m-auto` centers the icons within (padding adds to the box height,
         * but the input itself doesn't grow), pushing the checkmark up.
         */}
        <div className="pt-xxs">
        <div className="relative flex shrink-0 items-center">
          <input
            ref={setRefs}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-invalid={error || undefined}
            className={cn(
              'peer shrink-0 cursor-pointer appearance-none border bg-primary',
              'checked:border-transparent checked:bg-brand-solid',
              indeterminate && 'border-transparent bg-brand-solid',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0',
              error ? 'border-error-subtle focus-visible:ring-error-500' : 'border-primary focus-visible:ring-brand-500',
              'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled-subtle disabled:checked:bg-disabled-subtle',
              controlSizeStyles[size],
              className,
            )}
            {...rest}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              // `fg-disabled-subtle` (gray-300) was too close to the disabled fill
              // (bg-disabled-subtle, gray-50) to read clearly — `fg-disabled` (gray-400) fixes contrast.
              'pointer-events-none absolute inset-0 m-auto fg-white peer-disabled:fg-disabled',
              iconSizeStyles[size],
              indeterminate ? 'hidden' : 'hidden peer-checked:block',
            )}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className={cn(
              // `fg-disabled-subtle` (gray-300) was too close to the disabled fill
              // (bg-disabled-subtle, gray-50) to read clearly — `fg-disabled` (gray-400) fixes contrast.
              'pointer-events-none absolute inset-0 m-auto fg-white peer-disabled:fg-disabled',
              iconSizeStyles[size],
              indeterminate ? 'block' : 'hidden',
            )}
          >
            <path d="M5 12h14" />
          </svg>
        </div>
        </div>

        {label || supportingText ? (
          <div className="flex flex-col gap-xxs">
            {label ? (
              <label
                htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox';
