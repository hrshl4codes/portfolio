'use client';

import { useState, useEffect, useRef } from 'react';

export function CodeTag({ children, type = 'p', small = false, green = false, close = true }: {
  children?: React.ReactNode;
  type?: string;
  small?: boolean;
  green?: boolean;
  close?: boolean;
}) {
  const cls = `code-tag${green ? ' green' : ''}`;
  const fs = small ? { fontSize: '12px' } : {};
  return (
    <span className={cls} style={fs}>
      &lt;{type}&gt;{children}{close && <>&lt;/{type}&gt;</>}
    </span>
  );
}

export function SectionHead({ tag = 'h2', title }: { tag?: string; title: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px' }}>
      <span className="code-tag" style={{ fontSize: '13px', paddingLeft: '4px' }}>&lt;{tag}&gt;</span>
      <h2 className="display-h2">{title}</h2>
      <span className="code-tag" style={{ fontSize: '13px', paddingLeft: '4px' }}>&lt;/{tag}&gt;</span>
    </div>
  );
}

export function Scrambled({ text, active, duration = 800, delay = 0 }: {
  text: string;
  active: boolean;
  duration?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    const chars = '!<>-_\\/[]{}—=+*^?#________0123456789';
    const queue: { f: string; t: string; start: number; end: number; char: string }[] = [];
    const from = text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
    const to = text;
    const len = Math.max(from.length, to.length);
    const totalFrames = Math.max(1, Math.floor(duration / 16));
    const staggerWindow = Math.floor(totalFrames * 0.5);
    const resolveRunway = Math.floor(totalFrames * 0.4);
    for (let i = 0; i < len; i++) {
      const f = from[i] || '';
      const t = to[i] || '';
      const start = Math.floor(Math.random() * staggerWindow);
      const end = start + Math.floor(Math.random() * resolveRunway) + 4;
      queue.push({ f, t, start, end, char: f });
    }
    let frame = 0;
    const maxFrames = Math.floor(duration / 16);
    const update = () => {
      let out = '';
      let done = 0;
      for (let i = 0; i < queue.length; i++) {
        const { t, start, end } = queue[i];
        if (frame >= end) { out += t; done++; }
        else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28)
            queue[i].char = chars[Math.floor(Math.random() * chars.length)];
          out += queue[i].char;
        } else {
          out += queue[i].f;
        }
      }
      setDisplay(out);
      if (done === queue.length) { setDisplay(to); return; }
      if (frame > maxFrames)    { setDisplay(to); return; }
      frame++;
      rafRef.current = requestAnimationFrame(update);
    };
    const tid = setTimeout(() => { update(); }, delay);
    return () => { clearTimeout(tid); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [text, active, duration, delay]);

  return <>{display}</>;
}

export function Typewriter({ text, active = true, speed = 50, startDelay = 0, showCaret = true, className = '' }: {
  text: string;
  active?: boolean;
  speed?: number;
  startDelay?: number;
  showCaret?: boolean;
  className?: string;
}) {
  const [out, setOut] = useState(active ? '' : text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setOut(text); setDone(true); return; }
    setOut(''); setDone(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setOut(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, speed);
      else setDone(true);
    };
    const startTimer = setTimeout(tick, startDelay);
    return () => { clearTimeout(startTimer); clearTimeout(timer); };
  }, [text, active, speed, startDelay]);

  return (
    <span className={className}>
      {out}
      {showCaret && !done && <span className="tw-caret" />}
    </span>
  );
}
