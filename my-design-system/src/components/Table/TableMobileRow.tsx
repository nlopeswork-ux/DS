import { useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { TableMobileRowProps } from './Table.types';

/**
 * `TableMobileRow` - the mobile form of a row (Figma "Breakpoint=Mobile"). The columns
 * collapse into one line (lead and status) with a chevron that reveals the other
 * columns as label/value pairs. Use it inside a `Table`-looking card instead of `<table>`.
 */
export const TableMobileRow = ({ lead, trailing, details = [], selected = false, open, defaultOpen = false, onOpenChange }: TableMobileRowProps) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const panelId = useId();
  const isOpen = open ?? innerOpen;

  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };

  return (
    <li className={cn('list-none border-b border-secondary', selected && 'bg-brand-primary')}>
      <div className="flex items-center gap-lg px-xl py-lg">
        <div className="flex min-w-0 flex-1 items-center gap-lg">{lead}</div>
        {trailing}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={isOpen ? 'Collapse row' : 'Expand row'}
          onClick={toggle}
          className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 fg-tertiary outline-none hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-brand-500"
        >
          <Icon name="expand_more" size="sm" className={cn('transition-transform duration-150', isOpen && 'rotate-180')} />
        </button>
      </div>
      {isOpen && details.length > 0 ? (
        <dl id={panelId} className="m-0 grid grid-cols-[auto_1fr] items-center gap-x-3xl gap-y-lg px-xl pb-xl text-sm leading-5">
          {details.map(({ label, value }, index) => (
            <div key={index} className="contents">
              <dt className="font-medium text-secondary">{label}</dt>
              <dd className="m-0 text-tertiary">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </li>
  );
};
