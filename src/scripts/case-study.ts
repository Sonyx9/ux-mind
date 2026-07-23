// Interakce detailu případové studie: progress bar čtení, scroll-reveal sekcí,
// rostoucí sloupce grafů a count-up hlavní statistiky. Respektuje prefers-reduced-motion;
// bez JS zůstává vše viditelné (reveal se aktivuje až třídou na <body>).

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Aktivace reveal režimu (progressive enhancement)
  document.body.classList.add('reveal-ready');

  // Progress bar čtení — tenká modrá linka nahoře
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0;background:#2D62FC;z-index:90;pointer-events:none;transition:width .1s linear;';
  document.body.appendChild(bar);
  function updateProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

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
