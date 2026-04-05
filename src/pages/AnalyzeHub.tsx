import { Link } from "react-router-dom";
import { Building2, Home, TrendingUp, Users, Gem, Store, Mountain, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const analyzerTypes = [
  {
    icon: Building2,
    title: "Condo",
    desc: "Review HOA, insurance, special assessments, and total monthly ownership cost.",
    href: "/analyze/condo",
    accent: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Home,
    title: "Single Family",
    desc: "Understand payment scenarios, taxes, insurance, and affordability.",
    href: "/analyze/single-family",
    accent: "from-emerald-500/10 to-green-500/10",
  },
  {
    icon: TrendingUp,
    title: "Rental Property",
    desc: "Break down rent, expenses, cash flow, cap rate, and return.",
    href: "/analyze/rental",
    accent: "from-amber-500/10 to-yellow-500/10",
  },
  {
    icon: Users,
    title: "Multifamily",
    desc: "Analyze rent roll, NOI, DSCR, cash flow, and break-even occupancy.",
    href: "/analyze/multifamily",
    accent: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: Gem,
    title: "Luxury Property",
    desc: "Estimate true carrying cost, taxes, insurance, HOA, and cash needed to close.",
    href: "/analyze/luxury",
    accent: "from-rose-500/10 to-pink-500/10",
  },
  {
    icon: Store,
    title: "Commercial",
    desc: "Review NOI, debt service, cap rate, and income potential.",
    href: "/analyze/commercial",
    accent: "from-sky-500/10 to-indigo-500/10",
  },
  {
    icon: Mountain,
    title: "Land",
    desc: "Estimate carrying costs, acquisition basis, and build or resale scenarios.",
    href: "/analyze/land",
    accent: "from-orange-500/10 to-amber-500/10",
  },
];

const AnalyzeHub = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Analyze Any Property | Property Intelligence"
        description="Investment-grade deal analysis for buyers, homeowners, and investors. Break down monthly cost, financing, cash to close, and returns for any property type."
        keywords="property analyzer, condo analyzer, rental property calculator, multifamily analysis, real estate investment calculator"
        canonical="https://capitaldistrictnest.com/analyze"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground/70 mb-6">
            Property Intelligence for Buyers, Homeowners, and Investors
          </p>
          <h1 className="text-5xl md:text-7xl font-extralight text-foreground tracking-tight mb-8 leading-[1.05]">
            Analyze Any Property<br />
            <span className="font-normal">Like a Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Understand monthly cost, financing, cash needed to close, and investment potential before you buy.
          </p>
        </div>
      </section>

      {/* CARDS GRID */}
      <section className="pb-32 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyzerTypes.map((type) => (
              <Link
                key={type.title}
                to={type.href}
                className="group relative p-10 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-background hover:shadow-2xl hover:shadow-border/60 hover:border-border transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${type.accent} flex items-center justify-center mb-8`}>
                  <type.icon className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{type.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{type.desc}</p>
                <div className="flex items-center gap-2 text-muted-foreground/70 group-hover:text-foreground transition-colors font-medium">
                  Start Analysis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATOR */}
      <section className="py-24 px-6 bg-secondary/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground italic mb-2">Search on Zillow.</p>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">Analyze like a Pro.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeHub;
