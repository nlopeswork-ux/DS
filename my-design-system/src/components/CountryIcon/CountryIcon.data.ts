/**
 * Curated subset of the 431 flags vendored in `public/flags` (see
 * CountryIcon.tsx's `SPECIAL_SLUGS` comment) — the full set mixes real
 * ISO 3166-1 countries with subdivisions, historical and fictional flags
 * (e.g. "US-TX", "SOVIET_UNION", "SEALAND"), which would make a single
 * flat dropdown unusable. This list keeps the common, real countries
 * (matching CLAUDE.md's "icon-name-like props use a select, not free
 * text" rule) plus the 2 documented special values.
 *
 * Lives outside `CountryIcon.stories.tsx` (rather than being exported
 * from it) because Storybook's CSF indexer treats every named export of
 * a `.stories.tsx` file as its own story — an exported array isn't a
 * valid story and throws during story configuration, breaking the whole
 * Storybook/Chromatic build.
 */
export const countryCodeOptions = [
  'earth',
  'PT',
  'ES',
  'FR',
  'DE',
  'IT',
  'GB',
  'GB-2',
  'IE',
  'NL',
  'BE',
  'CH',
  'AT',
  'SE',
  'NO',
  'DK',
  'FI',
  'PL',
  'GR',
  'TR',
  'US',
  'CA',
  'MX',
  'BR',
  'AR',
  'CL',
  'CO',
  'PE',
  'JP',
  'CN',
  'KR',
  'IN',
  'AU',
  'NZ',
  'ZA',
  'EG',
  'NG',
  'KE',
  'AE',
  'SA',
  'IL',
];
