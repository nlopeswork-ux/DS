import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Avatar } from './Avatar';
import type { AvatarProps, AvatarSize } from './Avatar.types';

/** docs (Avatar spec) §4 — Avatar↔text gap per size (only sm/md/lg/xl are documented for the label group). */
export type AvatarLabelGroupSize = Extract<AvatarSize, 'sm' | 'md' | 'lg' | 'xl'>;

const gapStyles: Record<AvatarLabelGroupSize, string> = {
  sm: 'gap-[10px]',
  md: 'gap-3', // 12px
  lg: 'gap-3', // 12px
  xl: 'gap-4', // 16px
};

export interface AvatarLabelGroupProps extends Pick<AvatarProps, 'src' | 'alt' | 'placeholder' | 'text' | 'statusIcon' | 'online'> {
  size?: AvatarLabelGroupSize;
  name: ReactNode;
  supportingText?: ReactNode;
  className?: string;
}

/** `Avatar + Label Group` composite — docs (Avatar spec) §4, fixed typography regardless of `size` (name: Inter Semibold 14/20, gray-700; supporting text: Inter Regular 14/20, gray-600). */
export const AvatarLabelGroup = ({
  size = 'md',
  name,
  supportingText,
  className,
  ...avatarProps
}: AvatarLabelGroupProps) => (
  <span className={cn('inline-flex items-center', gapStyles[size], className)}>
    <Avatar size={size} {...avatarProps} />
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-sm leading-5 font-semibold text-secondary">{name}</span>
      {supportingText && <span className="truncate text-sm leading-5 text-tertiary">{supportingText}</span>}
    </span>
  </span>
);
