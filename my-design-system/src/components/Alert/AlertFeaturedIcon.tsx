import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { AlertColor } from './Alert.types';

const colorStyles: Record<AlertColor, { tone: string; glyph: string }> = {
  informative: { tone: 'fg-info', glyph: 'info' },
  success: { tone: 'fg-success', glyph: 'check_circle' },
  warning: { tone: 'fg-warning', glyph: 'error' },
  error: { tone: 'fg-error', glyph: 'error' },
};

/**
 * Placeholder for the "Featured icon outline" component, which doesn't exist in
 * the Design System yet — a 20px glyph with two concentric rings (30% / 10%).
 * Internal to Alert for now — promote to `src/components/FeaturedIcon` when built.
 */
export const AlertFeaturedIcon = ({ color, className }: { color: AlertColor; className?: string }) => (
  <span className={cn('relative inline-flex size-5 shrink-0 rounded-full', colorStyles[color].tone, className)}>
    <span aria-hidden="true" className="absolute -inset-1 rounded-full border-2 border-current opacity-30" />
    <span aria-hidden="true" className="absolute -inset-[9px] rounded-full border-2 border-current opacity-10" />
    <Icon name={colorStyles[color].glyph} size="sm" />
  </span>
);
