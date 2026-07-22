import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sonyx9.github.io',
  base: '/ux-mind',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // Base styles come from src/styles/global.css (imported in BaseLayout),
    // so we disable the integration's own injected base to avoid a duplicate
    // Tailwind build.
    tailwind({ applyBaseStyles: false }),
    mdx(),
    // sitemap() je vypnutá — balíček @astrojs/sitemap v této verzi padá při buildu
    // (bug s absolutními cestami). Po upgradu Astro/sitemap znovu prověřit.
    // sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
