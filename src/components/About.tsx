export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="reveal-on-scroll space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Who I am
          </h2>

          <p className="text-[#475569] leading-relaxed">
            I&apos;m a developer who got tired of tutorials and started building real
            things. My journey started with Python scripts and data analysis, then
            expanded into web development when I realised that great software is
            only useful if people can actually reach it.
          </p>

          <p className="text-[#475569] leading-relaxed">
            I&apos;ve since built ML pipelines, Streamlit dashboards, and full-stack
            Next.js apps, always trying to ship something that solves a real
            problem, not just passes tests. I care deeply about code that other
            people can read, maintain, and improve.
          </p>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: "Degree",     value: "B.Tech CS, Manipal"  },
              { label: "Based in",   value: "Mumbai, India"       },
              { label: "Focus",      value: "AI tools + Full-stack"},
              { label: "Graduating", value: "November 2026"        },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] mb-0.5">{label}</p>
                <p className="text-sm font-medium text-[var(--text)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* "Now" card */}
        <div className="reveal-on-scroll p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] card-glow">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              Now
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[var(--text)] mb-4">
            What I&apos;m up to
          </h3>

          <ul className="space-y-3 text-sm text-[#475569] leading-relaxed">
            <li className="flex gap-3">
              <span className="accent-text shrink-0">→</span>
              <span>Interning as an <strong className="text-[var(--text)]">Operations Intern at Yashuss</strong>, building offboarding workflows and process automation.</span>
            </li>
            <li className="flex gap-3">
              <span className="accent-text shrink-0">→</span>
              <span>Authored an open-source baseline for <strong className="text-[var(--text)]">Flower</strong>, the federated learning framework — PR open and under review by core maintainers.</span>
            </li>
            <li className="flex gap-3">
              <span className="accent-text shrink-0">→</span>
              <span>Extending <strong className="text-[var(--text)]">Documind</strong>: improving multi-provider LLM routing and reducing per-query cost.</span>
            </li>
            <li className="flex gap-3">
              <span className="accent-text shrink-0">→</span>
              <span>Finishing my <strong className="text-[var(--text)]">B.Tech at Manipal University Jaipur</strong>, graduating November 2026.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
