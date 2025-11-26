import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, service, date, location, budget } = body;

    // ✅ 1. Email envoyé à toi (Black Jesus Records)
    await resend.emails.send({
      from: "Black Jesus Records <onboarding@resend.dev>",
      to: ["blackjesusrecords.inc@gmail.com"],
      subject: `Nouvelle demande : ${service || "Message"}`,
      html: `
        <h2>Nouvelle demande Black Jesus Records</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> Non fourni</p>
        <p><strong>Service :</strong> ${service || "Non spécifié"}</p>
        <p><strong>Date souhaitée :</strong> ${date || "Non spécifiée"}</p>
        <p><strong>Lieu :</strong> ${location || "Non spécifié"}</p>
        <p><strong>Budget :</strong> ${budget || "Non spécifié"}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    });

    // ✅ 2. AUTO-RÉPONSE POUR LE CLIENT
    await resend.emails.send({
      from: "Black Jesus Records <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de réception – Black Jesus Records",
      html: `
        <p>Bonjour ${name || ""},</p>
        <p>Nous vous remercions pour votre message et l’intérêt porté à Black Jesus Records.</p>
        <p>Votre demande a bien été reçue par notre équipe. Elle sera analysée avec attention et nous vous reviendrons dans un délai maximal de 24 à 48 heures.</p>
        <p>Si votre demande est urgente, vous pouvez répondre directement à ce courriel.</p>
        <br/>
        <p>Cordialement,</p>
        <p><strong>Service Client</strong><br/>Black Jesus Records</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
