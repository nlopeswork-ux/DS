import type { MegaInputFieldBaseSize } from './MegaInputFieldBase';

export type VerificationCodeSize = MegaInputFieldBaseSize;
export type VerificationCodeDigits = 4 | 6;

export interface VerificationCodeInputProps {
  size?: VerificationCodeSize;
  /** Number of individual digit boxes. */
  digits?: VerificationCodeDigits;
  /** Label text rendered above the digit boxes. */
  label?: string;
  /** Full code, as a controlled value. */
  value?: string;
  /** Full code, as an initial uncontrolled value. */
  defaultValue?: string;
  /** Activates the destructive/error visual state on every digit box. */
  error?: boolean;
  /** Error message rendered below the boxes when `error` is true. */
  errorMessage?: string;
  disabled?: boolean;
  /** Fired on every digit change with the current (possibly incomplete) code. */
  onChange?: (code: string) => void;
  /** Fired once with the full code, as soon as every digit box is filled. */
  onComplete?: (code: string) => void;
  /** `name` applied to a hidden input, so the code participates in native form submission. */
  name?: string;
}
