import type { Meta, StoryObj } from '@storybook/react-vite';
import { CountryIcon } from './CountryIcon';

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
      description: 'ISO 3166-1 alpha-2 code (e.g. "PT", "US"), plus "GB-2" and "earth".',
      control: 'text',
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
