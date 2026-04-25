import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Background    from "@/components/Background";
import CustomCursor  from "@/components/CustomCursor";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const heading = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Harshal Manerikar | Developer",
  description:
    "Developer building AI-powered tools and full-stack web applications. FastAPI, React, Python, LLMs.",
  keywords: [
    "Harshal Manerikar",
    "full-stack developer",
    "Python",
    "FastAPI",
    "React",
    "RAG",
    "LLM",
    "software engineer",
  ],
  authors: [{ name: "Harshal Manerikar" }],
  openGraph: {
    type: "website",
    title: "Harshal Manerikar | Developer",
    description:
      "Full-stack developer building scalable web applications and ML-powered tools.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.className} ${heading.variable}`}>
      <body className="antialiased">
        {/* z-index 0 — static decorative background */}
        <Background />

        {/* z-index 9999 — cursor overlay */}
        <CustomCursor />

        {/* Keyboard skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:accent-bg focus:text-white focus:font-medium focus:outline-none"
        >
          Skip to content
        </a>

        {/* z-index 1+ — page content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
