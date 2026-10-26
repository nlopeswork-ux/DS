import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { StepIcon } from './StepIcon';
import type { ProgressStepStatus, ProgressStepsProps, ProgressStepsSize } from './ProgressSteps.types';

/** Per-size text and spacing - Figma "_Step base" rows are 66 / 86 / 88px tall. */
const textStyles: Record<ProgressStepsSize, { text: string; padding: string }> = {
  sm: { text: 'text-sm', padding: 'pt-xxs pb-2xl' },
  md: { text: 'text-base', padding: 'pt-xs pb-4xl' },
  lg: { text: 'text-lg', padding: 'pt-1.5 pb-3xl' },
};

/** Height of the icon, so the horizontal line can be centred on it. */
const iconHeight: Record<ProgressStepsSize, string> = { sm: 'h-6', md: 'h-8', lg: 'h-10' };

/** Gap between icons of the minimal layout (Figma 12 / 16 / 20). */
const minimalGap: Record<ProgressStepsSize, string> = { sm: 'gap-lg', md: 'gap-xl', lg: 'gap-2xl' };

const statusLabel: Record<ProgressStepStatus, string> = { Complete: 'completed', Current: 'current step', Incomplete: 'not started' };

const lineColor = (filled: boolean) => (filled ? 'bg-[var(--color-fg-brand-primary)]' : 'bg-quaternary');

/**
 * Progress steps - Figma "Progress steps" (Icons centered | Icons with text | Minimal icons | Minimal icons connected).
 * Status comes from `currentStep`: earlier steps are complete, the current one is marked
 * `aria-current="step"`, later ones are incomplete. Pass `onStepClick` to turn every step into a button.
 * "Icons centered" collapses to the vertical "Icons with text" list below the `sm` breakpoint.
 */
export const ProgressSteps = forwardRef<HTMLElement, ProgressStepsProps>(
  (
    {
      steps,
      currentStep = 1,
      type = 'Icons centered',
      size = 'md',
      connector = true,
      showText = false,
      onStepClick,
      className,
      'aria-label': ariaLabel = 'Progress',
      ...rest
    },
    ref,
  ) => {
    const total = steps.length;
    const current = Math.min(Math.max(Math.floor(currentStep) || 1, 1), Math.max(total, 1));
    const statusOf = (index: number): ProgressStepStatus => (index + 1 < current ? 'Complete' : index + 1 === current ? 'Current' : 'Incomplete');

    const minimal = type === 'Minimal icons' || type === 'Minimal icons connected';
    const connected = type === 'Minimal icons connected';
    const centered = type === 'Icons centered';

    /** A button when the steps are interactive, otherwise a plain box with the same layout. */
    const StepBox = ({ index, className: boxClassName, children }: { index: number; className: string; children: ReactNode }) =>
      onStepClick ? (
        <button type="button" onClick={() => onStepClick(index + 1)} className={cn('group cursor-pointer outline-none', boxClassName)}>
          {children}
        </button>
      ) : (
        <div className={boxClassName}>{children}</div>
      );

    const srOnly = (index: number) => (
      <span className="sr-only">
        {steps[index].title} ({statusLabel[statusOf(index)]})
      </span>
    );

    if (minimal) {
      return (
        <nav ref={ref} aria-label={ariaLabel} className={cn('flex w-full items-center justify-center', minimalGap[size], className)} {...rest}>
          {showText && !connected && <p className="text-sm font-medium whitespace-nowrap text-secondary">{`Step ${current} of ${total}`}</p>}
          <ol className={cn('flex items-center', !connected && minimalGap[size])}>
            {steps.map((step, index) => (
              <li key={step.title} aria-current={statusOf(index) === 'Current' ? 'step' : undefined} className="flex items-center">
                <StepBox index={index} className="flex">
                  <StepIcon status={statusOf(index)} size={size} />
                  {srOnly(index)}
                </StepBox>
                {connected && index < total - 1 && <span aria-hidden="true" className={cn('h-0.5 w-20 rounded-full', lineColor(index + 1 < current))} />}
              </li>
            ))}
          </ol>
        </nav>
      );
    }

    const { text, padding } = textStyles[size];
    return (
      <nav ref={ref} aria-label={ariaLabel} className={cn('w-full', className)} {...rest}>
        <ol className={cn('flex flex-col', centered && 'sm:flex-row')}>
          {steps.map((step, index) => {
            const status = statusOf(index);
            const isLast = index === total - 1;
            const brand = status === 'Current';
            return (
              <li key={step.title} aria-current={brand ? 'step' : undefined} className={cn('relative', centered && 'sm:flex-1 sm:px-md')}>
                {/* Desktop "Icons centered": line from this icon's centre to the next one's. */}
                {centered && !isLast && (
                  <span aria-hidden="true" className={cn('absolute left-1/2 z-0 flex w-full items-center max-sm:hidden', iconHeight[size])}>
                    <span className={cn('h-0.5 w-full rounded-full', lineColor(index + 1 < current))} />
                  </span>
                )}
                <StepBox index={index} className={cn('flex w-full flex-row gap-xl text-left', centered && 'sm:flex-col sm:items-center sm:text-center')}>
                  <span className="flex flex-col items-center">
                    <StepIcon status={status} size={size} />
                    {/* Vertical connector: mobile "Icons centered", and "Icons with text" when enabled. */}
                    {!isLast && (centered || connector) && (
                      <span aria-hidden="true" className={cn('my-xs w-0.5 flex-1 rounded-full', lineColor(index + 1 < current), centered && 'sm:hidden')} />
                    )}
                  </span>
                  <span className={cn('flex flex-col gap-xxs', text, padding, centered && 'sm:w-full sm:pb-0')}>
                    <span className={cn('font-semibold', brand ? 'text-brand-secondary' : 'text-secondary')}>{step.title}</span>
                    {step.description && <span className={brand ? 'text-brand-tertiary' : 'text-tertiary'}>{step.description}</span>}
                    <span className="sr-only">({statusLabel[status]})</span>
                  </span>
                </StepBox>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

ProgressSteps.displayName = 'ProgressSteps';
