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
    'case-studies': '/pripadove-studie',
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
  cs: { services: 'Služby', 'test-packages': 'Testovací balíčky', 'ux-audit': 'UX Audit', 'user-testing': 'Testování uživatelů', 'field-research': 'Terénní měření', 'ux-research': 'UX Výzkum', 'case-studies': 'Studie', contact: 'Kontakt', about: 'O nás', partners: 'Partneři' },
  en: { services: 'Services', 'test-packages': 'Test Packages', 'ux-audit': 'UX Audit', 'user-testing': 'User Testing', 'field-research': 'Field Research', 'ux-research': 'UX Research', 'case-studies': 'Case Studies', contact: 'Contact' },
  de: { services: 'Leistungen', 'test-packages': 'Test-Pakete', 'ux-audit': 'UX-Audit', 'user-testing': 'Nutzertests', 'field-research': 'Feldforschung', 'ux-research': 'UX-Forschung', 'case-studies': 'Fallstudien', contact: 'Kontakt' },
  fr: { services: 'Services', 'test-packages': 'Packs de test', 'ux-audit': 'Audit UX', 'user-testing': 'Tests utilisateurs', 'field-research': 'Recherche terrain', 'ux-research': 'Recherche UX', 'case-studies': 'Études de cas', contact: 'Contact' },
  es: { services: 'Servicios', 'test-packages': 'Paquetes de prueba', 'ux-audit': 'Auditoría UX', 'user-testing': 'Pruebas de usuario', 'field-research': 'Investigación de campo', 'ux-research': 'Investigación UX', 'case-studies': 'Casos de estudio', contact: 'Contacto' },
};

export type NavLink = {
  href: string;
  label: string;
  /** Podpoložky — kategorizační strom (dropdown na desktopu, odsazení v mobilním menu) */
  children?: { href: string; label: string }[];
};

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
  return [
    { href: urlMap[lang].services, label: t.services, children: serviceChildren },
    { href: urlMap[lang]['case-studies'], label: t['case-studies'] },
    // Stránky O nás a Partneři zatím jen česky — v ostatních jazycích se položky nezobrazují
    ...(urlMap[lang].about ? [{ href: urlMap[lang].about, label: t.about ?? 'O nás' }] : []),
    ...(urlMap[lang].partners ? [{ href: urlMap[lang].partners, label: t.partners ?? 'Partneři' }] : []),
    { href: urlMap[lang].contact, label: t.contact },
  ];
}
