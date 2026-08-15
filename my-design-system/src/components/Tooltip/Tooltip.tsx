import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { TooltipArrow, TooltipProps } from './Tooltip.types';

const DEFAULT_SUPPORTING_TEXT =
  'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.';

/**
 * docs/components/feedback-visuals.md §2.2 — pointer triangle per edge,
 * an 8px square rotated 45° and half-overlapped into the box it points
 * away from (`bg-primary-solid`, no separate shadow to avoid doubling
 * the box's own `shadow-lg`).
 */
const arrowPositionStyles: Record<Exclude<TooltipArrow, 'None'>, string> = {
  Top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  Bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  Left: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
  Right: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
};

/**
 * Tooltip — docs/components/feedback-visuals.md §2. A static overlay with
 * no interactive states of its own (no hover/focus/disabled) — visibility
 * and positioning are owned by the consumer (see `HelpIcon`, which shows
 * one on `open`).
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      text = 'This is a tooltip',
      supportingText = false,
      supportingTextContent = DEFAULT_SUPPORTING_TEXT,
      arrow = 'None',
      role = 'tooltip',
      className,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      role={role}
      className={cn('relative inline-flex max-w-[280px] flex-col', className)}
      {...rest}
    >
      {arrow !== 'None' && (
        <span
          aria-hidden="true"
          className={cn('absolute size-2 rotate-45 bg-primary-solid', arrowPositionStyles[arrow])}
        />
      )}
      <div
        className={cn(
          'flex flex-col rounded-md bg-primary-solid shadow-lg',
          supportingText ? 'gap-xs p-lg' : 'px-lg py-md',
        )}
      >
        <p className="text-xs leading-[18px] font-semibold text-white">{text}</p>
        {supportingText && (
          <p className="text-xs leading-[18px] font-medium text-tooltip-supporting">{supportingTextContent}</p>
        )}
      </div>
    </div>
  ),
);

Tooltip.displayName = 'Tooltip';
