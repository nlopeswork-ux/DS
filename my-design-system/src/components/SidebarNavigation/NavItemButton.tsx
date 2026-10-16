import { forwardRef, useState } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import type { NavItemState } from './SidebarNavigation.types';

interface NavItemButtonProps {
  label: string;
  icon?: string;
  badge?: ReactNode;
  dot?: boolean;
  current?: boolean;
  /** Forces Hover or Focus for previews; Default leaves them to the browser. */
  state?: NavItemState;
  /** Trailing chevron of a dropdown item: `down` collapsed, `up` expanded. */
  chevron?: 'down' | 'up';
  /** Icon-only 48px square (Slim rail). */
  iconOnly?: boolean;
  /** Second-level item: no icon, 48px left padding. */
  nested?: boolean;
  href?: string;
  disabled?: boolean;
  className?: string;
}

type NativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, keyof NavItemButtonProps | 'type'>;

/**
 * Single nav item — Figma "_Nav item base" (Current × State) and, icon-only,
 * "_Nav item button". A link when `href` is set, otherwise a button.
 * Hover and the current item share the look of a filled row; the current one
 * is slightly stronger (text-secondary-hover) and marked with `aria-current`.
 */
export const NavItemButton = forwardRef<HTMLButtonElement & HTMLAnchorElement, NavItemButtonProps & NativeProps>(
  (
    { label, icon, badge, dot, current = false, state = 'Default', chevron, iconOnly, nested, href, disabled, className, onMouseEnter, onMouseLeave, ...rest },
    ref,
  ) => {
    const [pointerOver, setPointerOver] = useState(false);
    const hovered = state === 'Hover' || pointerOver;

    const classes = cn(
      'flex items-center rounded-sm text-base leading-6 font-semibold outline-none',
      'transition-colors duration-150 ease-in-out',
      // Focus ring: 2px page-coloured gap + 2px ring (Figma focus-ring on bg-primary).
      'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
      state === 'Focus' && 'ring-2 ring-brand-500 ring-offset-2',
      iconOnly ? 'size-12 justify-center p-lg' : 'w-full gap-md px-lg py-md text-left',
      nested && 'pl-6xl',
      current ? 'bg-active text-secondary-hover' : 'text-secondary',
      hovered && !disabled && (current ? 'bg-secondary-hover text-secondary-hover' : 'bg-primary-hover text-secondary-hover'),
      disabled && 'pointer-events-none text-disabled',
      className,
    );

    const content = iconOnly ? (
      icon && <Icon name={icon} size="md" className={current ? 'text-secondary-hover' : 'fg-quaternary'} />
    ) : (
      <>
        <span className="flex min-w-0 flex-1 items-center gap-lg">
          {dot && <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-success-500" />}
          {icon && !nested && <Icon name={icon} size="md" className="fg-quaternary" />}
          <span className="whitespace-nowrap">{label}</span>
        </span>
        {badge !== undefined && badge !== null && (
          <Badge size="sm" type="Pill color" color="Gray">
            {badge}
          </Badge>
        )}
        {chevron && <Icon name={chevron === 'up' ? 'expand_less' : 'expand_more'} size="sm" className="fg-quaternary" />}
      </>
    );

    const shared = {
      ref,
      className: classes,
      'aria-current': current && !chevron ? ('page' as const) : undefined,
      'aria-label': iconOnly ? label : undefined,
      title: iconOnly ? label : undefined,
      onMouseEnter: (event: never) => {
        setPointerOver(true);
        (onMouseEnter as ((e: never) => void) | undefined)?.(event);
      },
      onMouseLeave: (event: never) => {
        setPointerOver(false);
        (onMouseLeave as ((e: never) => void) | undefined)?.(event);
      },
      ...rest,
    };

    return href && !disabled ? (
      <a href={href} {...shared}>
        {content}
      </a>
    ) : (
      <button type="button" disabled={disabled} {...shared}>
        {content}
      </button>
    );
  },
);

NavItemButton.displayName = 'NavItemButton';
