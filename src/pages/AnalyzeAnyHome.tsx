import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Home, DollarSign, ShieldCheck, Building, ChevronDown, Phone } from "lucide-react";

const MEDIAN_RENT = 1700;

const AnalyzeAnyHome = () => {
  const [price, setPrice] = useState(250000);
  const [downPct, setDownPct] = useState(3.5);
  const [rate, setRate] = useState(7.0);
  const [taxes, setTaxes] = useState(4800);
  const [insurance, setInsurance] = useState(1200);
  const [hoa, setHoa] = useState(0);
  const [grossIncome, setGrossIncome] = useState<number | null>(null);
  const [monthlyDebt, setMonthlyDebt] = useState<number | null>(null);
  const [affordOpen, setAffordOpen] = useState(false);

  const downAmt = price * (downPct / 100);
  const closingCosts = price * 0.025;

  const metrics = useMemo(() => {
    const loan = price - downAmt;
    const mr = rate / 100 / 12;
    const n = 360;
    const pi = mr > 0 ? (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1) : loan / n;
    const taxMo = taxes / 12;
    const insMo = insurance / 12;
    const total = pi + taxMo + insMo + hoa;
    const cashToClose = downAmt + closingCosts;

    let affordStatus: "green" | "amber" | "red" | null = null;
    let frontEnd: number | null = null;
    if (grossIncome && grossIncome > 0) {
      frontEnd = (total / grossIncome) * 100;
      if (frontEnd < 28) affordStatus = "green";
      else if (frontEnd <= 35) affordStatus = "amber";
      else affordStatus = "red";
    }

    const rentDiff = total - MEDIAN_RENT;

    return { pi, taxMo, insMo, total, cashToClose, affordStatus, frontEnd, rentDiff };
  }, [price, downAmt, rate, taxes, insurance, hoa, grossIncome]);

  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const affordColor = metrics.affordStatus === "green" ? "text-emerald-600 border-emerald-200 bg-emerald-50"
    : metrics.affordStatus === "amber" ? "text-amber-600 border-amber-200 bg-amber-50"
    : metrics.affordStatus === "red" ? "text-red-600 border-red-200 bg-red-50"
    : "border-border bg-secondary/30";

  const affordLabel = metrics.affordStatus === "green" ? "Comfortable"
    : metrics.affordStatus === "amber" ? "Tight but possible"
    : metrics.affordStatus === "red" ? "Stretched"
    : null;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <SEOHead
        title="First-Time Home Buyer Calculator | AnalyzeAnyHome.com"
        description="Know what a home really costs before you make an offer. See monthly payment, cash to close, and affordability in minutes."
        canonical="https://www.capitaldistrictnest.com/analyze-home"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--accent))] mb-4">First-Time Buyer Calculator</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] leading-tight mb-4">
            Know what the home really costs before you make an offer.
          </h1>
          <p className="text-lg text-muted-foreground">
            See your monthly payment, cash to close, and buying power in minutes. Buy with clarity, not guesswork.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="pb-20 px-6">
        <div className="max-w-[640px] mx-auto">
          <Card className="p-8 border-2 border-[hsl(var(--primary))]/20 bg-white shadow-lg">
            <div className="space-y-5">
              {/* Purchase Price */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Purchase Price</Label>
                <Input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value) || 0)} placeholder="250000" className="mt-1 h-12 text-lg" />
              </div>

              {/* Down Payment */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Down Payment</Label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <div>
                    <Input type="number" value={downPct} step={0.5} onChange={e => setDownPct(parseFloat(e.target.value) || 0)} className="h-12" />
                    <p className="text-xs text-muted-foreground mt-1">Percentage (%)</p>
                  </div>
                  <div>
                    <Input type="text" value={`$${fmt(downAmt)}`} readOnly className="h-12 bg-muted/30" />
                    <p className="text-xs text-muted-foreground mt-1">Dollar amount</p>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Interest Rate (%)</Label>
                <Input type="number" value={rate} step={0.125} onChange={e => setRate(parseFloat(e.target.value) || 0)} className="mt-1 h-12" />
                <p className="text-xs text-muted-foreground mt-1">Today's avg: 6.75% — <a href="tel:5186762347" className="text-[hsl(var(--accent))] underline">Get pre-approved with Joel Casso</a></p>
              </div>

              {/* Taxes */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Annual Property Taxes</Label>
                <Input type="number" value={taxes} step={100} onChange={e => setTaxes(parseFloat(e.target.value) || 0)} placeholder="4800" className="mt-1 h-12" />
                <p className="text-xs text-muted-foreground mt-1">Find on Zillow listing or ask your agent</p>
              </div>

              {/* Insurance */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Homeowner's Insurance ($/yr)</Label>
                <Input type="number" value={insurance} step={100} onChange={e => setInsurance(parseFloat(e.target.value) || 0)} placeholder="1200" className="mt-1 h-12" />
                <p className="text-xs text-muted-foreground mt-1">Estimate: $100/mo</p>
              </div>

              {/* HOA */}
              <div>
                <Label className="text-sm font-semibold text-foreground">HOA (if any, $/mo)</Label>
                <Input type="number" value={hoa} step={25} onChange={e => setHoa(parseFloat(e.target.value) || 0)} placeholder="0" className="mt-1 h-12" />
              </div>

              {/* Closing Costs */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Estimated Closing Costs</Label>
                <Input type="text" value={`$${fmt(closingCosts)}`} readOnly className="mt-1 h-12 bg-muted/30" />
                <p className="text-xs text-muted-foreground mt-1">Typically 2–3% of purchase price</p>
              </div>

              {/* Affordability — collapsible */}
              <Collapsible open={affordOpen} onOpenChange={setAffordOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))] cursor-pointer hover:underline w-full">
                  <ChevronDown className={`w-4 h-4 transition-transform ${affordOpen ? "rotate-180" : ""}`} />
                  Check your affordability — optional
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-foreground">Gross Monthly Income</Label>
                    <Input type="number" value={grossIncome ?? ""} onChange={e => setGrossIncome(e.target.value ? parseFloat(e.target.value) : null)} placeholder="6000" className="mt-1 h-12" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-foreground">Monthly Debt Payments</Label>
                    <Input type="number" value={monthlyDebt ?? ""} onChange={e => setMonthlyDebt(e.target.value ? parseFloat(e.target.value) : null)} placeholder="500" className="mt-1 h-12" />
                    <p className="text-xs text-muted-foreground mt-1">Car, student loans, credit cards</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Card>

          {/* RESULTS */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Monthly Payment */}
            <Card className="p-6 text-center border-[hsl(var(--accent))]/30 bg-white">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--accent))]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Monthly Payment</p>
              <p className="text-3xl font-bold text-[hsl(var(--accent))]">${fmt(metrics.total)}</p>
              <div className="mt-3 text-xs text-muted-foreground space-y-0.5 text-left">
                <p>Principal & Interest: ${fmt(metrics.pi)}</p>
                <p>Taxes: ${fmt(metrics.taxMo)}</p>
                <p>Insurance: ${fmt(metrics.insMo)}</p>
                {hoa > 0 && <p>HOA: ${fmt(hoa)}</p>}
              </div>
            </Card>

            {/* Cash to Close */}
            <Card className="p-6 text-center bg-white">
              <Home className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--primary))]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Cash to Close</p>
              <p className="text-3xl font-bold text-[hsl(var(--primary))]">${fmt(metrics.cashToClose)}</p>
              <p className="text-xs text-muted-foreground mt-3">Down payment assistance may be available — ask about SONYMA programs</p>
            </Card>

            {/* Affordability */}
            <Card className={`p-6 text-center ${affordColor}`}>
              <ShieldCheck className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-semibold uppercase tracking-wider mb-1">Affordability Check</p>
              {metrics.affordStatus ? (
                <>
                  <p className="text-2xl font-bold">{affordLabel}</p>
                  <p className="text-xs mt-2">{metrics.frontEnd?.toFixed(1)}% of gross income</p>
                </>
              ) : (
                <p className="text-sm mt-2">Add your income above to check affordability</p>
              )}
            </Card>

            {/* Rent vs Own */}
            <Card className="p-6 text-center bg-white">
              <Building className="w-6 h-6 mx-auto mb-2 text-[hsl(var(--primary))]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Rent vs Own</p>
              {Math.abs(metrics.rentDiff) <= 300 ? (
                <p className="text-sm font-medium text-emerald-600 mt-2">Buying costs about the same as renting here.</p>
              ) : metrics.rentDiff > 0 ? (
                <p className="text-sm font-medium mt-2">${fmt(metrics.rentDiff)}/mo more than the avg rent (${fmt(MEDIAN_RENT)})</p>
              ) : (
                <p className="text-sm font-medium text-emerald-600 mt-2">${fmt(Math.abs(metrics.rentDiff))}/mo less than the avg rent (${fmt(MEDIAN_RENT)})</p>
              )}
            </Card>
          </div>

          {/* Buy Sooner CTA */}
          <div className="mt-10 p-8 rounded-2xl bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/20">
            <h2 className="text-xl font-bold text-[hsl(var(--primary))] mb-4">First-time buyer programs can reduce what you need upfront.</h2>
            <ul className="space-y-2 text-sm text-foreground mb-6">
              <li className="flex items-start gap-2"><span className="text-[hsl(var(--accent))] font-bold">•</span> SONYMA loans — below-market interest rates for NY first-time buyers</li>
              <li className="flex items-start gap-2"><span className="text-[hsl(var(--accent))] font-bold">•</span> Down payment assistance — up to $15,000 available</li>
              <li className="flex items-start gap-2"><span className="text-[hsl(var(--accent))] font-bold">•</span> FHA loans — as low as 3.5% down</li>
            </ul>
            <Button asChild className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white font-semibold h-12 px-8">
              <a href="tel:5186762347" className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> Talk to Joel Casso about your options → (518) 676-2347
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnalyzeAnyHome;
