import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { Radio } from './Radio';
import type { RadioSize } from './Radio.types';

const sizeOptions = ['sm', 'md'] satisfies RadioSize[];

const meta = {
  title: 'Components/Radio',
  component: Radio,
  // The Docs page comes from Radio.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    name: 'radio-demo',
    onChange: fn(),
    label: 'Email me about product updates',
    supportingText: 'Occasional emails, no spam.',
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
    name: { table: { disable: true } },
    onChange: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Live Playground — freely experiment with every radio combination.
 * Uses `useArgs` so the "Checked" control and clicking the radio directly
 * stay in sync (a plain `defaultChecked` arg can't reflect clicks back into
 * the Controls panel, since it only seeds the initial uncontrolled state).
 */
export const Playground: Story = {
  args: {
    size: 'md',
    error: false,
    disabled: false,
    checked: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Radio
        {...args}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
        }}
      />
    );
  },
};

/**
 * A full radio group — only one option can be selected at a time
 * (native behavior via the shared `name` attribute).
 * Outside the sidebar (`!dev`) — embedded in Radio.mdx via `<Canvas of={RadioStories.Group} />`.
 */
export const Group: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-lg">
      <Radio {...args} name="plan" label="Free" supportingText="Basic features, no cost." defaultChecked />
      <Radio {...args} name="plan" label="Pro" supportingText="Full feature set, billed monthly." />
      <Radio {...args} name="plan" label="Enterprise" supportingText="Custom limits and dedicated support." />
    </div>
  ),
};

/**
 * Sizes side by side.
 * Outside the sidebar (`!dev`) — embedded in Radio.mdx via `<Canvas of={RadioStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex items-center gap-xl">
      {sizeOptions.map((size) => (
        <Radio key={size} {...args} size={size} label={`Radio ${size}`} supportingText={undefined} defaultChecked />
      ))}
    </div>
  ),
};

/**
 * Disabled state, unchecked and checked.
 * Outside the sidebar (`!dev`) — embedded in Radio.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex items-center gap-xl">
      <Radio {...args} name="disabled-demo" disabled defaultChecked={false} label="Unchecked" supportingText={undefined} />
      <Radio {...args} name="disabled-demo-2" disabled defaultChecked label="Checked" supportingText={undefined} />
    </div>
  ),
};

/**
 * Error/destructive state.
 * Outside the sidebar (`!dev`) — embedded in Radio.mdx.
 */
export const ErrorState: Story = {
  tags: ['!dev'],
  args: {
    label: 'Email me about product updates',
    supportingText: 'A selection is required to continue.',
    error: true,
  },
};
