import type { HTMLAttributes } from 'react';
import type { AvatarProps, AvatarSize } from '../Avatar';

/** docs (Avatar spec) §4 — only xs/sm/md are documented for the overlapping stack. */
export type AvatarGroupSize = Extract<AvatarSize, 'xs' | 'sm' | 'md'>;

export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  size?: AvatarGroupSize;
  /** Avatars rendered in the stack, left to right (each renders with `contrastBorder` on by default, which doubles as the separating ring between overlapping avatars). */
  avatars: Pick<AvatarProps, 'src' | 'alt' | 'placeholder' | 'text'>[];
  /** Shows a trailing `_Avatar add button` after the stack. */
  showAddButton?: boolean;
  onAddClick?: () => void;
}
