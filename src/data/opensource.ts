import type { OpenSourceEntry } from "@/types";

export const openSourceEntries: OpenSourceEntry[] = [
  {
    id: "fedht",
    title: "FedHT Baseline — Federated Nonconvex Sparse Learning",
    framework: "Flower (flwrlabs/flower)",
    frameworkDescription:
      "Leading open-source federated learning framework, originated at the University of Oxford.",
    description:
      "Authored the FedHT baseline for Flower, re-implementing Fed-HT and FedIter-HT (Tong et al., 2021, Federated Nonconvex Sparse Learning) in Python. Replicated synthetic and MNIST experiments across 100 simulated clients with non-IID data partitioning. Documented full reproducibility for downstream researchers. Reviewed by core maintainers.",
    stack: ["Python", "Flower", "Federated Learning", "PyTorch", "NumPy", "Scientific Computing"],
    github: "https://github.com/flwrlabs/flower/tree/main/baselines/fedht",
    paper: "https://arxiv.org/abs/2101.00052",
    status: "open",
  },
];
