"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal-on-scroll mb-4">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text mb-2">
            Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Projects
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-lg">
            Each project tackles a real problem. Click &quot;Challenges faced&quot; on
            any card to see what I had to figure out.
          </p>
        </div>

        {/* Tag filter */}
        <div className="reveal-on-scroll flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                active === tag
                  ? "accent-bg accent-border text-white"
                  : "bg-[var(--card)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
