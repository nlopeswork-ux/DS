# Fundações — Cores

> Cobre: Neutros, Marca, Feedback (Success/Warning/Error), paleta estendida e Tokens Semânticos com suporte total a Light/Dark Mode.

---

## 1. Paleta Primitiva

### 1.1 Base

| Variável Figma | Hex | Token CSS | Tailwind |
|---|---|---|---|
| Colors/Base/white | `#ffffff` | `--color-base-white` | `white` |
| Colors/Base/black | `#000000` | `--color-base-black` | `black` |
| Colors/Base/transparent | `#ffffff00` | `--color-base-transparent` | `transparent` |

### 1.2 Gray — Neutros (Light Mode)

| Step | Hex | Token CSS | Tailwind |
|---|---|---|---|
| 25 | `#fcfcfd` | `--color-gray-25` | `gray-25` |
| 50 | `#f9fafb` | `--color-gray-50` | `gray-50` |
| 100 | `#f2f4f7` | `--color-gray-100` | `gray-100` |
| 200 | `#e4e7ec` | `--color-gray-200` | `gray-200` |
| 300 | `#d0d5dd` | `--color-gray-300` | `gray-300` |
| 400 | `#98a2b3` | `--color-gray-400` | `gray-400` |
| 500 | `#667085` | `--color-gray-500` | `gray-500` |
| 600 | `#475467` | `--color-gray-600` | `gray-600` |
| 700 | `#344054` | `--color-gray-700` | `gray-700` |
| 800 | `#182230` | `--color-gray-800` | `gray-800` |
| 900 | `#101828` | `--color-gray-900` | `gray-900` |
| 950 | `#0c111d` | `--color-gray-950` | `gray-950` |

### 1.3 Gray — Neutros (Dark Mode)

| Step | Hex | Token CSS | Tailwind |
|---|---|---|---|
| 25 | `#fafafa` | `--color-gray-dark-25` | `gray-dark-25` |
| 50 | `#f5f5f6` | `--color-gray-dark-50` | `gray-dark-50` |
| 100 | `#f0f1f1` | `--color-gray-dark-100` | `gray-dark-100` |
| 200 | `#ececed` | `--color-gray-dark-200` | `gray-dark-200` |
| 300 | `#cecfd2` | `--color-gray-dark-300` | `gray-dark-300` |
| 400 | `#94969c` | `--color-gray-dark-400` | `gray-dark-400` |
| 500 | `#85888e` | `--color-gray-dark-500` | `gray-dark-500` |
| 600 | `#61646c` | `--color-gray-dark-600` | `gray-dark-600` |
| 700 | `#333741` | `--color-gray-dark-700` | `gray-dark-700` |
| 800 | `#1f242f` | `--color-gray-dark-800` | `gray-dark-800` |
| 900 | `#161b26` | `--color-gray-dark-900` | `gray-dark-900` |
| 950 | `#0c111d` | `--color-gray-dark-950` | `gray-dark-950` |

### 1.4 Brand (Marca)

| Step | Hex | Token CSS | Tailwind |
|---|---|---|---|
| 25 | `#effdfc` | `--color-brand-25` | `brand-25` |
| 50 | `#e0faf8` | `--color-brand-50` | `brand-50` |
| 100 | `#cbf4f0` | `--color-brand-100` | `brand-100` |
| 200 | `#a1e8e1` | `--color-brand-200` | `brand-200` |
| 300 | `#73d4cb` | `--color-brand-300` | `brand-300` |
| 400 | `#4bb7ae` | `--color-brand-400` | `brand-400` |
| **500** | `#2e9a92` | `--color-brand-500` | `brand-500` |
| **600** | `#1c7e78` | `--color-brand-600` | `brand-600` |
| 700 | `#176662` | `--color-brand-700` | `brand-700` |
| 800 | `#15524f` | `--color-brand-800` | `brand-800` |
| 900 | `#114240` | `--color-brand-900` | `brand-900` |
| 950 | `#092d2c` | `--color-brand-950` | `brand-950` |

> `brand-600` (`#1c7e78`) é a cor de fill do Button Primary e do `bg-brand-solid`. `brand-500` (`#2e9a92`) é a cor de referência dos **focus rings**.

### 1.5 Error

| Step | Hex | Token CSS |
|---|---|---|
| 25 | `#fffbfa` | `--color-error-25` |
| 50 | `#fef3f2` | `--color-error-50` |
| 100 | `#fee4e2` | `--color-error-100` |
| 200 | `#fecdca` | `--color-error-200` |
| 300 | `#fda29b` | `--color-error-300` |
| 400 | `#f97066` | `--color-error-400` |
| 500 | `#f04438` | `--color-error-500` |
| 600 | `#d92d20` | `--color-error-600` |
| 700 | `#b42318` | `--color-error-700` |
| 800 | `#912018` | `--color-error-800` |
| 900 | `#7a271a` | `--color-error-900` |
| 950 | `#55160c` | `--color-error-950` |

### 1.6 Warning

| Step | Hex | Token CSS |
|---|---|---|
| 25 | `#fffcf5` | `--color-warning-25` |
| 50 | `#fffaeb` | `--color-warning-50` |
| 100 | `#fef0c7` | `--color-warning-100` |
| 200 | `#fedf89` | `--color-warning-200` |
| 300 | `#fec84b` | `--color-warning-300` |
| 400 | `#fdb022` | `--color-warning-400` |
| 500 | `#f79009` | `--color-warning-500` |
| 600 | `#dc6803` | `--color-warning-600` |
| 700 | `#b54708` | `--color-warning-700` |
| 800 | `#93370d` | `--color-warning-800` |
| 900 | `#7a2e0e` | `--color-warning-900` |
| 950 | `#4e1d09` | `--color-warning-950` |

### 1.7 Success

| Step | Hex | Token CSS |
|---|---|---|
| 25 | `#f6fef9` | `--color-success-25` |
| 50 | `#ecfdf3` | `--color-success-50` |
| 100 | `#dcfae6` | `--color-success-100` |
| 200 | `#abefc6` | `--color-success-200` |
| 300 | `#75e0a7` | `--color-success-300` |
| 400 | `#47cd89` | `--color-success-400` |
| 500 | `#17b26a` | `--color-success-500` |
| 600 | `#079455` | `--color-success-600` |
| 700 | `#067647` | `--color-success-700` |
| 800 | `#085d3a` | `--color-success-800` |
| 900 | `#074d31` | `--color-success-900` |
| 950 | `#053321` | `--color-success-950` |

### 1.8 Paleta estendida (uso em Badges/Tags multi-cor)

Cada família segue o mesmo padrão 25–950. Valores completos disponíveis nos `_Primitives` do Figma; os passos usados nos componentes (Badge) estão realçados abaixo.

| Família | 50 | 200 (border) | 500/600 | Token CSS prefix |
|---|---|---|---|---|
| Blue | `#eff8ff` | `#b2ddff` | `#2e90fa` / `#1570ef` | `--color-blue-*` |
| Blue dark | `#eff4ff` | `#b2ccff` | `#2970ff` / `#155eef` | `--color-blue-dark-*` |
| Blue light | `#f0f9ff` | `#b9e6fe` | `#0ba5ec` / `#0086c9` | `--color-blue-light-*` |
| Indigo | `#eef4ff` | `#c7d7fe` | `#6172f3` / `#444ce7` | `--color-indigo-*` |
| Violet | `#f5f3ff` | `#ddd6fe` | `#875bf7` / `#7839ee` | `--color-violet-*` |
| Purple | `#f4f3ff` | `#d9d6fe` | `#7a5af8` / `#6938ef` | `--color-purple-*` |
| Fuchsia | `#fdf4ff` | `#f6d0fe` | `#d444f1` / `#ba24d5` | `--color-fuchsia-*` |
| Pink | `#fdf2fa` | `#fcceee` | `#ee46bc` / `#dd2590` | `--color-pink-*` |
| Rose | `#fff1f3` | `#fecdd6` | `#f63d68` / `#e31b54` | `--color-rose-*` |
| Orange | `#fef6ee` | `#f9dbaf` | `#ef6820` / `#e04f16` | `--color-orange-*` |
| Orange dark | `#fff4ed` | `#ffd6ae` | `#ff4405` / `#e62e05` | `--color-orange-dark-*` |
| Yellow | `#fefbe8` | `#feee95` | `#eaaa08` / `#ca8504` | `--color-yellow-*` |
| Moss | `#f5fbee` | `#ceeab0` | `#669f2a` / `#4f7a21` | `--color-moss-*` |

---

## 2. Cores — Tokens Semânticos (Light / Dark Mode)

> Coleção Figma: **`1. Color modes`** · Modos: `Light mode` | `Dark mode`. Os tokens abaixo são a camada que **os componentes efetivamente consomem** — nunca a primitiva diretamente.

### 2.1 Text

| Token | Light | Dark | CSS |
|---|---|---|---|
| text-primary (900) | Gray 900 `#101828` | Gray-dark 50 `#f5f5f6` | `--color-text-primary` |
| text-primary_on-brand | White `#ffffff` | Gray-dark 50 | `--color-text-primary-on-brand` |
| text-secondary (700) | Gray 700 `#344054` | Gray-dark 300 `#cecfd2` | `--color-text-secondary` |
| text-secondary_hover | Gray 800 | Gray-dark 200 | `--color-text-secondary-hover` |
| text-tertiary (600) | Gray 600 `#475467` | Gray-dark 400 `#94969c` | `--color-text-tertiary` |
| text-tertiary_hover | Gray 700 | Gray-dark 300 | `--color-text-tertiary-hover` |
| text-quaternary (500) | Gray 500 `#667085` | Gray-dark 400 | `--color-text-quaternary` |
| text-white | White | White | `--color-text-white` |
| text-disabled | Gray 500 | Gray-dark 500 | `--color-text-disabled` |
| text-placeholder | Gray 500 | Gray-dark 500 | `--color-text-placeholder` |
| text-placeholder_subtle | Gray 300 | Gray-dark 700 | `--color-text-placeholder-subtle` |
| text-brand-primary (900) | Brand 900 `#114240` | Gray-dark 50 | `--color-text-brand-primary` |
| text-brand-secondary (700) | Brand 700 `#176662` | Gray-dark 300 | `--color-text-brand-secondary` |
| text-brand-tertiary (600) | Brand 600 `#1c7e78` | Gray-dark 400 | `--color-text-brand-tertiary` |
| text-error-primary (600) | Error 600 `#d92d20` | Error 400 `#f97066` | `--color-text-error` |
| text-warning-primary (600) | Warning 600 `#dc6803` | Warning 400 `#fdb022` | `--color-text-warning` |
| text-success-primary (600) | Success 600 `#079455` | Success 400 `#47cd89` | `--color-text-success` |

### 2.2 Foreground (ícones/strokes decorativos)

| Token | Light | Dark | CSS |
|---|---|---|---|
| fg-primary (900) | Gray 900 | White | `--color-fg-primary` |
| fg-secondary (700) | Gray 700 | Gray-dark 300 | `--color-fg-secondary` |
| fg-tertiary (600) | Gray 600 | Gray-dark 400 | `--color-fg-tertiary` |
| fg-quaternary (500) | Gray 500 | Gray-dark 400 | `--color-fg-quaternary` |
| fg-quinary (400) | Gray 400 | Gray-dark 500 | `--color-fg-quinary` |
| fg-senary (300) | Gray 300 | Gray-dark 600 | `--color-fg-senary` |
| fg-white | White | White | `--color-fg-white` |
| fg-disabled | Gray 400 | Gray-dark 500 | `--color-fg-disabled` |
| fg-disabled_subtle | Gray 300 | Gray-dark 600 | `--color-fg-disabled-subtle` |
| fg-brand-primary (600) | Brand 600 `#1c7e78` | Brand 500 `#2e9a92` | `--color-fg-brand-primary` |
| fg-brand-secondary (500) | Brand 500 | Brand 500 | `--color-fg-brand-secondary` |
| fg-error-primary | Error 600 | Error 500 | `--color-fg-error` |
| fg-warning-primary | Warning 600 | Warning 500 | `--color-fg-warning` |
| fg-success-primary | Success 600 | Success 500 | `--color-fg-success` |

### 2.3 Background

| Token | Light | Dark | CSS |
|---|---|---|---|
| bg-primary | White | Gray-dark 950 `#0c111d` | `--color-bg-primary` |
| bg-primary_alt | White | `bg-secondary` | `--color-bg-primary-alt` |
| bg-primary_hover | Gray 50 | Gray-dark 800 | `--color-bg-primary-hover` |
| bg-primary-solid | Gray 950 | `bg-secondary` | `--color-bg-primary-solid` |
| bg-secondary | Gray 50 `#f9fafb` | Gray-dark 900 `#161b26` | `--color-bg-secondary` |
| bg-secondary_alt | Gray 50 | `bg-primary` | `--color-bg-secondary-alt` |
| bg-secondary_hover | Gray 100 | Gray-dark 800 | `--color-bg-secondary-hover` |
| bg-secondary_subtle | Gray 25 | Gray-dark 900 | `--color-bg-secondary-subtle` |
| bg-secondary-solid | Gray 600 | Gray-dark 600 | `--color-bg-secondary-solid` |
| bg-tertiary | Gray 100 `#f2f4f7` | Gray-dark 800 `#1f242f` | `--color-bg-tertiary` |
| bg-quaternary | Gray 200 | Gray-dark 700 | `--color-bg-quaternary` |
| bg-active | Gray 50 | Gray-dark 800 | `--color-bg-active` |
| bg-disabled | Gray 100 | Gray-dark 800 | `--color-bg-disabled` |
| bg-disabled_subtle | Gray 50 | Gray-dark 900 | `--color-bg-disabled-subtle` |
| bg-overlay | Gray 950 | Gray-dark 800 | `--color-bg-overlay` |
| bg-brand-primary | Brand 50 `#e0faf8` | Brand 500 `#2e9a92` | `--color-bg-brand-primary` |
| bg-brand-secondary | Brand 100 | Brand 600 | `--color-bg-brand-secondary` |
| bg-brand-solid | Brand 600 `#1c7e78` | Brand 600 | `--color-bg-brand-solid` |
| bg-brand-solid_hover | Brand 700 | Brand 500 | `--color-bg-brand-solid-hover` |
| bg-brand-section | Brand 800 | `bg-secondary` | `--color-bg-brand-section` |
| bg-brand-section_subtle | Brand 700 | `bg-primary` | `--color-bg-brand-section-subtle` |
| bg-error-primary | Error 50 | Error 500 | `--color-bg-error-primary` |
| bg-error-secondary | Error 100 | Error 600 | `--color-bg-error-secondary` |
| bg-error-solid | Error 600 | Error 600 | `--color-bg-error-solid` |
| bg-warning-primary | Warning 50 | Warning 500 | `--color-bg-warning-primary` |
| bg-warning-secondary | Warning 100 | Warning 600 | `--color-bg-warning-secondary` |
| bg-warning-solid | Warning 600 | Warning 600 | `--color-bg-warning-solid` |
| bg-success-primary | Success 50 | Success 500 | `--color-bg-success-primary` |
| bg-success-secondary | Success 100 | Success 600 | `--color-bg-success-secondary` |
| bg-success-solid | Success 600 | Success 600 | `--color-bg-success-solid` |

### 2.4 Border

| Token | Light | Dark | CSS |
|---|---|---|---|
| border-primary | Gray 300 `#d0d5dd` | Gray-dark 700 `#333741` | `--color-border-primary` |
| border-secondary | Gray 200 `#e4e7ec` | Gray-dark 800 `#1f242f` | `--color-border-secondary` |
| border-tertiary | Gray 100 | Gray-dark 800 | `--color-border-tertiary` |
| border-disabled | Gray 300 | Gray-dark 700 | `--color-border-disabled` |
| border-disabled_subtle | Gray 200 | Gray-dark 800 | `--color-border-disabled-subtle` |
| border-brand | Brand 500 `#2e9a92` | Brand 400 `#4bb7ae` | `--color-border-brand` |
| border-brand_alt | Brand 600 | Gray-dark 700 | `--color-border-brand-alt` |
| border-error | Error 500 | Error 400 | `--color-border-error` |
| border-error_subtle | Error 300 | Error 400 | `--color-border-error-subtle` |

### 2.5 Balady (Custom Brand Overrides)

| Token | Light | Dark | CSS |
|---|---|---|---|
| Colors/Balady/accent | `#046f6d` | `#ffffff` | `--color-balady-accent` |
| Colors/Balady/foreground | `#080808` | `#ffffff` | `--color-balady-foreground` |

---

## 3. Cores por categoria de uso (resumo funcional)

### 3.1 Neutros
Escala `Gray` (Light) / `Gray dark` (Dark) — base de toda a hierarquia tipográfica, backgrounds e bordas neutras (25 a 950).

### 3.2 Marca (Brand)
Escala `Brand` (teal `#2e9a92` / `#1c7e78`) — usada em: fill do Button Primary (`button-primary-bg` ≈ `#1c7e78`), `bg-brand-solid`, `border-brand`, `focus-ring` (Brand 500), checkboxes/toggles ativos, asterisco de campo obrigatório (`text-brand-tertiary`).

### 3.3 Feedback
| Categoria | Cor base | Uso típico |
|---|---|---|
| **Success** | Success 500/600 (`#17b26a` / `#079455`) | Badges de sucesso, `bg-success-solid`, `fg-success-primary`, indicador online do Avatar |
| **Warning** | Warning 500/600 (`#f79009` / `#dc6803`) | Badges de aviso, `bg-warning-solid` |
| **Error** | Error 500/600 (`#f04438` / `#d92d20`) | Button destructive (`button-primary-error-bg` ≈ `#da2d20`), estados de validação (`border-error_subtle`), badges de erro |

### 3.4 Estados de Interação

Tabela consolidada de como as cores mudam por estado interativo em todo o sistema:

| Estado | Padrão de transformação | Exemplos de tokens |
|---|---|---|
| **Default** | Cor base semântica | `bg-primary`, `border-primary`, `text-secondary` |
| **Hover** | Um passo mais escuro/saturado na mesma família, ou fill sutil adicionado | `bg-primary_hover`, `bg-brand-solid_hover`, `text-secondary_hover` |
| **Focused** | Adição de **focus ring** (não troca a cor base) — ver `shadows-elevation.md §3` | `focus-ring` (Brand 500 + halo branco) |
| **Disabled** | Redução de contraste/opacidade, paleta neutra fixa independente da cor semântica original | `bg-disabled_subtle`, `border-disabled`, `text-disabled`, `fg-disabled_subtle` |
| **Current/Active/Selected** | Background elevado sutil, mantendo texto e borda padrão | `bg-active` |

---

## 4. Modos suportados (Light / Dark)

As variáveis de cor possuem **dois modos** (Light / Dark) na coleção `1. Color modes`, com alias distintos por modo — por exemplo:

- `avatar-contrast-border`: `#000000 8%` (Light) → `#FFFFFF 12%` (Dark)
- `bg-primary`: `White` (Light) → `Gray-dark 950 #0c111d` (Dark)
- `text-primary`: `Gray 900 #101828` (Light) → `Gray-dark 50 #f5f5f6` (Dark)

**Regra de implementação:** nenhum componente deve referenciar hex/primitiva diretamente — todo binding de cor é feito via token semântico, garantindo troca de tema automática ao alternar o modo da coleção `1. Color modes`.
