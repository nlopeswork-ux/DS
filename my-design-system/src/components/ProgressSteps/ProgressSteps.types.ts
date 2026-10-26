import type { HTMLAttributes } from 'react';

/**
 * Direction the steps run in. `auto` is horizontal when the component's own container is wide
 * enough (512px) and vertical below that, so it adapts to a narrow panel as well as to a phone.
 */
export type ProgressStepsOrientation = 'horizontal' | 'vertical' | 'auto';

/** `text` shows a title and supporting text per step; `minimal` shows the icons alone. */
export type ProgressStepsContent = 'text' | 'minimal';

export type ProgressStepsSize = 'sm' | 'md' | 'lg';

/** Figma "_Step icon base" Status - derived from `currentStep`, never set by hand. */
export type ProgressStepStatus = 'Incomplete' | 'Current' | 'Complete';

export interface ProgressStep {
  /** Step name. Also the accessible name of the icon-only (minimal) content. */
  title: string;
  /** Supporting text under the title. Ignored by the minimal content. */
  description?: string;
}

export interface ProgressStepsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  steps: ProgressStep[];
  /** 1-based number of the step in progress. Earlier steps are complete, later ones incomplete. Default: 1. */
  currentStep?: number;
  /** Default: "auto". */
  orientation?: ProgressStepsOrientation;
  /** Default: "text". */
  content?: ProgressStepsContent;
  /** Default: "md". */
  size?: ProgressStepsSize;
  /** Draws the line joining each icon to the next. Default: true. */
  connector?: boolean;
  /** `content="minimal"` only: shows the "Step n of N" label beside the icons. Default: false. */
  showStepLabel?: boolean;
  /** Makes every step a button and reports its 1-based number - e.g. to let people go back to a completed step. */
  onStepClick?: (step: number) => void;
}
