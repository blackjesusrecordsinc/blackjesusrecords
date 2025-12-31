// components/ServiceCard.tsx
import React from "react";
import Link from "next/link";

export type Service = {
  slug: string;
  title: string;
  description: string;
  category?: string;
};

type Props =
  | {
      service: Service;
      icon?: React.ReactNode;
      href?: never;
      title?: never;
      description?: never;
      category?: never;
    }
  | {
      service?: never;
      icon?: React.ReactNode;
      title: string;
      description: string;
      category?: string;
      href?: string;
    };

export default function ServiceCard(props: Props) {
  const isServiceMode = "service" in props;

  const title = isServiceMode ? props.service.title : props.title;
  const description = isServiceMode ? props.service.description : props.description;
  const category = isServiceMode ? props.service.category : props.category;
  const href = isServiceMode ? `/services#${props.service.slug}` : props.href;

  const CardInner = (
    <div className="flex items-start gap-4">
      {/* ICON */}
      {props.icon ? (
        <div
          aria-hidden="true"
          className="flex-shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl
                     border border-white/10 bg-white/[0.02] text-white/90"
        >
          {props.icon}
        </div>
      ) : null}

      {/* TEXT */}
      <div className="min-w-0 flex-1 flex flex-col h-full">
        {category ? (
          <p className="text-xs uppercase tracking-wide text-primary/90 mb-1">
            {category}
          </p>
        ) : null}

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Footer poussé en bas */}
        {href ? (
          <div className="mt-auto pt-5 inline-flex items-center gap-2 text-sm text-primary">
            <span>En savoir plus</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            >
              →
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      className="relative h-full rounded-2xl p-5 md:p-6
                 border border-white/10 bg-white/[0.03]
                 transition-all duration-300
                 hover:bg-white/[0.06] hover:border-primary/50
                 focus-within:border-primary/60"
    >
      {href ? (
        <Link
          href={href}
          aria-label={`En savoir plus — ${title}`}
          className="group block h-full rounded-2xl outline-none
                     focus-visible:ring-2 focus-visible:ring-primary/60
                     focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {/* overlay: carte entièrement cliquable */}
          <span aria-hidden="true" className="absolute inset-0 rounded-2xl" />
          <div className="relative h-full">{CardInner}</div>
        </Link>
      ) : (
        <div className="h-full">{CardInner}</div>
      )}
    </div>
  );
}
