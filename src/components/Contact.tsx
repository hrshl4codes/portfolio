'use client';

import { useState, useEffect } from 'react';
import { SectionHead, Typewriter } from './Shared';

interface Bubble {
  name: string;
  sub: string;
  url: string;
  delay: number;
  top: string;
  left: string;
}

function ContactBubble({ name, sub, url, delay = 0, active }: Bubble & { active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target={url.startsWith('mailto') ? '_self' : '_blank'}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        width: 'clamp(140px, 14vw, 190px)', height: 'clamp(140px, 14vw, 190px)',
        borderRadius: '50%',
        border: `1.5px solid ${hovered ? 'var(--mint-soft)' : 'var(--mint)'}`,
        background: hovered
          ? 'radial-gradient(circle at center, rgba(94,234,212,0.18) 0%, rgba(8,16,14,0.95) 70%)'
          : 'radial-gradient(circle at center, rgba(94,234,212,0.04) 0%, var(--bg) 70%)',
        boxShadow: hovered
          ? '0 0 40px rgba(94,234,212,0.35), 0 0 80px rgba(94,234,212,0.12), inset 0 0 30px rgba(94,234,212,0.08)'
          : '0 0 0 rgba(94,234,212,0)',
        cursor: 'none', textDecoration: 'none',
        opacity: active ? 1 : 0,
        transform: active ? `translateY(${hovered ? '-8px' : '0'})` : 'scale(0.6) translateY(20px)',
        transition: [
          `opacity .6s ease ${delay}s`,
          `transform .6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
          'box-shadow .25s ease', 'border-color .25s ease', 'background .25s ease',
        ].join(', '),
        animation: active ? `bubbleFloat ${3.8 + delay * 2}s ease-in-out ${delay}s infinite` : 'none',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: hovered ? 'var(--mint)' : 'var(--fg-4)', letterSpacing: '0.04em', marginBottom: '6px', transition: 'color .2s ease' }}>&lt;&gt;</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(13px, 1.1vw, 16px)', fontWeight: 600, color: hovered ? 'var(--mint-soft)' : 'var(--fg-1)', letterSpacing: '0.04em', transition: 'color .2s ease', textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
      {sub && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: hovered ? 'var(--mint)' : 'var(--fg-3)', letterSpacing: '0.1em', marginTop: '4px', transition: 'color .2s ease', textAlign: 'center', maxWidth: '80%', lineHeight: 1.4 }}>{sub}</span>
      )}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: hovered ? 'var(--mint)' : 'var(--fg-4)', letterSpacing: '0.04em', marginTop: '6px', transition: 'color .2s ease' }}>&lt;/&gt;</span>
      {hovered && (
        <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(94,234,212,0.2)', pointerEvents: 'none', animation: 'pulseRing 1s ease-in-out infinite' }} />
      )}
    </a>
  );
}

const BUBBLES: Bubble[] = [
  { name: 'LinkedIn', sub: '/in/hrshlm',        url: 'https://www.linkedin.com/in/hrshlm',         delay: 0.4,  top: '0%',  left: '5%'  },
  { name: 'GitHub',   sub: '/hrshl4codes',       url: 'https://github.com/hrshl4codes',             delay: 0.55, top: '10%', left: '38%' },
  { name: 'Email',    sub: 'mharshal625@gmail',  url: 'mailto:mharshal625@gmail.com',               delay: 0.7,  top: '52%', left: '18%' },
  { name: 'Résumé',   sub: 'Download CV',        url: 'https://harshaltech.vercel.app/resume.pdf',  delay: 0.85, top: '46%', left: '55%' },
];

const PROMPT = '> establishing_connection... OK';
const PROMPT_DURATION = PROMPT.length * 45 + 300;

export default function Contact({ active }: { active: boolean }) {
  const [promptDone, setPromptDone] = useState(false);

  useEffect(() => {
    if (!active) { setPromptDone(false); return; }
    const t = setTimeout(() => setPromptDone(true), PROMPT_DURATION);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className={`section contact${active ? ' active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gridTemplateColumns: 'unset' }}>
      <div style={{ marginBottom: 'clamp(48px, 7vh, 80px)' }}>
        <SectionHead tag="h2" title="Get in touch" />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--fg-2)', lineHeight: 1.65, marginTop: '18px', maxWidth: '56ch' }}>
          Open to full-time roles, freelance projects, and interesting conversations.
          I reply within 24 hours — currently in Mumbai, IST.
        </p>

        <div style={{
          marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '13px',
          color: 'var(--mint)', letterSpacing: '0.04em',
          opacity: active ? 1 : 0, transition: 'opacity .3s ease',
          minHeight: '20px',
        }}>
          {active && (
            <Typewriter
              text={PROMPT}
              speed={45}
              startDelay={200}
              showCaret={!promptDone}
            />
          )}
          {promptDone && (
            <span style={{ marginLeft: 8, color: 'var(--mint)', opacity: 0.6, fontSize: '11px' }}>
              ● ONLINE
            </span>
          )}
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 45vh, 480px)', marginTop: '16px' }}>
        {BUBBLES.map((b) => (
          <div key={b.name} style={{ position: 'absolute', top: b.top, left: b.left }}>
            <ContactBubble {...b} active={active && promptDone} />
          </div>
        ))}
      </div>
    </section>
  );
}
