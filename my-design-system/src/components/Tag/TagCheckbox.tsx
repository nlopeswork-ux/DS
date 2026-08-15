import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TagCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * `_Tag checkbox` — docs/components/badges-tags.md §5.3/§5.4. Fixed
 * 16×16 across every Tag size, `radius-xs` (4px) — same checked/hover/
 * focus/disabled color logic as the standalone `Checkbox` at `size="sm"`,
 * but without its label wrapper (a Tag's label is the Tag's own text).
 */
export const TagCheckbox = forwardRef<HTMLInputElement, TagCheckboxProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled = false, className }, ref) => (
    <span className="relative inline-flex size-4 shrink-0 items-center">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
        aria-label="Select"
        className={cn(
          'peer size-4 shrink-0 cursor-pointer appearance-none rounded-xs border bg-primary',
          'checked:border-transparent checked:bg-brand-solid hover:checked:bg-brand-solid-hover',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 focus-visible:ring-brand-500',
          'border-primary',
          'disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled-subtle disabled:checked:bg-disabled-subtle',
          className,
        )}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute inset-0 m-auto hidden size-3 fg-white peer-checked:block peer-disabled:fg-disabled"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  ),
);

TagCheckbox.displayName = 'TagCheckbox';
