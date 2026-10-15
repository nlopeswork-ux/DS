# Componentes — Feedback, Overlays e Alertas

> Fase 4 (Week 02). Fonte: Figma KDS — Design System, frame "Modal" (`7759:109626`) e "Modal documentation" (`7760:465625`).

## 1. Modal

### 1.1 Props (TypeScript)

```ts
type ModalProps = {
  size: 'sm' | 'md' | 'lg' | 'full screen';
  breakpoint: 'Desktop' | 'Mobile';   // responsivo por CSS (< 640px = Mobile)
  open: boolean; title; subtitle?; icon?; iconTone?;
  footerStart?; actions?; dividers?;
  onClose; dismissOnEsc; dismissOnOverlay;
};
```

Sem prop de estado: Default/Hover/Focus/Disabled pertencem aos botões internos.

### 1.2 Variantes

| Size | Desktop | Mobile |
|---|---|---|
| `sm` | ~400px, centrado. Ícone de destaque + título + texto; ações Cancel \| Confirm lado a lado | Bottom sheet (margem 16px, 80px em baixo); ações empilhadas, Confirm por cima |
| `md` | ~640px, header + divisor + slot + footer (ação inicial à esquerda, Cancel/Confirm à direita) | Bottom sheet (como `sm`), sem ícone no header, divisória só no header, slot, ações empilhadas; ação inicial do footer oculta |
| `lg` | ~1024px, mesma estrutura | Full screen (sem ícone, ações empilhadas no fundo; ação inicial oculta) |
| `full screen` | Viewport − 32px de margem | Full screen |

### 1.3 Tokens

| Categoria | Token |
|---|---|
| Overlay | `bg-overlay` a 70% + `backdrop-blur` 8px |
| Superfície | `bg-primary`, `radius-xl` (12px), `shadow-xl` |
| Header/Footer padding | `spacing-xl` (16px, mobile) / `spacing-3xl` (24px, desktop) |
| Título | text-lg / semibold / `text-primary` |
| Texto de apoio | text-sm / regular / `text-tertiary` |
| Z-index | camada Modal = 50 (`shadows-elevation.md` §5) |

### 1.4 Comportamento (documentação Figma)

- X e Cancel pedem o fecho sem submeter; se houver trabalho por guardar, pedir confirmação.
- Em `md`/`lg`/`full` pode abrir um modal de confirmação compacto por cima (exceção deliberada ao "sem modals aninhados"); "Discard changes" / "Delete item".
- Esc e clique no overlay seguem política baseada no risco; nunca contornam uma confirmação obrigatória.
- Scroll da página bloqueado + focus trap.
- Submissão assíncrona: estado de loading no botão principal; manter aberto e mostrar erros junto aos campos.
- Evitar: modals aninhados, formulários longos, mensagens de rotina, confirmações redundantes.
- Nota: estas diretrizes descrevem a implementação pretendida, não comportamento verificado.

### 1.5 Dependências / placeholders

`Button`, `Icon` reutilizados. **Em falta (placeholders internos em `Modal/`)**: Button close X (`buttons.md` §6) e Featured icon — promover a componentes próprios.
