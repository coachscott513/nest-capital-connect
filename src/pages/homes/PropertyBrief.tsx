import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Calculator,
  Wallet,
  Phone,
  ExternalLink,
  MapPin,
  Building2,
  Home,
  Receipt,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import ListingAgentModal from "@/components/homes/ListingAgentModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getHomesTown } from "@/data/homesTowns";
import { getFeaturedProperty } from "@/data/featuredProperties";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;

const PropertyBrief = () => {
  const params = useParams<{ townSlug: string; addressSlug: string }>();
  const location = useLocation();
  // Featured-property routes are registered with literal path segments, so
  // useParams() returns empty. Fall back to parsing the pathname so the
  // "View Property Brief" button resolves correctly in both cases.
  const pathParts = location.pathname.replace(/\/+$/, "").split("/");
  const townSlug = params.townSlug ?? pathParts[pathParts.length - 2];
  const addressSlug = params.addressSlug ?? pathParts[pathParts.length - 1];
  const town = getHomesTown(townSlug);
  const property = getFeaturedProperty(townSlug, addressSlug);
  const [agentOpen, setAgentOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [townSlug, addressSlug]);

  // Calculator state — initialized from property defaults
  const [purchasePrice, setPurchasePrice] = useState(property?.price ?? 325000);
  const [downPct, setDownPct] = useState(25);
  const [rate, setRate] = useState(7.25);
  const [termYears, setTermYears] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(property?.projectedMonthlyRent ?? 5500);
  const [annualTaxes, setAnnualTaxes] = useState(property?.annualTaxes ?? 7591);
  const [monthlyInsurance, setMonthlyInsurance] = useState(250);
  const [annualUtilities, setAnnualUtilities] = useState(property?.annualSellerPaidUtilities ?? 0);
  const [vacancyPct, setVacancyPct] = useState(5);
  const [maintPct, setMaintPct] = useState(5);
  const [mgmtPct, setMgmtPct] = useState(8);

  const calc = useMemo(() => {
    const down = (purchasePrice * downPct) / 100;
    const loan = purchasePrice - down;
    const r = rate / 100 / 12;
    const n = termYears * 12;
    const piMonthly = r > 0 ? (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1) : loan / n;
    const taxMonthly = annualTaxes / 12;
    const utilMonthly = annualUtilities / 12;
    const vacancy = (monthlyRent * vacancyPct) / 100;
    const maint = (monthlyRent * maintPct) / 100;
    const mgmt = (monthlyRent * mgmtPct) / 100;
    const totalExpense = piMonthly + taxMonthly + monthlyInsurance + utilMonthly + vacancy + maint + mgmt;
    const monthlyCashFlow = monthlyRent - totalExpense;
    const annualCashFlow = monthlyCashFlow * 12;
    const noi = monthlyRent * 12 - (annualTaxes + monthlyInsurance * 12 + annualUtilities + (vacancy + maint + mgmt) * 12);
    const capRate = purchasePrice > 0 ? noi / purchasePrice : 0;
    const cashIn = down + purchasePrice * 0.04; // est closing 4%
    const coc = cashIn > 0 ? annualCashFlow / cashIn : 0;
    return { down, loan, piMonthly, taxMonthly, utilMonthly, vacancy, maint, mgmt, totalExpense, monthlyCashFlow, annualCashFlow, capRate, cashIn, coc };
  }, [purchasePrice, downPct, rate, termYears, monthlyRent, annualTaxes, monthlyInsurance, annualUtilities, vacancyPct, maintPct, mgmtPct]);

  if (!town || !property) return <Navigate to={`/homes/listings/${townSlug ?? ""}`} replace />;

  const title = `${property.address.line1} Property Brief | Capital District Nest`;
  const description = `${property.propertyType} in ${property.address.city}, NY. ${property.beds} bed · ${property.baths} bath · ${property.sqft.toLocaleString()} sqft. Listed at ${fmtMoney(property.price)}. Local property brief with investor numbers and source links.`;
  const canonical = `https://www.capitaldistrictnest.com/homes/listings/${property.townSlug}/${property.slug}`;

  const analyzerHref = `/investment-analyzer?town=${property.townSlug}&property_type=multi_family&price=${property.price}&rent=${property.projectedMonthlyRent ?? ""}&taxes=${property.annualTaxes}&utilities=${property.annualSellerPaidUtilities ?? ""}`;
  const cashHref = `/investment-analyzer?tab=first-time-buyer&town=${property.townSlug}&price=${property.price}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link
            to={`/homes/listings/${property.townSlug}`}
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {town.name} property board
          </Link>

          <div className="eyebrow-apple text-[#5eead4] mb-3">FEATURED {town.name.toUpperCase()} PROPERTY BRIEF</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {property.address.line1}
          </h1>
          <p className="body-apple-dark max-w-2xl mb-5">
            {property.propertyType} in {property.address.city} with projected
            rent potential up to {fmtMoney(property.projectedMonthlyRent ?? 0)}/month.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Chip tone="amber">{property.listingStatus}</Chip>
            <Chip>Source: {property.mls.name} #{property.mls.number}</Chip>
            <Chip>{property.brokerage.name}</Chip>
            <Chip>Built {property.yearBuilt}</Chip>
            <Chip>${property.pricePerSqft}/sqft</Chip>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <Stat label="Price" value={fmtMoney(property.price)} />
            <Stat label="Beds" value={property.beds} />
            <Stat label="Baths" value={property.baths} />
            <Stat label="Sqft" value={property.sqft.toLocaleString()} />
            <Stat label="$/sqft" value={`$${property.pricePerSqft}`} />
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap gap-2">
            <Link to={analyzerHref} className="btn-primary-apple inline-flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Analyze Numbers
            </Link>
            <Link to={cashHref} className="btn-secondary-apple-dark inline-flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Estimate Cash to Buy
            </Link>
            <button onClick={() => setAgentOpen(true)} className="btn-dark-cta inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> Contact Listing Agent
            </button>
            <a href={property.source.url} target="_blank" rel="noopener noreferrer" className="btn-secondary-apple-dark inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Original Source
            </a>
          </div>
        </div>
      </section>

      {/* MAIN + SIDEBAR */}
      <section className="px-[5%] py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-4">
            <Section icon={<Home className="w-4 h-4" />} title="Overview">
              <p className="text-sm text-white/75 leading-relaxed">{property.summary}</p>
            </Section>

            <Section icon={<Building2 className="w-4 h-4" />} title="Investment Snapshot">
              <Grid2>
                <KV k="Purchase price" v={fmtMoney(property.price)} />
                <KV k="Projected gross rent" v={`${fmtMoney(property.projectedMonthlyRent ?? 0)}/mo`} />
                <KV k="Annual gross rent" v={fmtMoney((property.projectedMonthlyRent ?? 0) * 12)} />
                <KV k="Annual taxes" v={fmtMoney(property.annualTaxes)} />
                <KV k="Annual seller-paid utilities" v={fmtMoney(property.annualSellerPaidUtilities ?? 0)} />
                <KV k="Price per sqft" v={`$${property.pricePerSqft}`} />
                <KV k="Property type" v={property.propertyType} />
                <KV k="Garage" v={property.garage ?? "—"} />
              </Grid2>
            </Section>

            <Accordion type="multiple" className="space-y-3">
              <Drawer value="details" title="Property Details">
                <Grid2>
                  <KV k="Subtype" v={property.propertyType} />
                  <KV k="Year built" v={property.yearBuilt} />
                  <KV k="Lot size" v={`${property.lotSizeSqft.toLocaleString()} sqft`} />
                  <KV k="Garage spaces" v={2} />
                  <KV k="Parking" v={property.parking ?? "—"} />
                  <KV k="Attached structure" v={property.details.attachedStructure ?? "—"} />
                  <KV k="Exterior" v={property.details.exterior ?? "—"} />
                  <KV k="Roof" v={property.details.roof ?? "—"} />
                  <KV k="Foundation" v={property.details.foundation ?? "—"} />
                  <KV k="Sewer" v={property.sewer ?? "—"} />
                  <KV k="Water" v={property.water ?? "—"} />
                </Grid2>
              </Drawer>

              <Drawer value="interior" title="Interior">
                <Grid2>
                  <KV k="Bedrooms" v={property.beds} />
                  <KV k="Bathrooms" v={property.baths} />
                  <KV k="Full baths" v={property.interior.fullBaths ?? "—"} />
                  <KV k="Heating" v={property.heating ?? "—"} />
                  <KV k="Cooling" v={property.cooling ?? "—"} />
                  <KV k="Flooring" v={property.interior.flooring ?? "—"} />
                  <KV k="Basement" v={property.interior.basement ?? "—"} />
                  <KV k="Fireplace" v={property.interior.fireplace ?? "—"} />
                  <KV k="Laundry" v={property.interior.laundry ?? "—"} />
                </Grid2>
              </Drawer>

              <Drawer value="taxes" title="Taxes & Financial">
                <Grid2>
                  <KV k="Annual taxes" v={fmtMoney(property.annualTaxes)} />
                  <KV k="Tax assessed value" v={fmtMoney(property.taxAssessedValue ?? 0)} />
                  <KV k="Ownership" v={property.financial.ownership ?? "—"} />
                  <KV k="Tenant pays" v={property.financial.tenantPays ?? "—"} />
                  <KV k="Seller-paid utilities" v={`~${fmtMoney(property.annualSellerPaidUtilities ?? 0)}/yr`} />
                </Grid2>
              </Drawer>

              <Drawer value="location" title="Location" icon={<MapPin className="w-4 h-4" />}>
                <p className="text-sm text-white/75 mb-3">
                  {property.address.city}, {property.address.state} {property.address.zip}
                </p>
                <p className="text-sm text-white/65 mb-4">
                  Near {property.location.nearby.join(", ")}.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Stat label="Walk" value={`${property.walkScore ?? "—"}`} />
                  <Stat label="Transit" value={`${property.transitScore ?? "—"}`} />
                  <Stat label="Bike" value={`${property.bikeScore ?? "—"}`} />
                </div>
              </Drawer>

              <Drawer value="schools" title="Schools" icon={<GraduationCap className="w-4 h-4" />}>
                <ul className="text-sm text-white/75 space-y-1.5 list-disc pl-5">
                  {property.schools.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p className="text-[11px] text-white/50 mt-3">
                  School assignments and ratings should be confirmed with the local district.
                </p>
              </Drawer>

              <Drawer value="source" title="Source & Disclaimer" icon={<ShieldCheck className="w-4 h-4" />}>
                <div className="space-y-2 text-sm text-white/75">
                  <div>Original source: <a className="text-[#5eead4] underline" href={property.source.url} target="_blank" rel="noopener noreferrer">View {property.source.name} listing</a></div>
                  <div>Listing source: {property.mls.name} #{property.mls.number}</div>
                </div>
                <p className="text-[11px] text-white/55 mt-3 leading-relaxed">
                  Capital District Nest is a local media, directory, advertising,
                  and community search platform. This property brief is for
                  informational and discovery purposes only. Capital District
                  Nest does not represent buyers or sellers and does not
                  participate in real estate transactions. Contact the listing
                  source or listing agent directly for property inquiries. All
                  information should be independently verified.
                </p>
              </Drawer>
            </Accordion>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Compact calculator */}
            <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-5">
              <div className="eyebrow-apple text-[#5eead4] mb-2">MONTHLY NUMBERS</div>
              <div className="text-lg font-semibold text-white mb-4">Investor calculator</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Field label="Price" value={purchasePrice} onChange={setPurchasePrice} />
                <Field label="Down %" value={downPct} onChange={setDownPct} />
                <Field label="Rate %" value={rate} onChange={setRate} step={0.125} />
                <Field label="Term yrs" value={termYears} onChange={setTermYears} />
                <Field label="Rent/mo" value={monthlyRent} onChange={setMonthlyRent} />
                <Field label="Taxes/yr" value={annualTaxes} onChange={setAnnualTaxes} />
                <Field label="Ins/mo" value={monthlyInsurance} onChange={setMonthlyInsurance} />
                <Field label="Util/yr" value={annualUtilities} onChange={setAnnualUtilities} />
                <Field label="Vacancy %" value={vacancyPct} onChange={setVacancyPct} />
                <Field label="Maint %" value={maintPct} onChange={setMaintPct} />
                <Field label="Mgmt %" value={mgmtPct} onChange={setMgmtPct} />
              </div>
              <div className="space-y-1.5 text-sm pt-3 border-t border-white/10">
                <Out k="Down payment" v={fmtMoney(calc.down)} />
                <Out k="Loan amount" v={fmtMoney(calc.loan)} />
                <Out k="P&I (mo)" v={fmtMoney(calc.piMonthly)} />
                <Out k="Taxes (mo)" v={fmtMoney(calc.taxMonthly)} />
                <Out k="Utilities (mo)" v={fmtMoney(calc.utilMonthly)} />
                <Out k="Vacancy reserve" v={fmtMoney(calc.vacancy)} />
                <Out k="Maint reserve" v={fmtMoney(calc.maint)} />
                <Out k="Mgmt reserve" v={fmtMoney(calc.mgmt)} />
                <Out k="Total expenses" v={fmtMoney(calc.totalExpense)} />
                <div className="pt-2 mt-2 border-t border-white/10 space-y-1.5">
                  <Out k="Monthly cash flow" v={fmtMoney(calc.monthlyCashFlow)} highlight />
                  <Out k="Annual cash flow" v={fmtMoney(calc.annualCashFlow)} />
                  <Out k="Cap rate" v={fmtPct(calc.capRate)} />
                  <Out k="Cash-on-cash" v={fmtPct(calc.coc)} />
                  <Out k="Est. cash to close" v={fmtMoney(calc.cashIn)} />
                </div>
              </div>
              <p className="text-[10px] text-white/45 mt-3">
                Estimates only. Verify with lender, attorney, inspector, and tax pro.
              </p>
            </div>

            {/* Listing agent card */}
            <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-5">
              <div className="eyebrow-apple text-[#5eead4] mb-2">LISTING AGENT</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#5eead4]/15 border border-[#5eead4]/30 flex items-center justify-center text-[#5eead4] font-semibold">
                  {property.agent.initials}
                </div>
                <div>
                  <div className="text-white font-semibold leading-tight">{property.agent.name}</div>
                  <div className="text-xs text-white/65">{property.brokerage.name}</div>
                </div>
              </div>
              <button onClick={() => setAgentOpen(true)} className="btn-primary-apple w-full inline-flex justify-center items-center gap-2 mb-2">
                <Phone className="w-4 h-4" /> Contact Listing Agent
              </button>
              <a href={property.source.url} target="_blank" rel="noopener noreferrer" className="btn-secondary-apple-dark w-full inline-flex justify-center items-center gap-2">
                <ExternalLink className="w-4 h-4" /> View Original Source
              </a>
              <p className="text-[10px] text-white/45 mt-3">
                Source: {property.mls.name} #{property.mls.number}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile sticky action bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0B0F19]/95 border-t border-white/10 backdrop-blur z-40">
        <div className="grid grid-cols-4 gap-1 p-2 text-[11px]">
          <Link to={analyzerHref} className="flex flex-col items-center gap-1 py-1.5 text-white"><Calculator className="w-4 h-4" />Analyze</Link>
          <Link to={cashHref} className="flex flex-col items-center gap-1 py-1.5 text-white"><Wallet className="w-4 h-4" />Cash</Link>
          <button onClick={() => setAgentOpen(true)} className="flex flex-col items-center gap-1 py-1.5 text-white"><Phone className="w-4 h-4" />Agent</button>
          <a href={property.source.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-1.5 text-white"><ExternalLink className="w-4 h-4" />Source</a>
        </div>
      </div>

      <ListingAgentModal open={agentOpen} onOpenChange={setAgentOpen} property={property} />

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const Chip = ({ children, tone }: { children: React.ReactNode; tone?: "amber" }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider border ${
      tone === "amber"
        ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
        : "border-white/15 bg-white/5 text-white/75"
    }`}
  >
    {children}
  </span>
);

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl border border-white/10 bg-[#1E2230] px-4 py-3">
    <div className="text-white font-semibold text-lg">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-white/55 mt-0.5">{label}</div>
  </div>
);

const Section = ({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-5">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[#5eead4]">{icon}</span>
      <h2 className="text-base font-semibold text-white">{title}</h2>
    </div>
    {children}
  </div>
);

const Drawer = ({ value, title, icon, children }: { value: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <AccordionItem value={value} className="rounded-2xl border border-white/10 bg-[#1E2230] px-5">
    <AccordionTrigger className="text-white hover:no-underline">
      <span className="flex items-center gap-2">
        {icon && <span className="text-[#5eead4]">{icon}</span>}
        {title}
      </span>
    </AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </AccordionItem>
);

const Grid2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">{children}</div>
);

const KV = ({ k, v }: { k: string; v: string | number }) => (
  <div className="flex justify-between gap-3 py-1.5 border-b border-white/5">
    <span className="text-xs uppercase tracking-wider text-white/55">{k}</span>
    <span className="text-sm text-white text-right">{v}</span>
  </div>
);

const Field = ({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (n: number) => void; step?: number }) => (
  <div>
    <Label className="text-[10px] uppercase tracking-wider text-white/55">{label}</Label>
    <Input
      type="number"
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="bg-[#0B0F19] border-white/15 text-white h-8 text-sm mt-1"
    />
  </div>
);

const Out = ({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) => (
  <div className="flex justify-between">
    <span className="text-white/60 text-xs">{k}</span>
    <span className={highlight ? "text-[#5eead4] font-semibold" : "text-white"}>{v}</span>
  </div>
);

export default PropertyBrief;
