import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// Pozn.: sitemap.xml generuje scripts/postbuild.mjs (integrace @astrojs/sitemap
// je vypnutá kvůli bugu s absolutními cestami v této verzi).

export default defineConfig({
  // Web běží na custom doméně uxmind.cz, kterou GitHub Pages servíruje v kořeni,
  // proto ŽÁDNÝ base prefix (assety i odkazy jsou v /). CNAME je v public/CNAME.
  site: 'https://uxmind.cz',
  // Staré URL služeb — přesunuto pod /sluzby/ kvůli konzistentnímu stromu
  redirects: {
    '/eye-tracking': '/sluzby/eye-tracking',
    '/ux-vyzkum': '/sluzby/ux-vyzkum',
    '/en/eye-tracking': '/en/services/eye-tracking',
    '/en/ux-research': '/en/services/ux-research',
    '/de/eye-tracking': '/de/leistungen/eye-tracking',
    '/de/ux-forschung': '/de/leistungen/ux-forschung',
    '/fr/eye-tracking': '/fr/services/eye-tracking',
    '/fr/recherche-ux': '/fr/services/recherche-ux',
    '/es/eye-tracking': '/es/servicios/eye-tracking',
    '/es/investigacion-ux': '/es/servicios/investigacion-ux',
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
