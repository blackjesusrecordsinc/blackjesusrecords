"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  url: string;
  text: string;
  className?: string;
  title?: string;
  targetBlankFallback?: boolean;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget?: (opts: { url: string }) => void;
    };
  }
}

export default function CalendlyPopupLink({
  url,
  text,
  className,
  title = "Planifier un appel",
  targetBlankFallback = true,
}: Props) {
  const [ready, setReady] = useState(false);
  const safeUrl = useMemo(() => url.trim(), [url]);

  useEffect(() => {
    const markReady = () => {
      if (window.Calendly?.initPopupWidget) setReady(true);
    };

    // Si Calendly est déjà prêt
    markReady();

    // Filet de sécurité : si jamais le script n’est pas là (dev/preview)
    const id = "calendly-widget-js";
    let script = document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", markReady);
    const t = window.setTimeout(markReady, 350);

    return () => {
      script?.removeEventListener("load", markReady);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <a
      href={safeUrl}
      className={className}
      title={title}
      aria-label={title}
      onClick={(e) => {
        if (ready && window.Calendly?.initPopupWidget) {
          e.preventDefault();
          window.Calendly.initPopupWidget({ url: safeUrl });
          return;
        }

        // fallback: garder l’accès à Calendly
        if (targetBlankFallback) {
          e.preventDefault();
          window.open(safeUrl, "_blank", "noopener,noreferrer");
        }
        // sinon navigation normale (pas de preventDefault)
      }}
    >
      {text}
    </a>
  );
}
