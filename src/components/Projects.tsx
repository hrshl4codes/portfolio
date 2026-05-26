'use client';

import { useState, useEffect } from 'react';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types';
import { SectionHead, Scrambled } from './Shared';

type FlipPhase = 'idle' | 'out' | 'in';

function ProjectDisc({ project, idx, flipPhase }: { project: Project; idx: number; flipPhase: FlipPhase }) {
  const isOut = flipPhase === 'out';
  return (
    <div style={{ perspective: '900px' }}>
      <div className="proj-disc" data-hover style={{
        transform: isOut ? 'rotateY(90deg) scale(0.96)' : flipPhase === 'in' ? 'rotateY(-8deg) scale(1)' : 'rotateY(0deg) scale(1)',
        opacity: isOut ? 0 : 1,
        transition: isOut
          ? 'transform 0.2s ease-in, opacity 0.18s ease-in'
          : 'transform 0.38s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.25s ease-out',
      }}>
        <div className="proj-disc-frame">
          <div className="proj-image" style={{
            background: project.accentBg, width: '100%', height: '100%',
            top: 0, left: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '96px', fontWeight: 700,
              color: project.color, opacity: 0.95, letterSpacing: '0.05em',
              textShadow: `0 0 30px ${project.color}55`, lineHeight: 1,
            }}>{project.glyph}</div>
            <div style={{
              marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.2em', color: project.color, opacity: 0.7, textTransform: 'uppercase',
            }}>
              {'// project_0'}{idx + 1}
            </div>
            <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
              {[0,1,2].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />)}
            </div>
            <div style={{ position: 'absolute', top: '22%', left: '15%', right: '15%', display: 'flex', justifyContent: 'space-around', fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span>Home</span><span>Docs</span><span>API</span><span>About</span>
            </div>
            <div style={{ position: 'absolute', bottom: '18%', left: '14%', right: '14%', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
              <div><div style={{ fontSize: '14px', color: project.color, fontWeight: 700 }}>99.9%</div><div style={{ letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Uptime</div></div>
              <div><div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>1.2k</div><div style={{ letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Users</div></div>
              <div><div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>v1.0</div><div style={{ letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Build</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ active }: { active: boolean }) {
  const [idx, setIdx]               = useState(0);
  const [flipPhase, setFlipPhase]   = useState<FlipPhase>('idle');
  const [scrambleKey, setScrambleKey] = useState(0);
  const project = PROJECTS[idx];

  const navigate = (dir: 1 | -1) => {
    if (flipPhase !== 'idle') return;
    setFlipPhase('out');
    setTimeout(() => {
      setIdx(i => (i + dir + PROJECTS.length) % PROJECTS.length);
      setScrambleKey(k => k + 1);
      setFlipPhase('in');
      setTimeout(() => setFlipPhase('idle'), 400);
    }, 210);
  };

  useEffect(() => { if (active) setScrambleKey(k => k + 1); }, [active]);

  return (
    <section className={`section projects${active ? ' active' : ''}`}>
      <div>
        <SectionHead tag="h2" title="My_Portfolio" />
      </div>

      <div className="proj-stage">
        <ProjectDisc project={project} idx={idx} flipPhase={flipPhase} />

        <div className="proj-detail" key={`detail-${idx}-${scrambleKey}`}>
          <span className="open-tag">&lt;p&gt;</span>
          <div className="proj-name">
            <Scrambled text={project.name} active={true} duration={650} delay={50} />
          </div>
          <div className={`proj-status${project.statusClass ? ` ${project.statusClass}` : ''}`}>{project.status}</div>
          <p className="proj-desc">{project.desc}</p>
          <div className="proj-role">{project.role}</div>
          <div className="proj-tech">
            {project.tech.map((t, i) => <span key={i} className="chip">{t}</span>)}
          </div>
          <div className="proj-links">
            {project.githubUrl && (
              <a className="proj-link" href={project.githubUrl} target="_blank" rel="noreferrer">
                <span>↗</span> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a className="proj-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                <span>●</span> Live demo
              </a>
            )}
          </div>
          <span className="close-tag">&lt;/p&gt;</span>
        </div>
      </div>

      <div className="proj-controls">
        <button className="car-btn" onClick={() => navigate(-1)} aria-label="Previous project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="car-bar">
          <div className="car-bar-fill" style={{ width: `${((idx + 1) / PROJECTS.length) * 100}%` }} />
        </div>
        <div className="car-count">
          <span style={{ color: 'var(--mint)' }}>{String(idx + 1).padStart(2, '0')}</span>
          {' / '}
          {String(PROJECTS.length).padStart(2, '0')}
        </div>
        <button className="car-btn" onClick={() => navigate(1)} aria-label="Next project">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
