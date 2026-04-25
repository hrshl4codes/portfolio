"use client";

import { useEffect, useRef } from "react";

const FALLBACK_RGB = "99, 102, 241"; // indigo — matches default --accent

/* Converts a CSS hex colour to rgba() with the given alpha.
   Returns a safe fallback if the value is malformed. */
function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.trim().replace(/\s+/g, "").replace(/^#/, "");
  if (cleaned.length !== 6) return `rgba(${FALLBACK_RGB}, ${alpha})`;
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(${FALLBACK_RGB}, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let targetX = window.innerWidth  / 2;
    let targetY = window.innerHeight / 2;
    let glowX   = targetX;
    let glowY   = targetY;
    let rafId: number;

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; };
    window.addEventListener("mousemove", onMove);

    /* Gentle lerp so the glow drifts softly rather than snapping */
    const LERP   = 0.06;
    const RADIUS = 240;   // px — tighter on light bg

    function tick() {
      glowX += (targetX - glowX) * LERP;
      glowY += (targetY - glowY) * LERP;

      const hex = (
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent") || "#6366f1"
      ).trim().replace(/\s+/g, "");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, RADIUS);
      gradient.addColorStop(0,   hexToRgba(hex, 0.15));
      gradient.addColorStop(0.4, hexToRgba(hex, 0.07));
      gradient.addColorStop(1,   hexToRgba(hex, 0));

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
