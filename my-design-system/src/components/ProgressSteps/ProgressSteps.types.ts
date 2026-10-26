import type { HTMLAttributes } from 'react';

/** Figma "Progress steps" layouts: the four published variants. */
export type ProgressStepsType = 'Icons centered' | 'Icons with text' | 'Minimal icons' | 'Minimal icons connected';

export type ProgressStepsSize = 'sm' | 'md' | 'lg';

/** Figma "_Step icon base" Status - derived from `currentStep`, never set by hand. */
export type ProgressStepStatus = 'Incomplete' | 'Current' | 'Complete';

export interface ProgressStep {
  /** Step name. Also the accessible name of the icon-only (minimal) layouts. */
  title: string;
  /** Supporting text under the title. Ignored by the minimal layouts. */
  description?: string;
}

export interface ProgressStepsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  steps: ProgressStep[];
  /** 1-based number of the step in progress. Earlier steps are complete, later ones incomplete. Default: 1. */
  currentStep?: number;
  /** Layout. Default: "Icons centered" (icon above the text on desktop, a vertical list on mobile). */
  type?: ProgressStepsType;
  /** Default: "md". */
  size?: ProgressStepsSize;
  /** "Icons with text" only: draws the line joining each icon to the next. Default: true. */
  connector?: boolean;
  /** "Minimal icons" only: shows the "Step n of N" label beside the icons. Default: false. */
  showText?: boolean;
  /** Makes every step a button and reports its 1-based number - e.g. to let people go back to a completed step. */
  onStepClick?: (step: number) => void;
}
