/**
 * UX MIND — příjem formulářů (studie, kontakt, newsletter) do Google Sheetu.
 *
 * NASAZENÍ:
 * 1) Vytvoř Google Sheet (klidně prázdný).
 * 2) Rozšíření → Apps Script → smaž ukázkový kód a vlož CELÝ tento soubor.
 * 3) Uprav NOTIFY_EMAIL (kam chodí notifikace).
 * 4) Nasadit → Nové nasazení → typ „Webová aplikace“
 *      - Spouštět jako: Já
 *      - Kdo má přístup: Kdokoli
 *    → zkopíruj vygenerovanou URL (končí /exec) a pošli ji nám.
 * 5) Při prvním nasazení Google vyžádá oprávnění (poslat e-mail, upravit tabulku) — povol.
 *
 * Listy „Studie / Kontakt / Newsletter“ se vytvoří samy při prvním odeslání.
 */

// ── Nastavení ────────────────────────────────────────────────
const NOTIFY_EMAIL = 'spoluprace@uxmind.cz';   // kam chodí notifikace o novém leadu
const SHARED_SECRET = '';                        // volitelně: stejný řetězec dáme i do webu (anti-spam). Prázdné = vypnuto.
const SEND_PDF_TO_REQUESTER = true;              // u studie poslat žadateli e-mail s odkazem na PDF (ověří e-mail)

// Mapování typu formuláře → název listu + hlavičky sloupců
const TABS = {
  study:      { sheet: 'Studie',     headers: ['Datum', 'Jméno', 'E-mail', 'Firma', 'Studie', 'PDF', 'Souhlas', 'Zdroj'] },
  contact:    { sheet: 'Kontakt',    headers: ['Datum', 'Jméno', 'E-mail', 'Firma', 'Služba', 'Zpráva', 'Souhlas', 'Zdroj'] },
  newsletter: { sheet: 'Newsletter', headers: ['Datum', 'E-mail', 'Souhlas', 'Zdroj'] },
};

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Honeypot: skryté pole vyplní jen bot → tiše ignoruj
    if (p._gotcha) return _ok();

    // Volitelný sdílený token proti spamu
    if (SHARED_SECRET && p.token !== SHARED_SECRET) return _err('bad token');

    const type = String(p.form || 'contact').toLowerCase();
    const cfg = TABS[type] || TABS.contact;
    const sheet = _sheet(cfg.sheet, cfg.headers);
    const now = new Date();

    let row;
    if (type === 'study') {
      row = [now, p.name || '', p.email || '', p.company || '', p.study || '', p.pdf || '', p.consent || '', p.source || ''];
    } else if (type === 'newsletter') {
      row = [now, p.email || '', p.consent || '', p.source || ''];
    } else {
      row = [now, p.name || '', p.email || '', p.company || '', p.service || '', p.message || '', p.consent || '', p.source || ''];
    }
    sheet.appendRow(row);

    _notify(type, p);

    // Studie: pošli žadateli odkaz na PDF
    if (type === 'study' && SEND_PDF_TO_REQUESTER && p.email && p.pdf) {
      MailApp.sendEmail({
        to: p.email,
        subject: 'Vaše studie od UX MIND',
        htmlBody: 'Dobrý den' + (p.name ? ' ' + p.name : '') + ',<br><br>' +
                  'děkujeme za zájem. Vaši studii otevřete zde:<br>' +
                  '<a href="' + p.pdf + '">' + p.pdf + '</a><br><br>— UX MIND',
      });
    }

    return _ok();
  } catch (err) {
    return _err(String(err));
  }
}

function _sheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); }
  else if (sh.getLastRow() === 0) { sh.appendRow(headers); }
  return sh;
}

function _notify(type, p) {
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'Nový lead (' + type + ') — ' + (p.email || p.name || ''),
      body: Object.keys(p)
        .filter(function (k) { return k !== 'token' && k !== '_gotcha'; })
        .map(function (k) { return k + ': ' + p[k]; })
        .join('\n'),
    });
  } catch (err) { /* notifikace nesmí shodit uložení */ }
}

function _ok()   { return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON); }
function _err(m) { return ContentService.createTextOutput(JSON.stringify({ ok: false, error: m })).setMimeType(ContentService.MimeType.JSON); }

// Kontrola v prohlížeči, že endpoint žije (otevři /exec URL):
function doGet() { return ContentService.createTextOutput('UX MIND forms endpoint OK'); }
