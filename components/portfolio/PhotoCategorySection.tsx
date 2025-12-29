// components/portfolio/PhotoCategorySection.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryImage, PhotoCategory } from "@/app/portfolio/page";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const UI = {
  pill:
    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20",
  card:
    "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
  subtle: "text-white/75 leading-relaxed",
  sep: "h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent",
  btnPrimary:
    "group relative inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:opacity-95 shadow-[0_14px_44px_rgba(0,0,0,0.45)] overflow-hidden",
  btnShine:
    "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-full transition duration-700",
  btnOutline:
    "inline-flex items-center justify-center rounded-full border border-yellow-400/70 bg-transparent px-6 py-3 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-400 hover:text-black",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className={UI.pill}>
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-yellow-200/90">
        {children}
      </p>
    </div>
  );
}

export default function PhotoCategorySection({
  id,
  cat,
  list,
  onOpen,
  blurDataURL,
}: {
  id: string;
  cat: PhotoCategory;
  list: GalleryImage[];
  onOpen: (index: number) => void;
  blurDataURL: string;
}) {
  return (
    <div id={id} className="scroll-mt-44">
      <div className={cn(UI.card, "p-7")}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-3xl">
            <Badge>
              {cat.title} · {cat.count} photos
            </Badge>
            <h3 className="mt-3 text-xl md:text-2xl font-semibold">{cat.title}</h3>
            <p className={cn("mt-2 text-sm md:text-base", UI.subtle)}>{cat.desc}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/booking" className={UI.btnPrimary}>
              <span className={UI.btnShine} />
              <span className="relative">Réserver une séance</span>
            </Link>
            <Link href="/contact" className={UI.btnOutline}>
              Tarifs / devis
            </Link>
          </div>
        </div>

        <div className={cn("mt-6", UI.sep)} />

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => onOpen(idx)}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5",
                "transition hover:border-white/20 hover:-translate-y-[1px]"
              )}
              aria-label={`Ouvrir ${cat.title} — photo ${idx + 1}`}
            >
              {/* skeleton pulse overlay (light) */}
              <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />

              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] text-white/85 opacity-0 group-hover:opacity-100 transition backdrop-blur">
                {idx + 1}/{list.length}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
