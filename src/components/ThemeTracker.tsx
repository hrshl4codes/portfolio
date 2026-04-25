"use client";

import { useEffect } from "react";

/* Maps each section ID to the theme class applied to <html>.
   When a section crosses 40% of the viewport, the accent
   color smoothly transitions via the @property rule in CSS. */
const SECTIONS: { id: string; theme: string }[] = [
  { id: "hero",       theme: "theme-hero"       },
  { id: "about",      theme: "theme-about"      },
  { id: "experience", theme: "theme-experience" },
  { id: "projects",   theme: "theme-projects"   },
  { id: "skills",     theme: "theme-skills"     },
  { id: "contact",    theme: "theme-contact"    },
];

const ALL_THEMES = SECTIONS.map((s) => s.theme);

export default function ThemeTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = SECTIONS.find(
            (s) => s.id === entry.target.id
          );
          if (!section) return;

          /* Swap theme class on <html> — CSS handles the transition */
          document.documentElement.classList.remove(...ALL_THEMES);
          document.documentElement.classList.add(section.theme);
        });
      },
      {
        /* Fire when 40% of the section enters the viewport.
           Using rootMargin "-30% 0px" so the switch happens
           roughly when the section centre crosses mid-screen. */
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
