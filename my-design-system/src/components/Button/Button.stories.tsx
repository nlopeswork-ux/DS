import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { Icon } from '../Icon';
import type { ButtonHierarchy, ButtonSize } from './Button.types';

const hierarchyOptions = [
  'Primary',
  'Secondary gray',
  'Secondary color',
  'Tertiary gray',
  'Tertiary color',
  'Link gray',
  'Link color',
] satisfies ButtonHierarchy[];

const sizeOptions = ['sm', 'md', 'lg', 'xl', '2xl'] satisfies ButtonSize[];

const meta = {
  title: 'Components/Button',
  component: Button,
  // The Docs page comes from Button.mdx (<Meta of={ButtonStories} />) —
  // no 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    // Box sized to the component, no surrounding text or context.
    layout: 'centered',
    // Controls panel (addon panel and Docs) without the Description/Default
    // columns — Name + Control only, OutSystems UI style.
    controls: { expanded: false },
  },
  args: {
    onClick: fn(),
    children: 'Button CTA',
    iconLeadingSwap: <Icon name="add" size="sm" />,
    iconTrailingSwap: <Icon name="arrow_forward" size="sm" />,
  },
  // No `table: { category }`: that native Storybook option renders
  // collapsible accordions. Visual grouping (Appearance / Icons / Content)
  // is done in Button.mdx purely with whitespace between 3
  // `<Controls include={[...]} />` blocks — no category headers, emojis or
  // backgrounds (OutSystems UI style, see CLAUDE.md).
  // Descriptions are still defined (used outside the Playground, on the
  // "full" Storybook Docs pages) but are hidden in the Playground via
  // `parameters.controls.expanded: false` + CSS in Button.mdx.
  argTypes: {
    children: {
      name: 'Label Text',
      description: 'Text content of the button.',
      control: 'text',
    },
    size: {
      name: 'Size',
      description: 'Size of the button.',
      // >= 3 options — dropdown, OutSystems UI style.
      control: { type: 'select' },
      options: sizeOptions,
    },
    hierarchy: {
      name: 'Hierarchy',
      description: 'Visual weight of the button.',
      // >= 3 options — dropdown, OutSystems UI style.
      control: 'select',
      options: hierarchyOptions,
    },
    state: {
      name: 'State',
      description: 'Visual state of the button.',
      // >= 3 options — dropdown, OutSystems UI style.
      control: 'select',
      options: ['Default', 'Hover', 'Focused', 'Disabled'],
    },
    destructive: {
      name: 'Destructive',
      description: 'Error palette on the current hierarchy.',
      control: 'boolean',
    },
    iconLeading: {
      name: 'Left Icon',
      description: 'Icon before the text.',
      control: 'boolean',
    },
    iconTrailing: {
      name: 'Right Icon',
      description: 'Icon after the text.',
      control: 'boolean',
    },
    // Technical noise — kept out of the Live Playground (callback, native
    // HTML attributes, and the internal React nodes for the icon slots).
    // `disabled` specifically duplicates `state: 'Disabled'` (Button.tsx:
    // `isDisabled = disabled || state === 'Disabled'`) — showing both as
    // separate Playground rows reads as two different controls for the
    // same outcome, so only `State` (which already offers a "Disabled"
    // option) is exposed here. The real `disabled` prop stays usable in
    // code — it's a real, distinct prop — just not duplicated in the demo.
    disabled: { table: { disable: true } },
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
    iconLeadingSwap: { table: { disable: true } },
    iconTrailingSwap: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every button combination. */
export const Playground: Story = {
  args: {
    hierarchy: 'Primary',
    size: 'md',
    // Booleans with an explicit value (never `undefined`): without this,
    // the Controls addon doesn't know which switch to draw and shows the
    // intermediate "Set boolean" button instead of the direct toggle.
    destructive: false,
    iconLeading: false,
    iconTrailing: false,
    disabled: false,
  },
};

/**
 * All available visual hierarchies, side by side.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.AllHierarchies} />`.
 */
export const AllHierarchies: Story = {
  tags: ['!dev'],
  args: { hierarchy: 'Primary' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {hierarchyOptions.map((hierarchy) => (
        <Button key={hierarchy} {...args} hierarchy={hierarchy}>
          {hierarchy}
        </Button>
      ))}
    </div>
  ),
};

/**
 * Destructive variant, used for irreversible or risky actions.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.Destructive} />`.
 */
export const Destructive: Story = {
  tags: ['!dev'],
  args: { hierarchy: 'Primary' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      {(['Primary', 'Secondary gray', 'Tertiary gray', 'Link gray'] satisfies ButtonHierarchy[]).map(
        (hierarchy) => (
          <Button key={hierarchy} {...args} hierarchy={hierarchy} destructive>
            {hierarchy}
          </Button>
        ),
      )}
    </div>
  ),
};

/**
 * A realistic action bar showing the 4-level hierarchy in context: a
 * Tertiary/text-only action, two Secondary actions, and one Primary action.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.HierarchyInContext} />`.
 */
export const HierarchyInContext: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button hierarchy="Link gray">Cancel</Button>
      <Button hierarchy="Secondary gray">Save as draft</Button>
      <Button hierarchy="Secondary gray">Stage for publish</Button>
      <Button hierarchy="Primary" iconLeading iconLeadingSwap={<Icon name="check" size="sm" />}>
        Publish now
      </Button>
    </div>
  ),
};

/**
 * Destructive action in context: reserved for when the destructive action
 * is itself the primary action of the screen (e.g. a delete confirmation).
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.DestructiveInContext} />`.
 */
export const DestructiveInContext: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-wrap items-center gap-md">
        <Button hierarchy="Secondary gray">Discard</Button>
        <Button hierarchy="Primary">Save changes</Button>
      </div>
      <div className="flex flex-wrap items-center gap-md">
        <Button hierarchy="Secondary gray">Cancel</Button>
        <Button hierarchy="Primary" destructive>
          Delete
        </Button>
      </div>
    </div>
  ),
};

/**
 * Size options, from sm to 2xl.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  args: { hierarchy: 'Primary' },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-lg">
      {sizeOptions.map((size) => (
        <Button key={size} {...args} size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

/**
 * Button with a left icon, a right icon, or both.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.WithIcons} />`.
 */
export const WithIcons: Story = {
  tags: ['!dev'],
  args: { hierarchy: 'Primary' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-lg">
      <Button {...args} iconLeading iconLeadingSwap={<Icon name="add" size="sm" />}>
        Left icon
      </Button>
      <Button {...args} iconTrailing iconTrailingSwap={<Icon name="arrow_forward" size="sm" />}>
        Right icon
      </Button>
      <Button
        {...args}
        iconLeading
        iconTrailing
        iconLeadingSwap={<Icon name="add" size="sm" />}
        iconTrailingSwap={<Icon name="arrow_forward" size="sm" />}
      >
        Both
      </Button>
    </div>
  ),
};

/**
 * Icon optical-balancing comparison: a naive button (nominal 16px padding,
 * no text wrapper) reads as off-center once an icon is added, next to the
 * real Button (14px padding + a 2px text wrapper — see Button.tsx
 * `sizeStyles`), which stays visually centered.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.OpticalBalance} />`.
 */
export const OpticalBalance: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center gap-md">
        <button
          type="button"
          className="inline-flex items-center gap-md rounded-md bg-brand-solid px-4 py-2.5 text-sm font-semibold text-primary-on-brand"
        >
          <Icon name="add" size="sm" />
          Add team member
        </button>
        <span className="text-sm text-tertiary">Without compensation — 16px both sides, icon side reads heavier</span>
      </div>
      <div className="flex items-center gap-md">
        <Button hierarchy="Primary" iconLeading iconLeadingSwap={<Icon name="add" size="sm" />}>
          Add team member
        </Button>
        <span className="text-sm text-tertiary">Button component — optically centered</span>
      </div>
    </div>
  ),
};

/**
 * Flat vs. skeuomorphic shadow comparison — the flat button uses a plain
 * `shadow-xs`, the real Button uses the composite `shadow-xs-skeuomorphic`
 * token (drop-shadow + inner-shadow + inner-shadow border).
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.SkeuomorphicComparison} />`.
 */
export const SkeuomorphicComparison: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex flex-wrap items-center gap-2xl">
      <div className="flex flex-col items-center gap-md">
        <button type="button" className="rounded-md bg-brand-solid px-3.5 py-2.5 text-sm font-semibold text-primary-on-brand shadow-xs">
          Publish now
        </button>
        <span className="text-xs text-tertiary">Flat (shadow-xs)</span>
      </div>
      <div className="flex flex-col items-center gap-md">
        <Button hierarchy="Primary">Publish now</Button>
        <span className="text-xs text-tertiary">Skeuomorphic (shadow-xs-skeuomorphic)</span>
      </div>
    </div>
  ),
};

/**
 * Disabled state, no interaction available.
 * Outside the sidebar (`!dev`) — embedded in Button.mdx via `<Canvas of={ButtonStories.Disabled} />`.
 */
export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    hierarchy: 'Primary',
    state: 'Disabled',
  },
};
