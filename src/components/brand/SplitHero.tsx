import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type SplitLink = { label: string; to: string; external?: boolean };

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  titleAs?: "h1" | "h2";
  lead?: ReactNode;
  cta?: SplitLink;
  links?: SplitLink[];
  image?: { src: string; alt: string };
  media?: ReactNode;
  tone?: "white" | "ice";
  compact?: boolean;
  children?: ReactNode;
};

const ActionLink = ({ link, className, children }: { link: SplitLink; className: string; children: ReactNode }) =>
  link.external ? (
    <a href={link.to} target="_blank" rel="noopener noreferrer" className={className}>
      {children}<span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link to={link.to} className={className}>{children}</Link>
  );

/**
 * Reusable light split hero: short statement on the LEFT, photo or relevant
 * feature visual on the RIGHT. Mobile stacks text before media.
 */
export default function SplitHero({ id, eyebrow, title, titleAs = "h2", lead, cta, links, image, media, tone = "white", compact, children }: Props) {
  const Heading = titleAs;
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`nest-split nest-split--${tone} ${compact ? "nest-split--compact" : ""}`}>
      <div className="nest-shell nest-split-grid">
        <div className="nest-split-copy nest-rise">
          {eyebrow && <p className="nest-eyebrow">{eyebrow}</p>}
          <Heading id={headingId} className={titleAs === "h1" ? "nest-display-page" : "nest-display-split"}>{title}</Heading>
          {lead && <p className="nest-lead">{lead}</p>}
          {cta && (
            <div className="mt-8">
              <ActionLink link={cta} className="nest-btn">{cta.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></ActionLink>
            </div>
          )}
          {links && links.length > 0 && (
            <div className="nest-quiet-links">
              {links.map((l) => (
                <ActionLink key={l.to} link={l} className="nest-quiet-link">{l.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></ActionLink>
              ))}
            </div>
          )}
          {children}
        </div>
        {(media || image) && (
          <div className="nest-split-media nest-rise nest-rise--late">
            {media ?? <img src={image!.src} alt={image!.alt} loading={titleAs === "h1" ? "eager" : "lazy"} />}
          </div>
        )}
      </div>
    </section>
  );
}
