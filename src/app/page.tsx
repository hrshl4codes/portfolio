'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTIONS } from '@/data/sections';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import OpenSource from '@/components/OpenSource';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { BootScreen, GlitchOverlay, Dust, CustomCursor } from '@/components/Effects';

function FooterStrip({ activeIndex, total }: { activeIndex: number; total: number }) {
  const current = SECTIONS[activeIndex] || SECTIONS[0];
  return (
    <div className="footer-strip">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: 'var(--mint)' }}>●</span>
        <span>section: <span style={{ color: 'var(--fg-1)' }}>{current.label}</span></span>
        <span style={{ color: 'var(--fg-5)' }}>|</span>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span>scroll</span>
        <span style={{ color: 'var(--fg-5)' }}>↓</span>
      </div>
    </div>
  );
}

function BootStatus({ ready }: { ready: boolean }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ready]);
  if (!ready) return null;
  return (
    <div style={{ position: 'fixed', top: 6, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.18em', color: 'var(--fg-4)', pointerEvents: 'none', zIndex: 90 }}>
      <span style={{ color: 'var(--mint)' }}>●</span>{' '}
      SYSTEM: ONLINE · IST {time} · HARSHAL.PORTFOLIO_V2
    </div>
  );
}

export default function Page() {
  const [bootDone,      setBootDone]      = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState(0);
  const [appReady,      setAppReady]      = useState(false);
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [navCollapsed,  setNavCollapsed]  = useState(false);
  const [activeSections, setActiveSections] = useState(() => SECTIONS.map(() => false));

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef    = useRef<HTMLDivElement>(null);

  const handleBootDone = useCallback(() => {
    setGlitchTrigger(g => g + 1);
    setBootDone(true);
    setAppReady(true);
    setActiveSections(SECTIONS.map((_, i) => i === 0));
    document.body.classList.remove('booting');
  }, []);

  useEffect(() => {
    document.body.classList.add('booting');
    return () => document.body.classList.remove('booting');
  }, []);

  useEffect(() => {
    const grid = document.querySelector('.bg-grid') as HTMLElement | null;
    if (!grid) return;
    const onScroll = () => {
      grid.style.backgroundPositionY = `${window.scrollY * 0.25}px`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!appReady) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const i = parseInt((entry.target as HTMLElement).dataset.idx ?? '', 10);
        if (isNaN(i)) return;
        if (entry.isIntersecting) {
          setActiveSections(prev => {
            if (prev[i]) return prev;
            const next = [...prev]; next[i] = true; return next;
          });
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20% 0px' });

    sectionRefs.current.forEach(el => { if (el) observer.observe(el); });

    let scheduled = false;
    const computeState = () => {
      scheduled = false;
      const scrollY = window.scrollY;
      const heroEl = sectionRefs.current[0];
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight;
      setNavCollapsed(scrollY > heroH * 0.6);

      const center = scrollY + window.innerHeight / 2;
      let idx = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        if (el.offsetTop <= center) idx = i;
      }
      setActiveIndex(idx);

      setActiveSections(prev => {
        let changed = false;
        const next = [...prev];
        for (let i = 0; i < sectionRefs.current.length; i++) {
          const el = sectionRefs.current[i];
          if (!el) continue;
          const top = el.offsetTop, bottom = top + el.offsetHeight;
          const visible = top < scrollY + window.innerHeight && bottom > scrollY;
          if (visible && !next[i]) { next[i] = true; changed = true; }
        }
        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(computeState, 16);
    };

    computeState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', computeState);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', computeState);
    };
  }, [appReady]);

  const jumpTo = useCallback((i: number) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!appReady) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element)?.matches('input, textarea')) return;
      if (e.key >= '1' && e.key <= '9') {
        const i = parseInt(e.key, 10) - 1;
        if (i < SECTIONS.length) jumpTo(i);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [appReady, jumpTo]);

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
    if (el) el.dataset.idx = String(i);
  };

  return (
    <div className="app">
      {!bootDone && <BootScreen onDone={handleBootDone} duration={3000} />}

      <div className="bg-grid" />
      <Dust count={16} />
      <div className="scanlines" />

      <BootStatus ready={appReady} />
      {appReady && <Nav currentIndex={activeIndex} onJump={jumpTo} navKey={activeIndex} collapsed={navCollapsed} />}

      {appReady && (
        <div ref={stageRef} className={`stage${navCollapsed ? ' with-sidebar' : ''}`}>
          <div className="stage-content" style={{ visibility: 'visible' }}>
            <div ref={setRef(0)} className="section-wrap" data-idx="0"><Hero        active={activeSections[0]} /></div>
            <div ref={setRef(1)} className="section-wrap" data-idx="1"><About       active={activeSections[1]} /></div>
            <div ref={setRef(2)} className="section-wrap" data-idx="2"><Experience  active={activeSections[2]} /></div>
            <div ref={setRef(3)} className="section-wrap" data-idx="3"><Projects    active={activeSections[3]} /></div>
            <div ref={setRef(4)} className="section-wrap" data-idx="4"><OpenSource  active={activeSections[4]} /></div>
            <div ref={setRef(5)} className="section-wrap" data-idx="5"><Skills      active={activeSections[5]} /></div>
            <div ref={setRef(6)} className="section-wrap" data-idx="6"><Contact     active={activeSections[6]} /></div>
          </div>
        </div>
      )}

      {appReady && <FooterStrip activeIndex={activeIndex} total={SECTIONS.length} />}

      <GlitchOverlay trigger={glitchTrigger} stageRef={stageRef} />
      <CustomCursor />
    </div>
  );
}
