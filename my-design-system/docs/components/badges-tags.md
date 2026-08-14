# Componentes — Badges & Tags

> Cobre: Badge (component set), Badge group, `_Badge close X`, Tag e subcomponentes internos.

---

## 1. Badge — Especificação do Component Set

### 1.1 Props (TypeScript)

```ts
// ── Badge ──
type BadgeProps = {
  Size: "sm" | "md" | "lg";
  Type: "Pill color" | "Pill outline" | "Badge color" | "Badge modern";
  Icon: "False" | "Dot" | "Country" | "X close" | "Avatar"
      | "Icon trailing" | "Icon leading" | "Only";
  Color: "Gray" | "Brand" | "Error" | "Warning" | "Success"
       | "Blue light" | "Blue" | "Indigo" | "Purple"
       | "Pink" | "Orange" | "Blue gray" | "Gray blue";
  /** Instance swap slots (quando Icon ≠ "False") */
};
```

**Total:** 954 variantes (Size × Type × Icon × Color).

### 1.2 Tokens de Design

#### 1.2.1 Tipografia (todas as variantes)

| Token | Valor |
|---|---|
| Font family | Inter |
| Font weight | Medium (500) |
| Font size (sm) | 12px |
| Font size (md / lg) | 14px |
| Line-height (sm) | 18px |
| Line-height (md / lg) | 20px |
| Letter spacing | 0% |

#### 1.2.2 Espaçamento (padding por Size)

| Size | Padding (top/right/bottom/left) | Height |
|---|---|---|
| sm | 2 / 8 / 2 / 8 | 22px |
| md | 2 / 10 / 2 / 10 | 24px |
| lg | 4 / 12 / 4 / 12 | 28px |

Layout: Horizontal, item spacing `0`. Stroke align: `INSIDE`, weight `1px` (exceto `Pill outline`: `1.5px`).

#### 1.2.3 Border-radius por Type

| Type | Border-radius |
|---|---|
| Pill color | 9999 (full pill) |
| Pill outline | 9999 (full pill) |
| Badge color | 6px |
| Badge modern | 6px |

#### 1.2.4 Cores por Color (tipo `Pill color`)

| Color | Background | Border | Text | Variable (bg) | Variable (border) |
|---|---|---|---|---|---|
| Gray | `#F9FAFB` | `#E4E7EC` | `#344054` | `utility-gray-50` | `utility-gray-200` |
| Brand | `#E0FAF8` | `#A1E8E1` | `#176662` | `utility-brand-50` | `utility-brand-200` |
| Error | `#FEF3F2` | `#FECDCA` | `#B42318` | `utility-error-50` | `utility-error-200` |
| Warning | `#FFFAEB` | `#FEDF89` | `#B54708` | `utility-warning-50` | `utility-warning-200` |
| Success | `#ECFDF3` | `#ABEFC6` | `#067647` | `utility-success-50` | `utility-success-200` |
| Blue light | `#F0F9FF` | `#B9E6FE` | `#026AA2` | `utility-blue-light-50` | `utility-blue-light-200` |
| Blue | `#EFF8FF` | `#B2DDFF` | `#175CD3` | `utility-blue-50` | `utility-blue-200` |
| Indigo | `#EEF4FF` | `#C7D7FE` | `#3538CD` | `utility-indigo-50` | `utility-indigo-200` |
| Purple | `#F4F3FF` | `#D9D6FE` | `#5925DC` | `utility-purple-50` | `utility-purple-200` |
| Pink | `#FDF2FA` | `#FCCEEE` | `#C11574` | `utility-pink-50` | `utility-pink-200` |
| Orange | `#FEF6EE` | `#F9DBAF` | `#B93815` | `utility-orange-50` | `utility-orange-200` |
| Gray blue | `#F8F9FC` | `#D5D9EB` | `#363F72` | `utility-gray-blue-50` | `utility-gray-blue-200` |

**Padrão de naming dos tokens de variáveis:** `Component colors/Utility/{Color}/utility-{color}-{shade}`

#### 1.2.5 Diferenças por Type (cor Gray como referência)

| Type | Background | Border | Stroke weight |
|---|---|---|---|
| Pill color | `#F9FAFB` (solid) | `#E4E7EC` | 1px |
| Pill outline | transparente (sem fill) | `#475467` | 1.5px |
| Badge color | `#F9FAFB` (solid) | `#E4E7EC` | 1px |
| Badge modern | `#FFFFFF` (branco) | `#D0D5DD` | 1px |

### 1.3 Estados Visuais

O `Badge` isolado **não possui prop State** — é um componente estático sem hover/focus/disabled internos. A interatividade fica no `Badge group` e no `_Badge close X`.

---

## 2. Badge group

### 2.1 Estados

| State | Background (Brand) | Border | Transição |
|---|---|---|---|
| Default | `#E0FAF8` | `#A1E8E1` | — |
| Hover | `#CBF4F0` (mais saturado) | `#A1E8E1` (mantido) | Dissolve, 200ms, linear (via `CHANGE_TO` / `ON_HOVER`) |

### 2.2 Dimensões

| Size | Height | Spacing | Font size |
|---|---|---|---|
| md | 30px | 8px | 12px |
| lg | 32px | 12px | 14px |

Padding: `4 / 10 / 4 / 4` (assimétrico — mais compacto do lado do badge).

---

## 3. `_Badge close X`

| State | Background | Icon color | Corner radius (Square) | Corner radius (Rounded) |
|---|---|---|---|---|
| Default | transparente | `#98A2B3` | 3px | 9999 (pill) |
| Hover | `#F2F4F7` | `#667085` (mais escuro) | 3px | 9999 (pill) |

Tamanho fixo: `16×16px`, padding `2px` em todos os lados.

---

## 4. Resumo da Arquitetura de Componentes

```
Badge (Component Set) ─── 954 variantes
│   Props: Size × Type × Icon × Color
│   Slots: Flag swap, Icon trailing swap, Icon leading swap
│
├── Badge group (Component Set) ─── 120 variantes
│   Props: Badge × Size × Color × Theme × State × icon (bool)
│   Compõe: Badge + texto descritivo + interação hover
│
└── _Badge close X (Component Set interno) ─── 48 variantes
    Props: Type × Color × State
```

---

## 5. Tag — Especificação do Component Set

### 5.1 Props (TypeScript)

```ts
type TagProps = {
  size: 'sm' | 'md' | 'lg';
  icon: 'False' | 'Country' | 'Avatar' | 'Dot';
  action: 'Text only' | 'X close' | 'Count';
  checkbox: 'False' | 'True';
  flagSwap?: InstanceSwap; // Instance swap para ícone de bandeira/país
};
```

**Total de variantes:** 72 (3 sizes × 4 icons × 3 actions × 2 checkbox).

### 5.2 Sub-componentes internos

| Sub-componente | Props |
|---|---|
| `_Tag close X` | `size: 'sm' \| 'md' \| 'lg'`, `state: 'Default' \| 'Hover'` |
| (ícone) | `size: 'sm' \| 'md' \| 'lg'` |
| `_Tag checkbox` | `checked: 'False' \| 'True'`, `size: 'sm' \| 'md' \| 'lg'`, `state: 'Default' \| 'Hover' \| 'Focused' \| 'Disabled'` |

### 5.3 Design Tokens

#### Cores (variáveis)

| Token | Uso |
|---|---|
| `Colors/Background/bg-primary` | Fill do container (fundo branco) |
| `Colors/Border/border-primary` | Stroke do container |
| `Colors/Text/text-secondary (700)` | Cor do label e texto do count |
| `Colors/Background/bg-tertiary` | Fill do badge de count |
| `Colors/Background/bg-brand-solid` | Fill do checkbox marcado (teal) |
| `Colors/Background/bg-disabled_subtle` | Fill do checkbox desabilitado |
| `Colors/Border/border-disabled` | Stroke do checkbox desabilitado |
| `VariableID:5353:38034` (hover bg) | Fill do close X no hover |

#### Tipografia

| Propriedade | Valor |
|---|---|
| Font family | Inter |
| Font weight | Medium (500) |
| Font size (sm) | 12px |
| Font size (md/lg) | 14px |
| Line height (sm) | 18px |
| Line height (md/lg) | 20px |
| Letter spacing | 0% |

#### Espaçamento (padding)

| Size | Top | Right | Bottom | Left | Gap interno |
|---|---|---|---|---|---|
| sm | 3px | 8px | 3px | 8px | 3px |
| md | 2px | 9px | 2px | 9px | 3px |
| lg | 4px | 10px | 4px | 10px | 3px |

> Nota: com `Checkbox=True`, o padding-left reduz (ex.: sm → 5px). Com `Action=X close` ou `Count`, o padding-right reduz para 4px (acomodando o ícone/badge).

#### Border

| Propriedade | Valor |
|---|---|
| Border radius | 6px (container) / 3px (close X hover) |
| Stroke weight | 1px |
| Stroke alignment | Inside (padrão) |

#### Layout

- Layout mode: Horizontal (auto-layout)
- Item spacing: 3px (consistente em todos os tamanhos)

### 5.4 Estados Visuais

#### Tag (container)

| Estado | Descrição |
|---|---|
| Default | `bg-primary` fill, `border-primary` stroke, label `text-secondary` |

#### `_Tag close X`

| Estado | Descrição |
|---|---|
| Default | Sem fill (transparente), ícone X visível |
| Hover | Fill `bg-disabled_subtle` arredondado (radius 3px) |

#### `_Tag checkbox`

| Estado | Checked | Descrição |
|---|---|---|
| Default | ✗ | Fill `bg-primary`, stroke `border-primary` |
| Default | ✓ | Fill + stroke `bg-brand-solid` (teal), ícone check branco |
| Hover | ✗ | Stroke com destaque (variação de borda) |
| Focused | ✗/✓ | Anel de foco (outline adicional) |
| Disabled | ✗ | Fill `bg-disabled_subtle`, stroke `border-disabled`, opacidade reduzida |
| Disabled | ✓ | Fill esmaecido, check com menor contraste |

### 5.5 Anatomia do componente

```
┌─ Tag ─────────────────────────────────────────────┐
│ [Checkbox?] [Icon?] [Label] [Action: X | Count]   │
└───────────────────────────────────────────────────┘
```

- **Checkbox** — aparece à esquerda quando `checkbox=True`
- **Icon** — `Dot` (indicador colorido), `Country` (bandeira via instance swap), `Avatar` (imagem circular), ou ausente
- **Label** — texto principal ("Label")
- **Action** — à direita: `close X` (botão de remoção), `Count` (badge numérico), ou nenhum

---

## Referências cruzadas

- Paleta de cores utility (Badge): [`foundations/colors.md §1.8`](../foundations/colors.md#18-paleta-estendida-uso-em-badgestags-multi-cor)
- Tipografia: [`foundations/typography.md`](../foundations/typography.md)
