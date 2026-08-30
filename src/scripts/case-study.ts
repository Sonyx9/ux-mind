// Interakce detailu případové studie: progress bar čtení, scroll-reveal sekcí,
// rostoucí sloupce grafů a count-up hlavní statistiky. Respektuje prefers-reduced-motion;
// bez JS zůstává vše viditelné (reveal se aktivuje až třídou na <body>).

import { submitForm } from './forms';

// Žádost o kompletní studii: uloží lead (Google Sheet přes Apps Script) a otevře PDF studie.
(function () {
  const dialog = document.getElementById('study-dialog') as HTMLDialogElement | null;
  if (dialog) {
    document.querySelectorAll('.study-modal-open').forEach(btn =>
      btn.addEventListener('click', () => dialog.showModal())
    );
    dialog.querySelector('.study-modal-close')?.addEventListener('click', () => dialog.close());
    // Klik na backdrop zavře modal
    dialog.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });
  }

  document.querySelectorAll<HTMLFormElement>('form.study-request').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = (form.querySelector('[name="name"]') as HTMLInputElement | null)?.value.trim();
      const email = (form.querySelector('[name="email"]') as HTMLInputElement | null)?.value.trim();
      const company = (form.querySelector('[name="company"]') as HTMLInputElement | null)?.value.trim();
      if (!name || !email) return;
      const pdf = form.dataset.pdf;
      if (!pdf) return;

      // Ulož lead do Google Sheetu + Apps Script pošle PDF e-mailem (viz apps-script/)
      submitForm({
        form: 'study',
        name,
        email,
        company: company || '',
        study: form.dataset.study || '',
        pdf,
        // Zobrazení studie = na základě žádosti (odeslání formuláře). Marketingový
        // souhlas je oddělený, nepovinný checkbox — zapisujeme jeho skutečný stav,
        // ne fiktivní „ano". Retroaktivně je tak jasné, kdo marketing odsouhlasil.
        consent: 'zobrazení studie (žádost odesláním)',
        marketing: (form.querySelector('[name="marketing"]') as HTMLInputElement | null)?.checked ? 'ano' : 'ne',
        source: location.pathname,
      });

      window.open(pdf, '_blank', 'noopener');
      const done = form.querySelector('.study-request-done');
      done?.querySelector<HTMLAnchorElement>('.study-pdf-link')?.setAttribute('href', pdf);
      done?.classList.remove('hidden');
    });
  });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Aktivace reveal režimu (progressive enhancement)
  document.body.classList.add('reveal-ready');
  // Progress bar čtení řeší globálně BaseLayout (všude mimo homepage)

  // Scroll-reveal sekcí
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

  // Rostoucí sloupce grafů — šířka se animuje CSS přechodem po vstupu do viewportu
  const bars = document.querySelectorAll<SVGRectElement>('rect.viz-bar');
  bars.forEach(r => {
    r.dataset.final = r.getAttribute('width') || '0';
    r.setAttribute('width', '0');
  });
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const r = e.target as SVGRectElement;
      requestAnimationFrame(() => r.setAttribute('width', r.dataset.final || '0'));
      barIO.unobserve(r);
    });
  }, { threshold: 0.4 });
  bars.forEach(r => barIO.observe(r));

  // Count-up hlavní statistiky v banneru
  const stat = document.querySelector<HTMLElement>('[data-count]');
  if (stat) {
    const end = parseInt(stat.dataset.count || '0', 10);
    const suffix = stat.dataset.suffix || '';
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const statIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        statIO.unobserve(stat);
        const t0 = performance.now();
        const D = 1400;
        function tick(now: number) {
          const p = Math.min((now - t0) / D, 1);
          stat!.textContent = Math.round(easeOut(p) * end) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    statIO.observe(stat);
  }
})();
