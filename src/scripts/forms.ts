// Odesílání formulářů na Google Apps Script endpoint (viz apps-script/Code.gs).
// Po nasazení scriptu sem vlož jeho /exec URL. Dokud je prázdná, web funguje
// normálně, jen se nic neukládá (formuláře se chovají jako dřív).
export const FORMS_ENDPOINT = '';

/**
 * Fire-and-forget odeslání dat na endpoint.
 * Používá no-cors + urlencoded, aby statický web mohl POSTovat na Apps Script
 * bez CORS preflightu. Odpověď nelze přečíst — úspěch hlásíme optimisticky.
 */
export function submitForm(data: Record<string, string>): void {
  if (!FORMS_ENDPOINT) return;
  try {
    fetch(FORMS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams(data).toString(),
    }).catch(() => {});
  } catch {
    /* nikdy nesmí shodit odeslání formuláře na frontendu */
  }
}
