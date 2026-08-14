import { cn } from '../../utils/cn';
import type { ScrollBarProps } from './Dropdown.types';

/**
 * docs/components/form-controls.md §6 — `_Scroll bar` primitive. Purely
 * decorative (mirrors the Figma component): real scrollable menus rely on
 * native `overflow-y: auto`, not on this track/thumb being wired to scroll state.
 */
export function ScrollBar({ length = '50%', className }: ScrollBarProps) {
  return (
    <div aria-hidden="true" className={cn('flex h-60 w-4 items-start justify-center rounded-full bg-secondary p-xs', className)}>
      <div className="w-full rounded-full bg-quaternary" style={{ height: length }} />
    </div>
  );
}

ScrollBar.displayName = 'ScrollBar';
