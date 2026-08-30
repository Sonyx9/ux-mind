/**
 * IndexNow ping — po deployi upozorní vyhledávače (Bing, Seznam, Yandex),
 * že se URL webu změnily. Spouští se v GitHub Actions po nasazení.
 *
 * Stáhne živou sitemap.xml (už nasazenou) a hromadně odešle její URL na
 * sdílený IndexNow endpoint, který je přepošle všem participujícím vyhledávačům.
 * Klíč je veřejný (ověřovací soubor na /<KEY>.txt) — není to tajemství.
 */
const HOST = 'uxmind.cz';
const KEY = '352d9e87744083f5eb39c1815844d6a9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const res = await fetch(`https://${HOST}/sitemap.xml`, { headers: { 'User-Agent': 'uxmind-indexnow' } });
if (!res.ok) {
  console.log(`[indexnow] sitemap nedostupná (HTTP ${res.status}) — přeskakuji.`);
  process.exit(0);
}
const xml = await res.text();
// Jen stránkové URL (<loc>), ne obrázky (<image:loc>)
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urlList.length) {
  console.log('[indexnow] žádné URL v sitemapě — přeskakuji.');
  process.exit(0);
}

const ping = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`[indexnow] odesláno ${urlList.length} URL → HTTP ${ping.status} ${ping.statusText}`);
// IndexNow nesmí shodit deploy — chyba jen zalogujeme.
process.exit(0);
