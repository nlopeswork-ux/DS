import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Icon } from '../Icon';
import { Input } from './Input';
import type { InputProps, InputSize, InputType } from './Input.types';

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

/** Curated Material Symbols sample for the `iconSwapName` pseudo-arg below — same list as Icon.stories.tsx. */
const iconNameOptions = ['mail', 'search', 'person', 'home', 'settings', 'favorite', 'flag', 'domain'];

/**
 * Playground-only wrapper — adds `trailingButtonLabel` (editable text for
 * the trailing button without exposing the whole `trailingButton` object)
 * and `iconSwapName` (a Material Symbols name driving `iconSwap` via a
 * dropdown instead of a hidden ReactNode prop) as pseudo-args, neither of
 * which are real Input props.
 */
type InputPlaygroundProps = InputProps & { trailingButtonLabel?: string; iconSwapName?: string };

const InputPlayground = ({ trailingButtonLabel, trailingButton, iconSwapName, iconSwap, ...rest }: InputPlaygroundProps) => (
  <Input
    {...rest}
    trailingButton={trailingButton && { ...trailingButton, label: trailingButtonLabel ?? trailingButton.label }}
    iconSwap={iconSwapName ? <Icon name={iconSwapName} size="sm" /> : iconSwap}
  />
);

/** Stylized card graphic, not a pictogram — kept as a one-off SVG (not a Material Symbols glyph). */
const CardIcon = () => (
  <svg viewBox="0 0 34 24" fill="none" className="h-full w-full">
    <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" stroke="#D0D5DD" />
    <rect x="0.5" y="6.5" width="33" height="4" fill="#1C7E78" />
    <rect x="3.5" y="15.5" width="10" height="2.5" rx="1.25" fill="#D0D5DD" />
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
  component: InputPlayground,
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
    iconSwapName: 'mail',
    leadingDropdown: { options: countryOptions, defaultValue: 'us', ariaLabel: 'Country code' },
    trailingDropdown: { options: currencyOptions, defaultValue: 'usd', ariaLabel: 'Currency' },
    leadingTextAddon: 'http://',
    paymentIcon: <CardIcon />,
    tags: [
      { id: '1', label: 'design-system' },
      { id: '2', label: 'accessibility' },
    ],
    trailingButton: { label: 'Copy', icon: <Icon name="content_copy" size="xs" /> },
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
    // Sequential disclosure — only relevant once Destructive is on
    // (CLAUDE.md's Playground sequencing rule: a field gated behind
    // another variant only appears once that variant is actually active).
    errorMessage: {
      name: 'Error Message',
      description: 'Message rendered below the field when Destructive is active.',
      control: 'text',
      if: { arg: 'destructive', truthy: true },
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
    // Pseudo-arg, not a real Input prop — drives `iconSwap` via a Material
    // Symbols name dropdown. Sequential disclosure — only shown once Type
    // is actually "iconLeading".
    iconSwapName: {
      name: 'Leading Icon',
      description: 'Icon shown when Type is "iconLeading".',
      control: { type: 'select' },
      options: iconNameOptions,
      if: { arg: 'type', eq: 'iconLeading' },
    },
    leadingTextAddon: {
      name: 'Leading Text',
      description: 'Text add-on content — only visible when Type is "leadingText".',
      control: 'text',
      if: { arg: 'type', eq: 'leadingText' },
    },
    // Not a real Input prop — only exists in this story so the trailing
    // button's label is editable in the Playground without exposing the
    // whole `trailingButton` object (icon + onClick) as a control.
    // Sequential disclosure — only visible once Type is "trailingButton".
    trailingButtonLabel: {
      name: 'Trailing Button Label',
      description: 'Button text — only visible when Type is "trailingButton".',
      control: 'text',
      if: { arg: 'type', eq: 'trailingButton' },
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
} satisfies Meta<typeof InputPlayground>;

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
};

/**
 * `type: 'iconLeading'` — a decorative icon reinforcing the field's content.
 * Outside the sidebar (`!dev`) — embedded in Input.mdx.
 */
export const IconLeading: Story = {
  tags: ['!dev'],
  args: {
    type: 'iconLeading',
    iconSwap: <Icon name="mail" size="sm" />,
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
    trailingButton: { label: 'Copy', icon: <Icon name="content_copy" size="xs" /> },
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
        <InputPlayground key={size} {...args} size={size} label={`Input ${size}`} hint={undefined} />
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
