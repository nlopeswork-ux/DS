import { cn } from '../../utils/cn';
import type { DropdownHeaderProps } from './Dropdown.types';

/** docs/components/form-controls.md §5.4 — `_Dropdown list header` primitive (accepts plain text or an avatar-group slot). */
export function DropdownHeader({ children, className }: DropdownHeaderProps) {
  return (
    <div className={cn('border-b border-secondary px-4 py-3 text-sm font-semibold text-secondary', className)}>
      {children}
    </div>
  );
}

DropdownHeader.displayName = 'DropdownHeader';
