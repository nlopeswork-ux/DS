import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Icon } from '../components/Icon';

interface PlaygroundLayoutProps {
  /** Left column — the live component (usually `<Story of={...} inline />`). */
  preview: ReactNode;
  /** Right column — the `<Controls>` blocks. Rendered inside `.playground-options-list`. */
  options: ReactNode;
  /** Options panel starts expanded. Default: true. */
  defaultOpen?: boolean;
}

/**
 * Docs-only wrapper for the OutSystems-style 2-column Playground (see CLAUDE.md).
 * The Options column can be collapsed so the preview uses the full width —
 * useful for large components (Modal, Sidebar, ...). The column is hidden with
 * CSS, not unmounted, so the Controls keep their state.
 */
export const PlaygroundLayout = ({ preview, options, defaultOpen = true }: PlaygroundLayoutProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      className={cn(
        'relative isolate z-10 mb-8 grid grid-cols-1 items-stretch overflow-hidden rounded-lg border border-secondary bg-primary',
        open ? 'md:grid-cols-[1.6fr_1fr]' : 'md:grid-cols-1',
      )}
    >
      {/* Left column — Preview */}
      <div className={cn('flex min-w-0 flex-col border-secondary', open && 'border-b md:border-b-0 md:border-r')}>
        <div className="flex items-center justify-between border-b border-secondary px-4 py-2.5 text-xs font-semibold tracking-wide text-quaternary">
          <span>Preview</span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border-0 bg-transparent px-2 py-1 text-xs font-semibold text-tertiary hover:bg-primary-hover hover:text-secondary"
          >
            <Icon name={open ? 'right_panel_close' : 'right_panel_open'} size="xs" />
            {open ? 'Hide options' : 'Show options'}
          </button>
        </div>
        <div
          data-scale-container
          className="relative isolate flex flex-1 items-center justify-center min-h-[280px] p-8"
          style={{ background: 'var(--color-bg-secondary)', height: '100%' }}
        >
          {preview}
        </div>
      </div>

      {/* Right column — Options (hidden, never unmounted, when collapsed) */}
      <div id={panelId} className={cn('min-w-0 flex-col', open ? 'flex' : 'hidden')}>
        <div className="border-b border-secondary px-4 py-2.5 text-xs font-semibold tracking-wide text-quaternary">Options</div>
        <div className={cn('flex flex-col p-6', 'playground-options-list')}>{options}</div>
      </div>
    </div>
  );
};
