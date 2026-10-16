import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { NavAccount } from './NavAccount';
import { NavFeaturedCard } from './NavFeaturedCard';
import { NavList } from './NavList';
import { NavLogo } from './NavLogo';
import type { NavItem, SidebarNavigationProps } from './SidebarNavigation.types';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

const parentOf = (items: NavItem[], value?: string) => items.find((item) => item.value === value || item.items?.some((child) => child.value === value));

/**
 * Sidebar navigation — Figma "Sidebar navigation" (Simple / Slim / Dual-tier ×
 * Desktop / Mobile × Open). From 1024px (`lg`) it is the full sidebar; below,
 * a 64px top bar whose menu button opens a drawer with the Simple list
 * (`breakpoint` forces either for previews).
 *
 * - **Simple** — items with `items` expand in place.
 * - **Dual-tier** / **Slim** — the main column picks an item, and its `items`
 *   fill a second column (the "Open" state of the Figma frames). Picking a parent
 *   lands on its first enabled child.
 *
 * Selection is controlled (`value`) or uncontrolled (`defaultValue`); the
 * drawer likewise (`open` / `defaultOpen`). Esc and the scrim close the drawer.
 */
export const SidebarNavigation = forwardRef<HTMLDivElement, SidebarNavigationProps>(
  (
    {
      type = 'Simple',
      items,
      footerItems = [],
      value,
      defaultValue,
      onValueChange,
      logo,
      showSearch = true,
      searchPlaceholder = 'Search',
      onSearchChange,
      featuredCard,
      account,
      open,
      defaultOpen = false,
      onOpenChange,
      breakpoint = 'Auto',
      inline = false,
      className,
      'aria-label': ariaLabel = 'Main navigation',
      ...rest
    },
    ref,
  ) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selected = value ?? internalValue;
    const [expanded, setExpanded] = useState<string[]>(() => {
      const parent = parentOf(items, value ?? defaultValue);
      return parent?.items ? [parent.value] : [];
    });
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const drawerOpen = open ?? internalOpen;

    const select = (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    };
    const toggle = (next: string) => setExpanded((current) => (current.includes(next) ? current.filter((v) => v !== next) : [...current, next]));
    const setDrawer = (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const activeParent = parentOf(items, selected);
    const subItems = activeParent?.items;
    const showSub = type !== 'Simple' && !!subItems?.length;

    const search = showSearch && (
      <Input
        type="iconLeading"
        iconSwap={<Icon name="search" size="sm" className="fg-quaternary" />}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        helpIcon={false}
        onChange={(event) => onSearchChange?.(event.target.value)}
      />
    );
    const logoNode = logo ?? <NavLogo />;

    const showDesktop = breakpoint !== 'Mobile';
    const showMobile = breakpoint !== 'Desktop';

    /** The primary column of Simple / Dual-tier, and the body of the mobile drawer. */
    const column = (mode: 'desktop' | 'drawer') => {
      const drawer = mode === 'drawer';
      return (
        <div className="flex h-full min-h-0 w-full flex-col justify-between overflow-y-auto">
          <div className={cn('flex flex-col', drawer ? 'gap-2xl pt-xl' : 'gap-3xl pt-4xl')}>
            <div className={drawer ? 'px-xl' : 'pr-2xl pl-3xl'}>{logoNode}</div>
            {search && <div className={drawer ? 'px-xl' : 'px-3xl'}>{search}</div>}
            <nav aria-label={ariaLabel} className={drawer ? 'px-md' : 'px-xl'}>
              <NavList
                items={items}
                selected={selected}
                onSelect={select}
                mode={drawer || type === 'Simple' ? 'accordion' : 'flat'}
                expanded={expanded}
                onToggle={toggle}
                idPrefix={`${baseId}-${mode}`}
              />
            </nav>
          </div>
          <div className={cn('flex flex-col', drawer ? 'gap-2xl px-md pb-xl' : 'gap-3xl px-xl pb-4xl')}>
            {footerItems.length > 0 && (
              <nav aria-label="Secondary navigation">
                <NavList items={footerItems} selected={selected} onSelect={select} mode="flat" idPrefix={`${baseId}-${mode}-footer`} />
              </nav>
            )}
            {!drawer && featuredCard && (
              <NavFeaturedCard type={type === 'Dual-tier' ? 'Progress circle' : 'Progress bar'} {...featuredCard} />
            )}
            {account && <NavAccount {...account} dense={drawer} />}
          </div>
        </div>
      );
    };

    const subNav = (title: boolean) => (
      <nav aria-label={`${activeParent?.label} pages`} className="flex h-full min-h-0 min-w-0 flex-1 flex-col justify-between overflow-y-auto px-xl pt-4xl pb-xl">
        <div className="flex flex-col gap-xs">
          {title && <p className="px-lg pb-lg text-base leading-6 font-medium text-secondary">{activeParent?.label}</p>}
          <NavList items={subItems ?? []} selected={selected} onSelect={select} mode="flat" idPrefix={`${baseId}-sub`} />
        </div>
      </nav>
    );

    const desktop = (
      <aside
        aria-label={ariaLabel}
        className={cn(
          'h-full shrink-0 border-r border-secondary bg-primary',
          'flex',
          breakpoint === 'Auto' && 'max-lg:hidden',
          type === 'Simple' && 'w-[312px]',
          type === 'Dual-tier' && (showSub ? 'w-[528px]' : 'w-[280px]'),
          type === 'Slim' && (showSub ? 'w-[362px]' : 'w-20'),
        )}
      >
        {type === 'Slim' ? (
          <>
            <div className={cn('flex h-full w-20 shrink-0 flex-col items-center justify-between pt-4xl pb-3xl', showSub && 'border-r border-secondary')}>
              <div className="flex flex-col items-center gap-3xl">
                {logo ?? <NavLogo markOnly />}
                <nav aria-label={ariaLabel}>
                  <NavList items={items} selected={selected} onSelect={select} mode="rail" idPrefix={`${baseId}-rail`} />
                </nav>
              </div>
              <div className="flex flex-col items-center gap-3xl">
                {footerItems.length > 0 && (
                  <nav aria-label="Secondary navigation">
                    <NavList items={footerItems} selected={selected} onSelect={select} mode="rail" idPrefix={`${baseId}-rail-footer`} />
                  </nav>
                )}
                {account && <NavAccount {...account} variant="avatar" />}
              </div>
            </div>
            {showSub && (
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1">{subNav(true)}</div>
                {account && <NavAccount {...account} variant="compact" className="px-xl pb-3xl pl-[20px]" />}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={cn('h-full shrink-0', showSub ? 'w-[280px] border-r border-secondary' : 'min-w-0 flex-1')}>{column('desktop')}</div>
            {showSub && subNav(false)}
          </>
        )}
      </aside>
    );

    return (
      <div ref={ref} className={cn('h-full', className)} {...rest}>
        {showDesktop && desktop}
        {showMobile && (
          <MobileNavigation
            auto={breakpoint === 'Auto'}
            logo={logoNode}
            open={drawerOpen}
            onOpenChange={setDrawer}
            inline={inline}
            drawerId={`${baseId}-drawer`}
            ariaLabel={ariaLabel}
          >
            {column('drawer')}
          </MobileNavigation>
        )}
      </div>
    );
  },
);

SidebarNavigation.displayName = 'SidebarNavigation';

interface MobileNavigationProps {
  auto: boolean;
  logo: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inline: boolean;
  drawerId: string;
  ariaLabel: string;
  children: ReactNode;
}

/** Figma "Open=False" mobile bar (64px) and its "Open=True" drawer: a 311px panel beside a dimmed scrim with a close button. */
function MobileNavigation({ auto, logo, open, onOpenChange, inline, drawerId, ariaLabel, children }: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + focus move / restore (skipped for in-place previews).
  useEffect(() => {
    if (!open || inline) return;
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open, inline]);

  // Esc closes from anywhere while open — in-place previews never move focus into the drawer.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || inline) return;
    const nodes = panelRef.current?.parentElement?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const drawer = open && (
    <div className={cn(inline ? 'absolute' : 'fixed', 'inset-0 z-50 flex')} onKeyDown={handleKeyDown}>
      {/* Scrim — 70% bg-overlay + 8px backdrop blur, same recipe as Modal */}
      <div aria-hidden="true" className="absolute inset-0 backdrop-blur-[8px]" onClick={() => onOpenChange(false)}>
        <div className="absolute inset-0 bg-overlay opacity-70" />
      </div>
      <div
        ref={panelRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="relative h-full w-[311px] max-w-[calc(100%-64px)] bg-primary outline-none"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={() => onOpenChange(false)}
        className="absolute top-3 right-2 flex size-10 items-center justify-center rounded-md text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Icon name="close" size="md" />
      </button>
    </div>
  );

  return (
    <div className={cn('relative h-16 w-full', auto && 'lg:hidden', inline && 'h-full')}>
      <header className="flex h-16 w-full items-center justify-between border-b border-secondary bg-primary py-lg pr-md pl-xl">
        {logo}
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => onOpenChange(true)}
          className={cn(
            'flex size-10 items-center justify-center rounded-md bg-primary p-md text-quaternary outline-none',
            'transition-colors duration-150 ease-in-out hover:bg-primary-hover hover:text-tertiary',
            'focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          )}
        >
          <Icon name="menu" size="md" />
        </button>
      </header>
      {inline ? drawer : drawer && createPortal(drawer, document.body)}
    </div>
  );
}
