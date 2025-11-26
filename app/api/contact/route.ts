// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, location, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // 1️⃣ Email pour TOI (Black Jesus Records)
    const toLabel = resend.emails.send({
      from: "Black Jesus Records <onboarding@resend.dev>", // on changera ça en contact@blackjesusrecords.com après
      to: ["blackjesusrecords.inc@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande: ${service || "Général"} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fbbf24;">Nouvelle demande Black Jesus Records</h2>
          <div style="background: #0b1120; padding: 20px; border-radius: 8px; color: #e5e7eb;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone || "Non fourni"}</p>
            <p><strong>Service :</strong> ${service || "Non spécifié"}</p>
            <p><strong>Date souhaitée :</strong> ${date || "Non spécifiée"}</p>
            <p><strong>Lieu :</strong> ${location || "Non spécifié"}</p>
            <p><strong>Budget :</strong> ${budget || "Non spécifié"}</p>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
          </div>
        </div>
      `,
    });

    // 2️⃣ Email AUTOMATIQUE pour le CLIENT
    const toClient = resend.emails.send({
      from: "Black Jesus Records <onboarding@resend.dev>", // on changera ici aussi après
      to: [email],
      subject: "Nous avons bien reçu votre demande – Black Jesus Records",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fbbf24;">Merci ${name} ✨</h2>
          <p>Nous avons bien reçu votre message concernant : <strong>${service || "votre projet"}</strong>.</p>
          <p>Un membre de l'équipe <strong>Black Jesus Records</strong> va analyser votre demande et vous répondre rapidement.</p>
          <p style="margin-top: 12px;">Résumé :</p>
          <ul>
            <li><strong>Email :</strong> ${email}</li>
            ${
              phone
                ? `<li><strong>Téléphone :</strong> ${phone}</li>`
                : ""
            }
            ${
              date
                ? `<li><strong>Date souhaitée :</strong> ${date}</li>`
                : ""
            }
            ${
              location
                ? `<li><strong>Lieu :</strong> ${location}</li>`
                : ""
            }
            ${
              budget
                ? `<li><strong>Budget :</strong> ${budget}</li>`
                : ""
            }
          </ul>
          <p style="margin-top: 16px;">Message envoyé :</p>
          <p>${message.replace(/\n/g, "<br />")}</p>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Black Jesus Records – Studio créatif & label professionnel.
          </p>
        </div>
      `,
    });

    // On attend que les 2 emails soient envoyés
    const [labelResult, clientResult] = await Promise.all([toLabel, toClient]);

    return NextResponse.json({ success: true, labelResult, clientResult });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
