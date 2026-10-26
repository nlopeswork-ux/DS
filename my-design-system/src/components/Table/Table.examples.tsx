import { useState } from 'react';
import { Avatar } from '../Avatar';
import type { BadgeColor } from '../Badge';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Pagination } from '../Pagination';
import { Table, TableBody, TableHead, TableRow } from './Table';
import { TableCell } from './TableCell';
import {
  TableCellActionIcons,
  TableCellActionMenu,
  TableCellBadges,
  TableCellLead,
  TableCellProgress,
  TableCellText,
} from './TableCellParts';
import { TableHeaderCell } from './TableHeaderCell';
import { TableMobileRow } from './TableMobileRow';
import type { TableDividers, TableSortDirection } from './Table.types';

/** Story-only data and compositions. They show how the Table parts fit together; they are not part of the public API. */

const photo = (name: string) => `${import.meta.env.BASE_URL}avatars/${name}.jpg`;

interface Member {
  name: string;
  handle: string;
  role: string;
  photo?: string;
  initials?: string;
}

const members: Member[] = [
  { name: 'Olivia Rhye', handle: '@olivia', role: 'Product Designer', photo: 'women-44' },
  { name: 'Phoenix Baker', handle: '@phoenix', role: 'Product Manager', photo: 'men-32' },
  { name: 'Lana Steiner', handle: '@lana', role: 'Frontend Developer', photo: 'women-68' },
  { name: 'Demi Wilkinson', handle: '@demi', role: 'Backend Developer', photo: 'men-75' },
  { name: 'Candice Wu', handle: '@candice', role: 'Fullstack Developer', initials: 'CW' },
  { name: 'Natali Craig', handle: '@natali', role: 'UX Designer', photo: 'women-44' },
  { name: 'Drew Cano', handle: '@drew', role: 'UX Copywriter', photo: 'men-32' },
  { name: 'Orlando Diggs', handle: '@orlando', role: 'UI Designer', initials: 'OD' },
];

const memberAvatar = (member: Member) => (
  <Avatar size="md" src={member.photo ? photo(member.photo) : undefined} text={member.initials} alt={member.name} />
);

const teams: { label: string; color: BadgeColor }[] = [
  { label: 'Design', color: 'Brand' },
  { label: 'Product', color: 'Blue' },
  { label: 'Marketing', color: 'Indigo' },
  { label: '+4', color: 'Gray' },
];

const statusBadge = (label: string, color: BadgeColor = 'Success') => (
  <Badge size="sm" type="Badge modern" icon="Dot" color={color}>
    {label}
  </Badge>
);

export interface TeamMembersTableProps {
  dividers?: TableDividers;
  /** Select-all checkbox and a checkbox on every row. */
  selectable?: boolean;
  title?: string;
  badge?: string;
  supportingText?: string;
  menu?: boolean;
  pagination?: boolean;
  rows?: number;
}

/** Team members: selectable rows, a sortable Status column, avatars, badges and icon actions. */
export const TeamMembersTable = ({
  dividers = 'line',
  selectable = true,
  title = 'Team members',
  badge = '100 users',
  supportingText,
  menu = true,
  pagination = true,
  rows = 6,
}: TeamMembersTableProps) => {
  const visible = members.slice(0, rows);
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<TableSortDirection>('desc');

  const allSelected = selected.length === visible.length && visible.length > 0;
  const selectAll = allSelected ? 'checked' : selected.length > 0 ? 'indeterminate' : 'unchecked';
  const toggle = (handle: string) =>
    setSelected((current) => (current.includes(handle) ? current.filter((value) => value !== handle) : [...current, handle]));

  return (
    <Table
      title={title}
      badge={badge}
      supportingText={supportingText}
      menu={menu}
      dividers={dividers}
      footer={pagination ? <Pagination pageCount={10} defaultPage={1} /> : undefined}
      className="max-w-304"
    >
      <TableHead>
        <TableRow className="hover:bg-transparent">
          <TableHeaderCell
            checkbox={selectable}
            selectAll={selectAll}
            onSelectAllChange={(checked) => setSelected(checked ? visible.map((member) => member.handle) : [])}
          >
            Name
          </TableHeaderCell>
          <TableHeaderCell sort={sort} onSort={() => setSort((value) => (value === 'desc' ? 'asc' : 'desc'))}>
            Status
          </TableHeaderCell>
          <TableHeaderCell>Email address</TableHeaderCell>
          <TableHeaderCell>Teams</TableHeaderCell>
          <TableHeaderCell aria-label="Actions" />
        </TableRow>
      </TableHead>
      <TableBody>
        {visible.map((member) => {
          const isSelected = selected.includes(member.handle);
          return (
            <TableRow key={member.handle} selected={isSelected}>
              <TableCell>
                <TableCellLead
                  control={selectable ? <Checkbox aria-label={`Select ${member.name}`} checked={isSelected} onChange={() => toggle(member.handle)} /> : undefined}
                  visual={memberAvatar(member)}
                  primary={member.name}
                  supporting={member.handle}
                />
              </TableCell>
              <TableCell>{statusBadge('Active')}</TableCell>
              <TableCell>
                <TableCellText primary={`${member.handle.slice(1)}@kds.design`} />
              </TableCell>
              <TableCell>
                <TableCellBadges badges={teams} />
              </TableCell>
              <TableCell align="right">
                <TableCellActionIcons
                  actions={[
                    { icon: 'delete', label: `Delete ${member.name}` },
                    { icon: 'edit', label: `Edit ${member.name}` },
                  ]}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const companies = [
  { name: 'Ephemeral', site: 'ephemeral.io', status: 'Customer', about: 'Content curating app', note: 'Brings all your news into one place', use: 70 },
  { name: 'Stack3d Lab', site: 'stack3dlab.com', status: 'Churned', about: 'Design software', note: 'Super lightweight design app', use: 60 },
  { name: 'Warpspeed', site: 'getwarpspeed.com', status: 'Customer', about: 'Data prediction', note: 'AI and machine learning data', use: 30 },
  { name: 'CloudWatch', site: 'cloudwatch.app', status: 'Customer', about: 'Productivity app', note: 'Time management and productivity', use: 80 },
  { name: 'ContrastAI', site: 'contrastai.com', status: 'Churned', about: 'Web app integrations', note: 'Connect web apps seamlessly', use: 20 },
];

/** Customers: a sortable lead column, status badges, an avatar group, a progress bar and a row menu. No checkboxes. */
export const CustomersTable = ({ dividers = 'line' }: { dividers?: TableDividers }) => (
  <Table
    title="Customers"
    supportingText="These companies have purchased in the last 12 months."
    menu
    dividers={dividers}
    className="max-w-304"
  >
    <TableHead>
      <TableRow className="hover:bg-transparent">
        <TableHeaderCell sort="desc" onSort={() => undefined}>
          Company
        </TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>License use</TableHeaderCell>
        <TableHeaderCell aria-label="Actions" />
      </TableRow>
    </TableHead>
    <TableBody>
      {companies.map((company) => (
        <TableRow key={company.name}>
          <TableCell>
            <TableCellLead
              visual={<Avatar size="md" placeholder alt="" />}
              primary={company.name}
              supporting={company.site}
            />
          </TableCell>
          <TableCell>{statusBadge(company.status, company.status === 'Customer' ? 'Success' : 'Gray')}</TableCell>
          <TableCell>
            <TableCellProgress value={company.use} />
          </TableCell>
          <TableCell align="right">
            <TableCellActionMenu label={`Actions for ${company.name}`} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const invoices = [
  { id: '3066', date: 'Jan 6, 2026', status: 'Paid', member: members[0] },
  { id: '3065', date: 'Jan 6, 2026', status: 'Paid', member: members[1] },
  { id: '3064', date: 'Jan 6, 2026', status: 'Refunded', member: members[4] },
  { id: '3063', date: 'Jan 5, 2026', status: 'Cancelled', member: members[6] },
  { id: '3062', date: 'Jan 5, 2026', status: 'Paid', member: members[7] },
];

const invoiceBadge = (status: string) => {
  if (status === 'Paid')
    return (
      <Badge size="sm" color="Success" icon="Icon leading" iconLeadingSwap={<Icon name="check" size="xs" />}>
        Paid
      </Badge>
    );
  if (status === 'Refunded')
    return (
      <Badge size="sm" color="Gray" icon="Icon leading" iconLeadingSwap={<Icon name="undo" size="xs" />}>
        Refunded
      </Badge>
    );
  return (
    <Badge size="sm" color="Error" icon="Icon leading" iconLeadingSwap={<Icon name="close" size="xs" />}>
      Cancelled
    </Badge>
  );
};

/** Sales: the alternating-fill style, a customer cell with avatar and email, and text link actions. */
export const SalesTable = ({ dividers = 'alternating' }: { dividers?: TableDividers }) => (
  <Table dividers={dividers} tableLabel="Invoices" className="max-w-304">
    <TableHead>
      <TableRow className="hover:bg-transparent">
        <TableHeaderCell checkbox sort="desc" onSort={() => undefined}>
          Invoice
        </TableHeaderCell>
        <TableHeaderCell>Date</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Customer</TableHeaderCell>
        <TableHeaderCell aria-label="Actions" />
      </TableRow>
    </TableHead>
    <TableBody>
      {invoices.map((invoice) => (
        <TableRow key={invoice.id}>
          <TableCell>
            <TableCellLead control={<Checkbox aria-label={`Select invoice ${invoice.id}`} />} primary={`#${invoice.id}`} />
          </TableCell>
          <TableCell>
            <TableCellText primary={invoice.date} />
          </TableCell>
          <TableCell>{invoiceBadge(invoice.status)}</TableCell>
          <TableCell>
            <div className="flex items-center gap-lg">
              {memberAvatar(invoice.member)}
              <TableCellText primary={invoice.member.name} supporting={`${invoice.member.handle.slice(1)}@kds.design`} />
            </div>
          </TableCell>
          <TableCell align="right">
            <div className="flex items-center gap-lg">
              <Button hierarchy="Link color" size="md">
                Edit
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const files = [
  { name: 'Tech requirements.pdf', size: '200 KB', icon: 'description', by: 'Olivia Rhye', date: 'Jan 4, 2026' },
  { name: 'Dashboard screenshot.jpg', size: '720 KB', icon: 'image', by: 'Phoenix Baker', date: 'Jan 4, 2026' },
  { name: 'Prototype recording.mp4', size: '16 MB', icon: 'videocam', by: 'Lana Steiner', date: 'Jan 2, 2026' },
  { name: 'UX Design Guidelines.docx', size: '400 KB', icon: 'article', by: 'Candice Wu', date: 'Jan 8, 2026' },
];

/** Files: card actions, a file-type icon in the lead cell, plain date columns and a row menu. */
export const FilesTable = ({ dividers = 'line' }: { dividers?: TableDividers }) => (
  <Table
    title="Files uploaded"
    dividers={dividers}
    actions={
      <>
        <Button hierarchy="Secondary gray" size="md">
          Download all
        </Button>
        <Button hierarchy="Primary" size="md" iconLeading iconLeadingSwap={<Icon name="upload" size="sm" />}>
          Upload
        </Button>
      </>
    }
    className="max-w-304"
  >
    <TableHead>
      <TableRow className="hover:bg-transparent">
        <TableHeaderCell checkbox>File name</TableHeaderCell>
        <TableHeaderCell>Date uploaded</TableHeaderCell>
        <TableHeaderCell>Uploaded by</TableHeaderCell>
        <TableHeaderCell aria-label="Actions" />
      </TableRow>
    </TableHead>
    <TableBody>
      {files.map((file) => (
        <TableRow key={file.name}>
          <TableCell>
            <TableCellLead
              control={<Checkbox aria-label={`Select ${file.name}`} />}
              visual={<Icon name={file.icon} size="md" className="fg-tertiary" />}
              primary={file.name}
              supporting={file.size}
            />
          </TableCell>
          <TableCell>
            <TableCellText primary={file.date} />
          </TableCell>
          <TableCell>
            <TableCellText primary={file.by} />
          </TableCell>
          <TableCell align="right">
            <TableCellActionMenu label={`Actions for ${file.name}`} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

/**
 * The mobile form of `Pagination`. `Pagination` itself switches by viewport media query,
 * which cannot fire inside a fixed-width preview, so the same markup is drawn here.
 */
const MobilePagination = () => (
  <nav aria-label="Pagination" className="flex items-center justify-between border-t border-secondary pt-xl">
    <Button hierarchy="Secondary gray" size="sm" aria-label="Previous page" className="size-9 p-0">
      <Icon name="arrow_back" size="sm" />
    </Button>
    <p className="m-0 text-sm text-secondary">
      Page <span className="font-medium">1</span> of <span className="font-medium">10</span>
    </p>
    <Button hierarchy="Secondary gray" size="sm" aria-label="Next page" className="size-9 p-0">
      <Icon name="arrow_forward" size="sm" />
    </Button>
  </nav>
);

/** Mobile: the columns collapse into one line per row; the chevron reveals the rest. */
export const TeamMembersMobile = () => (
  <Table title="Team members" badge="100 users" menu footer={<MobilePagination />} className="w-93.75 max-w-full">
    <caption className="sr-only">Team members</caption>
    <TableBody className="contents">
      <tr>
        <td className="p-0">
          <ul className="m-0 p-0">
            {members.slice(0, 4).map((member, index) => (
              <TableMobileRow
                key={member.handle}
                defaultOpen={index === 0}
                lead={
                  <>
                    <Checkbox aria-label={`Select ${member.name}`} />
                    {memberAvatar(member)}
                    <TableCellText lead primary={member.name} supporting={member.handle} />
                  </>
                }
                trailing={statusBadge('Active')}
                details={[
                  { label: 'Role', value: member.role },
                  { label: 'Email address', value: `${member.handle.slice(1)}@kds.design` },
                  { label: 'Teams', value: <TableCellBadges badges={teams} /> },
                ]}
              />
            ))}
          </ul>
        </td>
      </tr>
    </TableBody>
  </Table>
);
