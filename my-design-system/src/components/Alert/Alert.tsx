import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { AlertCloseButton } from './AlertCloseButton';
import { AlertFeaturedIcon } from './AlertFeaturedIcon';
import type { AlertProps } from './Alert.types';

/**
 * Alert — Figma "Alert" (informative / success / warning / error × floating /
 * full-width × Desktop / Mobile). Non-blocking: no focus trap, no auto-hide.
 * Mobile (< sm) is handled by CSS: the full-width banner drops its icon and
 * stacks the actions. Dismissing (X or "Dismiss") only hides the message — the
 * consumer owns the visibility and must never treat it as resolve or undo.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      color = 'informative',
      size = 'floating',
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
  ) => {
    const isFloating = size === 'floating';
    // The informative banner uses filled buttons in Figma; every other variant uses link-style actions.
    const useButtons = !isFloating && color === 'informative';
    const hasActions = Boolean(actionLabel || dismissLabel);

    const actions = hasActions && (
      <div
        className={cn(
          'flex shrink-0 gap-lg',
          // Mobile: the primary action goes on top (DOM order stays Dismiss → action).
          useButtons ? 'max-sm:flex-col-reverse max-sm:[&>*]:w-full sm:items-center sm:gap-md' : 'items-start',
        )}
      >
        {dismissLabel && (
          <Button size={useButtons ? 'md' : 'sm'} hierarchy={useButtons ? 'Secondary gray' : 'Link gray'} onClick={onDismiss}>
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
    );

    const closeButton = showCloseButton && (
      <AlertCloseButton
        aria-label={closeLabel}
        onClick={onDismiss}
        className={cn('absolute top-md right-md', !isFloating && 'sm:static')}
      />
    );

    return (
      <div
        ref={ref}
        // Errors and warnings interrupt the screen reader; informative/success are polite.
        role={color === 'error' || color === 'warning' ? 'alert' : 'status'}
        className={cn(
          'relative border-primary text-sm leading-5',
          isFloating
            ? 'flex gap-xl rounded-xl border bg-primary-alt p-xl shadow-xs'
            : 'bg-primary max-sm:border-t sm:border-b',
          className,
        )}
        {...rest}
      >
        {isFloating ? (
          <>
            <AlertFeaturedIcon color={color} />
            <div className="flex min-w-0 flex-1 flex-col gap-lg">
              <div className="flex flex-col gap-xs pr-4xl">
                <div className="font-semibold text-secondary">{title}</div>
                {supportingText && <div className="text-tertiary">{supportingText}</div>}
              </div>
              {actions}
            </div>
            {closeButton}
          </>
        ) : (
          <div className="mx-auto flex w-full max-w-[1280px] gap-lg px-4xl py-lg max-sm:flex-col max-sm:gap-xl max-sm:px-xl max-sm:py-xl sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-xl">
              <AlertFeaturedIcon color={color} className="max-sm:hidden" />
              <div className="flex min-w-0 flex-1 flex-col gap-[2px] max-sm:pr-4xl sm:flex-row sm:flex-wrap sm:gap-x-[6px]">
                <div className="font-semibold text-secondary">{title}</div>
                {supportingText && <div className="text-tertiary">{supportingText}</div>}
              </div>
            </div>
            {actions}
            {closeButton}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
