# UX MIND — web

Vícejazyčný statický web UX výzkumné laboratoře **UX MIND Research Lab**
(uxmind.cz). Postaveno na [Astro](https://astro.build/), stylováno
[Tailwindem](https://tailwindcss.com/), nasazováno na GitHub Pages.

Nasazeno na: `https://sonyx9.github.io/ux-mind/`

## Stack

- **Astro** — statický multi-page generátor (žádný runtime framework, minimum JS)
- **Tailwind CSS** — `@astrojs/tailwind`, tokeny v `tailwind.config.mjs`
- **@fontsource** — Space Grotesk (display), IBM Plex Mono (mono), Inter (text)
- **MDX** — `@astrojs/mdx` (pro budoucí blog)

## Vývoj

```bash
npm install
npm run dev      # dev server (localhost:4321/ux-mind)
npm run build    # produkční build do dist/ + postbuild (viz níže)
npm run preview  # náhled produkčního buildu
```

> Build běží pod `base: '/ux-mind'`. `npm run build` navíc spustí
> `scripts/postbuild.mjs`.

## Struktura

```
src/
  pages/            # routy (file-based). cs = kořen, ostatní jazyky ve složkách
    index.astro     # homepage (cs)
    sluzby/…        # služby (cs); en/services, de/leistungen, …
    pripadove-studie/…   # případové studie (cs); lokalizované slugy v mutacích
    segmenty/       # sekce „Pro koho" — pouze cs (hreflang vypnut)
    en/ de/ fr/ es/ # jazykové mutace (1:1 se strukturou cs)
  components/       # Navbar, Footer, SegmentLayout
  layouts/          # BaseLayout (head, hreflang, consent, skip-link)
  i18n/utils.ts     # jazyky, urlMap, navigace, localizedPath, hreflang klíče
  data/segmenty.ts  # jediný zdroj pravdy pro sekci /segmenty
  styles/global.css # základní styly + fonty
scripts/postbuild.mjs   # base prefix odkazů + generování sitemap.xml
public/             # statické soubory (loga, obrázky, robots.txt, favicon)
```

## i18n

- Aktivní jazyky řídí pole `languages` v `src/i18n/utils.ts` (přepínač +
  hreflang). Aktuálně zobrazené: **CZ, EN, DE** (FR/ES dočasně skryté —
  stránky existují, jen nejsou v přepínači; vrátí se odkomentováním).
- `urlMap` mapuje klíč stránky → lokalizovanou cestu pro každý jazyk; sdílené
  klíče (`cs-*`) drží párování napříč jazyky pro hreflang.
- Slugy jsou lokalizované v každém jazyce (např.
  `career-portal-automotive` / `karriereportal-automotive` / …).
- Čeština je výchozí (`defaultLang`) a je předlohou; ostatní jazyky se s ní
  drží 1:1 ve struktuře i zarovnání.

## Konvence

- **Interní odkazy v obsahu se píší bez base prefixu** (`href="/kontakt"`).
  `scripts/postbuild.mjs` jim při buildu doplní `/ux-mind` a koncové lomítko.
  Navigace (Navbar/Footer) prefix doplňuje sama přes `import.meta.env.BASE_URL`.
- **Obrázky** se odkazují s base: `` `${base}/images/…` ``.
- Značková modrá je `#2D62FC`, brand-black `#0A0A0A`, brand-white `#FAFAFA`.
- `src/pages/_emli.astro` je záměrně mimo build (viz komentář v souboru).

## Nasazení

Automaticky přes GitHub Actions (`.github/workflows/deploy.yml`) při pushi do
`main`: `npm ci && npm run build` → nahrání `dist/` jako Pages artefakt.
