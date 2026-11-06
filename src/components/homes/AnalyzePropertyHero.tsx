import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingUp, DollarSign, PieChart } from "lucide-react";

interface AnalyzePropertyHeroProps {
  /** Optional town name for town-specific copy. */
  townName?: string;
  /** Route for the "Browse Investment Listings" secondary CTA. */
  browseHref?: string;
}

/**
 * AnalyzePropertyHero — neutral, platform-level investor tool card.
 * Dark premium surface, teal accent. No agent branding.
 */
const AnalyzePropertyHero = ({
  townName,
  browseHref = "/homes?type=investment",
}: AnalyzePropertyHeroProps) => {
  const headline = townName
    ? `Analyze a ${townName} Property Investment`
    : "Analyze Your Property Investment";

  const subheadline = townName
    ? `Run quick numbers on ${townName} rentals, multi-units, mixed-use properties, and investment opportunities.`
    : "Run quick numbers on rentals, multi-units, mixed-use properties, and investment opportunities across the Capital District.";

  const chips = [
    { icon: DollarSign, label: "Cash Flow" },
    { icon: PieChart, label: "Cap Rate" },
    { icon: TrendingUp, label: "ROI" },
    { icon: Calculator, label: "Rent Estimate" },
  ];

  return (
    <section className="px-[5%] py-14 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, #0B0F19 0%, #11192B 55%, #0e0f12 100%)",
          }}
        >
          {/* Ambient accent */}
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(94,234,212,0.18), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(closest-side, rgba(13,110,102,0.20), transparent 70%)" }}
          />

          <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="eyebrow-apple text-primary mb-3">
                INVESTMENT TOOL
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
                {headline}
              </h2>
              <p className="nest-lead mb-3 max-w-xl">{subheadline}</p>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl">
                Estimate cash flow, rent, expenses, financing, and potential
                returns before you move forward.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/investment-analyzer"
                  className="btn-primary-apple inline-flex items-center gap-2"
                >
                  Analyze a Property <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={browseHref}
                  className="nest-quiet-link inline-flex items-center gap-2"
                >
                  Browse Investment Listings
                </Link>
              </div>

              <div className="text-xs text-muted-foreground mt-4">
                Built for local buyers, investors, landlords, and real estate
                professionals.
              </div>
            </div>

            {/* Stat chips panel */}
            <div className="grid grid-cols-2 gap-3">
              {chips.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-secondary p-4 backdrop-blur-sm"
                >
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <div className="text-sm font-semibold text-foreground">{label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Instant estimate
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyzePropertyHero;
