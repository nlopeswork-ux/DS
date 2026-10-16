import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarNavigation } from './SidebarNavigation';
import { NavItemButton } from './NavItemButton';
import type { NavAccount, NavFeaturedCardData, NavItem, NavSubItem, SidebarNavigationProps } from './SidebarNavigation.types';

const dashboardPages: NavSubItem[] = [
  { value: 'overview', label: 'Overview', icon: 'monitoring' },
  { value: 'notifications', label: 'Notifications', icon: 'notifications', badge: 10 },
  { value: 'analytics', label: 'Analytics', icon: 'analytics' },
  { value: 'saved-reports', label: 'Saved reports', icon: 'star' },
  { value: 'scheduled-reports', label: 'Scheduled reports', icon: 'schedule' },
  { value: 'user-reports', label: 'User reports', icon: 'account_box' },
  { value: 'manage-notifications', label: 'Manage notifications', icon: 'tune' },
];

const pages = (...labels: string[]): NavSubItem[] =>
  labels.map((label) => ({ value: label.toLowerCase().replace(/\s+/g, '-'), label, icon: 'circle' }));

const items: NavItem[] = [
  { value: 'home', label: 'Home', icon: 'home', items: pages('Start', 'Activity') },
  { value: 'dashboard', label: 'Dashboard', icon: 'bar_chart', items: dashboardPages },
  { value: 'projects', label: 'Projects', icon: 'layers', items: pages('All projects', 'Archived') },
  { value: 'tasks', label: 'Tasks', icon: 'task_alt', items: pages('My tasks', 'Assigned') },
  { value: 'reporting', label: 'Reporting', icon: 'pie_chart', items: pages('Weekly', 'Monthly') },
  { value: 'users', label: 'Users', icon: 'group', items: pages('Members', 'Invitations') },
];

const footerItems: NavSubItem[] = [
  { value: 'support', label: 'Support', icon: 'support' },
  { value: 'settings', label: 'Settings', icon: 'settings' },
];

const featuredCard: NavFeaturedCardData = {
  title: 'Used space',
  description: 'Your team has used 80% of your available space. Need more?',
  progress: 80,
};

/** Free dummy portraits (randomuser.me), vendored in public/avatars so previews work offline and on GitHub Pages. */
const photo = `${import.meta.env.BASE_URL}avatars/women-44.jpg`;

const account: NavAccount = { name: 'Olivia Rhye', email: 'olivia@kds.design', avatarSrc: photo, onLogout: () => {} };

interface SidebarPlaygroundProps extends Omit<SidebarNavigationProps, 'items' | 'footerItems' | 'featuredCard' | 'account'> {
  /** Story-only: shows the usage card (Simple, Dual-tier). */
  showFeaturedCard: boolean;
  /** Story-only: shows the account block. */
  showAccount: boolean;
  /** Story-only: account avatar — a photo or the initials. */
  avatar: 'Photo' | 'Initials';
  /** Story-only: opens the mobile drawer. */
  drawerOpen: boolean;
}

/** Story-only wrapper: composes the data props from simple controls and gives the sidebar a height to fill. */
const SidebarPlayground = ({ showFeaturedCard, showAccount, avatar, drawerOpen, ...props }: SidebarPlaygroundProps) => (
  <div className={props.breakpoint === 'Mobile' ? 'relative h-[812px] w-[375px]' : 'h-[960px]'}>
    <SidebarNavigation
      defaultValue="overview"
      {...props}
      defaultOpen={drawerOpen}
      inline
      items={items}
      footerItems={footerItems}
      featuredCard={showFeaturedCard ? featuredCard : undefined}
      account={showAccount ? { ...account, avatarSrc: avatar === 'Photo' ? photo : undefined } : undefined}
    />
  </div>
);

const meta = {
  title: 'Components/Sidebar Navigation',
  component: SidebarPlayground,
  // The Docs page comes from SidebarNavigation.mdx (<Meta of={SidebarNavigationStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    type: 'Simple',
    breakpoint: 'Desktop',
    showSearch: true,
    showFeaturedCard: true,
    showAccount: true,
    avatar: 'Photo',
    drawerOpen: false,
  },
  argTypes: {
    type: {
      name: 'Type',
      description: 'Simple expands items in place; Dual-tier and Slim open a second column for the current item.',
      control: { type: 'select' },
      options: ['Simple', 'Dual-tier', 'Slim'],
    },
    breakpoint: {
      name: 'Breakpoint',
      description: 'Forces the desktop sidebar or the mobile bar. Auto follows the viewport (mobile below 1024px).',
      control: { type: 'select' },
      options: ['Desktop', 'Mobile', 'Auto'],
    },
    showSearch: { name: 'Search', description: 'Search field below the logo.', control: 'boolean', if: { arg: 'type', neq: 'Slim' } },
    showFeaturedCard: { name: 'Featured Card', description: 'Usage card above the account.', control: 'boolean', if: { arg: 'type', neq: 'Slim' } },
    showAccount: { name: 'Account', description: 'Avatar, name and log-out button.', control: 'boolean' },
    avatar: {
      name: 'Avatar',
      description: 'Account avatar: a photo (avatarSrc) or the initials.',
      control: { type: 'inline-radio' },
      options: ['Photo', 'Initials'],
      if: { arg: 'showAccount', truthy: true },
    },
    drawerOpen: { name: 'Drawer Open', description: 'Opens the mobile drawer.', control: 'boolean', if: { arg: 'breakpoint', eq: 'Mobile' } },
    // Technical noise — kept out of the Live Playground.
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    logo: { table: { disable: true } },
    searchPlaceholder: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    inline: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof SidebarPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — pick items to see the second column (Dual-tier, Slim) or the in-place expansion (Simple). */
export const Playground: Story = {
  // Remount when a structural control changes so the selection / drawer state resets.
  render: (args) => <SidebarPlayground key={`${args.type}-${args.breakpoint}-${args.drawerOpen}`} {...args} />,
};

const frame = 'h-[960px]';

/**
 * The three desktop layouts, each with and without the second column.
 * Outside the sidebar (`!dev`) — embedded in SidebarNavigation.mdx via `<Canvas of={SidebarNavigationStories.Types} />`.
 */
export const Types: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-fit items-start gap-xl overflow-x-auto p-lg">
      {(
        [
          ['Simple', undefined],
          ['Dual-tier', undefined],
          ['Dual-tier', 'overview'],
          ['Slim', undefined],
          ['Slim', 'overview'],
        ] as const
      ).map(([type, selected]) => (
        <div key={`${type}-${selected}`} className={`${frame} shrink-0 border border-secondary`}>
          <SidebarNavigation
            type={type}
            breakpoint="Desktop"
            items={items}
            footerItems={footerItems}
            featuredCard={type === 'Slim' ? undefined : featuredCard}
            account={account}
            defaultValue={selected}
            aria-label={`${type} navigation`}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * The mobile top bar and its drawer.
 * Outside the sidebar (`!dev`) — embedded in SidebarNavigation.mdx via `<Canvas of={SidebarNavigationStories.Mobile} />`.
 */
export const Mobile: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-fit items-start gap-xl p-lg">
      <div className="relative h-16 w-[375px] shrink-0 border border-secondary">
        <SidebarNavigation breakpoint="Mobile" inline items={items} footerItems={footerItems} account={account} aria-label="Mobile navigation closed" />
      </div>
      <div className="relative h-[812px] w-[375px] shrink-0 border border-secondary">
        <SidebarNavigation breakpoint="Mobile" inline defaultOpen items={items} footerItems={footerItems} account={account} aria-label="Mobile navigation open" />
      </div>
    </div>
  ),
};

/**
 * Every state of a nav item: default, hover, focused, and current (alone and with a badge or status dot).
 * Outside the sidebar (`!dev`) — embedded in SidebarNavigation.mdx via `<Canvas of={SidebarNavigationStories.States} />`.
 */
export const States: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_272px_272px] items-center gap-x-3xl gap-y-xl p-lg">
      <span />
      <span className="text-sm font-medium text-secondary">Current: false</span>
      <span className="text-sm font-medium text-secondary">Current: true</span>
      {(['Default', 'Hover', 'Focus'] as const).map((state) => (
        <div key={state} className="contents">
          <span className="text-sm font-medium text-secondary">{state}</span>
          <NavItemButton label="Dashboard" icon="bar_chart" state={state} chevron="down" />
          <NavItemButton label="Dashboard" icon="bar_chart" state={state} current dot badge={10} chevron="down" />
        </div>
      ))}
    </div>
  ),
};
