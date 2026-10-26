import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ProgressSteps } from './ProgressSteps';
import { StepIcon } from './StepIcon';
import type { ProgressStep, ProgressStepsContent, ProgressStepsOrientation, ProgressStepsProps, ProgressStepsSize } from './ProgressSteps.types';

const steps: ProgressStep[] = [
  { title: 'Your details', description: 'Name and email' },
  { title: 'Company details', description: 'Website and location' },
  { title: 'Invite your team', description: 'Start collaborating' },
  { title: 'Add your socials', description: 'Automatic sharing' },
];

const orientations: ProgressStepsOrientation[] = ['auto', 'horizontal', 'vertical'];
const contents: ProgressStepsContent[] = ['text', 'minimal'];
const PHONE = 'max-w-[343px]'; // ds-allow-hardcode: story-only
const LIST = 'max-w-[400px]'; // ds-allow-hardcode: story-only
const sizes: ProgressStepsSize[] = ['sm', 'md', 'lg'];

type PlaygroundProps = Omit<ProgressStepsProps, 'steps'>;

/** Story-only wrapper: supplies the steps. The component fills its container and adapts to its width. */
const ProgressStepsPlayground = (props: PlaygroundProps) => <ProgressSteps steps={steps} {...props} />;

const meta = {
  title: 'Components/Progress Steps',
  component: ProgressStepsPlayground,
  // The Docs page comes from ProgressSteps.mdx (<Meta of={ProgressStepsStories} />) - no 'autodocs' tag.
  parameters: {
    // The component fills its container (and reflows with it), so the story must not be shrink-wrapped.
    layout: 'padded',
    fullWidth: true,
    controls: { expanded: false },
  },
  args: {
    orientation: 'horizontal',
    content: 'text',
    size: 'md',
    currentStep: 2,
    connector: true,
    showStepLabel: false,
  },
  argTypes: {
    orientation: {
      name: 'Orientation',
      description: 'Direction of the steps. Auto is horizontal when there is room and vertical when the container is narrow.',
      control: { type: 'select' },
      options: orientations,
    },
    content: { name: 'Content', description: 'Title and supporting text, or icons only.', control: { type: 'select' }, options: contents },
    size: { name: 'Size', description: 'Size of the step icons.', control: { type: 'select' }, options: sizes },
    currentStep: { name: 'Current Step', description: 'Step in progress. Earlier steps are complete.', control: { type: 'select' }, options: [1, 2, 3, 4] },
    connector: { name: 'Connector', description: 'Line joining the icons.', control: 'boolean' },
    showStepLabel: { name: 'Step Label', description: 'Shows the "Step n of N" label.', control: 'boolean', if: { arg: 'content', eq: 'minimal' } },
    // Technical noise - kept out of the Live Playground.
    onStepClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof ProgressStepsPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground - switch orientation, content, size and the current step. */
export const Playground: Story = {};

/** The layouts of the Figma file and their orientation / content / connector settings. */
const layouts: { label: string; props: PlaygroundProps }[] = [
  { label: 'Horizontal, text (Figma: Icons centered)', props: { orientation: 'horizontal', content: 'text' } },
  { label: 'Vertical, text (Figma: Icons with text)', props: { orientation: 'vertical', content: 'text' } },
  { label: 'Vertical, text, no connector', props: { orientation: 'vertical', content: 'text', connector: false } },
  { label: 'Horizontal, minimal (Figma: Minimal icons connected)', props: { orientation: 'horizontal', content: 'minimal' } },
  { label: 'Horizontal, minimal, no connector, step label (Figma: Minimal icons)', props: { orientation: 'horizontal', content: 'minimal', connector: false, showStepLabel: true } },
  { label: 'Vertical, minimal', props: { orientation: 'vertical', content: 'minimal' } },
];

/**
 * Every orientation and content combination.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.Layouts} />`.
 */
export const Layouts: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', fullWidth: true },
  render: () => (
    <div className="flex w-full flex-col gap-4xl">
      {layouts.map(({ label, props }) => (
        <div key={label} className="flex flex-col gap-xl">
          <span className="text-sm font-medium text-secondary">{label}</span>
          <ProgressSteps steps={steps} currentStep={2} {...props} />
        </div>
      ))}
    </div>
  ),
};

/**
 * The same step list in a wide and in a narrow container: `auto` follows the container, not the screen.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.Responsive} />`.
 */
export const Responsive: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', fullWidth: true },
  render: () => (
    <div className="flex w-full flex-col gap-4xl">
      <div className="flex flex-col gap-xl">
        <span className="text-sm font-medium text-secondary">Wide container: horizontal</span>
        <ProgressSteps steps={steps} currentStep={2} orientation="auto" />
      </div>
      <div className={`flex ${PHONE} flex-col gap-xl`}>
        <span className="text-sm font-medium text-secondary">Narrow container, like a phone: vertical</span>
        <ProgressSteps steps={steps} currentStep={2} orientation="auto" />
      </div>
    </div>
  ),
};

/**
 * sm, md and lg for the horizontal, vertical and minimal layouts.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', fullWidth: true },
  render: () => (
    <div className="flex w-full flex-col gap-4xl">
      {(
        [
          { label: 'Horizontal, text', props: { orientation: 'horizontal', content: 'text' } },
          { label: 'Vertical, text', props: { orientation: 'vertical', content: 'text', className: LIST } },
          { label: 'Minimal', props: { orientation: 'horizontal', content: 'minimal' } },
        ] satisfies { label: string; props: PlaygroundProps }[]
      ).map(({ label, props }) => (
        <div key={label} className="flex flex-col gap-xl">
          <span className="text-sm font-medium text-secondary">{label}</span>
          {sizes.map((size) => (
            <ProgressSteps key={size} steps={steps} size={size} currentStep={2} {...props} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Status and focus of the step icon.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.States} />`.
 */
export const States: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_auto_auto_auto] items-center gap-x-3xl gap-y-xl p-lg">
      <span />
      <span className="text-sm text-tertiary">Incomplete</span>
      <span className="text-sm text-tertiary">Current</span>
      <span className="text-sm text-tertiary">Complete</span>
      {sizes.map((size) => (
        <div key={size} className="contents">
          <span className="text-sm text-tertiary">{size} | Default</span>
          <StepIcon size={size} status="Incomplete" />
          <StepIcon size={size} status="Current" />
          <StepIcon size={size} status="Complete" />
          <span className="text-sm text-tertiary">{size} | Focused</span>
          <StepIcon size={size} status="Incomplete" focused />
          <StepIcon size={size} status="Current" focused />
          <StepIcon size={size} status="Complete" focused />
        </div>
      ))}
    </div>
  ),
};

const Interactive = () => {
  const [step, setStep] = useState(2);
  return (
    <div className="flex w-full flex-col gap-3xl">
      <ProgressSteps steps={steps} currentStep={step} onStepClick={setStep} orientation="horizontal" />
      <div className="flex justify-center gap-lg">
        <Button hierarchy="Secondary gray" size="sm" disabled={step <= 1} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button hierarchy="Primary" size="sm" disabled={step >= steps.length} onClick={() => setStep(step + 1)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

/**
 * Controlled usage - the step lives in the parent; clicking a step or using the buttons moves it.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.InteractiveExample} />`.
 */
export const InteractiveExample: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded', fullWidth: true },
  render: () => <Interactive />,
};
