"use client";

import { useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ScrollRevealInit() {
  useScrollReveal();

  /* Always start at the top on fresh load / refresh */
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
