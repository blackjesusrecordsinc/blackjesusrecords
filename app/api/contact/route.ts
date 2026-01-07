import { NextResponse } from "next/server";
import { Resend } from "resend";
import pRetry from "p-retry";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  location?: string;
  budget?: string;
  message?: string;
  company?: string;
};

function escHtml(v: string) {
  return v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(v?: string) {
  return (v ?? "").toString().trim();
}

function safeLen(v: string | undefined, max: number) {
  const s = v ?? "";
  return s.length > max ? s.slice(0, max) : s;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function normalizePhone(v?: string) {
  const x = clean(v);
  return x ? x.replace(/[^\d+]/g, "") : "";
}

function getOrigin(req: Request) {
  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  return origin || (referer ? new URL(referer).origin : "");
}

function isAllowedOrigin(origin: string) {
  if (!origin) return true;

  const envList = clean(process.env.ALLOWED_ORIGINS);
  const allowed = envList
    ? envList.split(",").map((s) => s.trim()).filter(Boolean)
    : ["https://www.blackjesusrecords.ca", "https://blackjesusrecords.ca"];

  return allowed.includes(origin);
}

function buildInternalHtml(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  budget: string;
  message: string;
}) {
  const rows: Array<[string, string]> = [
    ["Nom", data.name],
    ["Email", data.email],
    ["Téléphone", data.phone || "—"],
    ["Service", data.service],
    ["Date", data.date],
    ["Lieu", data.location],
    ["Budget", data.budget],
  ];

  const table = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;width:160px">
          <strong>${escHtml(k)}</strong>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111">
          ${escHtml(v || "—")}
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f9;padding:24px">
    <div style="max-width:720px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
      <div style="padding:20px;background:#0b0b0e;color:#fff">
        <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#f5c518;font-weight:700">
          Black Jesus Records
        </div>
        <div style="margin-top:6px;font-size:22px;font-weight:700">
          Nouvelle demande entrante
        </div>
        <div style="margin-top:4px;font-size:13px;color:rgba(255,255,255,.65)">
          Service : ${escHtml(data.service)}
        </div>
      </div>

      <div style="padding:20px">
        <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden">
          ${table}
        </table>

        <div style="margin-top:20px">
          <div style="font-weight:700;margin-bottom:8px">Message</div>
          <div style="white-space:pre-line;background:#fafafa;border:1px solid #eee;border-radius:12px;padding:14px">
            ${escHtml(data.message)}
          </div>
        </div>

        <p style="margin-top:16px;font-size:12px;color:#666">
          Répondre directement à cet email pour contacter le client.
        </p>
      </div>
    </div>
  </div>`;
}

function buildClientHtml(name: string) {
  const safeName = name && name !== "Non renseigné" ? name : "bonjour";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f9;padding:24px">
    <div style="max-width:720px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
      <div style="padding:20px;background:#0b0b0e;color:#fff">
        <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#f5c518;font-weight:700">
          Black Jesus Records
        </div>
        <div style="margin-top:6px;font-size:22px;font-weight:700">
          Demande bien reçue
        </div>
      </div>

      <div style="padding:20px;color:#111">
        <p>Bonjour ${escHtml(safeName)},</p>

        <p>Merci d’avoir contacté <strong>Black Jesus Records</strong>.</p>

        <p>
          Chaque projet est étudié avec rigueur afin de garantir une réponse claire,
          structurée et alignée avec vos objectifs.
        </p>

        <div style="margin:16px 0;padding:14px;border:1px solid #eee;border-radius:12px;background:#fafafa">
          <strong>Délai de réponse :</strong> 24 à 48h (jours ouvrables)
        </div>

        <p style="margin-top:18px">
          —<br/>
          <strong>Black Jesus Records</strong><br/>
          Direction artistique · Production · Stratégie
        </p>

        <p style="margin-top:14px;font-size:12px;color:#666">
          Pour une demande urgente, répondez à ce courriel avec “URGENT” dans l’objet.
        </p>
      </div>
    </div>
  </div>`;
}

function isTransientResendError(err: any) {
  const msg = String(err?.message || "");
  const status = err?.statusCode ?? err?.status ?? err?.code;

  if (status === 429) return true;
  if (typeof status === "number" && status >= 500) return true;

  const m = msg.toLowerCase();
  if (
    msg.includes("ECONNRESET") ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("EAI_AGAIN") ||
    msg.includes("fetch failed") ||
    m.includes("network")
  ) {
    return true;
  }

  return false;
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

type ResendSendInput = Parameters<Resend["emails"]["send"]>[0];

async function resendSend(resend: Resend, input: ResendSendInput) {
  return pRetry(
    async () => {
      const out = await resend.emails.send(input);
      const anyOut = out as any;

      if (anyOut?.error) {
        const e = anyOut.error;
        const statusCode = e?.statusCode ?? e?.status;

        const err = Object.assign(new Error(e?.message || "Resend error"), {
          statusCode,
        });

        throw err;
      }

      return out;
    },
    {
      retries: 2,
      minTimeout: 300,
      maxTimeout: 1500,
      shouldRetry: (err) => isTransientResendError(err),
      onFailedAttempt: (e) => {
        const msg =
          (e as any)?.error?.message || String((e as any)?.error || "");

        console.warn(
          `[resend] tentative ${e.attemptNumber} échouée — reste ${e.retriesLeft}`,
          msg
        );
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Configuration serveur manquante : RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: "Configuration serveur manquante : RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const origin = getOrigin(req);
    if (!isAllowedOrigin(origin)) {
      return NextResponse.json(
        { error: "Origin non autorisée." },
        { status: 403 }
      );
    }

    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return NextResponse.json({ error: "Payload invalide." }, { status: 400 });
    }

    if (clean(body.company)) {
      return NextResponse.json({ success: true });
    }

    const name = safeLen(clean(body.name) || "Non renseigné", 80);
    const email = safeLen(clean(body.email).toLowerCase(), 120);
    const phone = safeLen(normalizePhone(body.phone), 40);
    const service = safeLen(clean(body.service) || "Non spécifié", 80);
    const date = safeLen(clean(body.date) || "—", 40);
    const location = safeLen(clean(body.location) || "—", 120);
    const budget = safeLen(clean(body.budget) || "—", 80);
    const message = safeLen(clean(body.message), 5000);

    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Message trop court." }, { status: 400 });
    }

    const internalFrom =
      process.env.RESEND_FROM_INTERNAL ||
      "Black Jesus Records <no-reply@blackjesusrecords.ca>";

    const internalTo =
      process.env.CONTACT_TO_EMAIL || "contact@blackjesusrecords.ca";

    const clientFrom =
      process.env.RESEND_FROM_CLIENT ||
      "Black Jesus Records <no-reply@blackjesusrecords.ca>";

    const internal = await resendSend(resend, {
      from: internalFrom,
      to: [internalTo],
      replyTo: `${name} <${email}>`,
      subject: `Nouvelle demande — ${service}`,
      html: buildInternalHtml({
        name,
        email,
        phone,
        service,
        date,
        location,
        budget,
        message,
      }),
    });

    const client = await resendSend(resend, {
      from: clientFrom,
      to: [email],
      replyTo: internalTo,
      subject: "Demande reçue — Black Jesus Records",
      html: buildClientHtml(name),
    });

    const internalId = (internal as any)?.data?.id || (internal as any)?.id;
    const clientId = (client as any)?.data?.id || (client as any)?.id;

    console.log("CONTACT OK:", { internalId, clientId, service, email });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("CONTACT API ERROR:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
