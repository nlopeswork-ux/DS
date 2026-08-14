import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Escala de tamanhos suportada pelo Button. */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Hierarquia visual do Button. */
export type ButtonHierarchy =
  | 'Primary'
  | 'Secondary gray'
  | 'Secondary color'
  | 'Tertiary gray'
  | 'Tertiary color'
  | 'Link gray'
  | 'Link color';

/**
 * Estado visual do Button.
 * 'Default' deixa o estado real ser governado pelo browser (:hover, :focus-visible).
 * 'Hover' e 'Focused' forçam a pré-visualização desse estado (uso principal: Storybook).
 * 'Disabled' é espelhado no atributo nativo `disabled`.
 */
export type ButtonState = 'Default' | 'Hover' | 'Focused' | 'Disabled';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  size?: ButtonSize;
  hierarchy?: ButtonHierarchy;
  state?: ButtonState;
  /** Ativa a paleta de erro sobre a mesma hierarquia (variante destrutiva). */
  destructive?: boolean;
  iconLeading?: boolean;
  iconTrailing?: boolean;
  /** Conteúdo do ícone líder, renderizado apenas quando `iconLeading` é true. */
  iconLeadingSwap?: ReactNode;
  /** Conteúdo do ícone final, renderizado apenas quando `iconTrailing` é true. */
  iconTrailingSwap?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}
