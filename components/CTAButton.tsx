"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  "aria-label"?: string;
};

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

/**
 * Premium CTA button (SSR safe)
 * - Primary: subtle sheen via CSS (no JS, no random)
 * - Hover: lift + micro scale + soft glow
 * - Focus: visible gold ring
 */
export default function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  target,
  rel,
  ...rest
}: CTAButtonProps) {
  const isExternal = href.startsWith("http");
  const Comp: any = isExternal ? "a" : Link;

  const base =
    "group relative inline-flex items-center justify-center gap-2 " +
    "select-none whitespace-nowrap " +
    "rounded-full px-6 py-3 md:px-7 md:py-3.5 " +
    "text-sm md:text-[15px] font-semibold tracking-wide " +
    "transition-[box-shadow,transform,background-color,border-color] duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80";

  const primary =
    "border border-[#F5C542]/55 bg-black/35 text-white " +
    "shadow-[0_0_0_1px_rgba(245,197,66,0.05),0_10px_30px_rgba(0,0,0,0.35)] " +
    "backdrop-blur-md";

  const secondary =
    "border border-white/18 bg-black/25 text-white/90 " +
    "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.35)] " +
    "backdrop-blur-md";

  const hoverPrimary =
    "hover:border-[#F5C542]/80 hover:shadow-[0_0_0_1px_rgba(245,197,66,0.12),0_0_22px_rgba(245,197,66,0.18),0_14px_34px_rgba(0,0,0,0.45)]";

  const hoverSecondary =
    "hover:border-[#F5C542]/65 hover:text-white hover:shadow-[0_0_0_1px_rgba(245,197,66,0.10),0_0_18px_rgba(245,197,66,0.14),0_14px_34px_rgba(0,0,0,0.45)]";

  return (
    <motion.div
      initial={false}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      <Comp
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noreferrer noopener" : undefined)}
        className={cn(
          base,
          variant === "primary" ? cn(primary, hoverPrimary) : cn(secondary, hoverSecondary),
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full
                     bg-[radial-gradient(70%_120%_at_50%_0%,rgba(255,255,255,0.10),rgba(255,255,255,0)_55%)]
                     opacity-70"
        />

        {variant === "primary" && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="cta-sheen__bar" />
          </span>
        )}

        <span className="relative z-[1] flex items-center gap-2">{children}</span>
      </Comp>
    </motion.div>
  );
}
