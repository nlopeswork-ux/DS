import type { HTMLAttributes, ReactNode } from 'react';

/** Semantic colour of the alert — drives the featured icon and its default glyph. */
export type AlertColor = 'informative' | 'success' | 'warning' | 'error';

/** `floating` — bordered card for a delimited area. `full-width` — banner spanning the page or section. */
export type AlertSize = 'floating' | 'full-width';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  color?: AlertColor;
  size?: AlertSize;
  title: ReactNode;
  /** Optional supporting text. Accepts nodes so it can contain an inline link. */
  supportingText?: ReactNode;
  /** Label of the primary action (e.g. "Try again", "View changes"). Omit to hide it. */
  actionLabel?: string;
  onAction?: () => void;
  /** Label of the dismiss action. Pass an empty string to hide it. Default: "Dismiss". */
  dismissLabel?: string;
  /** Called by both the "Dismiss" action and the close (X) button. Dismissing never resolves or undoes anything. */
  onDismiss?: () => void;
  /** Shows the close (X) button. Default: true. */
  showCloseButton?: boolean;
  /** Accessible name of the close button. Default: "Dismiss alert". */
  closeLabel?: string;
  /** Prevents duplicate submissions while the action is running. */
  actionLoading?: boolean;
}
