import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SocialButton } from './SocialButton';
import type { SocialButtonTheme, SocialProvider } from './SocialButton.types';

const providerOptions = ['Google', 'Facebook', 'Apple', 'Twitter', 'Figma', 'Dribbble'] satisfies SocialProvider[];

const themeOptions = ['Brand', 'Color', 'Gray'] satisfies SocialButtonTheme[];

const meta = {
  title: 'Components/Social Button',
  component: SocialButton,
  // The Docs page comes from SocialButton.mdx (<Meta of={SocialButtonStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    social: {
      name: 'Provider',
      description: 'Identity provider this button represents.',
      control: { type: 'select' },
      options: providerOptions,
    },
    theme: {
      name: 'Theme',
      description: 'Color treatment of the button.',
      control: { type: 'select' },
      options: themeOptions,
    },
    state: {
      name: 'State',
      description: 'Visual state of the button.',
      control: { type: 'select' },
      options: ['Default', 'Hover', 'Focused'],
    },
    supportingText: {
      name: 'Supporting Text',
      description: 'Shows the "Sign in with…" label. When off, the button is icon-only.',
      control: 'boolean',
    },
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every social button combination. */
export const Playground: Story = {
  args: {
    social: 'Google',
    theme: 'Color',
    state: 'Default',
    supportingText: true,
  },
};

/**
 * All providers, side by side.
 * Outside the sidebar (`!dev`) — embedded in SocialButton.mdx via `<Canvas of={SocialButtonStories.AllProviders} />`.
 */
export const AllProviders: Story = {
  tags: ['!dev'],
  args: { theme: 'Color', supportingText: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {providerOptions.map((social) => (
        <SocialButton key={social} {...args} social={social} />
      ))}
    </div>
  ),
};

/**
 * Brand, Color and Gray themes for the same provider set.
 * Outside the sidebar (`!dev`) — embedded in SocialButton.mdx via `<Canvas of={SocialButtonStories.Themes} />`.
 */
export const Themes: Story = {
  tags: ['!dev'],
  args: { supportingText: true },
  render: (args) => (
    <div className="flex flex-col gap-xl">
      {themeOptions.map((theme) => (
        <div key={theme} className="flex flex-wrap items-center gap-lg">
          {providerOptions.map((social) => (
            <SocialButton key={social} {...args} theme={theme} social={social} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Icon-only variant (`supportingText: false`), 44×44 square buttons.
 * Outside the sidebar (`!dev`) — embedded in SocialButton.mdx via `<Canvas of={SocialButtonStories.IconOnly} />`.
 */
export const IconOnly: Story = {
  tags: ['!dev'],
  args: { theme: 'Color', supportingText: false },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {providerOptions.map((social) => (
        <SocialButton key={social} {...args} social={social} />
      ))}
    </div>
  ),
};

/**
 * Forced Hover/Focused state previews.
 * Outside the sidebar (`!dev`) — embedded in SocialButton.mdx via `<Canvas of={SocialButtonStories.States} />`.
 */
export const States: Story = {
  tags: ['!dev'],
  args: { social: 'Google', theme: 'Color', supportingText: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      <SocialButton {...args} state="Default" />
      <SocialButton {...args} state="Hover" />
      <SocialButton {...args} state="Focused" />
    </div>
  ),
};
