// components/portfolio/Lightbox.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import type { LightboxState } from "@/app/portfolio/page";

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

export default function Lightbox({
  state,
  onClose,
  onPrev,
  onNext,
  onJump,
}: {
  state: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (idx: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const image = state ? state.list[state.index] : null;

  const prevIndex = useMemo(() => {
    if (!state) return 0;
    return (state.index - 1 + state.list.length) % state.list.length;
  }, [state]);

  const nextIndex = useMemo(() => {
    if (!state) return 0;
    return (state.index + 1) % state.list.length;
  }, [state]);

  // keyboard + focus trap + scroll lock
  useEffect(() => {
    if (!state) return;

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
        if (!focusables.length) return;

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
    };
  }, [state, onClose, onPrev, onNext]);

  // Mobile swipe
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

  if (!state || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 p-3 sm:p-4 flex items-center justify-center backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d’images"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/35",
          "shadow-[0_30px_120px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preload next/prev (light) */}
        <div className="hidden">
          <Image src={state.list[nextIndex].src} alt="" width={1} height={1} loading="eager" />
          <Image src={state.list[prevIndex].src} alt="" width={1} height={1} loading="eager" />
        </div>

        {/* Topbar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 sm:px-4 py-3 bg-black/35 backdrop-blur">
          <div className="min-w-0">
            <p className="text-sm text-white/85 truncate">
              <span className="text-white font-semibold">{state.title}</span>{" "}
              <span className="text-white/45">
                — {state.index + 1}/{state.list.length}
              </span>
            </p>
            <p className="text-[12px] text-white/55 truncate">{image.alt}</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Ouvrir
            </a>

            <button
              type="button"
              onClick={onClose}
              ref={closeBtnRef}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              aria-label="Fermer la visionneuse"
            >
              Fermer
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[16/10] bg-black">
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain select-none"
              priority
              sizes="100vw"
              draggable={false}
            />
          </div>

          <button
            type="button"
            onClick={onPrev}
            className="absolute inset-y-0 left-0 w-[18%] sm:w-[16%] flex items-center justify-start p-3 text-white/75 hover:text-white transition"
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
            className="absolute inset-y-0 right-0 w-[18%] sm:w-[16%] flex items-center justify-end p-3 text-white/75 hover:text-white transition"
            aria-label="Image suivante"
            title="Suivant (→)"
          >
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur">
              →
            </span>
          </button>
        </div>

        {/* Thumbs */}
        <div className="border-t border-white/10 bg-black/35 backdrop-blur px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                aria-label="Précédent"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                aria-label="Suivant"
              >
                →
              </button>

              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ouvrir
              </a>
            </div>

            <div className="text-xs text-white/55 hidden md:block">ESC • ← → • swipe</div>
          </div>

          <div className="mt-3 overflow-x-auto">
            <div className="flex gap-2 pb-1">
              {state.list.map((img, idx) => {
                const isActive = idx === state.index;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => onJump(idx)}
                    className={cn(
                      "relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border transition",
                      isActive
                        ? "border-yellow-400 ring-2 ring-yellow-400/30"
                        : "border-white/10 hover:border-white/25"
                    )}
                    aria-label={`Aller à la photo ${idx + 1}`}
                    aria-current={isActive ? "true" : "false"}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={cn(
                        "object-cover",
                        isActive ? "opacity-100" : "opacity-80 hover:opacity-95"
                      )}
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
