import { cn } from '../../utils/cn';
import { Icon } from '../Icon';
import type { CountryIconProps } from './CountryIcon.types';

/**
 * docs (Country Icons spec) — 234 standalone, non-variant flag marks,
 * sourced from the vendored `circle-flags` SVG set (MIT, HatScripts —
 * see public/flags/LICENSE-circle-flags.md) rather than hand-drawn: 234
 * accurate national flags is outside what can be hand-vectored reliably.
 * Each SVG is already circular (clipped internally), so no CSS masking
 * is required here — `rounded-full overflow-hidden` is a safety net for
 * any non-square source.
 */
const SPECIAL_SLUGS: Record<string, string | null> = {
  'GB-2': 'gb',
  earth: null,
};

export const CountryIcon = ({ code, size = 24, className, ...rest }: CountryIconProps) => {
  const slug = code in SPECIAL_SLUGS ? SPECIAL_SLUGS[code] : code.toLowerCase();

  if (!slug) {
    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-utility-gray-100',
          className,
        )}
        style={{ width: size, height: size }}
      >
        <Icon name="public" size="xs" className="text-tertiary" />
      </span>
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}flags/${slug}.svg`}
      alt=""
      width={size}
      height={size}
      className={cn('inline-block shrink-0 rounded-full overflow-hidden object-cover', className)}
      style={{ width: size, height: size }}
      {...rest}
    />
  );
};
