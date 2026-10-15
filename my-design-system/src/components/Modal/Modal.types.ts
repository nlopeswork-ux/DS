import type { HTMLAttributes, ReactNode } from 'react';

/** Modal width scale. `full` fills the viewport (with a 32px gutter on desktop, edge-to-edge on mobile). */
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/** Tone of the featured icon circle. */
export type ModalIconTone = 'brand' | 'success' | 'error' | 'warning' | 'gray';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controls visibility. The Modal is fully controlled — pair it with `onClose`. */
  open: boolean;
  size?: ModalSize;
  title: ReactNode;
  /** Supporting text below the title. */
  subtitle?: ReactNode;
  /** Glyph name (Material Symbols) shown in the featured icon circle. Omit for no icon. */
  icon?: string;
  iconTone?: ModalIconTone;
  /** Slot rendered between header and footer (`md`, `lg`, `full`). In `sm` it is rendered under the text. */
  children?: ReactNode;
  /** Secondary action pinned to the start of the footer (e.g. "Chat to us"). Hidden in `sm`. */
  footerStart?: ReactNode;
  /** Footer actions, in desktop order (cancel first, confirm last). On mobile they stack, confirm on top. */
  actions?: ReactNode;
  /** Draws the divider lines between header, body and footer. Default: true for `md`/`lg`/`full`. */
  dividers?: boolean;
  /** Called when the user asks to close (X button, Esc, overlay click). The consumer decides whether to close. */
  onClose?: () => void;
  /** Esc requests closure. Default: true. Disable it while a required confirmation is pending. */
  dismissOnEsc?: boolean;
  /** Clicking the overlay requests closure. Default: true. Disable it for high-risk or unsaved forms. */
  dismissOnOverlay?: boolean;
  /** Accessible name for the close button. */
  closeLabel?: string;
  /**
   * Renders in place (absolute, no portal, no scroll lock, no focus trap) instead of
   * as a viewport-level dialog. Intended for Storybook previews and docs.
   */
  inline?: boolean;
}
