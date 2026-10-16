import { FeaturedIcon, FeaturedIconOutline } from '../FeaturedIcon';
import type { FeedbackColor } from './feedback.types';

/** Glyph (from the `Icon` set) used for each feedback colour. */
const glyphs: Record<FeedbackColor, string> = {
  info: 'info',
  success: 'check_circle',
  warning: 'error',
  error: 'error',
};

interface FeedbackIconProps {
  color: FeedbackColor;
  /**
   * `light` — `FeaturedIcon` sm (32px circle, 16px glyph): Alert, Banner.
   * `outline` — `FeaturedIconOutline` md (20px glyph with rings): Toast.
   */
  variant?: 'light' | 'outline';
  className?: string;
}

/** Maps a feedback colour onto the shared Featured icon components. */
export const FeedbackIcon = ({ color, variant = 'light', className }: FeedbackIconProps) =>
  variant === 'outline' ? (
    <FeaturedIconOutline name={glyphs[color]} color={color} size="md" className={className} />
  ) : (
    <FeaturedIcon name={glyphs[color]} color={color} size="sm" className={className} />
  );
