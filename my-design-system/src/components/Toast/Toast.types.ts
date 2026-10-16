import type { HTMLAttributes, ReactNode } from 'react';
import type { FeedbackColor } from '../FeedbackShared';

/** Semantic colour of the toast — drives the featured icon and the live-region role. */
export type ToastColor = FeedbackColor;

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
  color?: ToastColor;
  /** Short, scannable title. */
  title: ReactNode;
  supportingText?: ReactNode;
  /** Label of the single action (e.g. "Undo", "View profile"). Omit to hide it. */
  actionLabel?: string;
  onAction?: () => void;
  /** Called by the close (X) button and when the auto-dismiss timer expires. Never undoes or resolves anything. */
  onDismiss?: () => void;
  /** Shows the close (X) button. Default: true. */
  showCloseButton?: boolean;
  /** Accessible name of the close button. Default: "Dismiss notification". */
  closeLabel?: string;
  /**
   * Auto-dismiss delay in ms. Default: 5000 without an action, 8000 with one or
   * for `warning`; `error` stays until dismissed. Pass `null` to never auto-dismiss.
   * Numbers below 4000 are raised to 4000. The timer pauses while the toast is
   * hovered or contains focus.
   */
  duration?: number | null;
  /** Bump to restart the timer (used to refresh a duplicate instead of stacking it). */
  restartKey?: number;
  /** Prevents duplicate submissions while the action is running. */
  actionLoading?: boolean;
}

export interface ToastOptions
  extends Pick<
    ToastProps,
    'color' | 'title' | 'supportingText' | 'actionLabel' | 'onAction' | 'onDismiss' | 'showCloseButton' | 'duration'
  > {}

export interface ToastApi {
  /** Shows a toast and returns its id. An identical toast already on screen is refreshed instead of stacked. */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
