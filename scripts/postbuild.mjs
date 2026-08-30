/**
 * Postbuild krok pro GitHub Pages:
 * 1. Doplní base prefix (/ux-mind) všem interním odkazům v HTML,
 *    které ho nemají (href="/kontakt" → href="/ux-mind/kontakt").
 *    Řeší i odkazy z markdown obsahu (blog), kam Astro base nedoplňuje.
 * 2. Vygeneruje sitemap.xml ze všech stránek v dist
 *    (přeskakuje redirect stránky s meta refresh).
 *
 * Spouští se přes `npm run build` (astro build && node scripts/postbuild.mjs).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath správně dekóduje cestu (mj. mezery → %20), takže build funguje
// i v adresáři s mezerou v názvu ("UX Mind"), nejen na CI.
const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const BASE = '/ux-mind';
const SITE = 'https://sonyx9.github.io';

/** Rekurzivně posbírá všechny .html soubory */
function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = htmlFiles(DIST);
let rewritten = 0;
let slashed = 0;

// 1) Base prefix interních odkazů
// Prefixuje href/src začínající "/", pokud už nezačínají BASE nebo "//"
const attrRe = /(href|src)="(\/(?!\/)[^"]*)"/g;

/**
 * Koncové lomítko u interních odkazů na stránky.
 * Astro staví adresářové URL (/kontakt/index.html), takže /kontakt bez lomítka
 * server přesměrovává (301) — každý interní odkaz i každý klik by šel přes redirect
 * a rozcházel by se s canonical URL. Přidáváme lomítko jen tam, kde jde o stránku:
 * ne u souborů s příponou, ne u odkazů s dotazem, kotvu řešíme zvlášť.
 */
function withTrailingSlash(path) {
  if (path.includes('?')) return path;
  const hash = path.indexOf('#');
  const base = hash === -1 ? path : path.slice(0, hash);
  const frag = hash === -1 ? '' : path.slice(hash);
  if (base === '' || base.endsWith('/')) return path;
  if (/\.[a-zA-Z0-9]{1,8}$/.test(base.split('/').pop())) return path; // soubor, ne stránka
  slashed++;
  return `${base}/${frag}`;
}

for (const file of files) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(attrRe, (m, attr, path) => {
    let p = path;
    if (!(p === BASE || p.startsWith(`${BASE}/`))) {
      rewritten++;
      p = `${BASE}${p}`;
    }
    if (attr === 'href') p = withTrailingSlash(p);
    return p === path ? m : `${attr}="${p}"`;
  });
  if (after !== before) writeFileSync(file, after);
}

// 2) sitemap.xml (bez redirect stránek a 404)
const urls = [];
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) continue; // redirect stránky
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === '404.html') continue;
  const path = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
  urls.push(`${SITE}${BASE}/${path}`);
}
urls.sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`[postbuild] Prefixováno ${rewritten} odkazů, doplněno ${slashed} koncových lomítek, sitemap: ${urls.length} URL.`);
