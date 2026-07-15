import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sonyx9.github.io',
  base: '/ux-mind',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
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
    // sitemap() is disabled on Windows due to a known absolute-path bug in the sitemap package.
    // Uncomment the line below when deploying on Linux/CI (GitHub Actions will work fine).
    // sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
