"use client";

import Link from "next/link";

const YT =
  process.env.NEXT_PUBLIC_SHEGUE_YOUTUBE_URL ||
  "https://youtube.com/@shegue242?si=0t9OUsU9xXfpkWdu";
const IG = process.env.NEXT_PUBLIC_SHEGUE_INSTAGRAM_URL || "";
const TT = process.env.NEXT_PUBLIC_SHEGUE_TIKTOK_URL || "";

function SocialCard({
  badge,
  title,
  desc,
  href,
}: {
  badge: string;
  title: string;
  desc: string;
  href: string;
}) {
  const disabled = !href;

  return (
    <div
      className={[
        "rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 text-left transition",
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:border-yellow-400/40 hover:bg-white/7",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-white font-extrabold">{title}</p>
        <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 text-white/75">
          {badge}
        </span>
      </div>

      <p className="mt-2 text-white/70 text-sm leading-relaxed">{desc}</p>

      {disabled ? (
        <p className="mt-4 text-xs text-white/45">Lien à ajouter</p>
      ) : (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-yellow-300 hover:text-yellow-200"
        >
          Ouvrir →
        </Link>
      )}
    </div>
  );
}

export default function ShegueSocialGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SocialCard
        badge="YouTube"
        title="SHÉGUÉ"
        desc="Chaîne officielle (clips + sorties)."
        href={YT}
      />
      <SocialCard
        badge="Instagram"
        title="SHÉGUÉ"
        desc="Actus, stories & coulisses."
        href={IG}
      />
      <SocialCard
        badge="TikTok"
        title="SHÉGUÉ"
        desc="Teasers & formats courts."
        href={TT}
      />
    </div>
  );
}
