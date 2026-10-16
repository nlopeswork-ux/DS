import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { BreadcrumbItem, BreadcrumbState } from './Breadcrumbs.types';

interface BreadcrumbButtonProps extends Omit<BreadcrumbItem, 'state'> {
  current?: boolean;
  state?: BreadcrumbState;
  className?: string;
}

/** Figma "_Breadcrumb button base" — Current × Icon × State (Default / Hover / Focused). */
export function BreadcrumbButton({ label, icon, ariaLabel, href, onClick, current = false, state = 'Default', className }: BreadcrumbButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-md rounded-xs text-sm leading-5 whitespace-nowrap outline-none',
    'transition-colors duration-150 ease-in-out',
    // Focus ring: 2px page-coloured gap + 2px ring (Figma focus-ring on bg-primary).
    'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
    state === 'Focused' && 'ring-2 ring-brand-500 ring-offset-2',
    className,
  );

  const content = (
    <>
      {icon && <Icon name={icon} size="sm" className="shrink-0" />}
      {label}
    </>
  );

  if (current) {
    // The current page: brand colour, semibold, not interactive.
    return (
      <span aria-current="page" aria-label={ariaLabel} className={cn(base, 'font-semibold text-brand-secondary')}>
        {content}
      </span>
    );
  }

  const tone = cn(
    label ? 'font-medium' : 'text-quaternary',
    // Icon-only crumbs keep the icon colour (#667085); text crumbs go gray-600 → gray-700 on hover.
    label ? (state === 'Hover' ? 'text-secondary' : 'text-tertiary hover:text-secondary') : state === 'Hover' ? 'text-tertiary' : 'hover:text-tertiary',
  );

  return href ? (
    <a href={href} onClick={onClick} aria-label={ariaLabel} className={cn(base, tone)}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cn(base, tone)}>
      {content}
    </button>
  );
}
