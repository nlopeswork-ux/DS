import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { CELL_FOCUS_RING, CELL_FOCUS_WITHIN_RING } from './TableHeaderCell';
import type { TableCellProps } from './Table.types';

/** Fill and outline per forced state. Real hover comes from the row; real focus from `focus-within`. */
const stateStyles: Record<NonNullable<TableCellProps['state']>, string> = {
  default: '',
  hover: 'bg-primary-hover',
  selected: 'bg-brand-primary',
  focus: CELL_FOCUS_RING,
  disabled: 'bg-disabled-subtle [&_[data-cell-text]]:text-disabled',
  loading: '',
  error: cn('bg-error-primary', 'shadow-[inset_0_0_0_2px_var(--color-border-error)]'),
  editing: cn('bg-primary', CELL_FOCUS_RING),
};

/** Skeleton bar widths for the loading state: first line wider than the second. */
const skeletonWidths = ['w-30', 'w-20'];

/**
 * `Table cell` - a `<td>` (Figma "Table cell"). It owns padding (`px-3xl py-xl`,
 * 72px with a 40px avatar), the row divider and the cell states; what goes inside
 * is one of the `TableCell*` parts, or any node.
 *
 * `loading` swaps the content for skeleton bars. `error` adds `errorMessage` under the content.
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, state = 'default', align = 'left', errorMessage, skeletonLines = 2, className, ...rest }, ref) => {
    const isLoading = state === 'loading';
    const isError = state === 'error';

    return (
      <td
        ref={ref}
        data-state={state}
        aria-busy={isLoading || undefined}
        aria-disabled={state === 'disabled' || undefined}
        aria-invalid={isError || undefined}
        className={cn(
          'relative px-3xl py-xl align-middle transition-colors duration-150',
          'border-secondary group-data-[dividers=line]/table:border-b',
          CELL_FOCUS_WITHIN_RING,
          stateStyles[state],
          className,
        )}
        {...rest}
      >
        {isLoading ? (
          <div role="status" aria-label="Loading" className="flex flex-col gap-md">
            {skeletonWidths.slice(0, skeletonLines).map((width) => (
              <span key={width} className={cn('block h-3 rounded-full bg-tertiary', width)} />
            ))}
          </div>
        ) : (
          <div className={cn('flex items-center gap-lg', align === 'right' && 'justify-end')}>
            {isError && errorMessage ? (
              <div className="flex min-w-0 flex-1 flex-col">
                {children}
                <span data-cell-text role="alert" className="text-sm leading-5 text-error">
                  {errorMessage}
                </span>
              </div>
            ) : (
              children
            )}
            {isError ? <Icon name="error" size="xs" className="fg-error" label="Error" /> : null}
          </div>
        )}
      </td>
    );
  },
);
TableCell.displayName = 'TableCell';
