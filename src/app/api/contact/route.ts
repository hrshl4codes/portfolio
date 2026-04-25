import type { NextRequest } from "next/server";
import type { ContactPayload } from "@/types";

/* ─────────────────────────────────────────────────────────
   POST /api/contact
   Validates the contact form payload, then logs it.

   WHY it's a real API route (not just a mailto: link):
   - Lets us add email-sending (Resend, Nodemailer) later
     without touching the frontend at all.
   - Server-side validation prevents junk data.

   To add real email sending:
     1. npm install resend
     2. Set RESEND_API_KEY in .env.local
     3. Replace the console.log block below with:
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({ from, to, subject, html });
   ───────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  /* Server-side validation — never trust the client */
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "All fields are required." },
      { status: 422 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 422 });
  }

  if (message.trim().length < 10) {
    return Response.json(
      { error: "Message must be at least 10 characters." },
      { status: 422 }
    );
  }

  /* ── In production: send email here ── */
  console.log("[contact] New message", { name, email, message });

  return Response.json({ success: true }, { status: 200 });
}
