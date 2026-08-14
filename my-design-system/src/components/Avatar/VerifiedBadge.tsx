import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

/** docs (Avatar spec) §3 — the Verified tick has its own, larger size scale (up to 32px) since it's reused outside Avatar too. */
export type VerifiedBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const boxSizeStyles: Record<VerifiedBadgeSize, string> = {
  xs: 'size-2.5', // 10px
  sm: 'size-3', // 12px
  md: 'size-3.5', // 14px
  lg: 'size-4', // 16px
  xl: 'size-[18px]',
  '2xl': 'size-5', // 20px
  '3xl': 'size-6', // 24px
  '4xl': 'size-8', // 32px
};

export interface VerifiedBadgeProps {
  size?: VerifiedBadgeSize;
  className?: string;
}

/** `_Verified badge` — docs (Avatar spec) §1/§3. A solid blue circle with a white checkmark. */
export const VerifiedBadge = ({ size = 'md', className }: VerifiedBadgeProps) => (
  <span
    role="img"
    aria-label="Verified"
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary bg-utility-blue-500',
      boxSizeStyles[size],
      className,
    )}
  >
    <Icon name="check" size="xs" weight={700} className="size-full text-[10px] text-white" />
  </span>
);
