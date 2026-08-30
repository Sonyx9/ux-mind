/**
 * Kontrola interních odkazů nad hotovým dist/ (spouští se v CI po buildu).
 * Pro každý href/src začínající "/" ověří, že cíl v dist skutečně existuje
 * (stránka, redirect stub nebo asset). Rozbitý interní odkaz = build spadne,
 * takže se překlep/přejmenování nikdy nedostane na produkci.
 *
 * Externí odkazy (http, mailto, tel), kotvy (#) a data: URI se přeskakují.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Vrátí true, pokud interní cesta odpovídá souboru v dist. */
function resolves(path) {
  // Odstřihni query a hash
  const clean = path.replace(/[?#].*$/, '');
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  const rel = clean.replace(/^\//, '');
  // Přímý soubor (asset s příponou): /logo.svg, /images/x.webp, /sitemap.xml
  if (existsSync(join(DIST, rel))) return true;
  // Stránka: /kontakt/ nebo /kontakt → adresářový index.html
  const asDir = join(DIST, rel.replace(/\/$/, ''), 'index.html');
  if (existsSync(asDir)) return true;
  // Stránka bez lomítka jako .html
  if (existsSync(join(DIST, `${rel.replace(/\/$/, '')}.html`))) return true;
  return false;
}

const attrRe = /(?:href|src)="([^"]+)"/g;
const broken = new Map(); // cíl → set stránek, kde je

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const page = file.slice(DIST.length) || '/';
  for (const m of html.matchAll(attrRe)) {
    const url = m[1];
    // Přeskoč externí, protokol-relativní, kotvy, mailto/tel, data:
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    if (!resolves(url)) {
      if (!broken.has(url)) broken.set(url, new Set());
      broken.get(url).add(page);
    }
  }
}

if (broken.size) {
  console.error(`\n[check-links] ✗ ${broken.size} rozbitých interních odkazů:\n`);
  for (const [url, pages] of broken) {
    console.error(`  ${url}`);
    for (const p of pages) console.error(`      ← ${p}`);
  }
  console.error('');
  process.exit(1);
}

console.log('[check-links] ✓ Všechny interní odkazy vedou na existující cíl.');
