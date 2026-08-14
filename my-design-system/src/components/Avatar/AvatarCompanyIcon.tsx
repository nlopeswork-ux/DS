import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { AvatarSize } from './Avatar.types';

/** docs (Avatar spec) §3 — company icon dimension per Avatar size. */
const boxSizeStyles: Record<AvatarSize, string> = {
  xs: 'size-2.5', // 10px
  sm: 'size-3', // 12px
  md: 'size-3.5', // 14px
  lg: 'size-4', // 16px
  xl: 'size-[18px]',
  '2xl': 'size-5', // 20px
};

export interface AvatarCompanyIconProps {
  size: AvatarSize;
  /** Custom node replacing the default placeholder glyph. */
  swap?: ReactNode;
  className?: string;
}

/** `_Avatar company icon` — docs (Avatar spec) §3/§4. No dedicated Company/Org logo component exists yet — a neutral placeholder glyph renders until it does. */
export const AvatarCompanyIcon = ({ size, swap, className }: AvatarCompanyIconProps) => (
  <span
    aria-hidden="true"
    className={cn(
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] border-[1.5px] border-primary bg-utility-gray-100',
      boxSizeStyles[size],
      className,
    )}
  >
    {swap ?? <Icon name="domain" size="xs" filled className="size-full text-[10px] text-utility-gray-500" />}
  </span>
);
