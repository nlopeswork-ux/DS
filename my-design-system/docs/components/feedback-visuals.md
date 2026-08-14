# Componentes — Feedback & Visuals

> Cobre: Avatar, `_Avatar add button`, Tooltip, Help icon, Progress Bar, Progress Circle, Slider.

---

## 1. Avatar — Especificação do Design System

### 1.1 Componentes

| Componente | Tipo | Descrição |
|---|---|---|
| Avatar | Component Set | Avatar principal — foto, placeholder (ícone) ou iniciais |
| `_Status indicator` | Component Set (interno) | Indicador de status online/offline |
| Avatar label group | Component Set | Avatar + nome + texto de apoio |
| `_Avatar image` | Component Set (interno) | Imagem de perfil com crop quadrado ou retrato |
| `_Avatar company` | Component Set (interno) | Ícone de empresa sobreposto |
| `_Avatar add button` | Component Set (interno) | Botão circular "+" para adicionar utilizador |
| Verified avatar | Component Set | Foto de perfil com selo de verificação |
| Avatar group | Component Set | Grupo empilhado de avatares |
| Verified badge | Component Set | Selo de verificação |

### 1.2 Props (TypeScript)

```ts
/* ── Avatar ── */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarStatusIcon = 'False' | 'Online indicator' | 'Company' | 'Verified';

interface AvatarProps {
  size: AvatarSize;                // default: 'xs'
  placeholder: boolean;            // default: false — exibe ícone genérico
  text: boolean;                   // default: false — exibe iniciais
  statusIcon: AvatarStatusIcon;    // default: 'False'
  contrastBorder: boolean;         // default: true — borda sutil anti-merge
}
```

### 1.3 Escala de Tamanhos (Avatar principal)

| Size | Dimensão | Ícone interno | Font Size (iniciais) | Indicador Online |
|---|---|---|---|---|
| xs | 24×24 | 16×16 | 12 | 6×6 |
| sm | 32×32 | 20×20 | 14 | 8×8 |
| md | 40×40 | 24×24 | 16 | 10×10 |
| lg | 48×48 | 28×28 | 18 | 12×12 |
| xl | 56×56 | 32×32 | 20 | 14×14 |
| 2xl | 64×64 | 32×32 | 24 | 16×16 |

### 1.4 Design Tokens

#### Cores (variáveis)

| Token | Variável | Valor Light | Uso |
|---|---|---|---|
| Background | `avatar-bg` | `#F2F4F7` | Fundo do placeholder e iniciais |
| Contrast border | `avatar-contrast-border` | `#000000 / 8%` | Borda anti-merge sobre fotos |
| Ícone placeholder | `fg-quaternary (500)` | `#667085` | Stroke do ícone de utilizador |
| Iniciais (texto) | `fg-quaternary (500)` | `#667085` | Cor das letras |
| Online (ativo) | `fg-success-secondary` | `#17B26A` | Fill do indicador online |
| Offline | `fg-disabled_subtle` | `#D0D5DD` | Fill do indicador offline |
| Indicator border | `bg-primary` | `#FFFFFF` | Stroke branco ao redor do indicador |
| Label — nome | `text-secondary (700)` | `#344054` | Texto primário no label group |
| Label — apoio | `text-tertiary (600)` | `#475467` | Texto de apoio no label group |

#### Tipografia

| Token | Variável | Valor |
|---|---|---|
| Font family | `font-family-body` | Inter |
| Iniciais weight | `font-weight/semibold` | Semi Bold |
| Label nome size | `font-size/text-sm` | 14 |
| Label nome line-height | `line-height/text-sm` | 20 |
| Label apoio weight | `font-weight/regular` | Regular |

#### Espaçamento e Raio

| Token | Variável | Valor |
|---|---|---|
| Border radius | `radius-full` | 9999 (circular) |
| Contrast border weight | — | 0.5 (xs–sm) / 0.75 (md–2xl) |
| Label group gap | — | 12 (horizontal) |
| Avatar group gap | — | 8 (horizontal, todos os tamanhos) |
| Add button padding | `spacing-xs` | (alias interno) |

### 1.5 Estados Visuais (`_Avatar add button`)

| Estado | Fill | Stroke | Ícone | Efeitos |
|---|---|---|---|---|
| Default | `#FFFFFF` | `#D0D5DD` / 1px | `#98A2B3` | — |
| Hover | `#F9FAFB` | `#D0D5DD` / 1px | `#667085` (mais escuro) | Tooltip aparece (bg `#0C111D`, shadow lg) |
| Focus | `#FFFFFF` | `#D0D5DD` / 1px | `#98A2B3` | Focus ring: `0 0 0 4px rgba(46,154,146,1)` + `0 0 0 2px #FFF` |
| Disabled | `#F9FAFB` | `#D0D5DD` / 1px | `#D0D5DD` (esmaecido) | — |

### 1.6 Modos Suportados

As variáveis de cor possuem dois modos (Light / Dark), com valores alias distintos por modo — por exemplo, `avatar-contrast-border` alterna de `#000 / 8%` (light) para `#FFF / 12%` (dark).

---

## 2. Tooltip

### 2.1 Props (TypeScript)

```ts
interface TooltipProps {
  /** Conteúdo textual principal */
  text: string;                       // default: "This is a tooltip"
  /** Exibe texto de apoio abaixo do título */
  supportingText: boolean;            // "True" | "False" — default: false
  /** Posição e visibilidade da seta indicadora */
  arrow:
    | "None"
    | "Top" | "Bottom" | "Left" | "Right"; // posições (inferido a partir do padrão do sistema)
}
```

### 2.2 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Background | `Colors/Background/bg-primary-solid` | `#0C111D` (Light) · alias `bg-secondary` (Dark) |
| Texto — título | `Colors/Text/text-white` | `#FFFFFF` (ambos os modos) |
| Texto — suporte | `Component colors/Components/Tooltips/tooltip-supporting-text` | Gray/300 por modo |
| Border-radius | `radius-md` | 8px |
| Padding (com suporte) | `spacing-lg` (todos os lados) | 12px |
| Padding (sem suporte) | `spacing-md` (top/bottom) · `spacing-lg` (left/right) | 8px / 12px |
| Gap título ↔ suporte | `spacing-xs` | 4px |
| Sombra — camada 1 | `shadow-lg_01` | y:12 blur:16 · `rgba(16,24,40, 0.08)` |
| Sombra — camada 2 | `shadow-lg_02` | y:4 blur:6 · `rgba(16,24,40, 0.03)` |

#### Tipografia

| Elemento | Token / Valor |
|---|---|
| Título | font-family-body (Inter) · Font weight/semibold · text-xs (12px) · line-height 18px |
| Texto de suporte | font-family-body (Inter) · Font weight/medium · text-xs (12px) · line-height 18px |

### 2.3 Estados Visuais

Este componente **não possui estados interativos próprios** (hover, focus, disabled). É um elemento de sobreposição cuja visibilidade é controlada pelo componente pai (ex.: Help icon). A prop `Arrow` controla a posição da seta, não um estado.

---

## 3. Help icon

### 3.1 Props (TypeScript)

```ts
interface HelpIconProps {
  /** Exibe/oculta o cursor de mouse decorativo */
  cursor: boolean;                    // default: true
  /** Tooltip está visível (estado aberto/fechado) */
  open: boolean;                      // "True" | "False" — default: false
  /** Exibe texto de apoio no tooltip */
  supportingText: boolean;            // "True" | "False" — default: false
}
```

### 3.2 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Ícone — default (fechado) | `Colors/Foreground/fg-quinary (400)` | `#98A2B3` |
| Ícone — hover (aberto) | `Colors/Foreground/fg-quinary_hover` | `#667085` |
| Cursor — preenchimento | `Colors/Base/white` | `#FFFFFF` |
| Cursor — contorno | `Colors/Base/black` | `#000000` |

> Quando `open=true`, o componente renderiza internamente uma instância do `Tooltip` (mesmos tokens listados na secção anterior).

### 3.3 Dimensões

| Elemento | Tamanho |
|---|---|
| Ícone (help-circle) | 16 × 16 px |
| Vetor interno do ícone | 13 × 13 px |
| Cursor decorativo | 20 × 20 px |

### 3.4 Estados Visuais

| Estado | `open` | Cor do ícone | Tooltip | Cursor |
|---|---|---|---|---|
| Default (closed) | false | `fg-quinary (400)` · `#98A2B3` | Oculto | Controlado por `cursor` |
| Hover / Active (open) | true | `fg-quinary_hover` · `#667085` | Visível (posição via tooltip) | Controlado por `cursor` |

Não há variantes explícitas de `focus` ou `disabled` neste Component Set.

---

## 4. Progress Bar

### 4.1 Props (TypeScript)

```ts
type ProgressBarProps = {
  /** Valor de progresso em incrementos de 10% */
  progress: '0%' | '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%';
  /** Posição do label de porcentagem */
  label: 'False' | 'Right' | 'Bottom' | 'Top floating' | 'Bottom floating';
};
```

**Total de variantes:** 55 (11 progress × 5 label).

### 4.2 Estrutura de Layers

| Layer | Tipo | Descrição |
|---|---|---|
| Progress bar | Frame | Container do track + fill |
| ├─ Background | Rectangle | Track de fundo (largura total) |
| ├─ Progress | Rectangle | Barra de preenchimento (largura proporcional ao %) |
| Percentage | Text | Label exibindo o valor (visível quando `label ≠ False`) |

### 4.3 Tokens de Design

| Propriedade | Token / Variável |
|---|---|
| Track fill | `Colors/Background/bg-quaternary` |
| Bar fill | `Colors/Foreground/fg-brand-primary (600)` |
| Label text color | `Colors/Text/text-secondary (700)` |
| Label font family | `Font family/font-family-body` |
| Label font size | `Font size/text-sm` (14px) |
| Label font weight | `Font weight/medium` |
| Label line height | `Line height/text-sm` |
| Track border-radius | `radius-full` (9999px — pill) |
| Container border-radius | `spacing-md` (8px) |

### 4.4 Dimensões Fixas

| Propriedade | Valor |
|---|---|
| Largura padrão do componente | 320px |
| Altura da barra (track) | 8px |
| Espaçamento label→barra (label Right) | 12px |
| Espaçamento label→barra (label Bottom) | 8px (empilhado vertical) |

### 4.5 Estados Visuais

Componente de exibição de dados (não interativo). Não possui estados hover, focus ou disabled. O estado visual é controlado exclusivamente pela prop `progress`.

---

## 5. Progress Circle

### 5.1 Props (TypeScript)

```ts
type ProgressCircleProps = {
  /** Tamanho do indicador circular */
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  /** Formato do anel */
  shape: 'Circle' | 'Half circle';
  /** Exibir label descritivo abaixo do número */
  label: 'True' | 'False';
};
```

**Total de variantes:** 20 (5 sizes × 2 shapes × 2 label).

### 5.2 Estrutura de Layers

| Layer | Tipo | Descrição |
|---|---|---|
| Ring | Frame | Container do anel |
| ├─ Background | Ellipse | Anel de fundo (track completo) |
| ├─ Line | Ellipse | Arco de progresso (preenchimento) |
| Number | Text | Valor numérico central (ex.: "40%") |
| Label | Text | Texto descritivo (ex.: "Active users") — visível quando `label = True` |

### 5.3 Tokens de Design

| Propriedade | Token / Variável |
|---|---|
| Track stroke | `Colors/Background/bg-quaternary` |
| Arc stroke | `Colors/Foreground/fg-brand-primary (600)` |
| Number text color | `Colors/Text/text-primary (900)` |
| Number font family | `Font family/font-family-display` |
| Number font weight | `Font weight/semibold` |
| Number font size | `Font size/display-md` (varia por size) |
| Number line height | `Line height/display-md` |
| Label text color | `Colors/Text/text-tertiary (600)` |
| Label font family | `Font family/font-family-body` |
| Label font size | `Font size/text-sm` |
| Label font weight | `Font weight/medium` |

### 5.4 Mapa de Tamanhos

| Size | Componente | Anel (Ring) | Stroke weight | Number fontSize | Label fontSize |
|---|---|---|---|---|---|
| xxs | 64 × 64 | 64 × 64 | 6 | — | — |
| xs | 160 × 160 | 144 × 144 | 16 | 24px | 12px |
| sm | 200 × 200 | 180 × 180 | 20 | 30px | 12px |
| md | 240 × 240 | 216 × 216 | 24 | 36px | 14px |
| lg | 280 × 280 | 252 × 252 | 28 | 48px | 14px |

> Na variante `Half circle`, a altura do componente é aproximadamente metade + margem (ex.: `md` = 240 × 132).

### 5.5 Estados Visuais

Assim como o Progress Bar, este é um componente de exibição de dados. Não possui estados hover, focus ou disabled. O progresso é controlado pelo valor exibido em `Number`.

---

## 6. Slider

### 6.1 Props (TypeScript)

```ts
// ---- Slider ----
type SliderProps = {
  /** Exibição do rótulo de valor */
  label: 'False' | 'Bottom' | 'Top floating';
  /** Posição do controlo direito na trilha */
  rightControl: '25%' | '50%' | '75%' | '100%';
  /** Posição do controlo esquerdo na trilha */
  leftControl: '0%' | '25%' | '50%' | '75%';
};
```

> Nota: `leftControl` deve ser sempre `< rightControl` (slider de range). As 30 variantes existentes cobrem todas as combinações válidas.

### 6.2 Tokens de Design

#### Cores

| Elemento | Token / Variável | Valor fallback | Coleção |
|---|---|---|---|
| Trilha (background) | `Colors/Background/bg-quaternary` | `#E4E7EC` | 1. Color modes |
| Trilha preenchida | `Colors/Foreground/fg-brand-primary (600)` | `#1C7E78` | 1. Color modes |
| Handle — fill | `Component colors/Components/Sliders/slider-handle-bg` | `#FFFFFF` | 1. Color modes |
| Handle — border | `Component colors/Components/Sliders/slider-handle-border` | `#1C7E78` | 1. Color modes |
| Handle — outer stroke | `Colors/Background/bg-brand-solid` | `#1C7E78` | 1. Color modes |
| Texto do label | `Colors/Text/text-primary (900)` | `#101828` | 1. Color modes |

#### Sombras (Handle)

| Token | Valor |
|---|---|
| `Colors/Effects/Shadows/shadow-md_01` | `0 2px 4px -2px rgba(16,24,40, 0.06)` |
| `Colors/Effects/Shadows/shadow-md_02` | `0 4px 8px -2px rgba(16,24,40, 0.10)` |

#### Espaçamento

| Token | Coleção | Uso |
|---|---|---|
| `spacing-lg` | 3. Spacing | Border-radius do wrapper do handle |

#### Border-radius

| Token | Coleção | Uso |
|---|---|---|
| `radius-full` | 2. Radius | Handle circular (9999px) |
| — | — | Trilha (background e progress): 9999px |
| — | — | Wrapper do handle: 12px |

#### Tipografia (label)

| Token | Coleção | Uso |
|---|---|---|
| `Font family/font-family-body` | 6. Typography | Família tipográfica |
| `Font weight/medium` | 6. Typography | Peso da fonte |
| `Font size/text-md` | 6. Typography | Tamanho do texto |
| `Line height/text-md` | 6. Typography | Altura de linha |

### 6.3 Dimensões fixas

| Elemento | Largura | Altura |
|---|---|---|
| Handle | 24px | 24px |
| Trilha (track) | 100% (flex) | 8px |
| Handle stroke-weight (border) | 2px | — |
| Outer stroke-weight (wrapper) | 1.5px | — |

### 6.4 Estados Visuais

**Default**
- Handle: fill branco + border `slider-handle-border` (2px) + shadow-md (duas camadas)
- Trilha: `bg-quaternary` com preenchimento até o handle em `fg-brand-primary`

**Hover**
- Handle: mesma aparência visual do Default (sem mudanças de cor ou tamanho)
- As sombras permanecem iguais (`shadow-md_01` + `shadow-md_02`)

**Focused**
- Handle: focus ring simulado via sombras empilhadas:
  - spread: 4px em `rgba(46, 154, 146, 1.0)` — anel de foco brand
  - spread: 2px em `rgba(255, 255, 255, 1.0)` — gap branco
  - shadow: `0 1px 2px rgba(16,24,40, 0.06)` — sombra sutil
  - shadow: `0 1px 3px rgba(16,24,40, 0.10)` — sombra sutil

**Disabled**
- Não existe como variante explícita no component set atual. Precisaria ser adicionado caso necessário (recomenda-se seguir o padrão `border-disabled` + `bg-disabled_subtle` do resto do sistema).

---

## Referências cruzadas

- Escala de sombras (`shadow-md`, `shadow-lg`): [`foundations/shadows-elevation.md §1`](../foundations/shadows-elevation.md#1-sombras-drop-shadows)
- Focus rings: [`foundations/shadows-elevation.md §3`](../foundations/shadows-elevation.md#3-focus-rings)
- Tipografia display (Progress Circle): [`foundations/typography.md §3`](../foundations/typography.md#3-tamanhos-font-sizes--text-xs--display-2xl)
