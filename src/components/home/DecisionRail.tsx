import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { analyzeAnyPropertyUrl } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";
import ChapterRail from "@/components/home/ChapterRail";

import imgBuying from "@/assets/hero-discovery-wide.jpg";
import imgSelling from "@/assets/hero-owners-wide.jpg";
import imgInvesting from "@/assets/hero-finance-wide.jpg";
import imgOwning from "@/assets/category-contractors.jpg";

const PLACEMENT = "homepage-decision-rail";

type LinkItem = { label: string; to?: string; href?: string };
type Card = {
  key: string;
  title: string;
  copy: string;
  image: string;
  links: LinkItem[];
};

const CARDS: Card[] = [
  {
    key: "buying",
    title: "Buying",
    copy: "Search homes, compare towns, understand the payment, and assemble the people who help you close.",
    image: imgBuying,
    links: [
      { label: "Search homes", to: "/#property-search-widget" },
      { label: "First-time buyer guidance", to: "/first-time-buyers" },
      { label: "Town intelligence", to: "/communities" },
    ],
  },
  {
    key: "selling",
    title: "Selling",
    copy: "Understand the property, preparation choices, likely buyer pool, and what should happen before the next move.",
    image: imgSelling,
    links: [
      {
        label: "Analyze a property",
        href: analyzeAnyPropertyUrl({ placement: PLACEMENT, decisionType: "featured" }),
      },
      { label: "Seller resources", to: "/sell-investment-property" },
      { label: "Market reports", to: "/market-reports" },
    ],
  },
  {
    key: "investing",
    title: "Investing",
    copy: "Pressure-test multi-unit, land, flip, rental, and financing assumptions before you act.",
    image: imgInvesting,
    links: [
      {
        label: "Analyze a deal",
        href: analyzeAnyPropertyUrl({ placement: PLACEMENT, decisionType: "multi_unit" }),
      },
      { label: "Multi-unit tools", to: "/analyze/multifamily" },
      { label: "Land tools", to: "/analyze/land" },
      { label: "Investor resources", to: "/investor-tools" },
    ],
  },
  {
    key: "owning",
    title: "Owning & improving",
    copy: "Find local help for repairs, clean-outs, maintenance, landscaping, moving, and ownership.",
    image: imgOwning,
    links: [
      { label: "Home Services", to: "/home-services" },
      { label: "Property management", to: "/local?category=property-maintenance" },
      { label: "Browse all local businesses", to: "/local" },
    ],
  },
];

const DecisionRail = () => (
  <ChapterRail
    id="start-with-your-decision"
    eyebrow="Start here"
    title="Start with your decision."
    subtitle="The right next step depends on what you are trying to do."
    tone="dark"
  >
    {CARDS.map((card) => (
      <article
        key={card.key}
        className="snap-start shrink-0 w-[86vw] sm:w-[62vw] lg:w-[46%] rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03]"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={card.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.25) 0%, rgba(11,15,25,0.75) 70%, rgba(11,15,25,0.96) 100%)",
            }}
          />
          <h3 className="absolute left-7 bottom-6 text-3xl md:text-[2.25rem] font-semibold tracking-[-0.03em] text-white">
            {card.title}
          </h3>
        </div>
        <div className="p-7">
          <p className="text-[15px] text-white/70 font-light leading-relaxed">{card.copy}</p>
          <ul className="mt-6 space-y-1">
            {card.links.map((l) => {
              const onClick = () =>
                logEngagement(
                  "decision_path_click",
                  {},
                  { source_location: PLACEMENT, intent_type: card.key },
                );
              const cls =
                "group inline-flex items-center gap-2 min-h-[44px] text-[15px] font-medium text-white/85 hover:text-[#5eead4] transition-colors";
              return (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClick}
                      className={cls}
                    >
                      {l.label}
                      <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link to={l.to!} onClick={onClick} className={cls}>
                      {l.label}
                      <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    ))}
  </ChapterRail>
);

export default DecisionRail;
