import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { del } from "@vercel/blob";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, subject, message, blobUrl } = await req.json();

    // Серверная валидация (минимум)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });

    let attachments: Array<{ filename: string; content: string; mimetype: string }> = [];

    if (blobUrl) {
      // 1) Скачиваем файл из Blob
      const resp = await fetch(blobUrl);
      if (!resp.ok) return NextResponse.json({ error: "Не удалось скачать PDF" }, { status: 400 });

      const buf = Buffer.from(await resp.arrayBuffer());

      // (опционально) ограничим размер вложения
      if (buf.byteLength > 25 * 1024 * 1024) {
        // Лучше в таком случае НЕ прикладывать, а оставить ссылку в письме
        return NextResponse.json({ error: "PDF слишком большой для письма" }, { status: 400 });
      }

      attachments = [{
        filename: "attachment.pdf",
        content: buf.toString("base64"),
        mimetype: "application/pdf",
      }];
    }

    // 2) Отправляем письмо
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: [process.env.CONTACT_TO_EMAIL_MEYER!, process.env.CONTACT_TO_EMAIL_DENIS!],
      subject: `[7995 Submission] ${subject || "(без темы)"}`,
      html: `
        <div>
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Company:</b> ${escapeHtml(company || "")}</p>
          <p><b>Message:</b></p>
          <pre style="white-space:pre-wrap">${escapeHtml(message || "")}</pre>
          ${blobUrl ? `<p><b>File source (deleted after sending):</b> ${blobUrl}</p>` : ""}
        </div>`,
      attachments,
      replyTo: email,
    });

    // 3) Удаляем файл из Blob (если был)
    if (blobUrl) await del(blobUrl);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
