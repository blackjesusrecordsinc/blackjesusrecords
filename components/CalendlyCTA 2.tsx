"use client";

import React, { useCallback, useMemo, useState } from "react";

const DEFAULT_URL = "https://calendly.com/contact-blackjesusrecords/30min";
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || DEFAULT_URL;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget?: (opts: { url: string }) => void;
    };
  }
}

function openFallback(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function useCalendly() {
  const url = useMemo(() => CALENDLY_URL, []);

  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const tryOpen = () => {
      const fn = window.Calendly?.initPopupWidget;
      if (typeof fn === "function") {
        fn({ url });
        return true;
      }
      return false;
    };

    // 1) tentative immédiate
    if (tryOpen()) return;

    // 2) micro-retry (script vient peut-être juste de finir de charger)
    window.setTimeout(() => {
      if (!tryOpen()) openFallback(url);
    }, 250);
  }, [url]);

  return { openCalendly, CALENDLY_URL: url };
}

export default function CalendlyCTA({
  className,
  children = "Planifier un appel",
  ariaLabel = "Planifier un appel (Calendly)",
  disabled,
}: {
  className: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  const { openCalendly } = useCalendly();
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(() => {
    if (disabled || busy) return;
    setBusy(true);
    try {
      openCalendly();
    } finally {
      window.setTimeout(() => setBusy(false), 400);
    }
  }, [busy, disabled, openCalendly]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      aria-busy={busy}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
