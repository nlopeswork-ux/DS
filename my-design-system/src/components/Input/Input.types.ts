import type { InputHTMLAttributes, ReactNode } from 'react';

/** Size scale supported by the Input. */
export type InputSize = 'sm' | 'md';

/** Structural variant — drives which leading/trailing slot renders. */
export type InputType =
  | 'default'
  | 'iconLeading'
  | 'leadingDropdown'
  | 'trailingDropdown'
  | 'leadingText'
  | 'paymentInput'
  | 'tags'
  | 'trailingButton';

/**
 * Storybook-only forced state preview, mirroring `ButtonState`.
 * 'Placeholder'/'Filled' don't change styling on their own — real browser
 * state (an empty vs. filled value) already drives that distinction. Only
 * 'Focused' and 'Disabled' visibly force a look. Leave unset in real usage.
 */
export type InputState = 'Placeholder' | 'Filled' | 'Focused' | 'Disabled';

export interface InputDropdownOption {
  value: string;
  label: string;
}

export interface InputDropdownSlot {
  options: InputDropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the native select (e.g. "Country code"). */
  ariaLabel: string;
}

export interface InputTag {
  id: string;
  label: string;
}

export interface InputTrailingButton {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: InputSize;
  type?: InputType;
  state?: InputState;
  /** Error palette across border, hint→error message, and the trailing help icon (swapped for an alert icon). */
  destructive?: boolean;
  label?: string;
  /** Helper text rendered below the field (hidden when an error message is shown). */
  hint?: string;
  /** Error message rendered below the field when `destructive` is true. */
  errorMessage?: string;
  required?: boolean;
  /**
   * Trailing help (info) icon, replaced by an alert icon when `destructive`.
   * Only rendered when the trailing slot is free — i.e. `type` isn't
   * `trailingDropdown`, `trailingButton`, or `tags`.
   */
  helpIcon?: boolean;
  /** Leading icon slot — active when `type="iconLeading"`. */
  iconSwap?: ReactNode;
  /** Leading fused native select (e.g. a phone country code) — active when `type="leadingDropdown"`. */
  leadingDropdown?: InputDropdownSlot;
  /** Trailing fused native select (e.g. a currency) — active when `type="trailingDropdown"`. */
  trailingDropdown?: InputDropdownSlot;
  /** Leading static text add-on (e.g. "http://") — active when `type="leadingText"`. */
  leadingTextAddon?: string;
  /** Leading payment-method icon — active when `type="paymentInput"`. */
  paymentIcon?: ReactNode;
  /** Chips rendered before the text, with an internal compose buffer — active when `type="tags"`. */
  tags?: InputTag[];
  onTagsChange?: (tags: InputTag[]) => void;
  /** Trailing action button — active when `type="trailingButton"`. */
  trailingButton?: InputTrailingButton;
}
