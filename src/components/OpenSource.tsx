'use client';

import { OPEN_SOURCE } from '@/data/opensource';
import { SectionHead, Scrambled } from './Shared';

export default function OpenSource({ active }: { active: boolean }) {
  const os = OPEN_SOURCE;
  return (
    <section className={`section opensource${active ? ' active' : ''}`} style={{ gridTemplateRows: 'auto 1fr', gap: '40px', placeItems: 'center start' }}>
      <div>
        <SectionHead tag="h2" title="Open_Source" />
      </div>

      <div className="os-card" style={{ opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .6s ease 0.3s, transform .6s ease 0.3s' }}>
        <div className="os-badge">PR · Under Review</div>

        <div className="os-title">
          <Scrambled text={os.title} active={active} duration={700} delay={300} />
        </div>

        <div className="os-framework">
          Framework: <span className="mint">{os.framework}</span>
          <br />{os.frameworkDesc}
        </div>

        <div className="os-body">{os.body}</div>

        <div className="tag-row" style={{ marginBottom: 24 }}>
          {os.tech.map((t, i) => <span key={i} className="chip">{t}</span>)}
        </div>

        <div className="proj-links">
          {os.links.map((l, i) => (
            <a key={i} className="proj-link" href={l.url} target="_blank" rel="noreferrer">
              <span>↗</span> {l.label}
            </a>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, borderRadius: '50%', border: '1px dashed rgba(94, 234, 212, 0.3)', pointerEvents: 'none' }} />
      </div>
    </section>
  );
}
