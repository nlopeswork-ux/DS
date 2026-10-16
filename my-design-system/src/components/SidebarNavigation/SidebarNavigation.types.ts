import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Sidebar layout.
 * `Simple` — one column, items expand in place.
 * `Dual-tier` — primary column plus a sub-navigation column for the current item.
 * `Slim` — icon-only rail plus a sub-navigation column for the current item.
 */
export type SidebarNavigationType = 'Simple' | 'Slim' | 'Dual-tier';

/**
 * Forces the layout (Storybook previews). `Auto` switches with the viewport:
 * the full sidebar from 1024px (`lg`), a top bar with a drawer below.
 */
export type SidebarBreakpoint = 'Auto' | 'Desktop' | 'Mobile';

/** Forced visual state of an item (Storybook previews). `Default` leaves hover and focus to the browser. */
export type NavItemState = 'Default' | 'Hover' | 'Focus';

export type NavFeaturedCardType = 'Progress bar' | 'Progress circle';

export interface NavSubItem {
  /** Unique value — identifies the item in `value` / `onValueChange`. */
  value: string;
  label: string;
  /** Material Symbols name (see the Icon component). Sub items usually have none. */
  icon?: string;
  /** Count shown in a badge after the label. */
  badge?: ReactNode;
  /** Green status dot before the icon. */
  dot?: boolean;
  /** Renders a link instead of a button. */
  href?: string;
  disabled?: boolean;
  /** Forces a visual state for previews. */
  state?: NavItemState;
}

export interface NavItem extends NavSubItem {
  /** Second level. Expands in place (Simple, mobile) or fills the sub-navigation column (Dual-tier, Slim). */
  items?: NavSubItem[];
}

export interface NavFeaturedCardData {
  /** `Progress bar` in Simple, `Progress circle` in Dual-tier by default. */
  type?: NavFeaturedCardType;
  title: string;
  description: string;
  /** 0–100. */
  progress: number;
  dismissLabel?: string;
  actionLabel?: string;
  onDismiss?: () => void;
  onAction?: () => void;
}

export interface NavAccount {
  name: string;
  email?: string;
  avatarSrc?: string;
  /** Shows the log-out button. */
  onLogout?: () => void;
  logoutLabel?: string;
}

export interface SidebarNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'children'> {
  type?: SidebarNavigationType;
  /** Main items. */
  items: NavItem[];
  /** Items pinned to the bottom (Support, Settings). */
  footerItems?: NavSubItem[];
  /** Controlled selected value. Pair it with `onValueChange`. */
  value?: string;
  /** Initial selected value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Replaces the default KDS logo. Slim shows only the first character area, so pass a compact mark there. */
  logo?: ReactNode;
  /** Search field below the logo (Simple, Dual-tier and the mobile drawer). Default: true. */
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  /** Promo / usage card above the account (Simple, Dual-tier). Hidden in the mobile drawer. */
  featuredCard?: NavFeaturedCardData;
  account?: NavAccount;
  /** Mobile drawer: controlled open state. Pair it with `onOpenChange`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  breakpoint?: SidebarBreakpoint;
  /** Renders the mobile drawer in place instead of a fixed overlay (Storybook previews). */
  inline?: boolean;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}
