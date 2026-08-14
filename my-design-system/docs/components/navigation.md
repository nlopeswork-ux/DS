# Componentes — Navigation

> Cobre: Dropdown (trigger + menu), `_Dropdown list item`, `_Dropdown list header`, `_Scroll bar`, Button group, `_Button group base`.

---

## 1. Dropdown

### 1.1 Props (TypeScript)

```ts
type DropdownProps = {
  type: 'Button' | 'Icon' | 'Avatar';
  open: boolean; // variante "Open": "True" | "False"
};
```

### 1.2 Estados visuais

| Estado | Trigger icon | Menu |
|---|---|---|
| Closed (`open: false`) | Ícone padrão, sem focus ring | Menu oculto |
| Open (`open: true`) | Focus ring `focus-ring` + borda branca `bg-primary` (spread 2px + 4px) | Menu visível com shadow |

### 1.3 Tokens de design

| Propriedade | Token | Valor (Light) |
|---|---|---|
| Trigger border-radius | `radius-xs` | 4px |
| Trigger fill | `bg-primary` | `#FFFFFF` |
| Trigger focus ring | `focus-ring` | Brand 500 (`#2E9A92`) |
| Menu fill | `bg-primary` | `#FFFFFF` |
| Menu border | `border-secondary` | `#E4E7EC` |
| Menu border-radius | `radius-md` | 8px |
| Menu shadow 1 | `shadow-lg_01` | `0 4 6 -2 rgba(16,24,40,0.03)` |
| Menu shadow 2 | `shadow-lg_02` | `0 12 16 -4 rgba(16,24,40,0.08)` |
| Menu items padding-y | `spacing-xs` | 4px |
| Header padding | `spacing-xl` / `spacing-lg` | 16px / 12px |

---

## 2. `_Dropdown list item`

### 2.1 Props (TypeScript)

```ts
type DropdownListItemProps = {
  state: 'Default' | 'Hover' | 'Disabled';
  icon: boolean;      // default: false
  checkbox: boolean;   // default: false
  divider: boolean;    // default: false
  shortcut: boolean;   // default: true
  supportingText: boolean; // default: true
  iconSwap: ComponentInstance;
};
```

### 2.2 Estados visuais

Mesma lógica do Menu item: **Default** transparente, **Hover** com `bg-primary_hover`, **Disabled** com texto `text-disabled`.

### 2.3 Tokens de design

| Propriedade | Token | Valor |
|---|---|---|
| Content border-radius | `radius-sm` | 6px |
| Content item-spacing | `spacing-lg` | 12px |
| Icon ↔ Text spacing | `spacing-md` | 8px |
| Outer padding | `spacing-sm` | 6px H / 1px V |
| Content padding | — | 10px H / 9px V |
| Tipografia — Text | text-sm / medium | 14px / Medium / Inter |
| Tipografia — Shortcut | text-xs / regular | 12px / Regular / Inter |
| Cor do texto (disabled) | `text-disabled` | `#667085` |
| Cor do shortcut | `text-disabled` | `#667085` |

---

## 3. `_Dropdown list header`

### 3.1 Props (TypeScript)

```ts
type DropdownListHeaderProps = {
  type: 'Avatar group' | 'Header';
};
```

### 3.2 Tokens de design

| Propriedade | Token | Valor |
|---|---|---|
| Padding | `spacing-xl` / `spacing-lg` | 16px H / 12px V |
| Border bottom | `border-secondary` | `#E4E7EC` |
| Avatar ↔ Label spacing | `spacing-lg` | 12px |

---

## 4. `_Scroll bar`

### 4.1 Props (TypeScript)

```ts
type ScrollBarProps = {
  length: '25%' | '50%' | '75%';
};
```

### 4.2 Tokens de design

| Propriedade | Token | Valor |
|---|---|---|
| Padding (all sides) | `spacing-xs` | 4px |
| Bar fill | `bg-quaternary` | `#E4E7EC` |
| Bar border-radius | `radius-full` | 9999px (pill) |

---

## 5. Paleta de tokens global do Dropdown System

| Categoria | Token | Hex (Light mode) |
|---|---|---|
| Background | `bg-primary` | `#FFFFFF` |
| | `bg-primary_hover` | `#F9FAFB` |
| | `bg-disabled_subtle` | `#F9FAFB` |
| | `bg-quaternary` | `#E4E7EC` |
| Border | `border-primary` | `#D0D5DD` |
| | `border-secondary` | `#E4E7EC` |
| | `border-brand` | `#2E9A92` |
| Text | `text-primary (900)` | `#101828` |
| | `text-secondary (700)` | `#344054` |
| | `text-tertiary (600)` | `#475467` |
| | `text-disabled` | `#667085` |
| | `text-brand-tertiary (600)` | `#1C7E78` |
| Foreground | `fg-quinary_hover` | `#667085` |
| Effects | `shadow-xs` | `0 1px 2px rgba(16,24,40,0.05)` |
| | `shadow-lg_01` | `0 4px 6px -2px rgba(16,24,40,0.03)` |
| | `shadow-lg_02` | `0 12px 16px -4px rgba(16,24,40,0.08)` |
| | `focus-ring` | Brand 500 |
| Spacing | `spacing-xxs`→`spacing-xl` | 2px→16px (ver `foundations/spacing-radius.md`) |
| Radius | `radius-xs`→`radius-full` | 4px→9999px |
| Typography | `font-family-body` | Inter |

---

## 6. Button Group — Especificação Estruturada

### 6.1 Arquitetura dos componentes

O sistema é composto por dois Component Sets:

- **`_Button group base`** — Componente interno (privado, prefixo `_`). Representa um único botão dentro do grupo.
- **`Button group`** — Componente público (wrapper). Agrupa N instâncias de `_Button group base` em layout horizontal com `itemSpacing: 0` e bordas arredondadas.

### 6.2 Props — `_Button group base`

```ts
type ButtonGroupBaseProps = {
  /** Indica se o item está ativamente selecionado */
  Current: boolean; // "False" | "True"
  /** Tipo de conteúdo visual à esquerda do label */
  Icon: "False" | "Leading" | "Only" | "Dot";
  /** Estado interativo do botão */
  State: "Default" | "Hover" | "Focused" | "Disabled";
};
```

### 6.3 Props — `Button group` (wrapper)

```ts
type ButtonGroupProps = {
  /** Modo de exibição do conteúdo dos itens */
  Icon: "False" | "Leading" | "Only";
};
```

O wrapper contém **9 slots** de `_Button group base` (visibilidade ajustável). A quantidade de itens visíveis é controlada por show/hide.

### 6.4 Design Tokens

#### Cores (coleção `1. Color modes` — Light / Dark)

| Uso | Token | Light | Dark |
|---|---|---|---|
| Background (default) | `bg-primary` | white | Gray/950 |
| Background (current) | `bg-active` | Gray/50 | Gray/800 |
| Background (hover) | `bg-primary_hover` | Gray/50 | Gray/800 |
| Border | `border-primary` | Gray/300 | Gray/700 |
| Texto (default) | `text-secondary (700)` | Gray/700 | Gray/300 |
| Texto (hover) | `text-secondary_hover` | Gray/800 | Gray/200 |
| Texto (disabled) | `text-disabled` | Gray/500 | Gray/500 |
| Focus ring | `focus-ring` | Brand/500 | Brand/500 |

#### Espaçamento (coleção `3. Spacing`)

| Token | Valor | Uso |
|---|---|---|
| `spacing-md` | 8px | padding vertical, item spacing, gap ícone↔texto |
| `spacing-lg` | 12px | padding horizontal (variante `Icon=Only`) |
| `spacing-xl` | 16px | padding horizontal (demais variantes) |

#### Border Radius (coleção `2. Radius`)

| Token | Valor | Uso |
|---|---|---|
| `radius-md` | 8px | Todos os cantos do wrapper `Button group` |

> Itens internos (`_Button group base`) **não possuem** border-radius próprio — o arredondamento vem do wrapper com clip content.

#### Tipografia (coleção `6. Typography`)

| Token | Valor |
|---|---|
| `font-family-body` | Inter |
| `font-weight/semibold` | Semibold (600) |
| `font-size/text-sm` | 14px |
| `line-height/text-sm` | 20px |

#### Elevação / Sombras (wrapper)

| Token | Tipo | Valores |
|---|---|---|
| `shadow-xs` | Drop Shadow | y: 1, blur: 2, spread: 0, `rgba(16,24,40,0.05)` |
| `shadow-skeumorphic-inner` | Inner Shadow | y: -2, blur: 0, spread: 0, `rgba(16,24,40,0.05)` |
| `shadow-skeumorphic-inner-border` | Inner Shadow | y: 0, blur: 0, spread: 1, `rgba(16,24,40,0.18)` |

### 6.5 Estados visuais (`_Button group base`)

| Estado | Background | Texto | Border | Efeitos |
|---|---|---|---|---|
| Default | `bg-primary` | `text-secondary` | `border-primary` | — |
| Hover | `bg-primary_hover` | `text-secondary_hover` | `border-primary` | — |
| Focused | `bg-primary` | `text-secondary` | `border-primary` | Focus ring: Brand/500, spread 4px + inner white ring spread 2px |
| Disabled | `bg-primary` | `text-disabled` | `border-primary` | — |
| Current (ativo) | `bg-active` | `text-secondary` | `border-primary` | — |

---

## Referências cruzadas

- Escala de z-index (dropdown sobre conteúdo): [`foundations/shadows-elevation.md §5`](../foundations/shadows-elevation.md#5-escala-de-z-index--sobreposição-inferido)
- Sombras `shadow-lg`: [`foundations/shadows-elevation.md §1`](../foundations/shadows-elevation.md#1-sombras-drop-shadows)
