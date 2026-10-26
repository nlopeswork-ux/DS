import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { StepIcon } from './StepIcon';
import type { ProgressStepStatus, ProgressStepsOrientation, ProgressStepsProps, ProgressStepsSize } from './ProgressSteps.types';

/** Per-size text and spacing - Figma "_Step base" rows are 66 / 86 / 88px tall. */
const textStyles: Record<ProgressStepsSize, { text: string; padding: string }> = {
  sm: { text: 'text-sm', padding: 'pt-xxs pb-2xl' },
  md: { text: 'text-base', padding: 'pt-xs pb-4xl' },
  lg: { text: 'text-lg', padding: 'pt-1.5 pb-3xl' },
};

/** Height of the icon, so the horizontal line can be centred on it. */
const iconHeight: Record<ProgressStepsSize, string> = { sm: 'h-6', md: 'h-8', lg: 'h-10' };

/** Gap between icons of the minimal content (Figma 12 / 16 / 20). */
const minimalGap: Record<ProgressStepsSize, string> = { sm: 'gap-lg', md: 'gap-xl', lg: 'gap-2xl' };

/**
 * Classes that only apply when the steps run horizontally. Written out in full per orientation
 * (never built by string concatenation) so Tailwind can see them: `auto` switches at the
 * container's 512px (`@lg`), `vertical` never applies them.
 */
const whenHorizontal: Record<ProgressStepsOrientation, { list: string; item: string; box: string; body: string; line: string; connector: string }> = {
  horizontal: {
    list: 'flex-row',
    item: 'flex-1 px-md',
    box: 'flex-col items-center text-center',
    body: 'w-full pb-0',
    line: 'flex',
    connector: 'hidden',
  },
  auto: {
    list: '@lg:flex-row',
    item: '@lg:flex-1 @lg:px-md',
    box: '@lg:flex-col @lg:items-center @lg:text-center',
    body: '@lg:w-full @lg:pb-0',
    line: '@max-lg:hidden flex',
    connector: '@lg:hidden',
  },
  vertical: { list: '', item: '', box: '', body: '', line: 'hidden', connector: '' },
};

const statusLabel: Record<ProgressStepStatus, string> = { Complete: 'completed', Current: 'current step', Incomplete: 'not started' };

const lineColor = (filled: boolean) => (filled ? 'bg-[var(--color-fg-brand-primary)]' : 'bg-quaternary');

/**
 * Progress steps - Figma "Progress steps". Two orientations (horizontal, vertical, or `auto` from the
 * container width), two contents (title and supporting text, or icons only) and an optional connector.
 * Status comes from `currentStep`: earlier steps are complete, the current one is marked
 * `aria-current="step"`, later ones are incomplete. Pass `onStepClick` to turn every step into a button.
 */
export const ProgressSteps = forwardRef<HTMLElement, ProgressStepsProps>(
  (
    {
      steps,
      currentStep = 1,
      orientation = 'auto',
      content = 'text',
      size = 'md',
      connector = true,
      showStepLabel = false,
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

    /** A button when the steps are interactive, otherwise a plain box with the same layout. */
    const StepBox = ({ className: boxClassName, index, children }: { className: string; index: number; children: ReactNode }) =>
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

    if (content === 'minimal') {
      // Minimal content has no text to reflow, so `auto` stays horizontal.
      const vertical = orientation === 'vertical';
      return (
        <nav ref={ref} aria-label={ariaLabel} className={cn('flex w-full items-center justify-center', vertical && 'flex-col', minimalGap[size], className)} {...rest}>
          {showStepLabel && <span className="text-sm font-medium whitespace-nowrap text-secondary">{`Step ${current} of ${total}`}</span>}
          <ol className={cn('flex items-center', vertical && 'flex-col', !connector && minimalGap[size])}>
            {steps.map((step, index) => (
              <li key={step.title} aria-current={statusOf(index) === 'Current' ? 'step' : undefined} className={cn('flex items-center', vertical && 'flex-col')}>
                <StepBox index={index} className="flex">
                  <StepIcon status={statusOf(index)} size={size} />
                  {srOnly(index)}
                </StepBox>
                {connector && index < total - 1 && (
                  <span aria-hidden="true" className={cn('rounded-full', vertical ? 'h-8 w-0.5' : 'h-0.5 w-20', lineColor(index + 1 < current))} />
                )}
              </li>
            ))}
          </ol>
        </nav>
      );
    }

    const { text, padding } = textStyles[size];
    const h = whenHorizontal[orientation];
    return (
      <nav ref={ref} aria-label={ariaLabel} className={cn('@container w-full', className)} {...rest}>
        <ol className={cn('flex flex-col', h.list)}>
          {steps.map((step, index) => {
            const status = statusOf(index);
            const isLast = index === total - 1;
            const brand = status === 'Current';
            const filled = index + 1 < current;
            return (
              <li key={step.title} aria-current={brand ? 'step' : undefined} className={cn('relative', h.item)}>
                {/* Horizontal: line from this icon's centre to the next one's. */}
                {connector && !isLast && orientation !== 'vertical' && (
                  <span aria-hidden="true" className={cn('absolute left-1/2 z-0 w-full items-center', h.line, iconHeight[size])}>
                    <span className={cn('h-0.5 w-full rounded-full', lineColor(filled))} />
                  </span>
                )}
                <StepBox index={index} className={cn('flex w-full flex-row gap-xl text-left', h.box)}>
                  <span className="flex flex-col items-center">
                    <StepIcon status={status} size={size} />
                    {/* Vertical: connector below the icon. */}
                    {connector && !isLast && orientation !== 'horizontal' && (
                      <span aria-hidden="true" className={cn('my-xs w-0.5 flex-1 rounded-full', lineColor(filled), h.connector)} />
                    )}
                  </span>
                  <span className={cn('flex flex-col gap-xxs', text, padding, h.body)}>
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
