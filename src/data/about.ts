import type { AboutData } from '@/types';

export const ABOUT: AboutData = {
  intro: [
    "I'm a developer who got tired of tutorials and started building real things. It started with Python scripts and data analysis, then web development once I realised great software is only useful if people can actually reach it.",
    "Since then I've built ML pipelines, Streamlit dashboards, and full-stack Next.js apps. Lately most of my time goes to GenAI — RAG systems and multi-agent setups, and the genuinely annoying work of making LLMs reliable enough to put in front of a real user.",
    "I built a RAG platform with hybrid retrieval and citations, and a multi-agent research assistant where you can actually see why it routed a query the way it did, instead of trusting a black box. The models are the easy part now. Getting them to behave in production is where the real work is.",
  ],
  meta: [
    { label: 'Degree',     value: 'B.Tech CS, Manipal' },
    { label: 'Based in',   value: 'Mumbai, India' },
    { label: 'Focus',      value: 'AI tools + Full-stack' },
    { label: 'Graduating', value: 'November 2026' },
  ],
  now: [
    { pre: 'Joining ', bold: 'Delphi', post: ' as a Generative AI Intern, working on agentic systems and enterprise RAG.' },
    { pre: 'Interning at ', bold: 'Yashuss', post: ', building offboarding workflows and process automation.' },
    { pre: 'Wrote an open-source baseline for ', bold: 'Flower', post: ', the federated learning framework. PR currently under review by the core maintainers.' },
    { pre: 'Still extending ', bold: 'DocuMind', post: ': better multi-provider LLM routing, lower per-query cost.' },
    { pre: 'Finishing my ', bold: 'B.Tech at Manipal University Jaipur', post: ', graduating November 2026.' },
  ],
};
