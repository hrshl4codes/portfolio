"use client";

import { useState } from "react";
import { skillGroups } from "@/data/skills";
import type { Skill } from "@/types";

const levelWidth: Record<Skill["level"], string> = {
  beginner:     "w-1/3",
  intermediate: "w-2/3",
  proficient:   "w-full",
};

const levelLabel: Record<Skill["level"], string> = {
  beginner:     "Learning",
  intermediate: "Building",
  proficient:   "Confident",
};

const SI = "https://cdn.simpleicons.org";

const icons: Record<string, string> = {
  "React.js":       `${SI}/react`,
  "HTML / CSS":     `${SI}/html5`,
  "Next.js":        `${SI}/nextdotjs`,
  "TypeScript":     `${SI}/typescript`,
  "Python":         `${SI}/python`,
  "FastAPI":        `${SI}/fastapi`,
  "REST APIs":      `${SI}/swagger`,
  "SQL":            `${SI}/postgresql`,
  "C / C++":        `${SI}/cplusplus`,
  "LLMs / RAG":     `${SI}/openai/000000`,
  "scikit-learn":   `${SI}/scikitlearn`,
  "pandas / numpy": `${SI}/numpy`,
  "PowerBI":        `${SI}/powerbi`,
  "Git / GitHub":   `${SI}/github`,
  "Docker":         `${SI}/docker`,
  "Excel":          `${SI}/microsoftexcel`,
  "CI/CD":          `${SI}/githubactions`,
};

function SkillIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const src = icons[name];

  if (!src || failed) {
    return (
      <span className="w-4 h-4 shrink-0 rounded-sm accent-subtle-bg flex items-center justify-center text-[8px] font-bold accent-text">
        {name[0]}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      loading="lazy"
      className="shrink-0 rounded-sm"
      style={{ objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="reveal-on-scroll mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text mb-2">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Skills
          </h2>
          <p className="mt-3 text-[var(--muted)] max-w-lg">
            Honest ratings. I&apos;d rather show growth trajectory than fake expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="reveal-on-scroll p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] card-glow"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-4 rounded-full accent-bg shrink-0" />
                <h3 className="font-semibold text-[var(--text)]">{group.category}</h3>
              </div>

              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <SkillIcon name={skill.name} />
                        <span className="text-sm text-[#475569] truncate">{skill.name}</span>
                      </div>
                      <span className="text-xs text-[var(--muted)] shrink-0">{levelLabel[skill.level]}</span>
                    </div>
                    <div className="h-1 w-full bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${levelWidth[skill.level]}`}
                        style={{
                          background:
                            "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 60%, white))",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
