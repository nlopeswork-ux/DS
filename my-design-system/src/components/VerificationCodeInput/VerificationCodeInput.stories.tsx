import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VerificationCodeInput } from './VerificationCodeInput';
import type { VerificationCodeSize } from './VerificationCodeInput.types';

const sizeOptions = ['sm', 'md', 'lg'] satisfies VerificationCodeSize[];

const meta = {
  title: 'Components/Verification Code Input',
  component: VerificationCodeInput,
  // The Docs page comes from VerificationCodeInput.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onChange: fn(),
    onComplete: fn(),
    label: 'Verification code',
    // Always supplied so toggling "Error" in the Playground shows a
    // complete error state instead of nothing.
    errorMessage: 'That code is invalid or has expired.',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Label text rendered above the digit boxes.',
      control: 'text',
    },
    size: {
      name: 'Size',
      description: 'Size of each digit box.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    digits: {
      name: 'Digits',
      description: 'Number of individual digit boxes.',
      control: { type: 'select' },
      options: [4, 6],
    },
    error: {
      name: 'Error',
      description: 'Activates the destructive/error visual state on every digit box.',
      control: 'boolean',
    },
    errorMessage: {
      name: 'Error Message',
      description: 'Message rendered below the boxes when Error is active.',
      control: 'text',
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables interaction on every digit box.',
      control: 'boolean',
    },
    onChange: { table: { disable: true } },
    onComplete: { table: { disable: true } },
    value: { table: { disable: true } },
    name: { table: { disable: true } },
  },
} satisfies Meta<typeof VerificationCodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every combination. */
export const Playground: Story = {
  args: {
    size: 'md',
    digits: 6,
    error: false,
    disabled: false,
  },
};

/**
 * 4-digit code, common for SMS OTP.
 * Outside the sidebar (`!dev`) — embedded in VerificationCodeInput.mdx.
 */
export const FourDigits: Story = {
  tags: ['!dev'],
  args: {
    digits: 4,
  },
};

/**
 * Sizes side by side.
 * Outside the sidebar (`!dev`) — embedded in VerificationCodeInput.mdx.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-xl">
      {sizeOptions.map((size) => (
        <VerificationCodeInput key={size} {...args} size={size} digits={4} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

/**
 * Disabled state.
 * Outside the sidebar (`!dev`) — embedded in VerificationCodeInput.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    defaultValue: '13',
  },
};

/**
 * Error/destructive state.
 * Outside the sidebar (`!dev`) — embedded in VerificationCodeInput.mdx.
 */
export const ErrorState: Story = {
  tags: ['!dev'],
  args: {
    error: true,
    errorMessage: 'That code is invalid or has expired.',
  },
};
