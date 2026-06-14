import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Building2, KeyRound, Layers, Trees, Briefcase, Hammer, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "investor" | "first_time_buyer";
type PropertyType =
  | "single_family"
  | "multi_unit"
  | "rental"
  | "mixed_use"
  | "land"
  | "commercial"
  | "fix_flip";

const PROPERTY_TYPES: { id: PropertyType; label: string; icon: any }[] = [
  { id: "single_family", label: "Single-Family", icon: Home },
  { id: "multi_unit", label: "Multi-Unit", icon: Building2 },
  { id: "rental", label: "Rental", icon: KeyRound },
  { id: "mixed_use", label: "Mixed-Use", icon: Layers },
  { id: "land", label: "Land", icon: Trees },
  { id: "commercial", label: "Commercial", icon: Briefcase },
  { id: "fix_flip", label: "Fix & Flip", icon: Hammer },
];

const TOWN_NAMES: Record<string, string> = {
  albany: "Albany",
  schenectady: "Schenectady",
  troy: "Troy",
  saratoga: "Saratoga",
  delmar: "Delmar",
  guilderland: "Guilderland",
  niskayuna: "Niskayuna",
  "clifton-park": "Clifton Park",
};

const fmt = (n: number) =>
  isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 0 }) : "—";
const pct = (n: number) => (isFinite(n) ? `${n.toFixed(2)}%` : "—");

const PropertyAnalyzer = () => {
  const [params] = useSearchParams();
  const townSlug = params.get("town") || "";
  const townName = TOWN_NAMES[townSlug] || "";
  const tabParam = params.get("tab");
  const initialMode: Mode =
    tabParam === "first-time-buyer" || tabParam === "first_time_buyer"
      ? "first_time_buyer"
      : "investor";
  const initialType = (params.get("property_type") as PropertyType) || "rental";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);

  useEffect(() => {
    if (tabParam === "first-time-buyer" || tabParam === "first_time_buyer") {
      setMode("first_time_buyer");
    }
  }, [tabParam]);

  const heroTitle =
    mode === "first_time_buyer"
      ? townName
        ? `First-Time Buyer Estimate — ${townName}`
        : "First-Time Buyer Estimate"
      : townName
      ? `Analyze a ${townName} Property`
      : "Analyze a Property";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Analyze a Property | Capital District Nest Homes"
        description="Run quick numbers on rentals, multi-units, mixed-use properties, land, and investment opportunities — or estimate FHA cash to buy as a first-time buyer."
        canonical="https://www.capitaldistrictnest.com/investment-analyzer"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="pt-32 pb-10 px-[5%]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5eead4] mb-4">
            Capital District Nest Homes
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
            {heroTitle}
          </h1>
          {mode === "first_time_buyer" ? (
            <>
              <p className="text-lg text-white/75 max-w-2xl mx-auto mb-3">
                Estimate your down payment, closing costs, seller concessions, and cash needed to buy.
              </p>
              <p className="text-sm text-white/55 max-w-2xl mx-auto">
                Use simple FHA-style assumptions to understand what buying may look like before speaking with a lender.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-white/75 max-w-2xl mx-auto mb-3">
                Run quick numbers on rentals, multi-units, mixed-use properties, land, and investment opportunities across the Capital District.
              </p>
              <p className="text-sm text-white/55 max-w-2xl mx-auto">
                Estimate cash flow, expenses, financing, cap rate, and potential returns before you move forward.
              </p>
            </>
          )}
        </div>
      </section>

      {/* MODE TABS */}
      <section className="px-[5%] pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex rounded-xl border border-white/10 bg-[#1E2230] p-1">
            <TabBtn active={mode === "investor"} onClick={() => setMode("investor")}>
              Investor Analysis
            </TabBtn>
            <TabBtn active={mode === "first_time_buyer"} onClick={() => setMode("first_time_buyer")}>
              <Wallet className="w-4 h-4 mr-1.5 inline" /> First-Time Buyer
            </TabBtn>
          </div>
        </div>
      </section>

      {mode === "investor" ? (
        <InvestorAnalyzer
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          initialPrice={Number(params.get("price")) || 350000}
          initialRent={Number(params.get("rent")) || 2400}
        />
      ) : (
        <FirstTimeBuyer initialPrice={Number(params.get("price")) || 300000} />
      )}

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const TabBtn = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all",
      active ? "bg-[#5eead4] text-[#0B0F19]" : "text-white/70 hover:text-white"
    )}
  >
    {children}
  </button>
);

/* ============================================================
   INVESTOR ANALYZER
   ============================================================ */
const InvestorAnalyzer = ({
  propertyType,
  setPropertyType,
  initialPrice,
  initialRent,
}: {
  propertyType: PropertyType;
  setPropertyType: (t: PropertyType) => void;
  initialPrice: number;
  initialRent: number;
}) => {
  const [price, setPrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(7.0);
  const [term, setTerm] = useState(30);
  const [rent, setRent] = useState(initialRent);
  const [units, setUnits] = useState(2);
  const [taxes, setTaxes] = useState(5400);
  const [insurance, setInsurance] = useState(1400);
  const [utilities, setUtilities] = useState(0);
  const [repairs, setRepairs] = useState(150);
  const [vacancyPct, setVacancyPct] = useState(5);
  const [mgmtPct, setMgmtPct] = useState(8);
  const [otherExp, setOtherExp] = useState(0);
  const [rehab, setRehab] = useState(45000);
  const [arv, setArv] = useState(450000);
  const [closingCosts, setClosingCosts] = useState(8000);
  const [holdingMonths, setHoldingMonths] = useState(6);
  const [resaleCostsPct, setResaleCostsPct] = useState(7);
  const [carryingCosts, setCarryingCosts] = useState(1200);
  const [improvementBudget, setImprovementBudget] = useState(0);
  const [estResale, setEstResale] = useState(0);

  const downAmt = price * (downPct / 100);
  const loanAmt = price - downAmt;

  const monthlyPI = useMemo(() => {
    const mr = rate / 100 / 12;
    const n = term * 12;
    if (mr <= 0) return loanAmt / n;
    return (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
  }, [loanAmt, rate, term]);

  const vacancyLoss = rent * (vacancyPct / 100);
  const mgmtCost = rent * (mgmtPct / 100);
  const monthlyOpEx = taxes / 12 + insurance / 12 + utilities + repairs + mgmtCost + otherExp;
  const totalMonthlyExpenses = monthlyOpEx + monthlyPI + vacancyLoss;
  const monthlyCashFlow = rent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashInvested = downAmt + (closingCosts || 0);
  const cocReturn = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
  const noi =
    (rent - vacancyLoss) * 12 -
    (taxes + insurance + utilities * 12 + repairs * 12 + mgmtCost * 12 + otherExp * 12);
  const capRate = price > 0 ? (noi / price) * 100 : 0;

  const flipHolding =
    (taxes / 12 + insurance / 12 + utilities) * holdingMonths + monthlyPI * holdingMonths;
  const flipResaleCost = arv * (resaleCostsPct / 100);
  const flipTotalCost = price + rehab + closingCosts + flipHolding + flipResaleCost;
  const flipProfit = arv - flipTotalCost;
  const flipROI = cashInvested + rehab > 0 ? (flipProfit / (cashInvested + rehab)) * 100 : 0;

  const landTotalCost = price + taxes + carryingCosts + improvementBudget;
  const landReturn = estResale > 0 ? ((estResale - landTotalCost) / landTotalCost) * 100 : 0;

  const isFlip = propertyType === "fix_flip";
  const isLand = propertyType === "land";
  const isMulti = propertyType === "multi_unit";
  const isIncome = !isFlip && !isLand;

  return (
    <>
      {/* PROPERTY TYPE SELECTOR */}
      <section id="analyzer" className="px-[5%] pb-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-3">
            Property Type
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => {
              const active = propertyType === id;
              return (
                <button
                  key={id}
                  onClick={() => setPropertyType(id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 text-sm font-medium transition-all",
                    active
                      ? "border-[#5eead4] bg-[#5eead4]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs text-center leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + RESULTS */}
      <section className="px-[5%] pb-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr,360px] gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Property Details</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Purchase Price ($)" value={price} onChange={setPrice} />
              {!isLand && (
                <>
                  <Field label="Down Payment (%)" value={downPct} onChange={setDownPct} step={0.5} />
                  <Field label="Interest Rate (%)" value={rate} onChange={setRate} step={0.125} />
                  <Field label="Loan Term (years)" value={term} onChange={setTerm} />
                </>
              )}
              {isIncome && (
                <>
                  {isMulti && <Field label="Number of Units" value={units} onChange={setUnits} />}
                  <Field
                    label={isMulti ? "Total Monthly Rent ($)" : "Monthly Rent ($)"}
                    value={rent}
                    onChange={setRent}
                  />
                </>
              )}
              <Field label="Annual Property Taxes ($)" value={taxes} onChange={setTaxes} />
              {!isLand && <Field label="Insurance ($/yr)" value={insurance} onChange={setInsurance} />}
              {isIncome && (
                <>
                  <Field label="Utilities ($/mo)" value={utilities} onChange={setUtilities} />
                  <Field label="Repairs / Maintenance ($/mo)" value={repairs} onChange={setRepairs} />
                  <Field label="Vacancy (%)" value={vacancyPct} onChange={setVacancyPct} />
                  <Field label="Property Management (%)" value={mgmtPct} onChange={setMgmtPct} />
                  <Field label="Other Monthly Expenses ($)" value={otherExp} onChange={setOtherExp} />
                </>
              )}
              {isFlip && (
                <>
                  <Field label="Rehab Budget ($)" value={rehab} onChange={setRehab} />
                  <Field label="After Repair Value ($)" value={arv} onChange={setArv} />
                  <Field label="Closing Costs ($)" value={closingCosts} onChange={setClosingCosts} />
                  <Field label="Holding Period (months)" value={holdingMonths} onChange={setHoldingMonths} />
                  <Field label="Resale Costs (%)" value={resaleCostsPct} onChange={setResaleCostsPct} />
                </>
              )}
              {isLand && (
                <>
                  <Field label="Carrying Costs ($/yr)" value={carryingCosts} onChange={setCarryingCosts} />
                  <Field label="Development / Improvement Budget ($)" value={improvementBudget} onChange={setImprovementBudget} />
                  <Field label="Estimated Resale Value ($)" value={estResale} onChange={setEstResale} />
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#5eead4]/25 bg-gradient-to-b from-[#0e1828] to-[#0B0F19] p-6 md:p-8 h-fit lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5eead4] mb-4">Results</p>
            {isFlip ? (
              <div className="space-y-4">
                <Result label="Total Project Cost" value={`$${fmt(flipTotalCost)}`} />
                <Result label="Estimated Profit" value={`$${fmt(flipProfit)}`} highlight />
                <Result label="Estimated ROI" value={pct(flipROI)} />
                <Result label="Holding Costs" value={`$${fmt(flipHolding)}`} />
                <Result label="Resale Costs" value={`$${fmt(flipResaleCost)}`} />
              </div>
            ) : isLand ? (
              <div className="space-y-4">
                <Result label="Total Land Cost" value={`$${fmt(landTotalCost)}`} />
                <Result label="Estimated Return" value={pct(landReturn)} highlight />
              </div>
            ) : (
              <div className="space-y-4">
                <Result label="Monthly Mortgage Payment" value={`$${fmt(monthlyPI)}`} />
                <Result label="Total Monthly Expenses" value={`$${fmt(totalMonthlyExpenses)}`} />
                <Result
                  label="Monthly Cash Flow"
                  value={`$${fmt(monthlyCashFlow)}`}
                  highlight
                  positive={monthlyCashFlow >= 0}
                />
                <Result label="Annual Cash Flow" value={`$${fmt(annualCashFlow)}`} />
                <Result label="Cash-on-Cash Return" value={pct(cocReturn)} />
                <Result label="Cap Rate" value={pct(capRate)} />
              </div>
            )}
          </div>
        </div>
      </section>

      <BrowseCTA />
    </>
  );
};

/* ============================================================
   FIRST-TIME BUYER
   ============================================================ */
const FirstTimeBuyer = ({ initialPrice }: { initialPrice: number }) => {
  const [price, setPrice] = useState(initialPrice || 300000);
  const [downPct, setDownPct] = useState(3.5);
  const [sellerConcessionPct, setSellerConcessionPct] = useState(6);
  const [closingPct, setClosingPct] = useState(4);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [taxesAnnual, setTaxesAnnual] = useState(5400);
  const [insuranceAnnual, setInsuranceAnnual] = useState(1400);
  const [pmiMonthly, setPmiMonthly] = useState(140);
  const [inspection, setInspection] = useState(500);
  const [attorney, setAttorney] = useState(1500);
  const [appraisal, setAppraisal] = useState(650);
  const [otherCosts, setOtherCosts] = useState(500);

  const downAmt = price * (downPct / 100);
  const closingCosts = price * (closingPct / 100);
  const sellerCredit = price * (sellerConcessionPct / 100);
  const usableSellerCredit = Math.min(sellerCredit, closingCosts);
  const buyerUpfrontCosts = downAmt + closingCosts + inspection + attorney + appraisal + otherCosts;
  const cashToClose = Math.max(0, buyerUpfrontCosts - usableSellerCredit);
  const excessCredit = sellerCredit > closingCosts;

  const loanAmt = price - downAmt;
  const monthlyPI = useMemo(() => {
    const mr = rate / 100 / 12;
    const n = term * 12;
    if (mr <= 0) return loanAmt / n;
    return (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
  }, [loanAmt, rate, term]);

  const monthlyTaxes = taxesAnnual / 12;
  const monthlyIns = insuranceAnnual / 12;
  const totalMonthly = monthlyPI + monthlyTaxes + monthlyIns + pmiMonthly;

  return (
    <>
      <section className="px-[5%] pb-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr,380px] gap-6">
          {/* INPUTS */}
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-2">FHA-Style Estimate</h2>
            <p className="text-sm text-white/55 mb-6">
              Defaults assume FHA financing with seller concessions. Adjust any field to model your scenario.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Purchase Price ($)" value={price} onChange={setPrice} />
              <ReadOnly label="Loan Type" value="FHA" />
              <Field label="Down Payment (%)" value={downPct} onChange={setDownPct} step={0.5} />
              <Field label="Seller Concession (%)" value={sellerConcessionPct} onChange={setSellerConcessionPct} step={0.5} />
              <Field label="Estimated Closing Costs (%)" value={closingPct} onChange={setClosingPct} step={0.25} />
              <Field label="Interest Rate (%)" value={rate} onChange={setRate} step={0.125} />
              <Field label="Loan Term (years)" value={term} onChange={setTerm} />
              <Field label="Annual Property Taxes ($)" value={taxesAnnual} onChange={setTaxesAnnual} />
              <Field label="Annual Home Insurance ($)" value={insuranceAnnual} onChange={setInsuranceAnnual} />
              <Field label="Mortgage Insurance ($/mo)" value={pmiMonthly} onChange={setPmiMonthly} />
              <Field label="Inspection ($)" value={inspection} onChange={setInspection} />
              <Field label="Attorney / Settlement ($)" value={attorney} onChange={setAttorney} />
              <Field label="Appraisal ($)" value={appraisal} onChange={setAppraisal} />
              <Field label="Other Costs ($)" value={otherCosts} onChange={setOtherCosts} />
            </div>
          </div>

          {/* RESULTS */}
          <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-b from-[#0e1828] to-[#0B0F19] p-6 md:p-8 h-fit lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5eead4] mb-3">
              Estimated Cash Needed to Buy
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white mb-1 tabular-nums">
              ${fmt(cashToClose)}
            </p>
            <p className="text-xs text-white/55 mb-6">Down payment + closing costs − usable seller credit</p>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <Result label="Down Payment" value={`$${fmt(downAmt)}`} />
              <Result label="Estimated Closing Costs" value={`$${fmt(closingCosts)}`} />
              <Result label="Seller Credit" value={`$${fmt(usableSellerCredit)}`} />
              <Result label="Loan Amount" value={`$${fmt(loanAmt)}`} />
              <Result label="Monthly P&I" value={`$${fmt(monthlyPI)}`} />
              <Result label="Monthly Taxes" value={`$${fmt(monthlyTaxes)}`} />
              <Result label="Monthly Insurance" value={`$${fmt(monthlyIns)}`} />
              <Result label="Mortgage Insurance" value={`$${fmt(pmiMonthly)}`} />
              <Result label="Total Monthly Payment" value={`$${fmt(totalMonthly)}`} highlight />
            </div>

            {excessCredit && (
              <p className="mt-5 text-xs text-amber-300/80 leading-relaxed">
                Seller credits are subject to lender, loan, contract, and allowable cost rules. Excess credits may not be usable as cash back to the buyer.
              </p>
            )}
            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              This estimate is for planning only. Actual cash needed depends on lender guidelines, property taxes, insurance, loan terms, contract terms, and approved seller concessions.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Link to="/homes" className="btn-primary-apple text-center">Browse Homes</Link>
              <Link
                to="/homes/partners?category=mortgage"
                className="btn-secondary-apple text-center"
              >
                Talk to a Local Lender
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const BrowseCTA = () => (
  <section className="px-[5%] pb-16">
    <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#1E2230] p-8 md:p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Browse local property links.</h2>
      <p className="text-white/70 max-w-2xl mx-auto mb-6">
        Compare your numbers against active property links across Albany, Schenectady, Troy, Saratoga, Delmar, and other Capital District towns.
      </p>
      <Link to="/homes" className="btn-primary-apple inline-flex">Browse Property Links</Link>
    </div>
  </section>
);

const Field = ({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) => (
  <div>
    <Label className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</Label>
    <Input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="mt-1.5 h-11 bg-[#0B0F19] border-white/10 text-white"
    />
  </div>
);

const ReadOnly = ({ label, value }: { label: string; value: string }) => (
  <div>
    <Label className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</Label>
    <div className="mt-1.5 h-11 px-3 flex items-center rounded-md bg-[#0B0F19]/60 border border-white/10 text-white/80 text-sm font-medium">
      {value}
    </div>
  </div>
);

const Result = ({
  label,
  value,
  highlight,
  positive,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  positive?: boolean;
}) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 last:border-0">
    <span className="text-sm text-white/65">{label}</span>
    <span
      className={cn(
        "font-bold tabular-nums",
        highlight ? "text-2xl" : "text-base",
        highlight
          ? positive === false
            ? "text-red-400"
            : "text-[#5eead4]"
          : "text-white"
      )}
    >
      {value}
    </span>
  </div>
);

export default PropertyAnalyzer;
