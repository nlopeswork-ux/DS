import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeGroup } from './BadgeGroup';
import type { BadgeGroupColor, BadgeGroupSize, BadgeGroupTheme } from './BadgeGroup.types';

const themeOptions = ['Light', 'Outline', 'Modern'] satisfies BadgeGroupTheme[];

const sizeOptions = ['md', 'lg'] satisfies BadgeGroupSize[];

const colorOptions = ['Gray', 'Brand', 'Error', 'Warning', 'Success'] satisfies BadgeGroupColor[];

const meta = {
  title: 'Components/Badge Group',
  component: BadgeGroup,
  // The Docs page comes from BadgeGroup.mdx (<Meta of={BadgeGroupStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    badgeLabel: 'New',
    children: 'Additional text',
  },
  argTypes: {
    badge: {
      name: 'Badge Position',
      description: 'Which side the small Badge chip sits on.',
      control: { type: 'select' },
      options: ['Leading', 'Trailing'],
    },
    size: {
      name: 'Size',
      description: 'Size of the group.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    color: {
      name: 'Color',
      description: 'Semantic color applied to fill, border and text.',
      control: { type: 'select' },
      options: colorOptions,
    },
    theme: {
      name: 'Theme',
      description: 'Outer pill treatment.',
      control: { type: 'select' },
      options: themeOptions,
    },
    state: {
      name: 'State',
      description: 'Visual state of the group.',
      control: { type: 'select' },
      options: ['Default', 'Hover'],
    },
    icon: {
      name: 'Show Dot',
      description: 'Shows a Dot indicator inside the Badge chip.',
      control: 'boolean',
    },
    badgeLabel: {
      name: 'Badge Text',
      description: 'Text inside the small Badge chip.',
      control: 'text',
    },
    children: {
      name: 'Description Text',
      description: 'Descriptive text next to the Badge chip.',
      control: 'text',
    },
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every Badge group combination. */
export const Playground: Story = {
  args: {
    badge: 'Leading',
    size: 'md',
    color: 'Brand',
    theme: 'Light',
    state: 'Default',
    icon: true,
  },
};

/**
 * The 3 outer themes, side by side.
 * Outside the sidebar (`!dev`) — embedded in BadgeGroup.mdx via `<Canvas of={BadgeGroupStories.Themes} />`.
 */
export const Themes: Story = {
  tags: ['!dev'],
  args: { color: 'Brand' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {themeOptions.map((theme) => (
        <BadgeGroup key={theme} {...args} theme={theme} />
      ))}
    </div>
  ),
};

/**
 * The 5 semantic colors, in the Light theme.
 * Outside the sidebar (`!dev`) — embedded in BadgeGroup.mdx via `<Canvas of={BadgeGroupStories.Colors} />`.
 */
export const Colors: Story = {
  tags: ['!dev'],
  args: { theme: 'Light' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {colorOptions.map((color) => (
        <BadgeGroup key={color} {...args} color={color} />
      ))}
    </div>
  ),
};

/**
 * Leading vs. trailing Badge position.
 * Outside the sidebar (`!dev`) — embedded in BadgeGroup.mdx via `<Canvas of={BadgeGroupStories.BadgePosition} />`.
 */
export const BadgePosition: Story = {
  tags: ['!dev'],
  args: { color: 'Brand', theme: 'Light' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      <BadgeGroup {...args} badge="Leading" />
      <BadgeGroup {...args} badge="Trailing" />
    </div>
  ),
};

/**
 * Default vs. forced Hover preview, Light theme.
 * Outside the sidebar (`!dev`) — embedded in BadgeGroup.mdx via `<Canvas of={BadgeGroupStories.HoverPreview} />`.
 */
export const HoverPreview: Story = {
  tags: ['!dev'],
  args: { color: 'Brand', theme: 'Light' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      <div className="flex flex-col items-center gap-md">
        <BadgeGroup {...args} state="Default" />
        <span className="text-xs text-tertiary">Default</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <BadgeGroup {...args} state="Hover" />
        <span className="text-xs text-tertiary">Hover</span>
      </div>
    </div>
  ),
};
