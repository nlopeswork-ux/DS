import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIconOutline } from './FeaturedIconOutline';
import type { FeaturedIconColor, FeaturedIconSize } from './FeaturedIcon.types';

const colorOptions = ['brand', 'gray', 'error', 'warning', 'success', 'info'] satisfies FeaturedIconColor[];
const sizeOptions = ['sm', 'md', 'lg', 'xl'] satisfies FeaturedIconSize[];
/** Curated Material Symbols names (see the Icons page) — the glyph always comes from the Icon set. */
const nameOptions = ['error', 'info', 'check_circle', 'warning', 'help', 'notifications', 'lock', 'star', 'bolt', 'layers', 'delete', 'edit'];

const meta = {
  title: 'Components/Misc Icons/Featured Icon Outline',
  component: FeaturedIconOutline,
  // The Docs page comes from FeaturedIconOutline.mdx (<Meta of={FeaturedIconOutlineStories} />) — no 'autodocs' tag.
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
      description: 'A bare glyph with two concentric rings. Glyph 16 / 20 / 24 / 28px.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    // Technical noise — kept out of the Live Playground.
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof FeaturedIconOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every combination. */
export const Playground: Story = {
  decorators: [
    (Story) => (
      <div className="p-lg">
        <Story />
      </div>
    ),
  ],
};

/**
 * Every size × colour.
 * Outside the sidebar (`!dev`) — embedded in FeaturedIconOutline.mdx via `<Canvas of={FeaturedIconOutlineStories.Matrix} />`.
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
              <FeaturedIconOutline color={color} size={size} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
