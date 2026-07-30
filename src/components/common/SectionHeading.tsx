interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-brand">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}
