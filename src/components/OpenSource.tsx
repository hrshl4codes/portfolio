import { openSourceEntries } from "@/data/opensource";
import type { OpenSourceEntry } from "@/types";

const statusLabel: Record<OpenSourceEntry["status"], { label: string; color: string }> = {
  merged: { label: "Merged", color: "text-violet-700 bg-violet-50 border-violet-200" },
  open:   { label: "Open",   color: "text-amber-700 bg-amber-50 border-amber-200"    },
  draft:  { label: "Draft",  color: "text-[#4b5563] bg-[#f1f5f9] border-[#e2e8f0]"  },
};

export default function OpenSource() {
  return (
    <section id="open-source" className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="reveal-on-scroll mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text mb-2">
            Community
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Open Source
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-lg">
            Contributions reviewed and merged by project maintainers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openSourceEntries.map((entry) => {
            const { label, color } = statusLabel[entry.status];
            return (
              <article
                key={entry.id}
                className="reveal-on-scroll card-glow flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden"
              >
                <div className="flex flex-col gap-5 p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-[var(--text)]">{entry.title}</h3>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${color}`}>
                      {label}
                    </span>
                  </div>

                  {/* Framework */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest accent-text mb-1">
                      Framework
                    </p>
                    <p className="text-sm font-medium text-[var(--text)]">{entry.framework}</p>
                    {entry.frameworkDescription && (
                      <p className="text-sm text-[#475569] leading-relaxed mt-0.5">
                        {entry.frameworkDescription}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest accent-text mb-1">
                      Contribution
                    </p>
                    <p className="text-sm text-[#475569] leading-relaxed">{entry.description}</p>
                  </div>

                  {/* Stack */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-md bg-[var(--surface)] text-[#475569] border border-[var(--border)] hover:accent-subtle-border transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto pt-2 border-t border-[var(--border)]">
                    <a
                      href={entry.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                    >
                      <GitHubIcon /> GitHub
                    </a>
                    {entry.paper && (
                      <a
                        href={entry.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:accent-text transition-colors"
                      >
                        <ExternalLinkIcon /> Paper
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
