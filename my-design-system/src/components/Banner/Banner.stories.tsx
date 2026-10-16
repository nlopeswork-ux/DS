import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import type { BannerColor, BannerProps } from './Banner.types';

const colorOptions = ['info', 'success', 'warning', 'error'] satisfies BannerColor[];

/** Copy taken from the Figma frames, per colour. */
const copy: Record<BannerColor, { title: string; action: string }> = {
  info: { title: 'We’ve just released a new feature', action: 'View changes' },
  success: { title: 'Successfully updated profile', action: 'View result' },
  warning: { title: 'Just to let you know this might be a problem', action: 'Review settings' },
  error: { title: 'There was a problem with that action', action: 'Try again' },
};

const SUPPORTING = (
  <>
    Lorem ipsum dolor sit amet{' '}
    <a href="#" className="underline" onClick={(event) => event.preventDefault()}>
      consectetur
    </a>
    .
  </>
);

interface BannerPlaygroundProps extends Omit<BannerProps, 'supportingText' | 'actionLabel'> {
  supportingText: string;
  actionLabel: string;
  /** Story-only: shows the supporting text. */
  showSupportingText: boolean;
  /** Story-only: shows the action group. */
  showActions: boolean;
}

/** Story-only wrapper: turns the optional slots into simple toggles. A banner fills its container's width. */
const BannerPlayground = ({ showSupportingText, showActions, supportingText, actionLabel, ...props }: BannerPlaygroundProps) => (
  <div className="w-full min-w-[320px] max-w-[1100px]">
    <Banner
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
  title: 'Components/Banner',
  component: BannerPlayground,
  // The Docs page comes from Banner.mdx (<Meta of={BannerStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'padded',
    controls: { expanded: false },
  },
  args: {
    color: 'info',
    title: copy.info.title,
    supportingText: 'Lorem ipsum dolor sit amet consectetur.',
    actionLabel: copy.info.action,
    dismissLabel: 'Dismiss',
    showSupportingText: true,
    showActions: true,
    showCloseButton: true,
    actionLoading: false,
  },
  argTypes: {
    color: {
      name: 'Color',
      description: 'Semantic meaning of the message. Info uses button actions; the others use links.',
      control: { type: 'select' },
      options: colorOptions,
    },
    title: { name: 'Title', description: 'Short heading of the message.', control: 'text' },
    showSupportingText: { name: 'Supporting Text', description: 'Shows the supporting text.', control: 'boolean' },
    supportingText: {
      name: 'Supporting Text Content',
      description: 'Text next to (desktop) or below (mobile) the title.',
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
} satisfies Meta<typeof BannerPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every banner combination. */
export const Playground: Story = {};

/**
 * The four semantic colours.
 * Outside the sidebar (`!dev`) — embedded in Banner.mdx via `<Canvas of={BannerStories.Colors} />`.
 */
export const Colors: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="flex w-full max-w-[1100px] flex-col gap-2xl">
      {colorOptions.map((color) => (
        <Banner
          key={color}
          color={color}
          title={copy[color].title}
          supportingText={SUPPORTING}
          actionLabel={copy[color].action}
          onAction={() => {}}
          onDismiss={() => {}}
        />
      ))}
    </div>
  ),
};

/**
 * Critical banner — no X and no Dismiss, so it stays until the problem is resolved.
 * Outside the sidebar (`!dev`) — embedded in Banner.mdx via `<Canvas of={BannerStories.Critical} />`.
 */
export const Critical: Story = {
  tags: ['!dev'],
  render: () => (
    <div className="w-full max-w-[1100px]">
      <Banner
        color="error"
        title="Payments are paused"
        supportingText="Update your billing details to resume them."
        actionLabel="Update billing"
        dismissLabel=""
        showCloseButton={false}
        onAction={() => {}}
      />
    </div>
  ),
};
