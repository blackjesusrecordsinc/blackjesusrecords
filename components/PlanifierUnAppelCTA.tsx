"use client";

import { useEffect } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/contact-blackjesusrecords/30min";


export default function PlanifierUnAppelCTA({
  className,
  label = "Planifier un appel",
}: {
  className?: string;
  label?: string;
}) {
  useEffect(() => {
    const id = "calendly-widget-js";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <a
      href={CALENDLY_URL}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (window.Calendly?.initPopupWidget) {
          window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
          // fallback: ouvre le lien
          window.location.href = CALENDLY_URL;
        }
      }}
      aria-label="Planifier un appel (Calendly)"
    >
      {label}
    </a>
  );
}
