"use client";

import { useEffect } from "react";

/* ─────────────────────────────────────────────────────────
   Attaches an IntersectionObserver to every element with
   class="reveal-on-scroll". When 10 % of the element enters
   the viewport, we add "revealed" which triggers the CSS
   transition defined in globals.css.

   WHY: Browser-native Intersection Observer is zero-bundle,
   vs ~35 kB for a JS animation library.
   ───────────────────────────────────────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".reveal-on-scroll, .timeline-dot")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
