// Sdílené interakce homepage (CS / EN / DE): stopa za kurzorem, záznam pohledu,
// EMLI gauge, easter egg, čas. Hero markup je v src/components/HomeHero.astro.

// Záznam pohledu (ZAP/VYP) — když je zapnutý, stopa za kurzorem se nekreslí.
let gazeOn = false;

  // Cursor circle + trail — only in hero section, desktop only
  (function() {
    if (window.innerWidth < 1024) return;
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
      if (visible && !gazeOn) trail.push({ x: mx, y: my, t: performance.now() });
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

  // Záznam pohledu — myš místo očí. Zastavení kurzoru = fixace (kolečko roste s délkou),
  // skok mezi nimi = sakáda (čára). Dokud uživatel po zapnutí nehýbe myší, přehraje se ukázka.
  (function () {
    if (window.innerWidth < 1024) return;
    const btn = document.getElementById('gaze-toggle') as HTMLButtonElement | null;
    const modeEl = document.getElementById('gaze-mode');
    const readEl = document.getElementById('gaze-readout');
    const panel = document.getElementById('gaze-panel');
    const layer = document.getElementById('gaze-layer');
    const hero = document.querySelector<HTMLElement>('section.hero-shell');
    if (!btn || !modeEl || !readEl || !panel || !layer || !hero) return;
    const L = JSON.parse(btn.dataset.gaze || '{}') as Record<string, string>;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    type Fix = { x: number; y: number; t: number; dur: number; n: number };
    let fixes: Fix[] = [];
    let anchor: { x: number; y: number; t: number; f: Fix | null } | null = null;
    let n = 0, onAt = 0, movedOn = false, inside = false, raf = 0;
    let cx = -9999, cy = -9999; // pozice myši v okně
    let demoPts: { x: number; y: number; at: number; dur: number }[] = [];

    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      const r = hero.getBoundingClientRect();
      inside = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
      if (gazeOn && inside && performance.now() - onAt > 400) movedOn = true;
    });
    document.addEventListener('mouseleave', () => { inside = false; anchor = null; });

    // Ukázkové fixace přes skutečné prvky hlavičky (logo → nadpis → popis → tlačítko → obory → čísla)
    function buildDemo() {
      const hr = hero!.getBoundingClientRect();
      const at = (sel: string, fx: number, fy: number) => {
        const el = hero!.querySelector<HTMLElement>(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (!r.width) return null;
        return { x: r.left - hr.left + r.width * fx, y: r.top - hr.top + r.height * fy };
      };
      const plan: [string, number, number, number][] = [
        ['.hero-logo img', 0.45, 0.5, 320],
        ['.hero-h1', 0.12, 0.17, 520],
        ['.hero-h1', 0.55, 0.2, 380],
        ['.hero-h1', 0.45, 0.5, 460],
        ['.hero-sub', 0.35, 0.45, 300],
        ['.hero-cta-main', 0.5, 0.5, 640],
        ['.hero-forwhom-links', 0.3, 0.5, 380],
        ['.hero-stat-num', 0.3, 0.5, 520],
      ];
      const times = [600, 1000, 1650, 2150, 2750, 3200, 3700, 4400];
      demoPts = [];
      plan.forEach((p, i) => {
        const pt = at(p[0], p[1], p[2]);
        if (pt) demoPts.push({ ...pt, at: times[i], dur: p[3] });
      });
    }

    const pad = (v: number) => String(v).padStart(2, '0');

    function frame(now: number) {
      if (!gazeOn) return;
      const hr = hero!.getBoundingClientRect();
      const mx = cx - hr.left, my = cy - hr.top;
      // fixace se zaznamenávají až po prvním pohybu myši (do té doby běží ukázka)
      if (inside && movedOn) {
        if (!anchor || Math.hypot(mx - anchor.x, my - anchor.y) > 28) {
          anchor = { x: mx, y: my, t: now, f: null };
        } else {
          const dur = now - anchor.t;
          if (dur > 220) {
            if (!anchor.f) {
              n += 1;
              anchor.f = { x: anchor.x, y: anchor.y, t: now, dur, n };
              fixes.push(anchor.f);
              if (fixes.length > 8) fixes.shift();
            }
            anchor.f.dur = dur;
          }
        }
      }
      fixes = fixes.filter(f => now - f.t < 7000);

      const elOn = now - onAt;
      const live = fixes.length > 0 || movedOn;
      let src: Fix[];
      if (live) src = fixes;
      else if (reduced) src = demoPts.map((p, i) => ({ x: p.x, y: p.y, t: onAt, dur: p.dur, n: i + 1 }));
      else if (elOn < 9000) src = demoPts.filter(p => elOn >= p.at).map((p, i) => ({ x: p.x, y: p.y, t: onAt + p.at, dur: Math.min(p.dur, elOn - p.at), n: i + 1 }));
      else src = [];
      const fade = (f: Fix) => live
        ? Math.max(0, 1 - Math.max(0, now - f.t - 4000) / 3000)
        : (reduced || elOn < 7500 ? 1 : Math.max(0, 1 - (elOn - 7500) / 1500));

      let html = '';
      for (let i = 1; i < src.length; i++) {
        const p = src[i - 1], q = src[i];
        const w = Math.hypot(q.x - p.x, q.y - p.y);
        const r = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
        html += `<div style="position:absolute;left:${p.x}px;top:${p.y}px;width:${w}px;height:1px;background:#2D62FC;transform-origin:0 0;transform:rotate(${r}deg);opacity:${Math.min(fade(p), fade(q)) * 0.6}"></div>`;
      }
      for (const f of src) {
        const d = Math.min(16 + f.dur / 14, 64), o = fade(f) * 0.95;
        html += `<div style="position:absolute;left:${f.x}px;top:${f.y}px;width:${d}px;height:${d}px;border:1.5px solid #2D62FC;background:rgba(45,98,252,0.1);border-radius:50%;transform:translate(-50%,-50%);box-sizing:border-box;opacity:${o}"></div>`;
        html += `<span style="position:absolute;left:${f.x + d / 2 + 4}px;top:${f.y - d / 2 - 8}px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#2D62FC;white-space:nowrap;opacity:${o}">${pad(f.n)} · ${Math.round(f.dur)} MS</span>`;
      }
      layer!.innerHTML = html;

      const last = src[src.length - 1];
      const read = last ? `${L.fix} ${pad(last.n)} · ${Math.round(last.dur)} MS · ${src.length} ${L.rec}` : L.hintOn;
      if (readEl!.textContent !== read) readEl!.textContent = read;
      const mode = live ? L.live : L.demo;
      if (modeEl!.textContent !== mode) modeEl!.textContent = mode;
      raf = requestAnimationFrame(frame);
    }

    btn.addEventListener('click', () => {
      gazeOn = !gazeOn;
      btn.setAttribute('aria-pressed', String(gazeOn));
      fixes = []; n = 0; anchor = null; movedOn = false; onAt = performance.now();
      cancelAnimationFrame(raf);
      layer.innerHTML = '';
      panel.classList.toggle('hidden', !gazeOn);
      if (gazeOn) {
        buildDemo();
        raf = requestAnimationFrame(frame);
      } else {
        modeEl.textContent = L.off;
        readEl.textContent = L.hintOff;
      }
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
    if (window.innerWidth < 1024) return;
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
    let boxRect: DOMRect | null = null; // černý info box — překážka, od které se tečka odráží

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

      // odraz od černého info boxu — tečka za něj nezajíždí, odráží se jako od zdi
      if (boxRect) {
        const m2 = size / 2 + 4;
        const L = boxRect.left - m2, R = boxRect.right + m2, T = boxRect.top - m2, B = boxRect.bottom + m2;
        if (px > L && px < R && py > T && py < B) {
          const dL = px - L, dR = R - px, dT = py - T, dB = B - py;
          const minD = Math.min(dL, dR, dT, dB);
          if (minD === dL)      { px = L; if (vx > 0.4) bounced = true; vx = -Math.abs(vx) * 0.8; }
          else if (minD === dR) { px = R; if (vx < -0.4) bounced = true; vx = Math.abs(vx) * 0.8; }
          else if (minD === dT) { py = T; if (vy > 0.4) bounced = true; vy = -Math.abs(vy) * 0.8; }
          else                  { py = B; if (vy < -0.4) bounced = true; vy = Math.abs(vy) * 0.8; }
        }
      }

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
      const infoBox = document.getElementById('info-box');
      boxRect = infoBox ? infoBox.getBoundingClientRect() : null;
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
    const time = now.toLocaleTimeString(({ en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' } as Record<string, string>)[document.documentElement.lang] ?? 'cs-CZ', {
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
