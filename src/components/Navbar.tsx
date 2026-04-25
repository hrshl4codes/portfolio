"use client";

import { useEffect, useRef } from "react";

function Eye({ eyeRef }: { eyeRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      ref={eyeRef}
      aria-hidden="true"
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0"
      style={{
        background: "#0f172a",
        boxShadow: "0 0 0 1.5px rgba(225,29,72,0.5), 0 2px 10px rgba(0,0,0,0.25)",
      }}
    >
      <span className="absolute w-[20px] h-[20px] rounded-full bg-white" />
      <span
        className="pupil absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: "var(--accent)", transform: "translate(0px, 0px)" }}
      />
    </span>
  );
}

export default function Navbar() {
  const eye1Ref = useRef<HTMLSpanElement>(null);
  const eye2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mouseX = window.innerWidth / 2, mouseY = 40;
    let rafId: number, scheduled = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!scheduled) { scheduled = true; rafId = requestAnimationFrame(update); }
    };
    function update() {
      scheduled = false;
      const MAX = 2;
      [eye1Ref.current, eye2Ref.current].forEach((eye) => {
        if (!eye) return;
        const pupil = eye.querySelector<HTMLElement>(".pupil");
        if (!pupil) return;
        const rect  = eye.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const angle = Math.atan2(mouseY - cy, mouseX - cx);
        const dist  = Math.min(MAX, Math.hypot(mouseX - cx, mouseY - cy) / 15);
        pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1000px, calc(100% - 32px))",
        borderRadius: 999,
        backgroundColor: "#ffffff",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        zIndex: 50,
      }}
    >
      <nav className="relative px-6 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="#hero" className="font-bold text-lg tracking-tight gradient-text shrink-0">
          HM.dev
        </a>

        {/* Center: Eyes — absolutely centred */}
        <div className="eyes-container absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <Eye eyeRef={eye1Ref} />
          <Eye eyeRef={eye2Ref} />
        </div>

        {/* Right: Résumé */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-1.5 rounded-full border accent-subtle-border accent-text hover:accent-subtle-bg transition-all duration-200 whitespace-nowrap shrink-0"
        >
          Résumé ↗
        </a>
      </nav>
    </header>
  );
}
