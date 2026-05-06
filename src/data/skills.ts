import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "",
    skills: [
      { name: "React.js",    level: "proficient"   },
      { name: "HTML / CSS",  level: "proficient"   },
      { name: "Next.js",     level: "intermediate" },
      { name: "TypeScript",  level: "beginner"     },
    ],
  },
  {
    category: "Backend",
    icon: "",
    skills: [
      { name: "Python",      level: "proficient"   },
      { name: "FastAPI",     level: "proficient"   },
      { name: "REST APIs",   level: "proficient"   },
      { name: "SQL",              level: "intermediate" },
      { name: "C / C++",          level: "intermediate" },
      { name: "OAuth 2.0",        level: "intermediate" },
      { name: "API Integration",  level: "proficient"   },
    ],
  },
  {
    category: "AI / Data",
    icon: "",
    skills: [
      { name: "LLMs / RAG",           level: "intermediate" },
      { name: "scikit-learn",         level: "intermediate" },
      { name: "pandas / numpy",       level: "proficient"   },
      { name: "PowerBI",              level: "intermediate" },
      { name: "Predictive Analytics", level: "intermediate" },
      { name: "Statistical Analysis", level: "intermediate" },
      { name: "Streamlit",            level: "proficient"   },
    ],
  },
  {
    category: "Tools",
    icon: "",
    skills: [
      { name: "Git / GitHub",       level: "proficient"   },
      { name: "Docker",             level: "beginner"     },
      { name: "Excel",              level: "intermediate" },
      { name: "CI/CD",              level: "intermediate" },
      { name: "Workflow Automation", level: "proficient"  },
      { name: "Linux / Shell",      level: "intermediate" },
    ],
  },
];
