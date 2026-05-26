import type { OpenSourceEntry } from '@/types';

export const OPEN_SOURCE: OpenSourceEntry = {
  title: 'FedHT Baseline — Federated Nonconvex Sparse Learning',
  framework: 'Flower (flwrlabs/flower)',
  frameworkDesc: 'Leading open-source federated learning framework, originated at the University of Oxford.',
  body: 'Authored the FedHT baseline for Flower, re-implementing Fed-HT and FedIter-HT (Tong et al., 2021) in Python. Replicated synthetic and MNIST experiments across 100 simulated clients with non-IID data partitioning. Documented full reproducibility for downstream researchers. Reviewed by core maintainers.',
  tech: ['Python', 'Flower', 'PyTorch', 'NumPy', 'Scientific Computing'],
  links: [
    { label: 'GitHub', url: 'https://github.com/flwrlabs/flower/tree/main/baselines/fedht' },
    { label: 'Paper',  url: 'https://arxiv.org/abs/2101.00052' },
  ],
};
