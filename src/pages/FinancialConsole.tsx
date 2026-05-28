import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  Building2,
  TrendingUp,
  Landmark,
  PiggyBank,
  Briefcase,
  Receipt,
  ShieldCheck,
  Banknote,
  LineChart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Hub = {
  icon: typeof Calculator;
  title: string;
  blurb: string;
  cta: string;
  to: string;
  leadType?: string;
};

const hubs: Hub[] = [
  {
    icon: Banknote,
    title: "Mortgage Pre-Approval",
    blurb:
      "Compare payments, down-payment paths, and approval timelines with a local lender who actually answers the phone.",
    cta: "Get pre-approved",
    to: "/dealdesk?intent=mortgage",
    leadType: "mortgage",
  },
  {
    icon: Building2,
    title: "Investment Property Loans",
    blurb:
      "Underwrite rental income, debt service, cap rate, and cash flow before you write the offer.",
    cta: "Analyze a rental",
    to: "/dealdesk?intent=investment_property",
    leadType: "investment_property",
  },
  {
    icon: LineChart,
    title: "DSCR / Rental Financing",
    blurb:
      "Qualify on the property's income — no W-2s required. Built for investors scaling a portfolio.",
    cta: "Explore DSCR",
    to: "/dealdesk?intent=dscr",
    leadType: "dscr",
  },
  {
    icon: Briefcase,
    title: "Commercial Lending",
    blurb:
      "Multifamily, mixed-use, small commercial, and owner-occupied business property financing.",
    cta: "Talk commercial",
    to: "/dealdesk?intent=commercial_lending",
    leadType: "commercial_lending",
  },
  {
    icon: Landmark,
    title: "Banks & Credit Unions",
    blurb:
      "Local banking, lending, deposits, business accounts, and long-term financing relationships.",
    cta: "Connect with a banker",
    to: "/dealdesk?intent=banking",
    leadType: "banking",
  },
  {
    icon: TrendingUp,
    title: "Financial Advisors",
    blurb:
      "Wealth planning, investment strategy, retirement design, and insurance planning — built for the long view.",
    cta: "Meet an advisor",
    to: "/dealdesk?intent=financial_advisor",
    leadType: "financial_advisor",
  },
  {
    icon: Receipt,
    title: "Accountants & CPAs",
    blurb:
      "Tax strategy, entity structuring, investor accounting, and bookkeeping that scales with your portfolio.",
    cta: "Talk to a CPA",
    to: "/dealdesk?intent=accounting",
    leadType: "accounting",
  },
  {
    icon: PiggyBank,
    title: "Business Owner Capital",
    blurb:
      "Expansion, property acquisition, equipment financing, and working capital for Capital District operators.",
    cta: "Explore capital",
    to: "/dealdesk?intent=business_capital",
    leadType: "business_capital",
  },
  {
    icon: ShieldCheck,
    title: "Insurance & Risk Planning",
    blurb:
      "Life, business, property, landlord, and umbrella policies from advisors who know the local market.",
    cta: "Plan coverage",
    to: "/dealdesk?intent=insurance",
    leadType: "insurance",
  },
  {
    icon: Calculator,
    title: "Analyze a Deal",
    blurb:
      "Open the underwriting console — cash flow, cap rate, DSCR, and pro forma in one place.",
    cta: "Run the numbers",
    to: "/investor-tools",
  },
];

const partners = [
  {
    icon: Banknote,
    label: "Mortgage",
    blurb: "Purchase, refinance, FHA, VA, jumbo, and investor loans from local lenders.",
    leadType: "mortgage",
  },
  {
    icon: Landmark,
    label: "Banking",
    blurb: "Community banks and credit unions for personal, business, and lending relationships.",
    leadType: "banking",
  },
  {
    icon: TrendingUp,
    label: "Financial Planning",
    blurb: "Independent advisors and planners for retirement, wealth, and legacy strategy.",
    leadType: "financial_advisor",
  },
  {
    icon: Receipt,
    label: "Accounting / Tax",
    blurb: "CPAs and tax pros for individuals, investors, and Capital District small businesses.",
    leadType: "accounting",
  },
  {
    icon: ShieldCheck,
    label: "Insurance",
    blurb: "Life, business, property, landlord, and risk-planning specialists.",
    leadType: "insurance",
  },
  {
    icon: Briefcase,
    label: "Commercial Lending",
    blurb: "Multifamily, mixed-use, and owner-occupied commercial financing partners.",
    leadType: "commercial_lending",
  },
  {
    icon: PiggyBank,
    label: "Business Capital",
    blurb: "Working capital, SBA, equipment, and growth financing for operators.",
    leadType: "business_capital",
  },
];

const FinancialConsole = () => {
  return (
    <>
      <Helmet>
        <title>Capital District Financial Console | Capital District Nest</title>
        <meta
          name="description"
          content="The local financial hub of the Capital District. Mortgage, banking, financial advisors, accountants, insurance, commercial lending, and investment analysis — all in one console."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/financial-console" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="px-[5%] pt-16 pb-12 md:pt-24 md:pb-20 border-b border-border/60">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-[0.18em] mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Capital District Financial Console
            </div>
            <h1 className="h-hero text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
              The financial engine of the
              <span className="text-primary"> Capital District.</span>
            </h1>
            <p className="body-apple mt-5 max-w-2xl text-white/70 text-lg">
              Mortgages, banking, financial advisors, accountants, insurance, commercial lending, and
              investment analysis — one console, every local partner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dealdesk"
                className="btn-dark-cta inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Request an Introduction <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/investor-tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-primary hover:text-primary transition"
              >
                Run the numbers
              </Link>
            </div>
          </div>
        </section>

        {/* FINANCIAL PRODUCT HUB */}
        <section className="px-[5%] py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="eyebrow-apple text-primary text-xs uppercase tracking-[0.18em] mb-2">
                Financial Product Hub
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Pick the path that matches your move.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hubs.map((h) => (
                <Link
                  key={h.title}
                  to={h.to}
                  className="group relative rounded-2xl p-6 bg-card border border-border hover:border-primary/60 transition-colors lift-hover"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{h.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-5">{h.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    {h.cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR / ANALYZER STRIP */}
        <section className="px-[5%] py-14 border-y border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <p className="eyebrow-apple text-primary text-xs uppercase tracking-[0.18em] mb-2">
                Underwriting Console
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                Cash flow, cap rate, and DSCR — before you offer.
              </h2>
              <p className="text-white/65 max-w-xl">
                Underwrite any Capital District property with investor-grade math. Pro forma rents,
                expenses, financing scenarios, and a same-day Deal Desk review.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/investor-tools"
                className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Open Analyzer
              </Link>
              <Link
                to="/dealdesk"
                className="px-5 py-3 rounded-full border border-white/20 hover:border-primary hover:text-primary transition"
              >
                Deal Desk Review
              </Link>
            </div>
          </div>
        </section>

        {/* PARTNER NETWORK */}
        <section className="px-[5%] py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow-apple text-primary text-xs uppercase tracking-[0.18em] mb-2">
                Capital District Financial Partner Network
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Local lenders, advisors, accountants, and insurance pros.
              </h2>
              <p className="text-white/65">
                Connect with vetted Capital District mortgage lenders, banks, financial advisors,
                accountants, insurance professionals, and commercial lending partners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2xl p-6 border border-border bg-card/80 backdrop-blur-md hover:border-primary/60 transition-colors group"
                  style={{ background: "rgba(15, 18, 28, 0.7)" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{p.label}</h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-5">{p.blurb}</p>
                  <Link
                    to={`/dealdesk?intent=${p.leadType}`}
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:translate-x-0.5 transition-transform"
                  >
                    Request Introduction <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl p-6 md:p-8 border border-primary/30 bg-primary/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">Are you a local financial partner?</h3>
                <p className="text-white/70 text-sm max-w-xl">
                  Mortgage lenders, CPAs, advisors, banks, and insurance pros — join the Capital
                  District Financial Console.
                </p>
              </div>
              <Link
                to="/claim-business"
                className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition whitespace-nowrap"
              >
                Apply to join
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FinancialConsole;
