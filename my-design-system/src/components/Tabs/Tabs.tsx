import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { InputDropdown } from '../InputDropdown';
import { TabButton } from './TabButton';
import type { TabVariant } from './TabButton';
import { useTabs } from './useTabs';
import type { TabsProps, TabsType } from './Tabs.types';

const variantByType: Record<TabsType, TabVariant> = {
  'Button brand': 'brand',
  Underline: 'underline',
  'Button border': 'border',
};

/**
 * Tabs (horizontal) — Figma "Horizontal tabs" (Button brand / Underline / Button
 * border × sm / md × Full width × Desktop / Mobile). On mobile (< sm) the tab
 * list becomes a dropdown showing the current tab. Selection follows focus:
 * ← → move between tabs, Home / End jump to the first / last. Works controlled
 * (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      type = 'Button brand',
      size = 'sm',
      fullWidth = false,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const variant = variantByType[type];
    const tabs = useTabs({ items, value, defaultValue, onValueChange, orientation: 'horizontal' });
    const active = items.find((item) => item.value === tabs.selected);

    return (
      <div ref={ref} className={cn('flex w-full flex-col gap-xl', className)} {...rest}>
        {/* Mobile: the current tab in a dropdown. */}
        <div className="sm:hidden">
          <InputDropdown
            options={items.map(({ value: v, label, disabled }) => ({ value: v, label, disabled }))}
            value={tabs.selected}
            onChange={tabs.select}
          />
        </div>

        <div
          role="tablist"
          aria-orientation="horizontal"
          aria-label={ariaLabel}
          onKeyDown={tabs.onKeyDown}
          className={cn(
            'flex max-sm:hidden',
            variant === 'brand' && 'items-center gap-xs',
            variant === 'border' &&
              cn('items-center gap-xs rounded-lg border border-secondary bg-secondary-alt', size === 'sm' ? 'p-xs' : 'rounded-xl p-sm'),
            variant === 'underline' && 'items-start gap-lg shadow-[inset_0_-1px_0_0_var(--color-border-secondary)]',
            fullWidth ? 'w-full' : 'w-fit max-w-full',
          )}
        >
          {items.map((item) => (
            <TabButton
              key={item.value}
              ref={tabs.register(item.value)}
              id={tabs.tabId(item.value)}
              aria-controls={item.content ? tabs.panelId(item.value) : undefined}
              variant={variant}
              size={size}
              current={item.value === tabs.selected}
              badge={item.badge}
              disabled={item.disabled}
              onClick={() => tabs.select(item.value)}
              className={fullWidth ? 'flex-1' : undefined}
            >
              {item.label}
            </TabButton>
          ))}
        </div>

        {active?.content && (
          <div role="tabpanel" id={tabs.panelId(active.value)} aria-labelledby={tabs.tabId(active.value)} tabIndex={0} className="outline-none focus-visible:ring-4 focus-visible:ring-brand-500">
            {active.content}
          </div>
        )}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
