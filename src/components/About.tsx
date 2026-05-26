'use client';

import { ABOUT } from '@/data/about';
import { SectionHead, Scrambled } from './Shared';

export default function About({ active }: { active: boolean }) {
  return (
    <section className={`section about${active ? ' active' : ''}`}>
      <div style={{ position: 'relative' }}>
        <SectionHead tag="h2" title="Who I am" />
        <div className="about-body">
          {ABOUT.intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="about-meta">
          {ABOUT.meta.map((m, i) => (
            <div key={i} className="meta-item" style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity .5s ease ${0.4 + i * 0.08}s, transform .5s ease ${0.4 + i * 0.08}s`,
            }}>
              <div className="label">{m.label}</div>
              <div className="value">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div className="code-tag" style={{ fontSize: '13px', marginBottom: '8px' }}>&lt;h3&gt;</div>
        <h3 className="display-h3" style={{ color: 'var(--mint)' }}>
          <Scrambled text="What I'm up to" active={active} duration={550} delay={100} />
        </h3>
        <div className="code-tag" style={{ fontSize: '13px', marginTop: '4px' }}>&lt;/h3&gt;</div>

        <ul className="now-list">
          {ABOUT.now.map((item, i) => (
            <li key={i} style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateX(0)' : 'translateX(-10px)',
              transition: `opacity .5s ease ${0.5 + i * 0.1}s, transform .5s ease ${0.5 + i * 0.1}s`,
            }}>
              {item.pre}<strong>{item.bold}</strong>{item.post}
            </li>
          ))}
        </ul>

        <svg width="200" height="200" style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.3, pointerEvents: 'none' }} viewBox="0 0 200 200">
          <g className="ring-spinner">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(94,234,212,0.4)" strokeWidth="1" strokeDasharray="2 8" />
            <circle cx="10" cy="100" r="2" fill="var(--mint)" />
          </g>
        </svg>
      </div>
    </section>
  );
}
