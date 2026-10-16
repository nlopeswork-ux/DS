import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { BreadcrumbButton } from './BreadcrumbButton';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

/**
 * Breadcrumbs — Figma "Breadcrumbs" (Desktop / Mobile). A trail of crumbs
 * separated by chevrons; the last is the current page (brand, semibold, not a
 * link). Long trails collapse the middle into "…" (`maxItems`), which expands
 * the full trail when activated. The gap between crumbs is 12px on desktop and
 * 8px on mobile (< sm).
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, maxItems = 4, className, 'aria-label': ariaLabel = 'Breadcrumb', ...rest }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const lastIndex = items.length - 1;
    const keepHead = Math.max(1, maxItems - 2);
    const collapsed = !expanded && items.length > maxItems && items.length - 1 - keepHead >= 2;

    // Indexes to render; `null` marks the collapsed "…" slot.
    const visible: (number | null)[] = collapsed
      ? [...Array.from({ length: keepHead }, (_, i) => i), null, lastIndex]
      : items.map((_, i) => i);

    return (
      <nav ref={ref} aria-label={ariaLabel} className={className} {...rest}>
        <ol className="flex flex-wrap items-center gap-md sm:gap-lg">
          {visible.map((index, position) => (
            <li key={index ?? 'ellipsis'} className={cn('flex items-center gap-md sm:gap-lg')}>
              {position > 0 && <Icon name="chevron_right" size="xs" className="fg-senary shrink-0" aria-hidden="true" />}
              {index === null ? (
                <BreadcrumbButton label="..." ariaLabel="Show hidden pages" onClick={() => setExpanded(true)} />
              ) : (
                <BreadcrumbButton {...items[index]} current={index === lastIndex} className={items[index].icon && !items[index].label ? 'text-quaternary' : undefined} />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
