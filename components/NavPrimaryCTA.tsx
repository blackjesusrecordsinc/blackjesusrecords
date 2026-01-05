"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NavPrimaryCTA({
  href = "/debuter-un-projet",
  label = "Débuter un projet",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="ml-2"
    >
      <motion.div
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex"
      >
        <Link
          href={href}
          className={[
            "relative inline-flex items-center",
            "px-3 py-1.5 rounded-full",
            "border border-yellow-400/40",
            "bg-black/25 backdrop-blur-md",
            "text-xs font-extrabold tracking-wide",
            "text-yellow-300 hover:text-yellow-200",
            "hover:border-yellow-300/70 transition",
            "overflow-hidden",
          ].join(" ")}
          aria-label={label}
        >
          <span className="absolute inset-0 opacity-30 pointer-events-none nav-cta-shimmer" />
          <span className="relative">{label}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
