import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialButtonGroup } from './SocialButtonGroup';
import type { SocialButtonGroupStyle } from './SocialButtonGroup.types';
import type { SocialButtonTheme } from '../SocialButton/SocialButton.types';

const styleOptions = ['Buttons', 'Icons'] satisfies SocialButtonGroupStyle[];
const themeOptions = ['Brand', 'Color', 'Gray'] satisfies SocialButtonTheme[];

const meta = {
  title: 'Components/Social Button Group',
  component: SocialButtonGroup,
  // The Docs page comes from SocialButtonGroup.mdx (<Meta of={SocialButtonGroupStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  argTypes: {
    style: {
      name: 'Style',
      description: 'Buttons (labeled, stacked) or Icons (icon-only, single row).',
      control: { type: 'select' },
      options: styleOptions,
    },
    theme: {
      name: 'Theme',
      description: 'Color treatment applied to every button in the group.',
      control: { type: 'select' },
      options: themeOptions,
    },
    providers: { table: { disable: true } },
  },
} satisfies Meta<typeof SocialButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every group combination. */
export const Playground: Story = {
  args: {
    style: 'Buttons',
    theme: 'Color',
  },
  render: (args) => (
    <div className="w-72">
      <SocialButtonGroup {...args} />
    </div>
  ),
};

/**
 * All 6 style × theme combinations, side by side.
 * Outside the sidebar (`!dev`) — embedded in SocialButtonGroup.mdx via `<Canvas of={SocialButtonGroupStories.AllCombinations} />`.
 */
export const AllCombinations: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="grid grid-cols-2 gap-2xl">
      {styleOptions.map((style) => (
        <div key={style} className="flex flex-col gap-xl">
          {themeOptions.map((theme) => (
            <div key={theme} className="w-72">
              <SocialButtonGroup style={style} theme={theme} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
