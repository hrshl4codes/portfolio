import type { Metadata } from 'next';
import { Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Harshal Manerikar — Developer',
  description: 'Developer building AI-powered tools and full-stack web applications. FastAPI, React, Python, LLMs.',
  keywords: ['Harshal Manerikar', 'full-stack developer', 'Python', 'FastAPI', 'React', 'RAG', 'LLM', 'AI engineer'],
  authors: [{ name: 'Harshal Manerikar' }],
  openGraph: {
    type: 'website',
    title: 'Harshal Manerikar — Developer',
    description: 'Full-stack developer building scalable web applications and ML-powered tools.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
