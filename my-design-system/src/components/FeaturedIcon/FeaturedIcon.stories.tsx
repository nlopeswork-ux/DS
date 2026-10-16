import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import type { FeaturedIconColor, FeaturedIconSize } from './FeaturedIcon.types';

const colorOptions = ['brand', 'gray', 'error', 'warning', 'success', 'info'] satisfies FeaturedIconColor[];
const sizeOptions = ['sm', 'md', 'lg', 'xl'] satisfies FeaturedIconSize[];
/** Curated Material Symbols names (see the Icons page) — the glyph always comes from the Icon set. */
const nameOptions = ['error', 'info', 'check_circle', 'warning', 'help', 'notifications', 'lock', 'star', 'bolt', 'layers', 'delete', 'edit'];

const meta = {
  title: 'Components/Misc Icons/Featured Icon',
  component: FeaturedIcon,
  // The Docs page comes from FeaturedIcon.mdx (<Meta of={FeaturedIconStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    name: 'error',
    color: 'brand',
    size: 'md',
  },
  argTypes: {
    name: {
      name: 'Icon',
      description: 'Glyph from the Icon set.',
      control: { type: 'select' },
      options: nameOptions,
    },
    color: {
      name: 'Color',
      description: 'Semantic colour.',
      control: { type: 'select' },
      options: colorOptions,
    },
    size: {
      name: 'Size',
      description: 'A tinted circle around a glyph. Sizes 32 / 40 / 48 / 56px.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    // Technical noise — kept out of the Live Playground.
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every combination. */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

/**
 * Every size × colour.
 * Outside the sidebar (`!dev`) — embedded in FeaturedIcon.mdx via `<Canvas of={FeaturedIconStories.Matrix} />`.
 */
export const Matrix: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_repeat(4,auto)] items-center gap-x-3xl gap-y-2xl p-lg">
      <span />
      {sizeOptions.map((size) => (
        <span key={size} className="text-center font-mono text-xs text-tertiary">
          {size}
        </span>
      ))}
      {colorOptions.map((color) => (
        <div key={color} className="contents">
          <span className="pr-lg text-sm font-medium text-secondary">{color}</span>
          {sizeOptions.map((size) => (
            <div key={size} className="flex items-center justify-center">
              <FeaturedIcon color={color} size={size} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
