import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import type { TabItem, TabsProps, TabsSize, TabsType } from './Tabs.types';

const sizeOptions = ['sm', 'md'] satisfies TabsSize[];
const typeOptions = ['Button brand', 'Underline', 'Button border'] satisfies TabsType[];

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

interface TabsPlaygroundProps extends Omit<TabsProps, 'items' | 'value' | 'defaultValue'> {
  /** Story-only: shows the notification badge on the "Notifications" tab. */
  showBadge: boolean;
  /** Story-only: renders a panel under each tab. */
  showPanels: boolean;
}

/** Story-only wrapper: turns the item list into simple toggles. The selection is internal, so tabs really switch. */
const TabsPlayground = ({ showBadge, showPanels, ...props }: TabsPlaygroundProps) => {
  const items = makeItems(showPanels).map((item) => (item.badge && !showBadge ? { ...item, badge: undefined } : item));
  return <Tabs {...props} key={String(showPanels)} items={items} aria-label="Account settings" />;
};

const meta = {
  title: 'Components/Tabs',
  component: TabsPlayground,
  // The Docs page comes from Tabs.mdx (<Meta of={TabsStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
  },
  args: {
    type: 'Button brand',
    size: 'sm',
    fullWidth: false,
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
    fullWidth: {
      name: 'Full Width',
      description: 'Tabs share the full width equally.',
      control: 'boolean',
    },
    showBadge: { name: 'Badge', description: 'Shows a count on the "Notifications" tab.', control: 'boolean' },
    showPanels: { name: 'Panels', description: 'Renders a panel under each tab.', control: 'boolean' },
    // Technical noise — kept out of the Live Playground.
    onValueChange: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof TabsPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — click the tabs, or use the arrow keys, Home and End. */
export const Playground: Story = {};

/**
 * Every type at both sizes.
 * Outside the sidebar (`!dev`) — embedded in Tabs.mdx via `<Canvas of={TabsStories.Types} />`.
 */
export const Types: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex w-[1280px] max-w-full flex-col gap-3xl">
      {typeOptions.map((type) =>
        sizeOptions.map((size) => (
          <div key={`${type}-${size}`} className="flex flex-col gap-md">
            <span className="text-sm font-medium text-secondary">
              {type} · {size}
            </span>
            <Tabs type={type} size={size} items={makeItems(false).slice(0, 10)} aria-label={`${type} ${size}`} />
          </div>
        )),
      )}
    </div>
  ),
};

/**
 * Tabs with a panel — the selected tab's `content` is rendered below the list.
 * Outside the sidebar (`!dev`) — embedded in Tabs.mdx via `<Canvas of={TabsStories.WithPanels} />`.
 */
export const WithPanels: Story = {
  tags: ['!dev'],
  render: () => <Tabs type="Button brand" items={makeItems(true).slice(0, 4)} aria-label="With panels" />,
};
