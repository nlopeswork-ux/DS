import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { CountryIcon } from '../CountryIcon';
import { Avatar } from '../Avatar';
import { TagCloseX } from './TagCloseX';
import { TagCheckbox } from './TagCheckbox';
import type { TagProps, TagSize } from './Tag.types';

/** docs/components/badges-tags.md §5.3 — typography per size. */
const sizeTextStyles: Record<TagSize, string> = {
  sm: 'text-xs leading-[18px]',
  md: 'text-sm leading-5',
  lg: 'text-sm leading-5',
};

/** docs/components/badges-tags.md §5.3 — vertical padding per size. */
const paddingYStyles: Record<TagSize, string> = {
  sm: 'py-[3px]', // 3px
  md: 'py-0.5', // 2px
  lg: 'py-1', // 4px
};

/**
 * docs/components/badges-tags.md §5.3 — base horizontal padding per size.
 * `checkbox=true` reduces the left value by 3px (the internal gap) — only
 * the `sm` value (8→5) is given explicitly in the spec; `md`/`lg` follow
 * the same 3px reduction. A trailing `X close`/`Count` action always
 * flattens the right value to 4px, regardless of size.
 */
const paddingLeftBase: Record<TagSize, number> = { sm: 8, md: 9, lg: 10 };
const paddingLeftWithCheckbox: Record<TagSize, number> = { sm: 5, md: 6, lg: 7 };
const PADDING_RIGHT_COMPACT = 4;

/** docs/components/badges-tags.md §5.3 — count badge dimensions per size. */
const countSizeStyles: Record<TagSize, string> = {
  sm: 'h-4 min-w-4 text-xs',
  md: 'h-[18px] min-w-[19px] text-sm',
  lg: 'h-5 min-w-[21px] text-sm',
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      size = 'md',
      icon = 'False',
      action = 'Text only',
      checkbox = false,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      children,
      flagSwap,
      avatarSwap,
      count,
      onClose,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const hasTrailingAction = action === 'X close' || action === 'Count';
    const paddingLeft = checkbox ? paddingLeftWithCheckbox[size] : paddingLeftBase[size];
    const paddingRight = hasTrailingAction ? PADDING_RIGHT_COMPACT : paddingLeftBase[size];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-[3px] rounded-sm border border-primary bg-primary font-medium whitespace-nowrap text-secondary',
          sizeTextStyles[size],
          paddingYStyles[size],
          className,
        )}
        style={{ paddingLeft, paddingRight, ...style }}
        {...rest}
      >
        {checkbox && (
          <TagCheckbox
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
          />
        )}
        {icon === 'Dot' && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-utility-success-500" />}
        {icon === 'Country' &&
          (flagSwap ?? <CountryIcon code="earth" size={16} aria-hidden="true" className="shrink-0" />)}
        {icon === 'Avatar' &&
          (avatarSwap ?? (
            <Avatar size="xs" placeholder contrastBorder={false} aria-hidden="true" className="size-4 shrink-0" />
          ))}
        {children}
        {action === 'X close' && <TagCloseX onClick={onClose} />}
        {action === 'Count' && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-[3px] bg-tertiary px-1 font-medium text-secondary',
              countSizeStyles[size],
            )}
          >
            {count}
          </span>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';
