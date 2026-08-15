import { forwardRef, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import type { InputDropdownSlot, InputProps } from './Input.types';

/** Figma spec — sizes §1: height 44/40px, padding 10px 14px / 8px 12px. */
const heightStyles: Record<'sm' | 'md', string> = {
  sm: 'h-10',
  md: 'h-11',
};

const paddingYStyles: Record<'sm' | 'md', string> = {
  sm: 'py-2',
  md: 'py-2.5',
};

const paddingLeftStyles: Record<'sm' | 'md', string> = {
  sm: 'pl-3',
  md: 'pl-3.5',
};

const paddingRightStyles: Record<'sm' | 'md', string> = {
  sm: 'pr-3',
  md: 'pr-3.5',
};

interface DropdownSegmentProps {
  slot: InputDropdownSlot;
  side: 'leading' | 'trailing';
  disabled: boolean;
}

/** Fused native `<select>` spanning the full field height — `type="leadingDropdown"`/`"trailingDropdown"`. */
function DropdownSegment({ slot, side, disabled }: DropdownSegmentProps) {
  return (
    <div
      className={cn(
        'relative flex h-full shrink-0 items-center bg-secondary',
        side === 'leading' ? 'rounded-l-md border-r' : 'rounded-r-md border-l',
        'border-primary',
      )}
    >
      {/*
       * The `<select>` must stay in normal flow so its own selected-option
       * text sizes this segment. A previous `absolute inset-0` version made
       * both children absolutely positioned, leaving nothing in flow to give
       * the wrapper a width — it collapsed to just the chevron, hiding the
       * selected value until the native popup was opened.
       */}
      <select
        aria-label={slot.ariaLabel}
        value={slot.value}
        defaultValue={slot.defaultValue}
        disabled={disabled}
        onChange={(event) => slot.onChange?.(event.target.value)}
        className="h-full cursor-pointer appearance-none bg-transparent py-2 pl-3 pr-7 text-sm text-secondary outline-none disabled:cursor-not-allowed"
      >
        {slot.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="expand_more" size="xs" className="pointer-events-none absolute right-2 text-tertiary" />
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'sm',
      type = 'default',
      state,
      destructive = false,
      label,
      hint,
      errorMessage,
      required = false,
      helpIcon = true,
      iconSwap,
      leadingDropdown,
      trailingDropdown,
      leadingTextAddon,
      paymentIcon,
      tags,
      onTagsChange,
      trailingButton,
      disabled = false,
      className,
      id,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const showError = destructive && Boolean(errorMessage);

    const isDisabled = disabled || state === 'Disabled';
    const forceFocused = state === 'Focused';

    const [composeValue, setComposeValue] = useState('');
    const isTagsType = type === 'tags';

    const removeTag = (tagId: string) => {
      if (!tags) return;
      onTagsChange?.(tags.filter((tag) => tag.id !== tagId));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (isTagsType && tags) {
        if (event.key === 'Enter') {
          event.preventDefault();
          const next = composeValue.trim();
          if (next) {
            onTagsChange?.([...tags, { id: `${Date.now()}`, label: next }]);
            setComposeValue('');
          }
        } else if (event.key === 'Backspace' && composeValue === '' && tags.length > 0) {
          onTagsChange?.(tags.slice(0, -1));
        }
      }
      onKeyDown?.(event);
    };

    const showLeadingDropdown = type === 'leadingDropdown' && leadingDropdown;
    const showTrailingDropdown = type === 'trailingDropdown' && trailingDropdown;
    const showTrailingButton = type === 'trailingButton' && trailingButton;
    const showIconLeading = type === 'iconLeading' && iconSwap;
    const showLeadingText = type === 'leadingText' && leadingTextAddon;
    const showPaymentIcon = type === 'paymentInput' && paymentIcon;

    const trailingSlotOccupied = Boolean(showTrailingDropdown) || Boolean(showTrailingButton) || isTagsType;
    const showHelpIcon = helpIcon && !trailingSlotOccupied;

    return (
      <div className="flex w-full flex-col gap-sm">
        {label ? (
          <label htmlFor={inputId} className="flex items-center gap-xxs text-sm font-medium text-secondary">
            {label}
            {required ? (
              <span aria-hidden="true" className="text-brand-tertiary">
                *
              </span>
            ) : null}
          </label>
        ) : null}

        <div
          className={cn(
            'flex items-stretch overflow-hidden rounded-md border bg-primary shadow-xs',
            'transition-colors duration-150 ease-in-out',
            heightStyles[size],
            isDisabled
              ? 'border-primary bg-disabled-subtle'
              : destructive
                ? 'border-error'
                : 'border-primary focus-within:border-brand',
            !isDisabled && destructive && 'focus-within:border-error',
            !isDisabled && 'focus-within:border-2 focus-within:ring-4 focus-within:ring-offset-0',
            !isDisabled && (destructive ? 'focus-within:ring-error-500' : 'focus-within:ring-brand-500'),
            forceFocused &&
              !isDisabled &&
              cn('border-2 ring-4 ring-offset-0', destructive ? 'border-error ring-error-500' : 'border-brand ring-brand-500'),
            isDisabled && 'cursor-not-allowed opacity-60',
          )}
        >
          {showLeadingDropdown ? <DropdownSegment slot={leadingDropdown} side="leading" disabled={isDisabled} /> : null}

          {/*
           * Vertical padding lives here, not on the outer field box — the
           * fused dropdown/button segments above and below use `h-full` to
           * span the field's entire height flush to its border, and if the
           * outer box carried its own vertical padding, `h-full` would
           * resolve against the shrunken content-box height instead of the
           * full field height, clipping the segment's content.
           */}
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md',
              paddingYStyles[size],
              !showLeadingDropdown && paddingLeftStyles[size],
              !showTrailingDropdown && !showTrailingButton && paddingRightStyles[size],
            )}
          >
            {showIconLeading ? (
              <span aria-hidden="true" className="inline-flex size-5 shrink-0 text-tertiary">
                {iconSwap}
              </span>
            ) : null}

            {showPaymentIcon ? (
              <span aria-hidden="true" className="inline-flex h-6 w-[34px] shrink-0 items-center justify-center text-tertiary">
                {paymentIcon}
              </span>
            ) : null}

            {showLeadingText ? <span className="shrink-0 text-base text-tertiary">{leadingTextAddon}</span> : null}

            {isTagsType && tags && tags.length > 0 ? (
              <div className="flex shrink-0 flex-wrap items-center gap-xs">
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    size="md"
                    action={isDisabled ? 'Text only' : 'X close'}
                    onClose={() => removeTag(tag.id)}
                  >
                    {tag.label}
                  </Tag>
                ))}
              </div>
            ) : null}

            <input
              ref={ref}
              id={inputId}
              disabled={isDisabled}
              required={required}
              aria-invalid={destructive || undefined}
              aria-describedby={cn(hint && !showError && hintId, showError && errorId) || undefined}
              onKeyDown={handleKeyDown}
              className={cn(
                'w-full min-w-0 border-none bg-transparent text-base text-primary outline-none placeholder:text-placeholder',
                'disabled:cursor-not-allowed disabled:text-disabled',
                className,
              )}
              {...(isTagsType
                ? { value: composeValue, onChange: (event) => setComposeValue(event.target.value) }
                : rest)}
            />

            {showHelpIcon ? (
              <Icon name={destructive ? 'error' : 'help'} size="sm" className={destructive ? 'text-error-500' : 'fg-quinary'} />
            ) : null}
          </div>

          {showTrailingDropdown ? <DropdownSegment slot={trailingDropdown} side="trailing" disabled={isDisabled} /> : null}

          {showTrailingButton ? (
            <button
              type="button"
              disabled={isDisabled}
              onClick={trailingButton.onClick}
              className={cn(
                'flex h-full shrink-0 items-center gap-xs rounded-r-md border-l border-primary bg-primary px-3.5 text-sm font-semibold text-secondary',
                'hover:bg-primary-hover disabled:cursor-not-allowed disabled:hover:bg-primary',
              )}
            >
              {trailingButton.icon ? (
                <span aria-hidden="true" className="inline-flex size-4 shrink-0">
                  {trailingButton.icon}
                </span>
              ) : null}
              {trailingButton.label}
            </button>
          ) : null}
        </div>

        {showError ? (
          <p id={errorId} className="text-sm text-error">
            {errorMessage}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-sm text-tertiary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
