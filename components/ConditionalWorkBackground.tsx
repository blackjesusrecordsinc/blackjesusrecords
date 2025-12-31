"use client";

import { usePathname } from "next/navigation";
import WorkBackground from "@/components/WorkBackground";

export default function ConditionalWorkBackground() {
  const pathname = usePathname();

  // Pas de background interne sur l'accueil (Hero gère déjà le ciné)
  if (pathname === "/") return null;

  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0 -z-10
        pointer-events-none
        overflow-hidden
        bg-black
      "
    >
      <WorkBackground count={7} intervalMs={10000} />
    </div>
  );
}
