export type Lang = 'cs' | 'en';

export const defaultLang: Lang = 'cs';

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
};

// Maps URL path → page key
const pathToKey: Record<string, string> = {
  '/': 'home',
  '/sluzby': 'services',
  '/eye-tracking': 'eye-tracking',
  '/ux-vyzkum': 'ux-research',
  '/pripadove-studie': 'case-studies',
  '/blog': 'blog',
  '/kontakt': 'contact',
  '/en/': 'home',
  '/en': 'home',
  '/en/services': 'services',
  '/en/eye-tracking': 'eye-tracking',
  '/en/ux-research': 'ux-research',
  '/en/case-studies': 'case-studies',
  '/en/blog': 'blog',
  '/en/contact': 'contact',
};

export function getLang(pathname: string): Lang {
  return pathname.startsWith('/en') ? 'en' : 'cs';
}

export function getAlternatePath(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  const key = pathToKey[clean] ?? pathToKey[pathname] ?? 'home';
  const currentLang = getLang(pathname);
  const targetLang: Lang = currentLang === 'cs' ? 'en' : 'cs';
  return urlMap[targetLang][key] ?? (targetLang === 'en' ? '/en/' : '/');
}

export function getNavLinks(lang: Lang) {
  return [
    { href: urlMap[lang].services,      label: lang === 'cs' ? 'Služby'     : 'Services'    },
    { href: urlMap[lang]['eye-tracking'],label: 'Eye Tracking' },
    { href: urlMap[lang]['ux-research'], label: lang === 'cs' ? 'UX Výzkum' : 'UX Research' },
    { href: urlMap[lang]['case-studies'],label: lang === 'cs' ? 'Studie'    : 'Case Studies' },
    { href: urlMap[lang].blog,           label: 'Blog' },
    { href: urlMap[lang].contact,        label: lang === 'cs' ? 'Kontakt'   : 'Contact'     },
  ];
}
