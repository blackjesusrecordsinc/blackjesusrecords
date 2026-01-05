"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Props =
  | {
      label: string;
      sub?: string;
      href: string;
      onClick?: never;
      className?: string;
      target?: string;
      rel?: string;
      variant?: "primary" | "outline";
    }
  | {
      label: string;
      sub?: string;
      href?: never;
      onClick: () => void;
      className?: string;
      target?: never;
      rel?: never;
      variant?: "primary" | "outline";
    };

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function AnimatedCTA({
  label,
  sub,
  href,
  onClick,
  className,
  target,
  rel,
  variant = "primary",
}: Props) {
  const base =
    "group relative w-full overflow-hidden rounded-2xl px-6 py-4 sm:px-7 sm:py-5 text-left transition " +
    "border backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.30)]";

  const primary =
    "border-yellow-400/35 bg-yellow-400/15 hover:bg-yellow-400/18 " +
    "ring-1 ring-yellow-400/10";

  const outline =
    "border-white/15 bg-black/25 hover:border-yellow-400/35 hover:bg-black/30";

  const topLine =
    variant === "primary"
      ? "text-white font-extrabold tracking-tight"
      : "text-white font-bold tracking-tight";

  const subLine =
    variant === "primary"
      ? "text-white/70"
      : "text-white/65";

  const content = (
    <div className="relative z-10 flex items-center justify-between gap-6">
      <div className="min-w-0">
        <div className={cn("text-base sm:text-lg leading-tight", topLine)}>
          {label}
        </div>
        {sub ? (
          <div className={cn("mt-1 text-xs sm:text-sm leading-snug", subLine)}>
            {sub}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 text-white/70 group-hover:text-yellow-200 transition">
        <span className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm">
          ↗
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* shimmer OR (subtil) */}
      {variant === "primary" ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "linear-gradient(110deg, rgba(245,197,66,0) 0%, rgba(245,197,66,0.18) 35%, rgba(255,255,255,0.10) 50%, rgba(245,197,66,0.18) 65%, rgba(245,197,66,0) 100%)",
            backgroundSize: "220% 100%",
          }}
          animate={{ backgroundPositionX: ["0%", "220%"] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        // contour artistique animé (pas plein jaune)
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-[2px] rounded-[18px] opacity-[0.95]"
          style={{
            background:
              "conic-gradient(from 180deg, rgba(245,197,66,0.0), rgba(245,197,66,0.55), rgba(255,255,255,0.10), rgba(245,197,66,0.55), rgba(245,197,66,0.0))",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* masque pour garder l’effet en bordure */}
      {variant === "outline" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[1px] rounded-2xl bg-black/30 backdrop-blur-md"
        />
      ) : null}

      {href ? (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={cn(base, variant === "primary" ? primary : outline, className)}
          aria-label={label}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={cn(base, variant === "primary" ? primary : outline, className)}
          aria-label={label}
        >
          {content}
        </button>
      )}
    </>
  );
}
