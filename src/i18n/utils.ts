export type Lang = 'cs' | 'en' | 'de' | 'fr' | 'es';

export const defaultLang: Lang = 'cs';

// Seznam jazyků pro přepínač (pořadí = pořadí v menu)
export const languages: { code: Lang; label: string }[] = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

// Maps page keys to URLs per language
const urlMap: Record<Lang, Record<string, string>> = {
  // Strom služeb je ve všech jazycích vnořený pod services (česká struktura je předloha)
  cs: {
    home: '/',
    services: '/sluzby',
    'test-packages': '/sluzby/testovaci-balicky',
    'ux-audit': '/sluzby/ux-audit',
    'user-testing': '/sluzby/testovani-uzivatelu',
    'eye-tracking': '/sluzby/eye-tracking',
    'field-research': '/sluzby/terenni-mereni',
    'ux-research': '/sluzby/ux-vyzkum',
    about: '/o-nas',
    segments: '/segmenty',
    'seg-e-shopy': '/segmenty/e-shopy',
    'seg-weby': '/segmenty/weby',
    'seg-sport': '/segmenty/sport-a-stadiony',
    'seg-automotive': '/segmenty/automotive',
    'seg-univerzity': '/segmenty/univerzity-a-vyzkum',
    'seg-doprava': '/segmenty/doprava-a-mesta',
    'seg-prumysl': '/segmenty/prumysl-a-energetika',
    'seg-zdravotnictvi': '/segmenty/zdravotnictvi',
    'seg-finance': '/segmenty/finance-a-poradenstvi',
    'seg-letectvi': '/segmenty/letectvi',
    'case-studies': '/pripadove-studie',
    'cs-karierni-portal-automotive': '/pripadove-studie/karierni-portal-automotive',
    'cs-backend-stories': '/pripadove-studie/backend-stories',
    'cs-produktove-fotografie-e-commerce': '/pripadove-studie/produktove-fotografie-e-commerce',
    'cs-reklamni-bannery-smer-pohledu': '/pripadove-studie/reklamni-bannery-smer-pohledu',
    'cs-sablony-e-shopu': '/pripadove-studie/sablony-e-shopu',
    'cs-billboardy-sport-marketing': '/pripadove-studie/billboardy-sport-marketing',
    blog: '/blog',
    partners: '/partneri',
    contact: '/kontakt',
    cookies: '/zasady-cookies',
  },
  en: {
    home: '/en/',
    services: '/en/services',
    'test-packages': '/en/services/test-packages',
    'ux-audit': '/en/services/ux-audit',
    'user-testing': '/en/services/user-testing',
    'eye-tracking': '/en/services/eye-tracking',
    'field-research': '/en/services/field-research',
    'ux-research': '/en/services/ux-research',
    'case-studies': '/en/case-studies',
    'cs-karierni-portal-automotive': '/en/case-studies/career-portal-automotive',
    'cs-backend-stories': '/en/case-studies/backend-stories',
    'cs-produktove-fotografie-e-commerce': '/en/case-studies/product-photography-e-commerce',
    'cs-reklamni-bannery-smer-pohledu': '/en/case-studies/ad-banners-gaze-direction',
    'cs-sablony-e-shopu': '/en/case-studies/e-shop-templates',
    'cs-billboardy-sport-marketing': '/en/case-studies/billboards-sports-marketing',
    about: '/en/about',
    partners: '/en/partners',
    blog: '/en/blog',
    contact: '/en/contact',
    cookies: '/en/cookie-policy',
  },
  de: {
    home: '/de/',
    services: '/de/leistungen',
    'test-packages': '/de/leistungen/test-pakete',
    'ux-audit': '/de/leistungen/ux-audit',
    'user-testing': '/de/leistungen/nutzertests',
    'eye-tracking': '/de/leistungen/eye-tracking',
    'field-research': '/de/leistungen/feldforschung',
    'ux-research': '/de/leistungen/ux-forschung',
    'case-studies': '/de/fallstudien',
    'cs-karierni-portal-automotive': '/de/fallstudien/karriereportal-automotive',
    'cs-backend-stories': '/de/fallstudien/backend-stories',
    'cs-produktove-fotografie-e-commerce': '/de/fallstudien/produktfotografie-e-commerce',
    'cs-reklamni-bannery-smer-pohledu': '/de/fallstudien/werbebanner-blickrichtung',
    'cs-sablony-e-shopu': '/de/fallstudien/shop-vorlagen',
    'cs-billboardy-sport-marketing': '/de/fallstudien/billboards-sportmarketing',
    about: '/de/ueber-uns',
    partners: '/de/partner',
    blog: '/de/blog',
    contact: '/de/kontakt',
    cookies: '/de/cookie-richtlinie',
  },
  fr: {
    home: '/fr/',
    services: '/fr/services',
    'test-packages': '/fr/services/packs-de-test',
    'ux-audit': '/fr/services/audit-ux',
    'user-testing': '/fr/services/tests-utilisateurs',
    'eye-tracking': '/fr/services/eye-tracking',
    'field-research': '/fr/services/recherche-terrain',
    'ux-research': '/fr/services/recherche-ux',
    'case-studies': '/fr/etudes-de-cas',
    'cs-karierni-portal-automotive': '/fr/etudes-de-cas/portail-carriere-automobile',
    'cs-backend-stories': '/fr/etudes-de-cas/backend-stories',
    'cs-produktove-fotografie-e-commerce': '/fr/etudes-de-cas/photographie-produit-e-commerce',
    'cs-reklamni-bannery-smer-pohledu': '/fr/etudes-de-cas/bannieres-direction-regard',
    'cs-sablony-e-shopu': '/fr/etudes-de-cas/modeles-boutique-en-ligne',
    'cs-billboardy-sport-marketing': '/fr/etudes-de-cas/panneaux-sport-marketing',
    about: '/fr/a-propos',
    partners: '/fr/partenaires',
    blog: '/fr/blog',
    contact: '/fr/contact',
    cookies: '/fr/politique-cookies',
  },
  es: {
    home: '/es/',
    services: '/es/servicios',
    'test-packages': '/es/servicios/paquetes-de-prueba',
    'ux-audit': '/es/servicios/auditoria-ux',
    'user-testing': '/es/servicios/pruebas-de-usuario',
    'eye-tracking': '/es/servicios/eye-tracking',
    'field-research': '/es/servicios/investigacion-de-campo',
    'ux-research': '/es/servicios/investigacion-ux',
    'case-studies': '/es/casos-de-estudio',
    'cs-karierni-portal-automotive': '/es/casos-de-estudio/portal-empleo-automocion',
    'cs-backend-stories': '/es/casos-de-estudio/backend-stories',
    'cs-produktove-fotografie-e-commerce': '/es/casos-de-estudio/fotografia-producto-e-commerce',
    'cs-reklamni-bannery-smer-pohledu': '/es/casos-de-estudio/banners-direccion-mirada',
    'cs-sablony-e-shopu': '/es/casos-de-estudio/plantillas-tienda-online',
    'cs-billboardy-sport-marketing': '/es/casos-de-estudio/vallas-marketing-deportivo',
    about: '/es/sobre-nosotros',
    partners: '/es/socios',
    blog: '/es/blog',
    contact: '/es/contacto',
    cookies: '/es/politica-de-cookies',
  },
};

// Mapa URL cesty → klíč stránky (odvozeno z urlMap)
const pathToKey: Record<string, string> = {};
for (const lang of Object.keys(urlMap) as Lang[]) {
  for (const [key, path] of Object.entries(urlMap[lang])) {
    pathToKey[path.replace(/\/$/, '') || '/'] = key;
    pathToKey[path] = key;
  }
}

export function getLang(pathname: string): Lang {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/de')) return 'de';
  if (pathname.startsWith('/fr')) return 'fr';
  if (pathname.startsWith('/es')) return 'es';
  return 'cs';
}

// Cesta ke stejné stránce v cílovém jazyce
export function getPathInLang(pathname: string, targetLang: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  const key = pathToKey[clean] ?? pathToKey[pathname] ?? 'home';
  return urlMap[targetLang][key] ?? urlMap[targetLang].home;
}

// Lokalizovaná cesta ke stránce dle klíče (např. 'cookies', 'contact')
export function localizedPath(lang: Lang, key: string): string {
  return urlMap[lang]?.[key] ?? urlMap[lang].home;
}

// Zpětná kompatibilita: „další“ jazyk (cs ↔ en)
export function getAlternatePath(pathname: string): string {
  const targetLang: Lang = getLang(pathname) === 'cs' ? 'en' : 'cs';
  return getPathInLang(pathname, targetLang);
}

const navLabels: Record<Lang, Record<string, string>> = {
  cs: { services: 'Služby', 'test-packages': 'Testovací balíčky', 'ux-audit': 'UX Audit', 'user-testing': 'Testování uživatelů', 'field-research': 'Terénní měření', 'ux-research': 'UX Výzkum', 'case-studies': 'Studie', segments: 'Pro koho', contact: 'Kontakt', about: 'O nás', partners: 'Partneři' },
  en: { services: 'Services', 'test-packages': 'Test Packages', 'ux-audit': 'UX Audit', 'user-testing': 'User Testing', 'field-research': 'Field Research', 'ux-research': 'UX Research', 'case-studies': 'Case Studies', contact: 'Contact', about: 'About', partners: 'Partners' },
  de: { services: 'Leistungen', 'test-packages': 'Test-Pakete', 'ux-audit': 'UX-Audit', 'user-testing': 'Nutzertests', 'field-research': 'Feldforschung', 'ux-research': 'UX-Forschung', 'case-studies': 'Fallstudien', contact: 'Kontakt', about: 'Über uns', partners: 'Partner' },
  fr: { services: 'Services', 'test-packages': 'Packs de test', 'ux-audit': 'Audit UX', 'user-testing': 'Tests utilisateurs', 'field-research': 'Recherche terrain', 'ux-research': 'Recherche UX', 'case-studies': 'Études de cas', contact: 'Contact', about: 'À propos', partners: 'Partenaires' },
  es: { services: 'Servicios', 'test-packages': 'Paquetes de prueba', 'ux-audit': 'Auditoría UX', 'user-testing': 'Pruebas de usuario', 'field-research': 'Investigación de campo', 'ux-research': 'Investigación UX', 'case-studies': 'Casos de estudio', contact: 'Contacto', about: 'Sobre nosotros', partners: 'Socios' },
};

// Popisky pro drobečkovou navigaci ve strukturovaných datech (JSON-LD, nezobrazuje se)
const homeLabels: Record<Lang, string> = { cs: 'Úvod', en: 'Home', de: 'Startseite', fr: 'Accueil', es: 'Inicio' };

/**
 * Nadřazené úrovně stránky odvozené z reálné struktury URL (urlMap).
 * Vrací jen ty úrovně, pro které známe skutečný název — nic si nedomýšlí.
 */
export function getBreadcrumbTrail(pathname: string, lang: Lang): { name: string; path: string }[] {
  const trail: { name: string; path: string }[] = [{ name: homeLabels[lang], path: urlMap[lang].home }];
  const clean = (pathname.replace(/\/$/, '') || '/');
  if (clean === '/' || clean === urlMap[lang].home.replace(/\/$/, '')) return [];
  const parts = clean.split('/').filter(Boolean);
  // Jazykový prefix (/en, /de, ...) není samostatná úroveň
  const startIdx = lang === 'cs' ? 0 : 1;
  for (let i = startIdx; i < parts.length - 1; i++) {
    const candidate = '/' + parts.slice(0, i + 1).join('/');
    const key = pathToKey[candidate];
    const label = key ? navLabels[lang][key] : undefined;
    if (key && label) trail.push({ name: label, path: candidate });
  }
  return trail;
}

export type NavLink = {
  href: string;
  label: string;
  /** Podpoložky — kategorizační strom (dropdown na desktopu, odsazení v mobilním menu) */
  children?: { href: string; label: string }[];
};

// Segmenty do patičky — stejný úplný seznam jako v menu „Pro koho“ (zatím jen čeština)
export function getFooterSegments(lang: Lang): { href: string; label: string }[] {
  if (!urlMap[lang].segments) return [];
  return [
    { href: urlMap[lang]['seg-e-shopy'], label: 'E-shopy' },
    { href: urlMap[lang]['seg-weby'], label: 'Weby a aplikace' },
    { href: urlMap[lang]['seg-sport'], label: 'Sport a stadiony' },
    { href: urlMap[lang]['seg-automotive'], label: 'Automotive' },
    { href: urlMap[lang]['seg-doprava'], label: 'Doprava a města' },
    { href: urlMap[lang]['seg-prumysl'], label: 'Průmysl a energetika' },
    { href: urlMap[lang]['seg-zdravotnictvi'], label: 'Zdravotnictví' },
    { href: urlMap[lang]['seg-finance'], label: 'Finance a poradenství' },
    { href: urlMap[lang]['seg-letectvi'], label: 'Letectví' },
    { href: urlMap[lang]['seg-univerzity'], label: 'Univerzity a výzkum' },
  ];
}

export function getNavLinks(lang: Lang): NavLink[] {
  const t = navLabels[lang];
  // Jednotný strom služeb ve všech jazycích (v pořadí stránky Služby)
  const serviceChildren = [
    { href: urlMap[lang]['test-packages'], label: t['test-packages'] },
    { href: urlMap[lang]['ux-audit'], label: t['ux-audit'] },
    { href: urlMap[lang]['user-testing'], label: t['user-testing'] },
    { href: urlMap[lang]['eye-tracking'], label: 'Eye Tracking' },
    { href: urlMap[lang]['field-research'], label: t['field-research'] },
    { href: urlMap[lang]['ux-research'], label: t['ux-research'] },
  ];
  // Segmenty („Pro koho") — zatím jen čeština; dropdown = všech 9 segmentů
  const segmentChildren = urlMap[lang].segments
    ? [
        { href: urlMap[lang]['seg-e-shopy'], label: 'E-shopy' },
        { href: urlMap[lang]['seg-weby'], label: 'Weby a aplikace' },
        { href: urlMap[lang]['seg-sport'], label: 'Sport a stadiony' },
        { href: urlMap[lang]['seg-automotive'], label: 'Automotive' },
        { href: urlMap[lang]['seg-doprava'], label: 'Doprava a města' },
        { href: urlMap[lang]['seg-prumysl'], label: 'Průmysl a energetika' },
        { href: urlMap[lang]['seg-zdravotnictvi'], label: 'Zdravotnictví' },
        { href: urlMap[lang]['seg-finance'], label: 'Finance a poradenství' },
        { href: urlMap[lang]['seg-letectvi'], label: 'Letectví' },
        { href: urlMap[lang]['seg-univerzity'], label: 'Univerzity a výzkum' },
      ]
    : [];
  return [
    { href: urlMap[lang].services, label: t.services, children: serviceChildren },
    ...(urlMap[lang].segments ? [{ href: urlMap[lang].segments, label: t.segments ?? 'Pro koho', children: segmentChildren }] : []),
    { href: urlMap[lang]['case-studies'], label: t['case-studies'] },
    ...(urlMap[lang].about ? [{ href: urlMap[lang].about, label: t.about ?? 'O nás' }] : []),
    ...(urlMap[lang].partners ? [{ href: urlMap[lang].partners, label: t.partners ?? 'Partneři' }] : []),
    { href: urlMap[lang].contact, label: t.contact },
  ];
}
