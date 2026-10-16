import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalTabs } from './VerticalTabs';
import type { TabItem, TabsSize, VerticalTabsProps, VerticalTabsType } from './Tabs.types';

const sizeOptions = ['sm', 'md'] satisfies TabsSize[];
const typeOptions = ['Button primary', 'Line', 'Button border'] satisfies VerticalTabsType[];

const SettingsPanel = ({ title }: { title: string }) => (
  <div className="rounded-md border border-dashed border-primary bg-secondary p-lg text-sm text-tertiary">
    <p className="font-medium text-secondary">{title}</p>
    <p>Panel content goes here.</p>
  </div>
);

/** Tab labels from the Figma frames. */
const labels = ['My details', 'Profile', 'Password', 'Team', 'Plan', 'Billing', 'Email', 'Notifications', 'Integrations', 'API'];

const makeItems = (withPanels: boolean): TabItem[] =>
  labels.map((label) => ({
    value: label.toLowerCase().replace(/\s+/g, '-'),
    label,
    badge: label === 'Notifications' ? 2 : undefined,
    content: withPanels ? <SettingsPanel title={label} /> : undefined,
  }));

interface VerticalTabsPlaygroundProps extends Omit<VerticalTabsProps, 'items' | 'value' | 'defaultValue'> {
  /** Story-only: shows the notification badge on the "Notifications" tab. */
  showBadge: boolean;
  /** Story-only: renders a panel under each tab. */
  showPanels: boolean;
}

/** Story-only wrapper: turns the item list into simple toggles. The selection is internal, so tabs really switch. */
const VerticalTabsPlayground = ({ showBadge, showPanels, ...props }: VerticalTabsPlaygroundProps) => {
  const items = makeItems(showPanels).map((item) => (item.badge && !showBadge ? { ...item, badge: undefined } : item));
  return <VerticalTabs {...props} key={String(showPanels)} items={items} aria-label="Account settings" />;
};

const meta = {
  title: 'Components/Vertical Tabs',
  component: VerticalTabsPlayground,
  // The Docs page comes from VerticalTabs.mdx (<Meta of={VerticalTabsStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
  },
  args: {
    type: 'Button primary',
    size: 'sm',
    showBadge: true,
    showPanels: false,
  },
  argTypes: {
    type: {
      name: 'Type',
      description: 'Visual style of the tabs.',
      control: { type: 'select' },
      options: typeOptions,
    },
    size: {
      name: 'Size',
      description: 'Tab size.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    showBadge: { name: 'Badge', description: 'Shows a count on the "Notifications" tab.', control: 'boolean' },
    showPanels: { name: 'Panels', description: 'Renders a panel under each tab.', control: 'boolean' },
    // Technical noise — kept out of the Live Playground.
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof VerticalTabsPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — click the tabs, or use the arrow keys, Home and End. */
export const Playground: Story = {};

/**
 * Every type at both sizes.
 * Outside the sidebar (`!dev`) — embedded in VerticalTabs.mdx via `<Canvas of={VerticalTabsStories.Types} />`.
 */
export const Types: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-start gap-3xl">
      {typeOptions.map((type) =>
        sizeOptions.map((size) => (
          <div key={`${type}-${size}`} className="flex flex-col gap-md">
            <span className="text-sm font-medium text-secondary">
              {type} · {size}
            </span>
            <VerticalTabs className="w-auto" type={type} size={size} items={makeItems(false).slice(0, 10)} aria-label={`${type} ${size}`} />
          </div>
        )),
      )}
    </div>
  ),
};

/**
 * Tabs with a panel — the selected tab's `content` is rendered beside the list.
 * Outside the sidebar (`!dev`) — embedded in VerticalTabs.mdx via `<Canvas of={VerticalTabsStories.WithPanels} />`.
 */
export const WithPanels: Story = {
  tags: ['!dev'],
  render: () => <VerticalTabs type="Button primary" items={makeItems(true).slice(0, 4)} aria-label="With panels" />,
};
