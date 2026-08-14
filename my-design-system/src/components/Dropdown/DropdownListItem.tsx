import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { DropdownListItemProps } from './Dropdown.types';

/** docs/components/form-controls.md §5.2/§5.3 — `_Dropdown list item` primitive. */
export function DropdownListItem({
  children,
  icon,
  checkbox = false,
  checked = false,
  supportingText,
  shortcut,
  disabled = false,
  onSelect,
  className,
}: DropdownListItemProps) {
  return (
    <button
      type="button"
      role={checkbox ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={checkbox ? checked : undefined}
      disabled={disabled}
      onClick={() => onSelect?.()}
      className={cn(
        'flex w-full items-center gap-md px-4 py-2.5 text-left text-base text-primary outline-none',
        'transition-colors duration-150 ease-in-out',
        'hover:bg-primary-hover focus-visible:bg-primary-hover',
        disabled && 'cursor-not-allowed text-disabled hover:bg-transparent',
        className,
      )}
    >
      {checkbox ? (
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border',
            checked ? 'border-transparent bg-brand-solid fg-white' : 'border-primary',
          )}
        >
          {checked ? <Icon name="check" size="xs" weight={700} /> : null}
        </span>
      ) : null}

      {icon ? (
        <span aria-hidden="true" className="inline-flex size-5 shrink-0 text-tertiary">
          {icon}
        </span>
      ) : null}

      <span className="flex flex-1 flex-col items-start gap-xxs">
        <span>{children}</span>
        {supportingText ? <span className="text-sm text-tertiary">{supportingText}</span> : null}
      </span>

      {shortcut ? <span className="text-xs text-tertiary">{shortcut}</span> : null}
    </button>
  );
}

DropdownListItem.displayName = 'DropdownListItem';
