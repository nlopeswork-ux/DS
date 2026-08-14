import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Input } from './Input';
import type { InputSize, InputType } from './Input.types';

const sizeOptions = ['sm', 'md'] satisfies InputSize[];
const typeOptions = [
  'default',
  'iconLeading',
  'leadingDropdown',
  'trailingDropdown',
  'leadingText',
  'paymentInput',
  'tags',
  'trailingButton',
] satisfies InputType[];

const MailIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path
      d="M3.333 5.833h13.334c.46 0 .833.373.833.834v6.666a.833.833 0 0 1-.833.834H3.333a.833.833 0 0 1-.833-.834V6.667c0-.46.373-.834.833-.834Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="m3.333 6.667 6.25 4.375a.833.833 0 0 0 .834 0l6.25-4.375" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 34 24" fill="none" className="h-full w-full">
    <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" stroke="#D0D5DD" />
    <rect x="0.5" y="6.5" width="33" height="4" fill="#1C7E78" />
    <rect x="3.5" y="15.5" width="10" height="2.5" rx="1.25" fill="#D0D5DD" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path
      d="M13.333 7.5H8.333c-.92 0-1.666.746-1.666 1.667v5c0 .92.746 1.666 1.666 1.666h5c.92 0 1.667-.746 1.667-1.666v-5c0-.921-.746-1.667-1.667-1.667Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4.167 12.5a1.667 1.667 0 0 1-1.667-1.667v-5c0-.92.746-1.666 1.667-1.666h5c.92 0 1.666.746 1.666 1.666" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const countryOptions = [
  { value: 'us', label: 'US +1' },
  { value: 'pt', label: 'PT +351' },
  { value: 'uk', label: 'UK +44' },
];

const currencyOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'eur', label: 'EUR' },
  { value: 'gbp', label: 'GBP' },
];

const meta = {
  title: 'Components/Input',
  component: Input,
  // The Docs page comes from Input.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onChange: fn(),
    label: 'Email',
    placeholder: 'you@company.com',
    hint: 'We will never share your email.',
    // Demo data for every `type`-gated slot, always supplied so switching
    // "Type" in the Playground shows real content instead of an empty
    // field — each slot only renders when its matching `type` is active.
    errorMessage: 'Please enter a valid email address.',
    iconSwap: <MailIcon />,
    leadingDropdown: { options: countryOptions, defaultValue: 'us', ariaLabel: 'Country code' },
    trailingDropdown: { options: currencyOptions, defaultValue: 'usd', ariaLabel: 'Currency' },
    leadingTextAddon: 'http://',
    paymentIcon: <CardIcon />,
    tags: [
      { id: '1', label: 'design-system' },
      { id: '2', label: 'accessibility' },
    ],
    trailingButton: { label: 'Copy', icon: <CopyIcon /> },
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
    size: {
      name: 'Size',
      description: 'Size of the field.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    type: {
      name: 'Type',
      description: 'Structural variant — drives the leading/trailing slot.',
      control: { type: 'select' },
      options: typeOptions,
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
      description: 'Shows a trailing help icon (an alert icon when Destructive). Hidden automatically when the trailing slot is occupied.',
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
    leadingTextAddon: {
      name: 'Leading Text',
      description: 'Text add-on content — only visible when Type is "leadingText".',
      control: 'text',
    },
    // Not a real Input prop — only exists in this story so the trailing
    // button's label is editable in the Playground without exposing the
    // whole `trailingButton` object (icon + onClick) as a control.
    trailingButtonLabel: {
      name: 'Trailing Button Label',
      description: 'Button text — only visible when Type is "trailingButton".',
      control: 'text',
    },
    onChange: { table: { disable: true } },
    state: { table: { disable: true } },
    iconSwap: { table: { disable: true } },
    leadingDropdown: { table: { disable: true } },
    trailingDropdown: { table: { disable: true } },
    paymentIcon: { table: { disable: true } },
    tags: { table: { disable: true } },
    onTagsChange: { table: { disable: true } },
    trailingButton: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every input combination. */
export const Playground: Story = {
  args: {
    size: 'sm',
    type: 'default',
    destructive: false,
    required: true,
    helpIcon: true,
    disabled: false,
    trailingButtonLabel: 'Copy',
  },
  render: ({ trailingButtonLabel, trailingButton, ...args }) => (
    <Input {...args} trailingButton={{ ...trailingButton, label: trailingButtonLabel ?? trailingButton?.label }} />
  ),
};

/**
 * `type: 'iconLeading'` — a decorative icon reinforcing the field's content.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const IconLeading: Story = {
  tags: ['!dev'],
  args: {
    type: 'iconLeading',
    iconSwap: <MailIcon />,
  },
};

/**
 * `type: 'leadingDropdown'` — a compact native select fused to the start of the field (e.g. a phone prefix).
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const LeadingDropdown: Story = {
  tags: ['!dev'],
  args: {
    label: 'Phone number',
    hint: undefined,
    placeholder: '555 010 0100',
    type: 'leadingDropdown',
    leadingDropdown: { options: countryOptions, defaultValue: 'us', ariaLabel: 'Country code' },
  },
};

/**
 * `type: 'trailingDropdown'` — a compact native select fused to the end of the field (e.g. a currency unit).
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const TrailingDropdown: Story = {
  tags: ['!dev'],
  args: {
    label: 'Amount',
    hint: undefined,
    placeholder: '0.00',
    type: 'trailingDropdown',
    trailingDropdown: { options: currencyOptions, defaultValue: 'usd', ariaLabel: 'Currency' },
  },
};

/**
 * `type: 'leadingText'` — a static text add-on sharing the field's own padding, no separate background.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const LeadingText: Story = {
  tags: ['!dev'],
  args: {
    label: 'Website',
    hint: undefined,
    placeholder: 'yourcompany.com',
    type: 'leadingText',
    leadingTextAddon: 'http://',
  },
};

/**
 * `type: 'paymentInput'` — a payment-method icon in the leading slot.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const PaymentInput: Story = {
  tags: ['!dev'],
  args: {
    label: 'Card number',
    hint: undefined,
    placeholder: '1234 1234 1234 1234',
    type: 'paymentInput',
    paymentIcon: <CardIcon />,
  },
};

/**
 * `type: 'tags'` — chips render before the text, with an internal compose buffer (Enter to add).
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const Tags: Story = {
  tags: ['!dev'],
  args: {
    label: 'Keywords',
    hint: 'Press Enter to add a keyword.',
    placeholder: 'Type a keyword...',
    type: 'tags',
    tags: [
      { id: '1', label: 'design-system' },
      { id: '2', label: 'accessibility' },
    ],
  },
};

/**
 * `type: 'trailingButton'` — an action button fused to the end of the field.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const TrailingButton: Story = {
  tags: ['!dev'],
  args: {
    label: 'Referral link',
    hint: undefined,
    defaultValue: 'https://app.example.com/r/abc123',
    type: 'trailingButton',
    trailingButton: { label: 'Copy', icon: <CopyIcon /> },
  },
};

/**
 * Sizes side by side.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-lg">
      {sizeOptions.map((size) => (
        <Input key={size} {...args} size={size} label={`Input ${size}`} hint={undefined} />
      ))}
    </div>
  ),
};

/**
 * Disabled state.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    hint: undefined,
  },
};

/**
 * Destructive/error state, with a validation message.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const DestructiveState: Story = {
  tags: ['!dev'],
  args: {
    destructive: true,
    errorMessage: 'Please enter a valid email address.',
    hint: undefined,
  },
};
