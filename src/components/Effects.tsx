'use client';

import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function CustomCursor() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const target  = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest('a, button, .channel, .social-bubble, .car-btn, .nav-item, .proj-disc, .exp-card, [data-hover]');
      setHover(!!interactive);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let rafId: number;
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (reticleRef.current) {
        reticleRef.current.style.left = current.current.x + 'px';
        reticleRef.current.style.top  = current.current.y + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = target.current.x + 'px';
        dotRef.current.style.top  = target.current.y + 'px';
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div ref={reticleRef} className={`cursor-ring${hover ? ' hover' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

export function GlitchOverlay({ trigger, stageRef }: {
  trigger: number;
  stageRef: RefObject<HTMLDivElement | null>;
}) {
  const [active, setActive] = useState(false);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (trigger === 0) return;
    setActive(true);
    const start = performance.now();
    const duration = 800;
    let raf: number;
    const animate = () => {
      const t = (performance.now() - start) / duration;
      if (t >= 1) {
        setActive(false);
        if (stageRef?.current) stageRef.current.style.filter = '';
        return;
      }
      const envelope = Math.max(0, 1 - t * 1.2);
      const scale = envelope * (60 + Math.random() * 80);
      const seed  = Math.floor(Math.random() * 100);
      const bf1   = (0.005 + Math.random() * 0.04).toFixed(4);
      const bf2   = (0.4  + Math.random() * 0.6).toFixed(4);
      if (turbRef.current) {
        turbRef.current.setAttribute('baseFrequency', `${bf1} ${bf2}`);
        turbRef.current.setAttribute('seed', String(seed));
      }
      if (dispRef.current) dispRef.current.setAttribute('scale', String(Math.floor(scale)));
      if (stageRef?.current) {
        stageRef.current.style.filter = t < 0.85 ? 'url(#hm-glitch-filter)' : '';
        if (t < 0.85) stageRef.current.style.willChange = 'filter';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      if (stageRef?.current) stageRef.current.style.filter = '';
    };
  }, [trigger, stageRef]);

  const [slices, setSlices] = useState<{ top: number; h: number; col: string; x: number; delay: number; dur: number }[]>([]);
  useEffect(() => {
    const out = [];
    for (let i = 0; i < 28; i++) {
      const isWide = i < 6;
      out.push({
        top: Math.random() * 96,
        h: isWide ? 3 + Math.random() * 14 : 0.5 + Math.random() * 5,
        col: (['blue', 'blue', 'blue', 'cyan', 'red', 'green', 'white'] as const)[Math.floor(Math.random() * 7)],
        x: (Math.random() - 0.5) * 280,
        delay: Math.random() * 0.6,
        dur: 0.25 + Math.random() * 0.7,
      });
    }
    setSlices(out);
  }, [trigger]);

  return (
    <>
      <svg style={{ position: 'fixed', width: 0, height: 0, top: 0, left: 0, zIndex: 0 }}>
        <defs>
          <filter id="hm-glitch-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef} type="turbulence" baseFrequency="0.02 0.7" numOctaves={1} seed={5} result="noise" />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className={`glitch-overlay${active ? ' active' : ''}`}>
        <div className="glitch-shift r" />
        <div className="glitch-shift b" />
        {slices.map((s, i) => (
          <div key={i} className={`slice ${s.col}`} style={{
            top: `${s.top}%`,
            height: `${s.h}%`,
            transform: `translateX(${s.x}px)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }} />
        ))}
        <div className="glitch-noise" />
        <div className="glitch-vsync" />
      </div>
    </>
  );
}

export function Dust({ count = 14 }: { count?: number }) {
  const [items, setItems] = useState<{ x: number; y: number; d: number; s: number; dur: number }[]>([]);
  useEffect(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 4 + Math.random() * 10,
        s: 0.3 + Math.random() * 0.7,
        dur: 14 + Math.random() * 18,
      });
    }
    setItems(out);
  }, [count]);
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
      {items.map((p, i) => (
        <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.d / 2}
          fill="var(--mint)" opacity={p.s * 0.18}
          style={{ filter: 'blur(1px)', animation: `float ${p.dur}s ease-in-out ${i * 0.4}s infinite` }} />
      ))}
    </svg>
  );
}

type LogPart = { text: string; cls?: 'muted' | 'ok' | 'warn' };
interface BootLogLine { t: number; parts: LogPart[]; }

const BOOT_LINES: BootLogLine[] = [
  { t: 0.02, parts: [{ text: '[BOOT]', cls: 'muted' }, { text: ' initializing harshal.portfolio_v2...' }] },
  { t: 0.10, parts: [{ text: '[SYS]',  cls: 'muted' }, { text: '  loading runtime: ' }, { text: 'react@19', cls: 'ok' }] },
  { t: 0.18, parts: [{ text: '[NET]',  cls: 'muted' }, { text: '  GET /resume.pdf ........................ ' }, { text: '200 OK', cls: 'ok' }] },
  { t: 0.26, parts: [{ text: '[GFX]',  cls: 'muted' }, { text: '  compiling shaders [mint_glow, scanline, rgb_split]' }] },
  { t: 0.34, parts: [{ text: '[FONT]', cls: 'muted' }, { text: ' fetching Orbitron, JetBrains Mono ........... ' }, { text: 'OK', cls: 'ok' }] },
  { t: 0.44, parts: [{ text: '[DATA]', cls: 'muted' }, { text: ' mounting projects/ (4 items)' }] },
  { t: 0.52, parts: [{ text: '[DATA]', cls: 'muted' }, { text: ' mounting experience/ (2 items)' }] },
  { t: 0.60, parts: [{ text: '[NET]',  cls: 'muted' }, { text: '  ping github.com/hrshl4codes ............. ' }, { text: '42ms', cls: 'ok' }] },
  { t: 0.70, parts: [{ text: '[AUTH]', cls: 'muted' }, { text: ' verifying integrity ..................... ' }, { text: 'SIGNED', cls: 'ok' }] },
  { t: 0.80, parts: [{ text: '[SYS]',  cls: 'muted' }, { text: '  warming up animation engine' }] },
  { t: 0.90, parts: [{ text: '[OK]',   cls: 'muted' }, { text: '   handshake complete' }] },
  { t: 0.98, parts: [{ text: '[BOOT]', cls: 'muted' }, { text: ' launch sequence: ' }, { text: 'READY', cls: 'ok' }] },
];

export function BootScreen({ onDone, duration = 3000 }: { onDone: () => void; duration?: number }) {
  const [pct, setPct]     = useState(0);
  const [lines, setLines] = useState<BootLogLine[]>([]);

  useEffect(() => {
    const start = performance.now();
    let done = false;
    const id = setInterval(() => {
      if (done) return;
      const elapsed = performance.now() - start;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 1.4);
      setPct(Math.floor(eased * 100));
      setLines(prev => {
        const next = BOOT_LINES.filter(l => l.t <= eased).slice(-6);
        return next.length === prev.length ? prev : next;
      });
      if (p >= 1) { done = true; clearInterval(id); onDone(); }
    }, 40);
    return () => { done = true; clearInterval(id); };
  }, [duration, onDone]);

  return (
    <div className="boot">
      <div className="boot-inner">
        <div className="boot-brand">
          <span className="bracket">&lt;</span>
          <span className="slash">/</span>
          <span>HM</span>
          <span className="bracket">&gt;</span>
          <span className="blink" />
        </div>
        <div className="boot-meta">
          <span>{'// portfolio_v2 · loading kernel'}</span>
          <span className="right">{pct >= 100 ? 'READY' : 'INITIALIZING...'}</span>
        </div>
        <div className="boot-progress">
          <div className="boot-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="boot-percent">{String(pct).padStart(3, '0')}%</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {pct < 30  && 'bootloader v2.6.1'}
            {pct >= 30 && pct < 60 && 'mounting modules'}
            {pct >= 60 && pct < 90 && 'syncing assets'}
            {pct >= 90 && 'finalizing'}
          </div>
        </div>
        <div className="boot-log">
          {lines.map((l) => (
            <span key={l.t} className="line">
              {l.parts.map((p, i) =>
                p.cls ? <span key={i} className={p.cls}>{p.text}</span> : p.text
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
