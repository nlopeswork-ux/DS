import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';
import type { BadgeColor, BadgeIcon, BadgeSize, BadgeType } from './Badge.types';

const typeOptions = ['Pill color', 'Pill outline', 'Badge color', 'Badge modern'] satisfies BadgeType[];

const sizeOptions = ['sm', 'md', 'lg'] satisfies BadgeSize[];

const iconOptions = [
  'False',
  'Dot',
  'Country',
  'X close',
  'Avatar',
  'Icon trailing',
  'Icon leading',
  'Only',
] satisfies BadgeIcon[];

const colorOptions = [
  'Gray',
  'Brand',
  'Error',
  'Warning',
  'Success',
  'Blue light',
  'Blue',
  'Indigo',
  'Purple',
  'Pink',
  'Orange',
  'Gray blue',
] satisfies BadgeColor[];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  // The Docs page comes from Badge.mdx (<Meta of={BadgeStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    children: 'Label',
    iconLeadingSwap: <Icon name="star" size="xs" className="size-3.5 text-[14px]" />,
    iconTrailingSwap: <Icon name="arrow_forward" size="xs" className="size-3.5 text-[14px]" />,
  },
  argTypes: {
    children: {
      name: 'Label Text',
      description: 'Text content of the badge.',
      control: 'text',
    },
    size: {
      name: 'Size',
      description: 'Size of the badge.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    type: {
      name: 'Type',
      description: 'Container style — pill vs. squared, flat vs. outline/modern.',
      control: { type: 'select' },
      options: typeOptions,
    },
    icon: {
      name: 'Icon',
      description: 'Icon slot shown alongside (or instead of) the label.',
      control: { type: 'select' },
      options: iconOptions,
    },
    color: {
      name: 'Color',
      description: 'Multi-color palette applied to fill, border, text and icon.',
      control: { type: 'select' },
      options: colorOptions,
    },
    // Technical noise — kept out of the Live Playground (internal React
    // nodes for the instance-swap slots and the close callback).
    flagSwap: { table: { disable: true } },
    avatarSwap: { table: { disable: true } },
    iconLeadingSwap: { table: { disable: true } },
    iconTrailingSwap: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every badge combination. */
export const Playground: Story = {
  args: {
    size: 'md',
    type: 'Pill color',
    icon: 'False',
    color: 'Brand',
  },
};

/**
 * The 4 container types, side by side.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.AllTypes} />`.
 */
export const AllTypes: Story = {
  tags: ['!dev'],
  args: { color: 'Brand', children: 'Label' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {typeOptions.map((type) => (
        <Badge key={type} {...args} type={type}>
          {type}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * All 12 colors, in the default Pill color type.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.Colors} />`.
 */
export const Colors: Story = {
  tags: ['!dev'],
  args: { type: 'Pill color' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-md">
      {colorOptions.map((color) => (
        <Badge key={color} {...args} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * Size options, from sm to lg.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  args: { color: 'Brand', type: 'Pill color' },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-lg">
      {sizeOptions.map((size) => (
        <Badge key={size} {...args} size={size}>
          Badge {size}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * Every icon slot: dot indicator, country flag (placeholder), avatar
 * (placeholder), leading/trailing icon, dismissible (X close), and
 * icon-only.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.IconSlots} />`.
 */
export const IconSlots: Story = {
  tags: ['!dev'],
  args: { color: 'Brand', type: 'Pill color' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      <Badge {...args} icon="Dot">
        Dot
      </Badge>
      <Badge {...args} icon="Country">
        Country
      </Badge>
      <Badge {...args} icon="Avatar">
        Avatar
      </Badge>
      <Badge {...args} icon="Icon leading">
        Leading icon
      </Badge>
      <Badge {...args} icon="Icon trailing">
        Trailing icon
      </Badge>
      <Badge {...args} icon="X close">
        Dismissible
      </Badge>
      <Badge {...args} icon="Only" aria-label="Favorite" />
    </div>
  ),
};

/**
 * Dismissible badge with a working `onClose` handler.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.Dismissible} />`.
 */
export const Dismissible: Story = {
  tags: ['!dev'],
  args: { color: 'Gray', type: 'Badge color', icon: 'X close', children: 'Remove me' },
  render: (args) => <Badge {...args} onClose={() => alert('onClose fired')} />,
};

/**
 * A realistic status-list context, mixing colors and the 4 types.
 * Outside the sidebar (`!dev`) — embedded in Badge.mdx via `<Canvas of={BadgeStories.InContext} />`.
 */
export const InContext: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md">
        <Badge color="Success" icon="Dot">
          Online
        </Badge>
        <span className="text-sm text-tertiary">Pill color + Dot</span>
      </div>
      <div className="flex items-center gap-md">
        <Badge color="Error" type="Pill outline">
          Failed
        </Badge>
        <span className="text-sm text-tertiary">Pill outline</span>
      </div>
      <div className="flex items-center gap-md">
        <Badge color="Brand" type="Badge modern" icon="Icon leading">
          Verified
        </Badge>
        <span className="text-sm text-tertiary">Badge modern + leading icon</span>
      </div>
    </div>
  ),
};
