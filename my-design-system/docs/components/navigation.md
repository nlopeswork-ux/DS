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

---

## Pagination

> Fonte: Figma KDS — Design System, frame "Pagination" (`1115:68622`) — Type "Page default", Shape "Circle", Desktop / Mobile.

```ts
type PaginationProps = {
  pageCount: number;
  page?: number; defaultPage?: number; onPageChange?: (page: number) => void;
  previousLabel?: string; nextLabel?: string;       // Desktop
};
```

| | Desktop | Mobile (< 640px) |
|---|---|---|
| Layout | `border-t border-secondary`, `pt-spacing-2xl`, gap `spacing-lg`, centrado; Previous · números · Next | `pt-spacing-xl`, `justify-between`; seta · "Page n of N" · seta |
| Setas | `Link gray` com `arrow_back` / `arrow_forward` (Icon set) | `Secondary gray` só ícone, 36px |
| Números | Círculo 40px, `text-sm` medium, `text-tertiary`; hover e atual: `bg-primary-hover` + `text-secondary-hover`; gap `spacing-xxs` (2px) | — |

**Janela de páginas:** até 7 páginas mostram-se todas; acima disso `1 2 3 … n-2 n-1 n` junto às pontas e `1 … c-1 c c+1 … n` no meio (a página atual fica sempre visível).

**Estados do número (Figma `_Pagination number base`):** Default `text-tertiary` · Hover/active `bg-primary-hover` + `text-secondary-hover` (igual à página atual) · Focused anel de 2px sobre intervalo de 2px. Previous/Next reutilizam os estados do `Button` (Link gray).

**Interações:** número ou seta chamam `onPageChange`; Previous desativa na 1.ª página e Next na última; a página atual tem `aria-current="page"`; `nav` com `aria-label="Pagination"`. Glifos das setas vêm do `Icon`.

---

## Tabs (horizontal) e Vertical tabs

> Fonte: Figma KDS — Design System, frames "Horizontal tabs" (`1118:69893`) e "Vertical tabs" (`1397:9880`).

```ts
type TabItem = { value: string; label: string; badge?: ReactNode; disabled?: boolean; content?: ReactNode };
type TabsProps = {
  items: TabItem[]; value?: string; defaultValue?: string; onValueChange?: (v: string) => void;
  type: 'Underline' | 'Button';
  size: 'sm' | 'md'; fullWidth?: boolean;
};
type VerticalTabsProps = { /* igual, sem fullWidth */ type: 'Line' | 'Button' };
```

| | sm | md |
|---|---|---|
| Texto | `text-sm` semibold | `text-md` (16px) semibold |
| Tab `Button` e `Line` | h 36px, `rounded-sm`, `px-lg py-md` | h 44px |
| Underline | h 32px, `px-xs pb-lg`, lista `gap-lg` sobre regra `border-secondary` | h 36px |
| Track do tipo `Button` | `p-xs` `rounded-lg` | `p-sm` `rounded-xl` |

- **Tipos:** `Underline` / `Line` (marca de 2px em `fg-brand-primary`, desenhada por dentro) e `Button` (chip branco com `shadow-sm` num track `border-secondary` + `bg-secondary-alt`). As variantes *Button brand* / *Button primary* foram retiradas para reduzir opções.
- **Estados (Figma `_Tab button base`):** Default `text-quaternary` · Hover — empresta o aspeto de *current* (Underline/Line: texto e marca brand + badge brand; Button: chip branco) · Current — como descrito · Focus — anel de 2px sobre intervalo de 2px · Disabled — esbatido e saltado pelo teclado. O `state` por item força Hover/Focus nas previews.
- **Mobile (< 640px):** a lista passa a um `InputDropdown` com a tab atual (Figma "Input dropdown").
- **Interação:** `role="tablist/tab/tabpanel"`, roving tabindex, ←/→ (horizontal) ou ↑/↓ (vertical) com seleção a seguir o foco e wrap, Home/End, tabs `disabled` saltadas. Controlado (`value`) ou não controlado (`defaultValue`).

---

## Breadcrumbs

> Fonte: Figma KDS — Design System, frame "Breadcrumbs" (`1122:153`) e componente `_Breadcrumb button base` (Current × Type × Icon × State).

```ts
type BreadcrumbItem = { label?: string; icon?: string; ariaLabel?: string; href?: string; onClick?: () => void; state?: 'Default' | 'Hover' | 'Focused' };
type BreadcrumbsProps = { items: BreadcrumbItem[]; maxItems?: number /* 4 */ };
```

- **Estrutura:** `nav` > `ol`; crumbs com `text-sm` medium; separador `chevron_right` de 16px em `fg-senary`; gap `spacing-lg` (12px) no desktop e `spacing-md` (8px) no mobile (< 640px). O primeiro crumb pode ser só ícone (`home` do Icon set, 20px, `fg-quaternary`).
- **Estados do crumb:** Default `text-tertiary` · Hover `text-secondary` (ícone escurece um passo) · Focused anel de 2px sobre intervalo de 2px (`radius-xs`) · Current `text-brand-secondary` semibold, sem link, `aria-current="page"`.
- **Colapso:** com mais de `maxItems` crumbs ficam os primeiros `maxItems - 2`, "…" e o último (Figma: `Home › Settings › … › Team`); ativar "…" expande o caminho todo.
- **A11y:** `aria-label="Breadcrumb"`; crumbs só de ícone exigem `ariaLabel`; "…" tem o nome "Show hidden pages".

---

## Sidebar navigation

> Fonte: Figma KDS — Design System, frame "Sidebar navigation" (`1158:90768`) e os componentes `_Nav item base`, `_Nav item dropdown base`, `_Nav item button`, `_Nav featured card`, `_Application nav menu button`. O frame "Header navigation" (`1207:1678`) ainda não está implementado.

```ts
type NavSubItem = { value: string; label: string; icon?: string; badge?: ReactNode; dot?: boolean; href?: string; disabled?: boolean; state?: 'Default' | 'Hover' | 'Focus' };
type NavItem = NavSubItem & { items?: NavSubItem[] };
type SidebarNavigationProps = {
  type?: 'Simple' | 'Slim' | 'Dual-tier';
  items: NavItem[]; footerItems?: NavSubItem[];
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void;
  featuredCard?: { type?: 'Progress bar' | 'Progress circle'; title: string; description: string; progress: number; onDismiss?; onAction? };
  account?: { name: string; email?: string; avatarSrc?: string; onLogout?: () => void };
  open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void;   // drawer mobile
  breakpoint?: 'Auto' | 'Desktop' | 'Mobile'; inline?: boolean;                    // previews
};
```

| | Simple | Dual-tier | Slim |
|---|---|---|---|
| Largura | 312px | 280px · 528px com 2.ª coluna | 80px · 362px com 2.ª coluna |
| 1.ª coluna | logo, search, itens com chevron (expandem no sítio), footer, card, conta | logo, search, itens, footer, card `Progress circle`, conta | marca "K", itens só ícone (48px, gap `spacing-md`), footer, avatar |
| 2.º nível | acordeão (`pl-spacing-6xl`, sem ícone) | 2.ª coluna com os `items` do item atual (`pt-spacing-4xl`, `px-spacing-xl`) | 2.ª coluna com o título do item e a conta (nome + email) |

- **Item (`_Nav item base`):** `px-spacing-lg py-spacing-md`, `radius-sm`, gap `spacing-md`; conteúdo (dot 10px opcional · ícone 24px · label `text-md` semibold) com gap `spacing-lg`; badge e chevron (20px) à direita. Default `text-secondary` · Hover `bg-primary-hover` + `text-secondary-hover` · Current `bg-active` + `text-secondary-hover` · Current + Hover `bg-secondary-hover` (Figma `1153:90789`) · Focus anel de 2px sobre intervalo de 2px. Item só ícone (`_Nav item button`): 48px, `p-spacing-lg`, `bg-secondary-hover` em hover quando atual.
- **Escolha de item:** num pai de Dual-tier / Slim, escolher o pai seleciona o primeiro filho ativo (a 2.ª coluna tem sempre uma página atual). Um pai recolhido é *current* quando contém o filho atual.
- **Featured card:** `bg-secondary`, `radius-md`, `px-spacing-xl py-spacing-2xl`, gap `spacing-xl`; `Progress bar` (8px, `bg-quaternary` + `brand-600`) ou `Progress circle` (anel 64px, traço 6px, percentagem `text-sm` semibold); ações Dismiss (`Link gray`) e Upgrade plan (`Link color`); botão de fechar 36px em `top/right 8px`.
- **Conta:** `border-t border-secondary`, `pt-spacing-3xl`, `AvatarLabelGroup` md + botão `logout`. A foto vem de `avatarSrc` (imagem de utilizador, nunca um asset do Figma); sem ela mostram-se as iniciais.
- **Mobile (< 1024px, `lg`):** barra de 64px (logo + botão de menu 40px, `border-b`); o botão abre um drawer de 311px com a lista Simple (sem o card), ao lado de um scrim (`bg-overlay` 70% + blur 8px, como o Modal) com botão de fechar. O drawer é um `dialog` modal: bloqueia o scroll, prende o foco e fecha com Esc, scrim ou botão.
- **A11y:** `aside` com `aria-label`; `nav` para itens principais, footer e 2.ª coluna; `aria-current="page"` no atual; pais com `aria-expanded` / `aria-controls`; itens só ícone com `aria-label` e `title`.

