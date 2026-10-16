import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { FeedbackCloseButton, FeedbackIcon } from '../FeedbackShared';
import type { BannerProps } from './Banner.types';

/**
 * Banner — Figma "Banner" (info / success / warning / error × Desktop / Mobile).
 * A message that spans the whole page or a section; it stays visible until
 * dismissed or resolved and is never auto-dismissed. Place it at the top of the
 * affected page or section.
 *
 * Desktop: one row (icon · title + supporting text · actions · close) with a
 * bottom border. Mobile (< sm): text next to the icon, actions below, close
 * pinned top-right, top border. `info` uses Secondary + Primary buttons
 * (stacked, primary first, on mobile); the other colours use two small links.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
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
      closeLabel = 'Dismiss banner',
      actionLoading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const useButtons = color === 'info';
    const hasActions = Boolean(actionLabel || dismissLabel);

    return (
      <div
        ref={ref}
        // Errors interrupt the screen reader; everything else is polite.
        // For a banner present on initial page load pass `role="region"` + `aria-label`.
        role={color === 'error' ? 'alert' : 'status'}
        className={cn('relative border-primary bg-primary text-sm leading-5 max-sm:border-t sm:border-b', className)}
        {...rest}
      >
        <div className="mx-auto flex w-full max-w-[1280px] gap-lg px-4xl py-lg max-sm:flex-col max-sm:gap-xl max-sm:px-xl max-sm:py-xl sm:items-center">
          <div className="flex min-w-0 flex-1 items-start gap-xl sm:items-center">
            <FeedbackIcon color={color} />
            <div className="flex min-w-0 flex-1 flex-col gap-[2px] max-sm:pr-4xl sm:flex-row sm:flex-wrap sm:gap-x-[6px]">
              <div className="font-semibold text-secondary">{title}</div>
              {supportingText && <div className="text-tertiary">{supportingText}</div>}
            </div>
          </div>

          {hasActions && (
            <div
              className={cn(
                'flex shrink-0 gap-lg',
                // Mobile: the primary action goes on top (DOM order stays Dismiss → action).
                useButtons ? 'max-sm:flex-col-reverse max-sm:[&>*]:w-full sm:items-center sm:gap-md' : 'items-start',
              )}
            >
              {dismissLabel && (
                <Button
                  size={useButtons ? 'md' : 'sm'}
                  hierarchy={useButtons ? 'Secondary gray' : 'Link gray'}
                  onClick={onDismiss}
                >
                  {dismissLabel}
                </Button>
              )}
              {actionLabel && (
                <Button
                  size={useButtons ? 'md' : 'sm'}
                  hierarchy={useButtons ? 'Primary' : 'Link color'}
                  onClick={onAction}
                  disabled={actionLoading}
                  aria-busy={actionLoading || undefined}
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          )}

          {showCloseButton && (
            <FeedbackCloseButton aria-label={closeLabel} onClick={onDismiss} className="max-sm:absolute max-sm:top-md max-sm:right-md" />
          )}
        </div>
      </div>
    );
  },
);

Banner.displayName = 'Banner';
