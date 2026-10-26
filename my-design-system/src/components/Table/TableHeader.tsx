import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { HelpIcon } from '../HelpIcon';
import { Icon } from '../Icon';
import type { TableHeaderProps } from './Table.types';

/**
 * `Table header` - the column label (Figma "Table header"): `text-xs` medium
 * in `text-tertiary`, an optional help icon and an optional sort arrow.
 * With `onClick` the label becomes a button, so sorting is keyboard reachable.
 */
export const TableHeader = forwardRef<HTMLElement, TableHeaderProps>(
  ({ children, helpIcon = false, helpText = 'More information', sort = 'none', hover = false, onClick, className, ...rest }, ref) => {
    const content = (
      <>
        <span>{children}</span>
        {helpIcon ? <HelpIcon tooltipText={helpText} cursor={false} aria-label={helpText} /> : null}
        {sort !== 'none' ? <Icon name={sort === 'asc' ? 'arrow_upward' : 'arrow_downward'} size="xs" className="fg-quaternary" /> : null}
      </>
    );
    const classes = cn(
      'inline-flex items-center gap-xs text-xs font-medium whitespace-nowrap transition-colors duration-150',
      hover ? 'text-tertiary-hover' : 'text-tertiary',
      onClick && 'cursor-pointer hover:text-tertiary-hover',
      className,
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          className={cn(classes, 'rounded-xs border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-500')}
          {...(rest as object)}
        >
          {content}
        </button>
      );
    }
    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={classes} {...rest}>
        {content}
      </span>
    );
  },
);
TableHeader.displayName = 'TableHeader';
