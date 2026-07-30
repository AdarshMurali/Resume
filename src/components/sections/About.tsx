import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatTile } from "@/components/common/StatTile";
import { Reveal } from "@/components/common/Reveal";

export function About() {
  const { profile } = content;

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading eyebrow="About" title="Summary" />
        <p className="text-muted-foreground">{profile.summary}</p>
        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatTile key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
