import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ProgressSteps } from './ProgressSteps';
import { StepIcon } from './StepIcon';
import type { ProgressStep, ProgressStepsProps, ProgressStepsSize, ProgressStepsType } from './ProgressSteps.types';

const steps: ProgressStep[] = [
  { title: 'Your details', description: 'Name and email' },
  { title: 'Company details', description: 'Website and location' },
  { title: 'Invite your team', description: 'Start collaborating' },
  { title: 'Add your socials', description: 'Automatic sharing' },
];

const FRAME = 'w-[1008px] max-w-full'; // ds-allow-hardcode: story-only preview width, the Figma desktop frame

const types: ProgressStepsType[] = ['Icons centered', 'Icons with text', 'Minimal icons', 'Minimal icons connected'];
const sizes: ProgressStepsSize[] = ['sm', 'md', 'lg'];

type PlaygroundProps = Omit<ProgressStepsProps, 'steps'>;

/** Story-only wrapper: gives the preview the width of the Figma desktop frame and supplies the steps. */
const ProgressStepsPlayground = (props: PlaygroundProps) => (
  <div className={FRAME}>
    <ProgressSteps steps={steps} {...props} />
  </div>
);

const meta = {
  title: 'Components/Progress Steps',
  component: ProgressStepsPlayground,
  // The Docs page comes from ProgressSteps.mdx (<Meta of={ProgressStepsStories} />) - no 'autodocs' tag.
  parameters: {
    layout: 'centered',
    controls: { expanded: false },
  },
  args: {
    type: 'Icons centered',
    size: 'md',
    currentStep: 2,
    connector: true,
    showText: false,
  },
  argTypes: {
    type: { name: 'Type', description: 'Layout of the steps.', control: { type: 'select' }, options: types },
    size: { name: 'Size', description: 'Size of the step icons.', control: { type: 'select' }, options: sizes },
    currentStep: { name: 'Current Step', description: 'Step in progress. Earlier steps are complete.', control: { type: 'select' }, options: [1, 2, 3, 4] },
    connector: { name: 'Connector', description: 'Line joining the icons.', control: 'boolean', if: { arg: 'type', eq: 'Icons with text' } },
    showText: { name: 'Show Text', description: 'Shows the "Step n of N" label.', control: 'boolean', if: { arg: 'type', eq: 'Minimal icons' } },
    // Technical noise - kept out of the Live Playground.
    onStepClick: { table: { disable: true } },
    className: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof ProgressStepsPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live Playground - switch type, size and the current step. */
export const Playground: Story = {};

/**
 * The four layouts side by side.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.Types} />`.
 */
export const Types: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className={`flex ${FRAME} flex-col gap-4xl`}>
      {types.map((type) => (
        <div key={type} className="flex flex-col gap-xl">
          <span className="text-sm font-medium text-secondary">{type}</span>
          <ProgressSteps steps={steps} type={type} currentStep={2} showText={type === 'Minimal icons'} />
        </div>
      ))}
    </div>
  ),
};

/**
 * sm, md and lg for every layout.
 * Outside the sidebar (`!dev`) - embedded in ProgressSteps.mdx via `<Canvas of={ProgressStepsStories.Sizes} />`.
 */
export const Sizes: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  render: () => (
    <div className={`flex ${FRAME} flex-col gap-4xl`}>
      {types.map((type) => (
        <div key={type} className="flex flex-col gap-xl">
          <span className="text-sm font-medium text-secondary">{type}</span>
          {sizes.map((size) => (
            <ProgressSteps key={size} steps={steps} type={type} size={size} currentStep={2} className={type === 'Icons with text' ? 'max-w-[400px]' : undefined} />
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
    <div className={`flex ${FRAME} flex-col gap-3xl`}>
      <ProgressSteps steps={steps} currentStep={step} onStepClick={setStep} />
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
  parameters: { layout: 'padded' },
  render: () => <Interactive />,
};
