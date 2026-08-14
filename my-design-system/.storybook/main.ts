import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  // Serves project-root `public/` (flags, favicon, icons.svg) inside
  // Storybook's dev server and static build — without this, only the
  // main Vite app (index.html) can reach those assets.
  "staticDirs": ["../public"]
};
export default config;