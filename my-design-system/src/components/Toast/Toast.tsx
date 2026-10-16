import { forwardRef, useEffect, useRef, useState } from 'react';
import type { FocusEvent } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { FeedbackCloseButton, FeedbackIcon } from '../FeedbackShared';
import { resolveToastDuration } from './Toast.utils';
import type { ToastProps } from './Toast.types';

/**
 * Toast — Figma "Toast" (info / success / warning / error × Desktop / Mobile).
 * Brief, elevated, self-dismissing feedback. At most one action, which must also
 * be available elsewhere. The auto-dismiss timer pauses while hovered or focused
 * and never moves focus. Use `ToastProvider` + `useToast` to position, limit and
 * de-duplicate toasts; render `Toast` directly only for previews.
 *
 * Desktop: icon · content · close, in a row. Mobile (< sm): icon and close on
 * top, content and action below.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      color = 'info',
      title,
      supportingText,
      actionLabel,
      onAction,
      onDismiss,
      showCloseButton = true,
      closeLabel = 'Dismiss notification',
      duration,
      restartKey = 0,
      actionLoading = false,
      className,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const total = resolveToastDuration(color, Boolean(actionLabel), duration);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const paused = hovered || focused;

    const remaining = useRef(total);
    const onDismissRef = useRef(onDismiss);
    useEffect(() => {
      onDismissRef.current = onDismiss;
    });

    // A new duration or restart resets the clock…
    useEffect(() => {
      remaining.current = total;
    }, [total, restartKey]);

    // …and hover/focus pause it, keeping the time that is left.
    useEffect(() => {
      if (total === null || paused) return;
      const startedAt = Date.now();
      const id = window.setTimeout(() => onDismissRef.current?.(), remaining.current ?? total);
      return () => {
        window.clearTimeout(id);
        remaining.current = (remaining.current ?? total) - (Date.now() - startedAt);
      };
    }, [total, paused, restartKey]);

    return (
      <div
        ref={ref}
        // Errors are assertive; everything else is polite. Focus is never moved here.
        role={color === 'error' ? 'alert' : 'status'}
        className={cn(
          'relative flex items-start gap-xl rounded-xl border border-primary bg-primary-alt p-xl text-sm leading-5 shadow-lg max-sm:w-full max-sm:flex-col sm:w-[384px] sm:min-w-[320px] sm:max-w-[384px]',
          className,
        )}
        onMouseEnter={(event) => {
          setHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setHovered(false);
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          onBlur?.(event);
        }}
        {...rest}
      >
        {/* Mobile: icon + close share a row. Desktop: `contents` lets them sit either side of the content. */}
        <div className="flex w-full items-center justify-between sm:contents">
          <FeedbackIcon color={color} variant="outline" className="sm:order-1" />
          {showCloseButton && <FeedbackCloseButton aria-label={closeLabel} onClick={onDismiss} className="sm:order-3" />}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-lg max-sm:w-full sm:order-2">
          <div className="flex flex-col gap-xs sm:pr-4xl">
            <div className="font-semibold text-secondary">{title}</div>
            {supportingText && <div className="text-tertiary">{supportingText}</div>}
          </div>
          {actionLabel && (
            <div className="flex items-center max-sm:mt-xs">
              <Button
                size="sm"
                hierarchy="Link color"
                onClick={onAction}
                disabled={actionLoading}
                aria-busy={actionLoading || undefined}
              >
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Toast.displayName = 'Toast';
