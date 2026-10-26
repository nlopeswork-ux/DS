import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import type { TableProps, TableRowProps } from './Table.types';

/**
 * `Table` - the card that frames a data table (Figma "Table"): optional card
 * header (title, count badge, supporting text, actions, "more" menu), the
 * table itself and an optional footer slot for a `Pagination`.
 *
 * The row separator is driven from here (`data-dividers`), so cells and rows
 * only need Tailwind `group-data-*` variants - no context.
 */
export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      title,
      badge,
      supportingText,
      actions,
      menu = false,
      onMenuClick,
      dividers = 'line',
      footer,
      tableLabel,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = Boolean(title || badge || supportingText || actions || menu);
    const label = tableLabel ?? (typeof title === 'string' ? title : undefined);

    return (
      <div
        ref={ref}
        data-dividers={dividers}
        className={cn(
          'group/table isolate flex w-full flex-col overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs',
          className,
        )}
        {...rest}
      >
        {hasHeader ? (
          <div className="flex flex-col gap-2xl border-b border-secondary">
            <div className="flex items-start gap-xl px-3xl pt-2xl pb-2xl max-sm:px-xl">
              <div className="flex min-h-13 min-w-0 flex-1 flex-col justify-center gap-xs">
                {title || badge ? (
                  <div className="flex items-center gap-md">
                    {title ? <h3 className="m-0 text-lg leading-7 font-semibold text-primary">{title}</h3> : null}
                    {badge ? (
                      <Badge size="sm" color="Brand">
                        {badge}
                      </Badge>
                    ) : null}
                  </div>
                ) : null}
                {supportingText ? <p className="m-0 truncate text-sm leading-5 text-tertiary">{supportingText}</p> : null}
              </div>
              {actions ? <div className="flex items-center gap-lg max-sm:hidden">{actions}</div> : null}
              {menu ? (
                <button
                  type="button"
                  aria-label="More options"
                  onClick={onMenuClick}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 fg-quinary outline-none transition-colors duration-150 hover:fg-quaternary focus-visible:ring-4 focus-visible:ring-brand-500"
                >
                  <Icon name="more_vert" size="sm" />
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* Scrollable region: focusable so keyboard users can scroll wide tables. */}
        <div
          role="region"
          aria-label={label ? `${label}, scrollable` : 'Table, scrollable'}
          tabIndex={0}
          className="w-full overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        >
          <table aria-label={label} className="m-0 mb-0! w-full border-separate border-spacing-0 text-left">
            {children}
          </table>
        </div>

        {footer ? <div className="[&>nav]:px-3xl [&>nav]:pb-xl max-sm:[&>nav]:px-xl">{footer}</div> : null}
      </div>
    );
  },
);
Table.displayName = 'Table';

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...rest }, ref) => <thead ref={ref} className={className} {...rest} />,
);
TableHead.displayName = 'TableHead';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...rest }, ref) => <tbody ref={ref} className={className} {...rest} />,
);
TableBody.displayName = 'TableBody';

/** A body or header row. Hover, selected and alternating fills live here; the cells stay transparent. */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, disabled = false, className, ...rest }, ref) => (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        'transition-colors duration-150',
        'group-data-[dividers=alternating]/table:even:bg-secondary',
        !disabled && !selected && 'hover:bg-primary-hover',
        selected && 'bg-brand-primary',
        className,
      )}
      {...rest}
    />
  ),
);
TableRow.displayName = 'TableRow';
