"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget?: (opts: { url: string }) => void;
    };
  }
}

export default function CalendlyScript() {
  useEffect(() => {
    const id = "calendly-widget-js";

    // Déjà présent
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return null;
}
