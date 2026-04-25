"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let running = false;

    /* ── Position dot exactly on cursor ── */
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (!running) startLoop();
    };

    /* ── Ring lerp loop — self-terminating ── */
    const LERP = 0.14;
    function startLoop() {
      running = true;
      requestAnimationFrame(tick);
    }
    function tick() {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * LERP;
      ringY += dy * LERP;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    /* ── Expand ring on hover ── */
    const SIZES: Record<string, number> = { default: 40, regular: 72, large: 120 };
    function setSize(key: keyof typeof SIZES) {
      const px = `${SIZES[key]}px`;
      ring.style.width  = px;
      ring.style.height = px;
      dot.style.opacity = key === "default" ? "1" : "0";
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("h1, h2, .hero, .tag, .section-label")) {
        setSize("large");
      } else if (el.closest("a, button, [role='button'], .card, .card-glow")) {
        setSize("regular");
      } else {
        setSize("default");
      }
    };

    /* ── Show/hide on enter/leave ── */
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Dot — rose, no blend mode, tracks exactly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Ring — backdrop-filter: invert(1) inverts content beneath without CPU blend */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.01)",
          backdropFilter: "invert(1)",
          WebkitBackdropFilter: "invert(1)",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s, width 0.25s ease, height 0.25s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
