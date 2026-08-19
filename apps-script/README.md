# Formuláře → Google Sheet (Apps Script)

Ukládání leadů z webu do Google tabulky + odeslání PDF studie na e-mail žadatele.
Bez serveru — funguje na statickém GitHub Pages hostingu.

## Co je hotové
- **`Code.gs`** — kód k vložení do Apps Scriptu (zvládne `study`, `contact` i `newsletter`;
  teď je na webu napojený jen formulář **studie**).
- Na webu: `src/scripts/forms.ts` odesílá data na endpoint; formulář studie v `src/scripts/case-study.ts`.

## Nasazení (cca 10 minut) — dělá se jednou

1. Založ **Google Sheet** (klidně prázdný). Bude to tvoje databáze leadů.
2. V něm: **Rozšíření → Apps Script**.
3. Smaž ukázkový kód, vlož **celý obsah `Code.gs`**.
4. Uprav nahoře `NOTIFY_EMAIL` (kam mají chodit notifikace o novém leadu).
5. **Nasadit → Nové nasazení → typ „Webová aplikace“:**
   - Spouštět jako: **Já**
   - Kdo má přístup: **Kdokoli**
6. Potvrď oprávnění (poslat e-mail, upravit tabulku).
7. Zkopíruj vygenerovanou **URL** (končí na `/exec`).

## Poslední krok (uděláme my)
Pošli nám tu `/exec` URL — vložíme ji do `src/scripts/forms.ts` (konstanta `FORMS_ENDPOINT`).
Dokud je prázdná, web funguje normálně, jen se nic neukládá.

## Jak to poběží
- Návštěvník vyplní jméno + e-mail v modalu „Vyžádat studii“.
- Web pošle data na endpoint → **řádek do listu `Studie`** + **notifikace vám** +
  **PDF odkaz e-mailem žadateli** (ověří pravost e-mailu).
- PDF se zároveň otevře hned (rychlá odezva). Chceš-li „tvrdou bránu“ (PDF jen e-mailem),
  je to změna jednoho řádku — řekni.

## Listy v tabulce (vzniknou samy)
| List | Sloupce |
|---|---|
| Studie | Datum · Jméno · E-mail · Firma · Studie · PDF · Souhlas · Zdroj |
| Kontakt | *(připraveno, zatím nenapojeno)* |
| Newsletter | *(připraveno, zatím nenapojeno)* |

## Poznámky
- **Anti-spam:** volitelný sdílený token (`SHARED_SECRET` v `Code.gs` + stejný na webu).
  Zatím vypnuto; když začne chodit spam, zapneme.
- **GDPR:** souhlas se posílá jako pole `consent`; data jsou u vás v Googlu (zpracovatel Google).
- **Změna kódu scriptu** = po úpravě znovu **Nasadit → Spravovat nasazení → upravit → nová verze**
  (URL zůstává stejná).
