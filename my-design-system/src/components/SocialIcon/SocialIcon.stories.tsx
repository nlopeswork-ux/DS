import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialIcon } from './SocialIcon';
import type { SocialIconPlatform, SocialIconStyle } from './SocialIcon.types';

const platformOptions = [
  'AngelList',
  'Apple',
  'Clubhouse',
  'Discord',
  'Dribbble',
  'Facebook',
  'Figma',
  'GitHub',
  'Google',
  'Instagram',
  'LinkedIn',
  'Notion',
  'PayPal',
  'Pinterest',
  'Reddit',
  'Slack',
  'Spotify',
  'TikTok',
  'Twitch',
  'WhatsApp',
  'X',
  'YouTube',
] satisfies SocialIconPlatform[];

const styleOptions = ['Brand', 'Gray'] satisfies SocialIconStyle[];

const meta = {
  title: 'Components/Social Icon',
  component: SocialIcon,
  // The Docs page comes from SocialIcon.mdx (<Meta of={SocialIconStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  argTypes: {
    platform: {
      name: 'Platform',
      description: 'Which brand mark to render.',
      control: { type: 'select' },
      options: platformOptions,
    },
    style: {
      name: 'Style',
      description: "Brand colors, or a neutral gray. 'Brand' has no Hover state.",
      control: { type: 'select' },
      options: styleOptions,
    },
    state: {
      name: 'State',
      description: "Only meaningful for the 'Gray' style.",
      control: { type: 'select' },
      options: ['Default', 'Hover'],
    },
  },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every platform/style combination. */
export const Playground: Story = {
  args: {
    platform: 'Facebook',
    style: 'Brand',
    state: 'Default',
  },
};

/**
 * All 22 platforms, Brand style.
 * Outside the sidebar (`!dev`) — embedded in SocialIcon.mdx via `<Canvas of={SocialIconStories.AllPlatforms} />`.
 */
export const AllPlatforms: Story = {
  tags: ['!dev'],
  args: { style: 'Brand' },
  render: (args) => (
    <div className="grid grid-cols-6 gap-lg">
      {platformOptions.map((platform) => (
        <div key={platform} className="flex flex-col items-center gap-xs">
          <SocialIcon {...args} platform={platform} />
          <span className="text-xs text-tertiary">{platform}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Brand vs. Gray style, Default vs. Hover, for a sample of platforms.
 * Outside the sidebar (`!dev`) — embedded in SocialIcon.mdx via `<Canvas of={SocialIconStories.StylesAndStates} />`.
 */
export const StylesAndStates: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-2xl">
      {(['Facebook', 'GitHub', 'Slack', 'YouTube'] satisfies SocialIconPlatform[]).map((platform) => (
        <div key={platform} className="flex flex-col items-center gap-md">
          <div className="flex items-center gap-md">
            <SocialIcon platform={platform} style="Brand" />
            <SocialIcon platform={platform} style="Gray" state="Default" />
            <SocialIcon platform={platform} style="Gray" state="Hover" />
          </div>
          <span className="text-xs text-tertiary">{platform}</span>
        </div>
      ))}
    </div>
  ),
};
