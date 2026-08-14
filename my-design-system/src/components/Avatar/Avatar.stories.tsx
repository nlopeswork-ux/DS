import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { AvatarAddButton } from './AvatarAddButton';
import { AvatarProfilePhoto } from './AvatarProfilePhoto';
import { AvatarLabelGroup } from './AvatarLabelGroup';
import type { AvatarSize, AvatarStatusIcon } from './Avatar.types';

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] satisfies AvatarSize[];

const statusIconOptions = ['false', 'online-indicator', 'company', 'verified'] satisfies AvatarStatusIcon[];

const PHOTO_URL = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  // The Docs page comes from Avatar.mdx (<Meta of={AvatarStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Size of the avatar.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Shows the generic person icon.',
      control: 'boolean',
    },
    text: {
      name: 'Initials',
      description: 'Initials shown instead of a photo (e.g. "OR").',
      control: 'text',
    },
    statusIcon: {
      name: 'Status Icon',
      description: 'Overlay shown at the bottom-right corner.',
      control: { type: 'select' },
      options: statusIconOptions,
    },
    online: {
      name: 'Online',
      description: 'Only for statusIcon="online-indicator".',
      control: 'boolean',
    },
    contrastBorder: {
      name: 'Contrast Border',
      description: 'Subtle inner border, keeps light photos from blending into the background.',
      control: 'boolean',
    },
    src: { table: { disable: true } },
    alt: { table: { disable: true } },
    companySwap: { table: { disable: true } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every avatar combination. */
export const Playground: Story = {
  args: {
    size: 'md',
    placeholder: false,
    text: 'OR',
    statusIcon: 'false',
    online: true,
    contrastBorder: true,
  },
};

/**
 * Size options, from xs to 2xl.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-end gap-lg">
      {sizeOptions.map((size) => (
        <Avatar key={size} size={size} src={PHOTO_URL} />
      ))}
    </div>
  ),
};

/**
 * The 3 content modes: photo, initials, generic placeholder.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.ContentModes} />`.
 */
export const ContentModes: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-lg">
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" src={PHOTO_URL} />
        <span className="text-xs text-tertiary">Photo</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" text="OR" />
        <span className="text-xs text-tertiary">Initials</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" placeholder />
        <span className="text-xs text-tertiary">Placeholder</span>
      </div>
    </div>
  ),
};

/**
 * The 4 status-icon overlays.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.StatusIcons} />`.
 */
export const StatusIcons: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-lg">
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" src={PHOTO_URL} statusIcon="online-indicator" online />
        <span className="text-xs text-tertiary">Online</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" src={PHOTO_URL} statusIcon="online-indicator" online={false} />
        <span className="text-xs text-tertiary">Offline</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" src={PHOTO_URL} statusIcon="company" />
        <span className="text-xs text-tertiary">Company</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Avatar size="xl" src={PHOTO_URL} statusIcon="verified" />
        <span className="text-xs text-tertiary">Verified</span>
      </div>
    </div>
  ),
};

/**
 * `_Avatar add button` — hover to see the "Add user" tooltip.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.AddButton} />`.
 */
export const AddButton: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-lg pt-6">
      <AvatarAddButton size="md" />
      <AvatarAddButton size="md" disabled />
    </div>
  ),
};

/**
 * `_Avatar profile photo` — square/portrait framing, its own sm/md/lg scale.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.ProfilePhoto} />`.
 */
export const ProfilePhoto: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-end gap-lg">
      <AvatarProfilePhoto size="sm" src={PHOTO_URL} />
      <AvatarProfilePhoto size="md" src={PHOTO_URL} />
      <AvatarProfilePhoto size="lg" src={PHOTO_URL} />
    </div>
  ),
};

/**
 * `Avatar + Label Group` composite — avatar with a name and supporting text.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.LabelGroup} />`.
 */
export const LabelGroup: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-col items-start gap-lg">
      <AvatarLabelGroup size="sm" src={PHOTO_URL} name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      <AvatarLabelGroup size="md" src={PHOTO_URL} name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      <AvatarLabelGroup size="lg" text="OR" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      <AvatarLabelGroup size="xl" text="OR" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
    </div>
  ),
};

/**
 * Large avatar with the `verified` status icon — the "Avatar + verified
 * badge" composite from the spec, expressed as a size/statusIcon
 * combination rather than a separate component.
 * Outside the sidebar (`!dev`) — embedded in Avatar.mdx via `<Canvas of={AvatarStories.VerifiedLarge} />`.
 */
export const VerifiedLarge: Story = {
  tags: ['!dev'],
  render: () => <Avatar size="2xl" src={PHOTO_URL} statusIcon="verified" />,
};
