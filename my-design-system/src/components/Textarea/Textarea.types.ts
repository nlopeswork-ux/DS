import type { TextareaHTMLAttributes } from 'react';

/** Structural variant. */
export type TextareaType = 'default' | 'tags';

/**
 * Storybook-only forced state preview, mirroring `InputState`.
 * 'Placeholder'/'Default' (filled) don't change styling on their own — real
 * browser state already drives that distinction. Only 'Focused' and
 * 'Disabled' visibly force a look. Leave unset in real usage.
 */
export type TextareaState = 'Placeholder' | 'Default' | 'Focused' | 'Disabled';

export interface TextareaTag {
  id: string;
  label: string;
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  type?: TextareaType;
  state?: TextareaState;
  /** Error palette across border, hint→error message, and the help icon. */
  destructive?: boolean;
  /** Label text rendered above the field. */
  label?: string;
  /** Helper text rendered below the field (hidden when an error message is shown). */
  hint?: string;
  /** Error message rendered below the field when `destructive` is true. */
  errorMessage?: string;
  required?: boolean;
  /** Trailing help (info) icon in the label row (not inside the field), replaced by an alert icon when `destructive`. */
  helpIcon?: boolean;
  /** Shows the native vertical resize handle. */
  resizeHandle?: boolean;
  /**
   * Current list of chips. Only rendered when `type="tags"`. Presence of
   * this prop activates the internal compose buffer — Enter turns the
   * current compose text into a new chip.
   */
  tags?: TextareaTag[];
  /** Fired whenever a chip is added (Enter) or removed (Backspace / remove button). */
  onTagsChange?: (tags: TextareaTag[]) => void;
}
