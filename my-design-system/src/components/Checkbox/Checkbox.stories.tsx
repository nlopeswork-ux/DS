import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';
import type { CheckboxSize } from './Checkbox.types';

const sizeOptions = ['sm', 'md'] satisfies CheckboxSize[];

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  // The Docs page comes from Checkbox.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onChange: fn(),
    label: 'Accept terms and conditions',
    supportingText: 'You agree to our Terms of Service and Privacy Policy.',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Label text associated with the control.',
      control: 'text',
    },
    supportingText: {
      name: 'Supporting Text',
      description: 'Extra text rendered below the label.',
      control: 'text',
    },
    size: {
      name: 'Size',
      description: 'Size of the control.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    error: {
      name: 'Error',
      description: 'Activates the destructive/error visual state on the border.',
      control: 'boolean',
    },
    indeterminate: {
      name: 'Indeterminate',
      description: 'Renders the mixed/partial-selection state (dash icon) instead of the checkmark.',
      control: 'boolean',
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables interaction via the native disabled attribute.',
      control: 'boolean',
    },
    checked: {
      name: 'Checked',
      description: 'Selection state of the control.',
      control: 'boolean',
    },
    onChange: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Live Playground — freely experiment with every checkbox combination.
 * Uses `useArgs` so the "Checked" control and clicking the checkbox directly
 * stay in sync (a plain `defaultChecked` arg can't reflect clicks back into
 * the Controls panel, since it only seeds the initial uncontrolled state).
 */
export const Playground: Story = {
  args: {
    size: 'md',
    error: false,
    indeterminate: false,
    disabled: false,
    checked: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
        }}
      />
    );
  },
};

/**
 * A group of independent options, as used in a settings list.
 * Outside the sidebar (`!dev`) — embedded in Checkbox.mdx via `<Canvas of={CheckboxStories.Group} />`.
 */
export const Group: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-lg">
      <Checkbox {...args} label="Email notifications" supportingText="Get notified when someone mentions you." defaultChecked />
      <Checkbox {...args} label="Push notifications" supportingText="Get notified on your mobile device." />
      <Checkbox {...args} label="Weekly digest" supportingText="A summary of activity, every Monday." defaultChecked />
    </div>
  ),
};

/**
 * Sizes side by side.
 * Outside the sidebar (`!dev`) — embedded in Checkbox.mdx via `<Canvas of={CheckboxStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex items-center gap-xl">
      {sizeOptions.map((size) => (
        <Checkbox key={size} {...args} size={size} label={`Checkbox ${size}`} supportingText={undefined} defaultChecked />
      ))}
    </div>
  ),
};

/**
 * Indeterminate (mixed) selection — typically a "select all" checkbox
 * whose children are partially selected.
 * Outside the sidebar (`!dev`) — embedded in Checkbox.mdx.
 */
export const Indeterminate: Story = {
  tags: ['!dev'],
  args: {
    label: 'Select all items',
    supportingText: undefined,
    indeterminate: true,
  },
};

/**
 * Disabled state, unchecked and checked.
 * Outside the sidebar (`!dev`) — embedded in Checkbox.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex items-center gap-xl">
      <Checkbox {...args} disabled defaultChecked={false} label="Unchecked" supportingText={undefined} />
      <Checkbox {...args} disabled defaultChecked label="Checked" supportingText={undefined} />
    </div>
  ),
};

/**
 * Error/destructive state.
 * Outside the sidebar (`!dev`) — embedded in Checkbox.mdx.
 */
export const ErrorState: Story = {
  tags: ['!dev'],
  args: {
    label: 'Accept terms and conditions',
    supportingText: 'You must accept the terms to continue.',
    error: true,
  },
};
