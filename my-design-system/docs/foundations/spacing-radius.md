# Fundações — Espaçamentos e Border Radius

> Cobre a escala semântica completa de `spacing-xxs` (2px) a `spacing-9xl` (96px), incluindo a escala primitiva de suporte e o sistema de Border Radius.

---

## 1. Espaçamento

### 1.1 Escala Primitiva (Coleção `_Primitives`)

| Variável Figma | px | rem | Token CSS | Tailwind |
|---|---|---|---|---|
| Spacing/0 | 0 | 0 | `--spacing-0` | `0` |
| Spacing/0.5 | 2 | 0.125rem | `--spacing-0-5` | `0.5` |
| Spacing/1 | 4 | 0.25rem | `--spacing-1` | `1` |
| Spacing/1.5 | 6 | 0.375rem | `--spacing-1-5` | `1.5` |
| Spacing/2 | 8 | 0.5rem | `--spacing-2` | `2` |
| Spacing/3 | 12 | 0.75rem | `--spacing-3` | `3` |
| Spacing/4 | 16 | 1rem | `--spacing-4` | `4` |
| Spacing/5 | 20 | 1.25rem | `--spacing-5` | `5` |
| Spacing/6 | 24 | 1.5rem | `--spacing-6` | `6` |
| Spacing/8 | 32 | 2rem | `--spacing-8` | `8` |
| Spacing/10 | 40 | 2.5rem | `--spacing-10` | `10` |
| Spacing/12 | 48 | 3rem | `--spacing-12` | `12` |
| Spacing/16 | 64 | 4rem | `--spacing-16` | `16` |
| Spacing/20 | 80 | 5rem | `--spacing-20` | `20` |
| Spacing/24 | 96 | 6rem | `--spacing-24` | `24` |
| Spacing/32 | 128 | 8rem | `--spacing-32` | `32` |
| Spacing/40 | 160 | 10rem | `--spacing-40` | `40` |
| Spacing/48 | 192 | 12rem | `--spacing-48` | `48` |
| Spacing/56 | 224 | 14rem | `--spacing-56` | `56` |
| Spacing/64 | 256 | 16rem | `--spacing-64` | `64` |
| Spacing/80 | 320 | 20rem | `--spacing-80` | `80` |
| Spacing/96 | 384 | 24rem | `--spacing-96` | `96` |
| Spacing/120 | 480 | 30rem | `--spacing-120` | `[480px]` |
| Spacing/140 | 560 | 35rem | `--spacing-140` | `[560px]` |
| Spacing/160 | 640 | 40rem | `--spacing-160` | `[640px]` |
| Spacing/180 | 720 | 45rem | `--spacing-180` | `[720px]` |
| Spacing/192 | 768 | 48rem | `--spacing-192` | `[768px]` |
| Spacing/256 | 1024 | 64rem | `--spacing-256` | `[1024px]` |
| Spacing/320 | 1280 | 80rem | `--spacing-320` | `[1280px]` |
| Spacing/360 | 1440 | 90rem | `--spacing-360` | `[1440px]` |
| Spacing/400 | 1600 | 100rem | `--spacing-400` | `[1600px]` |
| Spacing/480 | 1920 | 120rem | `--spacing-480` | `[1920px]` |

### 1.2 Tokens Semânticos de Spacing (Coleção `3. Spacing`)

> **Intervalo de destaque solicitado:** `spacing-xxs` (2px) → `spacing-9xl` (96px).

| Token Figma | Referência primitiva | px | Token CSS | Tailwind |
|---|---|---|---|---|
| spacing-none | Spacing/0 | 0 | `--spacing-none` | `spacing-none` |
| **spacing-xxs** | Spacing/0.5 | **2** | `--spacing-xxs` | `spacing-xxs` |
| spacing-xs | Spacing/1 | 4 | `--spacing-xs` | `spacing-xs` |
| spacing-sm | Spacing/1.5 | 6 | `--spacing-sm` | `spacing-sm` |
| spacing-md | Spacing/2 | 8 | `--spacing-md` | `spacing-md` |
| spacing-lg | Spacing/3 | 12 | `--spacing-lg` | `spacing-lg` |
| spacing-xl | Spacing/4 | 16 | `--spacing-xl` | `spacing-xl` |
| spacing-2xl | Spacing/5 | 20 | `--spacing-2xl` | `spacing-2xl` |
| spacing-3xl | Spacing/6 | 24 | `--spacing-3xl` | `spacing-3xl` |
| spacing-4xl | Spacing/8 | 32 | `--spacing-4xl` | `spacing-4xl` |
| spacing-5xl | Spacing/10 | 40 | `--spacing-5xl` | `spacing-5xl` |
| spacing-6xl | Spacing/12 | 48 | `--spacing-6xl` | `spacing-6xl` |
| spacing-7xl | Spacing/16 | 64 | `--spacing-7xl` | `spacing-7xl` |
| spacing-8xl | Spacing/20 | 80 | `--spacing-8xl` | `spacing-8xl` |
| **spacing-9xl** | Spacing/24 | **96** | `--spacing-9xl` | `spacing-9xl` |
| spacing-10xl | Spacing/32 | 128 | `--spacing-10xl` | `spacing-10xl` |
| spacing-11xl | Spacing/40 | 160 | `--spacing-11xl` | `spacing-11xl` |

### 1.3 Aplicação por caso de uso (padrão do sistema)

| Uso | Token típico | px |
|---|---|---|
| Gap ícone ↔ texto (compacto) | `spacing-xxs` / `spacing-xs` | 2 / 4 |
| Gap label ↔ asterisco | `spacing-xxs` | 2 |
| Gap label ↔ input, input ↔ hint | `spacing-sm` | 6 |
| Padding interno de badge/tag (sm) | `spacing-md` | 8 |
| Gap entre ícone e texto (padrão) | `spacing-md` | 8 |
| Item spacing de listas/dropdowns | `spacing-lg` | 12 |
| Padding horizontal de botão (padrão) | `spacing-xl` | 16 |
| Padding de tooltip / header de dropdown | `spacing-lg` a `spacing-xl` | 12–16 |
| Padding interno de Checkbox group item | `spacing-xl` | 16 |
| Container principal (cards/painéis) | `spacing-xl`+ | 16+ |

---

## 2. Border Radius (Coleção `2. Radius`)

| Token Figma | px | rem | Token CSS | Tailwind |
|---|---|---|---|---|
| radius-none | 0 | 0 | `--radius-none` | `rounded-none` |
| radius-xxs | 2 | 0.125rem | `--radius-xxs` | `rounded-[2px]` |
| radius-xs | 4 | 0.25rem | `--radius-xs` | `rounded-xs` |
| radius-sm | 6 | 0.375rem | `--radius-sm` | `rounded-sm` |
| radius-md | 8 | 0.5rem | `--radius-md` | `rounded-md` |
| radius-lg | 10 | 0.625rem | `--radius-lg` | `rounded-lg` |
| radius-xl | 12 | 0.75rem | `--radius-xl` | `rounded-xl` |
| radius-2xl | 16 | 1rem | `--radius-2xl` | `rounded-2xl` |
| radius-3xl | 20 | 1.25rem | `--radius-3xl` | `rounded-3xl` |
| radius-4xl | 24 | 1.5rem | `--radius-4xl` | `rounded-[24px]` |
| radius-full | 9999 | — | `--radius-full` | `rounded-full` |

### 2.1 Aplicação por componente

| Componente | Radius |
|---|---|
| Button, Button destructive, Social button, Input Field, Dropdown menu, Tooltip | `radius-md` (8px) |
| Badge (Badge color / Badge modern) | 6px (`radius-sm`) |
| Badge (Pill color / Pill outline) | `radius-full` (pill) |
| Tag (container) | 6px (`radius-sm`) |
| _Tag close X (hover) | 3px |
| Checkbox `sm` | `radius-xs` (4px) |
| Checkbox `md` | `radius-sm` (6px) |
| Radio (todos os tamanhos) | `radius-full` |
| Checkbox group item (container) | `radius-xl` (12px) |
| Checkbox group item (featured icon) | `radius-sm` (6px) |
| Checkbox group item (checkbox base) | `radius-xs` (4px) |
| Toggle (track e thumb) | `radius-full` |
| Avatar | `radius-full` (circular) |
| Progress bar (track) | `radius-full` (pill) |
| Progress bar (container) | `spacing-md` → 8px |
| Slider (handle) | `radius-full` |
| Slider (wrapper do handle) | 12px |
| Mobile app store badge | 5px (fixo, fora da escala) |
| Dropdown trigger | `radius-xs` (4px) |
