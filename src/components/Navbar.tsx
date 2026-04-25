"use client";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(1000px, calc(100% - 32px))",
        borderRadius: 999,
        backgroundColor: "#ffffff",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        zIndex: 50,
      }}
    >
      <nav className="px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="font-bold text-lg tracking-tight gradient-text shrink-0">
          HM.dev
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-1.5 rounded-full border accent-subtle-border accent-text hover:accent-subtle-bg transition-all duration-200 whitespace-nowrap shrink-0"
        >
          Résumé ↗
        </a>
      </nav>
    </header>
  );
}
