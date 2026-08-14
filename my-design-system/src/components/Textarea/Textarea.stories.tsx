import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  // The Docs page comes from Textarea.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onChange: fn(),
    label: 'Message',
    placeholder: 'Write your message...',
    hint: 'Maximum 500 characters.',
    // Always supplied so toggling "Destructive" in the Playground shows a
    // complete error state instead of leaving the neutral hint in place.
    errorMessage: 'Message must be at least 20 characters long.',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Label text rendered above the field.',
      control: 'text',
    },
    hint: {
      name: 'Hint Text',
      description: 'Helper text rendered below the field.',
      control: 'text',
    },
    destructive: {
      name: 'Destructive',
      description: 'Activates the destructive/error visual state.',
      control: 'boolean',
    },
    errorMessage: {
      name: 'Error Message',
      description: 'Message rendered below the field when Destructive is active.',
      control: 'text',
    },
    required: {
      name: 'Required',
      description: 'Marks the field as required and shows an asterisk next to the label.',
      control: 'boolean',
    },
    helpIcon: {
      name: 'Help Icon',
      description: 'Shows a help icon in the label row (an alert icon when Destructive).',
      control: 'boolean',
    },
    resizeHandle: {
      name: 'Resize Handle',
      description: 'Allows the field to be resized vertically.',
      control: 'boolean',
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables interaction via the native disabled attribute.',
      control: 'boolean',
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Placeholder text shown when the field is empty.',
      control: 'text',
    },
    onChange: { table: { disable: true } },
    type: { table: { disable: true } },
    state: { table: { disable: true } },
    tags: { table: { disable: true } },
    onTagsChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every textarea combination. */
export const Playground: Story = {
  args: {
    destructive: false,
    required: true,
    helpIcon: true,
    resizeHandle: true,
    disabled: false,
  },
};

/**
 * `type: 'tags'` — chips render above the compose area; Enter turns the
 * current text into a new chip, Backspace on an empty line removes the last one.
 * Outside the sidebar (`!dev`) — embedded in Textarea.mdx.
 */
function TagsDemo(args: ComponentProps<typeof Textarea>) {
  const [tagList, setTagList] = useState([
    { id: '1', label: 'design-system' },
    { id: '2', label: 'accessibility' },
  ]);
  return (
    <Textarea
      {...args}
      label="Keywords"
      hint="Press Enter to add a keyword."
      placeholder="Type a keyword and press Enter..."
      type="tags"
      tags={tagList}
      onTagsChange={setTagList}
    />
  );
}

export const Tags: Story = {
  tags: ['!dev'],
  render: (args) => <TagsDemo {...args} />,
};

/**
 * Disabled state.
 * Outside the sidebar (`!dev`) — embedded in Textarea.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    hint: undefined,
    defaultValue: 'This field is currently read-only.',
  },
};

/**
 * Destructive/error state, with a validation message.
 * Outside the sidebar (`!dev`) — embedded in Textarea.mdx.
 */
export const DestructiveState: Story = {
  tags: ['!dev'],
  args: {
    destructive: true,
    errorMessage: 'Message must be at least 20 characters long.',
    hint: undefined,
  },
};
