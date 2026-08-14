import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import { Dropdown } from './Dropdown';
import { DropdownListItem } from './DropdownListItem';
import { DropdownHeader } from './DropdownHeader';
import { DropdownDivider } from './DropdownDivider';
import { ScrollBar } from './ScrollBar';

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
        <DropdownListItem icon={<Icon name="person" size="sm" />}>Profile</DropdownListItem>
        <DropdownListItem icon={<Icon name="settings" size="sm" />} supportingText="Preferences and integrations">
          Settings
        </DropdownListItem>
        <DropdownDivider />
        <DropdownListItem icon={<Icon name="logout" size="sm" />} shortcut="⌘Q">
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
        <DropdownListItem icon={<Icon name="person" size="sm" />}>Profile</DropdownListItem>
        <DropdownListItem icon={<Icon name="settings" size="sm" />} disabled>
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
