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
    id: "stocksense",
    title: "StockSense",
    image: "/projects/stocksense.png",
    problem:
      "Warehouses operating in isolation hold either too much or too little stock, driving up costs and creating shortage risk. Manual rebalancing is slow, error-prone, and unable to react to changing demand.",
    solution:
      "Predictive inventory optimization platform that mines warehouse and order data to forecast demand, calculate inventory pressure, and recommend optimal stock transfers between locations.",
    stack: {
      frontend: ["Plotly", "Streamlit"],
      backend: ["Python", "Pandas", "NumPy"],
      tools: ["Predictive Analytics"],
    },
    features: [
      "Forecasts demand and surfaces inventory imbalances across 8 warehouses and 32 SKUs",
      "Stock Pressure Index (SPI) algorithm with transfer-optimization logic",
      "Interactive dashboard with KPI tracking, demand forecasts, and what-if scenario simulation",
      "Identified ₹15,250 in potential cost savings; reduced shortage exposure by 25%",
    ],
    challenges: [
      "Designing an SPI metric that balances current stock, reorder thresholds, and predicted demand into a single actionable signal",
      "Building transfer logic that respects same-category constraints across distributed warehouses",
      "Translating analytical outputs into a stakeholder-facing dashboard non-technical users can act on",
    ],
    tags: ["Python", "ML", "Data Analysis", "Predictive Modeling", "Full-Stack"],
    github: "https://github.com/hrshl4codes/StockSense",
    demo: "https://warehousbalancer-harshaltech.streamlit.app",
    status: "live",
  },
  {
    id: "trader-behaviour-analysis",
    title: "Trader Behaviour Analysis",
    image: "/projects/trader-analysis.png",
    problem:
      "Crypto trader performance shifts dramatically with market sentiment, but the patterns behind those shifts are obscured by noisy, high-volume trade data and lack of structured behavioural segmentation.",
    solution:
      "Data-driven analysis pipeline merging Hyperliquid trader data with the Bitcoin Fear & Greed Index to surface how sentiment regimes affect win rates, risk-taking, and trader behaviour.",
    stack: {
      frontend: ["Jupyter"],
      backend: ["Python", "Pandas", "scikit-learn"],
      tools: ["Statistical Testing", "Clustering"],
    },
    features: [
      "Cleaned and timestamp-aligned raw trader data with daily sentiment encoding",
      "Statistical testing across sentiment regimes to validate behavioural shifts",
      "Trader segmentation via clustering to identify heterogeneous response patterns",
      "Found that sentiment affects win rates and risk expression more than median profitability",
    ],
    challenges: [
      "Aligning two datasets with different timestamp granularities (per-trade vs daily)",
      "Avoiding overfitting in segmentation given limited regime samples",
      "Distinguishing genuine behavioural shifts from random variance in noisy market data",
    ],
    tags: ["Python", "ML", "Data Analysis", "Statistical Testing"],
    github: "https://github.com/hrshl4codes/Trader-Behaviour-Analysis",
    demo: undefined,
    status: "complete",
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
