import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { clampPage, getPageItems } from './Pagination.utils';
import type { PaginationProps } from './Pagination.types';

/**
 * Pagination — Figma "Pagination" (Page default · Circle × Desktop / Mobile).
 * Desktop: Previous · page numbers (with ellipses) · Next. Mobile (< sm): two
 * icon-only arrows around "Page n of N". Works controlled (`page` +
 * `onPageChange`) or uncontrolled (`defaultPage`). The arrows disable at the
 * first and last page; the current page is marked `aria-current="page"`.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      pageCount,
      page,
      defaultPage = 1,
      onPageChange,
      previousLabel = 'Previous',
      nextLabel = 'Next',
      className,
      'aria-label': ariaLabel = 'Pagination',
      ...rest
    },
    ref,
  ) => {
    const total = Math.max(1, Math.floor(pageCount) || 1);
    const [internalPage, setInternalPage] = useState(defaultPage);
    const current = clampPage(page ?? internalPage, total);

    const goTo = (next: number) => {
      const target = clampPage(next, total);
      if (target === current) return;
      if (page === undefined) setInternalPage(target);
      onPageChange?.(target);
    };

    const isFirst = current <= 1;
    const isLast = current >= total;

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn('flex w-full items-center justify-between border-t border-secondary pt-xl sm:justify-center sm:gap-lg sm:pt-2xl', className)}
        {...rest}
      >
        {/* Mobile: icon-only secondary arrows around the page summary. */}
        <Button
          hierarchy="Secondary gray"
          size="sm"
          aria-label="Previous page"
          disabled={isFirst}
          onClick={() => goTo(current - 1)}
          className="size-9 p-0 sm:hidden"
        >
          <Icon name="arrow_back" size="sm" />
        </Button>
        <p className="text-sm text-secondary sm:hidden" aria-live="polite">
          Page <span className="font-medium">{current}</span> of <span className="font-medium">{total}</span>
        </p>
        <Button
          hierarchy="Secondary gray"
          size="sm"
          aria-label="Next page"
          disabled={isLast}
          onClick={() => goTo(current + 1)}
          className="size-9 p-0 sm:hidden"
        >
          <Icon name="arrow_forward" size="sm" />
        </Button>

        {/* Desktop: Previous · numbers · Next. The outer slots share the free space so the numbers stay centred. */}
        <div className="flex flex-1 items-center max-sm:hidden">
          <Button
            hierarchy="Link gray"
            size="sm"
            iconLeading
            iconLeadingSwap={<Icon name="arrow_back" size="sm" />}
            disabled={isFirst}
            onClick={() => goTo(current - 1)}
            className="disabled:border-transparent disabled:bg-transparent"
          >
            {previousLabel}
          </Button>
        </div>
        <ul className="flex items-start gap-xxs max-sm:hidden">
          {getPageItems(current, total).map((item, index) => (
            <li key={item === 'ellipsis' ? `ellipsis-${index}` : item}>
              {item === 'ellipsis' ? (
                <span aria-hidden="true" className="flex size-10 items-center justify-center text-sm font-medium text-tertiary">
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  aria-label={`Page ${item}`}
                  aria-current={item === current ? 'page' : undefined}
                  onClick={() => goTo(item)}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full text-sm font-medium outline-none',
                    'transition-colors duration-150 ease-in-out',
                    'hover:bg-primary-hover hover:text-secondary-hover',
                    'focus-visible:ring-4 focus-visible:ring-brand-500',
                    item === current ? 'bg-primary-hover text-secondary-hover' : 'text-tertiary',
                  )}
                >
                  {item}
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="flex flex-1 items-center justify-end max-sm:hidden">
          <Button
            hierarchy="Link gray"
            size="sm"
            iconTrailing
            iconTrailingSwap={<Icon name="arrow_forward" size="sm" />}
            disabled={isLast}
            onClick={() => goTo(current + 1)}
            className="disabled:border-transparent disabled:bg-transparent"
          >
            {nextLabel}
          </Button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
