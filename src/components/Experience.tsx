import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="reveal-on-scroll mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text mb-2">
            Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Where I&apos;ve worked
          </h2>
        </div>

        {/* Zigzag timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {experiences.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={[
                    "relative md:flex md:items-center md:gap-8",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  ].join(" ")}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <div
                      className={[
                        "reveal-on-scroll p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-glow",
                        isLeft ? "reveal-from-left md:mr-8" : "reveal-from-right md:ml-8",
                      ].join(" ")}
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      {/* Date + icon */}
                      <div className="flex items-center gap-2 mb-3">
                        <svg
                          className="accent-text shrink-0"
                          width="14" height="14" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        </svg>
                        <span className="text-sm font-mono accent-text">
                          {e.startDate} — {e.endDate}
                        </span>
                      </div>

                      {/* Company */}
                      <h3 className="text-2xl font-bold gradient-text mb-1 leading-tight">
                        {e.organizationUrl ? (
                          <a href={e.organizationUrl} target="_blank" rel="noopener noreferrer">
                            {e.organization}
                          </a>
                        ) : (
                          e.organization
                        )}
                      </h3>

                      {/* Role */}
                      <p className="text-sm font-medium text-[var(--muted)] mb-4 tracking-wide">
                        {e.title}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#475569] leading-relaxed mb-5">
                        {e.description}
                      </p>

                      {/* Tags */}
                      {e.tags && e.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {e.tags.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] bg-transparent"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className="timeline-dot hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full accent-bg ring-4 ring-[var(--surface)] shrink-0"
                    style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
                  />

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Resume nudge */}
        <div className="reveal-on-scroll mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm accent-text hover:underline underline-offset-4"
          >
            There&apos;s more in my résumé ↗
          </a>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
      </div>
    </section>
  );
}
