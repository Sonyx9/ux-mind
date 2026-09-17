/**
 * UX MIND — příjem formulářů (kontakt, studie, newsletter) do Google Sheetu
 * + notifikace e-mailem a volitelně do Slacku + potvrzení klientovi.
 *
 * NASAZENÍ (účet uxmindresearchlab@gmail.com):
 * 1) V tomto účtu vytvoř Google Sheet (klidně prázdný).
 * 2) Rozšíření → Apps Script → smaž ukázkový kód a vlož CELÝ tento soubor.
 * 3) Zkontroluj NOTIFY_EMAIL a (volitelně) vlož SLACK_WEBHOOK.
 * 4) Nasadit → Nové nasazení → typ „Webová aplikace“
 *      - Spouštět jako: Já (uxmindresearchlab@gmail.com)
 *      - Kdo má přístup: Kdokoli
 *    → zkopíruj vygenerovanou URL (končí /exec) a pošli ji nám.
 * 5) Při prvním nasazení Google vyžádá oprávnění (poslat e-mail, upravit tabulku,
 *    připojit se k externí službě kvůli Slacku) — povol.
 *
 * Listy „Kontakt / Studie / Newsletter“ se vytvoří samy při prvním odeslání.
 */

// ── Nastavení ────────────────────────────────────────────────
const NOTIFY_EMAIL = 'spoluprace@uxmind.cz';   // kam chodí interní notifikace o novém leadu
const FROM_NAME    = 'UX MIND Research Lab';    // jméno odesílatele u odchozí pošty
const REPLY_TO     = 'spoluprace@uxmind.cz';    // kam míří odpovědi klienta (Reply-To)
const FROM_ALIAS   = '';                        // máš-li v Gmailu ověřený alias „Odesílat jako…", vlož adresu — pošta pak půjde z ní
const SLACK_WEBHOOK = '';                       // volitelně: Slack Incoming Webhook URL → notifikace i do Slacku
const SHARED_SECRET = '';                       // volitelně anti-spam token (stejný dáme i do webu). Prázdné = vypnuto.
const SEND_PDF_TO_REQUESTER   = true;           // u studie poslat žadateli e-mail s odkazem na PDF
const SEND_CONTACT_CONFIRMATION = true;         // u kontaktu poslat klientovi potvrzení, že zprávu máme

// Mapování typu formuláře → název listu + hlavičky sloupců
const TABS = {
  contact:    { sheet: 'Kontakt',    headers: ['Datum', 'Jméno', 'E-mail', 'Firma', 'Služba', 'Zpráva', 'Souhlas', 'Marketing', 'Jazyk', 'Zdroj'] },
  study:      { sheet: 'Studie',     headers: ['Datum', 'Jméno', 'E-mail', 'Firma', 'Studie', 'PDF', 'Souhlas', 'Marketing', 'Zdroj'] },
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
      row = [now, p.name || '', p.email || '', p.company || '', p.study || '', p.pdf || '', p.consent || '', p.marketing || '', p.source || ''];
    } else if (type === 'newsletter') {
      row = [now, p.email || '', p.consent || '', p.source || ''];
    } else {
      row = [now, p.name || '', p.email || '', p.company || '', p.service || '', p.message || '', p.consent || '', p.marketing || '', p.lang || '', p.source || ''];
    }
    sheet.appendRow(row);

    _notify(type, p);
    _slack(type, p);

    // Studie: pošli žadateli odkaz na PDF
    if (type === 'study' && SEND_PDF_TO_REQUESTER && _isEmail(p.email) && p.pdf) {
      _send(p.email, 'Vaše studie od UX MIND',
        'Dobrý den' + (p.name ? ' ' + p.name : '') + ',<br><br>' +
        'děkujeme za zájem. Vaši studii otevřete zde:<br>' +
        '<a href="' + p.pdf + '">' + p.pdf + '</a><br><br>— ' + FROM_NAME);
    }

    // Kontakt: pošli klientovi potvrzení (v jeho jazyce)
    if (type === 'contact' && SEND_CONTACT_CONFIRMATION && _isEmail(p.email)) {
      const m = _contactConfirm(p.lang, p.name, p.message);
      _send(p.email, m.subject, m.html);
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

// Odchozí e-mail s jménem odesílatele a Reply-To (volitelně z ověřeného aliasu)
function _send(to, subject, htmlBody) {
  const opts = { to: to, subject: subject, htmlBody: htmlBody, name: FROM_NAME, replyTo: REPLY_TO };
  if (FROM_ALIAS) opts.from = FROM_ALIAS;
  MailApp.sendEmail(opts);
}

// Interní notifikace o novém leadu
function _notify(type, p) {
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      name: FROM_NAME,
      replyTo: _isEmail(p.email) ? p.email : REPLY_TO,
      subject: 'Nový lead (' + type + ') — ' + (p.name || p.email || ''),
      body: Object.keys(p)
        .filter(function (k) { return k !== 'token' && k !== '_gotcha'; })
        .map(function (k) { return k + ': ' + p[k]; })
        .join('\n'),
    });
  } catch (err) { /* notifikace nesmí shodit uložení */ }
}

// Notifikace do Slacku (Incoming Webhook)
function _slack(type, p) {
  if (!SLACK_WEBHOOK) return;
  try {
    const lines = ['*Nový lead* — ' + type];
    ['name', 'email', 'company', 'service', 'message'].forEach(function (k) {
      if (p[k]) lines.push('*' + k + ':* ' + p[k]);
    });
    if (p.source) lines.push('_' + p.source + '_');
    UrlFetchApp.fetch(SLACK_WEBHOOK, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ text: lines.join('\n') }),
      muteHttpExceptions: true,
    });
  } catch (err) { /* Slack nesmí shodit uložení */ }
}

// Potvrzovací e-mail klientovi podle jazyka
function _contactConfirm(lang, name, message) {
  const l = String(lang || 'cs').toLowerCase();
  const hi = name ? ' ' + name : '';
  const quote = message ? '<br><br><span style="color:#666">Vaše zpráva:</span><br><em>' + _esc(message) + '</em>' : '';
  if (l === 'en') {
    return {
      subject: 'Thank you for your message — UX MIND',
      html: 'Hello' + hi + ',<br><br>Thank you for reaching out. We\'ve received your message and will get back to you within 48 hours with a suggestion of what makes sense to test.' +
            quote + '<br><br>— ' + FROM_NAME,
    };
  }
  if (l === 'de') {
    return {
      subject: 'Danke für Ihre Nachricht — UX MIND',
      html: 'Hallo' + hi + ',<br><br>vielen Dank für Ihre Nachricht. Wir haben sie erhalten und melden uns innerhalb von 48 Stunden mit einem Vorschlag, was sich zu testen lohnt.' +
            quote + '<br><br>— ' + FROM_NAME,
    };
  }
  return {
    subject: 'Děkujeme za zprávu — UX MIND',
    html: 'Dobrý den' + hi + ',<br><br>děkujeme za vaši zprávu. Máme ji a ozveme se do 48 hodin s návrhem, co má smysl ověřit.' +
          quote + '<br><br>— ' + FROM_NAME,
  };
}

function _isEmail(s) { return typeof s === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s); }
function _esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function _ok()   { return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON); }
function _err(m) { return ContentService.createTextOutput(JSON.stringify({ ok: false, error: m })).setMimeType(ContentService.MimeType.JSON); }

// Kontrola v prohlížeči, že endpoint žije (otevři /exec URL):
function doGet() { return ContentService.createTextOutput('UX MIND forms endpoint OK'); }
