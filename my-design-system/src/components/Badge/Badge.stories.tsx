import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';
import { CountryIcon } from '../CountryIcon';
import { countryCodeOptions } from '../CountryIcon/CountryIcon.stories';
import type { BadgeColor, BadgeIcon, BadgeProps, BadgeSize, BadgeType } from './Badge.types';

/**
 * Playground-only wrapper — adds a `countryCode` pseudo-arg (not a real
 * Badge prop) so picking `icon: 'Country'` in Controls shows a real flag
 * via `flagSwap` instead of the generic globe fallback. Kept separate from
 * `Badge` itself so the component's public API stays exactly as documented.
 */
type BadgePlaygroundProps = BadgeProps & { countryCode?: string };

const BadgePlayground = ({ countryCode = 'PT', icon, flagSwap, ...rest }: BadgePlaygroundProps) => (
  <Badge {...rest} icon={icon} flagSwap={icon === 'Country' ? <CountryIcon code={countryCode} /> : flagSwap} />
);

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
  component: BadgePlayground,
  // The Docs page comes from Badge.mdx (<Meta of={BadgeStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    children: 'Label',
    iconLeadingSwap: <Icon name="add" size="xs" />,
    iconTrailingSwap: <Icon name="arrow_forward" size="xs" />,
    // Pseudo-arg (not a real Badge prop) — see `countryCode` argType below.
    countryCode: 'PT',
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
    // Pseudo-arg, not a real Badge prop — drives `flagSwap` in the
    // Playground's `render` below so picking `icon: 'Country'` shows a
    // real flag instead of the generic globe fallback. Only shown when
    // `icon` is actually `'Country'` (Storybook's native conditional
    // `if`) — see CLAUDE.md's Playground sequencing rule.
    countryCode: {
      name: 'Country',
      description: 'Flag shown when Icon is "Country".',
      control: { type: 'select' },
      options: countryCodeOptions,
      if: { arg: 'icon', eq: 'Country' },
    },
    // Technical noise — kept out of the Live Playground (internal React
    // nodes for the instance-swap slots and the close callback).
    flagSwap: { table: { disable: true } },
    avatarSwap: { table: { disable: true } },
    iconLeadingSwap: { table: { disable: true } },
    iconTrailingSwap: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
} satisfies Meta<typeof BadgePlayground>;

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
        <BadgePlayground key={type} {...args} type={type}>
          {type}
        </BadgePlayground>
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
        <BadgePlayground key={color} {...args} color={color}>
          {color}
        </BadgePlayground>
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
        <BadgePlayground key={size} {...args} size={size}>
          Badge {size}
        </BadgePlayground>
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
  render: ({ countryCode: _countryCode, ...args }) => (
    <div className="flex flex-wrap items-center gap-lg">
      <Badge {...args} icon="Dot">
        Dot
      </Badge>
      <Badge {...args} icon="Country" flagSwap={<CountryIcon code="PT" />}>
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
  render: ({ countryCode: _countryCode, ...args }) => <Badge {...args} onClose={() => alert('onClose fired')} />,
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
