import type { HTMLAttributes, ReactNode } from 'react';

/** Figma "Horizontal tabs" Type. */
export type TabsType = 'Button brand' | 'Underline' | 'Button border';
/** Figma "Vertical tabs" Type. */
export type VerticalTabsType = 'Button primary' | 'Line' | 'Button border';
export type TabsSize = 'sm' | 'md';

export interface TabItem {
  /** Unique value — identifies the tab and its panel. */
  value: string;
  label: string;
  /** Optional count shown in a badge after the label (e.g. unread notifications). */
  badge?: ReactNode;
  disabled?: boolean;
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
