import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import type { AlertColor, AlertProps, AlertSize } from './Alert.types';

const colorOptions = ['informative', 'success', 'warning', 'error'] satisfies AlertColor[];
const sizeOptions = ['floating', 'full-width'] satisfies AlertSize[];

/** Copy taken from the Figma frames, per colour. */
const copy: Record<AlertColor, { title: string; action: string }> = {
  informative: { title: 'We’ve just released a new feature', action: 'View changes' },
  success: { title: 'Successfully updated profile', action: 'View profile' },
  warning: { title: 'Just to let you know this might be a problem', action: 'Review settings' },
  error: { title: 'There was a problem with that action', action: 'Try again' },
};

const SUPPORTING = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.';

interface AlertPlaygroundProps extends Omit<AlertProps, 'supportingText' | 'actionLabel'> {
  supportingText: string;
  actionLabel: string;
  /** Story-only: shows the supporting text. */
  showSupportingText: boolean;
  /** Story-only: shows the action group. */
  showActions: boolean;
}

/**
 * Story-only wrapper: turns the optional slots into simple toggles and keeps the
 * preview at a realistic width (the alert is block-level and fills its container).
 */
const AlertPlayground = ({ showSupportingText, showActions, supportingText, actionLabel, ...props }: AlertPlaygroundProps) => (
  <div className="w-full min-w-[320px] max-w-[720px]">
    <Alert
      {...props}
      supportingText={showSupportingText ? supportingText : undefined}
      actionLabel={showActions ? actionLabel : undefined}
      dismissLabel={showActions ? props.dismissLabel : ''}
      onDismiss={() => {}}
      onAction={() => {}}
    />
  </div>
);

const meta = {
  title: 'Components/Alert',
  component: AlertPlayground,
  // The Docs page comes from Alert.mdx (<Meta of={AlertStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    color: 'informative',
    size: 'floating',
    title: copy.informative.title,
    supportingText: SUPPORTING,
    actionLabel: copy.informative.action,
    dismissLabel: 'Dismiss',
    showSupportingText: true,
    showActions: true,
    showCloseButton: true,
    actionLoading: false,
  },
  argTypes: {
    color: {
      name: 'Color',
      description: 'Semantic meaning of the message.',
      control: { type: 'select' },
      options: colorOptions,
    },
    size: {
      name: 'Size',
      description: 'Floating card, or a full-width banner across the page or section.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    title: { name: 'Title', description: 'Short heading of the message.', control: 'text' },
    showSupportingText: { name: 'Supporting Text', description: 'Shows the supporting text.', control: 'boolean' },
    supportingText: {
      name: 'Supporting Text Content',
      description: 'Text below (or next to) the title.',
      control: 'text',
      if: { arg: 'showSupportingText', truthy: true },
    },
    showActions: { name: 'Actions', description: 'Shows the action group.', control: 'boolean' },
    actionLabel: {
      name: 'Action Label',
      description: 'Describe the result, e.g. "Try again" or "View changes".',
      control: 'text',
      if: { arg: 'showActions', truthy: true },
    },
    dismissLabel: {
      name: 'Dismiss Label',
      description: 'Label of the dismiss action.',
      control: 'text',
      if: { arg: 'showActions', truthy: true },
    },
    actionLoading: {
      name: 'Action Loading',
      description: 'Disables the primary action to prevent duplicate submissions.',
      control: 'boolean',
      if: { arg: 'showActions', truthy: true },
    },
    showCloseButton: { name: 'Close Button', description: 'Shows the close (X) button.', control: 'boolean' },
    // Technical noise — kept out of the Live Playground.
    onAction: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    closeLabel: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof AlertPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every alert combination. */
export const Playground: Story = {};

/**
 * The four semantic colours, floating and full-width.
 * Outside the sidebar (`!dev`) — embedded in Alert.mdx via `<Canvas of={AlertStories.Colors} />`.
 */
export const Colors: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-[900px] flex-col gap-2xl">
      {sizeOptions.map((size) => (
        <div key={size} className="flex flex-col gap-xl">
          {colorOptions.map((color) => (
            <Alert
              key={color}
              size={size}
              color={color}
              title={copy[color].title}
              supportingText={SUPPORTING}
              actionLabel={copy[color].action}
              onAction={() => {}}
              onDismiss={() => {}}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Minimal alerts — title only, and no close button.
 * Outside the sidebar (`!dev`) — embedded in Alert.mdx via `<Canvas of={AlertStories.Minimal} />`.
 */
export const Minimal: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-[900px] flex-col gap-xl">
      <Alert color="success" title="Successfully updated profile" onDismiss={() => {}} />
      <Alert color="error" title="There was a problem with that action" supportingText={SUPPORTING} showCloseButton={false} />
      <Alert color="warning" size="full-width" title="Scheduled maintenance tonight at 22:00" showCloseButton={false} />
    </div>
  ),
};
