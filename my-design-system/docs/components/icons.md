# Componentes — Icons

> Cobre: Icon, Country icon, Social icon. O Featured icon está em [`feedback-visuals.md`](feedback-visuals.md) (secção "Misc Icons").

---

## 1. Icon

Glifo do set **Google Material Symbols** (fonte variável). É o único set oficial de ícones do Design System: ver a página Icons do Storybook para o catálogo.

### 1.1 Props (TypeScript)

```ts
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  name: string;          // nome Material Symbols, ex.: "home", "search"
  size?: IconSize;       // default: 'md'
  color?: string;        // default: currentColor — herda a cor do texto ou de fg-*
  filled?: boolean;      // default: false — variante preenchida (eixo FILL = 1)
  weight?: IconWeight;   // default: 400 (eixo wght)
  label?: string;        // nome acessível; sem label o ícone é decorativo
}
```

### 1.2 Tamanhos

| Size | Caixa | `font-size` | Eixo `opsz` |
|---|---|---|---|
| xs | 16px | 16px | 20 |
| sm | 20px | 20px | 20 |
| md | 24px | 24px | 24 |
| lg | 28px | 28px | 28 |
| xl | 32px | 32px | 32 |

O eixo óptico `opsz` só existe de 20 a 48 na fonte, por isso o tamanho `xs` usa o mínimo da fonte (20).

### 1.3 Cor e acessibilidade

- A cor vem de `fg-*` (ou do texto envolvente), nunca de um valor fixo.
- Sem `label`: `aria-hidden` (decorativo, ao lado de texto visível).
- Com `label`: `role="img"` e `aria-label`. Usar em botões só com ícone.

### 1.4 Nota técnica

O `font-size` é aplicado por `style` inline e não por classe do Tailwind: a folha de estilos do Google Fonts traz uma regra sem camada (`.material-symbols-outlined { font-size: 24px }`) que ganha sempre a qualquer regra em `@layer`, e faria todos os ícones aparecerem a 24px.

---

## 2. Country icon

Bandeira circular de um país ou território.

### 2.1 Props (TypeScript)

```ts
interface CountryIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
  code: string;    // ISO 3166-1 alpha-2 (ex.: "PT", "US"), sem distinção de maiúsculas, mais "GB-2" e "earth"
  size?: number;   // default: 24 (px)
}
```

### 2.2 Comportamento

| `code` | Resultado |
|---|---|
| Código ISO (`PT`, `us`...) | Imagem `flags/<código>.svg` do conjunto vendorizado `circle-flags` (MIT) |
| `GB-2` | Mesma imagem que `GB` (não existe um ficheiro distinto) |
| `earth` | Placeholder: círculo `bg-utility-gray-100` com o ícone `public`, em `text-tertiary` |

- Forma circular (`rounded-full`), `object-cover`, 24×24 por omissão; `size` permite reduzir em contextos embutidos (por exemplo, o slot `flagSwap` do Badge).
- Decorativo: `alt=""`. O nome do país deve estar em texto visível ao lado.
- O subconjunto de códigos disponíveis está em `CountryIcon.data.ts`.

---

## 3. Social icon

Logótipo de uma plataforma, em cor de marca ou monocromático.

### 3.1 Props (TypeScript)

```ts
type SocialIconPlatform =
  | 'AngelList' | 'Apple' | 'Clubhouse' | 'Discord' | 'Dribbble' | 'Facebook' | 'Figma' | 'GitHub'
  | 'Google' | 'Instagram' | 'LinkedIn' | 'Notion' | 'PayPal' | 'Pinterest' | 'Reddit' | 'Slack'
  | 'Spotify' | 'TikTok' | 'Twitch' | 'WhatsApp' | 'X' | 'YouTube';   // 22 plataformas

type SocialIconStyle = 'Brand' | 'Gray';
type SocialIconState = 'Default' | 'Hover';   // só tem efeito em 'Gray'

interface SocialIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'style'> {
  platform?: SocialIconPlatform;   // default: 'Facebook'
  style?: SocialIconStyle;         // default: 'Brand'
  state?: SocialIconState;         // default: 'Default'
}
```

### 3.2 Estilos

| Style | Cor | Hover |
|---|---|---|
| Brand | Cores oficiais da plataforma (multicolor onde o logótipo o exige, como Google e Figma) | Sem estado de hover |
| Gray | Monocromático, `#98A2B3` (`fg-quinary`) | `#667085` |

### 3.3 Estrutura e acessibilidade

- Contentor 24×24 (`size-6`), fundo `bg-primary`, glifo a toda a largura.
- `role="img"` com `aria-label` igual ao nome da plataforma.
- Oito logótipos multi-tom são SVG desenhados à mão em `brandIcons.tsx` (Apple, Dribbble, Facebook, Figma, Google, LinkedIn, Slack, X); os restantes vêm de marcas de um só tom geradas em `simpleIconMarks.generated.ts`. O `SocialButton` reutiliza os mesmos logótipos.
- Nota: as duas cores do estilo Gray estão escritas em hexadecimal no componente; os valores correspondem aos tokens `fg-quinary` e ao seu hover.

---

## Referências cruzadas

- Cores semânticas (`fg-*`): [`foundations/colors.md`](../foundations/colors.md)
- Featured icon: [`feedback-visuals.md`](feedback-visuals.md)
- Catálogo de ícones: página Icons do Storybook (`src/docs/foundations/Icons.mdx`)
