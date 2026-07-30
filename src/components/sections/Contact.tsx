import { Mail, BarChart3, Download } from "lucide-react";
import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/common/BrandIcons";

export function Contact() {
  const { links, profile } = content;

  const items = [
    { label: "Email", href: `mailto:${links.email}`, icon: Mail, external: false },
    { label: "LinkedIn", href: links.linkedin, icon: LinkedInIcon, external: true },
    { label: "GitHub", href: links.github, icon: GitHubIcon, external: true },
    { label: "Tableau Public", href: links.tableauPublic, icon: BarChart3, external: true },
  ];

  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's talk" />
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {items.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumePdfUrl}
                download
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand"
              >
                <Download aria-hidden="true" className="size-4" />
                Download résumé
              </a>
            </li>
          </ul>
          <p className="mt-10 text-xs text-muted-foreground">
            Built with React, Tailwind CSS, and shadcn/ui.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
