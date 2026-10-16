import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types';

const trail = ['Settings', 'Projects', 'Design system', 'Components', 'Settings', 'Team'];

const makeItems = (count: number, showHome: boolean): BreadcrumbItem[] => {
  const labels = trail.slice(trail.length - Math.max(1, count - (showHome ? 1 : 0)));
  const items: BreadcrumbItem[] = labels.map((label) => ({ label, href: '#', onClick: () => {} }));
  return showHome ? [{ icon: 'home', ariaLabel: 'Home', href: '#', onClick: () => {} }, ...items] : items;
};

interface BreadcrumbsPlaygroundProps extends Omit<BreadcrumbsProps, 'items'> {
  /** Story-only: number of crumbs in the trail. */
  length: number;
  /** Story-only: shows the home icon as the first crumb. */
  showHome: boolean;
}

/** Story-only wrapper: builds the trail from simple controls. Links don't navigate (`preventDefault`). */
const BreadcrumbsPlayground = ({ length, showHome, ...props }: BreadcrumbsPlaygroundProps) => (
  <div
    onClickCapture={(event) => {
      if ((event.target as HTMLElement).closest('a')) event.preventDefault();
    }}
  >
    <Breadcrumbs {...props} items={makeItems(length, showHome)} />
  </div>
);

const meta = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsPlayground,
  // The Docs page comes from Breadcrumbs.mdx (<Meta of={BreadcrumbsStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    length: 4,
    showHome: true,
    maxItems: 4,
  },
  argTypes: {
    length: { name: 'Crumbs', description: 'Number of crumbs in the trail (the last is the current page).', control: { type: 'number', min: 1, max: 6 } },
    showHome: { name: 'Home Icon', description: 'Shows the home icon as the first crumb.', control: 'boolean' },
    maxItems: {
      name: 'Max Items',
      description: 'Crumbs shown before the middle collapse into "…". Click "…" to expand the full trail.',
      control: { type: 'number', min: 3, max: 6 },
    },
    // Technical noise — kept out of the Live Playground.
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof BreadcrumbsPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — with 5+ crumbs the middle collapses into "…"; click it to expand. */
export const Playground: Story = {
  // `length` is a plain number control — remount when it changes so the collapsed state resets.
  render: (args) => <BreadcrumbsPlayground key={`${args.length}-${args.maxItems}`} {...args} />,
};

/**
 * Every state of a crumb: default, hover, focused and current.
 * Outside the sidebar (`!dev`) — embedded in Breadcrumbs.mdx via `<Canvas of={BreadcrumbsStories.States} />`.
 */
export const States: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_auto] items-center gap-x-3xl gap-y-xl p-lg">
      {(
        [
          ['Default', { state: 'Default' }],
          ['Hover', { state: 'Hover' }],
          ['Focused', { state: 'Focused' }],
        ] as const
      ).map(([name, extra]) => (
        <div key={name} className="contents">
          <span className="text-sm font-medium text-secondary">{name}</span>
          <Breadcrumbs
            items={[
              { icon: 'home', ariaLabel: 'Home', href: '#', ...extra },
              { label: 'Settings', href: '#', ...extra },
              { label: 'Team' },
            ]}
            aria-label={`${name} state`}
          />
        </div>
      ))}
      <span className="text-sm font-medium text-secondary">Current</span>
      <Breadcrumbs items={[{ icon: 'home', ariaLabel: 'Home', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Team' }]} aria-label="Current state" />
    </div>
  ),
};

/**
 * A short trail and a long, collapsible one.
 * Outside the sidebar (`!dev`) — embedded in Breadcrumbs.mdx via `<Canvas of={BreadcrumbsStories.Trails} />`.
 */
export const Trails: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2xl p-lg">
      <Breadcrumbs items={makeItems(3, true)} aria-label="Short trail" />
      <Breadcrumbs items={makeItems(6, true)} aria-label="Long trail" />
      <Breadcrumbs items={makeItems(2, false)} aria-label="No home" />
    </div>
  ),
};
