import type { RequestHandler } from "express";
import { z } from "zod";

export const commercialQuoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(40),
  email: z.string().trim().email().max(160),
  address: z.string().trim().min(5).max(240),
  propertyType: z.string().trim().min(1).max(80),
  sqft: z.string().trim().min(1).max(40),
  buildingsCount: z.string().trim().min(1).max(40),
  yearBuilt: z.string().trim().max(20).optional().default(""),
  purpose: z.string().trim().min(1).max(120),
  desiredDate: z.string().trim().min(1).max(40),
  message: z.string().trim().max(2000).optional().default(""),
});

type CommercialQuote = z.infer<typeof commercialQuoteSchema>;
type Fetch = typeof fetch;

type CommercialQuoteEmailSender = (
  quote: CommercialQuote,
  submittedAt: string
) => Promise<{ id: string }>;

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const SUBJECT = "New ProSpec Commercial Inspection Lead";
const SOURCE = "ProSpec website commercial quote form";
const SEND_FAILURE_MESSAGE =
  "Your request could not be sent. Please call or text ProSpec directly.";

function requireEnvironmentVariable(
  name: "RESEND_API_KEY" | "COMMERCIAL_LEAD_TO" | "COMMERCIAL_LEAD_FROM",
  environment: NodeJS.ProcessEnv
) {
  const value = environment[name]?.trim();

  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}

function displayValue(value: string) {
  return value || "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildCommercialQuoteEmail(
  quote: CommercialQuote,
  submittedAt: string
) {
  const fields = [
    ["Name", quote.name],
    ["Email", quote.email],
    ["Phone", quote.phone],
    ["Property address", displayValue(quote.address)],
    ["Property type", quote.propertyType],
    ["Approximate square footage", displayValue(quote.sqft)],
    ["Buildings / units", quote.buildingsCount],
    ["Year built", displayValue(quote.yearBuilt)],
    ["Requested service / scope", quote.purpose],
    ["Timeline / desired inspection date", quote.desiredDate],
    ["Message / details", displayValue(quote.message)],
    ["Submitted timestamp", submittedAt],
    ["Source", SOURCE],
  ] as const;

  const text = [
    SUBJECT,
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding: 8px 12px; text-align: left; vertical-align: top; border-bottom: 1px solid #e5e7eb;">${escapeHtml(label)}</th>
          <td style="padding: 8px 12px; white-space: pre-wrap; border-bottom: 1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin: 0; padding: 24px; background: #f3f4f6; color: #111827; font-family: Arial, sans-serif;">
    <div style="max-width: 720px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #d1d5db;">
      <h1 style="margin: 0 0 20px; font-size: 22px;">${SUBJECT}</h1>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>${rows}
        </tbody>
      </table>
    </div>
  </body>
</html>`;

  return { subject: SUBJECT, text, html };
}

export async function sendCommercialQuoteEmail(
  quote: CommercialQuote,
  submittedAt: string,
  environment: NodeJS.ProcessEnv = process.env,
  fetchImplementation: Fetch = fetch
) {
  const apiKey = requireEnvironmentVariable("RESEND_API_KEY", environment);
  const to = requireEnvironmentVariable("COMMERCIAL_LEAD_TO", environment);
  const from = requireEnvironmentVariable("COMMERCIAL_LEAD_FROM", environment);
  const content = buildCommercialQuoteEmail(quote, submittedAt);

  const response = await fetchImplementation(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: quote.email,
      subject: content.subject,
      text: content.text,
      html: content.html,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Resend email request failed with status ${response.status}.`
    );
  }

  const result: unknown = await response.json();

  if (
    typeof result !== "object" ||
    result === null ||
    !("id" in result) ||
    typeof result.id !== "string"
  ) {
    throw new Error("Resend email request succeeded without an email ID.");
  }

  return { id: result.id };
}

export function createCommercialQuoteHandler(
  sendEmail: CommercialQuoteEmailSender = sendCommercialQuoteEmail
): RequestHandler {
  return async (req, res) => {
    const parsed = commercialQuoteSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Please complete the required quote fields before submitting.",
      });
      return;
    }

    const submittedAt = new Date().toISOString();

    try {
      const result = await sendEmail(parsed.data, submittedAt);

      console.info("Commercial quote notification sent", {
        submittedAt,
        resendEmailId: result.id,
      });

      res.status(202).json({
        message:
          "Your quote request was received by the website system. ProSpec will confirm availability after review.",
      });
    } catch (error) {
      console.error("Failed to send commercial quote notification", error);
      res.status(500).json({ message: SEND_FAILURE_MESSAGE });
    }
  };
}
