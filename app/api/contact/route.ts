import { NextResponse } from "next/server";
import { Resend } from "resend";

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
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const {
      name = "Non renseigné",
      email,
      phone = "Non renseigné",
      service = "Non spécifié",
      date = "Non spécifiée",
      location = "Non spécifié",
      budget = "Non spécifié",
      message = "",
    } = body;

    /* ============================
       VALIDATION SERVEUR (MIN)
    ============================ */
    if (!email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    /* ============================
       EMAIL INTERNE (TOI)
    ============================ */
    await resend.emails.send({
      from: "Black Jesus Records <no-reply@blackjesusrecords.ca>",
      to: ["blackjesusrecords.inc@gmail.com"],
      subject: `Nouvelle demande — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
          <h2>Nouvelle demande – Black Jesus Records</h2>
          <hr/>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Service :</strong> ${service}</p>
          <p><strong>Date souhaitée :</strong> ${date}</p>
          <p><strong>Lieu :</strong> ${location}</p>
          <p><strong>Budget :</strong> ${budget}</p>
          <hr/>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-line">${message}</p>
        </div>
      `,
    });

    /* ============================
       EMAIL CLIENT (AUTO-RÉPONSE)
    ============================ */
    await resend.emails.send({
      from: "Black Jesus Records <contact@blackjesusrecords.ca>",
      to: [email],
      subject: "Confirmation de réception — Black Jesus Records",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
          <p>Bonjour ${name},</p>

          <p>
            Merci pour votre message et l’intérêt porté à
            <strong>Black Jesus Records</strong>.
          </p>

          <p>
            Votre demande a bien été reçue. Nous analysons chaque projet avec attention
            afin de proposer une réponse claire, réaliste et adaptée.
          </p>

          <p>
            Vous recevrez un retour de notre part dans un délai de
            <strong>24 à 48 heures</strong>.
          </p>

          <p style="margin-top:24px">
            Cordialement,<br/>
            <strong>Black Jesus Records</strong><br/>
            Studio créatif & label
          </p>

          <hr style="margin:24px 0"/>

          <p style="font-size:12px;color:#666">
            Si votre demande est urgente, vous pouvez répondre directement à ce courriel.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
