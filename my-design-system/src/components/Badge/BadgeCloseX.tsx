import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { colorStyles } from './colorStyles';
import type { BadgeColor } from './Badge.types';

export interface BadgeCloseXProps {
  color: BadgeColor;
  /** `Square` (3px corner radius) when the parent Badge is a `Badge color`/`Badge modern`; `Rounded` (pill) when it's a `Pill color`/`Pill outline`. */
  rounded: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * `_Badge close X` — docs/components/badges-tags.md §3. Internal 16×16
 * dismiss button, transparent by default with a `utility-{color}-100`
 * hover fill. No `state` prop — Default/Hover is governed by the real
 * `:hover` pseudo-class, matching how Button's hierarchies use `hover:`.
 */
export const BadgeCloseX = ({ color, rounded, onClick, className }: BadgeCloseXProps) => {
  const styles = colorStyles[color];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className={cn(
        // No padding: Icon's `xs` (16px) is already the smallest box the
        // Material Symbols `opsz` axis renders cleanly at (see Badge.tsx),
        // so it fills this button's 16×16 frame exactly.
        'inline-flex size-4 shrink-0 items-center justify-center transition-colors duration-150',
        rounded ? 'rounded-full' : 'rounded-[3px]',
        styles.closeIdle,
        styles.hoverBg,
        styles.closeHoverText,
        className,
      )}
    >
      <Icon name="close" size="xs" />
    </button>
  );
};

BadgeCloseX.displayName = 'BadgeCloseX';
