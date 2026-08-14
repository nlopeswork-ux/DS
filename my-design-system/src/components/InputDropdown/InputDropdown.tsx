import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { InputDropdownMenuItem } from './InputDropdownMenuItem';
import type { InputDropdownProps } from './InputDropdown.types';

/** docs/components/form-controls.md §1 — searchable/single-select combobox built from `_Input dropdown menu item`. */
export function InputDropdown({
  label,
  hint,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  options,
  searchable = false,
  value,
  defaultValue,
  onChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  id,
}: InputDropdownProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const listId = `${fieldId}-listbox`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const showError = error && Boolean(errorMessage);

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = isValueControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);

  const isOpenControlled = openProp !== undefined;
  const [openState, setOpenState] = useState(defaultOpen);
  const open = isOpenControlled ? openProp : openState;
  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setOpenState(next);
    onOpenChange?.(next);
  };

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
  }, [options, searchable, query]);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [open, query]);

  const selectOption = (optionValue: string) => {
    if (!isValueControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option && !option.disabled) selectOption(option.value);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={rootRef} className="flex w-full flex-col gap-sm">
      {label ? (
        <label htmlFor={fieldId} className="flex items-center gap-xxs text-sm font-medium text-secondary">
          {label}
          {required ? (
            <span aria-hidden="true" className="text-error">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={fieldId}
          disabled={disabled}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-invalid={error || undefined}
          aria-describedby={cn(hint && !showError && hintId, showError && errorId) || undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-11 w-full items-center gap-md rounded-md border bg-primary px-3.5 py-2.5 text-left shadow-xs outline-none',
            'transition-colors duration-150 ease-in-out',
            error ? 'border-error-subtle' : 'border-primary',
            'focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-offset-0',
            error ? 'focus-visible:ring-error-500' : 'focus-visible:ring-brand-500',
            open && (error ? 'border-error-subtle ring-4 ring-error-500' : 'border-brand ring-4 ring-brand-500'),
            disabled && 'cursor-not-allowed border-disabled bg-disabled-subtle opacity-60',
          )}
        >
          {selectedOption?.dotColor ? (
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: selectedOption.dotColor }} />
          ) : null}
          {selectedOption?.avatar ? (
            <span aria-hidden="true" className="inline-flex size-6 shrink-0 overflow-hidden rounded-full">
              {selectedOption.avatar}
            </span>
          ) : null}
          {selectedOption?.icon ? (
            <span aria-hidden="true" className="inline-flex size-5 shrink-0 text-tertiary">
              {selectedOption.icon}
            </span>
          ) : null}
          <span className={cn('flex-1 truncate', selectedOption ? 'text-primary' : 'text-placeholder')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            name="expand_more"
            size="xs"
            className={cn('shrink-0 text-tertiary transition-transform duration-150', open && 'rotate-180')}
          />
        </button>

        {open ? (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-secondary bg-primary shadow-lg">
            {searchable ? (
              <div className="border-b border-secondary p-2">
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  aria-label="Search options"
                  className="w-full rounded-sm bg-secondary px-3 py-2 text-sm text-primary outline-none placeholder:text-placeholder"
                />
              </div>
            ) : null}
            <ul id={listId} role="listbox" className="max-h-64 overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-sm text-tertiary">No results.</li>
              ) : (
                filteredOptions.map((option, index) => (
                  <InputDropdownMenuItem
                    key={option.value}
                    option={option}
                    selected={option.value === selectedValue}
                    active={index === activeIndex}
                    onSelect={() => selectOption(option.value)}
                  />
                ))
              )}
            </ul>
          </div>
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
}

InputDropdown.displayName = 'InputDropdown';
