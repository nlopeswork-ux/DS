import { cn } from '../../utils/cn';

interface NavLogoProps {
  /** Only the "K" mark (Slim rail). */
  markOnly?: boolean;
  className?: string;
}

/** Default KDS logo (Figma "Logo"): 32px gradient mark + "KDS" logotype. Pass a `logo` to SidebarNavigation to replace it. */
export function NavLogo({ markOnly, className }: NavLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-[10px]', className)}>
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-linear-to-tr from-brand-600 to-brand-500 text-lg leading-none font-bold text-white shadow-sm"
      >
        K
      </span>
      {markOnly ? <span className="sr-only">KDS</span> : <span className="text-lg font-semibold text-primary">KDS</span>}
    </span>
  );
}
