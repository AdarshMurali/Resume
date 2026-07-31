import { ExternalLink } from "lucide-react";
import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Card, CardContent } from "@/components/ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <SectionHeading eyebrow="Certifications" title="Credentials" />
        <div className="grid gap-3 sm:grid-cols-2">
          {content.certifications.map((cert) => (
            <Card key={cert.name}>
              <CardContent>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1.5 font-medium hover:text-brand"
                >
                  {cert.name}
                  <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" />
                </a>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.issuer} · {cert.year}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
