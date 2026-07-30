import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatTile } from "@/components/common/StatTile";
import { SkillMeter } from "@/components/common/SkillMeter";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { SkillLevel } from "@/content";

const swatches = [
  { name: "background", className: "bg-background border border-border" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "brand (text-safe)", className: "bg-brand" },
  { name: "accent", className: "bg-accent border border-border" },
  { name: "muted", className: "bg-muted" },
  { name: "card", className: "bg-card border border-border" },
  { name: "border", className: "bg-border" },
];

function Swatch({ name, className, label }: { name: string; className: string; label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex h-16 items-center justify-center rounded-lg ${className}`}>
        {label && <span className="text-sm font-medium">{label}</span>}
      </div>
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
}

export function KitchenSink() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
          <span className="text-sm font-medium text-muted-foreground">
            Kitchen sink — dev only, not part of the shipped bundle
          </span>
          <ThemeToggle />
        </header>

        <main className="mx-auto flex max-w-3xl flex-col gap-16 px-6 py-16">
          <section>
            <SectionHeading
              eyebrow="Design system"
              title="Typography"
              description="Fluid clamp()-based scale — resize the window to see it respond."
            />
            <div className="flex flex-col gap-4">
              <p className="text-display">Display</p>
              <p className="text-h1">Heading 1</p>
              <p className="text-h2">Heading 2</p>
              <p className="text-h3">Heading 3</p>
              <p className="text-body-lg">Body large</p>
              <p className="text-base">Body</p>
              <p className="text-sm">Small</p>
              <p className="text-xs text-muted-foreground">Caption</p>
            </div>
          </section>

          <section>
            <SectionHeading title="Color tokens" description="Current theme — toggle above." />
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {swatches.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
              <Swatch
                name="destructive (as used — /10 tint)"
                className="bg-destructive/10 text-destructive"
                label="Error"
              />
            </div>
          </section>

          <section>
            <SectionHeading title="Buttons" />
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          <section>
            <SectionHeading title="Badges" />
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          <section>
            <SectionHeading title="Card" />
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>FinSight AI</CardTitle>
                <CardDescription>Hedge Fund Portfolio Analyzer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Agentic AI research platform combining streaming analytics with GPT-4o.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <SectionHeading title="Stat tiles" />
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <StatTile label="Total experience" value="15+ yrs" />
              <StatTile label="Industry domains" value="4" />
              <StatTile label="Certifications" value="8" />
              <StatTile label="Core tools" value="ETL · SQL · Tableau" />
            </dl>
          </section>

          <section>
            <SectionHeading title="Skill meters" />
            <div className="flex flex-col gap-2">
              {([1, 2, 3, 4, 5] as SkillLevel[]).map((level) => (
                <div key={level} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-muted-foreground">Level {level}</span>
                  <SkillMeter level={level} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading title="Timeline" />
            <Timeline>
              <TimelineItem title="Data Engineer · Wells Fargo" meta="2020-08 – Present">
                <p className="mt-1 text-sm text-brand">Investment Banking</p>
              </TimelineItem>
              <TimelineItem
                title="Senior Data Analyst · Encora Innovation Labs"
                meta="2017-01 – 2020-08"
              >
                <p className="mt-1 text-sm text-brand">Background Verification</p>
              </TimelineItem>
              <TimelineItem title="Senior Data Analyst · Accenture" meta="2010-11 – 2013-04">
                <p className="mt-1 text-sm text-brand">Finance</p>
              </TimelineItem>
            </Timeline>
          </section>

          <section>
            <SectionHeading
              title="Scroll reveal"
              description="Fades + rises in on scroll — scroll down and back up to replay isn't supported (once: true), reload to see it again."
            />
            <Reveal>
              <Card className="max-w-sm">
                <CardContent className="pt-4">
                  <p className="text-sm">This card fades and rises in on scroll.</p>
                </CardContent>
              </Card>
            </Reveal>
          </section>
        </main>
      </ThemeProvider>
    </MotionConfig>
  );
}
