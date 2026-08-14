import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

/** docs (Avatar spec) §3 — profile photo has its own, larger size scale (square/portrait, not circular). */
export type AvatarProfilePhotoSize = 'sm' | 'md' | 'lg';

const boxSizeStyles: Record<AvatarProfilePhotoSize, string> = {
  sm: 'size-[72px]',
  md: 'size-24', // 96px
  lg: 'size-40', // 160px
};

const placeholderIconSize: Record<AvatarProfilePhotoSize, string> = {
  sm: 'size-6 text-[24px]',
  md: 'size-8 text-[32px]',
  lg: 'size-12 text-[48px]',
};

export interface AvatarProfilePhotoProps {
  size?: AvatarProfilePhotoSize;
  src?: string;
  alt?: string;
  className?: string;
}

/** `_Avatar profile photo` — docs (Avatar spec) §3. Square/portrait framing (radius-lg), unlike the circular main Avatar — used for larger, standalone profile shots. */
export const AvatarProfilePhoto = ({ size = 'md', src, alt = '', className }: AvatarProfilePhotoProps) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-utility-gray-100',
      boxSizeStyles[size],
      className,
    )}
  >
    {src ? (
      <img src={src} alt={alt} className="size-full object-cover" />
    ) : (
      <Icon name="person" filled className={cn('text-utility-gray-500', placeholderIconSize[size])} />
    )}
  </span>
);
