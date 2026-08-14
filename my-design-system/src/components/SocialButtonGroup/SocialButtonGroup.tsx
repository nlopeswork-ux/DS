import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { SocialButton } from '../SocialButton/SocialButton';
import type { SocialProvider } from '../SocialButton/SocialButton.types';
import type { SocialButtonGroupProps } from './SocialButtonGroup.types';

const defaultProviders: SocialProvider[] = ['Google', 'Facebook', 'Apple'];

/**
 * docs/components/buttons.md §4.2 — a `Social button` stack with 12px item
 * spacing. `Buttons` stacks full-width labeled buttons vertically; `Icons`
 * lays the same providers out as icon-only buttons in a single row. No
 * state of its own — every visual state is inherited from the `SocialButton`
 * children.
 */
export const SocialButtonGroup = forwardRef<HTMLDivElement, SocialButtonGroupProps>(
  ({ style = 'Buttons', theme = 'Color', providers = defaultProviders, className, ...rest }, ref) => {
    const isButtons = style === 'Buttons';

    return (
      <div
        ref={ref}
        className={cn(isButtons ? 'flex flex-col gap-lg items-stretch' : 'flex flex-row gap-lg items-center', className)}
        {...rest}
      >
        {providers.map((social) => (
          <SocialButton key={social} social={social} theme={theme} supportingText={isButtons} className={isButtons ? 'w-full' : undefined} />
        ))}
      </div>
    );
  },
);

SocialButtonGroup.displayName = 'SocialButtonGroup';
