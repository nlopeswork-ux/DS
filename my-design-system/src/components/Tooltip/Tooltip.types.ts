import type { HTMLAttributes } from 'react';

/**
 * Arrow position — which edge of the tooltip box the pointer triangle sits
 * on. `'None'` renders a plain box with no arrow.
 */
export type TooltipArrow = 'None' | 'Top' | 'Bottom' | 'Left' | 'Right';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Main text shown in the tooltip. */
  text?: string;
  /** Shows the supporting text line below the title. */
  supportingText?: boolean;
  /** Supporting text content, rendered only when `supportingText` is true. */
  supportingTextContent?: string;
  /** Position of the pointer triangle. `'None'` hides it. */
  arrow?: TooltipArrow;
}
