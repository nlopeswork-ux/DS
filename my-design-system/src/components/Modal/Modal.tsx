import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { ModalCloseButton } from './ModalCloseButton';
import { ModalFeaturedIcon } from './ModalFeaturedIcon';
import type { ModalProps, ModalSize } from './Modal.types';

/**
 * Dialog widths measured from the Figma variants (1440px desktop frame).
 * On mobile (< sm) `sm` and `md` become a bottom sheet; `lg`/`full` become full screen.
 */
const sizeStyles: Record<ModalSize, string> = {
  sm: 'sm:w-[400px] max-sm:w-full',
  md: 'sm:w-[640px] sm:max-h-[calc(100%-4rem)] max-sm:w-full max-sm:max-h-full',
  lg: 'sm:w-[1024px] sm:max-h-[calc(100%-4rem)] max-sm:h-full',
  full: 'sm:h-[calc(100%-4rem)] sm:w-[calc(100%-4rem)] max-sm:h-full',
};

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Modal — Figma "Modal" (sm / md / lg / full screen × Desktop / Mobile).
 * Controlled (`open` + `onClose`). Locks page scroll, traps focus and restores it
 * on close; Esc and overlay clicks only *request* closure so the consumer can
 * enforce a required confirmation. Use `inline` to render in place (Storybook).
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      size = 'sm',
      title,
      subtitle,
      icon,
      iconTone = size === 'sm' ? 'success' : 'brand',
      children,
      footerStart,
      actions,
      dividers,
      onClose,
      dismissOnEsc = true,
      dismissOnOverlay = true,
      closeLabel = 'Close',
      inline = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const titleId = useId();
    const descriptionId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => dialogRef.current as HTMLDivElement);

    const isCompact = size === 'sm';
    /** Mobile bottom sheet (16px gutter, 80px bottom) — `sm` and `md`. */
    const isSheet = size === 'sm' || size === 'md';
    const showDividers = dividers ?? !isCompact;

    // Scroll lock + focus restore (skipped for in-place previews).
    useEffect(() => {
      if (!open || inline) return;
      const previouslyFocused = document.activeElement as HTMLElement | null;
      const { overflow } = document.body.style;
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
      return () => {
        document.body.style.overflow = overflow;
        previouslyFocused?.focus?.();
      };
    }, [open, inline]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape' && dismissOnEsc) {
          event.stopPropagation();
          onClose?.();
          return;
        }
        if (event.key !== 'Tab' || inline) return;
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) {
          event.preventDefault();
          return;
        }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      },
      [dismissOnEsc, inline, onClose],
    );

    if (!open) return null;

    const hasFooter = Boolean(actions || footerStart);

    const content = (
      <div
        className={cn(
          inline ? 'absolute' : 'fixed',
          'inset-0 z-50 flex justify-center',
          isSheet ? 'items-center max-sm:items-end max-sm:px-xl max-sm:pt-xl max-sm:pb-[80px]' : 'items-center',
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Background overlay — 70% bg-overlay + 8px backdrop blur */}
        <div
          aria-hidden="true"
          className="absolute inset-0 backdrop-blur-[8px]"
          onClick={dismissOnOverlay ? onClose : undefined}
        >
          <div className="absolute inset-0 bg-overlay opacity-70" />
        </div>

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={subtitle ? descriptionId : undefined}
          tabIndex={-1}
          className={cn(
            'relative flex min-h-0 max-w-full flex-col overflow-hidden bg-primary shadow-xl outline-none',
            isSheet ? 'rounded-xl' : 'sm:rounded-xl',
            sizeStyles[size],
            className,
          )}
          {...rest}
        >
          <header
            className={cn(
              'relative flex shrink-0 flex-col gap-xl px-xl pt-2xl sm:px-3xl sm:pt-3xl',
              isCompact ? 'pb-0' : 'pb-xl max-sm:gap-0 sm:flex-row sm:gap-xl',
              showDividers && 'border-b border-secondary',
            )}
          >
            {icon && <ModalFeaturedIcon name={icon} tone={iconTone} className={cn(!isCompact && 'max-sm:hidden')} />}
            <div className={cn('flex min-w-0 flex-1 flex-col gap-xs', !isCompact && 'pr-10')}>
              {/* div+role (not h2/p) so Storybook's global docs heading/paragraph styles never leak into the dialog */}
              <div id={titleId} role="heading" aria-level={2} className="text-lg leading-7 font-semibold text-primary">
                {title}
              </div>
              {subtitle && (
                <div id={descriptionId} className="text-sm leading-5 text-tertiary">
                  {subtitle}
                </div>
              )}
            </div>
            <ModalCloseButton aria-label={closeLabel} onClick={onClose} className="absolute top-3 right-3" />
          </header>

          {children && (
            <div className={cn('min-h-0 flex-1 overflow-y-auto', isCompact ? 'px-xl pt-xl sm:px-3xl' : 'px-xl pt-2xl sm:p-3xl')}>
              {children}
            </div>
          )}

          {hasFooter && (
            <footer
              className={cn(
                'flex shrink-0 gap-lg px-xl pb-xl pt-3xl sm:px-3xl sm:pb-3xl sm:pt-2xl',
                'max-sm:flex-col sm:items-center',
                showDividers && 'sm:border-t sm:border-secondary',
              )}
            >
              {!isCompact && footerStart && <div className="flex items-center max-sm:hidden">{footerStart}</div>}
              <div
                className={cn(
                  'flex gap-lg max-sm:flex-col-reverse max-sm:[&>*]:w-full',
                  'sm:ml-auto sm:items-center',
                  isCompact && 'sm:flex-1 sm:[&>*]:flex-1',
                )}
              >
                {actions}
              </div>
            </footer>
          )}
        </div>
      </div>
    );

    return inline ? content : createPortal(content, document.body);
  },
);

Modal.displayName = 'Modal';
