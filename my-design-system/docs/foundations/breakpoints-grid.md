# Fundações — Breakpoints, Grid e Transições

> Cobre a estrutura responsiva (grids, larguras, breakpoints) e os tempos de animação usados no sistema.

---

## 1. Larguras (Coleção `4. Widths`)

| Token Figma | Referência | px | Token CSS | Tailwind |
|---|---|---|---|---|
| width-xxs | Spacing/80 | 320 | `--width-xxs` | `max-w-xs` |
| width-xs | Spacing/96 | 384 | `--width-xs` | `max-w-sm` |
| width-sm | Spacing/120 | 480 | `--width-sm` | `max-w-md` |
| width-md | Spacing/140 | 560 | `--width-md` | `max-w-lg` |
| width-lg | Spacing/160 | 640 | `--width-lg` | `max-w-xl` |
| width-xl | Spacing/192 | 768 | `--width-xl` | `max-w-2xl` |
| width-2xl | Spacing/256 | 1024 | `--width-2xl` | `max-w-4xl` |
| width-3xl | Spacing/320 | 1280 | `--width-3xl` | `max-w-6xl` |
| width-4xl | Spacing/360 | 1440 | `--width-4xl` | `max-w-[1440px]` |
| width-5xl | Spacing/400 | 1600 | `--width-5xl` | `max-w-[1600px]` |
| width-6xl | Spacing/480 | 1920 | `--width-6xl` | `max-w-[1920px]` |
| paragraph-max-width | Spacing/180 | 720 | `--width-paragraph` | `max-w-prose` |

## 2. Containers (Coleção `5. Containers`)

| Token Figma | Referência | px | Token CSS | Tailwind |
|---|---|---|---|---|
| container-padding-mobile | Spacing/4 | 16 | `--container-padding-mobile` | `px-4` |
| container-padding-desktop | Spacing/8 | 32 | `--container-padding-desktop` | `px-8` |
| container-max-width-desktop | Spacing/320 | 1280 | `--container-max-width` | `max-w-6xl` |

## 3. Grid Styles

| Estilo Figma | Colunas | Gutter | Margem | Largura efetiva | Token CSS |
|---|---|---|---|---|---|
| Grid desktop | 12 | 32px | 112px (stretch) | ~1216px | `--grid-desktop` |
| Grid tablet | 6 | 32px | 32px (stretch) | ~704px | `--grid-tablet` |
| Grid mobile | 4 | 16px | 16px (stretch) | ~343px | `--grid-mobile` |
| 12 columns (auto) | 12 | 32px | 0 (stretch) | 100% | `--grid-12-col` |
| 6 columns (auto) | 6 | 32px | 0 (stretch) | 100% | `--grid-6-col` |
| 5 columns (auto) | 5 | 32px | 0 (stretch) | 100% | `--grid-5-col` |
| 3 columns (auto) | 3 | 32px | 0 (stretch) | 100% | `--grid-3-col` |
| 2 columns (auto) | 2 | 32px | 0 (stretch) | 100% | `--grid-2-col` |

> Os grids `desktop` e `tablet` incluem colunas auxiliares de margem (2 colunas de 32px centralizadas) e uma *row* de altura fixa (96px desktop / 56px mobile) reservada para header/nav.

## 4. Breakpoints *(derivado da grid + larguras explícitas)*

> A especificação de origem não publica uma tabela de breakpoints isolada — os valores abaixo são **derivados diretamente** das larguras de grid (`Grid mobile/tablet/desktop`) e das larguras explícitas já usadas em componentes (ex.: `Checkbox group` breakpoint Desktop 768px / Mobile 343px). Nomenclatura alinhada com a escala `width-*` da fundação.

| Breakpoint | Largura mínima | Grid associada | Largura de conteúdo | Padding lateral |
|---|---|---|---|---|
| `mobile` | 0px | Grid mobile (4 col) | 343px | `container-padding-mobile` (16px) |
| `tablet` | 768px *(width-xl)* | Grid tablet (6 col) | 704px | `container-padding-desktop` (32px) |
| `desktop` | 1280px *(width-3xl)* | Grid desktop (12 col) | 1216px | `container-padding-desktop` (32px) |
| `wide` *(inferido)* | 1440px *(width-4xl)* | Grid desktop (12 col, max-width fixo) | até 1920px *(width-6xl)* | `container-padding-desktop` (32px) |

Uso documentado explicitamente no sistema:

| Componente | Breakpoint | Largura |
|---|---|---|
| Checkbox group | Desktop | 768px |
| Checkbox group | Mobile | 343px |

## 5. Transições / Tempo de Animação

> A especificação de origem define explicitamente **apenas uma** transição (Badge group hover). Os demais valores abaixo são **propostos por inferência**, seguindo a mesma curva/duração de referência, para garantir consistência entre componentes que hoje não têm transição documentada.

### 5.1 Transição documentada explicitamente

| Componente | Transição | Trigger |
|---|---|---|
| Badge group | `dissolve, 200ms, linear` | `ON_HOVER` (Default → Hover) |

### 5.2 Escala de duração proposta *(inferido)*

| Token (sugerido) | Duração | Easing | Uso recomendado |
|---|---|---|---|
| `--duration-instant` | 0ms | — | Mudanças de estado sem transição (ex.: Disabled) |
| `--duration-fast` | 100ms | `linear` | Hover de ícones pequenos (Close X, Help icon) |
| `--duration-base` | **200ms** | `linear` | Hover geral (Badge group, Button, Tag) — alinhado ao valor documentado |
| `--duration-moderate` | 300ms | `ease-in-out` | Abertura/fecho de Dropdown, Menu |
| `--duration-slow` | 400ms | `ease-in-out` | Tooltip fade-in/out, Modal |

### 5.3 Propriedades tipicamente animadas

| Propriedade | Componentes |
|---|---|
| `background-color` | Button, Badge group, Dropdown list item, Checkbox group item |
| `border-color` | Input Field (focus), Checkbox group item (selected) |
| `box-shadow` (focus ring) | Button, Input, Checkbox, Toggle, Slider handle |
| `transform: translateX` | Toggle (thumb) |
| `opacity` | Tooltip, overlays |
| `width` (fill) | Progress bar / Progress circle (não documentado como animado na spec — recomenda-se `--duration-moderate` caso implementado) |

**Regra geral:** manter todas as transições de estado de hover/focus em `200ms linear` como padrão-base do sistema, reservando curvas `ease-in-out` mais longas apenas para elementos que entram/saem do layout (dropdowns, modais, tooltips).
