import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { FeedbackColor } from './feedback.types';

const colorStyles: Record<FeedbackColor, { tone: string; surface: string; glyph: string }> = {
  info: { tone: 'fg-info', surface: 'bg-info-secondary', glyph: 'info' },
  success: { tone: 'fg-success', surface: 'bg-success-secondary', glyph: 'check_circle' },
  warning: { tone: 'fg-warning', surface: 'bg-warning-secondary', glyph: 'error' },
  error: { tone: 'fg-error', surface: 'bg-error-secondary', glyph: 'error' },
};

interface FeedbackIconProps {
  color: FeedbackColor;
  /**
   * `light` — 32px tinted circle with a 16px glyph (Alert, Banner).
   * `outline` — bare 20px glyph with two concentric rings at 30% / 10% (Toast).
   */
  variant?: 'light' | 'outline';
  className?: string;
}

/**
 * Placeholder for the "Featured icon" component, which doesn't exist in the
 * Design System yet. Shared by Alert, Banner and Toast — promote to
 * `src/components/FeaturedIcon` when it is built.
 */
export const FeedbackIcon = ({ color, variant = 'light', className }: FeedbackIconProps) => {
  const { tone, surface, glyph } = colorStyles[color];

  if (variant === 'outline') {
    return (
      <span className={cn('relative inline-flex size-5 shrink-0 rounded-full', tone, className)}>
        <span aria-hidden="true" className="absolute -inset-1 rounded-full border-2 border-current opacity-30" />
        <span aria-hidden="true" className="absolute -inset-[9px] rounded-full border-2 border-current opacity-10" />
        <Icon name={glyph} size="sm" />
      </span>
    );
  }

  return (
    <span className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-full', tone, surface, className)}>
      <Icon name={glyph} size="xs" />
    </span>
  );
};
