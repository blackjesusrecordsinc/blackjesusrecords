// components/ServiceCard.tsx
import Link from "next/link";

type Service = {
  slug: string;
  title: string;
  description: string;
  category: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="border border-white/10 rounded-2xl p-5 bg-white/5 hover:bg-white/10 transition-all">
      <p className="text-xs uppercase tracking-wide text-yellow-400 mb-1">
        {service.category}
      </p>
      <h3 className="text-lg font-semibold text-white mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-white/70 mb-4">
        {service.description}
      </p>
      <Link
        href={`/services#${service.slug}`}
        className="text-sm text-yellow-400 hover:text-yellow-300"
      >
        En savoir plus →
      </Link>
    </div>
  );
}
