// Odeslání kontaktního formuláře: uloží lead (Google Sheet přes Apps Script),
// pošle notifikaci nám + potvrzení klientovi a přesměruje na děkovací stránku.
// Aktivní jen když je formulář živý (features.contactForm=true → není disabled).
import { submitForm } from './forms';

(function () {
  const form = document.querySelector<HTMLFormElement>('form.contact-form');
  if (!form) return;

  const field = (name: string): string =>
    (form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value.trim() || '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot: skryté pole vyplní jen bot → tiše „uspějeme" bez odeslání
    const gotcha = (form.querySelector('[name="_gotcha"]') as HTMLInputElement | null)?.value;
    if (gotcha) { window.location.href = form.dataset.redirect || '/dekujeme/'; return; }

    const name = field('name');
    const email = field('email');
    const message = field('message');
    if (!name || !email || !message) return; // required pole (prohlížeč ohlídá, tohle je pojistka)

    submitForm({
      form: 'contact',
      name,
      email,
      company: field('company'),
      service: field('service'),
      message,
      marketing: (form.querySelector('[name="marketing"]') as HTMLInputElement | null)?.checked ? 'ano' : 'ne',
      consent: 'odesláním formuláře',
      lang: form.dataset.lang || 'cs',
      source: location.pathname,
    });

    window.location.href = form.dataset.redirect || '/dekujeme/';
  });
})();
