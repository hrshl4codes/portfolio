'use client';

import { useState, useEffect } from 'react';
import { SECTIONS } from '@/data/sections';

function NavItem({ section, active, onClick, typeKey }: {
  section: typeof SECTIONS[0];
  active: boolean;
  onClick: () => void;
  typeKey: string;
}) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    setOut('');
    const tick = () => {
      i++;
      setOut(section.label.slice(0, i));
      if (i < section.label.length) timer = setTimeout(tick, 35);
    };
    const start = setTimeout(tick, 100);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, [typeKey, section.label]);

  return (
    <button className={`nav-item${active ? ' active' : ''}`} onClick={onClick}>
      <span className="num">//{section.num}.</span>
      <span className="tag-open">&lt;</span>
      <span className="label">{out}</span>
      <span className="tag-close">/&gt;</span>
    </button>
  );
}

function Brand() {
  return (
    <div className="brand" aria-label="Harshal Manerikar">
      <span className="bracket">&lt;</span>
      <span className="slash">/</span>
      <span className="mark">HM</span>
      <span className="bracket">&gt;</span>
    </div>
  );
}

function DrumPicker({ currentIndex, onJump }: { currentIndex: number; onJump: (i: number) => void }) {
  const ITEM_H = 28;
  const VISIBLE = 5;
  const drumH = ITEM_H * VISIBLE;
  const offset = -(currentIndex * ITEM_H) + ITEM_H * Math.floor(VISIBLE / 2);

  return (
    <div style={{ position: 'relative', width: 44, height: drumH, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: ITEM_H * 2, left: 0, right: 0, height: ITEM_H, borderTop: '1px solid rgba(94,234,212,0.45)', borderBottom: '1px solid rgba(94,234,212,0.45)', background: 'rgba(94,234,212,0.06)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,16,14,0.95) 0%, transparent 28%, transparent 72%, rgba(8,16,14,0.95) 100%)', pointerEvents: 'none', zIndex: 3 }} />
      <div style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)', willChange: 'transform' }}>
        {SECTIONS.map((s, i) => {
          const dist = Math.abs(i - currentIndex);
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.45 : 0.18;
          const scale   = dist === 0 ? 1 : dist === 1 ? 0.82 : 0.68;
          return (
            <div key={s.id} onClick={() => onJump(i)} data-hover style={{
              height: ITEM_H, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: dist === 0 ? 15 : 11,
              fontWeight: dist === 0 ? 700 : 400, color: dist === 0 ? 'var(--mint)' : 'var(--fg-3)',
              opacity, transform: `scale(${scale})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease', cursor: 'none',
              letterSpacing: '0.06em', textShadow: dist === 0 ? '0 0 12px rgba(94,234,212,0.5)' : 'none',
            }}>
              {s.num}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavSidebar({ currentIndex, onJump }: { currentIndex: number; onJump: (i: number) => void }) {
  return (
    <nav className="nav-sidebar nav-sidebar-inner" aria-label="Section navigation">
      <div className="sb-logo">
        <span className="br">&lt;</span><span className="sl">/</span>HM<span className="br">&gt;</span>
      </div>
      <div className="sb-divider" />
      <div className="sb-drum-wrap">
        <DrumPicker currentIndex={currentIndex} onJump={onJump} />
      </div>
      <div className="sb-label">{SECTIONS[currentIndex]?.label || ''}</div>
    </nav>
  );
}

function NavTop({ currentIndex, onJump, navKey }: { currentIndex: number; onJump: (i: number) => void; navKey: number }) {
  const left  = SECTIONS.slice(0, 4);
  const right = SECTIONS.slice(4);
  return (
    <nav className="nav">
      <div className="nav-cluster left">
        {left.map((s) => (
          <NavItem key={s.id} section={s}
            active={SECTIONS[currentIndex].id === s.id}
            onClick={() => onJump(SECTIONS.findIndex(x => x.id === s.id))}
            typeKey={`${navKey}-${s.id}`} />
        ))}
      </div>
      <Brand />
      <div className="nav-cluster right">
        {right.map((s) => (
          <NavItem key={s.id} section={s}
            active={SECTIONS[currentIndex].id === s.id}
            onClick={() => onJump(SECTIONS.findIndex(x => x.id === s.id))}
            typeKey={`${navKey}-${s.id}`} />
        ))}
      </div>
    </nav>
  );
}

export default function Nav({ currentIndex, onJump, navKey, collapsed }: {
  currentIndex: number;
  onJump: (i: number) => void;
  navKey: number;
  collapsed: boolean;
}) {
  if (collapsed) return <NavSidebar currentIndex={currentIndex} onJump={onJump} />;
  return <NavTop currentIndex={currentIndex} onJump={onJump} navKey={navKey} />;
}
