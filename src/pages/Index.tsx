import { ArrowRight, MapPin, Phone, MessageCircle, Mail, Globe, Calculator, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { localBusinessSchema } from "@/utils/seoSchemas";

import heroCapital from "@/assets/hero-capital-district.jpg";

/* ============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Structural clone of northfloridanest.com, adapted for the
   Capital District of New York.
   ============================================================ */

/* ---------- Communities (mirrors NFN's 12-tile grid) ---------- */
const COMMUNITIES: { name: string; tagline: string; to: string }[] = [
  { name: "Albany",            tagline: "Capital city, urban revival",            to: "/albany-real-estate" },
  { name: "Delmar",            tagline: "Bethlehem schools, suburban classic",    to: "/living-in-delmar" },
  { name: "Saratoga Springs",  tagline: "Resort town, racing & spas",             to: "/saratoga-real-estate" },
  { name: "Troy",              tagline: "Hudson riverfront, historic collar city",to: "/troy-real-estate" },
  { name: "Schenectady",       tagline: "Stockade, value & cash flow",            to: "/schenectady-real-estate" },
  { name: "Clifton Park",      tagline: "Shen schools, family suburbs",           to: "/clifton-park-intelligence" },
  { name: "Niskayuna",         tagline: "Top-rated schools, GE country",          to: "/towns/niskayuna" },
  { name: "Voorheesville",     tagline: "Rural character, Helderberg views",      to: "/towns/voorheesville" },
  { name: "Guilderland",       tagline: "Western suburb, Crossgates corridor",    to: "/towns/guilderland" },
  { name: "Queensbury",        tagline: "Lake George gateway, Adirondack edge",   to: "/towns/queensbury" },
  { name: "Amsterdam",         tagline: "Affordable opportunity, Mohawk Valley",  to: "/towns/amsterdam" },
  { name: "Mechanicville",     tagline: "Compact, affordable, commuter-friendly", to: "/towns/mechanicville" },
];

const PHONE_DISPLAY = "(518) 676-2347";
const PHONE_TEL = "+15186762347";
const EMAIL = "scott@capitaldistrictnest.com";

/* ============ SECTION 1 — HERO ============ */
function Hero() {
  const [price, setPrice] = useState<string>("");

  // Quick estimate · 20% down · 7% rate · 30yr · adds taxes(2%) + ins + no HOA
  const monthly = useMemo(() => {
    const p = Number(price.replace(/[^0-9]/g, ""));
    if (!p || p < 50000) return null;
    const loan = p * 0.8;
    const r = 0.07 / 12;
    const n = 360;
    const pi = (loan * r) / (1 - Math.pow(1 + r, -n));
    const taxes = (p * 0.022) / 12; // CD avg ~2.2%
    const ins = 1500 / 12;
    return Math.round(pi + taxes + ins);
  }, [price]);

  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="relative w-full min-h-[760px] md:min-h-[820px] flex items-center">
        <img
          src={heroCapital}
          alt="Capital District at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />

        <div className="relative z-10 w-full px-6 py-20 md:py-28 text-center text-white">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/80 mb-6">
            Welcome to
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-semibold tracking-[-0.035em] leading-[0.95]">
            Capital District{" "}
            <span className="text-primary-glow bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Nest
            </span>
          </h1>
          <p className="mt-6 text-2xl md:text-3xl lg:text-4xl font-light text-white/95">
            Albany to Saratoga Springs
          </p>
          <p className="mt-4 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/75">
            Historic · Suburban · Investor-Friendly · Lake & Mountain Access
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/85 font-light leading-relaxed">
            Albany, Delmar, Saratoga, Troy, Schenectady, and the Capital Region — analyzed honestly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/investment-analyzer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors text-base shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              Analyze Your Purchase
            </Link>
            <Link
              to="/homes-for-sale"
              className="inline-flex flex-col items-center gap-0.5 border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded-full transition-colors backdrop-blur-sm"
            >
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />Explore Homes</span>
              <span className="text-[10px] font-normal text-white/70 tracking-wide">View Live MLS Listings · Updated Daily</span>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />Live Agent Available</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />Rentals · Investment · Relocation</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" />NYC & International Buyers Welcome</span>
          </div>

          {/* Inline mortgage estimator */}
          <div className="mt-12 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter purchase price → see estimated monthly"
                className="w-full h-14 px-6 rounded-full bg-white/95 text-foreground placeholder:text-muted-foreground text-base font-medium focus:outline-none focus:ring-4 focus:ring-primary/40 shadow-xl"
              />
              {monthly && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-bold">
                  ~${monthly.toLocaleString()}/mo
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-white/70">
              Quick estimate · 20% down · 7% rate · includes NY taxes & insurance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 2 — COMMUNITIES ============ */
function Communities() {
  return (
    <section id="communities" className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Areas We Cover</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Capital District Communities
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            From the Hudson to the Adirondacks — we know every neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {COMMUNITIES.map((c) => (
            <Link
              key={c.name}
              to={c.to}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {c.name}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-snug">{c.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore {c.name} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Live MLS listings via RE/MAX · Updated daily · Opens in a new tab
        </p>
      </div>
    </section>
  );
}

/* ============ SECTION 3 — ANALYZE / RUN THE NUMBERS ============ */
const PROPERTY_TYPES = ["Single Family", "Condo", "Multifamily", "Rental", "Luxury"] as const;
type PType = typeof PROPERTY_TYPES[number];

function Analyze() {
  const [pType, setPType] = useState<PType>("Single Family");
  const [price, setPrice] = useState("325000");
  const [down, setDown] = useState("20");
  const [rate, setRate] = useState("7.0");
  const [taxes, setTaxes] = useState("7150");   // ~2.2% on $325k (CD avg)
  const [ins, setIns] = useState("1500");
  const [hoa, setHoa] = useState("0");
  const [rent, setRent] = useState("");
  const [shown, setShown] = useState(false);

  const result = useMemo(() => {
    const p = Number(price) || 0;
    const dp = (Number(down) / 100) * p;
    const loan = p - dp;
    const r = (Number(rate) / 100) / 12;
    const n = 360;
    const pi = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
    const monthlyTaxes = (Number(taxes) || 0) / 12;
    const monthlyIns = (Number(ins) || 0) / 12;
    const monthlyHoa = Number(hoa) || 0;
    const totalMonthly = pi + monthlyTaxes + monthlyIns + monthlyHoa;
    const monthlyRent = Number(rent) || 0;
    const cashFlow = monthlyRent - totalMonthly;
    return {
      pi: Math.round(pi),
      taxes: Math.round(monthlyTaxes),
      ins: Math.round(monthlyIns),
      hoa: Math.round(monthlyHoa),
      total: Math.round(totalMonthly),
      cashFlow: Math.round(cashFlow),
      hasRent: monthlyRent > 0,
    };
  }, [price, down, rate, taxes, ins, hoa, rent]);

  return (
    <section className="bg-card border-y border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Live Investment Analysis</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Analyze Your Purchase
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            Instantly estimate monthly cost, ownership expenses, and investment potential before you commit.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Capital District buyers face high property taxes (~2–3%) and seasonal heating costs. Get a fast, honest estimate in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Calculator */}
          <div className="bg-background border border-border rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-1">Run the Numbers</h3>
            <p className="text-sm text-muted-foreground mb-6">How are you buying?</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setPType(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    pType === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
              <Field label="Down Payment (%)" value={down} onChange={setDown} suffix="%" />
              <Field label="Interest Rate (%)" value={rate} onChange={setRate} suffix="%" />
              <Field label="Annual Taxes" value={taxes} onChange={setTaxes} prefix="$" />
              <Field label="Annual Insurance" value={ins} onChange={setIns} prefix="$" />
              <Field label="HOA / Condo Fee" value={hoa} onChange={setHoa} prefix="$" />
              <div className="col-span-2">
                <Field label="Estimated Rent (optional)" value={rent} onChange={setRent} prefix="$" placeholder="Monthly rent if renting out" />
              </div>
            </div>

            <button
              onClick={() => setShown(true)}
              className="mt-6 w-full bg-foreground text-background font-semibold py-3.5 rounded-full hover:bg-foreground/90 transition-colors"
            >
              Analyze Purchase
            </button>
            <Link to="/investment-analyzer" className="mt-3 block text-center text-sm text-primary hover:underline">
              Open the full analyzer →
            </Link>
          </div>

          {/* Breakdown */}
          <div className="bg-foreground text-background rounded-3xl p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-background/60 mb-2">Your Breakdown</p>
            <h3 className="text-2xl font-semibold mb-6">{pType}</h3>

            {!shown ? (
              <p className="text-background/70 italic py-12 text-center">
                Enter a purchase price and click <span className="font-medium text-background">Analyze Purchase</span> to see your breakdown.
              </p>
            ) : (
              <div className="space-y-4">
                <Row label="Principal & Interest" value={`$${result.pi.toLocaleString()}/mo`} />
                <Row label="Property Taxes" value={`$${result.taxes.toLocaleString()}/mo`} />
                <Row label="Insurance" value={`$${result.ins.toLocaleString()}/mo`} />
                {result.hoa > 0 && <Row label="HOA / Condo Fee" value={`$${result.hoa.toLocaleString()}/mo`} />}
                <div className="h-px bg-background/15 my-4" />
                <Row label="Total Monthly Cost" value={`$${result.total.toLocaleString()}/mo`} bold />
                {result.hasRent && (
                  <>
                    <div className="h-px bg-background/15 my-4" />
                    <Row
                      label="Estimated Cash Flow"
                      value={`${result.cashFlow >= 0 ? "+" : "-"}$${Math.abs(result.cashFlow).toLocaleString()}/mo`}
                      accent={result.cashFlow >= 0 ? "emerald" : "rose"}
                      bold
                    />
                  </>
                )}
                <p className="mt-6 text-xs text-background/60 leading-relaxed">
                  Estimate only. Capital District taxes vary by school district — Bethlehem, Niskayuna, and Shen run higher than Albany city.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const Field = ({ label, value, onChange, prefix, suffix, placeholder }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string; placeholder?: string }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">{label}</span>
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{prefix}</span>}
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-11 ${prefix ? "pl-7" : "pl-3"} ${suffix ? "pr-8" : "pr-3"} rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30`}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{suffix}</span>}
    </div>
  </label>
);

const Row = ({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: "emerald" | "rose" }) => (
  <div className="flex justify-between items-baseline">
    <span className={`text-sm ${bold ? "text-background font-semibold" : "text-background/70"}`}>{label}</span>
    <span className={`tabular-nums ${bold ? "text-2xl font-bold" : "text-base font-medium"} ${accent === "emerald" ? "text-emerald-400" : accent === "rose" ? "text-rose-400" : "text-background"}`}>
      {value}
    </span>
  </div>
);

/* ============ SECTION 4 — TRUE COST ============ */
function TrueCost() {
  const items = [
    { label: "Purchase Price",     value: "$325,000",   sub: "Capital District median" },
    { label: "Monthly Payment",    value: "$1,732",     sub: "Principal & interest @7%, 20% down" },
    { label: "Property Taxes",     value: "$7,150/yr",  sub: "~2.2% of value (varies by district)" },
    { label: "Insurance",          value: "$1,500/yr",  sub: "Standard NY homeowners" },
    { label: "Heating (winter)",   value: "$2,400/yr",  sub: "Gas heat, 6-month season" },
    { label: "Total Monthly",      value: "$2,650",     sub: "All-in estimate" },
  ];
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">True Cost</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            What It Really Costs in the Capital District
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            Beyond the listing price — taxes, insurance, heating, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((i) => (
            <div key={i.label} className="bg-card border border-border rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{i.label}</p>
              <p className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">{i.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{i.sub}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-base text-muted-foreground italic max-w-2xl mx-auto">
          Most Capital District buyers underestimate this by <span className="font-semibold text-foreground">$900–$1,400/month</span> — taxes and heating are the silent killers.
        </p>
      </div>
    </section>
  );
}

/* ============ SECTION 5 — COMPARE ============ */
function Compare() {
  const rows = [
    { label: "Property Taxes",  sf: "Owner pays directly",      multi: "Owner pays, tenant rent offsets",   condo: "Lower assessment" },
    { label: "Maintenance",     sf: "Owner responsible",        multi: "Owner responsible",                 condo: "Lower personal cost" },
    { label: "Financing",       sf: "Easier approval",          multi: "Investor rates, 25% down",          condo: "More restrictions" },
    { label: "Heating (NY)",    sf: "Full responsibility",      multi: "Often tenant-paid",                 condo: "Often included in HOA" },
    { label: "Appreciation",    sf: "Land + structure",         multi: "Cash flow + appreciation",          condo: "Market-dependent" },
    { label: "Best Use",        sf: "Live & build equity",      multi: "House hack or income",              condo: "Lock-and-leave" },
  ];
  return (
    <section className="bg-card border-y border-border py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Compare</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Compare Before You Buy
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            Trade-offs between property types in the Capital District.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-background">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"></th>
                <th className="px-6 py-4 text-sm font-semibold text-foreground">Single Family</th>
                <th className="px-6 py-4 text-sm font-semibold text-foreground">Multifamily</th>
                <th className="px-6 py-4 text-sm font-semibold text-foreground">Condo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "bg-muted/30" : ""}>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{r.label}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{r.sf}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{r.multi}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{r.condo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 6 — MARKET QUIZ ============ */
function Quiz() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Market Match</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
          Which Capital District Market Fits You?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light">
          Answer 6 quick questions and get a personalized town recommendation based on your lifestyle, budget, and goals.
        </p>
        <Link
          to="/communities"
          className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors"
        >
          Find My Town <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">Takes about 60 seconds · No sign-up required</p>
      </div>
    </section>
  );
}

/* ============ SECTION 7 — CHOOSE PROPERTY TYPE ============ */
function PropertyTypes() {
  const types = [
    { name: "Single Family",  desc: "Land, school district, taxes, ownership costs",      to: "/analyze/single-family" },
    { name: "Condo",          desc: "HOA, reserves, insurance, special assessments",      to: "/analyze/condo" },
    { name: "Multifamily",    desc: "House-hack, cash flow, cap rate analysis",           to: "/analyze/multifamily" },
    { name: "Rental",         desc: "Cash flow, vacancy, NY landlord considerations",     to: "/analyze/rental" },
    { name: "Luxury",         desc: "Saratoga, Niskayuna, jumbo financing, carry costs",  to: "/analyze/luxury" },
    { name: "Land",           desc: "Build sites, septic, percolation, zoning",           to: "/analyze/land" },
  ];
  return (
    <section className="bg-card border-y border-border py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Analysis</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Choose Your Property Type
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            Different properties require different strategies in the Capital District.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((t) => (
            <Link
              key={t.name}
              to={t.to}
              className="group block bg-background border border-border rounded-2xl p-7 hover:border-primary hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {t.name}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Analyze {t.name} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 8 — INTERNATIONAL / RELOCATION ============ */
function Relocation() {
  const cards = [
    { icon: "🏙️", title: "NYC & Downstate Buyers",    desc: "Moving upstate? We help with remote tours, virtual closings, and relocation logistics." },
    { icon: "🌍", title: "International Buyers",        desc: "Foreign national financing, ITIN loans, and visa-friendly purchase guidance." },
    { icon: "💬", title: "Live Concierge Support",      desc: "Text, WhatsApp, or call — connect with a real human, not a chatbot." },
  ];
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Global & Downstate Reach</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Buying from Outside the Region?
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            We help NYC, downstate, and international buyers navigate financing, taxes, and ownership in upstate NY.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-2xl p-7">
              <div className="text-4xl mb-4">{c.icon}</div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight">{c.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Get Help as a Relocating Buyer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 9 — MULTIFAMILY FOCUS (CD's "condo" equivalent) ============ */
function MultifamilyFocus() {
  return (
    <section className="bg-foreground text-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400 mb-4">Multifamily</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
            Buying a 2–4 Unit in Albany Is Different.
          </h2>
          <p className="mt-6 text-lg text-background/80 font-light leading-relaxed">
            Albany, Troy, and Schenectady are some of the strongest cash-flow markets in the Northeast — but tenant law, certificate of occupancy, and Section 8 dynamics matter before you offer.
          </p>
          <Link
            to="/analyze/multifamily"
            className="mt-8 inline-flex items-center gap-2 bg-amber-400 text-foreground font-semibold px-7 py-3.5 rounded-full hover:bg-amber-300 transition-colors"
          >
            Run Multifamily Numbers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-5">
          {[
            { title: "Rent Roll & Cap Rate",      desc: "Real numbers from Albany County leases, not pro-forma fantasy." },
            { title: "NY Tenant Law",             desc: "Good Cause Eviction, security deposits, lease assumptions matter." },
            { title: "Certificate of Occupancy",  desc: "Many CD multis lose units at sale — verify CO before closing." },
          ].map((b) => (
            <div key={b.title} className="border-l-2 border-amber-400 pl-5">
              <h3 className="text-lg font-semibold">{b.title}</h3>
              <p className="text-sm text-background/70 mt-1 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 10 — FINANCING ============ */
function Financing() {
  const [income, setIncome] = useState("100000");
  const [downPay, setDownPay] = useState("40000");
  const [debts, setDebts] = useState("500");
  const [shown, setShown] = useState(false);

  const max = useMemo(() => {
    const i = Number(income) / 12;
    const d = Number(debts);
    const dp = Number(downPay);
    // 36% DTI rule, back into purchase price assuming 7% / 30yr
    const maxPI = i * 0.36 - d;
    const maxLoan = maxPI > 0 ? (maxPI / ((0.07 / 12) / (1 - Math.pow(1 + 0.07 / 12, -360)))) : 0;
    return Math.round(maxLoan + dp);
  }, [income, downPay, debts]);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Financing</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Financing Starts Before the Search
          </h2>
          <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed">
            The Capital District's lower price points and conventional-friendly lending make it accessible for first-time buyers, NYC transplants, and investors alike.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Get pre-approved before browsing",
              "Compare conventional, FHA, VA, USDA & jumbo options",
              "Factor in NY transfer tax and mansion tax",
              "Plan for taxes, insurance, heating reserves",
              "Use SONYMA & first-time buyer grants",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link to="/financing" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            Explore Financing Options <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-3xl p-7 md:p-8">
          <h3 className="text-xl font-semibold text-foreground">Quick Estimate</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6">See what you could afford</p>
          <div className="space-y-4">
            <Field label="Annual Income" value={income} onChange={setIncome} prefix="$" />
            <Field label="Down Payment Saved" value={downPay} onChange={setDownPay} prefix="$" />
            <Field label="Monthly Debts" value={debts} onChange={setDebts} prefix="$" />
          </div>
          <button
            onClick={() => setShown(true)}
            className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-full hover:bg-primary/90 transition-colors"
          >
            Calculate Estimate
          </button>
          {shown && (
            <div className="mt-6 p-5 bg-background rounded-xl text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated Max Purchase</p>
              <p className="mt-2 text-4xl font-bold text-foreground tabular-nums">${max.toLocaleString()}</p>
              <p className="mt-2 text-xs text-muted-foreground">Based on 36% DTI, 7% rate, 30yr fixed</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ SECTION 11 — SELLING / VALUATION ============ */
function Selling() {
  const [form, setForm] = useState({ address: "", name: "", email: "", phone: "", timeline: "Just curious" });
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-card border-y border-border py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Selling</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-foreground">
            Thinking About Selling?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed">
            Find out what your Capital District home is worth — no obligation, no pressure.
          </p>
          <ul className="mt-8 space-y-3 text-foreground">
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-0.5" />Honest market analysis based on real data</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-0.5" />Local expertise from Albany to Saratoga</li>
            <li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary mt-0.5" />Response within 24 hours</li>
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-background border border-border rounded-3xl p-7 md:p-8 space-y-4"
        >
          <h3 className="text-xl font-semibold text-foreground">Request Your Free Home Valuation</h3>

          <Input label="Property Address *" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
          <Input label="Your Name *"        value={form.name}    onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="Email *"            value={form.email}   onChange={(v) => setForm({ ...form, email: v })} type="email" required />
          <Input label="Phone *"            value={form.phone}   onChange={(v) => setForm({ ...form, phone: v })} type="tel" required />

          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Timeline to Sell</span>
            <select
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="w-full h-11 px-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option>Just curious</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>6-12 months</option>
              <option>Not sure yet</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full bg-foreground text-background font-semibold py-3.5 rounded-full hover:bg-foreground/90 transition-colors"
          >
            Get My Home Value
          </button>
          {sent && <p className="text-sm text-emerald-600 text-center">Thanks — Scott will reach out within 24 hours.</p>}
          <p className="text-xs text-muted-foreground text-center">No spam, no pressure.</p>
        </form>
      </div>
    </section>
  );
}

const Input = ({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">{label}</span>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 px-3 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  </label>
);

/* ============ SECTION 12 — CONNECT ============ */
function Connect() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Connect</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-foreground">
          Talk to a Capital District Expert
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light">
          Choose the fastest way to connect.
        </p>

        <p className="mt-8 text-base text-foreground">
          Live agent available now: <a href={`tel:${PHONE_TEL}`} className="text-primary font-semibold hover:underline">{PHONE_DISPLAY}</a>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href={`sms:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary transition-colors">
            <MessageCircle className="w-4 h-4" /> Text
          </a>
          <a href={`https://wa.me/${PHONE_TEL.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary transition-colors">
            <Globe className="w-4 h-4" /> WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary transition-colors">
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Capital District Nest — Albany to Saratoga | Homes, Towns & Investment Analysis"
        description="Honest analysis of homes, towns, and investment property across NY's Capital District. Albany, Delmar, Saratoga, Troy, Schenectady & more. Live MLS, real numbers, real local expertise."
        canonical="https://www.capitaldistrictnest.com/"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />
      <main>
        <Hero />
        <Communities />
        <Analyze />
        <TrueCost />
        <Compare />
        <Quiz />
        <PropertyTypes />
        <Relocation />
        <MultifamilyFocus />
        <Financing />
        <Selling />
        <Connect />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
