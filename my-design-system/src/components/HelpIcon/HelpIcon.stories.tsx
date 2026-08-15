import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpIcon } from './HelpIcon';
import type { TooltipArrow } from '../Tooltip';

const arrowOptions = ['Top', 'Bottom', 'Left', 'Right'] satisfies TooltipArrow[];

const meta = {
  title: 'Components/Help Icon',
  component: HelpIcon,
  // The Docs page comes from HelpIcon.mdx (<Meta of={HelpIconStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    cursor: true,
    open: false,
    supportingText: false,
    tooltipText: 'This is a tooltip',
    tooltipArrow: 'Bottom',
  },
  argTypes: {
    cursor: {
      name: 'Cursor',
      description: 'Shows the decorative cursor glyph next to the tooltip while open.',
      control: 'boolean',
    },
    open: {
      name: 'Open',
      description: 'Forces the tooltip open, in addition to real hover/focus.',
      control: 'boolean',
    },
    supportingText: {
      name: 'Supporting Text',
      description: "Shows the tooltip's supporting text line.",
      control: 'boolean',
    },
    tooltipText: {
      name: 'Tooltip Text',
      description: 'Tooltip title text.',
      control: 'text',
    },
    tooltipArrow: {
      name: 'Tooltip Arrow',
      description: 'Tooltip position relative to the icon.',
      control: { type: 'select' },
      options: arrowOptions,
    },
    // Technical noise — kept out of the Live Playground.
    tooltipSupportingTextContent: { table: { disable: true } },
    'aria-label': { table: { disable: true } },
  },
} satisfies Meta<typeof HelpIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every help icon combination. */
export const Playground: Story = {
  args: {
    open: true,
  },
};

/**
 * Default, closed state — only the icon is visible until hovered/focused.
 * Outside the sidebar (`!dev`) — embedded in HelpIcon.mdx via `<Canvas of={HelpIconStories.Closed} />`.
 */
export const Closed: Story = {
  tags: ['!dev'],
  args: { open: false },
};

/**
 * The 4 tooltip positions, side by side, forced open for the screenshot.
 * Outside the sidebar (`!dev`) — embedded in HelpIcon.mdx via `<Canvas of={HelpIconStories.Positions} />`.
 */
export const Positions: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-4xl p-4xl">
      {arrowOptions.map((tooltipArrow) => (
        <HelpIcon key={tooltipArrow} open tooltipArrow={tooltipArrow} cursor={false} />
      ))}
    </div>
  ),
};
