import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ButtonHierarchy, ButtonProps, ButtonSize } from './Button.types';

/**
 * docs/foundations/spacing-radius.md §1.3 documenta apenas o tamanho `md`
 * (padding horizontal spacing-xl/16px, padding vertical 10px). Os restantes
 * tamanhos abaixo extrapolam essa base numa progressão consistente com a
 * grelha de 4px do sistema (a escala numérica px/py do Tailwind coincide
 * com a escala primitiva em docs/foundations/spacing-radius.md §1.1).
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 py-2 text-sm',
  md: 'h-10 px-4 py-2.5 text-sm',
  lg: 'h-11 px-4 py-2.5 text-base',
  xl: 'h-12 px-[18px] py-3 text-base',
  '2xl': 'h-[60px] px-[22px] py-4 text-lg',
};

const linkSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
  '2xl': 'text-lg',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'size-5',
  md: 'size-5',
  lg: 'size-5',
  xl: 'size-6',
  '2xl': 'size-6',
};

const isLinkHierarchy = (hierarchy: ButtonHierarchy) =>
  hierarchy === 'Link gray' || hierarchy === 'Link color';

/**
 * docs/components/buttons.md §1.2/§2.2 — fill, borda e hover por hierarquia.
 * `destructive` troca a escala Brand pela escala Error (§2 Button destructive),
 * mantendo a mesma lógica de hierarquia.
 */
function getHierarchyStyles(hierarchy: ButtonHierarchy, destructive: boolean) {
  if (destructive) {
    switch (hierarchy) {
      case 'Primary':
        return 'bg-error-solid text-white border border-transparent shadow-xs hover:bg-error-700';
      case 'Secondary gray':
      case 'Secondary color':
        return 'bg-primary text-error border border-error shadow-xs hover:bg-error-primary';
      case 'Tertiary gray':
      case 'Tertiary color':
        return 'bg-transparent text-error border border-transparent hover:bg-error-primary';
      case 'Link gray':
      case 'Link color':
        return 'bg-transparent text-error border border-transparent hover:text-error-700';
    }
  }

  switch (hierarchy) {
    case 'Primary':
      return 'bg-brand-solid text-primary-on-brand border border-transparent shadow-xs hover:bg-brand-solid-hover';
    case 'Secondary gray':
      return 'bg-primary text-secondary border border-primary shadow-xs hover:bg-primary-hover';
    case 'Secondary color':
      return 'bg-primary text-brand-secondary border border-brand shadow-xs hover:bg-brand-primary';
    case 'Tertiary gray':
      return 'bg-transparent text-secondary border border-transparent hover:bg-primary-hover';
    case 'Tertiary color':
      return 'bg-transparent text-brand-secondary border border-transparent hover:bg-brand-primary';
    case 'Link gray':
      return 'bg-transparent text-secondary border border-transparent hover:text-secondary-hover';
    case 'Link color':
      return 'bg-transparent text-brand-secondary border border-transparent hover:text-brand-primary';
  }
}

/** docs/foundations/shadows-elevation.md §3 — focus-ring / focus-ring-error (halo branco + anel de cor). */
const ringStyles = cva('focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-white', {
  variants: {
    destructive: {
      true: 'focus-visible:ring-error-500',
      false: 'focus-visible:ring-brand-500',
    },
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      hierarchy = 'Primary',
      state = 'Default',
      destructive = false,
      iconLeading = false,
      iconTrailing = false,
      iconLeadingSwap,
      iconTrailingSwap,
      disabled = false,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || state === 'Disabled';
    const isLink = isLinkHierarchy(hierarchy);

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-md rounded-md font-semibold whitespace-nowrap',
          'transition-colors duration-150 ease-in-out outline-none',
          'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled disabled:border-disabled disabled:shadow-none',
          isLink ? cn('p-0 h-auto', linkSizeStyles[size]) : sizeStyles[size],
          getHierarchyStyles(hierarchy, destructive),
          ringStyles({ destructive }),
          // Pré-visualização forçada de estado (Storybook) — não substitui as pseudo-classes reais.
          state === 'Hover' && 'brightness-95',
          state === 'Focused' &&
            (destructive
              ? 'ring-4 ring-offset-2 ring-offset-white ring-error-500'
              : 'ring-4 ring-offset-2 ring-offset-white ring-brand-500'),
          className,
        )}
        {...rest}
      >
        {iconLeading && iconLeadingSwap ? (
          <span aria-hidden="true" className={cn('inline-flex shrink-0', iconSizeStyles[size])}>
            {iconLeadingSwap}
          </span>
        ) : null}
        {children}
        {iconTrailing && iconTrailingSwap ? (
          <span aria-hidden="true" className={cn('inline-flex shrink-0', iconSizeStyles[size])}>
            {iconTrailingSwap}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
