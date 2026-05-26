'use client';

import { useState, useEffect } from 'react';
import { Scrambled } from './Shared';

const ROLES = [
  'AI Native Developer',
  'Agentic Systems Architect',
  'Python Automation Dev',
  'Full-Stack Engineer',
];

const TYPE_SPEED   = 60;
const DELETE_SPEED = 32;
const PAUSE_MS     = 1800;
const START_DELAY  = 900;

function CyclingRole({ active }: { active: boolean }) {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase]       = useState<'idle' | 'typing' | 'pausing' | 'deleting'>('idle');

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setPhase('typing'), START_DELAY);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const target = ROLES[roleIdx];

    if (phase === 'typing') {
      if (displayed.length >= target.length) {
        setPhase('pausing');
        return;
      }
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length === 0) {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setPhase('typing');
        return;
      }
      const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), DELETE_SPEED);
      return () => clearTimeout(t);
    }
  }, [phase, displayed, roleIdx]);

  const showCaret = phase === 'typing' || phase === 'pausing';

  return (
    <span>
      {displayed}
      {showCaret && <span className="role-caret" />}
    </span>
  );
}

function OrbitalRing() {
  return (
    <div className="orbital">
      <svg className="rings" viewBox="0 0 420 420">
        <g className="ring-spinner">
          <circle cx="210" cy="210" r="200" fill="none" stroke="rgba(94,234,212,0.18)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="10"  cy="210" r="3" fill="var(--mint)" />
          <circle cx="370" cy="135" r="2" fill="var(--mint-soft)" />
        </g>
        <g className="ring-spinner reverse">
          <circle cx="210" cy="210" r="160" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="370" cy="210" r="4" fill="var(--bg)" stroke="var(--fg-1)" strokeWidth="1.5" />
          <circle cx="50"  cy="210" r="3" fill="var(--fg-1)" />
          <circle cx="210" cy="50"  r="3" fill="var(--mint)" />
        </g>
        <circle cx="210" cy="210" r="120" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>
      <div className="logo-glyph">{'</>'}</div>
      <a className="cv-btn" href="https://harshaltech.vercel.app/resume.pdf" target="_blank" rel="noreferrer">
        <span className="br">&lt;</span>Download_CV<span className="br">/&gt;</span>
      </a>
    </div>
  );
}

export default function Hero({ active }: { active: boolean }) {
  return (
    <section className={`section hero${active ? ' active' : ''}`} style={{ position: 'relative' }}>
      <div className="hero-left" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-pre">
          <span className="tag">&lt;p&gt;</span>This is<span className="tag">&lt;/p&gt;</span>
        </div>
        <div className="hero-name">
          <span className="tag-line">&lt;h1&gt;</span>
          <h1 className="display-h1">
            <Scrambled text="Harshal"   active={active} duration={650} delay={200} /><br />
            <Scrambled text="Manerikar" active={active} duration={750} delay={400} />
          </h1>
          <span className="tag-line">&lt;/h1&gt;</span>
        </div>
        <div className="hero-role">
          <span className="tag">&lt;p&gt;</span>
          <CyclingRole active={active} />
          <span className="tag">&lt;/p&gt;</span>
        </div>
      </div>
      <OrbitalRing />
    </section>
  );
}
