import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/site";
import { rateLimit } from "@/lib/rate-limit";
import { apiSchema } from "@/lib/validation";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 16px 6px 0;color:#737373;vertical-align:top">${label}</td><td style="padding:6px 0">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(`enquiry:${ip}`, MAX_REQUESTS, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = apiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const subject =
    data.type === "newsletter"
      ? "New newsletter subscriber"
      : data.propertyTitle
        ? `New enquiry: ${data.propertyTitle}`
        : "New website enquiry";

  const rows =
    data.type === "newsletter"
      ? row("Email", data.email)
      : [
          row("Name", data.name),
          row("Phone", data.phone),
          row("Email", data.email || undefined),
          row("Property", data.propertyTitle),
          row("Listing", data.propertySlug ? `${siteConfig.url}/properties/${data.propertySlug}` : undefined),
          row("Message", data.message),
        ].join("");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#000"><h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2><table>${rows}</table></div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] RESEND_API_KEY is not set. Logging instead of sending:", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[enquiry] RESEND_API_KEY is missing in production.");
    return NextResponse.json(
      { ok: false, error: "Our email service is temporarily unavailable. Please message us on WhatsApp." },
      { status: 500 },
    );
  }

  const to = process.env.ENQUIRY_TO_EMAIL || siteConfig.email;
  const from = process.env.ENQUIRY_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;
  const replyTo = data.type === "enquiry" ? data.email || undefined : data.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to: [to], replyTo, subject, html });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Failed to send email:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again or contact us on WhatsApp." },
      { status: 502 },
    );
  }
}
