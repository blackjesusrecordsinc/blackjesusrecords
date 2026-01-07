"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type CTA = { href: string; label: string; variant?: "primary" | "secondary" };

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const UI = {
  pill:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20",
  card:
    "rounded-2xl border border-white/10 bg-white/5 p-6 " +
    "shadow-[0_18px_50px_rgba(0,0,0,0.25)] hover:border-yellow-400/35 transition",
  btnPrimary:
    "group relative px-7 py-3 rounded-lg bg-yellow-400 text-black font-semibold " +
    "overflow-hidden transition hover:scale-[1.02] active:scale-95",
  btnPrimaryGlow:
    "absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity",
  btnSecondary:
    "px-7 py-3 rounded-lg border border-white/20 text-white font-medium hover:border-yellow-400 hover:text-yellow-400 transition",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
};

export default function PageShell({
  eyebrow,
  title,
  highlight,
  subtitle,
  ctas,
  children,
  bottomTitle,
  bottomText,
  bottomCtas,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  ctas?: CTA[];
  children: React.ReactNode;
  bottomTitle?: string;
  bottomText?: string;
  bottomCtas?: CTA[];
}) {
  return (
    <main className="min-h-screen">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item} className={UI.pill}>
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-yellow-400">{eyebrow}</span>
          </motion.div>

          <motion.div variants={item}>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              {title}{" "}
              {highlight ? (
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                    {highlight}
                  </span>
                  <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-yellow-400/10 blur-xl opacity-70" />
                </span>
              ) : null}
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl">
            {subtitle}
          </motion.p>

          {ctas?.length ? (
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 pt-2">
              {ctas.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={c.variant === "secondary" ? UI.btnSecondary : UI.btnPrimary}
                >
                  {c.variant === "secondary" ? null : <span className={UI.btnPrimaryGlow} />}
                  <span className="relative z-10">{c.label}</span>
                </Link>
              ))}
            </motion.div>
          ) : null}

          <motion.div variants={item} className={UI.sep} />
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {children}
      </section>

      {bottomTitle ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
            <p className="text-2xl md:text-3xl font-bold text-white">{bottomTitle}</p>
            {bottomText ? <p className="mt-2 text-white/70 leading-relaxed">{bottomText}</p> : null}

            {bottomCtas?.length ? (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {bottomCtas.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={c.variant === "secondary" ? UI.btnSecondary : UI.btnPrimary}
                  >
                    {c.variant === "secondary" ? null : <span className={UI.btnPrimaryGlow} />}
                    <span className="relative z-10">{c.label}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export { UI };
