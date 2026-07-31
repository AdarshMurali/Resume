import { GraduationCap } from "lucide-react";
import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AgenticAI() {
  const { agenticAI } = content;

  return (
    <section id="agentic-ai" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Agentic AI"
          title="Building with agentic AI"
          description={agenticAI.intro}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {agenticAI.groups.map((group) => (
            <Card key={group.category}>
              <CardHeader>
                <CardTitle>{group.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        {agenticAI.pursuing && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3">
            <GraduationCap aria-hidden="true" className="size-6 shrink-0 text-brand" />
            <p className="text-base font-semibold text-foreground">{agenticAI.pursuing}</p>
          </div>
        )}
      </Reveal>
    </section>
  );
}
