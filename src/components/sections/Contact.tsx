import { content } from "@/content";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Contact() {
  const { links } = content;

  return (
    <footer id="contact" className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Contact" title="Let's talk" />
      <ul className="flex flex-wrap gap-4 text-sm">
        <li>
          <a href={`mailto:${links.email}`} className="hover:text-brand">
            Email
          </a>
        </li>
        <li>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-brand">
            GitHub
          </a>
        </li>
        <li>
          <a
            href={links.tableauPublic}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand"
          >
            Tableau Public
          </a>
        </li>
      </ul>
    </footer>
  );
}
