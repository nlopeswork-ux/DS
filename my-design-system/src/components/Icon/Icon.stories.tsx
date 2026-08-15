import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import type { IconSize, IconWeight } from './Icon.types';

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] satisfies IconSize[];
const weightOptions = [100, 200, 300, 400, 500, 600, 700] satisfies IconWeight[];

/** Small curated sample — any valid Material Symbols name works, this is just for the gallery below. */
const sampleNames = [
  'home',
  'search',
  'settings',
  'favorite',
  'menu',
  'close',
  'check_circle',
  'delete',
  'arrow_forward',
  'notifications',
];

/**
 * Curated list for the Playground's `name` control — every Material Symbols
 * name actually used somewhere in this design system, plus a handful of
 * other common ones. Not exhaustive (the full set has 3000+ names, see
 * fonts.google.com/icons) — `Icon` itself still accepts any valid name via
 * code, this is just so the Playground offers a dropdown instead of a
 * free-text field a typo could silently break (CLAUDE.md — "icon-name-like
 * props use a select, not free text").
 */
const nameOptions = [
  'add',
  'arrow_forward',
  'arrow_selector_tool',
  'check',
  'check_circle',
  'close',
  'content_copy',
  'delete',
  'domain',
  'error',
  'expand_more',
  'favorite',
  'flag',
  'help',
  'home',
  'info',
  'logout',
  'mail',
  'menu',
  'notifications',
  'person',
  'plan',
  'public',
  'search',
  'settings',
  'star',
  'warning',
];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  // The Docs page comes from Icon.mdx (<Meta of={IconStories} />) — no
  // 'autodocs' tag, so it doesn't generate a second, conflicting page.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    name: 'home',
    size: 'md',
    filled: false,
    weight: 400,
  },
  argTypes: {
    name: {
      name: 'Icon Name',
      description: 'Material Symbols icon name — curated sample, any valid name from fonts.google.com/icons works in code.',
      control: { type: 'select' },
      options: nameOptions,
    },
    size: {
      name: 'Size',
      description: 'Size of the icon.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    filled: {
      name: 'Filled',
      description: 'Uses the filled variant of the glyph instead of the outlined default.',
      control: 'boolean',
    },
    weight: {
      name: 'Weight',
      description: 'Stroke weight of the glyph (100–700).',
      control: { type: 'select' },
      options: weightOptions,
    },
    color: {
      name: 'Color',
      description: 'CSS color override. Defaults to currentColor.',
      control: 'color',
    },
    label: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Gallery: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="grid grid-cols-5 gap-6 text-primary">
      {sampleNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} size="lg" />
          <span className="text-xs text-tertiary">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex items-end gap-6 text-primary">
      {sizeOptions.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="star" size={size} filled />
          <span className="text-xs text-tertiary">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const FilledVsOutlined: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex items-center gap-8 text-primary">
      <div className="flex flex-col items-center gap-2">
        <Icon name="favorite" size="xl" />
        <span className="text-xs text-tertiary">Outlined</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="favorite" size="xl" filled />
        <span className="text-xs text-tertiary">Filled</span>
      </div>
    </div>
  ),
};

export const SemanticColors: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex items-center gap-6">
      <Icon name="check_circle" size="lg" filled className="fg-success" />
      <Icon name="error" size="lg" filled className="fg-error" />
      <Icon name="warning" size="lg" filled className="fg-warning" />
      <Icon name="info" size="lg" filled className="fg-brand-primary" />
    </div>
  ),
};
