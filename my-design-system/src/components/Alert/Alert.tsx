import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { FeedbackCloseButton, FeedbackIcon } from '../FeedbackShared';
import type { AlertProps } from './Alert.types';

/**
 * Alert — Figma "Alert" (info / success / warning / error × Desktop / Mobile).
 * A contextual message inside a delimited area of the interface. Non-blocking:
 * no focus trap, no auto-hide. For page-wide messages use Banner; for brief,
 * self-dismissing feedback use Toast.
 *
 * Desktop: icon · content · close, in a row. Mobile (< sm): icon and close on
 * top, content below. Dismissing (X or "Dismiss") only hides the message — the
 * consumer owns visibility and must never treat it as resolve or undo.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      color = 'info',
      title,
      supportingText,
      actionLabel,
      onAction,
      dismissLabel = 'Dismiss',
      onDismiss,
      showCloseButton = true,
      closeLabel = 'Dismiss alert',
      actionLoading = false,
      className,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      // Errors interrupt the screen reader; everything else is polite.
      role={color === 'error' ? 'alert' : 'status'}
      className={cn(
        'relative flex items-start gap-xl rounded-xl border border-primary bg-primary-alt p-xl text-sm leading-5 shadow-xs max-sm:flex-col',
        className,
      )}
      {...rest}
    >
      {/* Mobile: icon + close share a row. Desktop: `contents` lets them sit either side of the content. */}
      <div className="flex w-full items-start justify-between sm:contents">
        <FeedbackIcon color={color} className="sm:order-1" />
        {showCloseButton && <FeedbackCloseButton aria-label={closeLabel} onClick={onDismiss} className="sm:order-3" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-lg max-sm:w-full sm:order-2">
        <div className="flex flex-col gap-xs sm:pr-4xl">
          <div className="font-semibold text-secondary">{title}</div>
          {supportingText && <div className="text-tertiary">{supportingText}</div>}
        </div>
        {(actionLabel || dismissLabel) && (
          <div className="flex items-start gap-lg">
            {dismissLabel && (
              <Button size="sm" hierarchy="Link gray" onClick={onDismiss}>
                {dismissLabel}
              </Button>
            )}
            {actionLabel && (
              <Button
                size="sm"
                hierarchy="Link color"
                onClick={onAction}
                disabled={actionLoading}
                aria-busy={actionLoading || undefined}
              >
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  ),
);

Alert.displayName = 'Alert';
