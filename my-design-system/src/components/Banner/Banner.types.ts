import type { HTMLAttributes, ReactNode } from 'react';
import type { FeedbackColor } from '../FeedbackShared';

/** Semantic colour of the banner — drives the featured icon and the action styles. */
export type BannerColor = FeedbackColor;

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
  color?: BannerColor;
  title: ReactNode;
  /** Optional supporting text, inline after the title on desktop. Accepts nodes so it can contain an inline link. */
  supportingText?: ReactNode;
  /** Label of the primary action (e.g. "Try again", "View changes"). Omit to hide it. */
  actionLabel?: string;
  onAction?: () => void;
  /** Label of the dismiss action. Pass an empty string to hide it. Default: "Dismiss". */
  dismissLabel?: string;
  /** Called by both the "Dismiss" action and the close (X) button. Dismissing never resolves or undoes anything. */
  onDismiss?: () => void;
  /**
   * Shows the close (X) button. Default: true. Critical banners may hide it
   * (together with `dismissLabel=""`) so they stay visible until resolved.
   */
  showCloseButton?: boolean;
  /** Accessible name of the close button. Default: "Dismiss banner". */
  closeLabel?: string;
  /** Prevents duplicate submissions while the action is running. */
  actionLoading?: boolean;
}
