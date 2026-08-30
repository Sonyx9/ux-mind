/**
 * Postbuild krok (spouští se přes `npm run build`: astro build && node scripts/postbuild.mjs).
 * Web běží na custom doméně uxmind.cz v kořeni, takže se NEdoplňuje žádný base prefix.
 * Skript dělá dvě věci nad hotovým dist/:
 * 1. Doplní koncové lomítko interním odkazům na stránky (href="/kontakt" → "/kontakt/"),
 *    aby se neshodovaly s canonical URL a nešly přes 301. Soubory a odkazy s dotazem
 *    nechává být, kotvu řeší zvlášť.
 * 2. Vygeneruje sitemap.xml ze všech stránek (přeskakuje redirect stránky s meta refresh
 *    a 404) včetně obrázkové sitemapy (image extension).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath správně dekóduje cestu (mj. mezery → %20), takže build funguje
// i v adresáři s mezerou v názvu ("UX Mind"), nejen na CI.
const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const SITE = 'https://uxmind.cz';

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
let slashed = 0;

// 1) Koncové lomítko interních odkazů na stránky
// Bere jen href začínající "/" (ne "//" = protokol-relativní externí odkaz).
const attrRe = /href="(\/(?!\/)[^"]*)"/g;

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
  const after = before.replace(attrRe, (m, path) => {
    const p = withTrailingSlash(path);
    return p === path ? m : `href="${p}"`;
  });
  if (after !== before) writeFileSync(file, after);
}

// 2) sitemap.xml (bez redirect stránek a 404) + obrázková sitemapa (image extension)
const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const IMAGE_NS = 'http://www.google.com/schemas/sitemap-image/1.1';
const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const entries = [];
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) continue; // redirect stránky
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === '404.html') continue;
  const path = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
  const loc = `${SITE}/${path}`;

  // Interní obrázky na stránce: <img src="/…"> (bez data: a externích), absolutní a bez duplicit
  const imgs = new Set();
  for (const m of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
    const src = m[1];
    if (src.startsWith('/') && !src.startsWith('//')) imgs.add(`${SITE}${src}`);
  }
  entries.push({ loc, imgs: [...imgs].sort() });
}
entries.sort((a, b) => a.loc.localeCompare(b.loc));

const body = entries
  .map(({ loc, imgs }) => {
    if (!imgs.length) return `  <url><loc>${xmlEscape(loc)}</loc></url>`;
    const images = imgs
      .map((u) => `\n    <image:image><image:loc>${xmlEscape(u)}</image:loc></image:image>`)
      .join('');
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${images}\n  </url>`;
  })
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${SITEMAP_NS}" xmlns:image="${IMAGE_NS}">\n${body}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

const totalImgs = entries.reduce((n, e) => n + e.imgs.length, 0);
console.log(`[postbuild] Doplněno ${slashed} koncových lomítek, sitemap: ${entries.length} URL, ${totalImgs} obrázků.`);
