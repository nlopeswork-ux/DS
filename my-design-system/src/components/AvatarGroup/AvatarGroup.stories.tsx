import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarGroupProps, AvatarGroupSize } from './AvatarGroup.types';

const sizeOptions = ['xs', 'sm', 'md'] satisfies AvatarGroupSize[];

/** Free dummy portraits (randomuser.me), vendored in public/avatars so previews work offline and on GitHub Pages — same set as the Sidebar Navigation. */
const PHOTOS = ['women-44', 'men-32', 'women-68', 'men-75'].map((name) => `${import.meta.env.BASE_URL}avatars/${name}.jpg`);
const INITIALS = ['OR', 'PW', 'LR', 'AM'];

type AvatarGroupContent = 'Photo' | 'Initials' | 'Placeholder';
const contentOptions = ['Photo', 'Initials', 'Placeholder'] satisfies AvatarGroupContent[];

/** Story-only: maps the single "Content" control onto each avatar's src / text / placeholder props. */
const avatarsFor = (content: AvatarGroupContent = 'Photo'): AvatarGroupProps['avatars'] =>
  PHOTOS.map((src, i) =>
    content === 'Photo' ? { src } : content === 'Initials' ? { text: INITIALS[i] } : { placeholder: true },
  );

const meta: Meta<AvatarGroupProps & { content?: AvatarGroupContent }> = {
  title: 'Components/Avatar Group',
  component: AvatarGroup,
  // The Docs page comes from AvatarGroup.mdx (<Meta of={AvatarGroupStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    avatars: avatarsFor(),
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Size of every avatar in the stack.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    content: {
      name: 'Content',
      description: 'Photos (free dummy portraits), initials, or the generic person placeholder.',
      control: { type: 'inline-radio' },
      options: contentOptions,
    },
    showAddButton: {
      name: 'Show Add Button',
      description: 'Shows a trailing add-user button after the stack.',
      control: 'boolean',
    },
    avatars: { table: { disable: true } },
    onAddClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with size and the add button. */
export const Playground: Story = {
  render: ({ content, ...args }) => <AvatarGroup {...args} avatars={avatarsFor(content)} />,
  args: {
    size: 'md',
    content: 'Photo',
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
