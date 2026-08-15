import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountryIcon } from './CountryIcon';

/**
 * Curated subset of the 431 flags vendored in `public/flags` (see
 * CountryIcon.tsx's `SPECIAL_SLUGS` comment) — the full set mixes real
 * ISO 3166-1 countries with subdivisions, historical and fictional flags
 * (e.g. "US-TX", "SOVIET_UNION", "SEALAND"), which would make a single
 * flat dropdown unusable. This list keeps the common, real countries
 * (matching CLAUDE.md's "icon-name-like props use a select, not free
 * text" rule) plus the 2 documented special values.
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

const meta = {
  title: 'Components/Country Icon',
  component: CountryIcon,
  // The Docs page comes from CountryIcon.mdx (<Meta of={CountryIconStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  argTypes: {
    code: {
      name: 'Country Code',
      description: 'ISO 3166-1 alpha-2 code, plus "GB-2" and "earth" — curated sample, see CountryIcon.mdx for the full 431-flag set.',
      control: { type: 'select' },
      options: countryCodeOptions,
    },
    size: {
      name: 'Size',
      description: 'Icon size in px.',
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof CountryIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — type any ISO 3166-1 alpha-2 code. */
export const Playground: Story = {
  args: {
    code: 'PT',
    size: 24,
  },
};

/**
 * A representative sample of flags at the default 24px size.
 * Outside the sidebar (`!dev`) — embedded in CountryIcon.mdx via `<Canvas of={CountryIconStories.Sample} />`.
 */
export const Sample: Story = {
  tags: ['!dev'],
  args: { code: 'PT' },
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      {['PT', 'US', 'GB', 'ES', 'FR', 'DE', 'IT', 'BR', 'CA', 'AU', 'JP', 'CN', 'IN', 'MX', 'NL', 'GB-2', 'earth'].map(
        (code) => (
          <div key={code} className="flex flex-col items-center gap-xs">
            <CountryIcon code={code} />
            <span className="text-xs text-tertiary">{code}</span>
          </div>
        ),
      )}
    </div>
  ),
};
