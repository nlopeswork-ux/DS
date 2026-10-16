import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider';
import { useToast } from './ToastContext';
import type { ToastColor, ToastProps } from './Toast.types';

const colorOptions = ['info', 'success', 'warning', 'error'] satisfies ToastColor[];

/** Copy taken from the Figma frames, per colour. */
const copy: Record<ToastColor, { title: string; action: string }> = {
  info: { title: 'We’ve just released a new feature', action: 'View' },
  success: { title: 'Successfully updated profile', action: 'View profile' },
  warning: { title: 'Just to let you know this might be a problem', action: 'Learn more' },
  error: { title: 'Couldn’t save changes', action: 'Try again' },
};

const SUPPORTING = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.';

interface ToastPlaygroundProps extends Omit<ToastProps, 'supportingText' | 'actionLabel' | 'duration'> {
  supportingText: string;
  actionLabel: string;
  /** Story-only: shows the supporting text. */
  showSupportingText: boolean;
  /** Story-only: shows the action. */
  showActions: boolean;
}

/**
 * Story-only wrapper: turns the optional slots into simple toggles. The preview
 * is persistent (`duration={null}`) so it doesn't vanish while you experiment —
 * see the Interactive story for the real timer, stacking and positions.
 */
const ToastPlayground = ({ showSupportingText, showActions, supportingText, actionLabel, ...props }: ToastPlaygroundProps) => (
  <Toast
    {...props}
    supportingText={showSupportingText ? supportingText : undefined}
    actionLabel={showActions ? actionLabel : undefined}
    duration={null}
    onDismiss={() => {}}
    onAction={() => {}}
  />
);

const meta = {
  title: 'Components/Toast',
  component: ToastPlayground,
  // The Docs page comes from Toast.mdx (<Meta of={ToastStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    color: 'info',
    title: copy.info.title,
    supportingText: SUPPORTING,
    actionLabel: copy.info.action,
    showSupportingText: false,
    showActions: true,
    showCloseButton: true,
    actionLoading: false,
  },
  argTypes: {
    color: {
      name: 'Color',
      description: 'Semantic meaning of the message. Errors stay until dismissed and are announced assertively.',
      control: { type: 'select' },
      options: colorOptions,
    },
    title: { name: 'Title', description: 'Short, scannable title.', control: 'text' },
    showSupportingText: { name: 'Supporting Text', description: 'Shows the supporting text.', control: 'boolean' },
    supportingText: {
      name: 'Supporting Text Content',
      description: 'Text below the title.',
      control: 'text',
      if: { arg: 'showSupportingText', truthy: true },
    },
    showActions: { name: 'Action', description: 'Shows the single action.', control: 'boolean' },
    actionLabel: {
      name: 'Action Label',
      description: 'Describe the result, e.g. "Undo" or "View profile".',
      control: 'text',
      if: { arg: 'showActions', truthy: true },
    },
    actionLoading: {
      name: 'Action Loading',
      description: 'Disables the action to prevent duplicate submissions.',
      control: 'boolean',
      if: { arg: 'showActions', truthy: true },
    },
    showCloseButton: { name: 'Close Button', description: 'Shows the close (X) button.', control: 'boolean' },
    // Technical noise — kept out of the Live Playground.
    onAction: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    closeLabel: { table: { disable: true } },
    restartKey: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof ToastPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every toast combination (persistent preview). */
export const Playground: Story = {};

/**
 * The four semantic colours.
 * Outside the sidebar (`!dev`) — embedded in Toast.mdx via `<Canvas of={ToastStories.Colors} />`.
 */
export const Colors: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid gap-2xl sm:grid-cols-2">
      {colorOptions.map((color) => (
        <Toast
          key={color}
          color={color}
          title={copy[color].title}
          actionLabel={copy[color].action}
          duration={null}
          onAction={() => {}}
          onDismiss={() => {}}
        />
      ))}
    </div>
  ),
};

const Launcher = () => {
  const { toast, dismissAll } = useToast();
  return (
    <div className="flex max-w-[640px] flex-wrap justify-center gap-lg">
      {colorOptions.map((color) => (
        <Button
          key={color}
          hierarchy="Secondary gray"
          onClick={() =>
            toast({
              color,
              title: copy[color].title,
              // Info/success/warning dismiss on their own (5s, 8s with an action); error stays.
              actionLabel: color === 'success' || color === 'error' ? copy[color].action : undefined,
            })
          }
        >
          {color === 'info' ? 'Info' : color.charAt(0).toUpperCase() + color.slice(1)}
        </Button>
      ))}
      <Button hierarchy="Tertiary gray" onClick={dismissAll}>
        Clear all
      </Button>
    </div>
  );
};

/**
 * Real, viewport-level toasts: auto-dismiss (5s / 8s with an action, error persists), pause on
 * hover or focus, a maximum of three, no duplicates, and upper-right / bottom positioning.
 * Outside the sidebar (`!dev`) — embedded in Toast.mdx via `<Canvas of={ToastStories.Interactive} />`.
 */
export const Interactive: Story = {
  tags: ['!dev'],
  parameters: { layout: 'centered' },
  render: () => (
    <ToastProvider>
      <Launcher />
    </ToastProvider>
  ),
};
