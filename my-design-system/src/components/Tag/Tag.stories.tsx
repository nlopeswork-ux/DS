import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import { CountryIcon } from '../CountryIcon';
import { Avatar } from '../Avatar';
import type { TagAction, TagIcon, TagSize } from './Tag.types';

const sizeOptions = ['sm', 'md', 'lg'] satisfies TagSize[];

const iconOptions = ['False', 'Country', 'Avatar', 'Dot'] satisfies TagIcon[];

const actionOptions = ['Text only', 'X close', 'Count'] satisfies TagAction[];

const meta = {
  title: 'Components/Tag',
  component: Tag,
  // The Docs page comes from Tag.mdx (<Meta of={TagStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    children: 'Label',
    count: '5',
  },
  argTypes: {
    children: {
      name: 'Label Text',
      description: 'Text content of the tag.',
      control: 'text',
    },
    size: {
      name: 'Size',
      description: 'Size of the tag.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    icon: {
      name: 'Icon',
      description: 'Icon slot shown before the label.',
      control: { type: 'select' },
      options: iconOptions,
    },
    action: {
      name: 'Action',
      description: 'Trailing action slot.',
      control: { type: 'select' },
      options: actionOptions,
    },
    checkbox: {
      name: 'Checkbox',
      description: 'Shows a leading selection checkbox.',
      control: 'boolean',
    },
    checked: {
      name: 'Checked',
      description: 'Checkbox checked state.',
      control: 'boolean',
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the checkbox.',
      control: 'boolean',
    },
    // Technical noise — kept out of the Live Playground.
    count: { table: { disable: true } },
    flagSwap: { table: { disable: true } },
    avatarSwap: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every tag combination. */
export const Playground: Story = {
  args: {
    size: 'md',
    icon: 'False',
    action: 'Text only',
    checkbox: false,
    checked: false,
    disabled: false,
  },
};

/**
 * The 3 sizes, side by side.
 * Outside the sidebar (`!dev`) — embedded in Tag.mdx via `<Canvas of={TagStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-end gap-lg">
      {sizeOptions.map((size) => (
        <Tag key={size} size={size}>
          Tag {size}
        </Tag>
      ))}
    </div>
  ),
};

/**
 * Every icon slot.
 * Outside the sidebar (`!dev`) — embedded in Tag.mdx via `<Canvas of={TagStories.IconSlots} />`.
 */
export const IconSlots: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-lg">
      <Tag icon="False">No icon</Tag>
      <Tag icon="Dot">Online</Tag>
      <Tag icon="Country" flagSwap={<CountryIcon code="PT" size={16} />}>
        Portugal
      </Tag>
      <Tag icon="Avatar" avatarSwap={<Avatar size="xs" text="OR" className="size-4" />}>
        Olivia
      </Tag>
    </div>
  ),
};

/**
 * The 3 trailing actions.
 * Outside the sidebar (`!dev`) — embedded in Tag.mdx via `<Canvas of={TagStories.Actions} />`.
 */
export const Actions: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-lg">
      <Tag action="Text only">Text only</Tag>
      <Tag action="X close" onClose={() => alert('onClose fired')}>
        Removable
      </Tag>
      <Tag action="Count" count="24">
        Count
      </Tag>
    </div>
  ),
};

const SELECTABLE_OPTIONS = ['Design', 'Engineering', 'Product'];

function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>(['Design']);

  return (
    <div className="flex flex-wrap items-center gap-lg">
      {SELECTABLE_OPTIONS.map((label) => (
        <Tag
          key={label}
          checkbox
          checked={selected.includes(label)}
          onCheckedChange={(next) =>
            setSelected((prev) => (next ? [...prev, label] : prev.filter((item) => item !== label)))
          }
        >
          {label}
        </Tag>
      ))}
    </div>
  );
}

/**
 * Interactive checkbox selection — controlled example.
 * Outside the sidebar (`!dev`) — embedded in Tag.mdx via `<Canvas of={TagStories.Selectable} />`.
 */
export const Selectable: Story = {
  tags: ['!dev'],
  render: () => <SelectableDemo />,
};

/**
 * A disabled checkbox tag.
 * Outside the sidebar (`!dev`) — embedded in Tag.mdx via `<Canvas of={TagStories.Disabled} />`.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: { checkbox: true, checked: false, disabled: true, children: 'Disabled' },
};
