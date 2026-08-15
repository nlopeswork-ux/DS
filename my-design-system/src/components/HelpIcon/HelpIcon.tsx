import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import type { HelpIconProps } from './HelpIcon.types';

/**
 * docs/components/feedback-visuals.md §3.2 — tooltip position relative to
 * the 16×16 icon, one per `tooltipArrow` value. The tooltip's own arrow
 * points back at the icon, so it sits on the box edge closest to it.
 */
const tooltipPositionStyles: Record<NonNullable<HelpIconProps['tooltipArrow']>, string> = {
  None: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  Bottom: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  Top: 'top-full left-1/2 mt-2.5 -translate-x-1/2',
  Left: 'right-full top-1/2 mr-2.5 -translate-y-1/2',
  Right: 'left-full top-1/2 ml-2.5 -translate-y-1/2',
};

/**
 * HelpIcon — docs/components/feedback-visuals.md §3. A composed wrapper
 * that instances the `Tooltip` component on hover/focus (real
 * `:hover`/`:focus-within`, matching `AvatarAddButton`'s pattern — see
 * that component for the same CSS-only approach), plus an optional `open`
 * prop to force the tooltip visible (docs demos, controlled usage).
 */
export const HelpIcon = forwardRef<HTMLSpanElement, HelpIconProps>(
  (
    {
      cursor = true,
      open = false,
      supportingText = false,
      tooltipText = 'This is a tooltip',
      tooltipSupportingTextContent,
      tooltipArrow = 'Bottom',
      className,
      'aria-label': ariaLabel = 'More information',
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useId();

    return (
      <span ref={ref} className={cn('group/help relative inline-flex shrink-0', className)} {...rest}>
        <button
          type="button"
          aria-describedby={tooltipId}
          aria-label={ariaLabel}
          className="inline-flex size-4 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Icon
            name="help"
            size="xs"
            className={cn('fg-quinary transition-colors duration-150', 'group-hover/help:fg-quaternary group-focus-within/help:fg-quaternary', open && 'fg-quaternary')}
          />
        </button>

        <span
          id={tooltipId}
          role="presentation"
          className={cn(
            // `w-max` is load-bearing: without it, the browser's shrink-to-fit
            // width algorithm for this `absolute`+`auto`-width box computes
            // its available width against the 16px icon's containing block
            // (the offset from `left-1/2` cuts that further), not the
            // Tooltip's actual content — wrapping "This is a tooltip" onto
            // 3+ lines instead of sizing to its own content.
            'pointer-events-none invisible absolute z-10 w-max opacity-0 transition-opacity duration-150',
            'group-hover/help:visible group-hover/help:opacity-100 group-focus-within/help:visible group-focus-within/help:opacity-100',
            open && 'visible opacity-100',
            tooltipPositionStyles[tooltipArrow],
          )}
        >
          <Tooltip
            text={tooltipText}
            supportingText={supportingText}
            supportingTextContent={tooltipSupportingTextContent}
            arrow={tooltipArrow}
          />
          {cursor && (
            <Icon
              name="arrow_selector_tool"
              filled
              size="sm"
              className="absolute -right-2 -bottom-2 text-white"
              style={{ WebkitTextStroke: '1px black' }}
            />
          )}
        </span>
      </span>
    );
  },
);

HelpIcon.displayName = 'HelpIcon';
