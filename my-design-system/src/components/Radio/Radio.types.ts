import type { InputHTMLAttributes, ReactNode } from 'react';

/** Size scale supported by the Radio. */
export type RadioSize = 'sm' | 'md';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: RadioSize;
  /** Label associated with the control via `id`/`htmlFor`. */
  label?: ReactNode;
  /** Supporting text rendered below the label. */
  supportingText?: string;
  /** Activates the destructive/error visual state on the control border. */
  error?: boolean;
}
