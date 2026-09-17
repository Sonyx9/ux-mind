# Formuláře → Google Sheet (Apps Script)

Kontaktní formulář (a formuláře studií) na statickém webu bez serveru:
ukládá leady do Google tabulky, posílá notifikaci nám, potvrzení klientovi,
volitelně zprávu do Slacku a přesměruje na děkovací stránku.

## Co je hotové
- **`Code.gs`** — kód k vložení do Apps Scriptu (zvládne `contact`, `study` i `newsletter`).
- Na webu: `src/scripts/forms.ts` (odeslání přes `sendBeacon`, přežije redirect),
  `src/scripts/contact-form.ts` (kontaktní formulář), `src/scripts/case-study.ts` (studie).
- Děkovací stránky: `/dekujeme`, `/en/thank-you`, `/de/danke` (noindex).

## Nasazení (cca 10 minut) — dělá se jednou

Účet: **uxmindresearchlab@gmail.com**.

1. V tomto účtu založ **Google Sheet** (klidně prázdný) — bude to databáze leadů.
2. V něm: **Rozšíření → Apps Script**.
3. Smaž ukázkový kód, vlož **celý obsah `Code.gs`**.
4. Nahoře zkontroluj `NOTIFY_EMAIL` (kam chodí notifikace). Slack se nastavuje zvlášť (viz níže).
5. **Nasadit → Nové nasazení → typ „Webová aplikace“:**
   - Spouštět jako: **Já (uxmindresearchlab@gmail.com)**
   - Kdo má přístup: **Kdokoli**
6. Potvrď oprávnění (poslat e-mail, upravit tabulku; u Slacku i připojení k externí službě).
7. Zkopíruj vygenerovanou **URL** (končí na `/exec`).

## Go-live (uděláme my, jakmile pošleš `/exec` URL)
1. Vložíme URL do `src/scripts/forms.ts` (`FORMS_ENDPOINT`).
2. Zapneme formulář: `src/config.ts` → `features.contactForm = true`.
3. Commit + push. Hotovo — formulář je živý.

Dokud je `FORMS_ENDPOINT` prázdný / flag vypnutý, na webu se drží stav
„PŘIPRAVUJEME" a nepřijde se o žádný lead.

## Jak to poběží (kontakt)
- Návštěvník vyplní formulář → web pošle data na endpoint (`sendBeacon`).
- Vznikne **řádek v listu `Kontakt`**, přijde **notifikace nám** (Reply-To = e-mail klienta),
  klientovi **potvrzení v jeho jazyce** (odesílatel „UX MIND Research Lab", Reply-To spoluprace@uxmind.cz)
  a volitelně **zpráva do Slacku**.
- Návštěvník je přesměrován na **děkovací stránku** v daném jazyce.

## E-mail: odesílatel a doručitelnost
- Pošta chodí z **uxmindresearchlab@gmail.com** se jménem odesílatele **UX MIND Research Lab**
  a **Reply-To spoluprace@uxmind.cz** (odpovědi klienta míří tam).
- Chceš-li, aby pošta chodila přímo „z" `spoluprace@uxmind.cz`: v Gmailu nastav
  **Nastavení → Účty → Odesílat jako…** (ověřený alias) a jeho adresu vlož do `FROM_ALIAS` v `Code.gs`.

## Slack (volitelné)
Webhook je natvrdo v `Code.gs` (konstanta `SLACK_WEBHOOK`). Aby se tajný webhook
nedostal do veřejného repa, je **`apps-script/Code.gs` v `.gitignore`** — je to
lokální pracovní kopie k vložení do Apps Scriptu, do gitu se necommituje.
1. Slack → vytvoř **Incoming Webhook** (zkopíruj URL) a vlož do `SLACK_WEBHOOK` v `Code.gs`.
2. Přenasaď: **Nasadit → Spravovat nasazení → nová verze** (URL `/exec` zůstává).

## Listy v tabulce (vzniknou samy)
| List | Sloupce |
|---|---|
| Kontakt | Datum · Jméno · E-mail · Firma · Služba · Zpráva · Souhlas · Marketing · Jazyk · Zdroj |
| Studie | Datum · Jméno · E-mail · Firma · Studie · PDF · Souhlas · Marketing · Zdroj |
| Newsletter | Datum · E-mail · Souhlas · Zdroj |

## Poznámky
- **Anti-spam:** honeypot (skryté pole `_gotcha`) je aktivní. Navíc volitelný token
  `SHARED_SECRET` (v `Code.gs` + stejný na webu) — zapneme, když začne chodit spam.
- **Limity Gmailu:** ~100 příchozích akcí / e-mailů denně (běžný Gmail) — pro kontaktní
  formulář bohatě stačí.
- **GDPR:** souhlas se posílá jako `consent`, marketing zvlášť jako `marketing`; data jsou
  u vás v Googlu (Google = zpracovatel).
- **Změna kódu scriptu** = po úpravě znovu **Nasadit → Spravovat nasazení → upravit → nová verze**
  (URL `/exec` zůstává stejná).
