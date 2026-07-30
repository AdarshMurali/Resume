import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Certifications" title="Credentials" />
      <ul className="grid gap-3 sm:grid-cols-2">
        {content.certifications.map((cert) => (
          <li key={cert.name} className="rounded-lg border border-border p-3 text-sm">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:text-brand"
            >
              {cert.name}
            </a>
            <p className="text-muted-foreground">
              {cert.issuer} · {cert.year}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
