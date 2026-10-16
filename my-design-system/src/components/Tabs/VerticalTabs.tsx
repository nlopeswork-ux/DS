import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { InputDropdown } from '../InputDropdown';
import { TabButton } from './TabButton';
import type { TabVariant } from './TabButton';
import { useTabs } from './useTabs';
import type { VerticalTabsProps, VerticalTabsType } from './Tabs.types';

const variantByType: Record<VerticalTabsType, TabVariant> = {
  Line: 'line',
  Button: 'button',
};

/**
 * Vertical tabs — Figma "Vertical tabs" (Line / Button ×
 * sm / md × Desktop / Mobile). Tabs stack in a column with the panel beside
 * them; on mobile (< sm) the list becomes a dropdown and the panel goes below.
 * ↑ ↓ move between tabs, Home / End jump to the first / last.
 */
export const VerticalTabs = forwardRef<HTMLDivElement, VerticalTabsProps>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      type = 'Line',
      size = 'sm',
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const variant = variantByType[type];
    const tabs = useTabs({ items, value, defaultValue, onValueChange, orientation: 'vertical' });
    const active = items.find((item) => item.value === tabs.selected);

    return (
      <div ref={ref} className={cn('flex w-full gap-3xl max-sm:flex-col max-sm:gap-xl', className)} {...rest}>
        <div className="sm:hidden">
          <InputDropdown
            options={items.map(({ value: v, label, disabled }) => ({ value: v, label, disabled }))}
            value={tabs.selected}
            onChange={tabs.select}
          />
        </div>

        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={ariaLabel}
          onKeyDown={tabs.onKeyDown}
          className={cn(
            'flex h-fit shrink-0 flex-col gap-xs max-sm:hidden',
            variant === 'button' &&
              cn('border border-secondary bg-secondary-alt', size === 'sm' ? 'rounded-lg p-xs' : 'rounded-xl p-sm'),
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
              state={item.state}
              onClick={() => tabs.select(item.value)}
              block
            >
              {item.label}
            </TabButton>
          ))}
        </div>

        {active?.content && (
          <div
            role="tabpanel"
            id={tabs.panelId(active.value)}
            aria-labelledby={tabs.tabId(active.value)}
            tabIndex={0}
            className="min-w-0 flex-1 outline-none focus-visible:ring-4 focus-visible:ring-brand-500"
          >
            {active.content}
          </div>
        )}
      </div>
    );
  },
);

VerticalTabs.displayName = 'VerticalTabs';
