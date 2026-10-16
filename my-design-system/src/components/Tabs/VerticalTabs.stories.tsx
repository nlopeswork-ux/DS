import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalTabs } from './VerticalTabs';
import type { TabItem, TabState, TabsSize, VerticalTabsProps, VerticalTabsType } from './Tabs.types';

const sizeOptions = ['sm', 'md'] satisfies TabsSize[];
const typeOptions = ['Line', 'Button'] satisfies VerticalTabsType[];

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
    type: 'Line',
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

const stateOptions = ['Default', 'Hover', 'Focus'] satisfies TabState[];

/**
 * Every state of a tab — default, hover and focus, not current and current.
 * Outside the sidebar (`!dev`) — embedded in VerticalTabs.mdx via `<Canvas of={VerticalTabsStories.States} />`.
 */
export const States: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_repeat(3,auto)] items-center gap-x-3xl gap-y-2xl p-lg">
      <span />
      {stateOptions.map((state) => (
        <span key={state} className="text-sm font-medium text-secondary">
          {state}
        </span>
      ))}
      {typeOptions.map((type) => (
        <div key={type} className="contents">
          {[false, true].map((isCurrent) => (
            <div key={String(isCurrent)} className="contents">
              <span className="pr-lg text-sm text-tertiary">
                {type} · {isCurrent ? 'current' : 'not current'}
              </span>
              {stateOptions.map((state) => (
                <VerticalTabs
                  key={state}
                  className="w-auto"
                  type={type}
                  value="current"
                  aria-label={`${type} ${state}`}
                  items={
                    isCurrent
                      ? [{ value: 'current', label: 'My details', badge: 2, state }]
                      : [
                          { value: 'current', label: 'Profile' },
                          { value: 'other', label: 'My details', badge: 2, state },
                        ]
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Tabs with a panel — the selected tab's `content` is rendered beside the list.
 * Outside the sidebar (`!dev`) — embedded in VerticalTabs.mdx via `<Canvas of={VerticalTabsStories.WithPanels} />`.
 */
export const WithPanels: Story = {
  tags: ['!dev'],
  render: () => <VerticalTabs type="Line" items={makeItems(true).slice(0, 4)} aria-label="With panels" />,
};
