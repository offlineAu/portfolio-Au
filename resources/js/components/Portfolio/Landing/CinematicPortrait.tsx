import React, { useRef, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/* ════════════════════════════════════════════════════════════
   STAGE MACHINE
   0 = card back (default)
   1 = burn reveal → photo front
   2 = orbit stats scattered
   3 = expanded modal
════════════════════════════════════════════════════════════ */
type Stage = 0 | 1 | 2 | 3;

const IDLE_REVERSE_MS = 45_000;

/* ── DATA ─────────────────────────────────────────────────── */
const CORE_STATS = [
    { id: 'role', label: 'Web Developer',        icon: '⬡', color: '#c8a96e' },
    { id: 'spec', label: 'Laravel + React',       icon: '◈', color: '#e8c98e' },
    { id: 'ui',   label: 'Backend Focused',       icon: '◉', color: '#c8a96e' },
    { id: 'ai',   label: 'AI Patron',             icon: '✦', color: '#f0d898' },
    { id: 'ml',   label: 'ML / NLP Enthusiast',   icon: '⬡', color: '#c8a96e' },
    { id: 'cap',  label: 'Capstone: SentiSphere', icon: '◈', color: '#e8c98e' },
];

const EXPANDED_STATS = [
    {
        id: 'proj', label: 'Projects', value: '1', sub: 'Shipped',
        detail: {
            title: 'SentiSphere',
            description: 'A sentiment analysis web app built as a capstone project. Processes user-submitted text through an NLP pipeline and returns real-time sentiment scores with visual feedback.',
            tags: ['Laravel', 'React', 'Python', 'HuggingFace', 'Fast API'],
            link: 'https://github.com/offlineAu/sentisphere',
            linkLabel: 'View on GitHub',
        },
    },
    {
        id: 'stack', label: 'Tech Stack', value: '6', sub: 'Tools',
        detail: {
            title: '6 Tools in Active Use',
            description: 'Proficient across a full modern web stack — Laravel for backend architecture, React + Inertia for seamless SPAs, Tailwind for utility-first styling, and MySQL/PostgreSQL for data persistence.',
            tags: ['React', 'TypeScript', 'ReactNative', 'Python', 'PHP', 'JavaScript'],
            link: null, linkLabel: null,
        },
    },
    {
        id: 'lead', label: 'Leadership', value: 'Capstone', sub: 'role',
        detail: {
            title: 'Project Manager',
            description: 'Served as the project manager in developing capstone project.',
            tags: ['Leadership', 'Communication'],
            link: null, linkLabel: null,
        },
    },
    {
        id: 'res', label: 'Research', value: 'ML', sub: 'Focus',
        detail: {
            title: 'Machine Learning Research Focus',
            description: 'Academic and personal interest in Natural Language Processing, Machine Learning, AI with hands-on experience applying transformer-based models and sentiment classification pipelines.',
            tags: ['NLP', 'Transformers', 'Python', 'Machine Learning'],
            link: null, linkLabel: null,
        },
    },
    {
        id: 'cert', label: 'Certs', value: '1', sub: 'Ongoing',
        detail: {
            title: '1 Certifications',
            description: 'A Civil Service Professional Level Passer',
            tags: ['Government Certificate'],
            link: null, linkLabel: null,
        },
    },
    {
        id: 'des', label: 'UI Design', value: 'A+', sub: 'Quality',
        detail: {
            title: 'UI/UX — Quality First',
            description: 'Strong focus on interface quality, from layout precision to micro-interactions. Designs with both aesthetics and usability in mind, treating the frontend as a product.',
            tags: ['React', 'Tailwind', 'Canvas', 'Accessibility'],
            link: null, linkLabel: null,
        },
    },
];

/* ── ORBIT POSITIONS ─────────────────────────────────────── */
function generateOrbitPositions(rect: DOMRect): Array<{x:number;y:number}> {
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const baseAngles = [-140, -60, 20, 80, 140, -100];
    const CARD_W = 115;
    const CARD_H = 76;
    const PAD    = 12;
    return baseAngles.map((baseAngle) => {
        const angle = baseAngle + (Math.random() - 0.5) * 30;
        const minDist = rect.width * 0.72;
        const maxDist = rect.width * 1.05;
        const dist = minDist + Math.random() * (maxDist - minDist);
        const rad = (angle * Math.PI) / 180;
        const rawX = cx + Math.cos(rad) * dist;
        const rawY = cy + Math.sin(rad) * dist;
        return {
            x: Math.max(CARD_W / 2 + PAD, Math.min(window.innerWidth  - CARD_W / 2 - PAD, rawX)),
            y: Math.max(CARD_H / 2 + PAD, Math.min(window.innerHeight - CARD_H / 2 - PAD, rawY)),
        };
    });
}

/* ════════════════════════════════════════════════════════════
   BURN CANVAS
   FIX: Canvas starts fully opaque black on frame 0,
        so even if the front face is visible before the first
        rAF tick, no photo shows through.
        
   Reveal direction: TOP → BOTTOM
   - Column delays fan from top-centre outward so the burn
     front travels downward in a gentle wave.
════════════════════════════════════════════════════════════ */

function makeNoise() {
  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = perm[i + 256] = (Math.random() * 256) | 0;
  return function noise2(x: number, y: number): number {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const h = (n: number, dx: number, dy: number) => {
      const g = perm[n & 255] % 4;
      return [1, 1, -1, -1][g] * dx + [1, -1, 1, -1][g] * dy;
    };
    const a = perm[X] + Y, b = perm[X + 1] + Y;
    return (
      h(perm[a], xf, yf) * (1 - u) * (1 - v) +
      h(perm[b], xf - 1, yf) * u * (1 - v) +
      h(perm[a + 1], xf, yf - 1) * (1 - u) * v +
      h(perm[b + 1], xf - 1, yf - 1) * u * v
    );
  };
}

const MAX_P = 520;
interface ParticlePool {
  x: Float32Array; y: Float32Array;
  vx: Float32Array; vy: Float32Array;
  life: Float32Array; maxLife: Float32Array;
  size: Float32Array; type: Uint8Array;
  count: number;
}
function makePool(): ParticlePool {
  return {
    x: new Float32Array(MAX_P), y: new Float32Array(MAX_P),
    vx: new Float32Array(MAX_P), vy: new Float32Array(MAX_P),
    life: new Float32Array(MAX_P), maxLife: new Float32Array(MAX_P),
    size: new Float32Array(MAX_P), type: new Uint8Array(MAX_P),
    count: 0,
  };
}

function spawnParticle(p: ParticlePool, x: number, y: number, intense: number) {
  if (p.count >= MAX_P) return;
  const i = p.count++;
  p.x[i] = x + (Math.random() - 0.5) * 28;
  p.y[i] = y + (Math.random() - 0.5) * 6;
  p.vx[i] = (Math.random() - 0.5) * 1.4;
  p.vy[i] = -(0.15+ Math.random() * 1.0) * intense;
  p.life[i] = 1;
  p.maxLife[i] = 60 + Math.random() * 160;
  p.size[i] = 0.5 + Math.random() * 1.8;
  const r = Math.random();
  p.type[i] = r < 0.22 ? 1 : r < 0.38 ? 2 : 0;
}

function tickParticles(p: ParticlePool) {
  let alive = 0;
  for (let i = 0; i < p.count; i++) {
    p.life[i] -= 1 / p.maxLife[i];
    if (p.life[i] <= 0) continue;
    p.vx[i] += (Math.random() - 0.5) * 0.08;
    p.vy[i] -= 0.01 + Math.random() * 0.009;
    p.x[i] += p.vx[i];
    p.y[i] += p.vy[i];
    p.x[alive] = p.x[i]; p.y[alive] = p.y[i];
    p.vx[alive] = p.vx[i]; p.vy[alive] = p.vy[i];
    p.life[alive] = p.life[i]; p.maxLife[alive] = p.maxLife[i];
    p.size[alive] = p.size[i]; p.type[alive] = p.type[i];
    alive++;
  }
  p.count = alive;
}

function drawParticles(ctx: CanvasRenderingContext2D, p: ParticlePool) {
  for (let i = 0; i < p.count; i++) {
    const t = p.life[i];
    if (p.type[i] === 1) {
      const a = t < 0.3 ? t / 0.3 : t;
      const grad = ctx.createRadialGradient(p.x[i], p.y[i], 0, p.x[i], p.y[i], p.size[i] * 3);
      grad.addColorStop(0, `rgba(255,252,220,${a * 0.7})`);
      grad.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.beginPath(); ctx.arc(p.x[i], p.y[i], p.size[i] * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x[i], p.y[i], p.size[i] * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,245,190,${a * 0.9})`; ctx.fill();
    } else if (p.type[i] === 2) {
      const a = (t < 0.4 ? t / 0.4 : 1 - (t - 0.4) / 0.6) * 0.26;
      ctx.beginPath(); ctx.arc(p.x[i], p.y[i], p.size[i] * 4.0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20,12,4,${a})`; ctx.fill();
    } else {
      const g = (85 + t * 115) | 0;
      const a = t < 0.2 ? t / 0.2 : t > 0.75 ? (1 - t) / 0.25 : 1;
      const grad = ctx.createRadialGradient(p.x[i], p.y[i], 0, p.x[i], p.y[i], p.size[i] * 4.5);
      grad.addColorStop(0,   `rgba(255,${g},15,${a * 0.4})`);
      grad.addColorStop(0.4, `rgba(255,${Math.min(g + 40, 220)},30,${a * 0.18})`);
      grad.addColorStop(1,   `rgba(0,0,0,0)`);
      ctx.beginPath(); ctx.arc(p.x[i], p.y[i], p.size[i] * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x[i], p.y[i], p.size[i], 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,${g},15,${a * 0.85})`; ctx.fill();
    }
  }
}


function drawFlameTongue(
  ctx: CanvasRenderingContext2D,
  cx: number, baseY: number,
  width: number, height: number,
  intensity: number,
  noise: ReturnType<typeof makeNoise>,
  t: number
) {
  if (intensity <= 0 || height <= 0) return;
  const w1 = noise(cx * 0.04 + t * 0.28, baseY * 0.035) * width * 0.45;
  const w2 = noise(cx * 0.06 + t * 0.18, baseY * 0.06 + 10) * width * 0.25;

  ctx.beginPath();
  ctx.moveTo(cx - width * 0.52 + w1, baseY);
  ctx.bezierCurveTo(cx - width * 0.65 + w1, baseY - height * 0.35, cx - width * 0.22 + w1 * 0.6, baseY - height * 0.78, cx + w1 * 0.3, baseY - height);
  ctx.bezierCurveTo(cx + width * 0.22 + w1 * 0.6, baseY - height * 0.78, cx + width * 0.65 + w1, baseY - height * 0.35, cx + width * 0.52 + w1, baseY);
  ctx.closePath();
  const g1 = ctx.createLinearGradient(cx, baseY - height, cx, baseY);
  g1.addColorStop(0, `rgba(40,10,0,0)`);
  g1.addColorStop(0.25, `rgba(160,45,0,${intensity * 0.45})`);
  g1.addColorStop(0.65, `rgba(210,100,5,${intensity * 0.72})`);
  g1.addColorStop(1, `rgba(190,130,20,${intensity * 0.88})`);
  ctx.fillStyle = g1; ctx.fill();

  const ww = width * 0.60, hh = height * 0.70;
  ctx.beginPath();
  ctx.moveTo(cx - ww * 0.42 + w2, baseY);
  ctx.bezierCurveTo(cx - ww * 0.55 + w2, baseY - hh * 0.45, cx - ww * 0.12 + w2 * 0.5, baseY - hh * 0.88, cx + w2 * 0.2, baseY - hh);
  ctx.bezierCurveTo(cx + ww * 0.12 + w2 * 0.5, baseY - hh * 0.88, cx + ww * 0.55 + w2, baseY - hh * 0.45, cx + ww * 0.42 + w2, baseY);
  ctx.closePath();
  const g2 = ctx.createLinearGradient(cx, baseY - hh, cx, baseY);
  g2.addColorStop(0, `rgba(230,170,30,0)`);
  g2.addColorStop(0.35, `rgba(240,175,35,${intensity * 0.6})`);
  g2.addColorStop(0.75, `rgba(255,195,50,${intensity * 0.82})`);
  g2.addColorStop(1, `rgba(255,205,60,${intensity * 0.94})`);
  ctx.fillStyle = g2; ctx.fill();

  const w3 = width * 0.26, h3 = height * 0.36;
  const w3b = noise(cx * 0.08 + t * 0.4, baseY * 0.08 + 20) * w3 * 0.3;
  ctx.beginPath();
  ctx.moveTo(cx - w3 * 0.32 + w3b, baseY);
  ctx.bezierCurveTo(cx - w3 * 0.42 + w3b, baseY - h3 * 0.55, cx + w3b * 0.5, baseY - h3, cx + w3b * 0.1, baseY - h3);
  ctx.bezierCurveTo(cx + w3b * 0.5, baseY - h3, cx + w3 * 0.42 + w3b, baseY - h3 * 0.55, cx + w3 * 0.32 + w3b, baseY);
  ctx.closePath();
  const g3 = ctx.createLinearGradient(cx, baseY - h3, cx, baseY);
  g3.addColorStop(0, `rgba(255,255,230,0)`);
  g3.addColorStop(0.4, `rgba(255,252,210,${intensity * 0.55})`);
  g3.addColorStop(1, `rgba(255,245,185,${intensity * 0.78})`);
  ctx.fillStyle = g3; ctx.fill();
}

function BurnCanvas({ active, idle, reverse, onDone }: {
  active: boolean;
  idle: boolean;
  reverse: boolean;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);
  const doneRef   = useRef(false);
  const lingerPoolRef = useRef<ParticlePool | null>(null);
  const lingerRafRef  = useRef<number | null>(null);

  // IDLE: paint opaque black to hide the photo during card flip
  useEffect(() => {
    if (active || !idle) return;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth  || 300;
    const H = canvas.offsetHeight || 480;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(DPR, DPR);
    ctx.fillStyle = 'rgb(6, 4, 2)';
    ctx.fillRect(0, 0, W, H);
  }, [idle, active]);

  // ACTIVE: run burn animation
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth  || 300;
    const H = canvas.offsetHeight || 480;
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(DPR, DPR);
    // Start opaque
    ctx.fillStyle = 'rgb(6, 4, 2)';
    ctx.fillRect(0, 0, W, H);

    doneRef.current = false;
    const noise = makeNoise();
    const pool  = makePool();
    const COLS  = 80;
    const colW  = W / COLS;
    const delays   = new Float32Array(COLS);
    const flameVar = new Float32Array(COLS);
    for (let c = 0; c < COLS; c++) {
      delays[c]   = Math.random() * 180;
      flameVar[c] = 0.75 + Math.random() * 0.5;
    }
    const TOTAL_MS = 2600;
    const REV_MS   = 2200;
    let startTime: number | null = null;
    let frameT = 0;

    function tick(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      frameT += 0.016;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(6, 4, 2, 1)';
      ctx.fillRect(0, 0, W, H);
      let allDone = true;
      for (let c = 0; c < COLS; c++) {
        const x  = c * colW;
        const cx = x + colW / 2;
        let colT: number;
        if (reverse) {
          colT = Math.max(0, Math.min(1, (elapsed - delays[COLS - 1 - c] * 0.4) / (REV_MS * 0.72)));
        } else {
          colT = Math.max(0, Math.min(1, (elapsed - delays[c] * 0.4) / (TOTAL_MS * 0.68)));
        }
        if (colT < 1) allDone = false;
        if (!reverse) {
          const clearedBottom = H * colT;
          if (clearedBottom > 0) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fillRect(x, 0, colW + 0.5, clearedBottom);
          }
        } else {
          const charBottom = H * colT;
          if (charBottom < H) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fillRect(x, charBottom, colW + 0.5, H - charBottom);
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      for (let c = 0; c < COLS; c++) {
        const x  = c * colW;
        const cx = x + colW / 2;
        let colT: number;
        if (reverse) {
          colT = Math.max(0, Math.min(1, (elapsed - delays[COLS - 1 - c] * 0.4) / (REV_MS * 0.72)));
        } else {
          colT = Math.max(0, Math.min(1, (elapsed - delays[c] * 0.4) / (TOTAL_MS * 0.68)));
        }
        if (!reverse) {
          const frontierY = H * colT;
          if (colT > 0.01 && colT < 0.985) {
            const eI = colT < 0.12 ? colT / 0.12 : colT > 0.9 ? (1 - colT) / 0.1 : 1;
            const fH = (20 + noise(c * 0.13 + frameT * 0.22, frameT * 0.38) * 12) * flameVar[c];
            const rg = ctx.createRadialGradient(cx, frontierY, 0, cx, frontierY, colW * 4.5);
            rg.addColorStop(0,   `rgba(230,150,20,${eI * 0.22})`);
            rg.addColorStop(0.4, `rgba(180,90,10,${eI * 0.09})`);
            rg.addColorStop(1,   `rgba(0,0,0,0)`);
            ctx.fillStyle = rg;
            ctx.fillRect(cx - colW * 4.5, frontierY - colW * 4.5, colW * 9, colW * 9);
            drawFlameTongue(ctx, cx, frontierY, colW * 2.8, fH, eI, noise, frameT);
            if (Math.random() < 0.32) spawnParticle(pool, cx, frontierY, eI);
          }
          if (colT > 0.05 && colT < 0.97) {
            const eH = Math.min(20, H - H * colT);
            const eg = ctx.createLinearGradient(x, H * colT, x, H * colT + eH);
            eg.addColorStop(0,   `rgba(140,50,4,0.3)`);
            eg.addColorStop(0.5, `rgba(180,80,8,0.15)`);
            eg.addColorStop(1,   `rgba(0,0,0,0)`);
            ctx.fillStyle = eg;
            ctx.fillRect(x, H * colT, colW + 0.5, eH);
          }
        } else {
          const charBottom = H * colT;
          if (colT > 0.02 && colT < 0.97) {
            const intensity = Math.sin(colT * Math.PI * 0.85) * 0.8 + 0.2;
            const fH = (16 + noise(c * 0.14, frameT * 0.45) * 9) * flameVar[c];
            const rg = ctx.createRadialGradient(cx, charBottom, 0, cx, charBottom, colW * 4.5);
            rg.addColorStop(0,   `rgba(230,150,20,${intensity * 0.20})`);
            rg.addColorStop(0.4, `rgba(180,90,10,${intensity * 0.08})`);
            rg.addColorStop(1,   `rgba(0,0,0,0)`);
            ctx.fillStyle = rg;
            ctx.fillRect(cx - colW * 4.5, charBottom - colW * 4.5, colW * 9, colW * 9);
            drawFlameTongue(ctx, cx, charBottom, colW * 2.8, fH, intensity, noise, frameT);
            if (Math.random() < 0.15) spawnParticle(pool, cx, charBottom, intensity);
          }
        }
      }
      tickParticles(pool);
      drawParticles(ctx, pool);
      if (allDone && !doneRef.current) {
        doneRef.current = true;

        // Transfer surviving burn particles into the linger pool
        const lp = makePool();
        for (let i = 0; i < pool.count && lp.count < MAX_P; i++) {
            const idx = lp.count++;
            lp.x[idx]       = pool.x[i];
            lp.y[idx]       = pool.y[i];
            lp.vx[idx]      = pool.vx[i];
            lp.vy[idx]      = pool.vy[i];
            lp.life[idx]    = pool.life[i];
            lp.maxLife[idx] = pool.maxLife[i];  // keep original lifetime
            lp.size[idx]    = pool.size[i];
            lp.type[idx]    = pool.type[i];
        }

        // Optionally add a few extra long-lived embers to supplement
        const EXTRA = 18;
        for (let n = 0; n < EXTRA && lp.count < MAX_P; n++) {
            const idx = lp.count++;
            lp.x[idx]       = W * 0.1 + Math.random() * W * 0.8;
            lp.y[idx]       = H * 0.3 + Math.random() * H * 0.65;
            lp.vx[idx]      = (Math.random() - 0.5) * 0.5;
            lp.vy[idx]      = -(0.04 + Math.random() * 0.18);
            lp.life[idx]    = 1;
            lp.maxLife[idx] = 1800 + Math.random() * 1800;  // long-lived only
            lp.size[idx]    = 0.4 + Math.random() * 1.4;
            lp.type[idx]    = Math.random() < 0.3 ? 1 : 0;
        }

        lingerPoolRef.current = lp;

        const canvas = canvasRef.current!;
        const ctx2   = canvas.getContext('2d')!;
        function lingerTick() {
            const pool = lingerPoolRef.current;
            if (!pool || pool.count === 0) {
            lingerPoolRef.current = null;
            onDone();
            return;
            }
            ctx2.clearRect(0, 0, W, H);

            for (let i = 0; i < pool.count; i++) {
            if (pool.vy[i] > -0.12) {
                pool.vx[i] += Math.sin(performance.now() * 0.0008 + i * 1.7) * 0.008;
                pool.vy[i] = -(0.03 + Math.random() * 0.04);
            }
            }

            tickParticles(pool);
            drawParticles(ctx2, pool);
            lingerRafRef.current = requestAnimationFrame(lingerTick);
        }
        lingerRafRef.current = requestAnimationFrame(lingerTick);
        return;

      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (lingerRafRef.current) cancelAnimationFrame(lingerRafRef.current);
      lingerPoolRef.current = null;
    };
  }, [active, reverse, onDone]);

  if (!idle && !active && !lingerPoolRef.current) return null;
  return <canvas ref={canvasRef} className="cp-burn-canvas" />;
}

/* ── ORBIT CARD ──────────────────────────────────────────── */
function OrbitCard({
    stat, visible, index, pos, onSelect,
}: {
    stat: typeof EXPANDED_STATS[0];
    visible: boolean;
    index: number;
    pos: { x:number; y:number };
    onSelect: (stat: typeof EXPANDED_STATS[0]) => void;
}) {
    return (
        <div
            className={`orbit-card${visible ? ' orbit-card--visible' : ''}`}
            style={{
                left: `${pos.x}px`,
                top:  `${pos.y}px`,
                transitionDelay: visible ? `${index * 0.08}s` : '0s',
            }}
            onClick={() => visible && onSelect(stat)}
        >
            <div className="orbit-card__value">{stat.value}</div>
            <div className="orbit-card__label">{stat.label}</div>
            <div className="orbit-card__sub">{stat.sub}</div>
            <span className="orbit-card__corner orbit-card__corner--tl" />
            <span className="orbit-card__corner orbit-card__corner--br" />
        </div>
    );
}

/* ── EXPANDED PANEL ──────────────────────────────────────── */
function ExpandedPanel({
    stats, visible, activeIndex, onClose,
}: {
    stats: typeof EXPANDED_STATS;
    visible: boolean;
    activeIndex: number;
    onClose: () => void;
}) {
    const [current,       setCurrent]       = useState(activeIndex);
    const [animating,     setAnimating]     = useState(false);
    const [userInteracted,setUserInteracted]= useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (activeIndex === current) return;
        setAnimating(true);
        const t = setTimeout(() => { setCurrent(activeIndex); setAnimating(false); }, 220);
        return () => clearTimeout(t);
    }, [activeIndex]);

    useEffect(() => {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        if (!visible || userInteracted) return;
        intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % stats.length), 3000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [visible, userInteracted, stats.length]);

    useEffect(() => { if (!visible) setUserInteracted(false); }, [visible]);

    const goTo = useCallback((i: number) => {
        setUserInteracted(true);
        setAnimating(true);
        setTimeout(() => { setCurrent(i); setAnimating(false); }, 220);
    }, []);

    const stat = stats[current];

    return (
        <div className={`ep-panel${visible ? ' ep-panel--visible' : ''}`}>
            <button className="ep-close" onClick={onClose} aria-label="Close">
                <span className="ep-close__line" />
                <span className="ep-close__line" />
            </button>
            <div className="ep-dots">
                {stats.map((s, i) => (
                    <button key={s.id} className={`ep-dot${i === current ? ' ep-dot--active' : ''}`}
                        onClick={() => goTo(i)} aria-label={s.label} />
                ))}
            </div>
            <div className={`ep-content${animating ? ' ep-content--exit' : ''}`}>
                <div className="ep-eyebrow">
                    <span className="ep-eyebrow__value">{stat.value}</span>
                    <span className="ep-eyebrow__sub">{stat.sub}</span>
                </div>
                <h2 className="ep-title">{stat.detail.title}</h2>
                <p className="ep-description">{stat.detail.description}</p>
                <div className="ep-tags">
                    {stat.detail.tags.map(tag => <span key={tag} className="ep-tag">{tag}</span>)}
                </div>
                {stat.detail.link && (
                    <a href={stat.detail.link} target="_blank" rel="noopener noreferrer" className="ep-link">
                        {stat.detail.linkLabel}<span className="ep-link__arrow">↗</span>
                    </a>
                )}
            </div>
            <div className="ep-nav">
                <button className="ep-nav__btn" onClick={() => goTo((current - 1 + stats.length) % stats.length)}>←</button>
                <span className="ep-nav__count">{current + 1} / {stats.length}</span>
                <button className="ep-nav__btn" onClick={() => goTo((current + 1) % stats.length)}>→</button>
            </div>
            <img src="/gold-liquid.png" alt="" className="lp-hero-gold-decor" />
        </div>
    );
}

/* ── HUD / FRAME ELEMENTS ────────────────────────────────── */
function EnergyLines() {
    return (
        <svg className="cp-energy-svg" viewBox="0 0 400 640" preserveAspectRatio="none" aria-hidden>
            <line x1="60"  y1="0"   x2="340" y2="0"   className="cp-energy-line cp-energy-line--h cp-el--top" />
            <line x1="60"  y1="640" x2="340" y2="640" className="cp-energy-line cp-energy-line--h cp-el--bot" />
            <line x1="0"   y1="60"  x2="0"   y2="580" className="cp-energy-line cp-energy-line--v cp-el--left" />
            <line x1="400" y1="60"  x2="400" y2="580" className="cp-energy-line cp-energy-line--v cp-el--right" />
            <polyline points="0,60 40,20 60,0"         className="cp-energy-notch" />
            <polyline points="400,60 360,20 340,0"     className="cp-energy-notch" />
            <polyline points="0,580 40,620 60,640"     className="cp-energy-notch" />
            <polyline points="400,580 360,620 340,640" className="cp-energy-notch" />
            <line x1="0"   y1="200" x2="18"  y2="200" className="cp-energy-tick" />
            <line x1="0"   y1="440" x2="18"  y2="440" className="cp-energy-tick" />
            <line x1="400" y1="200" x2="382" y2="200" className="cp-energy-tick" />
            <line x1="400" y1="440" x2="382" y2="440" className="cp-energy-tick" />
        </svg>
    );
}

function HUDCorners() {
    return (
        <>
            <div className="cp-hud cp-hud--tl"><div className="cp-hud__bracket" /><div className="cp-hud__text">SYS.PROFILE</div></div>
            <div className="cp-hud cp-hud--tr"><div className="cp-hud__text cp-hud__text--right">IDENT.LOCK</div><div className="cp-hud__dot" /></div>
            <div className="cp-hud cp-hud--bl"><div className="cp-hud__line" /><div className="cp-hud__text">AU // DEV.v2</div></div>
            <div className="cp-hud cp-hud--br"><div className="cp-hud__text cp-hud__text--right">ACTIVE</div><div className="cp-hud__pulse" /></div>
        </>
    );
}

function SolarHalo({ active }: { active: boolean }) {
    return (
        <div className={`cp-solar${active ? ' cp-solar--active' : ''}`}>
            <div className="cp-solar__core" />
            <div className="cp-solar__ring cp-solar__ring--1" />
            <div className="cp-solar__ring cp-solar__ring--2" />
            <div className="cp-solar__ring cp-solar__ring--3" />
            <div className="cp-solar__particles" />
        </div>
    );
}

function RoboticFrame({ hovered }: { hovered: boolean }) {
    return (
        <div className={`cp-robotic-frame${hovered ? ' cp-robotic-frame--active' : ''}`}>
            <div className="cp-rf__outer" />
            <div className="cp-rf__inner" />
            <EnergyLines />
            <HUDCorners />
            <div className="cp-rf__scan-stripe" />
            <div className="cp-rf__accent cp-rf__accent--left" />
            <div className="cp-rf__accent cp-rf__accent--right" />
        </div>
    );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
export function CinematicPortrait({
    onLocked,
    expandRequest = 0,
}: {
    onLocked?: () => void;
    expandRequest?: number;
}) {
    const sceneRef = useRef<HTMLDivElement>(null);

    // At the top of CinematicPortrait component, add:
    const [particles] = useState<Array<{x: string; y: string}>>(() =>
        Array.from({ length: 12 }, () => ({
            x: `${10 + Math.random() * 80}%`,
            y: `${10 + Math.random() * 80}%`,
        }))
    );

    const [stage,          setStage]          = useState<Stage>(0);
    const [isHovered,      setIsHovered]      = useState(false);
    const [orbitPositions, setOrbitPositions] = useState<Array<{x:number;y:number}>>([]);
    const [activeStatIdx,  setActiveStatIdx]  = useState(0);
    const [burning,        setBurning]        = useState(false);
    const [burnReverse,    setBurnReverse]    = useState(false);
    const [flipping,       setFlipping]       = useState(false);
    const [showFront,      setShowFront]      = useState(false);

    const hoverTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => { onLocked?.(); }, [onLocked]);

    const resetIdleTimer = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            setBurnReverse(true);
            setBurning(true);
        }, IDLE_REVERSE_MS);
    }, []);

    const clearIdleTimer = useCallback(() => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
    }, []);

    const refreshOrbitPositions = useCallback(() => {
        if (!sceneRef.current) return;
        setOrbitPositions(generateOrbitPositions(sceneRef.current.getBoundingClientRect()));
    }, []);

    /* ── STAGE 0 → 1 ──
       FIX: We set showFront = true BEFORE the flip starts so the canvas
       (which starts fully black) is already covering the front face
       when it becomes visible. The burn animation then clears away
       the black layer to reveal the photo. */
    const handleCardBackClick = useCallback(() => {
        if (flipping || burning || stage !== 0) return;
        setBurnComplete(false); // ← reset so idle black cover works again
        setShowFront(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setFlipping(true);
                setTimeout(() => {
                    setFlipping(false);
                    setBurnReverse(false);
                    setBurning(true);
                }, 700);
            });
        });
    }, [flipping, burning, stage]);

    const [burnComplete, setBurnComplete] = useState(false);

    const handleBurnDone = useCallback(() => {
        setBurning(false);
        if (burnReverse) {
            // Reverse burn done: re-cover photo, then flip back
            setFlipping(true);
            setTimeout(() => setShowFront(false), 350);
            setTimeout(() => {
                setFlipping(false);
                setStage(0);
                setBurnComplete(false); // reset for next time
            }, 700);
        } else {
            // Forward burn done: photo is revealed, hide canvas entirely
            setBurnComplete(true);  // ← this makes idle=false → canvas unmounts
            setStage(1);
            resetIdleTimer();
        }
    }, [burnReverse, resetIdleTimer]);

    useEffect(() => {
        if (expandRequest <= 0) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        clearIdleTimer();
        setIsHovered(false);
        setBurning(false);
        setBurnReverse(false);
        setFlipping(false);
        setBurnComplete(true);
        setShowFront(true);
        setActiveStatIdx(0);
        setStage(3);
    }, [expandRequest, clearIdleTimer]);

    const handleFrontMouseEnter = useCallback(() => {
        if (stage !== 1) return;
        setIsHovered(true);
        resetIdleTimer();
        hoverTimer.current = setTimeout(() => {
            refreshOrbitPositions();
            setStage(2);
        }, 2000);
    }, [stage, resetIdleTimer, refreshOrbitPositions]);

    const handleFrontMouseLeave = useCallback(() => {
        setIsHovered(false);
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (stage === 1) resetIdleTimer();
    }, [stage, resetIdleTimer]);

    const handleFrontClick = useCallback(() => {
        if (stage !== 1) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        clearIdleTimer();
        refreshOrbitPositions();
        setStage(2);
    }, [stage, clearIdleTimer, refreshOrbitPositions]);

    const handleOrbitSelect = useCallback((stat: typeof EXPANDED_STATS[0]) => {
        const idx = EXPANDED_STATS.findIndex(s => s.id === stat.id);
        setActiveStatIdx(idx >= 0 ? idx : 0);
        setStage(3);
    }, []);

    const handleStage2PortraitClick = useCallback(() => {
        if (stage !== 2) return;
        setStage(3);
    }, [stage]);

    const handleClose = useCallback(() => {
        setStage(1);
        resetIdleTimer();
    }, [resetIdleTimer]);

    useEffect(() => {
        if (stage !== 2) return;
        const onResize = () => refreshOrbitPositions();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [stage, refreshOrbitPositions]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!sceneRef.current || stage === 0 || stage === 3) return;
        const r = sceneRef.current.getBoundingClientRect();
        const x = ((e.clientX - r.left)  / r.width  - 0.5) * 8;
        const y = ((e.clientY - r.top)   / r.height - 0.5) * 6;
        sceneRef.current.style.setProperty('--tilt-x', `${y}deg`);
        sceneRef.current.style.setProperty('--tilt-y', `${x}deg`);
    }, [stage]);

    const isExpanded = stage === 3;

    return (
        <div className={`cp-wrapper${isExpanded ? ' cp-wrapper--expanded' : ''}`}>
            <div
                ref={sceneRef}
                className={[
                    'cp-scene',
                    isHovered && stage >= 1 ? 'cp-scene--hovered' : '',
                    stage === 2             ? 'cp-scene--orbit'   : '',
                    isExpanded              ? 'cp-scene--flipped' : '',
                    stage === 0             ? 'cp-scene--card-back' : '',
                ].join(' ')}
                onMouseMove={handleMouseMove}
                onMouseEnter={stage >= 1 ? handleFrontMouseEnter : undefined}
                onMouseLeave={stage >= 1 ? handleFrontMouseLeave : undefined}
                onClick={
                    stage === 0 ? handleCardBackClick :
                    stage === 1 ? handleFrontClick    :
                    stage === 2 ? handleStage2PortraitClick : undefined
                }
                style={{ '--tilt-x': '0deg', '--tilt-y': '0deg' } as React.CSSProperties}
            >
                <div className={`cp-flipper${flipping ? ' cp-flipper--flipping' : ''}${showFront ? ' cp-flipper--flipped' : ''}`}>

                    {/* ══ BACK FACE ══ */}
                    <div className="cp-face cp-face--back">
                        <img
                            src="/back_card.png"
                            alt="Card back"
                            className="cp-back-img"
                        />
                        <div className="cp-back-pulse-ring" />
                        <div className="cp-back-hint">
                            <span className="cp-back-hint__icon">✦</span>
                            <span className="cp-back-hint__text">Click to reveal</span>
                            <span className="cp-back-hint__icon">✦</span>
                        </div>
                        {particles.map((p, i) => (
                            <div key={i} className="cp-back-particle" style={{
                                '--p-i': i,
                                '--p-x': p.x,
                                '--p-y': p.y,
                            } as React.CSSProperties} />
                        ))}
                    </div>

                    {/* ══ FRONT FACE ══ */}
                    <div className="cp-face cp-face--front">
                        <SolarHalo active={isHovered} />
                        <div className={`cp-ambient${isHovered ? ' cp-ambient--active' : ''}`} />
                        <div className="cp-frame-stack">
                            <div className="cp-frame cp-frame--current" style={{ backgroundImage: 'url(/frame_9.png)' }} />
                            <div className="cp-vignette" />
                            <div className={`cp-floor${isHovered ? ' cp-floor--visible' : ''}`} />
                            <div className={`cp-lightshaft${isHovered ? ' cp-lightshaft--visible' : ''}`} />
                            <div className="cp-grain" />
                        </div>

                        {/* ── DECORATIVE GRID OVERLAY ── */}
                        <div className="cp-front-grid" aria-hidden />

                        {/* ── TOP CLASSIFICATION BADGE ── */}
                        <div className="cp-front-badge">
                            <span className="cp-front-badge__line" />
                            <span className="cp-front-badge__text">PROFILE // CLASS-A</span>
                            <span className="cp-front-badge__line" />
                        </div>

                        {/* ── SIDE RULER MARKS ── */}
                        <div className="cp-front-ruler cp-front-ruler--left" aria-hidden>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="cp-front-ruler__tick" style={{ '--tick-i': i } as React.CSSProperties} />
                            ))}
                        </div>
                        <div className="cp-front-ruler cp-front-ruler--right" aria-hidden>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="cp-front-ruler__tick" style={{ '--tick-i': i } as React.CSSProperties} />
                            ))}
                        </div>

                        {/* ── BOTTOM NAME PLATE ── */}
                        <div className={`cp-nameplate${isHovered ? ' cp-nameplate--visible' : ''}`}>
                            <div className="cp-nameplate__inner">
                                <div className="cp-nameplate__top-line" />
                                <div className="cp-nameplate__row">
                                    <span className="cp-nameplate__icon">◈</span>
                                    <span className="cp-nameplate__name">Airl Joriz</span>
                                    <span className="cp-nameplate__icon">◈</span>
                                </div>
                                <div className="cp-nameplate__sub">WEB DEVELOPER · AI ENTHUSIAST</div>
                                <div className="cp-nameplate__bottom-line" />
                            </div>
                        </div>

                        {/* ── DIAGONAL ACCENT LINES ── */}
                        <svg className="cp-front-diag" viewBox="0 0 300 600" preserveAspectRatio="none" aria-hidden>
                            <line x1="0" y1="0" x2="30" y2="600" className="cp-diag-line cp-diag-line--1" />
                            <line x1="270" y1="0" x2="300" y2="600" className="cp-diag-line cp-diag-line--2" />
                            <line x1="10" y1="0" x2="22" y2="600" className="cp-diag-line cp-diag-line--3" />
                        </svg>

                        <RoboticFrame hovered={isHovered} />
                        <BurnCanvas
                            active={burning}
                            idle={showFront && !burning && !burnComplete}
                            reverse={burnReverse}
                            onDone={handleBurnDone}
                        />
                        {stage === 1 && !isHovered && !burning && (
                            <div className="cp-hover-hint">hold to reveal stats</div>
                        )}
                        {stage === 2 && (
                            <div className="cp-click-hint">click to expand</div>
                        )}
                        <div className="cp-dof-overlay" />
                    </div>
                </div>
            </div>

            {typeof document !== 'undefined' && orbitPositions.length > 0 && createPortal(
                <div className="cp-orbit-portal">
                    {EXPANDED_STATS.map((stat, i) => (
                        <OrbitCard
                            key={stat.id}
                            stat={stat}
                            visible={stage === 2}
                            index={i}
                            pos={orbitPositions[i]}
                            onSelect={handleOrbitSelect}
                        />
                    ))}
                </div>,
                document.body
            )}

            <ExpandedPanel
                stats={EXPANDED_STATS}
                visible={stage === 3}
                activeIndex={activeStatIdx}
                onClose={handleClose}
            />
        </div>
    );
}

/* ── FLOATING STATS ──────────────────────────────────────── */
function HolographicCard({ stat, index }: {
    stat: typeof CORE_STATS[0]; index: number;
}) {
    return (
        <div className={`holo-card holo-card--${stat.id}`} style={{
            '--card-color': stat.color, '--float-delay': `${index * 0.3}s`,
        } as React.CSSProperties}>
            <div className="holo-card__link-line" />
            <div className="holo-card__inner">
                <span className="holo-card__icon" style={{ color: stat.color }}>{stat.icon}</span>
                <span className="holo-card__label">{stat.label}</span>
                <div className="holo-card__glow" style={{ background: `radial-gradient(circle, ${stat.color}22 0%, transparent 70%)` }} />
            </div>
            <span className="holo-card__corner holo-card__corner--tl" />
            <span className="holo-card__corner holo-card__corner--br" />
            <div className="holo-card__scan" />
        </div>
    );
}

export function FloatingStats({ isPortraitHovered }: { isPortraitHovered?: boolean }) {
    return (
        <div className="fs-panel">
            {CORE_STATS.map((stat, i) => (
                <HolographicCard key={stat.id} stat={stat} index={i} />
            ))}
        </div>
    );
}
