// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  location?: string;
  budget?: string;
  message?: string;

  // honeypot (anti-bot) — champ caché côté front
  company?: string;
};

function escHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(input?: string) {
  return (input ?? "").toString().trim();
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function normalizePhone(v: string) {
  const x = clean(v);
  if (!x) return "";
  return x.replace(/[^\d+]/g, "");
}

function safeLen(v: string, max: number) {
  return v.length > max ? v.slice(0, max) : v;
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
    ["Téléphone", data.phone || "Non renseigné"],
    ["Service", data.service],
    ["Date souhaitée", data.date],
    ["Lieu", data.location],
    ["Budget", data.budget],
  ];

  const tableRows = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666;width:180px;">
            <strong>${escHtml(k)}</strong>
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#111;">
            ${escHtml(v || "—")}
          </td>
        </tr>
      `
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;background:#f6f7f9;padding:24px">
    <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
      <div style="padding:18px 20px;background:#0b0b0e;color:#fff">
        <div style="font-weight:700;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:#f5c518">
          Black Jesus Records
        </div>
        <div style="margin-top:6px;font-size:22px;font-weight:700">
          Nouvelle demande — ${escHtml(data.service)}
        </div>
        <div style="margin-top:4px;color:rgba(255,255,255,.72);font-size:13px">
          Reçue depuis le formulaire (Contact / Booking)
        </div>
      </div>

      <div style="padding:18px 20px">
        <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden">
          ${tableRows}
        </table>

        <div style="margin-top:18px;border-top:1px solid #eee;padding-top:14px">
          <div style="font-weight:700;margin-bottom:8px">Message</div>
          <div style="white-space:pre-line;background:#fafafa;border:1px solid #eee;border-radius:12px;padding:14px">
            ${escHtml(data.message)}
          </div>
        </div>

        <div style="margin-top:16px;color:#666;font-size:12px">
          Astuce : réponds à cet email pour contacter le client rapidement.
        </div>
      </div>
    </div>
  </div>
  `;
}

function buildClientHtml(name: string) {
  const safeName = name && name !== "Non renseigné" ? name : "bonjour";
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;background:#f6f7f9;padding:24px">
    <div style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
      <div style="padding:18px 20px;background:#0b0b0e;color:#fff">
        <div style="font-weight:700;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:#f5c518">
          Black Jesus Records
        </div>
        <div style="margin-top:6px;font-size:22px;font-weight:700">
          Confirmation de réception
        </div>
        <div style="margin-top:4px;color:rgba(255,255,255,.72);font-size:13px">
          On a bien reçu ta demande.
        </div>
      </div>

      <div style="padding:18px 20px">
        <p>Bonjour ${escHtml(safeName)},</p>

        <p>
          Merci pour ton message et l’intérêt porté à <strong>Black Jesus Records</strong>.
        </p>

        <p>
          Ta demande a bien été reçue. On analyse chaque projet avec attention afin de répondre avec
          une proposition claire : scope, délais, livrables.
        </p>

        <div style="margin:14px 0;padding:14px;border:1px solid #eee;border-radius:12px;background:#fafafa">
          <strong>Délais de réponse :</strong> 24 à 48h (jours ouvrables).
        </div>

        <p style="margin-top:18px">
          Cordialement,<br/>
          <strong>Black Jesus Records</strong><br/>
          Studio créatif & label
        </p>

        <hr style="margin:18px 0;border:none;border-top:1px solid #eee"/>

        <p style="font-size:12px;color:#666;margin:0">
          Si c’est urgent, réponds directement à ce courriel avec “URGENT” dans l’objet.
        </p>
      </div>
    </div>
  </div>
  `;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Configuration serveur manquante." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as ContactPayload;

    // ✅ Honeypot anti-bot
    const honeypot = clean(body.company);
    if (honeypot) return NextResponse.json({ success: true });

    // ✅ Normalize + clamp
    const name = safeLen(clean(body.name) || "Non renseigné", 80);
    const email = safeLen(clean(body.email).toLowerCase(), 120);
    const phone = safeLen(normalizePhone(body.phone), 40);
    const service = safeLen(clean(body.service) || "Non spécifié", 80);
    const date = safeLen(clean(body.date) || "Non spécifiée", 40);
    const location = safeLen(clean(body.location) || "Non spécifié", 120);
    const budget = safeLen(clean(body.budget) || "Non spécifié", 80);
    const message = safeLen(clean(body.message), 5000);

    // ✅ Validations
    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message trop court (min. 10 caractères)." },
        { status: 400 }
      );
    }

    // ✅ Configurable via env
    const internalFrom =
      process.env.RESEND_FROM_INTERNAL ||
      "Black Jesus Records <no-reply@blackjesusrecords.ca>";
    const clientFrom =
      process.env.RESEND_FROM_CLIENT ||
      "Black Jesus Records <contact@blackjesusrecords.ca>";
    const internalTo =
      process.env.CONTACT_TO_EMAIL || "blackjesusrecords.inc@gmail.com";

    // 1) Email interne (Reply-To = client)
    const internal = await resend.emails.send({
      from: internalFrom,
      to: [internalTo],
      replyTo: email, // si TS refuse: update resend ou remplace par reply_to
      subject: `Nouvelle demande — ${service}`,
      html: buildInternalHtml({
        name,
        email,
        phone: phone || "Non renseigné",
        service,
        date,
        location,
        budget,
        message,
      }),
    });

    if (internal.error) {
      console.error("RESEND INTERNAL ERROR:", internal.error);
      return NextResponse.json(
        { error: "Erreur email (interne)." },
        { status: 500 }
      );
    }

    // 2) Auto-réponse client ✅ (VIRGULE CORRIGÉE ICI)
    const client = await resend.emails.send({
      from: clientFrom, // ✅ virgule obligatoire
      to: [email],
      subject: "Confirmation de réception — Black Jesus Records",
      html: buildClientHtml(name),
    });

    if (client.error) {
      console.error("RESEND CLIENT ERROR:", client.error);
      return NextResponse.json(
        { error: "Erreur email (client)." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
