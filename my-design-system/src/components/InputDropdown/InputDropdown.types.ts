import type { ReactNode } from 'react';

export interface InputDropdownOption {
  value: string;
  label: string;
  /** Leading decoration — `type: 'Icon leading'` in the source spec. */
  icon?: ReactNode;
  /** Leading decoration — `type: 'Avatar leading'`. */
  avatar?: ReactNode;
  /** Leading decoration — `type: 'Dot leading'` (any valid CSS color). */
  dotColor?: string;
  supportingText?: string;
  disabled?: boolean;
}

export interface InputDropdownProps {
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  options: InputDropdownOption[];
  /** Adds a type-ahead filter over `options.label` — `type: 'Search'` in the source spec. */
  searchable?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}
