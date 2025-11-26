// components/SectionTitle.tsx
type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.25em] text-yellow-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-white/70 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
