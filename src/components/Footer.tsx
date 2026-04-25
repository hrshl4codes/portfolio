export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p>
          Built with{" "}
          <span className="text-[var(--text)]">Next.js + Tailwind CSS</span>
        </p>
        <p>© {new Date().getFullYear()} Harshal Manerikar</p>
      </div>
    </footer>
  );
}
