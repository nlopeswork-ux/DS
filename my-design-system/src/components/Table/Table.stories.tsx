import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Radio } from '../Radio';
import { CustomersTable, FilesTable, SalesTable, TeamMembersMobile, TeamMembersTable } from './Table.examples';
import type { TeamMembersTableProps } from './Table.examples';
import { Table, TableBody, TableHead, TableRow } from './Table';
import { TableCell } from './TableCell';
import {
  TableCellActionButtons,
  TableCellActionIcons,
  TableCellActionMenu,
  TableCellAvatarGroup,
  TableCellBadges,
  TableCellExpand,
  TableCellLead,
  TableCellNumber,
  TableCellPaymentIcon,
  TableCellProgress,
  TableCellRating,
  TableCellText,
  TableCellTrend,
  TableToggle,
} from './TableCellParts';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import type { TableCellState } from './Table.types';

const photo = (name: string) => `${import.meta.env.BASE_URL}avatars/${name}.jpg`;

const dividerOptions = ['line', 'alternating'] as const;

const meta = {
  title: 'Components/Table',
  component: TeamMembersTable,
  // The Docs page comes from Table.mdx (<Meta of={TableStories} />) - no 'autodocs' tag.
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
  },
  args: {
    dividers: 'line',
    selectable: true,
    title: 'Team members',
    badge: '100 users',
    supportingText: '',
    menu: true,
    pagination: true,
    rows: 6,
  },
  argTypes: {
    dividers: { name: 'Dividers', description: 'Row separator.', control: { type: 'inline-radio' }, options: dividerOptions },
    selectable: { name: 'Selectable', description: 'Select-all and per-row checkboxes.', control: 'boolean' },
    title: { name: 'Title', description: 'Card title.', control: 'text' },
    badge: { name: 'Badge', description: 'Count badge next to the title.', control: 'text' },
    supportingText: { name: 'Supporting Text', description: 'Line under the title.', control: 'text' },
    menu: { name: 'Menu', description: 'Show the "more options" button.', control: 'boolean' },
    pagination: { name: 'Pagination', description: 'Show the footer pagination.', control: 'boolean' },
    rows: { name: 'Rows', description: 'Number of rows.', control: { type: 'number', min: 1, max: 8 } },
  },
} satisfies Meta<TeamMembersTableProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground - the Team members table; select rows, sort Status and page through. */
export const Playground: Story = {
  render: (args) => <TeamMembersTable {...args} />,
};

/** Outside the sidebar (`!dev`) - embedded in Table.mdx via `<Canvas of={TableStories.Customers} />`. */
export const Customers: Story = {
  tags: ['!dev'],
  render: () => <CustomersTable />,
};

export const Sales: Story = {
  tags: ['!dev'],
  render: () => <SalesTable />,
};

export const Files: Story = {
  tags: ['!dev'],
  render: () => <FilesTable />,
};

export const AlternatingFills: Story = {
  tags: ['!dev'],
  render: () => <TeamMembersTable dividers="alternating" rows={4} pagination={false} />,
};

export const Mobile: Story = {
  tags: ['!dev'],
  parameters: { layout: 'centered' },
  render: () => <TeamMembersMobile />,
};

/** A one-column table used to show a single cell on each row of the galleries. */
const CellRow = ({ label, state = 'default', children, align }: { label: string; state?: TableCellState; children: ReactNode; align?: 'left' | 'right' }) => (
  <TableRow className="hover:bg-transparent">
    <th scope="row" className="w-48 border-b border-secondary bg-primary px-xl text-left text-xs font-medium text-tertiary">
      {label}
    </th>
    <TableCell state={state} align={align} errorMessage={state === 'error' ? 'Enter a valid value' : undefined}>
      {children}
    </TableCell>
  </TableRow>
);

const avatar = <Avatar size="md" src={photo('women-44')} alt="" />;

/** Every cell style. Outside the sidebar (`!dev`) - embedded via `<Canvas of={TableStories.CellStyles} />`. */
export const CellStyles: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <Table dividers="line" tableLabel="Cell styles" className="w-160">
      <TableBody>
        <CellRow label="Lead text"><TableCellText lead primary="Olivia Rhye" supporting="olivia@kds.design" /></CellRow>
        <CellRow label="Text"><TableCellText primary="Product Designer" /></CellRow>
        <CellRow label="Text and supporting"><TableCellText primary="Content curating app" supporting="Brings all your news into one place" /></CellRow>
        <CellRow label="Badge"><TableCellBadges badges={[{ label: 'Active', color: 'Success' }]} /></CellRow>
        <CellRow label="Badges multiple"><TableCellBadges badges={[{ label: 'Design', color: 'Brand' }, { label: 'Product', color: 'Blue' }, { label: '+4' }]} /></CellRow>
        <CellRow label="Lead avatar"><TableCellLead visual={avatar} primary="Olivia Rhye" supporting="@olivia" /></CellRow>
        <CellRow label="Lead checkbox"><TableCellLead control={<Checkbox aria-label="Select" />} primary="Olivia Rhye" supporting="olivia@kds.design" /></CellRow>
        <CellRow label="Lead radio button"><TableCellLead control={<Radio aria-label="Select" name="cell-radio" />} primary="Olivia Rhye" supporting="olivia@kds.design" /></CellRow>
        <CellRow label="Lead toggle"><TableCellLead control={<TableToggle aria-label="Enabled" checked />} primary="Olivia Rhye" supporting="olivia@kds.design" /></CellRow>
        <CellRow label="Lead avatar checkbox"><TableCellLead control={<Checkbox aria-label="Select" />} visual={avatar} primary="Olivia Rhye" supporting="@olivia" /></CellRow>
        <CellRow label="Lead icon checkbox"><TableCellLead control={<Checkbox aria-label="Select" />} visual={<Icon name="description" size="md" className="fg-tertiary" />} primary="Tech requirements.pdf" supporting="200 KB" /></CellRow>
        <CellRow label="Lead payment method"><TableCellLead visual={<TableCellPaymentIcon />} primary="Visa ending in 1234" supporting="Expiry 06/2026" /></CellRow>
        <CellRow label="Avatar group"><TableCellAvatarGroup label="10 users" avatars={[{ src: photo('women-44') }, { src: photo('men-32') }, { src: photo('women-68') }, { src: photo('men-75') }]} extra={5} /></CellRow>
        <CellRow label="Trend positive"><TableCellTrend value="$1,800" percentage={20} trend="positive" /></CellRow>
        <CellRow label="Trend negative"><TableCellTrend value="$1,800" percentage={20} trend="negative" /></CellRow>
        <CellRow label="Progress bar"><TableCellProgress value={60} /></CellRow>
        <CellRow label="Action buttons"><TableCellActionButtons /></CellRow>
        <CellRow label="Action icons"><TableCellActionIcons actions={[{ icon: 'content_copy', label: 'Copy' }, { icon: 'download', label: 'Download' }, { icon: 'delete', label: 'Delete' }, { icon: 'edit', label: 'Edit' }]} /></CellRow>
        <CellRow label="Action dropdown icon"><TableCellActionMenu /></CellRow>
        <CellRow label="Star ratings"><TableCellRating value={4.5} /></CellRow>
        <CellRow label="Number" align="right"><TableCellNumber>1,284.00</TableCellNumber></CellRow>
        <CellRow label="Expand toggle"><TableCellExpand /></CellRow>
        <CellRow label="Expand toggle open"><TableCellExpand open /></CellRow>
      </TableBody>
    </Table>
  ),
};

const states: { label: string; state: TableCellState }[] = [
  { label: 'Default', state: 'default' },
  { label: 'Hover', state: 'hover' },
  { label: 'Selected', state: 'selected' },
  { label: 'Focus', state: 'focus' },
  { label: 'Disabled', state: 'disabled' },
  { label: 'Loading', state: 'loading' },
  { label: 'Error', state: 'error' },
  { label: 'Editing', state: 'editing' },
];

/** Every cell state on a lead-text cell. Outside the sidebar (`!dev`) - embedded via `<Canvas of={TableStories.CellStates} />`. */
export const CellStates: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <Table dividers="line" tableLabel="Cell states" className="w-160">
      <TableBody>
        {states.map(({ label, state }) => (
          <CellRow key={state} label={label} state={state}>
            <TableCellText lead primary="Olivia Rhye" supporting="olivia@kds.design" />
          </CellRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** Every header cell: label, help icon, sort arrows, checkbox, fills and states. Outside the sidebar (`!dev`) - embedded via `<Canvas of={TableStories.HeaderCells} />`. */
export const HeaderCells: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3xl">
      <div className="flex flex-wrap items-center gap-3xl">
        <TableHeader>Company</TableHeader>
        <TableHeader hover>Company</TableHeader>
        <TableHeader helpIcon>Company</TableHeader>
        <TableHeader sort="desc">Company</TableHeader>
        <TableHeader helpIcon sort="desc">Company</TableHeader>
        <TableHeader sort="asc">Company</TableHeader>
        <TableHeader helpIcon sort="asc">Company</TableHeader>
      </div>
      <Table tableLabel="Header cells" className="w-160">
        <TableHead>
          <TableRow className="hover:bg-transparent">
            <TableHeaderCell checkbox selectAll="unchecked">Company</TableHeaderCell>
            <TableHeaderCell checkbox selectAll="indeterminate">Company</TableHeaderCell>
            <TableHeaderCell checkbox selectAll="checked">Company</TableHeaderCell>
            <TableHeaderCell color="white" sort="desc">Company</TableHeaderCell>
            <TableHeaderCell color="white" focused>Company</TableHeaderCell>
            <TableHeaderCell align="right">Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  ),
};
