# Componentes — Buttons

> Cobre: Button, Button destructive, Social button, Social button group, Mobile app store badge, Button close X.

---

## 1. Button

### 1.1 Props (TypeScript)

```ts
type ButtonProps = {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hierarchy: 'Primary' | 'Secondary gray' | 'Secondary color' | 'Tertiary gray' | 'Tertiary color' | 'Link gray' | 'Link color';
  icon: 'Default' | 'Dot leading' | 'Only';
  state: 'Default' | 'Hover' | 'Focused' | 'Disabled';
  iconLeading: boolean;       // default: true
  iconTrailing: boolean;      // default: true
  iconLeadingSwap: InstanceSwap;
  iconTrailingSwap: InstanceSwap;
};
```

### 1.2 Design Tokens

| Categoria | Token | Valor base |
|---|---|---|
| Fill (Primary) | `button-primary-bg` | ~`#1C7E78` |
| Sombra | `shadow-xs` | drop-shadow `0 1 2` (5% opacidade) |
| Sombra interna | `shadow-skeumorphic-inner` | inner-shadow `0 -2 0` (5% opacidade) |
| Borda interna | `shadow-skeumorphic-inner-border` | inner-shadow `0 0` spread:1 (18% opacidade) |
| Stroke | — | Gradiente linear branco→transparente (12%→0%) |
| Espaçamento (gap) | `spacing-md` | 8px |
| Padding horizontal | `spacing-xl` | 16px |
| Padding vertical | — | 10px |
| Border-radius | `radius-md` | 8px |
| Stroke weight | — | 2px |

### 1.3 Estados visuais

| Estado | Descrição |
|---|---|
| Default | Fill sólido + stroke gradiente + sombras skeuomórficas |
| Hover | Variação de cor/elevação do fill |
| Focused | Anel de foco (`focus-ring`) |
| Disabled | Opacidade reduzida, interação desabilitada |

---

## 2. Button destructive

### 2.1 Props (TypeScript)

```ts
type ButtonDestructiveProps = {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hierarchy: 'Primary' | 'Secondary' | 'Tertiary' | 'Link';
  icon: 'Default' | 'Dot leading' | 'Only';
  state: 'Default' | 'Hover' | 'Focused' | 'Disabled';
  iconLeading: boolean;
  iconTrailing: boolean;
  iconLeadingSwap: InstanceSwap;
  iconTrailingSwap: InstanceSwap;
};
```

### 2.2 Design Tokens

| Categoria | Token | Valor base |
|---|---|---|
| Fill (Primary) | `button-primary-error-bg` | ~`#DA2D20` |
| Sombra | `shadow-xs` | idêntico ao Button |
| Sombra interna | `shadow-skeumorphic-inner` | idêntico |
| Borda interna | `shadow-skeumorphic-inner-border` | idêntico |
| Espaçamento | `spacing-md` / `spacing-xl` | 8px / 16px |
| Border-radius | `radius-md` | 8px |

### 2.3 Estados visuais

Default | Hover | Focused | Disabled — mesma lógica do `Button` padrão, com paleta vermelha/erro (escala `Error`, ver `foundations/colors.md §1.5`).

---

## 3. Social button

### 3.1 Props (TypeScript)

```ts
type SocialButtonProps = {
  social: 'Google' | 'Facebook' | 'Apple' | 'Twitter' | 'Figma' | 'Dribbble';
  supportingText: 'True' | 'False';
  theme: 'Brand' | 'Gray' | 'Color';
  state: 'Default' | 'Hover' | 'Focused';
};
```

### 3.2 Design Tokens

| Categoria | Token | Valor base |
|---|---|---|
| Espaçamento (gap) | `spacing-lg` | 12px |
| Padding horizontal | `spacing-xl` | 16px |
| Border-radius | `radius-md` | 8px |
| Sombras | `shadow-xs`, `shadow-skeumorphic-inner`, `shadow-skeumorphic-inner-border` | — |

### 3.3 Estados visuais

| Estado | Descrição |
|---|---|
| Default | Fill por brand (Google azul, Facebook azul, Apple preto, etc.) |
| Hover | Variação de cor |
| Focused | Anel de foco |

---

## 4. Social button group

### 4.1 Props (TypeScript)

```ts
type SocialButtonGroupProps = {
  style: 'Buttons' | 'Icons';
  theme: 'Brand' | 'Color' | 'Gray';
};
```

### 4.2 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Espaçamento entre itens | `spacing-lg` | 12px |
| Layout | Vertical stack | — |

### 4.3 Estados visuais

Sem estados próprios — herdados dos `Social button` filhos.

---

## 5. Mobile app store badge

### 5.1 Props (TypeScript)

```ts
type MobileAppStoreBadgeProps = {
  store: 'Google Play' | 'App Store' | 'Galaxy Store' | 'AppGallery' | 'F-Droid';
  style: 'Brand' | 'Outline';
  size: 'md' | 'lg';
};
```

### 5.2 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Stroke (Outline) | `fg-primary (900)` | ~`#101828` |
| Border-radius | — | 5px (fixo, fora da escala do sistema) |
| Tamanho `md` | — | 135×40 |

### 5.3 Estados visuais

Sem estados interativos — badge estático.

---

## 6. Button close X

### 6.1 Props (TypeScript)

```ts
type ButtonCloseXProps = {
  size: 'sm' | 'md' | 'lg';
  darkBackground: 'False' | 'True';
  state: 'Default' | 'Hover' | 'Focused';
};
```

### 6.2 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Padding (uniforme) | `spacing-md` | 8px |
| Border-radius | `radius-md` | 8px |

### 6.3 Estados visuais

| Estado | Descrição |
|---|---|
| Default | Transparente (sem fill), ícone X visível |
| Hover | Fill de fundo sutil aparece |
| Focused | Anel de foco |

**Variante `darkBackground: True`:** inverte cores para uso sobre superfícies escuras.

---

## Referências cruzadas

- Cores/estados: [`foundations/colors.md §3.4`](../foundations/colors.md#34-estados-de-interação)
- Sombras: [`foundations/shadows-elevation.md`](../foundations/shadows-elevation.md)
- Espaçamento/radius: [`foundations/spacing-radius.md`](../foundations/spacing-radius.md)
