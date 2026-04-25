"use client";

import { useState } from "react";
import type { ContactPayload } from "@/types";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [form, setForm]     = useState<ContactPayload>({ name: "", email: "", message: "" });
  const [state, setState]   = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Something went wrong."); setState("error"); return; }
      setState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--surface)]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="reveal-on-scroll mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest accent-text mb-2">
            Let&apos;s talk
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)]">
            Get in touch
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Open to full-time roles, freelance projects, and interesting conversations.
            I reply within 24 hours.
          </p>
        </div>

        {/* Quick links */}
        <div className="reveal-on-scroll flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
          <a href="mailto:mharshal625@gmail.com"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <EnvelopeIcon /> mharshal625@gmail.com
          </a>
          <a href="https://linkedin.com/in/harshal-m" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href="https://github.com/hrshl4codes" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            <GitHubIcon /> GitHub
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="reveal-on-scroll space-y-5 p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name"  name="name"  type="text"  value={form.name}  onChange={onChange} placeholder="Jane Smith"       required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="jane@company.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#475569] mb-1.5">
              Message <span className="accent-text">*</span>
            </label>
            <textarea
              name="message" value={form.message} onChange={onChange}
              rows={5} required placeholder="Tell me about the role or project..."
              className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none text-sm"
            />
          </div>

          {state === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="w-full py-3.5 rounded-lg accent-bg hover:opacity-90 text-white font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "Sending…" : "Send message"}
          </button>

          {state === "success" && (
            <p className="text-sm text-center text-emerald-600">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type, value, onChange, placeholder, required }: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#475569] mb-1.5">
        {label} {required && <span className="accent-text">*</span>}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors text-sm"
      />
    </div>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
