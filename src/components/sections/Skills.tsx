import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillMeter } from "@/components/common/SkillMeter";
import { Reveal } from "@/components/common/Reveal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading eyebrow="Skills" title="Tools & platforms" />
        <div className="grid gap-4 sm:grid-cols-2">
          {content.skills.map((cluster) => (
            <Card key={cluster.category}>
              <CardHeader>
                <CardTitle>{cluster.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {cluster.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{skill.name}</p>
                      {skill.note && (
                        <p className="truncate text-xs text-muted-foreground">{skill.note}</p>
                      )}
                    </div>
                    {skill.level && <SkillMeter level={skill.level} />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
