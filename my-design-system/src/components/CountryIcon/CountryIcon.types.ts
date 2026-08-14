import type { ImgHTMLAttributes } from 'react';

export interface CountryIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  /**
   * ISO 3166-1 alpha-2 country/territory code (e.g. "PT", "US", "BR"),
   * plus the two special values from docs/components/country-icons.md:
   * "GB-2" (alternate UK flag — mapped to the same mark as "GB", no
   * distinct asset exists) and "earth" (generic globe placeholder for
   * "no specific country"). Case-insensitive.
   */
  code: string;
  /** Icon size in px. Fixed 24×24 per spec, but overridable for smaller embedded contexts (e.g. inside a Badge's `flagSwap` slot). */
  size?: number;
}
