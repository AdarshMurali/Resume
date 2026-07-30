import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function About() {
  const { profile } = content;

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="About" title="Summary" />
      <p className="text-muted-foreground">{profile.summary}</p>
      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="text-xl font-semibold">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
