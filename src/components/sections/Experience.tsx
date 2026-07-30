import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />
      <ul className="flex flex-col gap-6">
        {content.experience.map((role) => (
          <li key={`${role.company}-${role.start}`} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">
                {role.role} · {role.company}
              </h3>
              <span className="text-sm text-muted-foreground">
                {role.start} – {role.end}
              </span>
            </div>
            <p className="mt-1 text-sm text-brand">{role.domain}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
