# UX MIND — web

Vícejazyčný statický web UX výzkumné laboratoře **UX MIND Research Lab**.
Postaveno na [Astro](https://astro.build/), stylováno
[Tailwindem](https://tailwindcss.com/), nasazováno na GitHub Pages.

Běží na custom doméně **[uxmind.cz](https://uxmind.cz)**, kterou GitHub Pages
servíruje v kořeni — proto se **nepoužívá žádný base prefix** (`CNAME` je v `public/`).

## Stack

- **Astro** — statický multi-page generátor (žádný runtime framework, minimum JS)
- **Tailwind CSS** — `@astrojs/tailwind`, tokeny v `tailwind.config.mjs`
- **@fontsource** — Space Grotesk (display), IBM Plex Mono (mono), Inter (text)
- **MDX** — `@astrojs/mdx` (pro budoucí blog)

## Vývoj

```bash
npm install
npm run dev      # dev server (localhost:4321)
npm run build    # produkční build do dist/ + postbuild (viz níže)
npm run preview  # náhled produkčního buildu
```

> `npm run build` = `astro build && node scripts/postbuild.mjs`. Postbuild doplní
> koncová lomítka interním odkazům a vygeneruje `sitemap.xml` (viz Konvence).

## Struktura

```
src/
  pages/            # routy (file-based). cs = kořen, ostatní jazyky ve složkách
    index.astro     # homepage (cs)
    sluzby/…        # služby (cs); en/services, de/leistungen
    pripadove-studie/…   # případové studie (cs); lokalizované slugy v mutacích
    segmenty/       # sekce „Pro koho" — pouze cs (hreflang vypnut)
    en/ de/         # jazykové mutace (1:1 se strukturou cs)
  components/       # Navbar, Footer, SegmentLayout
  layouts/          # BaseLayout (head, hreflang, consent, GTM, skip-link)
  i18n/utils.ts     # jazyky, urlMap, navigace, localizedPath, hreflang klíče
  data/segmenty.ts  # jediný zdroj pravdy pro sekci /segmenty
  scripts/          # klientský JS (homepage.ts, case-study.ts, forms.ts)
  styles/global.css # základní styly + fonty
scripts/postbuild.mjs   # koncová lomítka odkazů + generování sitemap.xml
scripts/indexnow.mjs    # ping IndexNow (Bing/Seznam) po nasazení
public/             # statické soubory (loga, obrázky, robots.txt, llms.txt, CNAME, favicon)
```

## i18n

- Aktivní jazyky: **CZ (výchozí), EN, DE**. Řídí je pole `languages` v
  `src/i18n/utils.ts` (přepínač + hreflang) a `i18n.locales` v `astro.config.mjs`.
- **FR a ES se nebuildují** — nechceme je mít dohledatelné. Jejich staré/indexované
  URL jsou v `astro.config.mjs` (`redirects`) 301 přesměrované na anglický protějšek.
- `urlMap` mapuje klíč stránky → lokalizovanou cestu pro každý jazyk; sdílené
  klíče (`cs-*`) drží párování napříč jazyky pro hreflang.
- Slugy jsou lokalizované v každém jazyce (např.
  `career-portal-automotive` / `karriereportal-automotive`).
- Čeština je výchozí (`defaultLang`) a je předlohou; ostatní jazyky se s ní
  drží 1:1 ve struktuře i zarovnání.

## Konvence

- **Interní odkazy v obsahu se píší bez base prefixu** (`href="/kontakt"`).
  Web běží v kořeni domény, takže se nic neprefixuje; `scripts/postbuild.mjs` jim
  jen doplní koncové lomítko, aby se neshodovaly s canonical URL (jinak 301).
- **Obrázky** se odkazují absolutně z kořene (`/images/…`).
- Značková modrá je `#2D62FC`, brand-black `#0A0A0A`, brand-white `#FAFAFA`.
- `src/pages/_emli.astro` je záměrně mimo build (viz komentář v souboru).

## Nasazení

Automaticky přes GitHub Actions (`.github/workflows/deploy.yml`) při pushi do
`main`: `npm ci && npm run build` → nahrání `dist/` jako Pages artefakt → deploy →
ping IndexNow. Doména je řízena souborem `public/CNAME`.
