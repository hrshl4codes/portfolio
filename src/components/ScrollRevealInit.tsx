"use client";

/* Tiny client component whose sole job is to run the
   IntersectionObserver hook after the DOM mounts.
   Keeping this separate means every other section
   (Skills, About, Footer) can stay as Server Components. */
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ScrollRevealInit() {
  useScrollReveal();
  return null;
}
