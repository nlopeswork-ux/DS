import type { InputHTMLAttributes, ReactNode } from 'react';

/** Size scale supported by the Checkbox. */
export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: CheckboxSize;
  /** Label associated with the control via `id`/`htmlFor`. */
  label?: ReactNode;
  /** Supporting text rendered below the label. */
  supportingText?: string;
  /** Activates the destructive/error visual state on the control border. */
  error?: boolean;
  /** Renders the mixed/partial-selection visual state (dash icon). Only meaningful when `checked` is true. */
  indeterminate?: boolean;
}
