// Odesílání formulářů na Google Apps Script endpoint (viz apps-script/Code.gs).
// Po nasazení scriptu sem vlož jeho /exec URL. Dokud je prázdná, web funguje
// normálně, jen se nic neodesílá (formuláře se chovají jako dřív).
export const FORMS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx3k2PhzXg8xavUfP8KUDoq_j0KTgqPAhzfkc0Xq3zeslcv49fTc-NAFO0dR0SgPz5q9Q/exec';

/**
 * Odeslání dat na endpoint tak, aby přežilo i okamžité přesměrování stránky
 * (potvrzovací/děkovací stránka). Preferuje navigator.sendBeacon — ten je pro
 * fire-and-forget během navigace navržený; jinak fetch s keepalive. Obojí posílá
 * urlencoded (CORS-safelisted), takže statický web POSTuje na Apps Script bez
 * preflightu. Odpověď nečteme — úspěch hlásíme optimisticky.
 * Vrací true, pokud se odeslání podařilo naplánovat.
 */
export function submitForm(data: Record<string, string>): boolean {
  if (!FORMS_ENDPOINT) return false;
  const body = new URLSearchParams(data).toString();
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/x-www-form-urlencoded;charset=UTF-8' });
      if (navigator.sendBeacon(FORMS_ENDPOINT, blob)) return true;
    }
    fetch(FORMS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body,
    }).catch(() => {});
    return true;
  } catch {
    /* nikdy nesmí shodit odeslání formuláře na frontendu */
    return false;
  }
}
