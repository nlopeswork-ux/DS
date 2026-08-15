import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

export interface TagCloseXProps {
  onClick?: () => void;
  className?: string;
}

/**
 * `_Tag close X` — docs/components/badges-tags.md §5.4. Internal 16×16
 * dismiss button (Icon's `xs` opsz floor, same fixed-size precedent as
 * `BadgeCloseX` — see that component's comment), transparent by default
 * with a `bg-primary-hover` fill on hover.
 */
export const TagCloseX = ({ onClick, className }: TagCloseXProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Remove"
    className={cn(
      'inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] fg-quinary transition-colors duration-150',
      'hover:bg-primary-hover hover:fg-tertiary',
      className,
    )}
  >
    <Icon name="close" size="xs" />
  </button>
);

TagCloseX.displayName = 'TagCloseX';
