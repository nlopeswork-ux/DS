import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Modal } from './Modal';
import type { ModalIconTone, ModalProps, ModalSize } from './Modal.types';

const sizeOptions = ['sm', 'md', 'lg', 'full'] satisfies ModalSize[];
const toneOptions = ['brand', 'success', 'error', 'warning', 'info', 'gray'] satisfies ModalIconTone[];
const iconOptions = ['check_circle', 'layers', 'delete', 'warning', 'info', 'edit'];

/** Placeholder for the optional body slot (md / lg / full) until the real content components exist. */
const SlotPlaceholder = () => (
  <div className="flex min-h-[200px] flex-col gap-xs rounded-md border border-dashed border-error bg-error-secondary p-md text-error">
    <p className="text-md font-medium">Slot component</p>
    <p className="text-xs">Optional placeholder. Replace it with any content — lists, tables, forms or summaries.</p>
  </div>
);

/** Virtual desktop viewport the previews are laid out in, then scaled down to fit. */
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 800;

/**
 * Story-only: lays its children out in a fixed 1280×800 "viewport" and scales
 * it to the available width, so `md` (640px), `lg` (1024px) and `full`
 * (viewport − 64px) keep their real proportions and stay visibly different.
 */
/** `gutter` — extra horizontal px to leave free (e.g. the padding a docs <Canvas> adds around its story). */
const ScaledFrame = ({ children, gutter = 0 }: { children: ReactNode; gutter?: number }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(FRAME_WIDTH * 0.6);

  useEffect(() => {
    const node = outerRef.current;
    if (!node) return;
    // The wrappers around a story shrink to their content, so measure the nearest
    // ancestor with a definite width instead: docs layouts mark theirs with
    // `data-scale-container`; the canvas falls back to the direct parent.
    const container = node.closest<HTMLElement>('[data-scale-container]') ?? node.parentElement;
    if (!container) return;
    const update = () => {
      const { paddingLeft, paddingRight } = getComputedStyle(container);
      setWidth(Math.max(320, container.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight) - gutter));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    return () => observer.disconnect();
  }, [gutter]);

  const scale = Math.min(1, width / FRAME_WIDTH);

  return (
    <div ref={outerRef} className="relative" style={{ width: FRAME_WIDTH * scale, height: FRAME_HEIGHT * scale }}>
      <div
        className="absolute top-0 left-0 origin-top-left overflow-hidden rounded-md bg-secondary"
        style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
};

interface ModalPlaygroundProps extends Omit<ModalProps, 'open' | 'icon' | 'footerStart' | 'actions' | 'inline'> {
  iconName: string;
  confirmLabel: string;
  cancelLabel: string;
  footerStartLabel: string;
  destructive: boolean;
  /** Story-only: extra horizontal space reserved around the scaled frame. */
  frameGutter?: number;
}

/**
 * Story-only wrapper: composes the real ReactNode slots (icon, footer buttons)
 * from simple pseudo-args and renders the Modal `inline`, so the live preview
 * stays inside the Storybook canvas instead of covering the whole page.
 */
const ModalPlayground = ({
  iconName,
  confirmLabel,
  cancelLabel,
  footerStartLabel,
  destructive,
  frameGutter,
  size = 'sm',
  ...props
}: ModalPlaygroundProps) => (
  <ScaledFrame gutter={frameGutter}>
    <Modal
      {...props}
      open
      inline
      size={size}
      icon={iconName === 'none' ? undefined : iconName}
      footerStart={
        footerStartLabel ? (
          <Button hierarchy="Tertiary gray" size="md">
            {footerStartLabel}
          </Button>
        ) : undefined
      }
      actions={
        <>
          <Button hierarchy="Secondary gray" size="lg">
            {cancelLabel}
          </Button>
          <Button hierarchy="Primary" size="lg" destructive={destructive}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {size === 'sm' ? undefined : <SlotPlaceholder />}
    </Modal>
  </ScaledFrame>
);

const meta = {
  title: 'Components/Modal',
  component: ModalPlayground,
  // The Docs page comes from Modal.mdx (<Meta of={ModalStories} />) — no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    size: 'sm',
    title: 'Blog post published',
    subtitle: 'This blog post has been published. Team members will be able to edit this post and republish changes.',
    iconName: 'check_circle',
    iconTone: 'success',
    footerStartLabel: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    destructive: false,
    dividers: false,
    dismissOnEsc: true,
    dismissOnOverlay: true,
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Width of the dialog. `full` fills the viewport.',
      control: { type: 'select' },
      options: sizeOptions,
    },
    title: { name: 'Title', description: 'Dialog heading.', control: 'text' },
    subtitle: { name: 'Supporting Text', description: 'Text below the title.', control: 'text' },
    iconName: {
      name: 'Featured Icon',
      description: 'Glyph shown in the featured icon circle.',
      control: { type: 'select' },
      options: ['none', ...iconOptions],
    },
    iconTone: {
      name: 'Icon Tone',
      description: 'Colour of the featured icon circle.',
      control: { type: 'select' },
      options: toneOptions,
      if: { arg: 'iconName', neq: 'none' },
    },
    footerStartLabel: {
      name: 'Footer Start Action',
      description: 'Label of the secondary action pinned to the footer start. Leave empty to hide it.',
      control: 'text',
      if: { arg: 'size', neq: 'sm' },
    },
    confirmLabel: { name: 'Confirm Label', description: 'Primary action label.', control: 'text' },
    cancelLabel: { name: 'Cancel Label', description: 'Secondary action label.', control: 'text' },
    destructive: {
      name: 'Destructive',
      description: 'Uses the error palette on the primary action.',
      control: 'boolean',
    },
    dividers: {
      name: 'Dividers',
      description: 'Draws divider lines between header, body and footer.',
      control: 'boolean',
    },
    dismissOnEsc: { name: 'Dismiss on Esc', description: 'Esc requests closure.', control: 'boolean' },
    dismissOnOverlay: {
      name: 'Dismiss on Overlay',
      description: 'Clicking the overlay requests closure.',
      control: 'boolean',
    },
    // Technical noise — kept out of the Live Playground.
    onClose: { table: { disable: true } },
    closeLabel: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof ModalPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground — freely experiment with every modal combination. */
export const Playground: Story = {
  // Full-width canvas — the scaled preview frame fills it (the docs page ignores this).
  parameters: { layout: 'padded' },
};

/**
 * Real, viewport-level dialog (portal, scroll lock, focus trap, Esc/overlay) —
 * use it to test the behaviours the inline preview skips.
 * Outside the sidebar (`!dev`) — embedded in Modal.mdx via `<Canvas of={ModalStories.Interactive} />`.
 */
export const Interactive: Story = {
  tags: ['!dev'],
  parameters: { layout: 'centered' },
  render: () => {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          size="md"
          icon="layers"
          title="Select plan"
          subtitle="Simple and flexible per-user pricing."
          onClose={close}
          footerStart={<Button hierarchy="Tertiary gray">Chat to us</Button>}
          actions={
            <>
              <Button hierarchy="Secondary gray" size="lg" onClick={close}>
                Cancel
              </Button>
              <Button size="lg" onClick={close}>
                Select plan
              </Button>
            </>
          }
        >
          <SlotPlaceholder />
        </Modal>
      </>
    );
  },
};

/**
 * Destructive confirmation — compact modal with explicit labels.
 * Outside the sidebar (`!dev`) — embedded in Modal.mdx via `<Canvas of={ModalStories.Destructive} />`.
 */
export const Destructive: Story = {
  tags: ['!dev'],
  args: {
    iconName: 'delete',
    iconTone: 'error',
    title: 'Delete item',
    subtitle: 'This will permanently delete the item and its history. This action cannot be undone.',
    confirmLabel: 'Delete item',
    destructive: true,
  },
};

/**
 * The four sizes (inline previews).
 * Outside the sidebar (`!dev`) — embedded in Modal.mdx via `<Canvas of={ModalStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-[1100px] flex-col gap-2xl">
      {sizeOptions.map((size) => (
        <ModalPlayground
          key={size}
          size={size}
          title={size === 'sm' ? 'Blog post published' : 'Select plan'}
          subtitle={size === 'sm' ? 'This blog post has been published.' : 'Simple and flexible per-user pricing.'}
          iconName={size === 'sm' ? 'check_circle' : 'layers'}
          iconTone={size === 'sm' ? 'success' : 'brand'}
          footerStartLabel={size === 'sm' ? '' : 'Chat to us'}
          confirmLabel={size === 'sm' ? 'Confirm' : 'Select plan'}
          cancelLabel="Cancel"
          destructive={false}
          dividers={size !== 'sm'}
          frameGutter={96}
        />
      ))}
    </div>
  ),
};
