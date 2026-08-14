import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Dropdown } from './Dropdown';
import { DropdownListItem } from './DropdownListItem';
import { DropdownHeader } from './DropdownHeader';
import { DropdownDivider } from './DropdownDivider';
import { ScrollBar } from './ScrollBar';

const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path d="M10 10a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 10 10Zm0 1.667c-3.333 0-6.667 1.666-6.667 4.166v.834h13.334v-.834c0-2.5-3.334-4.166-6.667-4.166Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="m16.167 12.5-.917 1.583.917 1.584-1.583.916-1.584-.916-1.833 1.05v1.85h-1.834v-1.85l-1.833-1.05-1.584.916-1.583-.916.917-1.584-.917-1.583 1.583-.917 1.584.917 1.833-1.05V9.633h1.834v1.85l1.833 1.05 1.584-.917 1.583.917Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-full w-full">
    <path
      d="M7.5 17.5H4.167a1.667 1.667 0 0 1-1.667-1.667V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5M13.333 14.167 17.5 10l-4.167-4.167M17.5 10H7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  // The Docs page comes from Dropdown.mdx — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  argTypes: {
    align: {
      name: 'Alignment',
      description: 'Horizontal alignment of the menu relative to the trigger.',
      control: { type: 'select' },
      options: ['start', 'end'],
    },
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
    open: { table: { disable: true } },
    defaultOpen: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with the menu alignment. */
export const Playground: Story = {
  args: {
    align: 'start',
    defaultOpen: true,
    trigger: <Button hierarchy="Secondary gray">Options</Button>,
    children: (
      <>
        <DropdownHeader>Account</DropdownHeader>
        <DropdownListItem icon={<UserIcon />}>Profile</DropdownListItem>
        <DropdownListItem icon={<SettingsIcon />} supportingText="Preferences and integrations">
          Settings
        </DropdownListItem>
        <DropdownDivider />
        <DropdownListItem icon={<LogoutIcon />} shortcut="⌘Q">
          Log out
        </DropdownListItem>
      </>
    ),
  },
};

/**
 * Multi-select menu using `checkbox` items — the menu stays open on selection.
 * Outside the sidebar (`!dev`) — embedded in Dropdown.mdx.
 */
function CheckboxMenuDemo() {
  const [selected, setSelected] = useState<string[]>(['status']);
  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  return (
    <Dropdown defaultOpen trigger={<Button hierarchy="Secondary gray">Columns</Button>}>
      <DropdownHeader>Visible columns</DropdownHeader>
      <DropdownListItem checkbox checked={selected.includes('name')} onSelect={() => toggle('name')}>
        Name
      </DropdownListItem>
      <DropdownListItem checkbox checked={selected.includes('status')} onSelect={() => toggle('status')}>
        Status
      </DropdownListItem>
      <DropdownListItem checkbox checked={selected.includes('owner')} onSelect={() => toggle('owner')}>
        Owner
      </DropdownListItem>
    </Dropdown>
  );
}

export const CheckboxMenu: Story = {
  tags: ['!dev'],
  render: () => <CheckboxMenuDemo />,
};

/**
 * A disabled item within an otherwise interactive menu.
 * Outside the sidebar (`!dev`) — embedded in Dropdown.mdx.
 */
export const DisabledItem: Story = {
  tags: ['!dev'],
  args: {
    defaultOpen: true,
    trigger: <Button hierarchy="Secondary gray">Options</Button>,
    children: (
      <>
        <DropdownListItem icon={<UserIcon />}>Profile</DropdownListItem>
        <DropdownListItem icon={<SettingsIcon />} disabled>
          Settings (no permission)
        </DropdownListItem>
      </>
    ),
  },
};

/**
 * The `_Scroll bar` decorative primitive, shown at its 3 documented lengths.
 * Outside the sidebar (`!dev`) — embedded in Dropdown.mdx.
 */
export const ScrollBarLengths: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex items-start gap-xl">
      <ScrollBar length="25%" />
      <ScrollBar length="50%" />
      <ScrollBar length="75%" />
    </div>
  ),
};
