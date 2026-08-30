/**
 * Jediný zdroj pravdy pro rozpracované (zatím vypnuté) funkce webu.
 * Přepnutím na `true` se funkce zapne všude naráz — žádné hledání `!hidden`
 * po šablonách. Díky tomu se konverzní prvek nemůže omylem odkrýt na produkci.
 */
export const features = {
  /**
   * Kontaktní formulář. false = místo formuláře se zobrazí overlay „PŘIPRAVUJEME"
   * s výzvou napsat e-mail; formulář za ním je jen dekorativní (disabled).
   * Před zapnutím: napojit odeslání přes forms.ts (FORMS_ENDPOINT).
   */
  contactForm: false,

  /**
   * Stažení případové studie za lead (CTA „Vyžádat studii" + modal s formulářem).
   * false = CTA sekce se skryje, feature je nedosažitelná.
   * Před zapnutím: (1) doplnit reálné `data-pdf` URL do formulářů studií,
   * (2) nasadit Apps Script a vyplnit FORMS_ENDPOINT, (3) ověřit consent flow.
   */
  studyDownloads: false,
} as const;
