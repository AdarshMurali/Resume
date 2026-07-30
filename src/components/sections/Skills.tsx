import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Skills" title="Tools & platforms" />
      <div className="grid gap-6 sm:grid-cols-2">
        {content.skills.map((cluster) => (
          <div key={cluster.category}>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">{cluster.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {cluster.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="rounded-full border border-border px-3 py-1 text-sm"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
