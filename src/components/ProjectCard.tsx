"use client";

import Image from "next/image";
import type { Project } from "@/types";

interface Props { project: Project }

const statusLabel: Record<Project["status"], { label: string; color: string }> = {
  live:          { label: "Live",        color: "text-emerald-700 bg-emerald-50 border-emerald-200"  },
  "in-progress": { label: "In Progress", color: "text-amber-700 bg-amber-50 border-amber-200"        },
  archived:      { label: "Archived",    color: "text-[#4b5563] bg-[#f1f5f9] border-[#e2e8f0]"      },
};

export default function ProjectCard({ project }: Props) {
  const { label, color } = statusLabel[project.status];

  return (
    <article className="reveal-on-scroll card-glow flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
      {/* Screenshot */}
      <div className="relative w-full h-44 bg-[var(--surface)] shrink-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-[var(--muted)]">screenshot coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-[var(--text)]">{project.title}</h3>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${color}`}>
            {label}
          </span>
        </div>

        {/* Problem / Solution */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest accent-text mb-1">
              Problem
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest accent-text mb-1">
              Solution
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-2">
            Key Features
          </p>
          <ul className="space-y-1">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                <span className="accent-text mt-0.5 shrink-0">▸</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-2">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {[...project.stack.frontend, ...project.stack.backend, ...project.stack.tools].map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--surface)] text-[#475569] border border-[var(--border)] hover:accent-subtle-border transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)] transition-colors list-none flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Challenges faced
          </summary>
          <ul className="mt-3 space-y-1 pl-4">
            {project.challenges.map((c) => (
              <li key={c} className="text-sm text-[var(--muted)] list-disc">{c}</li>
            ))}
          </ul>
        </details>

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-2 border-t border-[var(--border)]">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
              <GitHubIcon /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:accent-text transition-colors">
              <ExternalLinkIcon /> Live Demo
            </a>
          )}
          {!project.github && !project.demo && (
            <p className="text-xs text-[var(--muted)] italic">Links coming soon</p>
          )}
        </div>
      </div>
    </article>
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
