import type { HTMLAttributes } from 'react';
import type { TooltipArrow } from '../Tooltip';

export interface HelpIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Shows the decorative cursor glyph next to the tooltip while open. Default: true. */
  cursor?: boolean;
  /** Forces the tooltip open, in addition to real hover/focus. Default: false. */
  open?: boolean;
  /** Shows the tooltip's supporting text line. Default: false. */
  supportingText?: boolean;
  /** Tooltip title text. */
  tooltipText?: string;
  /** Tooltip supporting text content, used when `supportingText` is true. */
  tooltipSupportingTextContent?: string;
  /** Tooltip arrow position relative to the icon. Default: 'Bottom' (icon sits above the trigger). */
  tooltipArrow?: TooltipArrow;
  /** Accessible name for the trigger button. */
  'aria-label'?: string;
}
