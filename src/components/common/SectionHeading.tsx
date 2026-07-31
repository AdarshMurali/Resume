interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-brand">{eyebrow}</p>
      )}
      <h2 className="text-h2 tracking-tight">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
    </div>
  );
}
