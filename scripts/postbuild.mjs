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

const DIST = new URL('../dist', import.meta.url).pathname;
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

// 1) Base prefix interních odkazů
// Prefixuje href/src začínající "/", pokud už nezačínají BASE nebo "//"
const attrRe = /(href|src)="(\/(?!\/)[^"]*)"/g;
for (const file of files) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(attrRe, (m, attr, path) => {
    if (path === BASE || path.startsWith(`${BASE}/`)) return m;
    rewritten++;
    return `${attr}="${BASE}${path}"`;
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
  const path = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  urls.push(`${SITE}${BASE}/${path}`);
}
urls.sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`[postbuild] Prefixováno ${rewritten} odkazů, sitemap: ${urls.length} URL.`);
