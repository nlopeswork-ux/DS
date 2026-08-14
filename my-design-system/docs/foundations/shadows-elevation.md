# Fundações — Sombras, Elevação e Z-Index

> Cobre a escala completa de `shadow-xs` a `shadow-3xl`, sombras skeuomórficas, focus rings, backdrop blurs e a escala de sobreposição (z-index).

---

## 1. Sombras (Drop Shadows)

| Estilo Figma | CSS `box-shadow` | Token CSS | Tailwind |
|---|---|---|---|
| **shadow-xs** | `0px 1px 2px rgba(16,24,40,0.05)` | `--shadow-xs` | `shadow-xs` |
| shadow-sm | `0px 1px 2px rgba(16,24,40,0.06), 0px 1px 3px rgba(16,24,40,0.10)` | `--shadow-sm` | `shadow-sm` |
| shadow-md | `0px 2px 4px -2px rgba(16,24,40,0.06), 0px 4px 8px -2px rgba(16,24,40,0.10)` | `--shadow-md` | `shadow-md` |
| shadow-lg | `0px 4px 6px -2px rgba(16,24,40,0.03), 0px 12px 16px -4px rgba(16,24,40,0.08)` | `--shadow-lg` | `shadow-lg` |
| shadow-xl | `0px 8px 8px -4px rgba(16,24,40,0.03), 0px 20px 24px -4px rgba(16,24,40,0.08)` | `--shadow-xl` | `shadow-xl` |
| shadow-2xl | `0px 24px 48px -12px rgba(16,24,40,0.18)` | `--shadow-2xl` | `shadow-2xl` |
| **shadow-3xl** | `0px 32px 64px -12px rgba(16,24,40,0.14)` | `--shadow-3xl` | `shadow-3xl` |

### 1.1 Escala visual de intensidade

```
shadow-xs   ▁  elevação mínima — botões, inputs em repouso
shadow-sm   ▂  cards discretos, handles de slider
shadow-md   ▃  handles de slider em foco/hover, elementos flutuantes leves
shadow-lg   ▄  dropdowns, menus, popovers
shadow-xl   ▅  painéis flutuantes maiores
shadow-2xl  ▆  modais, diálogos
shadow-3xl  ▇  elevação máxima — overlays de destaque extremo
```

## 2. Sombra Skeuomórfica

Combinação usada em componentes com efeito de "profundidade" (ex.: Button Primary, Button group wrapper):

| Estilo Figma | CSS `box-shadow` | Token CSS |
|---|---|---|
| shadow-xs-skeuomorphic | `0px 1px 2px rgba(16,24,40,0.05), inset 0px -2px 0px rgba(16,24,40,0.05), inset 0px 0px 0px 1px rgba(16,24,40,0.18)` | `--shadow-xs-skeuomorphic` |

Decomposição (usada individualmente em specs de componente):

| Camada | Token | Valor |
|---|---|---|
| Sombra externa | `shadow-xs` | drop-shadow `0 1 2`, 5% opacidade |
| Sombra interna | `shadow-skeumorphic-inner` | inner-shadow `0 -2 0`, 5% opacidade |
| Borda interna | `shadow-skeumorphic-inner-border` | inner-shadow `0 0` spread `1`, 18% opacidade |
| Stroke | — | gradiente linear branco→transparente (12%→0%) |

## 3. Focus Rings

| Estilo Figma | CSS `box-shadow` | Token CSS |
|---|---|---|
| focus-ring | `0px 0px 0px 4px rgba(46,154,146,1), 0px 0px 0px 2px #ffffff` | `--ring-brand` |
| focus-ring-error | `0px 0px 0px 4px rgba(240,68,56,1), 0px 0px 0px 2px #ffffff` | `--ring-error` |
| focus-ring-shadow-xs | `0px 0px 0px 4px rgba(46,154,146,1), 0px 0px 0px 2px #fff, 0px 1px 2px rgba(16,24,40,0.05)` | `--ring-brand-shadow-xs` |
| focus-ring-shadow-sm | `0px 0px 0px 4px rgba(46,154,146,1), 0px 0px 0px 2px #fff, 0px 1px 2px rgba(16,24,40,0.06), 0px 1px 3px rgba(16,24,40,0.10)` | `--ring-brand-shadow-sm` |
| focus-ring-error-shadow-xs | `0px 0px 0px 4px rgba(240,68,56,1), 0px 0px 0px 2px #fff, 0px 1px 2px rgba(16,24,40,0.05)` | `--ring-error-shadow-xs` |

**Padrão estrutural do focus ring:** anel duplo — halo branco interno (`spread: 2px`, `#ffffff`) + anel de cor externo (`spread: 4px`, Brand 500 `rgba(46,154,146,1)` ou Error 500 `rgba(240,68,56,1)`). Usado em: Button, Input Field, Checkbox, Toggle, Slider, Avatar add button, Button group, Dropdown trigger.

## 4. Backdrop Blurs

| Estilo Figma | CSS `backdrop-filter` | Token CSS | Tailwind |
|---|---|---|---|
| backdrop-blur-sm | `blur(8px)` | `--backdrop-blur-sm` | `backdrop-blur-sm` |
| backdrop-blur-md | `blur(16px)` | `--backdrop-blur-md` | `backdrop-blur-md` |
| backdrop-blur-lg | `blur(24px)` | `--backdrop-blur-lg` | `backdrop-blur-lg` |
| backdrop-blur-xl | `blur(40px)` | `--backdrop-blur-xl` | `backdrop-blur-xl` |

---

## 5. Escala de Z-Index / Sobreposição *(inferido)*

> A especificação de origem não define uma escala de z-index explícita. A escala abaixo é **proposta** com base na hierarquia de sobreposição implícita nos componentes documentados (tooltips sobre dropdowns, dropdowns sobre conteúdo, etc.) e segue incrementos de 10 para permitir inserção futura de camadas intermédias. **Deve ser validada com a equipa antes de adotada como padrão vinculativo.**

| Camada | z-index | Token CSS (sugerido) | Componentes típicos |
|---|---|---|---|
| Base content | `0` | `--z-base` | Fluxo normal da página |
| Sticky elements | `10` | `--z-sticky` | Headers fixos, nav bar |
| Dropdown / Menu | `20` | `--z-dropdown` | Dropdown, Input dropdown menu, _Dropdown list item |
| Fixed overlays | `30` | `--z-overlay` | `bg-overlay`, painéis fixos |
| Popover | `40` | `--z-popover` | Menus contextuais adicionais |
| Modal / Dialog | `50` | `--z-modal` | Diálogos, confirmações |
| Tooltip | `60` | `--z-tooltip` | Tooltip, Help icon |
| Toast / Notification | `70` | `--z-toast` | Notificações flutuantes |
| Max (crítico) | `9999` | `--z-max` | Loaders globais, banners de bloqueio |

**Regra:** o Tooltip deve sempre sobrepor-se a Dropdowns e Modais (é frequentemente acionado a partir de um Help icon dentro de qualquer contexto), por isso ocupa uma camada acima do Modal na escala proposta.

---

## 6. Combinação sombra + elevação por componente

| Componente | Sombra aplicada | Elevação relativa |
|---|---|---|
| Button (Primary/Secondary) | `shadow-xs` + skeuomórfica | Base |
| Button group (wrapper) | `shadow-xs` + skeuomórfica | Base |
| Input Field / Input dropdown | `shadow-xs` | Base |
| Slider handle (default/hover) | `shadow-md_01` + `shadow-md_02` | Baixa |
| Slider handle (focused) | Focus ring + `shadow-md` sutil | Baixa/Média |
| Dropdown menu | `shadow-lg_01` + `shadow-lg_02` | Média |
| Tooltip | `shadow-lg_01` + `shadow-lg_02` | Média |
| Avatar add button (hover, tooltip) | `shadow-lg` | Média |
| Checkbox / Toggle (focused) | Focus ring duplo | — (sem elevação, apenas foco) |
