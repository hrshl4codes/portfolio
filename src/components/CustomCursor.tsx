"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = -300, mouseY = -300;
    let ringX  = -300, ringY  = -300;
    let rafId: number;
    let visible = false;

    /* Show both elements on first mouse move — more reliable than mouseenter */
    function show() {
      if (!visible) {
        ring.style.opacity = "1";
        visible = true;
      }
    }
    function hide() {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
      visible = false;
    }

    /* Dot tracks exactly */
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      show();
    };

    /* Ring lerp — always-running loop, never self-terminates */
    function tick() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    }

    /* Expand ring on interactive / heading elements */
    const SIZES = { default: 40, regular: 72, large: 120 } as const;
    function setSize(key: keyof typeof SIZES) {
      const px = `${SIZES[key]}px`;
      ring.style.width  = px;
      ring.style.height = px;
      /* Hide dot when ring is expanded */
      dot.style.opacity = (key === "default" && visible) ? "1" : "0";
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("h1, h2, .hero, .section-label")) {
        setSize("large");
      } else if (el.closest("a, button, [role='button'], .card, .card-glow")) {
        setSize("regular");
      } else {
        setSize("default");
      }
    };

    window.addEventListener("mousemove",    onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot — rose, snaps to cursor */}
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
          transition: "opacity 0.15s",
          willChange: "transform",
        }}
      />

      {/* Ring — rose border, transparent fill, lerp lag */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          backgroundColor: "transparent",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.15s, width 0.25s ease, height 0.25s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
