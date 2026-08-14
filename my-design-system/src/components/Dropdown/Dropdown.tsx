import { cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { DropdownProps } from './Dropdown.types';

/** docs/components/form-controls.md §5 — floating menu container tokens (radius-md, border-secondary, shadow-lg). */
export function Dropdown({ trigger, children, open: openProp, defaultOpen = false, onOpenChange, align = 'start', className }: DropdownProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenState(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          setOpen(!open);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': open,
      })
    : trigger;

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      {triggerElement}
      {open ? (
        <div
          role="menu"
          className={cn(
            'absolute z-20 mt-2 min-w-[240px] overflow-hidden rounded-md border border-secondary bg-primary py-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

Dropdown.displayName = 'Dropdown';
