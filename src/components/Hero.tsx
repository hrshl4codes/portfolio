"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const photos: { src: string; caption: string; fit?: "cover" | "contain"; aspect: string }[] = [
  { src: "/photos/photo-1.jpeg", caption: "", aspect: "709/887" },
  { src: "/photos/photo-2.JPG",  caption: "", aspect: "1/1"     },
];

export default function Hero() {
  const [photoIndex, setPhotoIndex]   = useState(0);
  const [photoVisible, setPhotoVisible] = useState(true);

  function goTo(next: number) {
    if (photos.length === 0) return;
    setPhotoVisible(false);
    setTimeout(() => {
      setPhotoIndex((next + photos.length) % photos.length);
      setPhotoVisible(true);
    }, 250);
  }

  const hasPhotos = photos.length > 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 pb-40 md:pb-0">

        {/* Left: text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.1] mb-4">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Harshal Manerikar</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[var(--muted)] mb-6">
            Developer
          </p>

          <p className="text-lg text-[#475569] max-w-xl mb-10 leading-relaxed mx-auto md:mx-0">
            I build scalable web applications end-to-end: polished UIs,
            production APIs, and ML tools that solve real business problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="px-8 py-3.5 rounded-lg accent-bg hover:opacity-90 text-white font-medium transition-all duration-200 hover:scale-105">
              View my work
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded-lg border border-[var(--border)] text-[#475569] hover:text-[var(--text)] hover:border-[var(--accent)] font-medium transition-all duration-200">
              Get in touch
            </a>
          </div>

        </div>

        {/* Right: photo carousel */}
        <div className="shrink-0 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">

            <button
              onClick={() => goTo(photoIndex - 1)}
              disabled={!hasPhotos}
              aria-label="Previous photo"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            <div
              className="relative w-52 sm:w-60 md:w-72"
              style={{
                aspectRatio: hasPhotos ? photos[photoIndex].aspect : "4/5",
                transition: "aspect-ratio 0.4s ease",
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute inset-0 rounded-2xl blur-md opacity-30"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <div className="absolute inset-[3px] rounded-2xl bg-white z-10" />

              <div
                className="absolute inset-[3px] rounded-2xl z-20 overflow-hidden transition-opacity duration-250"
                style={{ opacity: photoVisible ? 1 : 0 }}
              >
                {hasPhotos ? (
                  <Image
                    src={photos[photoIndex].src}
                    alt={photos[photoIndex].caption}
                    fill
                    className={photos[photoIndex].fit === "contain" ? "object-contain" : "object-cover"}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--border)] flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-[var(--muted)] text-center px-6">
                      Add photos to the<br />array in Hero.tsx
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => goTo(photoIndex + 1)}
              disabled={!hasPhotos}
              aria-label="Next photo"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ›
            </button>

          </div>

          <div
            className="flex flex-col items-center gap-2 transition-opacity duration-250"
            style={{ opacity: photoVisible ? 1 : 0 }}
          >
            <p className="text-sm text-[var(--muted)] text-center min-h-[1.25rem]">
              {hasPhotos ? photos[photoIndex].caption : ""}
            </p>

            {photos.length > 1 && (
              <div className="flex gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor:
                        i === photoIndex ? "var(--accent)" : "var(--border)",
                      transform: i === photoIndex ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section navigation — pinned to bottom of hero viewport */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3 px-4">
        <nav className="flex flex-wrap justify-center gap-2">
          {[
            { label: "About",      href: "#about"      },
            { label: "Experience", href: "#experience" },
            { label: "Projects",   href: "#projects"   },
            { label: "Skills",     href: "#skills"     },
            { label: "Contact",    href: "#contact"    },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-1.5 rounded-full text-sm border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200"
              style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(6px)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="animate-bounce text-[var(--muted)] text-base">↓</span>
      </div>
    </section>
  );
}
