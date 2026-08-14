# Componentes — Form Controls

> Cobre: Input Field, Input dropdown (variante de campo com dropdown), Checkbox, Checkbox group item, Checkbox group, Toggle.

---

## 1. Input Field

### 1.1 Props (TypeScript)

```ts
interface InputFieldProps {
  /** Tamanho do input */
  size: 'sm' | 'md';
  /** Variante de tipo/layout */
  type:
    | 'Default'
    | 'Icon leading'
    | 'Leading dropdown'
    | 'Trailing dropdown';
}
```

### 1.2 Design Tokens

#### Cores

| Elemento | Token |
|---|---|
| Fundo do input (default) | `bg-primary` |
| Fundo do input (disabled) | `bg-disabled_subtle` |
| Borda (default/filled) | `border-primary` |
| Borda (focused) | `border-brand` |
| Borda (disabled) | `border-disabled` |
| Borda (destructive) | `border-error_subtle` |
| Sombra | `shadow-xs` |
| Texto do label | `text-secondary (700)` |
| Texto do hint | `text-tertiary (600)` |

#### Espaçamentos

| Uso | Token | Contexto |
|---|---|---|
| Gap label→input, input→hint | `spacing-sm` | Vertical principal |
| Gap label→asterisco | `spacing-xxs` | Dentro do label wrapper |
| Gap entre ícone e texto | `spacing-md` | Horizontal no input |

#### Border Radius

| Token | Aplicação |
|---|---|
| `radius-md` | Cantos do input (8px) |

#### Tipografia

| Elemento | Font Family | Font Size | Font Weight | Line Height |
|---|---|---|---|---|
| Label | font-family-body | text-sm | medium | text-sm |
| Input / Hint | font-family-body | text-sm | regular | text-sm |

#### Dimensões por Tamanho

| Size | Altura do input | Padding vertical | Padding horizontal |
|---|---|---|---|
| md | 44px | 10px | 14px |
| sm | 40px | 8px | 12px |

### 1.3 Estados Visuais

| Estado | Borda | Fundo | Stroke Weight | Sombra | Notas |
|---|---|---|---|---|---|
| Placeholder | `border-primary` | `bg-primary` | 1px | `shadow-xs` | Texto em placeholder color |
| Filled | `border-primary` | `bg-primary` | 1px | `shadow-xs` | Texto preenchido |
| Focused | `border-brand` | `bg-primary` | 2px (inside) | `shadow-xs` | Ring de foco com borda brand |
| Disabled | `border-disabled` | `bg-disabled_subtle` | 1px | `shadow-xs` | Interação desativada |

#### Destrutivo (`Destructive = True`)

| Estado | Borda | Notas |
|---|---|---|
| Placeholder/Filled | `border-error_subtle` | Indica erro de validação |
| Focused | `border-error_subtle` + stroke 2px | Focus ring em tom de erro |

### 1.4 Anatomia (Hierarquia de Camadas)

```
Root (VERTICAL, gap: spacing-sm)
├── Input with label (VERTICAL, gap: spacing-sm)
│   ├── Label wrapper (HORIZONTAL, gap: spacing-xxs)
│   │   ├── Label text
│   │   └── Required * (condicional)
│   └── Input (HORIZONTAL, gap: spacing-md, radius: radius-md)
│       ├── [Icon leading] (condicional)
│       ├── Text content
│       └── [Help icon] (condicional)
└── Hint text (condicional)
```

---

## 2. Input dropdown

> Variante do campo de input que abre um menu de opções — combina `Input Field` + `Dropdown` (menu). Ver estrutura de menu completa em [`navigation.md`](./navigation.md).

### 2.1 Props (TypeScript)

```ts
type InputDropdownProps = {
  /** Variante visual */
  type: 'Default' | 'Icon leading' | 'Avatar leading' | 'Dot leading' | 'Search' | 'Tags';
  /** Estado interativo */
  state: 'Placeholder' | 'Default' | 'Focused' | 'Open' | 'Disabled';
  /** Toggles de visibilidade */
  label: boolean;          // default: true
  hintText: boolean;       // default: true
  supportingText: boolean; // default: true
  scrollBar: boolean;      // default: true
};
```

### 2.2 Estados visuais — Input frame

| Estado | Fill | Stroke | Stroke weight | Efeito extra |
|---|---|---|---|---|
| Default | `bg-primary` (#FFF) | `border-primary` (#D0D5DD) | 1px | `shadow-xs` |
| Placeholder | `bg-primary` (#FFF) | `border-primary` (#D0D5DD) | 1px | `shadow-xs` |
| Focused | `bg-primary` (#FFF) | `border-brand` (#2E9A92) | 2px | `shadow-xs` |
| Open | `bg-primary` (#FFF) | `border-brand` (#2E9A92) | 2px | `shadow-xs` |
| Disabled | `bg-disabled_subtle` (#F9FAFB) | `border-primary` (#D0D5DD) | 1px | `shadow-xs` |

### 2.3 Design Tokens

| Propriedade | Token | Valor |
|---|---|---|
| Input border-radius | `radius-md` | 8px |
| Input padding | — | 14px H / 10px V |
| Input item-spacing | `spacing-md` | 8px |
| Input shadow | `shadow-xs` | `0 1 2 0 rgba(16,24,40,0.05)` |
| Label → Input gap | `spacing-sm` | 6px |
| Label → Asterisco gap | `spacing-xxs` | 2px |
| Hint text gap | `spacing-md` | 8px |

| Elemento | Estilo | Valor |
|---|---|---|
| Tipografia — Label | text-sm / medium / font-family-body | 14px / Medium / Inter |
| Tipografia — Hint | text-sm / regular / font-family-body | 14px / Regular / Inter |
| Cor do label | `text-secondary (700)` | `#344054` |
| Cor do asterisco | `text-brand-tertiary (600)` | `#1C7E78` |
| Cor do hint text | `text-tertiary (600)` | `#475467` |

---

## 3. `_Input dropdown menu item`

### 3.1 Props (TypeScript)

```ts
type InputDropdownMenuItemProps = {
  type: 'Default' | 'Icon leading' | 'Avatar leading' | 'Dot leading';
  state: 'Default' | 'Hover' | 'Disabled';
  selected: boolean;       // default: false
  supportingText: boolean; // default: true
  iconSwap: ComponentInstance;
};
```

### 3.2 Estados visuais — Content frame

| Estado | Background | Texto |
|---|---|---|
| Default | Transparente | `text-primary (900)` (#101828) |
| Hover | `bg-primary_hover` (#F9FAFB) | `text-primary (900)` |
| Disabled | Transparente | `text-disabled` (#667085) |

### 3.3 Design Tokens

| Propriedade | Token | Valor |
|---|---|---|
| Content border-radius | `radius-sm` | 6px |
| Content padding | `spacing-md` / — | 8px L / 10px R,T,B |
| Content item-spacing | `spacing-md` | 8px |
| Outer padding | `spacing-sm` | 6px H / 1px V |
| Tipografia — Text | text-md / medium | 16px / Medium / Inter |
| Tipografia — Supporting | text-md / regular | 16px / Regular / Inter |
| Line height | text-md | 24px |
| Cor do supporting text | `text-tertiary (600)` | `#475467` |

---

## 4. Checkbox — Especificação do Componente

### 4.1 Anatomia

Composto por dois níveis:
- **`_Checkbox base`** — o controlo visual (quadrado/círculo) com ícone interno
- **`Checkbox`** — wrapper que combina o base com label e supporting text

### 4.2 Props (TypeScript)

```ts
type CheckboxProps = {
  /** Tipo do controlo */
  type: "Checkbox" | "Radio";
  /** Tamanho */
  size: "sm" | "md";
  /** Estado de seleção */
  checked: boolean;               // default: false
};
```

### 4.3 Tokens de Design

#### Dimensões

| Token | Tamanho sm | Tamanho md |
|---|---|---|
| Controlo (base) | 16×16 px | 20×20 px |
| Ícone check interno | 12×12 px | — |

#### Espaçamento

| Propriedade | Token | Valor |
|---|---|---|
| Gap (base → texto) | `spacing-md` | 8px |
| Padding-top do input wrapper | `spacing-xxs` | 2px |

#### Border Radius

| Tipo | Token | Valor |
|---|---|---|
| Checkbox sm | `radius-xs` | 4px |
| Checkbox md | `radius-sm` | 6px |
| Radio (todos) | `radius-full` | 9999px |

#### Cores — Checkbox Base

| Elemento | Estado | Token | Hex |
|---|---|---|---|
| Borda (unchecked) | Default / Hover | `Colors/Border/border-primary` | `#D0D5DD` |
| Preenchimento (checked) | Default / Hover / Focused | `Colors/Background/bg-brand-solid` | `#1C7E78` |
| Ícone check | Todos (exceto disabled) | `Colors/Foreground/fg-white` | `#FFFFFF` |
| Borda (disabled) | Disabled | `Colors/Border/border-disabled` | `#D0D5DD` |
| Fundo (disabled) | Disabled | `Colors/Background/bg-disabled_subtle` | `#F9FAFB` |
| Ícone check (disabled) | Disabled | `Colors/Foreground/fg-disabled_subtle` | `#D0D5DD` |
| Fundo (focused, unchecked) | Focused | `Colors/Background/bg-primary` | `#FFFFFF` |

#### Cores — Texto

| Elemento | Token | Hex |
|---|---|---|
| Label (Text) | `Colors/Text/text-secondary (700)` | `#344054` |
| Supporting text | `Colors/Text/text-tertiary (600)` | `#475467` |

#### Tipografia

| Elemento | Font Family | Weight | Size | Line Height |
|---|---|---|---|---|
| Label | Inter | medium (500) | text-sm (14px) | text-sm (20px) |
| Supporting text | Inter | regular (400) | text-sm (14px) | text-sm (20px) |

#### Efeitos

| Estado | Token | Detalhe |
|---|---|---|
| Focused | `Colors/Effects/Focus rings/focus-ring` | Anel duplo: sombra interna branca (spread 2px) + sombra externa brand (spread 4px, `rgba(46,154,146,1.0)`) |

#### Stroke

| Estado | Peso |
|---|---|
| Unchecked (default/hover/focused) | 1px |
| Ícone check (ativo) | ~1.67px |
| Ícone check (disabled) | 2px |

### 4.4 Estados Visuais

| Estado | Unchecked | Checked |
|---|---|---|
| Default | Borda `border-primary`, sem preenchimento | Fundo `bg-brand-solid`, ícone `fg-white` |
| Hover | Borda `border-primary`, sem preenchimento (visual idêntico ao default na base) | Fundo `bg-brand-solid`, ícone `fg-white` |
| Focused | Borda `border-primary`, fundo `bg-primary`, anel `focus-ring` | Fundo `bg-brand-solid`, ícone `fg-white`, anel `focus-ring` |
| Disabled | Borda `border-disabled`, fundo `bg-disabled_subtle` | Fundo `bg-disabled_subtle`, borda `border-disabled`, ícone `fg-disabled_subtle` |

---

## 5. Checkbox Group Item

### 5.1 Props (TypeScript)

```ts
type CheckboxGroupItemProps = {
  /** Tipo de indicador visual do item */
  type: 'Icon simple' | 'Icon card' | 'Avatar' | 'Payment icon' | 'Radio button' | 'Checkbox';
  /** Tamanho do componente */
  size: 'sm' | 'md';
  /** Estado interativo */
  state: 'Default' | 'Hover' | 'Focused' | 'Disabled';
};
```

**Total de variantes:** 192 (6 types × 2 sizes × 4 states × 2 selected × 2 breakpoints).

### 5.2 Design Tokens

#### Espaçamento

| Token | Valor | Uso |
|---|---|---|
| `spacing-xl` | 16px | Padding interno do container (top, right, bottom, left) |
| `spacing-xs` | 4px | Gap entre Content e Checkbox base |
| `spacing-lg` | 12px | Gap entre Featured icon e bloco de texto |

#### Border Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-xl` | 12px | Container principal |
| `radius-sm` | 6px | Featured icon |
| `radius-xs` | 4px | Checkbox base (indicator) |

#### Cores — Container

| Token | Hex | Uso |
|---|---|---|
| `bg-primary` | `#FFFFFF` | Background (default, hover, focused, selected) |
| `bg-disabled_subtle` | `#F9FAFB` | Background (disabled) |
| `border-secondary` | `#E4E7EC` | Stroke unselected (1px) |
| `border-brand` | `#2E9A92` | Stroke selected (2px) |
| `border-disabled` | `#D0D5DD` | Stroke disabled (1px) |

#### Cores — Checkbox Indicator

| Token | Hex | Uso |
|---|---|---|
| `border-primary` | `#D0D5DD` | Stroke do checkbox (unselected) |
| `bg-brand-solid` | `#1C7E78` | Fill do checkbox (selected) |
| `bg-disabled_subtle` | `#F9FAFB` | Fill do checkbox (disabled) |
| `border-disabled` | `#D0D5DD` | Stroke do checkbox (disabled) |

#### Cores — Texto

| Token | Hex | Uso |
|---|---|---|
| `text-secondary (700)` | `#344054` | Label principal (Text) |
| `text-tertiary (600)` | `#475467` | Subtexto e supporting text |

#### Efeitos

| Token | Uso |
|---|---|
| `shadow-xs` | Sombra no Featured icon |
| Focus ring (`state=Focused`) | Duplo drop-shadow: `0 0 0 4px #2E9A92` + `0 0 0 2px #FFFFFF` |

#### Cores — Featured Icon

| Token | Uso |
|---|---|
| `bg-primary` | Fill do icon container |
| `featured-icon-modern-border` | Stroke do icon container |

#### Tipografia

| Size | Elemento | Text Style | Font | Tamanho | Line Height |
|---|---|---|---|---|---|
| sm | Label (Text) | Text sm/Medium | Inter Medium | text-sm (14px) | text-sm (20px) |
| sm | Subtext | Text sm/Regular | Inter Regular | text-sm (14px) | text-sm (20px) |
| sm | Supporting text | Text sm/Regular | Inter Regular | text-sm (14px) | text-sm (20px) |
| md | Label (Text) | Text md/Medium | Inter Medium | text-md (16px) | text-md (24px) |
| md | Subtext | Text md/Regular | Inter Regular | text-md (16px) | text-md (24px) |
| md | Supporting text | Text md/Regular | Inter Regular | text-md (16px) | text-md (24px) |

### 5.3 Estados Visuais

| Estado | Background | Border | Stroke Weight | Checkbox | Efeitos |
|---|---|---|---|---|---|
| Default (unselected) | `bg-primary` | `border-secondary` | 1px | Stroke `border-primary` | — |
| Default (selected) | `bg-primary` | `border-brand` | 2px | Fill `bg-brand-solid` + ícone check | — |
| Hover (unselected) | `bg-primary` | `border-secondary` | 1px | Stroke `border-primary` | — |
| Hover (selected) | `bg-primary` | `border-brand` | 2px | Fill `bg-brand-solid` + ícone check | — |
| Focused (selected) | `bg-primary` | `border-brand` | 2px | Fill `bg-brand-solid` + ícone check | Focus ring duplo (brand + white) |
| Disabled (unselected) | `bg-disabled_subtle` | `border-disabled` | 1px | Fill `bg-disabled_subtle` + stroke `border-disabled` | — |

---

## 6. Checkbox Group (Composição)

### 6.1 Props (TypeScript)

```ts
type CheckboxGroupProps = {
  /** Tipo dos itens filhos */
  type: 'Icon simple' | 'Icon card' | 'Avatar' | 'Payment icon' | 'Radio button' | 'Checkbox';
  /** Tamanho dos itens */
  size: 'sm' | 'md';
  /** Breakpoint responsivo */
  breakpoint: 'Desktop' | 'Mobile';
};
```

**Total de variantes:** 24 (6 types × 2 sizes × 2 breakpoints).

O `Checkbox group` é um container que agrupa múltiplas instâncias de `Checkbox group item` em lista vertical, delegando `State` e `Selected` para cada item individualmente.

### 6.2 Largura por breakpoint

| Breakpoint | Largura |
|---|---|
| Desktop | 768px |
| Mobile | 343px |

---

## 7. Toggle — Especificação de Componente

### 7.1 Anatomia

Composto por dois níveis:
- **`_Toggle base`** — componente interno (track + thumb)
- **`Toggle`** — componente composto (base + label + supporting text)

### 7.2 Props (TypeScript)

```ts
type ToggleProps = {
  /** Estado ligado/desligado */
  pressed: boolean;                        // "False" | "True"
  /** Tamanho do toggle */
  size: "sm" | "md";
  /** Estado interativo */
  state: "Default" | "Hover" | "Focus" | "Disabled";
};
```

**Total de variantes:** 16 (`_Toggle base`) · 32 (`Toggle`).

### 7.3 Dimensões por Tamanho

| Elemento | sm | md |
|---|---|---|
| Track (w × h) | 36 × 20 px | 44 × 24 px |
| Thumb (w × h) | 16 × 16 px | 20 × 20 px |
| Padding interno (track) | 2px (uniform) | 2px (uniform) |

### 7.4 Tokens de Design

#### Cores — Track (background)

| Estado | Token | Valor |
|---|---|---|
| Off / Default | `bg-tertiary` | `#F2F4F7` |
| Off / Disabled | `bg-disabled` | `#F2F4F7` |
| On / Default | `bg-brand-solid` | `#1C7E78` |
| On / Hover | `bg-brand-solid_hover` | `#176662` |
| On / Focus | `bg-brand-solid` | `#1C7E78` |

#### Cores — Thumb (foreground)

| Estado | Token | Valor |
|---|---|---|
| Default | `fg-white` | `#FFFFFF` |
| Disabled | `toggle-button-fg_disabled` | `#F9FAFB` |

#### Cores — Texto

| Elemento | Token | Valor |
|---|---|---|
| Label | `text-secondary (700)` | `#344054` |
| Supporting text | `text-tertiary (600)` | `#475467` |

#### Border Radius

| Elemento | Token | Valor |
|---|---|---|
| Track | `radius-full` | 9999 (pill) |
| Thumb | `radius-full` | 9999 (círculo) |

#### Sombras — Thumb

| Camada | Token | Valor |
|---|---|---|
| Sombra 1 | `shadow-sm_01` | `0 1px 3px #101828 (10%)` |
| Sombra 2 | `shadow-sm_02` | `0 1px 2px #101828 (6%)` |

#### Tipografia

| Elemento | Font | Peso | Tamanho | Line height |
|---|---|---|---|---|
| Label | Inter | Medium (500) | 16px | 24px |
| Supporting text | Inter | Regular (400) | 16px | 24px |

#### Espaçamento — Layout (Toggle composto)

| Propriedade | Valor |
|---|---|
| Gap (base ↔ texto) | 12px |
| Gap (label ↔ supporting text) | 2px |
| Layout direction | Horizontal (base + coluna de texto) |

### 7.5 Estados Visuais

**Default (off)**
- Track: `bg-tertiary` · Thumb alinhado à esquerda
- Sem efeitos adicionais

**Default (on / pressed)**
- Track: `bg-brand-solid` · Thumb alinhado à direita
- Sem efeitos adicionais

**Hover (on)**
- Track: `bg-brand-solid_hover` (tom mais escuro)
- Demais propriedades inalteradas

**Focus**
- Track mantém a cor do estado Default
- Focus ring via box-shadow duplo:
  - Anel interno: `0 0 0 2px #FFFFFF` (spread)
  - Anel externo: `0 0 0 4px #2E9A92` (spread, tom brand)

**Disabled**
- Track: `bg-disabled`
- Thumb: `toggle-button-fg_disabled` (tom off-white apagado)
- Sombras do thumb permanecem
- Texto do label mantém cor original (não esmaece)

---

## Referências cruzadas

- Cores semânticas: [`foundations/colors.md`](../foundations/colors.md)
- Focus rings: [`foundations/shadows-elevation.md §3`](../foundations/shadows-elevation.md#3-focus-rings)
- Transições (hover): [`foundations/breakpoints-grid.md §5`](../foundations/breakpoints-grid.md#5-transições--tempo-de-animação)
