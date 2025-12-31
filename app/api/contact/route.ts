// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

type Payload = {
  kind?: "call" | "project";
  name?: string;
  email?: string;
  phone?: string;
  availability?: string;
  message?: string;
  company?: string; // honeypot
};

function clean(v?: string) {
  return (v ?? "").toString().trim();
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

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

    if (!email || !isEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (kind === "call" && !availability) {
      return NextResponse.json({ error: "Disponibilités requises" }, { status: 400 });
    }

    if (kind === "project" && message.length < 15) {
      return NextResponse.json({ error: "Message trop court" }, { status: 400 });
    }

    const subject =
      kind === "call"
        ? "Nouvelle demande — Appel"
        : "Nouvelle demande — Projet";

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
      reply_to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
