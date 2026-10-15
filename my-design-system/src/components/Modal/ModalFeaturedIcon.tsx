import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { ModalIconTone } from './Modal.types';

const toneStyles: Record<ModalIconTone, string> = {
  brand: 'bg-brand-secondary fg-brand-primary',
  success: 'bg-success-secondary fg-success',
  error: 'bg-error-secondary fg-error',
  warning: 'bg-warning-secondary fg-warning',
  gray: 'bg-secondary fg-secondary',
};

/**
 * Placeholder for the "Featured icon" component, which doesn't exist in the
 * Design System yet. Internal to Modal for now — promote to
 * `src/components/FeaturedIcon` when it is built.
 */
export const ModalFeaturedIcon = ({ name, tone = 'brand', className }: { name: string; tone?: ModalIconTone; className?: string }) => (
  <span className={cn('inline-flex size-12 shrink-0 items-center justify-center rounded-full', toneStyles[tone], className)}>
    <Icon name={name} size="md" />
  </span>
);
