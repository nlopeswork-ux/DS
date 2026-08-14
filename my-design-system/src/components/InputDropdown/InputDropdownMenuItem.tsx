import { cn } from '../../utils/cn';
import type { InputDropdownOption } from './InputDropdown.types';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-4">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export interface InputDropdownMenuItemProps {
  option: InputDropdownOption;
  selected: boolean;
  /** Keyboard-highlighted row (`state: 'Hover'` in the source spec, driven by arrow-key navigation here). */
  active: boolean;
  onSelect: () => void;
}

/** docs/components/form-controls.md §3 — `_Input dropdown menu item` primitive. */
export function InputDropdownMenuItem({ option, selected, active, onSelect }: InputDropdownMenuItemProps) {
  return (
    <li
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled || undefined}
      onMouseDown={(event) => {
        event.preventDefault();
        if (!option.disabled) onSelect();
      }}
      className={cn(
        'flex cursor-pointer items-center gap-md px-4 py-2.5 text-base text-primary',
        active && 'bg-primary-hover',
        option.disabled && 'cursor-not-allowed text-disabled',
      )}
    >
      {option.dotColor ? (
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: option.dotColor }} />
      ) : null}
      {option.avatar ? (
        <span aria-hidden="true" className="inline-flex size-6 shrink-0 overflow-hidden rounded-full">
          {option.avatar}
        </span>
      ) : null}
      {option.icon ? (
        <span aria-hidden="true" className="inline-flex size-5 shrink-0 text-tertiary">
          {option.icon}
        </span>
      ) : null}

      <span className="flex flex-1 flex-col items-start gap-xxs">
        <span>{option.label}</span>
        {option.supportingText ? <span className="text-sm text-tertiary">{option.supportingText}</span> : null}
      </span>

      {selected ? (
        <span aria-hidden="true" className="text-brand-secondary">
          <CheckIcon />
        </span>
      ) : null}
    </li>
  );
}

InputDropdownMenuItem.displayName = 'InputDropdownMenuItem';
