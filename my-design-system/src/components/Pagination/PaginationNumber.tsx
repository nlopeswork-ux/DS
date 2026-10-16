import { cn } from '../../utils/cn';

/** Forced visual state (Storybook previews). `Default` leaves hover and focus to the browser. */
export type PaginationNumberState = 'Default' | 'Hover/active' | 'Focused';

interface PaginationNumberProps {
  page: number;
  current?: boolean;
  /** Forces a visual state for previews. */
  state?: PaginationNumberState;
  onClick?: () => void;
}

/**
 * Figma "_Pagination number base" (Shape=Circle · State=Default / Hover/active / Focused):
 * a 40px circle. Hover and the current page share the same fill and darker label.
 */
export function PaginationNumber({ page, current = false, state = 'Default', onClick }: PaginationNumberProps) {
  const active = current || state === 'Hover/active';
  return (
    <button
      type="button"
      aria-label={`Page ${page}`}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
      className={cn(
        'flex size-10 items-center justify-center rounded-full text-sm font-medium outline-none',
        'transition-colors duration-150 ease-in-out',
        'hover:bg-primary-hover hover:text-secondary-hover',
        // Focus ring: 2px page-coloured gap + 2px ring, over the hover fill (Figma "Focused").
        'focus-visible:bg-primary-hover focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        state === 'Focused' && 'bg-primary-hover ring-2 ring-brand-500 ring-offset-2',
        active ? 'bg-primary-hover text-secondary-hover' : 'text-tertiary',
      )}
    >
      {page}
    </button>
  );
}
