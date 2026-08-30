import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// Pozn.: sitemap.xml (včetně obrázkové) generuje scripts/postbuild.mjs po buildu.

export default defineConfig({
  // Web běží na custom doméně uxmind.cz, kterou GitHub Pages servíruje v kořeni,
  // proto ŽÁDNÝ base prefix (assety i odkazy jsou v /). CNAME je v public/CNAME.
  site: 'https://uxmind.cz',
  // CSS bundle inlineovat do <head> — ušetří render-blocking request (klíčové pro
  // LCP/FCP na mobilu; jinak se web nevykreslí, dokud se nestáhne externí .css).
  build: { inlineStylesheets: 'always' },
  redirects: {
    // Staré URL služeb — přesunuto pod /sluzby/ kvůli konzistentnímu stromu
    '/eye-tracking': '/sluzby/eye-tracking',
    '/ux-vyzkum': '/sluzby/ux-vyzkum',
    '/en/eye-tracking': '/en/services/eye-tracking',
    '/en/ux-research': '/en/services/ux-research',
    '/de/eye-tracking': '/de/leistungen/eye-tracking',
    '/de/ux-forschung': '/de/leistungen/ux-forschung',
    // FR a ES mutace se nebuildují (nechceme je mít dohledatelné). Staré/indexované
    // URL 301 přesměrujeme na anglický protějšek, ať nevznikají 404.
    '/fr': '/en/', '/es': '/en/',
    '/fr/services': '/en/services', '/es/servicios': '/en/services',
    '/fr/services/packs-de-test': '/en/services/test-packages', '/es/servicios/paquetes-de-prueba': '/en/services/test-packages',
    '/fr/services/audit-ux': '/en/services/ux-audit', '/es/servicios/auditoria-ux': '/en/services/ux-audit',
    '/fr/services/tests-utilisateurs': '/en/services/user-testing', '/es/servicios/pruebas-de-usuario': '/en/services/user-testing',
    '/fr/services/eye-tracking': '/en/services/eye-tracking', '/es/servicios/eye-tracking': '/en/services/eye-tracking',
    '/fr/eye-tracking': '/en/services/eye-tracking', '/es/eye-tracking': '/en/services/eye-tracking',
    '/fr/services/recherche-terrain': '/en/services/field-research', '/es/servicios/investigacion-de-campo': '/en/services/field-research',
    '/fr/services/recherche-ux': '/en/services/ux-research', '/es/servicios/investigacion-ux': '/en/services/ux-research',
    '/fr/recherche-ux': '/en/services/ux-research', '/es/investigacion-ux': '/en/services/ux-research',
    '/fr/etudes-de-cas': '/en/case-studies', '/es/casos-de-estudio': '/en/case-studies',
    '/fr/etudes-de-cas/portail-carriere-automobile': '/en/case-studies/career-portal-automotive', '/es/casos-de-estudio/portal-empleo-automocion': '/en/case-studies/career-portal-automotive',
    '/fr/etudes-de-cas/backend-stories': '/en/case-studies/backend-stories', '/es/casos-de-estudio/backend-stories': '/en/case-studies/backend-stories',
    '/fr/etudes-de-cas/photographie-produit-e-commerce': '/en/case-studies/product-photography-e-commerce', '/es/casos-de-estudio/fotografia-producto-e-commerce': '/en/case-studies/product-photography-e-commerce',
    '/fr/etudes-de-cas/bannieres-direction-regard': '/en/case-studies/ad-banners-gaze-direction', '/es/casos-de-estudio/banners-direccion-mirada': '/en/case-studies/ad-banners-gaze-direction',
    '/fr/etudes-de-cas/modeles-boutique-en-ligne': '/en/case-studies/e-shop-templates', '/es/casos-de-estudio/plantillas-tienda-online': '/en/case-studies/e-shop-templates',
    '/fr/etudes-de-cas/panneaux-sport-marketing': '/en/case-studies/billboards-sports-marketing', '/es/casos-de-estudio/vallas-marketing-deportivo': '/en/case-studies/billboards-sports-marketing',
    '/fr/a-propos': '/en/about', '/es/sobre-nosotros': '/en/about',
    '/fr/partenaires': '/en/partners', '/es/socios': '/en/partners',
    '/fr/contact': '/en/contact', '/es/contacto': '/en/contact',
    '/fr/politique-cookies': '/en/cookie-policy', '/es/politica-de-cookies': '/en/cookie-policy',
  },
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
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
