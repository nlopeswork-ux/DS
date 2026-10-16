import { cn } from '../../utils/cn';
import { NavItemButton } from './NavItemButton';
import type { NavItem, NavSubItem } from './SidebarNavigation.types';

export type NavListMode = 'accordion' | 'flat' | 'rail';

interface NavListProps {
  items: (NavItem | NavSubItem)[];
  selected?: string;
  onSelect: (value: string) => void;
  /**
   * `accordion` — items with `items` expand in place (Simple, mobile).
   * `flat` — one level; picking a parent selects its first enabled child (Dual-tier).
   * `rail` — like `flat`, icon-only (Slim).
   */
  mode: NavListMode;
  expanded?: string[];
  onToggle?: (value: string) => void;
  /** Id prefix for the expandable regions. */
  idPrefix: string;
  className?: string;
}

const hasChild = (item: NavItem | NavSubItem, value?: string) => 'items' in item && !!item.items?.some((child) => child.value === value);

/** List of nav items — Figma "Navigation" (_Nav item base / _Nav item dropdown base / _Nav item button). */
export function NavList({ items, selected, onSelect, mode, expanded = [], onToggle, idPrefix, className }: NavListProps) {
  return (
    <ul className={cn('flex flex-col', mode === 'rail' ? 'items-center gap-md' : 'gap-xs', className)}>
      {items.map((item) => {
        const children = 'items' in item ? item.items : undefined;
        const containsSelected = hasChild(item, selected);
        const { value, label, icon, badge, dot, href, disabled, state } = item;

        if (children?.length && mode === 'accordion') {
          const open = expanded.includes(value);
          const regionId = `${idPrefix}-${value}`;
          return (
            <li key={value} className="flex flex-col gap-xs">
              <NavItemButton
                label={label}
                icon={icon}
                badge={badge}
                dot={dot}
                disabled={disabled}
                state={state}
                current={containsSelected && !open}
                chevron={open ? 'up' : 'down'}
                aria-expanded={open}
                aria-controls={regionId}
                onClick={() => onToggle?.(value)}
              />
              {open && (
                <ul id={regionId} className="flex flex-col gap-xs pb-md">
                  {children.map((child) => (
                    <li key={child.value}>
                      <NavItemButton
                        nested
                        label={child.label}
                        badge={child.badge}
                        href={child.href}
                        disabled={child.disabled}
                        state={child.state}
                        current={child.value === selected}
                        onClick={() => onSelect(child.value)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        // Flat / rail: a parent lands on its first enabled child, so the sub-navigation always has a current page.
        const target = children?.find((child) => !child.disabled)?.value ?? value;
        return (
          <li key={value} className={mode === 'rail' ? undefined : 'w-full'}>
            <NavItemButton
              label={label}
              icon={icon}
              badge={badge}
              dot={dot}
              href={href}
              disabled={disabled}
              state={state}
              iconOnly={mode === 'rail'}
              current={value === selected || containsSelected}
              onClick={() => onSelect(target)}
            />
          </li>
        );
      })}
    </ul>
  );
}
