import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TabItem } from './Tabs.types';

interface Options {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

/**
 * Shared behaviour of Tabs / VerticalTabs: controlled or uncontrolled selection,
 * roving tabindex and arrow / Home / End navigation (selection follows focus).
 */
export function useTabs({ items, value, defaultValue, onValueChange, orientation }: Options) {
  const baseId = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);
  const selected = items.some((item) => item.value === (value ?? internal)) ? (value ?? internal) : firstEnabled;
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const select = (next: string) => {
    if (next === selected) return;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const enabled = items.filter((item) => !item.disabled);
    const index = enabled.findIndex((item) => item.value === selected);
    let target: TabItem | undefined;
    if (event.key === nextKey) target = enabled[(index + 1) % enabled.length];
    else if (event.key === prevKey) target = enabled[(index - 1 + enabled.length) % enabled.length];
    else if (event.key === 'Home') target = enabled[0];
    else if (event.key === 'End') target = enabled[enabled.length - 1];
    if (!target) return;
    event.preventDefault();
    select(target.value);
    refs.current.get(target.value)?.focus();
  };

  return {
    selected,
    select,
    onKeyDown,
    tabId: (v: string) => `${baseId}-tab-${v}`,
    panelId: (v: string) => `${baseId}-panel-${v}`,
    register: (v: string) => (node: HTMLButtonElement | null) => {
      if (node) refs.current.set(v, node);
      else refs.current.delete(v);
    },
  };
}
