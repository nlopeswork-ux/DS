import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import type { TooltipArrow } from './Tooltip.types';

const arrowOptions = ['None', 'Top', 'Bottom', 'Left', 'Right'] satisfies TooltipArrow[];

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  // The Docs page comes from Tooltip.mdx (<Meta of={TooltipStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    text: 'This is a tooltip',
    supportingText: false,
    arrow: 'None',
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'Main text shown in the tooltip.',
      control: 'text',
    },
    supportingText: {
      name: 'Supporting Text',
      description: 'Shows a supporting text line below the title.',
      control: 'boolean',
    },
    arrow: {
      name: 'Arrow',
      description: 'Position of the pointer triangle.',
      control: { type: 'select' },
      options: arrowOptions,
    },
    // Technical noise — kept out of the Live Playground.
    supportingTextContent: { table: { disable: true } },
    role: { table: { disable: true } },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every tooltip combination. */
export const Playground: Story = {
  args: {
    text: 'This is a tooltip',
    supportingText: false,
    arrow: 'None',
  },
};

/**
 * The 5 arrow positions, side by side.
 * Outside the sidebar (`!dev`) — embedded in Tooltip.mdx via `<Canvas of={TooltipStories.Arrows} />`.
 */
export const Arrows: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-2xl p-2xl">
      {arrowOptions.map((arrow) => (
        <Tooltip key={arrow} text="This is a tooltip" arrow={arrow} />
      ))}
    </div>
  ),
};

/**
 * With and without the supporting text line.
 * Outside the sidebar (`!dev`) — embedded in Tooltip.mdx via `<Canvas of={TooltipStories.SupportingText} />`.
 */
export const SupportingText: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-start gap-2xl p-2xl">
      <Tooltip text="This is a tooltip" arrow="Bottom" />
      <Tooltip text="This is a tooltip" arrow="Bottom" supportingText />
    </div>
  ),
};
