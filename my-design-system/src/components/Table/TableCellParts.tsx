import { useId } from 'react';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import type {
  TableCellActionButtonsProps,
  TableCellActionIconsProps,
  TableCellAvatarGroupProps,
  TableCellBadgesProps,
  TableCellExpandProps,
  TableCellLeadProps,
  TableCellProgressProps,
  TableCellRatingProps,
  TableCellTextProps,
  TableCellTrendProps,
  TableToggleProps,
} from './Table.types';

/**
 * Content parts for `TableCell`. Each one is a Figma "Style" variant. The ones
 * built from an existing DS component (Badge, Avatar, Button, Checkbox, Radio,
 * Icon) only compose it; `TableToggle`, the progress bar, the rating and the
 * payment-method icon are small table-local pieces until they exist as components.
 */

/** Text cell. `lead` is the primary column; without `supporting`, plain text uses `text-tertiary`. */
export const TableCellText = ({ primary, supporting, lead = false, numeric = false }: TableCellTextProps) => (
  <div className="flex min-w-0 flex-col text-sm leading-5">
    <span
      data-cell-text
      className={cn(
        'truncate',
        lead ? 'font-medium text-primary' : supporting ? 'text-primary' : 'text-tertiary',
        numeric && 'tabular-nums',
      )}
    >
      {primary}
    </span>
    {supporting ? (
      <span data-cell-text className="truncate text-tertiary">
        {supporting}
      </span>
    ) : null}
  </div>
);

/** Lead cell: an optional control and visual (avatar, icon, payment method) before the text. */
export const TableCellLead = ({ control, visual, ...text }: TableCellLeadProps) => (
  <>
    {control}
    {visual}
    <TableCellText lead {...text} />
  </>
);

/** One or more badges. Pass `color` per badge; the default is the neutral gray badge. */
export const TableCellBadges = ({ badges }: TableCellBadgesProps) => (
  <div className="flex items-center gap-xs">
    {badges.map(({ label, color = 'Gray' }, index) => (
      <Badge key={index} size="sm" color={color}>
        {label}
      </Badge>
    ))}
  </div>
);

/**
 * Overlapping avatars with an optional "+N" avatar and a text label. Composed from `Avatar`
 * (not `AvatarGroup`): at `xs` the Figma stack overlaps by 4px with a 1.5px page-colour ring,
 * while `AvatarGroup` overlaps by 12px, which is tuned for `md`.
 */
export const TableCellAvatarGroup = ({ avatars, extra, label }: TableCellAvatarGroupProps) => {
  const stack = extra ? [...avatars, { text: `+${extra}` }] : avatars;
  return (
    <>
      {label ? (
        <span data-cell-text className="text-sm leading-5 text-tertiary">
          {label}
        </span>
      ) : null}
      <div className="flex items-center">
        {stack.map((avatar, index) => (
          <Avatar
            key={index}
            size="xs"
            className={cn('rounded-full ring-2 ring-(--color-bg-primary)', index > 0 && '-ml-1')}
            style={{ zIndex: stack.length - index }}
            {...avatar}
          />
        ))}
      </div>
    </>
  );
};

/** A value with a positive or negative percentage badge. */
export const TableCellTrend = ({ value, percentage, trend }: TableCellTrendProps) => (
  <>
    {value ? (
      <span data-cell-text className="text-sm leading-5 text-tertiary">
        {value}
      </span>
    ) : null}
    <Badge
      size="sm"
      color={trend === 'positive' ? 'Success' : 'Error'}
      icon="Icon leading"
      iconLeadingSwap={<Icon name={trend === 'positive' ? 'arrow_upward' : 'arrow_downward'} size="xs" />}
    >
      {percentage}%
    </Badge>
  </>
);

/** Progress bar: an 8px `bg-quaternary` track with a `bg-brand-solid` fill, and the percentage. */
export const TableCellProgress = ({ value, hideLabel = false }: TableCellProgressProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="flex min-w-48 flex-1 items-center gap-lg">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="h-2 flex-1 overflow-hidden rounded-full bg-quaternary"
      >
        <div className="h-full rounded-full bg-brand-solid" style={{ width: `${clamped}%` }} />
      </div>
      {hideLabel ? null : (
        <span data-cell-text className="text-sm leading-5 font-medium text-secondary tabular-nums">
          {clamped}%
        </span>
      )}
    </div>
  );
};

/** Square icon button used by the action cells and the expand toggle. */
const CellIconButton = ({ icon, label, onClick, ...rest }: { icon: string; label: string; onClick?: () => void; 'aria-expanded'?: boolean }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 fg-tertiary outline-none transition-colors duration-150 hover:bg-primary-hover hover:fg-secondary focus-visible:ring-4 focus-visible:ring-brand-500"
    {...rest}
  >
    <Icon name={icon} size="sm" />
  </button>
);

/** "Delete" and "Edit" as link buttons. */
export const TableCellActionButtons = ({ onDelete, onEdit, deleteLabel = 'Delete', editLabel = 'Edit' }: TableCellActionButtonsProps) => (
  <div className="flex items-center gap-lg">
    <Button hierarchy="Link gray" size="md" onClick={onDelete}>
      {deleteLabel}
    </Button>
    <Button hierarchy="Link color" size="md" onClick={onEdit}>
      {editLabel}
    </Button>
  </div>
);

/** A row of icon-only actions (copy, download, delete, edit...). Every action needs a `label`. */
export const TableCellActionIcons = ({ actions }: TableCellActionIconsProps) => (
  <div className="flex items-center gap-xs">
    {actions.map(({ icon, label, onClick }) => (
      <CellIconButton key={label} icon={icon} label={label} onClick={onClick} />
    ))}
  </div>
);

/** The "more options" icon button of a row. */
export const TableCellActionMenu = ({ label = 'Row actions', onClick }: { label?: string; onClick?: () => void }) => (
  <CellIconButton icon="more_vert" label={label} onClick={onClick} />
);

/** Five stars; halves are supported. */
export const TableCellRating = ({ value }: TableCellRatingProps) => (
  <div role="img" aria-label={`${value} out of 5`} className="flex items-center gap-xs">
    {[0, 1, 2, 3, 4].map((index) => {
      const fill = value - index;
      const name = fill >= 1 ? 'star' : fill >= 0.5 ? 'star_half' : 'star';
      return (
        <Icon
          key={index}
          name={name}
          size="sm"
          filled
          color={fill >= 0.5 ? 'var(--color-warning-400)' : 'var(--color-bg-tertiary)'}
        />
      );
    })}
  </div>
);

/** Right-aligned number cell: pair with `<TableCell align="right">`. */
export const TableCellNumber = ({ children }: { children: React.ReactNode }) => (
  <span data-cell-text className="text-sm leading-5 text-tertiary tabular-nums">
    {children}
  </span>
);

/** Chevron that opens a row's detail. */
export const TableCellExpand = ({ open = false, onToggle, label = 'Expand row' }: TableCellExpandProps) => (
  <button
    type="button"
    aria-label={label}
    aria-expanded={open}
    onClick={onToggle}
    className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 fg-tertiary outline-none transition-colors duration-150 hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-brand-500"
  >
    <Icon name="chevron_right" size="sm" className={cn('transition-transform duration-150', open && 'rotate-90')} />
  </button>
);

/** 46x32 payment-method tile. The glyph is a generic card; swap `children` for a brand mark. */
export const TableCellPaymentIcon = ({ children }: { children?: React.ReactNode }) => (
  <span className="inline-flex h-8 w-11.5 shrink-0 items-center justify-center rounded-xs border border-secondary bg-primary fg-tertiary">
    {children ?? <Icon name="credit_card" size="sm" />}
  </span>
);

/** Switch for a toggle-only cell or a lead toggle. A native button with `role="switch"`. */
export const TableToggle = ({ checked = false, onChange, disabled = false, className, ...rest }: TableToggleProps) => {
  const id = useId();
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-0 p-0.5 outline-none transition-colors duration-150',
        'focus-visible:ring-4 focus-visible:ring-brand-500',
        checked ? 'bg-brand-solid' : 'bg-quaternary',
        'disabled:cursor-not-allowed disabled:bg-disabled',
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn('size-4 rounded-full bg-primary shadow-sm transition-transform duration-150', checked && 'translate-x-4')}
      />
    </button>
  );
};
