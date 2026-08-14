import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Avatar, AvatarAddButton } from '../Avatar';
import type { AvatarGroupProps, AvatarGroupSize } from './AvatarGroup.types';

/** docs (Avatar spec) §4 — gap between the last avatar and the add button (the -12px overlap between avatars is applied per-item below, identical across xs/sm/md). */
const addButtonGapStyles: Record<AvatarGroupSize, string> = {
  xs: 'ml-2', // 8px
  sm: 'ml-2',
  md: 'ml-2',
};

/** `Avatar Group` composite — docs (Avatar spec) §4. An overlapping stack (-12px item spacing), each avatar's `contrastBorder` doubling as the white separating ring, later avatars stacked on top. */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ size = 'md', avatars, showAddButton = false, onAddClick, className, ...rest }, ref) => (
    <div ref={ref} className={cn('inline-flex items-center', className)} {...rest}>
      <div className="flex items-center">
        {avatars.map((avatar, index) => (
          <Avatar
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            size={size}
            contrastBorder
            className={cn(index > 0 && '-ml-3', 'ring-2 ring-primary rounded-full')}
            style={{ zIndex: avatars.length - index }}
            {...avatar}
          />
        ))}
      </div>
      {showAddButton && <AvatarAddButton size={size} onClick={onAddClick} className={addButtonGapStyles[size]} />}
    </div>
  ),
);

AvatarGroup.displayName = 'AvatarGroup';
