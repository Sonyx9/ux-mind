import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// Pozn.: sitemap.xml generuje scripts/postbuild.mjs (integrace @astrojs/sitemap
// je vypnutá kvůli bugu s absolutními cestami v této verzi).

export default defineConfig({
  site: 'https://sonyx9.github.io',
  base: '/ux-mind',
  // Staré URL služeb — přesunuto pod /sluzby/ kvůli konzistentnímu stromu
  // Pozn.: cíl musí obsahovat base prefix — Astro ho k destinaci sám nepřidává
  redirects: {
    '/eye-tracking': '/ux-mind/sluzby/eye-tracking',
    '/ux-vyzkum': '/ux-mind/sluzby/ux-vyzkum',
    '/en/eye-tracking': '/ux-mind/en/services/eye-tracking',
    '/en/ux-research': '/ux-mind/en/services/ux-research',
    '/de/eye-tracking': '/ux-mind/de/leistungen/eye-tracking',
    '/de/ux-forschung': '/ux-mind/de/leistungen/ux-forschung',
    '/fr/eye-tracking': '/ux-mind/fr/services/eye-tracking',
    '/fr/recherche-ux': '/ux-mind/fr/services/recherche-ux',
    '/es/eye-tracking': '/ux-mind/es/servicios/eye-tracking',
    '/es/investigacion-ux': '/ux-mind/es/servicios/investigacion-ux',
  },
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en', 'de', 'fr', 'es'],
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
