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

---

## 2. Alert

> Fonte: Figma KDS — Design System, frame "Alert" (`1130:81134`). O Alert ficou só com a apresentação *floating*; as variantes full-width passaram a Banner e o feedback efémero a Toast.

### 2.1 Props (TypeScript)

```ts
type AlertProps = {
  color: 'info' | 'success' | 'warning' | 'error';   // Figma guarda "Informative"
  breakpoint: 'Desktop' | 'Mobile';                  // responsivo por CSS (< 640px = Mobile)
  title; supportingText?; actionLabel?; dismissLabel?;
  onAction?; onDismiss?; showCloseButton?; actionLoading?;
};
```

Sem prop `size` nem de estado: Default/Hover/Focus/Disabled pertencem aos botões internos.

### 2.2 Anatomia
Cartão `radius-xl`, borda `border-primary`, `bg-primary-alt`, `shadow-xs`, padding `spacing-xl`, gap `spacing-xl`. Ícone em destaque: círculo de 32px `bg-{cor}-secondary` com glifo de 16px. Ações: `Link gray` (Dismiss) + `Link color` (ação principal).
- Desktop: ícone · conteúdo · X numa linha.
- Mobile: ícone e X na linha de topo, conteúdo por baixo.

### 2.3 Comportamento
- Junto ao contexto afetado; não bloqueia a página nem prende o foco. Não esconder automaticamente alertas com ações essenciais.
- X e "Dismiss" apenas dispensam — nunca resolvem nem desfazem.
- `role="alert"` em error, `role="status"` nos restantes; cor sempre acompanhada de ícone semântico.

---

## 3. Banner

> Fonte: Figma KDS — Design System, frame "Banner" (`7781:465680`).

### 3.1 Props (TypeScript)

```ts
type BannerProps = {
  color: 'info' | 'success' | 'warning' | 'error';
  breakpoint: 'Desktop' | 'Mobile';
  title; supportingText?; actionLabel?; dismissLabel?;
  onAction?; onDismiss?; showCloseButton?; actionLoading?;
};
```

### 3.2 Variantes

| | Desktop | Mobile |
|---|---|---|
| Layout | `border-b`, conteúdo máx. 1280px, padding `container-padding-desktop` × `spacing-lg`; ícone · título + texto inline · ações · X | `border-t`, padding `spacing-xl`; ícone + texto, ações por baixo, X no canto superior direito |
| `info` | `Secondary gray` md + `Primary` md lado a lado | Empilhados, Primary primeiro, 100% largura |
| `error` / `warning` / `success` | `Link gray` + `Link color` | Idem, por baixo do texto |

### 3.3 Comportamento
- Um banner global de cada vez, por prioridade Error > Warning > Success > Info. Nunca auto-dismiss, nunca prende o foco.
- Banners críticos podem esconder X e Dismiss (`showCloseButton={false}`, `dismissLabel=""`).
- `role="alert"` em error, `role="status"` nos restantes; presente no carregamento da página → região com `aria-label`.

---

## 4. Toast

> Fonte: Figma KDS — Design System, frame "Toast" (`7779:464998`).

### 4.1 Props (TypeScript)

```ts
type ToastProps = {
  color: 'info' | 'success' | 'warning' | 'error';
  breakpoint: 'Desktop' | 'Mobile';
  title; supportingText?; actionLabel?;              // no máximo uma ação
  onAction?; onDismiss?; showCloseButton?;
  duration?: number | null; restartKey?; actionLoading?;
};
// ToastProvider + useToast() → toast({...}), dismiss(id), dismissAll()
```

### 4.2 Anatomia
Cartão elevado (`shadow-lg`, `radius-xl`, `bg-primary-alt`), 384px (mín. 320px) no desktop e largura total no mobile. Ícone outline de 20px com dois anéis (30% / 10%). Uma só ação `Link color`. Desktop: ícone · conteúdo · X; Mobile: ícone e X em cima, conteúdo e ação por baixo.

### 4.3 Comportamento

| Comportamento | Regra |
|---|---|
| Auto-dismiss | 5s sem ação, 8s com ação, nunca < 4s. Warning ≈ 8s. Error persiste até ser dispensado. |
| Pausa | O timer pausa com hover ou foco dentro do toast e retoma ao sair. |
| Máx. visíveis | 3; o mais recente junto ao bordo do ecrã. Sem duplicados — reinicia o timer do existente. |
| Posição | Desktop: canto superior direito. Mobile: fundo do ecrã. |
| ARIA | `role="status"` (polite) em info/success/warning; `role="alert"` (assertive) em error. |
| Foco | Nunca move o foco para o toast. |
| Movimento | Slide de entrada; `prefers-reduced-motion` → fade simples. |
| Ação | Tem de existir também noutro sítio da interface; evitar ações essenciais; prevenir submissões duplicadas. |
