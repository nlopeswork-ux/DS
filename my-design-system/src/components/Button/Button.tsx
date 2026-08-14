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
 *
 * O padding horizontal de cada tamanho já vem 2px abaixo do valor "nominal"
 * documentado (ex.: `md` nominal é 16px, aqui é 14px/`px-3.5`) — ver secção
 * "Optically balancing buttons" em Button.mdx. Esse 2px é devolvido pelo
 * wrapper `px-0.5` à volta do texto (ver render abaixo), o que mantém o
 * total visual igual ao nominal sem ícone, e equilibra opticamente o botão
 * quando há um ícone (cujo próprio frame já inclui ~2px de padding interno).
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 py-2 text-sm',
  md: 'h-10 px-3.5 py-2.5 text-sm',
  lg: 'h-11 px-3.5 py-2.5 text-base',
  xl: 'h-12 px-4 py-3 text-base',
  '2xl': 'h-[60px] px-5 py-4 text-lg',
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
 * docs/foundations/shadows-elevation.md §2 / Button.mdx "Skeuomorphic style
 * components" — todo botão com fill ou borda visível (Primary, Secondary
 * gray, Secondary color) usa o token composto `shadow-xs-skeuomorphic`
 * (drop-shadow + inner-shadow inferior + inner-shadow de borda) em vez do
 * `shadow-xs` plano. Referenciado via `var(--shadow-xs-skeuomorphic)` para
 * compor corretamente com `--tw-shadow`/o `focus-visible:ring-*` do botão
 * (o `@utility shadow-xs-skeuomorphic` em index.css escreve `box-shadow`
 * diretamente e por isso sobrepõe-se ao ring em vez de compor com ele).
 */
const SKEUOMORPHIC_SHADOW = 'shadow-[var(--shadow-xs-skeuomorphic)]';

/**
 * docs/components/buttons.md §1.2/§2.2 — fill, borda e hover por hierarquia.
 * `destructive` troca a escala Brand pela escala Error (§2 Button destructive),
 * mantendo a mesma lógica de hierarquia.
 */
function getHierarchyStyles(hierarchy: ButtonHierarchy, destructive: boolean) {
  if (destructive) {
    switch (hierarchy) {
      case 'Primary':
        return cn('bg-error-solid text-white border border-transparent hover:bg-error-700', SKEUOMORPHIC_SHADOW);
      case 'Secondary gray':
      case 'Secondary color':
        return cn('bg-primary text-error border border-error hover:bg-error-primary', SKEUOMORPHIC_SHADOW);
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
      return cn(
        'bg-brand-solid text-primary-on-brand border border-transparent hover:bg-brand-solid-hover',
        SKEUOMORPHIC_SHADOW,
      );
    case 'Secondary gray':
      return cn('bg-primary text-secondary border border-primary hover:bg-primary-hover', SKEUOMORPHIC_SHADOW);
    case 'Secondary color':
      return cn('bg-primary text-brand-secondary border border-brand hover:bg-brand-primary', SKEUOMORPHIC_SHADOW);
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
        {/* Wrapper +2px que devolve o padding retirado de `sizeStyles` — ver comentário acima. Hierarquias Link não têm frame de botão para equilibrar. */}
        {isLink ? children : <span className="px-0.5">{children}</span>}
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
