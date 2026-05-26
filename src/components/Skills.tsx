'use client';

import { SKILLS } from '@/data/skills';
import type { SkillLevel } from '@/types';
import { SectionHead, Scrambled } from './Shared';

const FILL: Record<SkillLevel, number> = { confident: 6, building: 4, learning: 2 };
const TOTAL = 8;

function SkillBar({ level }: { level: SkillLevel }) {
  const filled = FILL[level];
  return (
    <span className="skill-bar-chars">
      [<span className={`skill-filled ${level}`}>{'█'.repeat(filled)}</span>{'░'.repeat(TOTAL - filled)}]
    </span>
  );
}

export default function Skills({ active }: { active: boolean }) {
  return (
    <section className={`section skills${active ? ' active' : ''}`}>
      <div>
        <SectionHead tag="h2" title="My_Skills" />
      </div>

      <div className="skills-grid">
        {SKILLS.map((col, i) => (
          <div key={col.title} className="skill-col" style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity .6s ease ${0.3 + i * 0.1}s, transform .6s ease ${0.3 + i * 0.1}s`,
          }}>
            <div className="skill-col-title">
              <Scrambled text={col.title} active={active} duration={500} delay={400 + i * 150} />
            </div>
            {col.items.map((it, j) => (
              <div key={j} className="skill-row">
                <span className="name">{it.name}</span>
                <SkillBar level={it.level} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)', opacity: active ? 1 : 0, transition: 'opacity .5s ease 1s' }}>
        <span className="code-tag">{'// '}</span>
        Honest ratings.{' '}<span style={{ color: 'var(--mint)' }}>Confident</span> = ship-ready,{' '}
        <span style={{ color: '#FFC76E' }}>Building</span> = working knowledge,{' '}
        <span style={{ color: 'var(--fg-3)' }}>Learning</span> = active study.
      </div>
    </section>
  );
}
