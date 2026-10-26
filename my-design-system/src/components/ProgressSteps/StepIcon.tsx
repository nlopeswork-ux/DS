import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { ProgressStepStatus, ProgressStepsSize } from './ProgressSteps.types';

interface StepIconProps {
  status: ProgressStepStatus;
  size: ProgressStepsSize;
  /** Forces the focus ring for previews. In product code the ring follows keyboard focus of the parent `group`. */
  focused?: boolean;
}

/** Circle, dot and check measures per size - Figma "_Step icon base" (24 / 32 / 40). */
const sizeStyles: Record<ProgressStepsSize, { circle: string; dot: string; border: string; check: number }> = {
  sm: { circle: 'size-6', dot: 'size-2', border: 'border-[1.5px]', check: 16 }, // ds-allow-hardcode: Figma sm outline is exactly 1.5px
  md: { circle: 'size-8', dot: 'size-2.5', border: 'border-2', check: 22 },
  lg: { circle: 'size-10', dot: 'size-3', border: 'border-2', check: 28 },
};

/**
 * Figma "_Step icon base" (Status × Size × State). Incomplete is an outlined circle with a grey dot,
 * Current a solid brand circle with a white dot and a permanent focus-style ring, Complete a solid
 * brand circle with a check. The check is the Icon set's `check` glyph, not the Figma example asset.
 */
export function StepIcon({ status, size, focused = false }: StepIconProps) {
  const { circle, dot, border, check } = sizeStyles[size];
  const solid = status !== 'Incomplete';
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative z-10 flex shrink-0 items-center justify-center rounded-full',
        circle,
        solid ? 'bg-brand-solid' : cn('bg-disabled-subtle border-solid border-disabled-subtle', border),
        // Ring = 2px page-coloured gap + 2px brand ring (Figma 2px bg-primary + 4px focus-ring shadows).
        'ring-brand-500 ring-offset-2 group-focus-visible:ring-2',
        (status === 'Current' || focused) && 'ring-2',
      )}
    >
      {status === 'Complete' ? (
        <Icon name="check" weight={600} color="var(--color-fg-white)" className="size-auto" style={{ fontSize: check, width: check, height: check }} />
      ) : (
        <span className={cn('rounded-full', dot, status === 'Current' ? 'bg-[var(--color-fg-white)]' : 'bg-[var(--color-fg-disabled-subtle)]')} />
      )}
    </span>
  );
}
