import { cn } from '../../utils/cn';
import { Avatar, AvatarLabelGroup } from '../Avatar';
import { Icon } from '../Icon';
import type { NavAccount as NavAccountData } from './SidebarNavigation.types';

const logoutClasses = cn(
  'flex size-9 shrink-0 items-center justify-center rounded-md text-quaternary outline-none',
  'transition-colors duration-150 ease-in-out hover:bg-primary-hover hover:text-tertiary',
  'focus-visible:ring-4 focus-visible:ring-brand-500',
);

interface NavAccountProps extends NavAccountData {
  /** `avatar` — Slim rail (photo only). `compact` — name and email without the photo (Slim sub-navigation). */
  variant?: 'full' | 'avatar' | 'compact';
  /** Tighter spacing above the divider (mobile drawer). */
  dense?: boolean;
  className?: string;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

/** Figma "Account": avatar + name / email, and a log-out button. */
export function NavAccount({ name, email, avatarSrc, onLogout, logoutLabel = 'Log out', variant = 'full', dense, className }: NavAccountProps) {
  const avatarProps = avatarSrc ? { src: avatarSrc, alt: '' } : { text: initials(name) };

  if (variant === 'avatar') return <Avatar size="lg" aria-label={name} {...avatarProps} />;

  const logout = onLogout && (
    <button type="button" aria-label={logoutLabel} title={logoutLabel} onClick={onLogout} className={cn(logoutClasses, 'self-start')}>
      <Icon name="logout" size="sm" />
    </button>
  );

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-start justify-between gap-xl', className)}>
        <span className="flex min-w-0 flex-col text-sm leading-5">
          <span className="truncate font-semibold text-secondary">{name}</span>
          {email && <span className="truncate text-tertiary">{email}</span>}
        </span>
        {logout}
      </div>
    );
  }

  return (
    <div className={cn('flex w-full items-start gap-xl border-t border-secondary pl-md', dense ? 'pt-2xl' : 'pt-3xl', className)}>
      <AvatarLabelGroup size="md" name={name} supportingText={email} className="min-w-0 flex-1" {...avatarProps} />
      {/* Figma pins the button 15px from the divider — level with the name, not the avatar centre. */}
      {logout && <span className="-mt-[9px] flex">{logout}</span>}
    </div>
  );
}
