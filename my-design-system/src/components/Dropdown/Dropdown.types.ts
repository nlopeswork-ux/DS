import type { MouseEvent, ReactElement, ReactNode } from 'react';

export interface DropdownProps {
  /** Trigger element — a `Button`, an icon button, or an `Avatar`. Receives `onClick`/`aria-*` automatically. */
  trigger: ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;
  /** Menu content — `DropdownListItem`, `DropdownHeader` and `DropdownDivider`. */
  children: ReactNode;
  /** Controlled open state. Omit to let the component manage its own state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Horizontal alignment of the menu relative to the trigger. */
  align?: 'start' | 'end';
  className?: string;
}

export interface DropdownListItemProps {
  children: ReactNode;
  icon?: ReactNode;
  /** Renders a checkbox indicator before the label, for multi-select menus. */
  checkbox?: boolean;
  checked?: boolean;
  supportingText?: string;
  /** Keyboard shortcut hint rendered at the end of the row (e.g. "⌘C"). */
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
}

export interface DropdownHeaderProps {
  children: ReactNode;
  className?: string;
}

export type ScrollBarLength = '25%' | '50%' | '75%';

export interface ScrollBarProps {
  /** Proportion of the track filled by the thumb — purely decorative, doesn't drive real scroll position. */
  length?: ScrollBarLength;
  className?: string;
}
