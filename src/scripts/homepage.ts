// Sdílené interakce homepage (CZ i EN): hero animace, EMLI gauge, easter egg, čas.
// Používá se v src/pages/index.astro a src/pages/en/index.astro.

  // GIF plays once (Netscape block removed from file). Duration = 4760ms.
  (function () {
    const GIF_DURATION = 3330;

    // Spec-dashes loading animation — starts immediately, loops forever
    function blackenDashes() {
      const rows = document.querySelectorAll<HTMLElement>('.spec-dashes');
      const rowDelay = 350, barDelay = 90, barCount = 20;
      const rowDuration = barCount * barDelay;
      const totalDuration = rowDuration + (rows.length - 1) * rowDelay;

      function fillCycle(startDelay: number) {
        rows.forEach((row, ri) => {
          Array.from(row.querySelectorAll<HTMLElement>('span')).forEach((span, si) => {
            setTimeout(() => { span.style.color = '#2D62FC'; }, startDelay + ri * rowDelay + si * barDelay);
          });
        });
        const greyStart = startDelay + totalDuration + 600;
        rows.forEach((row, ri) => {
          Array.from(row.querySelectorAll<HTMLElement>('span')).forEach((span, si) => {
            setTimeout(() => { span.style.color = 'rgb(210,210,210)'; }, greyStart + ri * rowDelay + si * barDelay);
          });
        });
        setTimeout(() => fillCycle(0), greyStart + totalDuration + 400);
      }
      fillCycle(0);
    }

    // Annotations — appear after GIF finishes playing
    function animateAnnotations() {
      const gifContainer = document.getElementById('hero-gif-container');
      const gifH = gifContainer ? gifContainer.offsetHeight : 630;
      const gifW = gifContainer ? gifContainer.offsetWidth : 840;
      const scaleH = gifH / 630;
      const scaleW = gifW / 840;

      document.querySelectorAll<HTMLElement>('.ann').forEach((ann, i) => {
        setTimeout(() => {
          ann.style.transition = 'opacity 0.3s ease';
          ann.style.opacity = '1';
          const line = ann.querySelector<HTMLElement>('.ann-line');
          if (!line) return;
          line.style.transition = 'width 0.5s ease, height 0.5s ease';
          const base = line.dataset.size ? parseInt(line.dataset.size) : null;
          if (line.classList.contains('w-px')) {
            const size = Math.round((base ?? 150) * Math.min(scaleH, 1));
            line.style.height = size + 'px';
          } else {
            const size = Math.round((base ?? 170) * Math.min(scaleW, 1));
            line.style.width = size + 'px';
          }
        }, GIF_DURATION + i * 250);
      });
    }

    blackenDashes();

    const img = document.getElementById('hero-gif') as HTMLImageElement | null;
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        animateAnnotations();
      } else {
        img.addEventListener('load', animateAnnotations);
      }
    }
  })();

  // Count-up animation for stats box
  (function () {
    const stats = [
      { selector: '.stat-projects',     end: 50,  suffix: '+' },
      { selector: '.stat-respondents',  end: 200, suffix: '+' },
      { selector: '.stat-clicks',       end: 50,  suffix: '%' },
    ];
    const duration = 3330;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    function runCounter(el: HTMLElement, end: number, suffix: string) {
      const start = performance.now();
      function step(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(easeOut(progress) * end) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        stats.forEach(({ selector, end, suffix }) => {
          const el = document.querySelector<HTMLElement>(selector);
          if (el) runCounter(el, end, suffix);
        });
        observer.disconnect();
      });
    }, { threshold: 0.3 });

    const box = document.querySelector('.stat-projects')?.closest('div.space-y-2');
    if (box) observer.observe(box);
  })();

  // Cursor circle + trail — only in hero section, desktop only
  (function() {
    if (window.innerWidth < 768) return;
    const dot = document.getElementById('cursor-dot');
    const hero = document.querySelector<HTMLElement>('section');
    let mx = 0, my = 0, cx = 0, cy = 0;

    // Canvas trail
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9996;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const trail: {x: number, y: number, t: number}[] = [];

    function inHero() {
      if (!hero) return false;
      const rect = hero.getBoundingClientRect();
      return my >= rect.top && my <= rect.bottom && mx >= rect.left && mx <= rect.right;
    }

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      const visible = inHero();
      if (dot) dot.style.opacity = visible ? '1' : '0';
      if (visible) trail.push({ x: mx, y: my, t: performance.now() });
    });
    document.addEventListener('mouseleave', () => { if (dot) dot.style.opacity = '0'; });

    function animate() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (dot) { dot.style.left = cx + 'px'; dot.style.top = cy + 'px'; }

      // Draw trail
      const now = performance.now();
      const TRAIL_MS = 500;
      while (trail.length > 1 && now - trail[0].t > TRAIL_MS) trail.shift();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 1; i < trail.length; i++) {
        const age = (now - trail[i].t) / TRAIL_MS;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(10,10,10,${(1 - age) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }
    animate();

    // Click ripple — only inside hero section
    document.addEventListener('click', (e) => {
      if (!inHero()) return;
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) return;
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:6px;height:6px;border:1px solid #0A0A0A;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%) scale(1);transition:transform 0.4s ease,opacity 0.4s ease;opacity:1;`;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = 'translate(-50%,-50%) scale(5)';
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 420);
    });
  })();

  // EMLI gauge — needle sweep + counter, then subtle "live measurement" wobble
  (function () {
    const needle = document.getElementById('emli-needle');
    const arc = document.getElementById('emli-arc');
    const val = document.getElementById('emli-value');
    if (!needle || !arc || !val) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const TARGET = 65;
    function render(v: number) {
      needle!.style.transform = `rotate(${v * 1.8}deg)`;
      arc!.setAttribute('stroke-dasharray', `${Math.max(v, 0.5)} 100`);
      val!.textContent = String(Math.round(v));
    }
    render(0);

    let started = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();

        const t0 = performance.now();
        const DURATION = 2200;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        function idle(now: number) {
          const t = now - t0;
          const v = TARGET + Math.sin(t / 900) * 1.6 + Math.sin(t / 347) * 0.6;
          render(v);
          requestAnimationFrame(idle);
        }
        function sweep(now: number) {
          const p = Math.min((now - t0) / DURATION, 1);
          render(easeOut(p) * TARGET);
          if (p < 1) requestAnimationFrame(sweep);
          else requestAnimationFrame(idle);
        }
        requestAnimationFrame(sweep);
      });
    }, { threshold: 0.4 });

    const svg = needle.closest('svg');
    if (svg) io.observe(svg);
  })();

  // Easter egg: tečka se snaží utéct před myší; když ji chytíš, postupně se nafukuje,
  // až praskne; když ji přestaneš honit, po chvilce se vrátí na své místo
  (function () {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hotspot = document.getElementById('logo-dot-hotspot');
    const patch = document.getElementById('logo-dot-patch');
    const hero = document.querySelector<HTMLElement>('section.hero-shell');
    if (!hotspot || !patch || !hero) return;

    let active = false;
    let px = 0, py = 0, vx = 0, vy = 0;
    let size = 14, baseSize = 14;
    let mx = -9999, my = -9999;
    let lastNear = 0, lastT = 0, lastBounce = 0;
    let raf = 0;

    const dot = document.createElement('div');
    dot.style.cssText = 'position:fixed;z-index:20;background:#2D62FC;border-radius:50%;pointer-events:none;display:none;transform:translate(-50%,-50%);';
    document.body.appendChild(dot);

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function draw() {
      dot.style.left = px + 'px';
      dot.style.top = py + 'px';
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
    }

    function finish() {
      cancelAnimationFrame(raf);
      dot.style.display = 'none';
      active = false;
    }

    function pop() {
      // PRÁSK — expandující prstenec + odlétající kapičky
      const cx = px, cy = py, cs = size;
      finish();
      const ring = document.createElement('div');
      ring.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${cs}px;height:${cs}px;border:2px solid #2D62FC;border-radius:50%;pointer-events:none;z-index:20;transform:translate(-50%,-50%);opacity:1;transition:width .45s ease-out,height .45s ease-out,opacity .45s ease-out;`;
      document.body.appendChild(ring);
      const bits: HTMLElement[] = [];
      for (let i = 0; i < 8; i++) {
        const b = document.createElement('div');
        b.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:5px;height:5px;background:#2D62FC;border-radius:50%;pointer-events:none;z-index:20;transform:translate(-50%,-50%);opacity:1;transition:transform .5s ease-out,opacity .5s ease-out;`;
        document.body.appendChild(b);
        bits.push(b);
      }
      requestAnimationFrame(() => {
        ring.style.width = '90px';
        ring.style.height = '90px';
        ring.style.opacity = '0';
        bits.forEach((b, i) => {
          const a = (i / 8) * Math.PI * 2;
          const r = 55 + Math.random() * 25;
          b.style.transform = `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px))`;
          b.style.opacity = '0';
        });
      });
      setTimeout(() => { ring.remove(); bits.forEach(b => b.remove()); }, 650);
      setTimeout(() => { patch!.style.display = 'none'; }, 900); // po prasknutí tečka po chvilce naskočí doma
    }

    function returnHome() {
      // přestal ji honit → doplachtí zpět na své místo
      cancelAnimationFrame(raf);
      const r = patch!.getBoundingClientRect();
      const hx = r.left + r.width / 2, hy = r.top + r.height / 2;
      const sx = px, sy = py, ss = size;
      const t0 = performance.now();
      const D = 600;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      function back(now: number) {
        const p = Math.min((now - t0) / D, 1);
        px = sx + (hx - sx) * ease(p);
        py = sy + (hy - sy) * ease(p);
        size = ss + (baseSize - ss) * ease(p);
        draw();
        if (p < 1) { requestAnimationFrame(back); return; }
        finish();
        patch!.style.display = 'none';
      }
      requestAnimationFrame(back);
    }

    function step(now: number) {
      if (!active) return;
      const dt = Math.min(now - lastT, 40);
      lastT = now;

      const hr = hero!.getBoundingClientRect();
      if (hr.bottom < 40) { finish(); patch!.style.display = 'none'; return; }

      const dx = px - mx, dy = py - my;
      const d = Math.hypot(dx, dy) || 1;

      // útěk před kurzorem — čím nafouknutější, tím pomalejší
      if (d < 150) {
        const f = ((150 - d) / 150) * 2.4 * (baseSize / size);
        vx += (dx / d) * f;
        vy += (dy / d) * f;
      }
      vx *= 0.93; vy *= 0.93;
      px += vx; py += vy;

      const m = size / 2 + 6;
      const bottom = Math.min(hr.bottom, window.innerHeight);
      let bounced = false;
      if (px < hr.left + m)  { px = hr.left + m;  if (vx < -0.4) bounced = true; vx = Math.abs(vx) * 0.8; }
      if (px > hr.right - m) { px = hr.right - m; if (vx > 0.4) bounced = true;  vx = -Math.abs(vx) * 0.8; }
      if (py < Math.max(hr.top, 0) + m) { py = Math.max(hr.top, 0) + m; if (vy < -0.4) bounced = true; vy = Math.abs(vy) * 0.8; }
      if (py > bottom - m)   { py = bottom - m;   if (vy > 0.4) bounced = true;  vy = -Math.abs(vy) * 0.8; }

      // náraz do kraje → tečka viditelně povyroste; po několika nárazech praskne
      if (bounced && now - lastBounce > 250) {
        lastBounce = now;
        size += 5;
        if (size >= 54) { pop(); return; }
      }

      // klid → po 1,5 s se vrátí domů
      if (d < 260) lastNear = now;
      if (now - lastNear > 1500) { returnHome(); return; }

      draw();
      raf = requestAnimationFrame(step);
    }

    hotspot.addEventListener('mouseenter', () => {
      if (active) return;
      active = true;
      patch!.style.display = 'block';
      const r = patch!.getBoundingClientRect();
      baseSize = Math.max(r.width, 10);
      size = baseSize;
      px = r.left + r.width / 2;
      py = r.top + r.height / 2;
      const dx = px - mx, dy = py - my;
      const d = Math.hypot(dx, dy) || 1;
      vx = (dx / d) * 12 + (Math.random() - 0.5) * 5;
      vy = (dy / d) * 12 + (Math.random() - 0.5) * 5;
      dot.style.display = 'block';
      draw();
      lastNear = performance.now();
      lastT = performance.now();
      raf = requestAnimationFrame(step);
    });
  })();

  function updateTime() {
    const el = document.getElementById('local-time');
    if (!el) return;
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const date = `${dd}/${mm}/${yyyy}`;
    const time = now.toLocaleTimeString(document.documentElement.lang === 'en' ? 'en-GB' : document.documentElement.lang === 'de' ? 'de-DE' : 'cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Europe/Prague'
    });
    el.textContent = `PRG ${time}   ${date}`;
  }
  updateTime();
  setInterval(updateTime, 1000);
