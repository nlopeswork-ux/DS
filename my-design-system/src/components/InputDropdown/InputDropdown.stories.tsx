import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { InputDropdown } from './InputDropdown';
import type { InputDropdownOption } from './InputDropdown.types';

const FlagIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path d="M4.167 2.5v15M4.167 3.333h9.166l-1.666 3.334 1.666 3.333H4.167" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const roleOptions: InputDropdownOption[] = [
  { value: 'owner', label: 'Owner', supportingText: 'Full access to every setting.', icon: <FlagIcon /> },
  { value: 'admin', label: 'Admin', supportingText: 'Can manage members and billing.', icon: <FlagIcon /> },
  { value: 'member', label: 'Member', supportingText: 'Standard project access.', icon: <FlagIcon /> },
  { value: 'viewer', label: 'Viewer', supportingText: 'Read-only access.', disabled: true, icon: <FlagIcon /> },
];

const statusOptions: InputDropdownOption[] = [
  { value: 'todo', label: 'To do', dotColor: 'var(--color-gray-400, #98a2b3)' },
  { value: 'in-progress', label: 'In progress', dotColor: 'var(--color-warning-500, #f79009)' },
  { value: 'done', label: 'Done', dotColor: 'var(--color-success-500, #17b26a)' },
];

const countryOptions: InputDropdownOption[] = Array.from({ length: 12 }, (_, i) => ({
  value: `country-${i}`,
  label: [
    'Portugal', 'Spain', 'France', 'Germany', 'Italy', 'Netherlands',
    'Belgium', 'Ireland', 'Sweden', 'Norway', 'Denmark', 'Finland',
  ][i],
}));

const meta = {
  title: 'Components/InputDropdown',
  component: InputDropdown,
  // The Docs page comes from InputDropdown.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onChange: fn(),
    label: 'Role',
    placeholder: 'Select a role',
    hint: 'Controls what this member can see and do.',
    options: roleOptions,
    // Always supplied so toggling "Error" in the Playground shows a
    // complete error state instead of nothing.
    errorMessage: 'Please select a role.',
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
    placeholder: {
      name: 'Placeholder',
      description: 'Text shown when no option is selected.',
      control: 'text',
    },
    error: {
      name: 'Error',
      description: 'Activates the destructive/error visual state.',
      control: 'boolean',
    },
    errorMessage: {
      name: 'Error Message',
      description: 'Message rendered below the field when Error is active.',
      control: 'text',
    },
    required: {
      name: 'Required',
      description: 'Marks the field as required and shows an asterisk next to the label.',
      control: 'boolean',
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables interaction via the native disabled attribute.',
      control: 'boolean',
    },
    searchable: {
      name: 'Searchable',
      description: 'Adds a type-ahead filter over the option list.',
      control: 'boolean',
    },
    onChange: { table: { disable: true } },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    id: { table: { disable: true } },
  },
} satisfies Meta<typeof InputDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every combination. */
export const Playground: Story = {
  args: {
    error: false,
    required: false,
    disabled: false,
    searchable: false,
    defaultOpen: true,
    defaultValue: 'admin',
  },
};

/**
 * `type: 'Dot leading'` — a colored status dot instead of an icon.
 * Outside the sidebar (`!dev`) — embedded in InputDropdown.mdx.
 */
export const DotLeading: Story = {
  tags: ['!dev'],
  args: {
    label: 'Status',
    hint: undefined,
    options: statusOptions,
    defaultValue: 'in-progress',
    defaultOpen: true,
  },
};

/**
 * `type: 'Search'` — a type-ahead filter over a long option list.
 * Outside the sidebar (`!dev`) — embedded in InputDropdown.mdx.
 */
export const Search: Story = {
  tags: ['!dev'],
  args: {
    label: 'Country',
    hint: undefined,
    options: countryOptions,
    searchable: true,
    defaultOpen: true,
  },
};

/**
 * Disabled state.
 * Outside the sidebar (`!dev`) — embedded in InputDropdown.mdx.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    hint: undefined,
    defaultValue: 'member',
  },
};

/**
 * Error/destructive state, with a validation message.
 * Outside the sidebar (`!dev`) — embedded in InputDropdown.mdx.
 */
export const ErrorState: Story = {
  tags: ['!dev'],
  args: {
    error: true,
    errorMessage: 'Please select a role.',
    hint: undefined,
  },
};
