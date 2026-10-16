import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type { NavFeaturedCardData } from './SidebarNavigation.types';

/** Ring geometry (Figma "Progress circle" 64px): 58px circle inside a 6px stroke. */
const RING_SIZE = 64;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ progress }: { progress: number }) {
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="size-full -rotate-90" aria-hidden="true">
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" strokeWidth={RING_STROKE} className="stroke-[var(--color-bg-quaternary)]" />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - progress / 100)}
          className="stroke-brand-600"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm leading-5 font-semibold text-primary">{Math.round(progress)}%</span>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-quaternary" aria-hidden="true">
      <div className="h-full rounded-full bg-brand-600" style={{ width: `${progress}%` }} />
    </div>
  );
}

/**
 * Figma "_Nav featured card" — usage / promo card above the account.
 * `Progress bar` (default in Simple) or `Progress circle` (default in Dual-tier).
 */
export function NavFeaturedCard({
  type = 'Progress bar',
  title,
  description,
  progress,
  dismissLabel = 'Dismiss',
  actionLabel = 'Upgrade plan',
  onDismiss,
  onAction,
}: NavFeaturedCardData) {
  const value = Math.min(100, Math.max(0, progress));
  const circle = type === 'Progress circle';

  return (
    <section aria-label={title} className="relative flex w-full flex-col gap-xl rounded-md bg-secondary px-xl py-2xl">
      {circle && <ProgressRing progress={value} />}

      <div className="flex flex-col gap-xs text-sm leading-5">
        <p className={cn('font-semibold text-primary', !circle && 'pr-3xl')}>{title}</p>
        <p className="text-tertiary">{description}</p>
      </div>

      {!circle && <ProgressBar progress={value} />}

      <div className="flex gap-lg">
        <Button hierarchy="Link gray" size="sm" onClick={onDismiss}>
          {dismissLabel}
        </Button>
        <Button hierarchy="Link color" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>

      <button
        type="button"
        aria-label={dismissLabel}
        onClick={onDismiss}
        className={cn(
          'absolute top-2 right-2 flex size-9 items-center justify-center rounded-md text-quaternary outline-none',
          'transition-colors duration-150 ease-in-out hover:bg-primary-hover hover:text-tertiary',
          'focus-visible:ring-4 focus-visible:ring-brand-500',
        )}
      >
        <Icon name="close" size="sm" />
      </button>
    </section>
  );
}
