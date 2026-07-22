export type Lang = 'cs' | 'en' | 'de';

export const defaultLang: Lang = 'cs';

// Seznam jazyků pro přepínač (pořadí = pořadí v menu)
export const languages: { code: Lang; label: string }[] = [
  { code: 'cs', label: 'CZ' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

// Maps page keys to URLs per language
const urlMap: Record<Lang, Record<string, string>> = {
  cs: {
    home: '/',
    services: '/sluzby',
    'eye-tracking': '/eye-tracking',
    'ux-research': '/ux-vyzkum',
    'case-studies': '/pripadove-studie',
    blog: '/blog',
    contact: '/kontakt',
  },
  en: {
    home: '/en/',
    services: '/en/services',
    'eye-tracking': '/en/eye-tracking',
    'ux-research': '/en/ux-research',
    'case-studies': '/en/case-studies',
    blog: '/en/blog',
    contact: '/en/contact',
  },
  de: {
    home: '/de/',
    services: '/de/leistungen',
    'eye-tracking': '/de/eye-tracking',
    'ux-research': '/de/ux-forschung',
    'case-studies': '/de/fallstudien',
    blog: '/de/blog',
    contact: '/de/kontakt',
  },
};

// Maps URL path → page key (vygenerováno z urlMap)
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
  return 'cs';
}

// Cesta ke stejné stránce v cílovém jazyce
export function getPathInLang(pathname: string, targetLang: Lang): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  const key = pathToKey[clean] ?? pathToKey[pathname] ?? 'home';
  return urlMap[targetLang][key] ?? urlMap[targetLang].home;
}

// Zpětná kompatibilita: „další“ jazyk (cs ↔ en)
export function getAlternatePath(pathname: string): string {
  const targetLang: Lang = getLang(pathname) === 'cs' ? 'en' : 'cs';
  return getPathInLang(pathname, targetLang);
}

const navLabels: Record<Lang, Record<string, string>> = {
  cs: { services: 'Služby', 'ux-research': 'UX Výzkum', 'case-studies': 'Studie', contact: 'Kontakt' },
  en: { services: 'Services', 'ux-research': 'UX Research', 'case-studies': 'Case Studies', contact: 'Contact' },
  de: { services: 'Leistungen', 'ux-research': 'UX-Forschung', 'case-studies': 'Fallstudien', contact: 'Kontakt' },
};

export function getNavLinks(lang: Lang) {
  const t = navLabels[lang];
  return [
    { href: urlMap[lang].services, label: t.services },
    { href: urlMap[lang]['eye-tracking'], label: 'Eye Tracking' },
    { href: urlMap[lang]['ux-research'], label: t['ux-research'] },
    { href: urlMap[lang]['case-studies'], label: t['case-studies'] },
    { href: urlMap[lang].blog, label: 'Blog' },
    { href: urlMap[lang].contact, label: t.contact },
  ];
}
