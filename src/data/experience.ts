import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    type: "work",
    title: "Operations Intern",
    organization: "Yashuss Unlimited Business Solutions",
    startDate: "Apr 2026",
    endDate: "Present",
    description:
      "Built Threadlink, an end-to-end Python automation pipeline integrating Zoho Mail and Zoho CRM via OAuth 2.0 — modular 6-stage system processing 50 emails in 3.7s at 90% noise rejection. Authored a 4-pillar Email Centralization Implementation Plan covering MX/SPF/DKIM/DMARC verification, routing rules, role-based mail policies, and eDiscovery audit archiving. Designed a Day 0 → 30 → 90 offboarding lifecycle and 6-tier user-classification model.",
    tags: ["Python", "OAuth 2.0", "Workflow Automation", "Data Privacy", "IT Controls", "LLM Integration"],
  },
  {
    type: "internship",
    title: "ITSM Analyst Intern",
    organization: "Indorama Ventures Pvt. Ltd",
    startDate: "May 2024",
    endDate: "Jul 2024",
    description:
      "Analysed identity management, access control, and license inventory across a global enterprise. Flagged duplication and gaps that improved system scalability and compliance readiness.",
    tags: ["ITSM", "Identity Management", "Data Analysis"],
  },
];
