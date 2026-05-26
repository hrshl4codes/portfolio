import type { SkillCategory } from '@/types';

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'React.js',   level: 'confident' },
      { name: 'HTML / CSS', level: 'confident' },
      { name: 'Next.js',    level: 'building'  },
      { name: 'TypeScript', level: 'learning'  },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Python',    level: 'confident' },
      { name: 'FastAPI',   level: 'confident' },
      { name: 'REST APIs', level: 'confident' },
      { name: 'SQL',       level: 'building'  },
      { name: 'C / C++',   level: 'building'  },
      { name: 'OAuth 2.0', level: 'building'  },
    ],
  },
  {
    title: 'AI / Data',
    items: [
      { name: 'LLMs / RAG',            level: 'building'  },
      { name: 'pandas / numpy',        level: 'confident' },
      { name: 'scikit-learn',          level: 'building'  },
      { name: 'Streamlit',             level: 'confident' },
      { name: 'Predictive Analytics',  level: 'building'  },
      { name: 'Statistical Analysis',  level: 'building'  },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git / GitHub',   level: 'confident' },
      { name: 'Workflow Auto',  level: 'confident' },
      { name: 'CI/CD',          level: 'building'  },
      { name: 'Docker',         level: 'learning'  },
      { name: 'Linux / Shell',  level: 'building'  },
      { name: 'PowerBI',        level: 'building'  },
    ],
  },
];
