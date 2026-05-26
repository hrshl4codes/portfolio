'use client';

import { EXPERIENCE } from '@/data/experience';
import { SectionHead } from './Shared';

export default function Experience({ active }: { active: boolean }) {
  return (
    <section className={`section experience${active ? ' active' : ''}`}>
      <div>
        <SectionHead tag="h2" title="Where I've worked" />
      </div>
      <div className="exp-grid">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="exp-card" style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity .6s ease ${0.3 + i * 0.15}s, transform .6s ease ${0.3 + i * 0.15}s, border-color .2s ease`,
          }}>
            <div className="exp-date">{e.date}</div>
            <div className="exp-company">{e.company}</div>
            <div className="exp-role">{e.role}</div>
            <div className="exp-body">{e.body}</div>
            <div className="tag-row">
              {e.tags.map((t, j) => <span key={j} className="chip">{t}</span>)}
            </div>
            <div className="code-tag" style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '10px', whiteSpace: 'nowrap' }}>
              &lt;exp/&gt;
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)', opacity: active ? 1 : 0, transition: 'opacity .5s ease 0.7s' }}>
        <span className="code-tag">{'// '}</span>
        Full résumé at{' '}
        <a href="https://harshaltech.vercel.app/resume.pdf" target="_blank" rel="noreferrer"
          style={{ color: 'var(--mint)', borderBottom: '1px dashed var(--mint)' }}>
          harshaltech.vercel.app/resume.pdf
        </a>
      </div>
    </section>
  );
}
