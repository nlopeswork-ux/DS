import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import './preview-styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    // Caixa da story ajustada ao conteúdo, sem altura fixa/gigante.
    layout: 'centered',

    // Ordem fixa da sidebar: Introduction → Foundations (Colors, Typography,
    // Spacing, Shadows & Radius) → Components. Grupos/páginas fora desta
    // lista (novos componentes, etc.) caem no fim por ordem alfabética
    // (comportamento default do `storySort` quando o item não está listado).
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colors', 'Typography', 'Spacing', 'Shadows & Radius', 'Icons'], 'Components', ['Icon', 'Button', 'Badge', 'Badge Group'], '*'],
      },
    },
  },
  // Toggle de tema na toolbar do Storybook. 'light' é o padrão — o Dark
  // Mode dos tokens (src/tokens/globals.css) só é ativado explicitamente
  // por esta seleção, nunca pelo prefers-color-scheme do sistema.
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  // Aplica os tokens bg-primary/text-primary à superfície do canvas, para
  // que o fundo e o texto mudem em conjunto com o tema selecionado — sem
  // isto, o canvas fica sempre branco e o texto do Dark Mode fica ilegível.
  // Sem altura fixa: a caixa deve ocupar apenas o espaço do conteúdo.
  decorators: [
    (Story, context) => (
      <div data-theme={context.globals.theme ?? 'light'} className="bg-primary text-primary inline-block p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
