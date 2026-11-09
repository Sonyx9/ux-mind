// Stránka „V médiích" (/v-mediich) — podcasty, reportáže a články, které o UX MIND vydal NĚKDO JINÝ.
// Vlastní texty patří na blog, výsledky z dat do případových studií.
//
// Zveřejnění: dokud je MEDIA_PAGE_LIVE = false, stránky se nebuildí (složka src/pages/_v-mediich/)
// a položka „V médiích" se neukazuje v menu, patičce ani na /o-nas.
// Spuštění = přepnout na true + přejmenovat složku _v-mediich → v-mediich.
//
// Stránka dílu s přepisem (/v-mediich/{slug}/): položka má `slug` a v src/content/prepisy/{slug}.md
// je přepis (Markdown, mezititulky ### …). Bez souboru s přepisem se stránka dílu negeneruje.
export const MEDIA_PAGE_LIVE = false;

export type MediaType = 'podcast' | 'reportaz' | 'clanek';

export interface MediaItem {
  type: MediaType;
  /** Médium / kanál, např. „Coffee Break" */
  outlet: string;
  /** Autor / moderátor */
  author?: string;
  title: string;
  /** ISO datum vydání (YYYY-MM-DD) */
  date?: string;
  /** 1–3 věty, o čem to je */
  summary: string;
  /** Odkaz na originál (YouTube, článek…) */
  url?: string;
  /** YouTube ID → náhled + přehrávač až po kliknutí */
  youtubeId?: string;
  /** Délka videa ve formátu ISO 8601 (PT45M) — pro JSON-LD */
  duration?: string;
  /** Náš navazující článek na blogu (interní cesta) */
  ourArticle?: string;
  /** Rozpracovaná položka bez odkazu — na živé stránce se nezobrazí */
  placeholder?: boolean;
  /** URL stránky dílu /v-mediich/{slug}/ — zároveň název souboru s přepisem v src/content/prepisy/ */
  slug?: string;
  /** SEO title a description stránky dílu (jinak se použije title a summary) */
  seoTitle?: string;
  seoDescription?: string;
  /** Hlavní body (3–5) nahoře na stránce dílu */
  keyPoints?: string[];
  /** Kapitoly videa: čas „mm:ss" nebo „h:mm:ss" + název */
  chapters?: { time: string; title: string }[];
  /** Související stránky webu, o kterých se v dílu mluví */
  related?: { label: string; href: string }[];
}

export const mediaTypes: { type: MediaType; label: string; anchor: string }[] = [
  { type: 'podcast', label: 'Podcasty', anchor: 'podcasty' },
  { type: 'reportaz', label: 'Reportáže', anchor: 'reportaze' },
  { type: 'clanek', label: 'Články', anchor: 'clanky' },
];

// Nejnovější nahoře (řadí se podle date).
export const mediaItems: MediaItem[] = [
  {
    type: 'podcast',
    outlet: 'Coffee Break',
    author: 'Filip Oborník',
    title: 'Eye tracking: kam se lidé opravdu dívají',
    slug: 'coffee-break-eye-tracking',
    keyPoints: [
      'Ukázkový bod — doplníme z přepisu.',
      'Ukázkový bod — doplníme z přepisu.',
      'Ukázkový bod — doplníme z přepisu.',
    ],
    chapters: [
      { time: '0:00', title: 'Úvod (ukázka)' },
      { time: '4:30', title: 'Jak funguje eye tracking (ukázka)' },
      { time: '12:10', title: 'Měření na stadionu (ukázka)' },
    ],
    related: [
      { label: 'Eye tracking', href: '/sluzby/eye-tracking' },
      { label: 'Terénní měření', href: '/sluzby/terenni-mereni' },
      { label: 'Sport a stadiony', href: '/segmenty/sport-a-stadiony' },
    ],
    summary:
      'Rozhovor o tom, co eye tracking prozradí o webech, e-shopech a reklamě. Natáčelo se při měření v laboratoři kognitivních studií FIM UHK, Filip si test vyzkoušel na vlastní oči.',
    placeholder: true,
  },
  {
    type: 'reportaz',
    outlet: 'Coffee Break',
    author: 'Filip Oborník',
    title: 'Měření pozornosti diváků na zápase FC Hradec Králové',
    summary:
      'Jak vypadá terénní eye tracking na stadionu: mobilní brýle, divák na tribuně a reklamní plochy během zápasu.',
    placeholder: true,
  },
  {
    type: 'clanek',
    outlet: 'Médium doplníme',
    title: 'Z akce 3. Národní den spin-offů na Univerzitě Hradec Králové',
    date: '2026-12-02',
    summary:
      'Jan Petružálek vystoupil s přednáškou „Cesta od akademického výzkumu ke spin-offu". Odkaz doplníme, až článek vyjde.',
    placeholder: true,
  },
];
