"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ===================== TYPES ===================== */
export type GalleryImage = { src: string; alt: string };

export type LightboxState =
  | {
      list: GalleryImage[];
      index: number;
      title?: string;
    }
  | null;

/* ===================== UTILS ===================== */
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

/* ===================== HOOK (optional) ===================== */
export function useLightbox() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const open = useCallback((list: GalleryImage[], index: number, title?: string) => {
    setLightbox({ list, index, title });
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return lb;
      return { ...lb, index: (lb.index - 1 + lb.list.length) % lb.list.length };
    });
  }, []);

  const next = useCallback(() => {
    setLightbox((lb) => {
      if (!lb) return lb;
      return { ...lb, index: (lb.index + 1) % lb.list.length };
    });
  }, []);

  const jumpTo = useCallback((idx: number) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const safe = Math.max(0, Math.min(lb.list.length - 1, idx));
      return { ...lb, index: safe };
    });
  }, []);

  return { lightbox, setLightbox, open, close, prev, next, jumpTo };
}

/* ===================== COMPONENT ===================== */
export default function Lightbox({
  lightbox,
  onClose,
  onPrev,
  onNext,
  onJumpTo,
  accent = "#F5C542",
}: {
  lightbox: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJumpTo: (idx: number) => void;
  accent?: string;
}) {
  const reduce = useReducedMotion();

  // ✅ Portal ready (avoid SSR/hydration)
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  // ✅ focus restore
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // ✅ image fallback
  const [imgBroken, setImgBroken] = useState(false);

  const image = useMemo(() => {
    if (!lightbox) return null;
    return lightbox.list[lightbox.index] ?? null;
  }, [lightbox]);

  // capture last focus when opening
  useEffect(() => {
    if (!lightbox) return;
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
  }, [lightbox]);

  // reset broken state when image changes
  useEffect(() => {
    if (!lightbox) return;
    setImgBroken(false);
  }, [lightbox?.index, lightbox?.title]);

  // lock scroll + keyboard + focus trap
  useEffect(() => {
    if (!lightbox) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = getFocusable(dialog);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      setTimeout(() => lastTriggerRef.current?.focus?.(), 0);
    };
  }, [lightbox, onClose, onPrev, onNext]);

  // swipe mobile
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  }, []);
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - touchRef.current.x;
      const dy = t.clientY - touchRef.current.y;

      if (Math.abs(dx) > 70 && Math.abs(dy) < 60) {
        const elapsed = Date.now() - touchRef.current.t;
        if (elapsed < 900) {
          touchRef.current = null;
          if (dx > 0) onPrev();
          else onNext();
        }
      }
    },
    [onPrev, onNext]
  );

  if (!portalReady || !lightbox || !image) return null;

  const overlay = (
    <AnimatePresence>
      <motion.div
        key="lb-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.2 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.18 } }}
        className="fixed inset-0 z-[9999] bg-black/90 p-3 sm:p-4 grid place-items-center"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Visionneuse d’images"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        <motion.div
          key="lb-dialog"
          initial={{ y: reduce ? 0 : 10, scale: reduce ? 1 : 0.99, opacity: 0 }}
          animate={{
            y: 0,
            scale: 1,
            opacity: 1,
            transition: { duration: reduce ? 0 : 0.22 },
          }}
          exit={{
            y: reduce ? 0 : 8,
            scale: reduce ? 1 : 0.99,
            opacity: 0,
            transition: { duration: reduce ? 0 : 0.18 },
          }}
          ref={dialogRef}
          className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 sm:px-4 py-3 bg-black/60 backdrop-blur">
            <div className="min-w-0">
              <p className="text-sm text-white/80 truncate">
                <span className="text-white/95 font-semibold">
                  {lightbox.title ?? "Galerie"}
                </span>{" "}
                <span className="text-white/40">
                  — {lightbox.index + 1}/{lightbox.list.length}
                </span>
              </p>
              <p className="text-[12px] text-white/45 truncate">{image.alt}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              ref={closeBtnRef}
              className="rounded-xl border border-white/18 bg-white/[0.03] px-4 py-2 text-sm text-white/90 hover:bg-white/[0.06] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Fermer la visionneuse"
            >
              Fermer
            </button>
          </div>

          {/* IMAGE */}
          <div className="relative bg-black">
            <div className="relative aspect-[16/10]">
              {!imgBroken ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain select-none"
                  sizes="100vw"
                  draggable={false}
                  onError={() => setImgBroken(true)}
                  // If needed when Next config isn't ready:
                  // unoptimized
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center px-6">
                    <p className="text-white/85 font-semibold">Image introuvable / non chargée</p>
                    <p className="mt-2 text-sm text-white/55">
                      Vérifie le chemin : <span className="text-white/80">{image.src}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setImgBroken(false)}
                      className="mt-5 rounded-xl border border-white/18 bg-white/[0.03] px-4 py-2 text-sm text-white/90 hover:bg-white/[0.06] transition"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* PREV / NEXT zones */}
            <button
              type="button"
              onClick={onPrev}
              className="absolute inset-y-0 left-0 w-[18%] sm:w-[16%] flex items-center justify-start p-3 text-white/70 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Image précédente"
              title="Précédent (←)"
            >
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                ←
              </span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute inset-y-0 right-0 w-[18%] sm:w-[16%] flex items-center justify-end p-3 text-white/70 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              aria-label="Image suivante"
              title="Suivant (→)"
            >
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
                →
              </span>
            </button>
          </div>

          {/* THUMBS */}
          <div className="border-t border-white/10 bg-black/60 backdrop-blur px-3 sm:px-4 py-3">
            <div className="mt-1 overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {lightbox.list.map((img, idx) => {
                  const isActive = idx === lightbox.index;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => onJumpTo(idx)}
                      className={cn(
                        "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                        isActive ? "border-white/35" : "border-white/10 hover:border-white/25"
                      )}
                      style={isActive ? { boxShadow: `0 0 0 2px ${accent}22` } : undefined}
                      aria-label={`Aller à la photo ${idx + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className={cn(
                          "object-cover",
                          isActive ? "opacity-100" : "opacity-75 hover:opacity-95"
                        )}
                        sizes="80px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // ✅ Portal = toujours au bon endroit, même si ta page a du 3D/transform
  return createPortal(overlay, document.body);
}

/* ===================== QUICK USAGE (copy) =====================

import Lightbox, { useLightbox } from "@/components/Lightbox";

const { lightbox, open, close, prev, next, jumpTo } = useLightbox();

<button onClick={() => open(list, idx, "Portrait")}>Open</button>

<Lightbox
  lightbox={lightbox}
  onClose={close}
  onPrev={prev}
  onNext={next}
  onJumpTo={jumpTo}
/>

============================================================== */
