import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "documind",
    title: "Documind",
    image: "/projects/documind.png",
    problem:
      "Extracting insights from large document collections requires expensive custom engineering or poor off-the-shelf tools that don't handle mixed formats or nuanced Q&A.",
    solution:
      "End-to-end RAG (Retrieval-Augmented Generation) platform built with FastAPI and React. Users upload documents and ask natural-language questions answered by OpenAI or Gemini.",
    stack: {
      frontend: ["React.js", "TypeScript"],
      backend: ["Python", "FastAPI", "RAG / LangChain", "OpenAI API", "Gemini API"],
      tools: ["Render.com", "CI/CD pipeline", "Microservices"],
    },
    features: [
      "Intelligent document Q&A across PDF, DOCX, and TXT formats",
      "Multi-provider LLM support: OpenAI and Gemini, switchable per query",
      "1,000+ document uploads handled with 99.9% uptime",
      "Automated CI/CD pipeline deployed on Render.com",
    ],
    challenges: [
      "Balancing accuracy, latency, and cost trade-offs across multiple LLM providers",
      "Designing reliable RAG retrieval logic for varied document structures",
      "Building a microservices architecture solo without over-engineering it",
    ],
    tags: ["Python", "AI/LLM", "Full-Stack", "RAG"],
    github: "https://github.com/hrshl4codes",
    demo: undefined,
    status: "live",
  },
  {
    id: "flowsocial",
    title: "FlowSocial",
    image: "/projects/flowsocial.png",
    problem:
      "Traditional social platforms centralise all user data on company servers, creating massive privacy risks and making regulatory compliance (GDPR, HIPAA) nearly impossible.",
    solution:
      "Federated learning architecture where ML models train locally on each device. Only encrypted gradient updates are shared with the server; raw user data never leaves the client.",
    stack: {
      frontend: ["React", "Tailwind CSS"],
      backend: ["Python", "FastAPI", "Federated Learning"],
      tools: ["Poetry", "Docker", "Open Images Dataset"],
    },
    features: [
      "Privacy-preserving personalised content recommendations",
      "Federated model training across distributed nodes",
      "GDPR / HIPAA / CCPA compliant by design",
      "Architecture supports cross-institutional collaboration without data sharing",
    ],
    challenges: [
      "Handling heterogeneous and incomplete data across federated nodes",
      "Maintaining model accuracy without centralised training data",
      "Aligning complex technical architecture with clear user-facing outcomes",
    ],
    tags: ["Python", "ML", "Privacy", "Federated Learning"],
    github: "https://github.com/hrshl4codes",
    demo: undefined,
    status: "in-progress",
  },
];
