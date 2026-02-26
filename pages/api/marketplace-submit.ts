import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

type SelectedItem = {
  title: string;
  description: string;
  file: string;
  tag: string;
};

type SubmissionPayload = {
  name: string;
  totalOffer: number;
  selectedItems: SelectedItem[];
  selectedCount: number;
  skippedCount: number;
  totalProducts: number;
  submittedAt: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidPayload = (payload: SubmissionPayload) => {
  if (!payload.name?.trim()) {
    return false;
  }

  if (!Number.isFinite(payload.totalOffer) || payload.totalOffer < 0 || payload.totalOffer > 80) {
    return false;
  }

  if (!Array.isArray(payload.selectedItems) || payload.selectedItems.length === 0) {
    return false;
  }

  return payload.selectedItems.every((item) => item.title && item.description && item.file && item.tag);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.MARKETPLACE_TO_EMAIL ?? "david.juanherrera@gmail.com";
  const fromEmail = process.env.MARKETPLACE_FROM_EMAIL ?? "Marketplace <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable." });
  }

  const payload = req.body as SubmissionPayload;
  if (!isValidPayload(payload)) {
    return res.status(400).json({ error: "Invalid submission payload." });
  }

  const resend = new Resend(apiKey);
  const submittedDate = new Date(payload.submittedAt);
  const validDate = Number.isNaN(submittedDate.getTime()) ? new Date() : submittedDate;

  const plainTextItems = payload.selectedItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.title} [${item.tag}]\n` +
        `Description: ${item.description}\n` +
        `Image file: ${item.file}`
    )
    .join("\n\n");

  const htmlItems = payload.selectedItems
    .map(
      (item, index) =>
        `<li style="margin-bottom:14px;">
          <strong>${index + 1}. ${escapeHtml(item.title)}</strong> <span style="color:#155e75;">[${escapeHtml(item.tag)}]</span><br />
          <span>${escapeHtml(item.description)}</span><br />
          <span style="color:#475569;">File: ${escapeHtml(item.file)}</span>
        </li>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Marketplace offer from ${payload.name} (€${payload.totalOffer})`,
      text:
        `Marketplace offer submission\n\n` +
        `Name: ${payload.name}\n` +
        `Total Offer: €${payload.totalOffer}\n` +
        `Selected: ${payload.selectedCount}/${payload.totalProducts}\n` +
        `Skipped: ${payload.skippedCount}\n` +
        `Submitted At: ${validDate.toISOString()}\n\n` +
        `Selected Products:\n${plainTextItems}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;line-height:1.5;color:#0f172a;">
          <h2 style="margin:0 0 12px;color:#0f172a;">New Marketplace Offer</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p style="margin:0 0 6px;"><strong>Total Offer:</strong> €${payload.totalOffer}</p>
          <p style="margin:0 0 6px;"><strong>Selected:</strong> ${payload.selectedCount}/${payload.totalProducts}</p>
          <p style="margin:0 0 14px;"><strong>Skipped:</strong> ${payload.skippedCount}</p>
          <p style="margin:0 0 14px;"><strong>Submitted At:</strong> ${escapeHtml(validDate.toISOString())}</p>
          <h3 style="margin:0 0 8px;color:#0f172a;">Selected Products</h3>
          <ol style="padding-left:20px;margin:0;">
            ${htmlItems}
          </ol>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: `Email sending failed: ${message}` });
  }
}
