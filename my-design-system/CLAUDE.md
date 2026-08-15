# Instructions for Claude Code — Design System Project

## 🎯 Contexto e Objetivo
Este repositório contém o **Design System** da empresa. O teu objetivo é atuar como um engenheiro Frontend especialista em UI/UX e Design Systems, construindo componentes e tokens limpos, acessíveis e fiéis às especificações fornecidas.

---

## 🚀 Fluxo de Trabalho e Git (Obrigatório)
- **Ciclo completo:** Sempre que criares, alterares ou corrigires um componente, a tarefa só se considera terminada após a validação no Storybook e a respetiva submissão para o repositório remoto.
- **Automação Git:** Lembra-te e sugere sempre os comandos necessários (`git add`, `git commit`, `git push`) para manter o repositório do GitHub e o GitHub Pages sincronizados com o código atualizado.
---

## 📚 Fonte da Verdade (Single Source of Truth)
Todas as especificações técnicas de Design Tokens e Componentes estão divididas em ficheiros Markdown organizados na pasta `docs/`. **Sempre que fores criar, alterar ou refatorar um componente ou token, deves consultar o ficheiro correspondente antes de gerar o código:**

* **Fundações (Foundations):**
  * Cores (Primitivos, Light/Dark Mode): `docs/foundations/colors.md`
  * Tipografia (Tamanhos, Line-heights, Pesos): `docs/foundations/typography.md`
  * Espaçamentos & Border Radius: `docs/foundations/spacing-radius.md`
  * Sombras, Elevação, Z-Index & Focus Rings: `docs/foundations/shadows-elevation.md`
  * Breakpoints, Grids & Animações: `docs/foundations/breakpoints-grid.md`

* **Componentes (Components):**
  * Botões (Button, Social Button, App Store, Close X): `docs/components/buttons.md`
  * Badges & Tags (Badge, Badge Group, Tag): `docs/components/badges-tags.md`
  * Form Controls (Input Field, Dropdown, Checkbox, Toggle, Groups): `docs/components/form-controls.md`
  * Navegação (Dropdown Menus, Button Group): `docs/components/navigation.md`
  * Feedback & Visuals (Avatar, Tooltip, Help Icon, Progress, Slider): `docs/components/feedback-visuals.md`

---

## 🌍 Idioma & Convenções Visuais do Storybook (Regras Invioláveis)

Estas três regras aplicam-se transversalmente a **todo** o Storybook — landing page, Foundations, componentes, `argTypes`, labels de Controls e menu lateral — e sobrepõem-se a qualquer exemplo anterior deste documento que ainda mostre texto em português dentro de um `.mdx`/`.stories.tsx` (o próprio `CLAUDE.md` continua em português; a regra é sobre o conteúdo renderizado no Storybook, não sobre este ficheiro).

1. **Todo o Storybook, ficheiros `.mdx` e labels de componentes DEVEM estar em Inglês.** Isto inclui títulos de página, TOCs, texto de corpo, `argTypes.name`/`description`, valores de `options` visíveis ao utilizador, e os `include` dos blocos `<Controls>` (que filtram pelo `name` traduzido — ver armadilha já documentada mais abaixo sobre `filterArgTypes.ts`). Um novo componente nunca deve introduzir labels em português — mesmo que a especificação de origem em `docs/` esteja em português, a tradução para Inglês acontece na camada Storybook.
2. **Proibido usar UPPERCASE em títulos/cabeçalhos.** Usa sempre Title Case (`Preview`, `Options`, `Installation`) ou Sentence Case — nunca `text-transform: uppercase`/classe `uppercase` do Tailwind nem strings literais em maiúsculas para cabeçalhos de secção, coluna ou card. Isto aplica-se a headers de coluna do Playground, badges de categoria e qualquer rótulo de UI — não é uma preferência estética pontual, é regra fixa de toda a superfície do Storybook.
3. **O painel de Opções/Playground é composto por linhas flex simples** — nunca cards, caixas ou tabelas com fundo/borda/sombra à volta de cada propriedade. Cada linha: `display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--color-border-secondary);` (a última linha do bloco não leva `border-bottom`). O label é texto simples — `background: transparent; border: none; font-weight: 500; font-size: 13px; color: var(--color-text-secondary);` — nunca dentro de um card ou badge. O controlo (dropdown/toggle) fica à direita, com largura suficiente para o texto completo nunca ser cortado (a coluna do controlo ocupa o espaço restante da linha, `flex: 1` / `min-width: 0`, nunca uma largura fixa curta). Ver implementação de referência em `src/components/Button/Button.mdx` (classes utilitárias Tailwind aplicadas via `[&_tr]`, `[&_td]` no wrapper do bloco `<Controls>`).

---

## 🌐 Documentação Global & Foundations (Storybook)

A camada de tokens CSS vive em `src/tokens/globals.css` (primitivas + semânticos) e é registada como utilities Tailwind em `src/index.css` (`@theme inline` para escalas, `@utility` para tokens semânticos que não cabem numa única namespace do Tailwind — ver comentário no topo de cada ficheiro para a lista completa de camadas).

A landing page (`src/docs/Introduction.mdx`) e as páginas de Foundations (`src/docs/foundations/Colors.mdx`, `Typography.mdx`, `Spacing.mdx`, `ShadowsAndRadius.mdx`) são a vitrine visual dessa camada de tokens no Storybook — usam o bloco nativo `<Typeset>` de `@storybook/addon-docs/blocks` para a escala tipográfica, e grids/tabelas demonstrativos com utilities Tailwind reais (nunca hex/px hardcoded, exceto onde o próprio hex é o dado documentado — ver regra de Cores abaixo) para Cores, Spacing e Shadows & Radius.

**Regra transversal:** qualquer adição ou alteração nos tokens globais de CSS/Tailwind (`src/tokens/globals.css`, `src/index.css`) deve refletir-se automaticamente nas respetivas páginas sob `src/docs/foundations/` — um novo tom de cor, um novo passo de espaçamento, um novo nível de sombra ou um novo peso tipográfico só está "feito" quando aparece também na página de Foundations correspondente. Isto mantém a documentação como espelho fiel do código, nunca uma cópia estática que desalinha com o tempo.

Ordem fixa da sidebar do Storybook (configurada em `.storybook/preview.tsx`, `parameters.options.storySort`): **Introduction → Foundations (Colors, Typography, Spacing, Shadows & Radius) → Components**. Uma nova página de Foundations tem de ser adicionada ao array `order` para não cair fora da posição esperada; grupos não listados (stories de exemplo do boilerplate, novos componentes ainda não classificados) caem depois, por ordem alfabética, graças ao `'*'` final do array. A página de onboarding do boilerplate (`src/stories/Configure.mdx`) foi removida do repositório — não faz parte do Design System. **Nota:** um padrão negativo (`!../src/stories/Configure.mdx`) no array `stories` de `.storybook/main.ts` **não funciona** nesta versão do Storybook para excluir um `.mdx` específico da sidebar (confirmado empiricamente — a entrada continuou a aparecer em `index.json` mesmo com o padrão presente); apagar o ficheiro é o único método confirmado.

#### Rampas de cor & Tokens Semânticos — grid vs. tabela

**Regra obrigatória:** rampas de cor primitivas (Neutros, Marca, Feedback) usam **CSS Grid `auto-fill`** — nunca o bloco nativo `<ColorPalette>`/`<ColorItem>` do addon-docs, que imprime rótulos de coluna "Name"/"Swatches" repetidos a cada grupo e comprime as tiras horizontalmente. Padrão sancionado (componente local `ColorRamp`, definido no topo de `Colors.mdx`):

```jsx
export const ColorRamp = ({ title, subtitle, colors }) => (
  <>
    <span className="mt-8 mb-3 block text-sm font-semibold text-primary">
      {title}{subtitle ? ` ${subtitle}` : ''}
    </span>
    <div className="grid gap-x-2 gap-y-5 mb-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))' }}>
      {Object.entries(colors).map(([step, hex]) => (
        <div key={step} className="flex flex-col items-start">
          <div className="h-12 w-full rounded-md border border-secondary" style={{ backgroundColor: hex }} />
          <div className="mt-1.5 flex flex-col items-start">
            <span className="text-xs font-bold text-primary">{step}</span>
            <span className="text-[11px] font-mono text-tertiary">{hex}</span>
          </div>
        </div>
      ))}
    </div>
  </>
);
```

Cada célula é autossuficiente — swatch retangular, Step em bold, Hex em `font-mono` pequeno — e nunca corta texto (célula mínima de 76px acomoda um hex de 7 caracteres em mono confortavelmente). O rótulo título+subtítulo (ex: "Gray Light mode") é um único bloco (`display: block`, `font-weight: 600`, `font-size: 0.875rem`, `color: var(--text-primary)`) — nunca duas spans lado a lado com pesos/cores diferentes.

**Regra de Ouro de Espaçamento Vertical para MDX (obrigatória, transversal a todas as páginas de Foundations):**

> H2 Sections = 48px top; H3 Subsections = 32px top; Component/Grid Block = 40px bottom; Internal Row-Gap = 20px.

**Espaçamentos verticais em MDX são regidos centralmente por `.storybook/preview-styles.css`** (H2 = 48px top / 16px bottom + `border-bottom`, H3 = 32px top / 12px bottom, `p` = 20px bottom, `.color-ramp-grid`/`table` = 40px bottom margin) — importado uma única vez no topo de `.storybook/preview.tsx`. Isto significa que um `<h2>`/`<h3>`/`<p>`/`<table>` dentro de `.sbdocs-content` **não precisa** (e não deve) de classes Tailwind `mt-*`/`mb-*` locais para espaçamento vertical — o CSS central usa `!important` e sobrepõe-se a qualquer utility de margem definida no `.mdx`; mantém só classes de tipografia (`text-2xl font-semibold`, etc.) nos headings. Um novo `.mdx` que precise de espaçamento diferente do padrão deve ajustar `preview-styles.css`, nunca reintroduzir margens locais que ficariam mortas.

Rampas de cor usam obrigatoriamente **CSS Grid** (classe `.color-ramp-grid`, definida em `preview-styles.css`) com `row-gap` mínimo de 20px (`row-gap: 1.25rem`) e `column-gap` de 8px — nunca o bloco nativo `<ColorPalette>`/`<ColorItem>` do addon-docs.

**Tokens semânticos** (Text, Background, Border) usam sempre uma **tabela vertical nativa** — a mesma estrutura da tabela "Tamanhos & Line Heights" de `Typography.mdx` — nunca a rampa em grid (os tokens semânticos não formam uma sequência visual 25→950, por isso o grid de ramp não se aplica). Colunas fixas: `Token Name` | `Swatch` (`h-6 w-6 rounded-sm`, `background-color` ou `border-color` via `var(--color-*)` ao vivo) | `CSS Variable` | `Hex (Light)`. Tabela HTML nativa (`<table><thead>...`), nunca sintaxe markdown de pipes — ver armadilha já documentada mais abaixo.

#### Hero banners

**Regra obrigatória:** todo hero banner (landing page, secções de destaque) usa `height: fit-content` (`h-fit` no Tailwind) em vez de deixar a altura ao sabor do layout envolvente, e o texto descritivo sobre fundo de marca usa alto contraste explícito — `color: rgba(255, 255, 255, 0.9)` — nunca uma opacidade Tailwind genérica (`text-white/80` lê como cinza sobre fundos escuros saturados). O título principal (`<h1>`) do hero nunca fica dentro de um container com `max-width` que force wrap prematuro — aplica `max-w-*` só ao parágrafo de apoio, nunca à linha título+badge, e usa `whitespace-nowrap` no título quando precisar de ficar sempre numa única linha.

#### Proibido usar emojis como ícones

**Regra obrigatória, transversal a toda a documentação** (landing page, Foundations, componentes): emojis (🎨, 🧩, 📐, ♿, etc.) nunca são usados como ícone de secção, card ou pilar — usa sempre um SVG desenhado à mão no estilo Tabler Icons (`viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth={1.75}`, `strokeLinecap="round"`, `strokeLinejoin="round"`, `fill="none"`) ou, quando disponível, o pacote `@tabler/icons-react`. Este projeto ainda não depende de uma icon library (ver `Button.stories.tsx`), por isso o padrão atual é definir os ícones necessários como componentes locais `export const IconX = () => (<svg>...)` no topo do `.mdx`/`.stories.tsx` que os usa — ver `src/docs/Introduction.mdx` para o conjunto de referência (Palette, Puzzle, ClipboardCheck, Accessible, Compass, Bolt).

---

## 🛠️ Regras de Desenvolvimento e Arquitetura de Código

### 1. Estrutura de Ficheiros do Componente
Cada componente em `src/components/` deve seguir uma estrutura isolada e modular:

```text
src/components/NomeDoComponente/
├── NomeDoComponente.tsx        # Implementação do Componente React (ou Vue)
├── NomeDoComponente.stories.tsx# Estórias interativas do Storybook
├── NomeDoComponente.types.ts  # Tipagens/Interfaces TypeScript estritas
└── index.ts                    # Exportação limpa do componente
```

### 2. Padrão de Stories no Storybook (Live Playground / OutSystems UI)

Cada `*.stories.tsx` deve funcionar como um **Live Playground**: uma pré-visualização limpa, centralizada e totalmente interativa do componente — nunca um catálogo denso de texto técnico ou props internas.

- **História principal `Playground`:** todo o componente tem uma história chamada `Playground` como entrada de destaque, com `parameters: { layout: 'centered' }`. Mostra só o componente — sem caixas gigantes, sem blocos de texto explicativo à volta.
- **Esconder props técnicas e callbacks dos Controls:** handlers (`onClick`, `onChange`, etc.), props privadas/internas (prefixo `_`) e atributos HTML nativos herdados (`disabled`, `type`, `className`, `style`, refs, nós `ReactNode` internos como os slots de ícone) que não fazem sentido editar à mão devem sair da tabela de Controls com `table: { disable: true }` no `argTypes` correspondente, um a um. **Não uses `parameters.controls.include`/`exclude`** para este fim — este projeto não tem `docgen` configurado, e sem ele o Storybook cruza a whitelist com uma lista de props inferidas vazia, o que apaga a tabela de Controls por completo (confirmado em `Button.stories.tsx`).
- **Mostrar apenas o que é visual/funcional:** o painel de Controls deve conter só as props que alteram a aparência ou o comportamento visível do componente — Tamanho, Hierarquia, Estado, Ícones, Texto. Nada de `className`, `style`, `type`, refs ou outros detalhes de implementação.
- **Controlos amigáveis, com labels em português:** propriedades com 3 ou mais opções (ex. tamanho, hierarquia, estado) usam sempre `control: { type: 'select' }` (dropdown — ver regra do Playground estilo OutSystems na secção 3); booleans/opções binárias usam `control: 'boolean'` ou `control: { type: 'inline-radio' }`. Nunca deixes um enum cair no controlo `text` livre. Define `name` e `description` em português claro em vez do nome literal da prop TypeScript.
- **Booleanos precisam de valor explícito nos `args` da story `Playground`** (`destructive: false`, `iconLeading: false`, etc.) — nunca deixes um `control: 'boolean'` sem o arg correspondente definido. Sem um valor explícito (mesmo `false`), o addon Controls não sabe que switch desenhar e mostra um botão intermédio "Set boolean" em vez do toggle direto — confirmado em `Button.stories.tsx`.
- **Nomes de ícones, países ou qualquer valor de um conjunto finito conhecido usam sempre `control: { type: 'select' }` com uma lista curada — nunca `control: 'text'`.** Isto aplica-se a `Icon`'s `name` (Material Symbols), `CountryIcon`'s `code` (ISO 3166-1) e a qualquer prop futura do mesmo género. Texto livre convida a typos silenciosos (um nome de ícone inexistente não dá erro, simplesmente não renderiza nada). Ver `nameOptions`/`countryCodeOptions` em `Icon.stories.tsx`/`CountryIcon.stories.tsx` — listas curadas, não exaustivas (a lista completa de ~3000 Material Symbols ou dos 431 flags vendored não cabe num dropdown utilizável), mas cobrindo os valores realmente usados no design system.
- **Slots visuais (`flagSwap`, `avatarSwap`, `iconSwap`, etc.) que dependem de outro valor (ex.: só fazem sentido quando `icon: 'Country'`) precisam de um pseudo-arg com dropdown que os componha de facto** — não bastam esconder o slot inteiro (`table: { disable: true }`) sem dar ao utilizador nenhuma forma de o testar. Ver o padrão `BadgePlayground`/`TagPlayground`/`InputPlayground` (componentes-wrapper definidos no topo do `.stories.tsx`, nunca no componente de produção) em `Badge.stories.tsx`/`Tag.stories.tsx`/`Input.stories.tsx`: o wrapper aceita o pseudo-arg (`countryCode`, `iconSwapName`, etc.), compõe o `ReactNode` real internamente, e é esse wrapper — não o componente de produção — que vai em `meta.component`/`satisfies Meta<typeof X>`. Sem o wrapper, TypeScript rejeita o pseudo-arg em `meta.args`/`argTypes` (não existe na prop-type do componente real).
- **Divulgação sequencial e condicional dos Controls (regra transversal, obrigatória):** um controlo que só é relevante sob outra variante específica (ex.: `errorMessage` só importa quando `destructive` está ativo; `leadingTextAddon` só quando `type === 'leadingText'`; `checked`/`disabled` do Tag só quando `checkbox` está ativo) declara sempre `if: { arg: '<argControlador>', eq: '<valor>' }` ou `if: { arg: '<argControlador>', truthy: true }` no seu `argTypes` — a API nativa do Storybook Controls, não um mecanismo caseiro. Nunca mostres simultaneamente todas as opções de todas as variantes de uma vez; o painel de Options deve reagir à escolha atual tal como o próprio componente reage. Ver `errorMessage`/`iconSwapName`/`leadingTextAddon`/`trailingButtonLabel` em `Input.stories.tsx` e `countryCode`/`count`/`checked`/`disabled` em `Tag.stories.tsx`/`Badge.stories.tsx` como referência.

### 3. Padrão de Documentação MDX (Split Playground)

Cada componente tem um `NomeDoComponente.mdx` associado à sua história via `<Meta of={NomeDoComponenteStories} />` — este ficheiro substitui a página de Docs gerada automaticamente, por isso o `meta` do `.stories.tsx` correspondente **não** deve ter a tag `'autodocs'` (as duas coisas juntas geram um conflito de páginas Docs duplicadas no build).

Esta é a **regra de UX transversal, obrigatória para o `.mdx` de todos os componentes** do Design System — não é específica do Button.

#### Estrutura obrigatória do `.mdx`

1. **Cabeçalho:** título (`# NomeDoComponente`) e uma descrição curta de 1-2 frases.
2. **Mini índice (TOC)** logo a seguir ao cabeçalho: uma caixa (`bg-secondary`, `border-secondary`, `rounded-lg`) com links para as 5 secções principais — `#playground`, `#diretrizes-ux`, `#anatomia-e-boas-praticas`, `#estados`, `#acessibilidade`. Estes 5 títulos usam sempre `<h2 id="...">` explícito (nunca `##` markdown puro) — este projeto não gera slugs automáticos de heading previsíveis, por isso o `id` tem de ser escrito à mão para a âncora funcionar.
   - **Os links do TOC nunca navegam** — mantém `href="#id"` (âncora relativa pura, nunca um caminho absoluto nem `window.location.href`) **e** um `onClick` que faz `event.preventDefault()` + `document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })`. Define o handler uma vez no topo do `.mdx` com `export const scrollToSection = (event, id) => {...}` e reutiliza-o em cada link. Isto evita qualquer navegação/reload que possa escapar do iframe de preview do Storybook.
3. **`<h2 id="playground">Playground</h2>` — arquitetura de 2 colunas estilo OutSystems UI, em grid responsivo:** ver regra obrigatória completa na secção "Playground estilo OutSystems UI" abaixo — resumo:
   - Container com borda partilhada (`border`, `rounded-lg`, `overflow-hidden`) e **`relative isolate z-10`** — cria um contexto de stacking próprio para impedir que elementos internos do Storybook (grelhas de fundo do preview, loaders) vazem por cima do conteúdo seguinte da página.
   - Layout: `grid grid-cols-1 md:grid-cols-[1.6fr_1fr] items-stretch` — 1 coluna em ecrãs estreitos, proporção 1.6fr/1fr a partir de `md:`. O divisor entre colunas é `border-b md:border-b-0 md:border-r` (horizontal no mobile, vertical no desktop).
   - **Esquerda (Preview):** cabeçalho minimalista `Preview` (texto pequeno, maiúsculas, `border-b`) + área de canvas `bg-secondary` com `flex items-center justify-center min-h-[280px]`, usando `<Story of={NomeDoComponenteStories.Playground} inline />` — **não uses `<Canvas>` aqui**, cria uma caixa duplicada dentro do card que já tem borda própria.
   - **Direita (Options):** cabeçalho minimalista `Options`, mesmo estilo do `Preview`. Ver "Playground estilo OutSystems UI" abaixo para o conteúdo.
4. **Documentação rica abaixo da grelha**, nesta ordem (a corresponder ao TOC): Diretrizes de UX & Quando Usar, Anatomia & Boas Práticas, Estados, Acessibilidade (a11y).
5. **Variantes secundárias incorporadas, não na sidebar:** stories que só existem para ilustrar uma variante (tamanhos, ícones, estados, hierarquias, destrutivo, etc.) levam `tags: ['!dev']` no `.stories.tsx` — isto remove-as da árvore de navegação da sidebar (só ficam lá `Docs` e `Playground`) sem as apagar. As variantes que formam uma **galeria de exemplos visuais** (ex: hierarquias, destrutivo, tamanhos, ícones) vão dentro do widget de tabs (ver abaixo); uma variante isolada e contextual (ex: `Disabled` junto à tabela de Estados) pode continuar como um `<Canvas of={...} withToolbar={false} sourceState="none" />` solto, embrulhado num `<div className="relative isolate my-6">`. Aqui, ao contrário do Playground, `<Canvas>` é a escolha certa — não há um card próprio à volta a competir com a sua moldura.

#### Galeria de exemplos em tabs

Quando houver **várias** variantes visuais para mostrar lado a lado (ex: Hierarquias, Destrutivo, Tamanhos, Ícones), não as empilhes como vários `<Canvas>` verticais seguidos — isso produz um documento comprido e repetitivo. O Storybook não tem um doc-block nativo de tabs, por isso usa-se um componente local simples, definido uma vez no topo do `.mdx`:

```jsx
import { useState } from 'react';
import { cn } from '../../utils/cn';

export const ExampleGallery = ({ tabs }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="my-6 rounded-lg border border-secondary overflow-hidden">
      <div role="tablist" className="flex gap-1 border-b border-secondary bg-secondary px-2 pt-2">
        {tabs.map((tab, i) => (
          <button key={tab.label} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)}
            className={cn('rounded-t-md border border-b-0 border-transparent px-4 py-2 -mb-px text-sm font-semibold',
              i === active ? 'bg-primary text-primary border-secondary' : 'text-tertiary hover:text-secondary')}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="relative isolate bg-primary p-6">{tabs[active].content}</div>
    </div>
  );
};
```

Uso: `<ExampleGallery tabs={[{ label: 'Tamanhos', content: <Canvas of={X.Sizes} withToolbar={false} sourceState="none" /> }, ...]} />`. Só o conteúdo do tab ativo é inserido na árvore (`{tabs[active].content}`), por isso os outros `<Canvas>` não montam iframes escondidos.

#### Canvas solto (ex: Estados) — encolher ao tamanho do conteúdo

Um `<Canvas>` isolado (fora da grelha do Playground e fora do `ExampleGallery`, ex: o exemplo `Disabled` junto à tabela de Estados) vem com `padding: 32px` vertical por omissão no wrapper interno `.docs-story` do próprio `@storybook/addon-docs` — isto cria uma caixa bem maior do que o componente lá dentro, lida como "espaço morto". Encolhe-a com uma sobreposição de utilidade no wrapper que já usas para isolamento:

```jsx
<div className="relative isolate my-6 [&_.docs-story]:!py-4">
  <Canvas of={NomeDoComponenteStories.Disabled} withToolbar={false} sourceState="none" />
</div>
```

Não removas o padding por completo (`!py-0`) — o conteúdo fica colado à borda do card. `!py-4` (16px) é o valor confirmado que encolhe a caixa sem tocar o conteúdo na moldura.

#### Playground estilo OutSystems UI (regra transversal, obrigatória)

> **REGRA OBRIGATÓRIA:** O Playground dos componentes deve seguir estritamente a arquitetura de 2 colunas da OutSystems UI (Preview a 100% da altura + Options compactas com `controls.expanded: false`). **NUNCA** exibir tabelas com Description/Default ou emojis de grupo no Playground.

Não é um catálogo de documentação técnica nem um Property Inspector de base de dados — é um painel de teste rápido, denso apenas em interatividade, nunca em texto.

**1. `parameters.controls.expanded: false`** no `meta` do `.stories.tsx` (não só na story `Playground` — aplica-se ao componente todo, incluindo o painel Controls interativo da tab Canvas):

```ts
parameters: {
  layout: 'centered',
  controls: { expanded: false },
},
```

Isto é a intenção documentada do Storybook (limita a tabela a Name+Control), mas **não é suficiente sozinho** para a página Docs nesta versão do `@storybook/addon-docs` (confirmado no código-fonte de `blocks.js`: o bloco `<Controls>` MDX não expõe nenhuma prop pública `compact`/`expanded` — só `of`/`include`/`exclude`/`sort`). Por isso o CSS abaixo (ponto 3) continua obrigatório como garantia — trata `expanded: false` como a intenção declarada e o CSS como a implementação que a torna real na página Docs.

**2. Controlos simplificados, nunca dropdowns/tabelas verbosas:**
- **Propriedades com 3 ou mais opções** (ex. `size`, `hierarchy`, `state`) → força sempre `control: { type: 'select' }` (dropdown), independentemente de o enum ser curto ou longo.
- **Propriedades binárias** (`destructive`, `iconLeading`, `iconTrailing`, `disabled`, etc.) → `control: 'boolean'` (toggle nativo) ou `control: { type: 'inline-radio' }`.
- Texto (`children`/`label`) → `control: 'text'`, sem alterações extra.
- O Playground deve ser sempre de 2 colunas no padrão OutSystems UI (`controls.expanded: false`), usando select/dropdown para ≥3 opções e toggles/inline-radio para booleanos.

**3. Lista vertical, nunca tabela de base de dados:** o `<table>` nativo do bloco `<Controls>` é forçado por CSS a comportar-se como uma lista de linhas flex — label discreta (cinza, `text-sm`/14px) à esquerda, controlo à direita — e as colunas Description/Default (2.ª e 3.ª) e o `<thead>` ficam sempre escondidos:

```jsx
<div
  className={cn(
    'flex flex-col gap-2xl p-6',
    '[&_table]:block [&_table]:w-full [&_table]:m-0 [&_table]:border-0',
    '[&_tbody]:flex [&_tbody]:flex-col [&_tbody]:gap-lg',
    '[&_thead]:hidden',
    '[&_tr]:flex [&_tr]:items-center [&_tr]:justify-between [&_tr]:gap-xl [&_tr]:border-0',
    '[&_td]:border-0 [&_td]:p-0',
    '[&_td:nth-child(2)]:hidden [&_td:nth-child(3)]:hidden',
    '[&_td:nth-child(1)]:text-sm [&_td:nth-child(1)]:font-normal [&_td:nth-child(1)]:text-tertiary [&_td:nth-child(1)]:whitespace-nowrap',
  )}
>
  <Controls of={ButtonStories.Playground} include={['Tamanho', 'Hierarquia', 'Estado', 'Destrutivo']} />
  <Controls of={ButtonStories.Playground} include={['Ícone à esquerda', 'Ícone à direita']} />
  <Controls of={ButtonStories.Playground} include={['Texto']} />
</div>
```

- `display:none` nos `td:nth-child(2)`/`nth-child(3)` remove-os do fluxo flex do `<tr>` — o `justify-between` continua a funcionar corretamente entre o 1.º (label) e o 4.º (controlo) `<td>` visíveis, apesar de continuarem no DOM entre eles.
- **Sem cabeçalho de tabela algum** — nem "Propriedade"/"Valor" escrito à mão, nem "Name"/"Control" nativo. O cabeçalho da coluna inteira já é o `Options` minimalista no topo da coluna (ver secção 3, ponto 3 acima).
- **Agrupamento só por espaço em branco** (`gap-2xl` = 2rem entre os 3 blocos `<Controls>`) — **nunca** um cabeçalho de categoria com emoji (🎨/🧩/📝), fundo colorido ou borda a separar grupos. Se um componente tiver muitas props e precisar mesmo de alguma etiqueta de grupo, usa só texto simples sem emoji, sem `bg-*`, sem `border-t` — mas o padrão por omissão é whitespace puro.

**4. Guardrails contra overlap:** nenhum elemento do documento abaixo do Playground (Diretrizes, Anatomia, Estados, Acessibilidade) deve usar `position: absolute` nem margens negativas — só `relative isolate` para isolamento de stacking context (ver "Canvas solto" abaixo) e espaçamento positivo (`mt-16`/`my-6`). Os links do TOC mantêm-se âncoras relativas puras (`href="#id"` + `scrollIntoView`, nunca navegação real — ver secção 3, ponto 2).

**Armadilha crítica confirmada no código-fonte (`storybook/preview-api`, `filterArgTypes.ts`):** o `include`/`exclude` do bloco `<Controls>` filtra por `argType.name` — o **nome de exibição em português** que definiste em `meta.argTypes` (`name: 'Tamanho'`) — e só cai para a chave da prop (`size`) se `name` não estiver definido. Como este projeto define sempre `name` em português (regra 2), **o `include` tem de listar os nomes em português, nunca as chaves TypeScript** (`'Tamanho'`, não `'size'`). Usar a chave errada não dá erro — a tabela simplesmente aparece vazia ("This story has no controls"), fácil de confundir com outro bug. É diferente (mas do mesmo género) do problema já conhecido com `parameters.controls.include`/`exclude` (que cruza com `docgen`, inexistente neste projeto, e também esvazia a tabela) — nenhum dos dois mecanismos de include/exclude deve ser usado às cegas sem verificar visualmente o resultado.

#### Limpeza visual — espaçamento em vez de linhas

**Não uses `border-t`/`hr` entre cada secção `<h2>`.** Várias linhas horizontais ao longo do documento leem como ruído. Usa só espaçamento vertical generoso (`mt-16 mb-6` em cada `<h2>` de secção) para a separação — o próprio espaço em branco já comunica onde uma secção acaba e outra começa. A **única** linha divisória do documento é um sublinhado subtil (`border-b border-secondary`) logo a seguir ao parágrafo de introdução, antes do TOC — não repitas isto mais nenhuma vez no resto do ficheiro.

**Armadilha conhecida:** tabelas em sintaxe markdown (`| col | col |`) **não renderizam** neste projeto — não há `remark-gfm` configurado no pipeline MDX, por isso o texto aparece literal com os `|`. Sempre que precisares de uma tabela dentro de um `.mdx`, escreve HTML nativo (`<table><thead>...`) em vez de sintaxe markdown (confirmado em `Button.mdx`).

---

## 🎨 Ícones, Sidebar e Altura do Playground (regras transversais, obrigatórias)

Estas regras nasceram de bugs reais encontrados e corrigidos em produção — mantém-nas sempre que criares ou alterares qualquer componente.

### Ícones — usa sempre o componente `Icon` (Material Symbols)

**Nunca desenhes um SVG à mão para um glifo que já existe nos Material Symbols** (ver `fonts.google.com/icons`). `Icon` (`src/components/Icon/Icon.tsx`) é a única fonte de ícones funcionais do design system — `Textarea`'s antigo `HelpCircleIcon`/`AlertCircleIcon` (SVGs à mão, inconsistentes com o `Icon name="help"` já usado em `Input`) foram removidos e substituídos por `Icon` por esta razão. SVGs à mão só se justificam para gráficos genuinamente não-icónicos (ex.: `CardIcon` em `Input.stories.tsx`, um mockup de cartão de crédito, não um glifo).

**Armadilha crítica confirmada (afeta todo o sistema, não só um componente):** o tamanho de fonte de `Icon` é definido via `style={{ fontSize: ... }}` inline — **nunca** através de uma classe Tailwind `text-[Npx]`. Isto não é estético: a stylesheet de fallback que a Google Fonts serve para `Material Symbols Outlined` (servida a alguns navegadores/user-agents, incluindo o Chromium do Playwright usado para QA) inclui a sua própria regra `.material-symbols-outlined { font-size: 24px; ... }`, escrita como CSS **sem `@layer`**. Numa cascata CSS, uma regra sem `@layer` tem sempre prioridade sobre qualquer regra dentro de `@layer` — e as utilities do Tailwind (`text-[16px]`, etc.) vivem todas em `@layer utilities`. O resultado, antes desta correção: todo o ícone renderizava a 24px fixos independentemente do `size` pedido — maior do que devido e descentrado nas caixas menores (`xs`/`sm`). Um `style` inline não tem esta competição (vence qualquer stylesheet externa, `!important` à parte), por isso é o único mecanismo seguro para esta propriedade especificamente. Nunca reintroduzas `text-[Npx]` no `sizeStyles` de `Icon.tsx`.

### Nomenclatura da Sidebar — espaço entre palavras + ordem alfabética

Todo `title:` em `*.stories.tsx` usa **Title Case com espaço entre palavras** (`'Components/Input Dropdown'`, `'Components/Social Button Group'`) — **nunca** o nome literal da pasta/componente colado (`'Components/InputDropdown'`). Um novo componente sem espaço no título quebra esta regra mesmo que o resto do ficheiro esteja correto.

A ordem da sidebar dentro de "Components" é **sempre alfabética automática** — `.storybook/preview.tsx`'s `options.storySort.order` não lista os componentes um a um (só fixa `Introduction`/`Foundations`/`Components` como grupos de topo). Uma lista manual desalinha-se do menu real sempre que um componente é adicionado ou renomeado; não reintroduzas uma sub-lista explícita de componentes ali.

### Altura fixa do Playground — regra central, não por componente

O painel "Options" do Playground (a `div` com a classe `playground-options-list`, ver secção 3) tem um `min-height: 420px` definido **centralmente** em `.storybook/preview-styles.css` — nunca por `.mdx` individual. Como o grid do Playground usa `items-stretch`, sem este piso a coluna "Preview" encolhe/cresce em sincronia sempre que os Controls mudam de número de linhas visíveis (ex.: divulgação sequencial via `if` — ver secção 2), produzindo um glitch de reflow visível enquanto o utilizador experimenta o componente. Se um componente futuro tiver mesmo mais opções simultâneas do que este piso comporta, ajusta o valor central em `preview-styles.css` — nunca adiciones um `min-h-*` local e divergente num `.mdx` individual.