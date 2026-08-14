import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarGroupSize } from './AvatarGroup.types';

const sizeOptions = ['xs', 'sm', 'md'] satisfies AvatarGroupSize[];

const PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
];

const meta = {
  title: 'Components/Avatar Group',
  component: AvatarGroup,
  // The Docs page comes from AvatarGroup.mdx (<Meta of={AvatarGroupStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    avatars: PHOTOS.map((src) => ({ src })),
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Size of every avatar in the stack.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    showAddButton: {
      name: 'Show Add Button',
      description: 'Shows a trailing add-user button after the stack.',
      control: 'boolean',
    },
    avatars: { table: { disable: true } },
    onAddClick: { table: { disable: true } },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with size and the add button. */
export const Playground: Story = {
  args: {
    size: 'md',
    showAddButton: true,
  },
};

/**
 * Size options, from xs to md.
 * Outside the sidebar (`!dev`) — embedded in AvatarGroup.mdx via `<Canvas of={AvatarGroupStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-wrap items-end gap-2xl">
      {sizeOptions.map((size) => (
        <AvatarGroup key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
