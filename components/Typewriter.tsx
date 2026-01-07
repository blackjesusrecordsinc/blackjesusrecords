"use client";

import { useEffect, useMemo, useState } from "react";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Typewriter({
  phrases,
  typingMs = 22,
  holdMs = 1200,
  className = "",
  accentWords = [],
  accentClassName = "",
}: {
  phrases: string[];
  typingMs?: number;
  holdMs?: number;
  className?: string;
  accentWords?: string[];
  accentClassName?: string;
}) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = phrases[phraseIdx] ?? "";

  useEffect(() => {
    const isDoneTyping = subIdx >= current.length;
    const isDoneDeleting = subIdx <= 0;

    let t: number;

    if (!deleting && isDoneTyping) {
      t = window.setTimeout(() => setDeleting(true), holdMs);
      return () => window.clearTimeout(t);
    }

    if (deleting && isDoneDeleting) {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
      return;
    }

    t = window.setTimeout(() => {
      setSubIdx((v) => v + (deleting ? -1 : 1));
    }, deleting ? Math.max(typingMs * 0.6, 12) : typingMs);

    return () => window.clearTimeout(t);
  }, [current.length, deleting, holdMs, phrases.length, subIdx, typingMs]);

  const shown = useMemo(() => current.slice(0, subIdx), [current, subIdx]);

  const parts = useMemo(() => {
    if (!accentWords.length) return [{ text: shown, accent: false }];

    const pattern = new RegExp(`\\b(${accentWords.map(escapeRegExp).join("|")})\\b`, "gi");
    const out: { text: string; accent: boolean }[] = [];

    let lastIndex = 0;
    for (const m of shown.matchAll(pattern)) {
      const idx = m.index ?? 0;
      if (idx > lastIndex) out.push({ text: shown.slice(lastIndex, idx), accent: false });
      out.push({ text: m[0], accent: true });
      lastIndex = idx + m[0].length;
    }
    if (lastIndex < shown.length) out.push({ text: shown.slice(lastIndex), accent: false });
    return out.length ? out : [{ text: shown, accent: false }];
  }, [accentWords, shown]);

  return (
    <span className={className}>
      {parts.map((p, i) => (
        <span key={i} className={p.accent ? accentClassName : ""}>
          {p.text}
        </span>
      ))}
      <span className="inline-block w-[10px] translate-y-[2px] animate-pulse text-white/70">|</span>
    </span>
  );
}
