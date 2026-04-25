export interface Project {
  id: string;
  title: string;
  image?: string;   // path relative to /public, e.g. "/projects/flowsocial.png"
  problem: string;
  solution: string;
  stack: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  features: string[];
  challenges: string[];
  tags: string[];
  github?: string;
  demo?: string;
  status: "live" | "in-progress" | "archived";
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "proficient";
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ExperienceType = "education" | "internship" | "work" | "hackathon" | "course" | "oss";

export interface Experience {
  type: ExperienceType;
  title: string;          // "B.Tech in Computer Science"
  organization: string;   // "Institute of Technology"
  organizationUrl?: string;
  startDate: string;      // "Aug 2022"
  endDate: string;        // "May 2026" or "Present"
  description: string;    // 1-2 sentences
  tags?: string[];
  highlights?: string[];  // bullet achievements
}
