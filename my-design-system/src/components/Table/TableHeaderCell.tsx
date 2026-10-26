import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Checkbox } from '../Checkbox';
import { TableHeader } from './TableHeader';
import type { TableHeaderCellProps } from './Table.types';

/** Inset 2px brand outline - the keyboard-focus look of header and body cells (Figma "Focus outline"). */
export const CELL_FOCUS_RING = 'shadow-[inset_0_0_0_2px_var(--color-border-brand)]';
/** Same outline for real keyboard focus. Written out in full so Tailwind can see the class. */
export const CELL_FOCUS_WITHIN_RING = 'focus-within:shadow-[inset_0_0_0_2px_var(--color-border-brand)]';

/**
 * `Table header cell` - a `<th>` (Figma "Table header cell"): 44px tall,
 * `px-3xl`, a bottom border, an optional select-all checkbox and a `TableHeader` label.
 */
export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  (
    {
      children,
      color = 'gray',
      align = 'left',
      checkbox = false,
      selectAll = 'unchecked',
      onSelectAllChange,
      helpIcon,
      helpText,
      sort = 'none',
      onSort,
      focused = false,
      hover,
      className,
      scope = 'col',
      ...rest
    },
    ref,
  ) => (
    <th
      ref={ref}
      scope={scope}
      aria-sort={sort === 'asc' ? 'ascending' : sort === 'desc' ? 'descending' : undefined}
      className={cn(
        'h-11 border-b border-secondary px-3xl py-lg text-left font-normal align-middle',
        color === 'gray' ? 'bg-secondary' : 'bg-primary',
        align === 'right' && 'text-right',
        CELL_FOCUS_WITHIN_RING,
        focused && CELL_FOCUS_RING,
        className,
      )}
      {...rest}
    >
      <div className={cn('flex items-center gap-lg', align === 'right' && 'justify-end')}>
        {checkbox ? (
          <Checkbox
            aria-label="Select all rows"
            checked={selectAll !== 'unchecked'}
            indeterminate={selectAll === 'indeterminate'}
            onChange={(event) => onSelectAllChange?.(event.target.checked)}
          />
        ) : null}
        {children ? (
          <TableHeader helpIcon={helpIcon} helpText={helpText} sort={sort} hover={hover} onClick={onSort}>
            {children}
          </TableHeader>
        ) : null}
      </div>
    </th>
  ),
);
TableHeaderCell.displayName = 'TableHeaderCell';
