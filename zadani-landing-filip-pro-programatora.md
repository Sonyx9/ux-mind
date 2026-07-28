# Zadání pro programátora — landing page `/filip`

*Speciální landing pro návštěvníky z YouTube videa s Filipem Oborníkem. Součást stávajícího webu UX Mind — převzít jeho styl, komponenty a technologii.*

## Základní parametry

- **URL:** `uxmind.cz/filip` (krátká, bude vyslovená ve videu). Případné varianty `/Filip`, `/filip/` → 301 redirect na `/filip`.
- **Cíl stránky:** konverze na poptávku konzultace (primární) nebo zanechání e-mailu (sekundární).
- **Jazyk:** čeština.
- **Deadline:** hotovo a otestováno před vydáním videa (termín natáčení od 17. 8., přesné datum vydání dodáme — počítat s rezervou).
- **Bez navigačního menu** (nebo výrazně redukované) — stránka nemá rozvádět pozornost. Footer standardní.
- **Noindex nedávat** — stránka smí být indexovaná, ale nemusí být v sitemapě prioritní.

## Struktura stránky (sekce shora dolů)

### S1 — Hero
- H1: „Viděli jste nás u Filipa? Vítejte."
- Podnadpis (1 věta), dodáme finální text.
- Vizuál: obrázek/GIF z natáčení (dodáme), fallback statický obrázek. Lazy-load ne — hero se načítá hned.
- Primární CTA tlačítko → scroll na formulář (S7), nebo otevření formuláře.

### S2 — Nabídka pro diváky
- Zvýhodněná nabídka (text a podmínky dodáme).
- Volitelný badge/štítek s časovým omezením — udělat jako editovatelný text, ať jde měnit bez zásahu do kódu.

### S3 — Tři karty „z videa ke službě"
- 3 karty: obrázek + nadpis + 2–3 věty + odkaz (2 karty na stránky služeb, 1 na stránku pro sport).
- Na mobilu pod sebou, na desktopu vedle sebe.

### S4 — Důvěryhodnost
- Krátký text (spin-off UHK), loga referencí (Škoda, FC — dodáme podklady), 2 medailonky (foto + jméno + 1 věta).

### S5 — Jak to probíhá
- 3 očíslované kroky, ikony + krátký text.

### S6 — Lead magnet
- Mini formulář: pouze e-mail + souhlas GDPR (checkbox).
- Po odeslání: odeslat PDF e-mailem, nebo zobrazit odkaz ke stažení + uložit kontakt (viz Integrace).
- Úspěšný stav zobrazit inline (ne redirect).

### S7 — Kontaktní formulář (primární konverze)
- Pole: jméno (povinné), e-mail (povinné, validace), web/URL (nepovinné), zpráva (nepovinné, textarea).
- Checkbox GDPR souhlas s odkazem na zásady zpracování (text dodáme, řeší se společně s balíčky).
- Antispam: honeypot pole + rate limit; žádná CAPTCHA.
- Po odeslání: děkovací stav na stránce (bez redirectu) + notifikace nám (viz Integrace).
- Vedle formuláře kontakt na konkrétní osobu (foto, jméno, e-mail).

### S8 — Závěr
- Zopakované CTA + odkaz na video na YouTube (otevírá se v novém tabu).

## Integrace a měření

- **Odeslané formuláře:** e-mail notifikace na adresu, kterou dodáme + uložení do [doplnit: tabulka/CRM/Mailerlite — potvrdíme]. Oddělit zdroj: `filip-konzultace` vs. `filip-leadmagnet`.
- **Analytika:** stávající nástroj webu. Events: `filip_cta_click`, `filip_form_submit`, `filip_leadmagnet_submit`, scroll depth volitelně.
- **UTM:** stránka bude cílem odkazu `?utm_source=youtube&utm_medium=video&utm_campaign=filip` — UTM parametry propsat do skrytých polí formulářů, ať víme, odkud lead přišel.
- **PDF lead magnetu:** dodáme; uložit mimo veřejně uhodnutelnou URL.

## Nefunkční požadavky

- **Mobile first** — většina trafficu z YouTube na telefonu. Testovat na šířce 360 px.
- Výkon: LCP < 2,5 s na mobilu, obrázky ve WebP/AVIF, GIF z natáčení ideálně jako krátké MP4/WebM ve smyčce.
- Přístupnost: sémantické nadpisy (jedno H1), alt texty, formuláře s labely, kontrast dle WCAG AA.
- OG meta: vlastní og:title, og:description, og:image (dodáme obrázek) — stránka se bude sdílet.

## Dodáme my (podklady)

Finální texty všech sekcí, obrázky/GIF z natáčení, loga referencí, fotky medailonků, PDF lead magnet, GDPR texty, cílový e-mail pro notifikace, přesný termín vydání videa.

## Akceptační kritéria

1. `/filip` funguje na mobilu i desktopu, všechny redirect varianty vedou na kanonickou URL.
2. Oba formuláře odesílají, validují, mají GDPR checkbox, honeypot a děkovací stav; notifikace chodí a kontakt se ukládá se zdrojem a UTM.
3. Analytics events se střílí správně (ověřit v debug módu).
4. LCP < 2,5 s na mobilu (ověřit PageSpeed Insights).
5. Stránka bez menu, jediné odchozí odkazy: karty služeb, video, GDPR zásady.
