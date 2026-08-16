import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { analyzeAnyPropertyUrl } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";

const PLACEMENT = "homepage-decision-bento";

const NAVY = "#0B0F19";
const CHARCOAL = "#13161E";
const GRAPHITE = "#1A1D26";
const SLATE = "#64748B";
const PLATINUM = "#E2E8F0";

type LinkItem = {
  label: string;
  to?: string;
  href?: string;
  intent: string;
  product: string;
};

const track = (intent: string, product: string) =>
  logEngagement("decision_path_click", {}, {
    source_location: PLACEMENT,
    intent_type: intent,
    product_type: product,
  });

const linkClass =
  "group inline-flex items-center gap-2 min-h-[44px] text-[14px] font-medium text-[#E2E8F0]/80 hover:text-[#5EEAD4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60 rounded-md";

const SecondaryLink = ({ item }: { item: LinkItem }) =>
  item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(item.intent, item.product)}
      className={linkClass}
    >
      {item.label}
      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  ) : (
    <Link to={item.to!} onClick={() => track(item.intent, item.product)} className={linkClass}>
      {item.label}
      <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );

const Card = ({
  eyebrow,
  title,
  headline,
  body,
  primary,
  links,
  className = "",
  children,
}: {
  eyebrow: string;
  title?: string;
  headline: string;
  body: string;
  primary: { label: string; to?: string; href?: string; intent: string; product: string };
  links: LinkItem[];
  className?: string;
  children?: React.ReactNode;
}) => (
  <article
    className={`rounded-[28px] border border-white/[0.07] p-7 md:p-9 flex flex-col ${className}`}
    style={{
      background: `linear-gradient(180deg, ${CHARCOAL} 0%, ${GRAPHITE} 100%)`,
      boxShadow: "0 18px 50px -34px rgba(0,0,0,0.8)",
    }}
  >
    <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: SLATE }}>
      {eyebrow}
    </p>
    {title && (
      <p className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-white">{title}</p>
    )}
    <h3
      className="mt-3 text-2xl md:text-[2rem] tracking-[-0.03em] leading-[1.12] text-white text-balance"
      style={{ fontWeight: 300 }}
    >
      {headline}
    </h3>
    <p className="mt-4 text-[14.5px] font-light leading-relaxed" style={{ color: "#94A3B8" }}>
      {body}
    </p>

    {children}

    <div className="mt-7">
      {primary.href ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(primary.intent, primary.product)}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
          style={{ backgroundColor: "#0d6e66" }}
        >
          {primary.label} <ArrowUpRight className="w-4 h-4" />
        </a>
      ) : (
        <Link
          to={primary.to!}
          onClick={() => track(primary.intent, primary.product)}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full text-white text-[13px] font-semibold tracking-wide hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
          style={{ backgroundColor: "#0d6e66" }}
        >
          {primary.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>

    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
      {links.map((l) => (
        <li key={l.label}>
          <SecondaryLink item={l} />
        </li>
      ))}
    </ul>
  </article>
);

const PREVIEW_ROWS = [
  "Monthly payment",
  "Cash to close",
  "Financing scenarios",
  "Risk and unknowns",
];

const DecisionRail = () => (
  <section
    id="start-with-your-decision"
    className="relative w-full scroll-mt-24 border-t border-white/[0.06]"
    style={{ background: NAVY, fontFamily: "'Manrope', system-ui, sans-serif" }}
  >
    <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-2xl">
        <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: SLATE }}>
          Start here
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-white text-balance">
          <span className="font-extralight" style={{ color: PLATINUM }}>
            Start with your decision.
          </span>
          <span className="block font-semibold">Then check the numbers.</span>
        </h2>
        <p className="mt-5 text-[15px] md:text-[17px] font-light leading-relaxed" style={{ color: "#94A3B8" }}>
          The right next step depends on what you are trying to do.
        </p>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Flagship buying card */}
        <Card
          className="lg:col-span-3"
          eyebrow="Buying"
          title="Analyze Any Deal"
          headline="Know what the home really costs before you offer."
          body="See the projected payment, cash needed, financing assumptions, monthly ownership cost, and the questions that still need to be verified."
          primary={{
            label: "Analyze a deal before you buy",
            to: "/analyze-any-deal",
            intent: "buying",
            product: "analyze_any_deal",
          }}
          links={[
            {
              label: "Search live homes",
              to: "/#property-search-widget",
              intent: "buying",
              product: "property_search",
            },
            {
              label: "First-time buyer guidance",
              to: "/first-time-buyers",
              intent: "buying",
              product: "internal_guide",
            },
            {
              label: "Compare towns",
              to: "/communities",
              intent: "buying",
              product: "town_intelligence",
            },
          ]}
        >
          <div className="mt-7 rounded-2xl border border-white/[0.07] p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-[10px] font-medium tracking-[0.45em] uppercase" style={{ color: SLATE }}>
              What you'll see
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PREVIEW_ROWS.map((row) => (
                <div
                  key={row}
                  className="rounded-xl border border-white/[0.06] px-4 py-3 text-[13px] font-medium"
                  style={{ background: "rgba(255,255,255,0.02)", color: PLATINUM }}
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          eyebrow="Selling"
          headline="Understand the property before you price or prepare it."
          body="Preparation choices, the likely buyer pool, and what should be verified before the next move — property intelligence, not deal math."
          primary={{
            label: "Open Analyze Any Property",
            href: analyzeAnyPropertyUrl({ placement: PLACEMENT, decisionType: "featured" }),
            intent: "selling",
            product: "analyze_any_property",
          }}
          links={[
            {
              label: "Seller resources",
              to: "/sell-investment-property",
              intent: "selling",
              product: "internal_guide",
            },
            {
              label: "Market reports",
              to: "/market-reports",
              intent: "selling",
              product: "market_reports",
            },
          ]}
        />

        <Card
          eyebrow="Investing"
          headline="Pressure-test the return before you commit capital."
          body="Multi-unit, land, flip, rental, and financing assumptions — cash flow, returns, and what the result depends on."
          primary={{
            label: "Analyze the investment deal",
            to: "/analyze-any-deal",
            intent: "investing",
            product: "analyze_any_deal",
          }}
          links={[
            {
              label: "Multi-unit tools",
              to: "/analyze/multifamily",
              intent: "investing",
              product: "internal_tool",
            },
            {
              label: "Land tools",
              to: "/analyze/land",
              intent: "investing",
              product: "internal_tool",
            },
            {
              label: "Investor resources",
              to: "/investor-tools",
              intent: "investing",
              product: "internal_guide",
            },
          ]}
        />

        <Card
          eyebrow="Owning & improving"
          headline="Find local help for the work after closing."
          body="Repairs, clean-outs, maintenance, landscaping, and ongoing ownership — organized by the local service category you need."
          primary={{
            label: "Browse Home Services",
            to: "/home-services",
            intent: "owning",
            product: "home_services",
          }}
          links={[
            {
              label: "Property management",
              to: "/local?category=property-management",
              intent: "owning",
              product: "category",
            },
            {
              label: "All local businesses",
              to: "/local",
              intent: "owning",
              product: "directory",
            },
          ]}
        />
      </div>
    </div>
  </section>
);

export default DecisionRail;
