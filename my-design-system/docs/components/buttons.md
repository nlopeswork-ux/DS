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

### 1.4 Diretrizes de UX (transversais a Button e Button destructive)

**Affordance.** Um botão deve sempre parecer um botão — retângulos ou retângulos arredondados (incluindo pílula, `radius-full`) são sempre uma escolha segura, porque o utilizador já reconhece essa forma como clicável de forma subconsciente. À medida que o estilo se afasta desse contentor (texto sublinhado, texto com seta, texto simples sem qualquer container), a affordance de "isto é clicável" degrada-se progressivamente — evitar hierarquias que removam por completo o contentor visual do botão, exceto `Link gray`/`Link color`, que assumem deliberadamente o padrão visual de hiperligação.

**Hierarquia.** A maioria dos ecrãs/secções tem apenas **uma** ação primária — a ação mais provável ou desejada. As restantes são secundárias (pode haver mais do que uma) e, quando necessário, terciárias ou quaternárias. O estilo do botão (`hierarchy`) é o mecanismo que diferencia visualmente essas ações — nunca usar o mesmo `hierarchy` (ex.: várias `Secondary gray` lado a lado) para ações com pesos de decisão diferentes, sob pena de forçar o utilizador a ler cada label para perceber qual é a ação principal.

**Ações destrutivas.** `destructive` (paleta Error) só deve ser aplicado quando a ação destrutiva é, ela própria, a ação **primária** do ecrã/modal (ex.: confirmar "Delete" num modal de eliminação). Quando a ação destrutiva é apenas uma alternativa secundária (ex.: "Discard" ao lado de "Save changes"), um `Secondary gray`/`Tertiary gray` sem paleta de erro já comunica a opção com clareza, sem competir visualmente com a ação primária real. Ver `foundations/colors.md §1.5` (escala Error).

**Equilíbrio óptico de ícones.** Ícones vivem numa grelha de 24px com ~2px de padding entre a live area e o frame — esse padding extra desalinha opticamente um botão com ícone (o lado do ícone "parece" ter mais espaço do que o lado do texto). Para compensar, o padding horizontal nominal do botão (`spacing-xl`/16px em `md`) é reduzido em 2px, e o texto é envolvido num wrapper com +2px de padding horizontal — o total visual sem ícone mantém-se igual (14+2=16), e com ícone fica opticamente centrado (14 botão + 2 wrapper = 16, alinhado ao lado sem ícone). Ver `src/components/Button/Button.tsx` (`sizeStyles` + wrapper `px-0.5` à volta de `children`).

| Componente | Padding nominal | Padding aplicado (KDS) |
|---|---|---|
| Botão (`px` horizontal) | 16px (`md`) | 14px (`px-3.5`) |
| Wrapper do texto (`px` horizontal) | 0px | 2px (`px-0.5`) |
| Total visual sem ícone | 16px | 14 + 2 = 16px |
| Total visual com ícone | 16 + ~2px do frame do ícone = ~18px | 14 + 2 (ícone) = 16px |

**Esqueumorfismo.** O botão usa o token composto `shadow-xs-skeuomorphic` (drop-shadow + inner-shadow inferior + inner-shadow de borda, ver `foundations/shadows-elevation.md §2`) em vez de um `shadow-xs` plano, em toda hierarquia com fill ou borda visível (`Primary`, `Secondary gray`, `Secondary color`, e os equivalentes `destructive`). Isto simula uma profundidade subtil (o botão parece ligeiramente elevado da superfície) sem comprometer contraste/acessibilidade. `Tertiary`/`Link` permanecem planos (sem fill nem sombra), por não terem um contentor a "elevar".

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

108 variantes · Layout horizontal com auto-layout.

### 3.1 Props (TypeScript)

```ts
type SocialButtonProps = {
  social: 'Google' | 'Facebook' | 'Apple' | 'Twitter' | 'Figma' | 'Dribbble';
  supportingText: boolean;    // true = label visível, false = somente ícone
  theme: 'Brand' | 'Color' | 'Gray';
  state: 'Default' | 'Hover' | 'Focused';
};
```

### 3.2 Dimensões e espaçamento

| Propriedade | Com label (`supportingText: true`) | Somente ícone (`supportingText: false`) |
|---|---|---|
| Altura | 44px | 44px |
| Largura | Variável (hug) | 44px |
| Padding horizontal | 16px (`spacing-xl`) | 10px |
| Padding vertical | 10px | 10px |
| Gap (ícone ↔ texto) | 12px (`spacing-lg`) | — |
| Border-radius | 8px (`radius-md`) | 8px (`radius-md`) |

### 3.3 Tipografia

| Token | Valor |
|---|---|
| Font family | Inter |
| Font weight | Semi Bold (600) |
| Font size | 16px |
| Line height | 24px |
| Letter spacing | 0% |

### 3.4 Tokens de cor por tema

**Temas `Color` e `Gray`** (background branco, ícone colorido ou monocromático):

| Estado | Background | Texto | Stroke |
|---|---|---|---|
| Default | `bg-primary` · `#FFFFFF` | `text-secondary` (700) · `#344054` | 1px + gradiente overlay |
| Hover | `bg-primary-hover` · `#F9FAFB` | `text-secondary-hover` · `#182230` | 1px + gradiente overlay |
| Focused | `bg-primary` · `#FFFFFF` | `text-secondary` (700) · `#344054` | 1px + gradiente overlay |

A diferença entre os dois temas está só no ícone: `Color` usa o logótipo colorido do provedor; `Gray` usa a versão monocromática (cinza) do mesmo logótipo — o par background/texto/stroke é idêntico.

**Tema `Brand`** (background na cor do provedor):

| Provedor | Background fill |
|---|---|
| Facebook | `#1877F2` |
| Apple | `#000000` |
| Google | `#FFFFFF` (estilo outline) |
| Twitter/X | `#000000` |
| Figma | `#000000` |
| Dribbble | `#EA4C89` |

- Texto (`Brand`, provedor com bg escuro): `text-white` · `#FFFFFF`
- Texto (`Brand`, Google — bg claro): `text-secondary` (700) · `#344054`
- Stroke (`Brand`): 2px + gradiente linear (branco 12% → transparente, de cima para baixo)

### 3.5 Efeitos (sombras e focus ring)

| Efeito | Tipo | Valores | Token |
|---|---|---|---|
| Sombra externa | Drop Shadow | y: 1, blur: 2, spread: 0, alpha: 5% | `shadow-xs` |
| Sombra interna (borda inferior) | Inner Shadow | y: -2, blur: 0, spread: 0, alpha: 5% | `shadow-skeumorphic-inner` |
| Sombra interna (borda) | Inner Shadow | y: 0, blur: 0, spread: 1, alpha: 18% | `shadow-skeumorphic-inner-border` |

As três camadas acima combinam-se no token composto `shadow-xs-skeuomorphic` (ver `foundations/shadows-elevation.md §2`).

**Estado Focused (efeitos adicionais):**

| Efeito | Tipo | Valores | Token |
|---|---|---|---|
| Focus ring externo | Drop Shadow | offset: 0, blur: 0, spread: 4 | `focus-ring` |
| Focus ring interno | Drop Shadow | offset: 0, blur: 0, spread: 2 | `bg-primary` (branco) |

### 3.6 Estados visuais

| Estado | Comportamento |
|---|---|
| Default | Background e texto em repouso, sombras skeuomórficas padrão |
| Hover | Background muda para `bg-primary-hover`, texto para `text-secondary-hover` (ligeiramente mais escuro) |
| Focused | Retorna ao background default + adiciona focus ring duplo (anel colorido externo de 4px + anel branco interno de 2px) |

⚠️ Não há variante `Disabled` explícita neste component set.

---

## 4. Social button group

6 variantes · Layout vertical com auto-layout.

### 4.1 Props (TypeScript)

```ts
type SocialButtonGroupProps = {
  style: 'Buttons' | 'Icons';
  theme: 'Brand' | 'Color' | 'Gray';
};
```

### 4.2 Estrutura

- Composição de instâncias do `Social button` empilhadas verticalmente.
- `itemSpacing`: 12px (`spacing-lg`).
- `padding`: 0px.
- `Buttons`: 3–4 instâncias com label (Google, Facebook, Apple + opcional).
- `Icons`: 3–4 instâncias somente ícone, dispostas horizontalmente dentro de cada slot.

### 4.3 Design Tokens

| Categoria | Token | Valor |
|---|---|---|
| Espaçamento entre itens | `spacing-lg` | 12px |
| Layout | Vertical stack (herdado do `Social button`) | — |

### 4.4 Estados visuais

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
