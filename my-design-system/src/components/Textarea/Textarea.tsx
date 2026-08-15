import { forwardRef, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      type = 'default',
      state,
      destructive = false,
      label,
      hint,
      errorMessage,
      required = false,
      helpIcon = true,
      resizeHandle = true,
      disabled = false,
      tags,
      onTagsChange,
      className,
      id,
      onKeyDown,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;
    const showError = destructive && Boolean(errorMessage);

    const isDisabled = disabled || state === 'Disabled';
    const forceFocused = state === 'Focused';

    const isTagsType = type === 'tags';
    /** In `tags` mode the text area is always an internally-controlled compose buffer — docs/components/form-controls.md §4. */
    const [composeValue, setComposeValue] = useState('');

    const removeTag = (tagId: string) => {
      if (!tags) return;
      onTagsChange?.(tags.filter((tag) => tag.id !== tagId));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

    return (
      <div className="flex w-full flex-col gap-sm">
        {label || helpIcon ? (
          <div className="flex items-center gap-xxs">
            {label ? (
              <label htmlFor={textareaId} className="text-sm font-medium text-secondary">
                {label}
              </label>
            ) : null}
            {required ? (
              <span aria-hidden="true" className="text-brand-tertiary">
                *
              </span>
            ) : null}
            {helpIcon ? (
              <Icon name={destructive ? 'error' : 'help'} size="sm" className={destructive ? 'text-error-500' : 'fg-quinary'} />
            ) : null}
          </div>
        ) : null}

        <div
          className={cn(
            'flex h-32 flex-col gap-sm rounded-md border bg-primary px-3.5 py-3 shadow-xs',
            'transition-colors duration-150 ease-in-out',
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
          {isTagsType && tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-xs">
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

          <textarea
            ref={ref}
            id={textareaId}
            disabled={isDisabled}
            required={required}
            aria-invalid={destructive || undefined}
            aria-describedby={cn(hint && !showError && hintId, showError && errorId) || undefined}
            onKeyDown={handleKeyDown}
            className={cn(
              'w-full flex-1 border-none bg-transparent text-base text-primary outline-none placeholder:text-placeholder',
              resizeHandle ? 'resize-y' : 'resize-none',
              'disabled:cursor-not-allowed disabled:text-disabled',
              className,
            )}
            {...(isTagsType
              ? { value: composeValue, onChange: (event) => setComposeValue(event.target.value) }
              : rest)}
          />
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

Textarea.displayName = 'Textarea';
