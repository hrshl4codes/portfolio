"use client";

import { useState, useEffect, useRef } from "react";

const links = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Contact",    href: "#contact"    },
];

function Eye({ eyeRef }: { eyeRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      ref={eyeRef}
      aria-hidden="true"
      className="relative inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0"
      style={{
        background: "#0f172a",
        boxShadow: "0 0 0 1.5px rgba(225,29,72,0.5), 0 2px 10px rgba(0,0,0,0.25)",
      }}
    >
      {/* Iris — white, 18px → 7px black ring on each side */}
      <span className="absolute w-[18px] h-[18px] rounded-full bg-white" />
      {/* Pupil — rose, 12px, max travel 2px → stays inside iris */}
      <span
        className="pupil absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: "var(--accent)", transform: "translate(0px, 0px)" }}
      />
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const eye1Ref = useRef<HTMLSpanElement>(null);
  const eye2Ref = useRef<HTMLSpanElement>(null);

  /* Eye tracking */
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
    <>
      {/* Pill navbar */}
      <header
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(860px, calc(100% - 48px))",
          borderRadius: 999,
          backgroundColor: "#ffffff",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          zIndex: 50,
        }}
      >
        <nav className="px-6 h-14 flex items-center justify-between gap-6">
          {/* Logo + eyes */}
          <a href="#hero" className="flex items-center gap-3 shrink-0">
            <span className="font-bold text-lg tracking-tight gradient-text">HM.dev</span>
            <span className="eyes-container flex items-center gap-1.5">
              <Eye eyeRef={eye1Ref} />
              <Eye eyeRef={eye2Ref} />
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-[#4b5563] hover:text-[#0f172a] transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3.5 py-1.5 rounded-full border accent-subtle-border accent-text hover:accent-subtle-bg transition-all duration-200"
              >
                Résumé ↗
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-[#0f172a] transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#0f172a] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#0f172a] transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer — separate card below the pill */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 84,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(860px, calc(100% - 48px))",
            borderRadius: 20,
            backgroundColor: "#ffffff",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            zIndex: 49,
          }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#4b5563] hover:text-[#0f172a] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="accent-text"
          >
            Résumé ↗
          </a>
        </div>
      )}
    </>
  );
}
