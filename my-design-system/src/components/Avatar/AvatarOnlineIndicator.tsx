import { cn } from '../../utils/cn';
import type { AvatarSize } from './Avatar.types';

/** docs (Avatar spec) §3 — online indicator dimension per Avatar size (all values land exactly on Tailwind's 2px-step size-* scale). */
const dotSizeStyles: Record<AvatarSize, string> = {
  xs: 'size-1.5', // 6px
  sm: 'size-2', // 8px
  md: 'size-2.5', // 10px
  lg: 'size-3', // 12px
  xl: 'size-3.5', // 14px
  '2xl': 'size-4', // 16px
};

export interface AvatarOnlineIndicatorProps {
  size: AvatarSize;
  /** Online (success green) vs. offline (neutral gray). */
  online?: boolean;
  className?: string;
}

/** `_Avatar online indicator` — docs (Avatar spec) §3/§4. */
export const AvatarOnlineIndicator = ({ size, online = true, className }: AvatarOnlineIndicatorProps) => (
  <span
    aria-hidden="true"
    className={cn(
      'shrink-0 rounded-full border-[1.5px] border-primary',
      online ? 'bg-utility-success-500' : 'bg-utility-gray-300',
      dotSizeStyles[size],
      className,
    )}
  />
);
