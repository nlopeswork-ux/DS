import type { HTMLAttributes, ReactNode } from 'react';

/** Horizontal tabs: a bottom rule, or white raised chips in a bordered track. */
export type TabsType = 'Underline' | 'Button';
/** Vertical tabs: a line on the left, or white raised chips in a bordered track. */
export type VerticalTabsType = 'Line' | 'Button';
export type TabsSize = 'sm' | 'md';
/**
 * Forced visual state (Storybook previews). `Default` leaves hover and focus to
 * the browser, like Button's `state`.
 */
export type TabState = 'Default' | 'Hover' | 'Focus';

export interface TabItem {
  /** Unique value — identifies the tab and its panel. */
  value: string;
  label: string;
  /** Optional count shown in a badge after the label (e.g. unread notifications). */
  badge?: ReactNode;
  disabled?: boolean;
  /** Forces a visual state for previews. */
  state?: TabState;
  /** Panel rendered while this tab is selected. Omit when you render the content yourself. */
  content?: ReactNode;
}

interface BaseTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  items: TabItem[];
  /** Controlled selected value. Pair it with `onValueChange`. */
  value?: string;
  /** Initial selected value when uncontrolled. Default: the first enabled tab. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: TabsSize;
  /** Accessible name of the tab list. */
  'aria-label'?: string;
}

export interface TabsProps extends BaseTabsProps {
  type?: TabsType;
  /** Tabs share the full width equally. Default: false. */
  fullWidth?: boolean;
}

export interface VerticalTabsProps extends BaseTabsProps {
  type?: VerticalTabsType;
}
