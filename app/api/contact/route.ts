// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
<<<<<<< HEAD
const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  kind?: "call" | "project";
=======
export const dynamic = "force-dynamic"; // évite caches edge bizarres

const resend = new Resend(process.env.RESEND_API_KEY);

/* ============================
   TYPES
============================ */
type ContactPayload = {
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  name?: string;
  email?: string;
  phone?: string;
  availability?: string;
  message?: string;
  company?: string; // honeypot
};

<<<<<<< HEAD
function clean(v?: string) {
  return (v ?? "").toString().trim();
}
=======
/* ============================
   UTILS
============================ */
function json(status: number, data: Record<string, unknown>) {
  return NextResponse.json(data, { status });
}

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

function safeLen(v: string, max: number) {
  return v.length > max ? v.slice(0, max) : v;
}

>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v.trim());
}

<<<<<<< HEAD
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (body.company) return NextResponse.json({ success: true });

    const kind = body.kind ?? "project";
    const name = clean(body.name) || "—";
    const email = clean(body.email);
    const phone = clean(body.phone);
    const availability = clean(body.availability);
    const message = clean(body.message);
=======
function normalizePhone(v?: string) {
  const x = clean(v);
  return x ? x.replace(/[^\d+]/g, "") : "";
}

function getOrigin(req: Request) {
  const origin = req.headers.get("origin") || "";
  const referer = req.headers.get("referer") || "";
  try {
    return origin || (referer ? new URL(referer).origin : "");
  } catch {
    return origin || "";
  }
}

function isAllowedOrigin(origin: string) {
  if (!origin) return true; // tolérant : certains fetch n’envoient pas origin/referer
  const allowed = new Set([
    "https://www.blackjesusrecords.ca",
    "https://blackjesusrecords.ca",
  ]);
  return allowed.has(origin);
}

function shouldRetry(err: unknown) {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  // retry réseau/tempo/5xx probables
  return (
    msg.includes("timeout") ||
    msg.includes("timed out") ||
    msg.includes("fetch") ||
    msg.includes("socket") ||
    msg.includes("econnreset") ||
    msg.includes("eai_again") ||
    msg.includes("429") ||
    msg.includes("5") // garde-fou simple
  );
}

/* ============================
   EMAIL TEMPLATES
============================ */
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
        </tr>
      `
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

/* ============================
   RESEND SEND (WITH RETRY)
============================ */
async function sendEmail(input: Parameters<typeof resend.emails.send>[0]) {
  return pRetry(
    async () => {
      const out = await resend.emails.send(input);
      const anyOut = out as any;

      // Le SDK renvoie souvent { data, error }
      if (anyOut?.error) {
        const msg = anyOut.error?.message || "Resend error";
        // marque l’erreur pour retry
        throw new Error(msg);
      }

      return out;
    },
    {
      retries: 2,
      minTimeout: 250,
      maxTimeout: 1500,
      randomize: true,
      onFailedAttempt: (err) => {
        // si ça ne mérite pas retry : stop
        if (!shouldRetry(err)) throw err;
      },
    }
  );
}

/* ============================
   HANDLER
============================ */
export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return json(500, { error: "Configuration serveur manquante." });
    }

    const origin = getOrigin(req);
    if (!isAllowedOrigin(origin)) {
      return json(403, { error: "Origin non autorisée." });
    }

    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return json(400, { error: "Payload invalide." });
    }

    // Honeypot anti-bot (silencieux)
    if (clean(body.company)) {
      return json(200, { success: true });
    }

    // Normalisation + limites
    const name = safeLen(clean(body.name) || "Non renseigné", 80);
    const email = safeLen(clean(body.email).toLowerCase(), 120);
    const phone = safeLen(normalizePhone(body.phone), 40);
    const service = safeLen(clean(body.service) || "Non spécifié", 80);
    const date = safeLen(clean(body.date) || "—", 40);
    const location = safeLen(clean(body.location) || "—", 120);
    const budget = safeLen(clean(body.budget) || "—", 80);
    const message = safeLen(clean(body.message), 5000);
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013

    // Validation
    if (!email || !isEmail(email)) {
<<<<<<< HEAD
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (kind === "call" && !availability) {
      return NextResponse.json({ error: "Disponibilités requises" }, { status: 400 });
    }
=======
      return json(400, { error: "Email invalide." });
    }
    if (!message || message.length < 10) {
      return json(400, { error: "Message trop court." });
    }

    // ENV recommandés (mets-les dans Vercel)
    // RESEND_FROM_INTERNAL="Black Jesus Records <no-reply@blackjesusrecords.ca>"
    // RESEND_FROM_CLIENT="Black Jesus Records <contact@blackjesusrecords.ca>"
    // CONTACT_TO_EMAIL="blackjesusrecords.inc@gmail.com"
    const internalFrom =
      process.env.RESEND_FROM_INTERNAL || "Black Jesus Records <no-reply@blackjesusrecords.ca>";
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013

    if (kind === "project" && message.length < 15) {
      return NextResponse.json({ error: "Message trop court" }, { status: 400 });
    }

    const subject =
      kind === "call"
        ? "Nouvelle demande — Appel"
        : "Nouvelle demande — Projet";

<<<<<<< HEAD
    const html = `
      <strong>Type :</strong> ${kind}<br/>
      <strong>Nom :</strong> ${name}<br/>
      <strong>Email :</strong> ${email}<br/>
      <strong>Téléphone :</strong> ${phone || "—"}<br/>
      ${
        kind === "call"
          ? `<strong>Disponibilités :</strong><br/>${availability}`
          : `<strong>Message :</strong><br/>${message}`
      }
    `;

    await resend.emails.send({
      from: "Black Jesus Records <no-reply@blackjesusrecords.ca>",
      to: ["blackjesusrecords.inc@gmail.com"],
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
=======
    // 1) Email interne (avec reply_to)
    const internal = await sendEmail({
      from: internalFrom,
      to: [internalTo],
      reply_to: email,
      subject: `Nouvelle demande — ${service}`,
      html: buildInternalHtml({ name, email, phone, service, date, location, budget, message }),
      headers: {
        "X-Entity-Ref-ID": `contact-${Date.now()}`,
      },
      tags: [{ name: "source", value: "website" }],
    } as any);

    // 2) Auto-réponse client
    const client = await sendEmail({
      from: clientFrom,
      to: [email],
      subject: "Demande reçue — Black Jesus Records",
      html: buildClientHtml(name),
      tags: [{ name: "type", value: "auto-reply" }],
    } as any);

    const internalId = (internal as any)?.data?.id || (internal as any)?.id;
    const clientId = (client as any)?.data?.id || (client as any)?.id;

    console.log("CONTACT OK:", { internalId, clientId, service, email });

    return json(200, { success: true });
  } catch (err: any) {
    console.error("CONTACT API ERROR:", err);
    return json(500, { error: "Erreur serveur." });
>>>>>>> 518badd5fecd99f81b293159e5d7ee8767b37013
  }
}
