// components/portfolio/PhotoCategorySection.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { GalleryImage, PhotoCategory } from "@/components/portfolio/types";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const ACCENT = "#F5C542"; // gold contrôlé (pas “tableau jaune”)

const UI = {
  card: cn(
    "relative rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-xl",
    "shadow-[0_18px_70px_rgba(0,0,0,0.45)] overflow-hidden"
  ),
  halo:
    "pointer-events-none absolute -inset-10 opacity-70 [background:radial-gradient(40%_40%_at_18%_20%,rgba(245,197,66,0.10)_0%,rgba(0,0,0,0)_60%)]",
  innerBorder: "pointer-events-none absolute inset-0 rounded-2xl border border-white/[0.06]",
  subtle: "text-white/75 leading-relaxed",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",

  badge:
    "inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.03] px-3 py-1",
  badgeDot: "h-1.5 w-1.5 rounded-full",
  badgeText: "text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70",

  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-white",
  btnSecondary:
    "inline-flex items-center justify-center rounded-xl border border-white/18 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06] hover:border-white/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition duration-700",

  // grid images
  imgBtn: cn(
    "group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/12 bg-black/30",
    "transition will-change-transform",
    "hover:border-white/22 hover:-translate-y-[1px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
  ),
  imgSkeleton: "absolute inset-0 bg-white/[0.035] animate-pulse",
  imgOverlay:
    "absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100",
  imgIndex:
    "absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] text-white/85 opacity-0 group-hover:opacity-100 transition backdrop-blur",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className={UI.badge}>
      <span className={UI.badgeDot} style={{ background: ACCENT }} />
      <p className={UI.badgeText}>{children}</p>
    </div>
  );
}

export default function PhotoCategorySection({
  id,
  cat,
  list,
  onOpen,
  blurDataURL,
  onCalendly,
  email,
}: {
  id: string;
  cat: PhotoCategory;
  list: GalleryImage[];
  onOpen: (index: number) => void;
  blurDataURL?: string; // ✅ optionnel: évite bugs si blurDataURL vide
  onCalendly: () => void;
  email: string;
}) {
  return (
    <section id={id} className="scroll-mt-44">
      <div className={cn(UI.card, "p-7 md:p-9")}>
        {/* halo + borders */}
        <div className={UI.halo} />
        <div className={UI.innerBorder} />

        {/* header */}
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Badge>
              {cat.title} · {cat.count} photos
            </Badge>

            <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight">
              {cat.title}
            </h3>

            <p className={cn("mt-3 text-sm md:text-base max-w-2xl", UI.subtle)}>
              {cat.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCalendly}
              className={UI.btnPrimary}
              style={{ borderColor: "rgba(245,197,66,0.40)", background: "rgba(245,197,66,0.06)" }}
            >
              <span className={UI.btnShine} />
              <span className="relative">Planifier une séance</span>
            </button>

            <a
              href={`mailto:${email}?subject=${encodeURIComponent(`Devis photo — ${cat.title}`)}`}
              className={UI.btnSecondary}
            >
              Tarifs / devis
            </a>
          </div>
        </div>

        <div className={cn("relative mt-7", UI.sep)} />

        {/* grid */}
        <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {list.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => onOpen(idx)}
              className={UI.imgBtn}
              aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
            >
              <span className={UI.imgSkeleton} aria-hidden />

              <Image
                src={img.src}
                alt={img.alt}
                fill
                // ✅ blur only if provided, sinon Next peut warn / casser selon config
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                // ✅ optionnel: si certaines images manquent pendant dev, commente ça:
                // onError={(e) => console.warn("Image failed:", img.src)}
              />

              <span className={UI.imgOverlay} aria-hidden />
              <span className={UI.imgIndex}>
                {idx + 1}/{list.length}
              </span>

              {/* micro “gold cue” très discret */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(245,197,66,0.10)`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
