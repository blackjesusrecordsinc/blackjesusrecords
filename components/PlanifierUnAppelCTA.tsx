"use client";

import { useCallback } from "react";

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
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // ✅ Popup only si dispo
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return;
      }

      // fallback
      window.location.href = CALENDLY_URL;
    },
    []
  );

  return (
    <a
      href={CALENDLY_URL}
      className={className}
      onClick={onClick}
      aria-label="Planifier un appel (Calendly)"
      rel="nofollow"
    >
      {label}
    </a>
  );
}
