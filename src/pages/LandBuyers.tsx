import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import GuideLeadModal from "@/components/GuideLeadModal";
import { Mountain, FileText, Plug, Hammer, TrendingUp, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

const LandBuyers = () => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <MainLayout>
      <Helmet>
        <title>Land Buying Guide | Capital District NY</title>
        <meta name="description" content="Everything you need to know before buying land in Albany, Troy, Schenectady, and the Capital District. Zoning, utilities, build costs, and resale value explained." />
        <meta name="keywords" content="buy land Capital District, Albany land for sale, building lots NY, vacant land investment, zoning Capital District" />
        <link rel="canonical" href="https://capitaldistrictnest.com/land-buyers" />
      </Helmet>

      <GuideLeadModal
        open={showGuideModal}
        onOpenChange={setShowGuideModal}
        redirectPath="/buyer-journey/land-buyer"
        guideType="land-buyer-guide"
      />

      {/* Hero Section */}
      <section className="bg-card border-b border-border px-[5%] py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Land Buying Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Land can be a smart investment — or a costly mistake. This guide helps you understand zoning, utilities, build costs, and long-term value before you buy.
          </p>
        </div>
      </section>

      {/* Guide Coming Soon Banner */}
      <div className="bg-primary/5 border-b border-primary/20 px-[5%] py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-sm font-medium text-foreground">
            📘 Free Land Due Diligence Guide Coming Soon — Join the List to Get It First.
          </span>
          <button 
            onClick={() => setShowGuideModal(true)} 
            className="text-sm font-bold text-primary hover:underline"
          >
            Get My Free Guide →
          </button>
        </div>
      </div>

      {/* Section 1: Is Land Right for You? */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mountain className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Is Land Right for You?
            </h2>
          </div>
          <div className="prose prose-lg text-muted-foreground mb-6">
            <p>
              Buying land is fundamentally different from buying a home. There is no income, no immediate utility, and no guarantee of appreciation. Before you start looking, ask yourself:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Do you have a clear plan?</p>
              <p className="text-sm text-muted-foreground">
                Build a home? Hold for appreciation? Subdivide and sell? Each strategy has different requirements for location, zoning, and capital.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Can you afford to wait?</p>
              <p className="text-sm text-muted-foreground">
                Land ties up capital without generating returns. Property taxes still apply. You need patience and financial stability.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Do you understand the local market?</p>
              <p className="text-sm text-muted-foreground">
                Land values in the Capital District vary dramatically by town, zoning, and access. What looks cheap may be unbuildable.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Are you prepared for due diligence?</p>
              <p className="text-sm text-muted-foreground">
                Land requires more homework than a home purchase. Surveys, perc tests, environmental reviews — all before you buy.
              </p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-foreground font-semibold mb-2">Bottom Line</p>
            <p className="text-muted-foreground text-sm">
              Land is best for buyers with a specific purpose, realistic timeline, and capital to hold. If you are looking for quick returns or passive income, consider multi-family properties instead.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Zoning and Buildability Basics */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Zoning and Buildability Basics
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Zoning determines what you can build — and what you cannot. Never assume a parcel is buildable without verification.
          </p>
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Residential Zoning (R-1, R-2, etc.)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Allows single-family or multi-family homes depending on classification. Check minimum lot sizes, setbacks, and height restrictions. R-1 typically requires larger lots than R-2.
              </p>
              <p className="text-xs text-primary">Verify with the town planning department, not just the listing</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Agricultural Zoning</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Often allows residential construction but with restrictions. May require larger lot sizes (5+ acres) and limit commercial activity. Common in rural Capital District towns.
              </p>
              <p className="text-xs text-primary">Can be advantageous for privacy but limits subdivision</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Wetlands and Environmental Restrictions</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Even properly zoned land may be unbuildable if wetlands, floodplains, or protected habitats exist. A 10-acre parcel might only have 2 buildable acres after environmental review.
              </p>
              <p className="text-xs text-destructive">Always order an environmental survey before purchasing</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Variances and Special Permits</h3>
              <p className="text-muted-foreground text-sm mb-3">
                If current zoning does not allow your intended use, you may apply for a variance. This requires town board approval and can take months with no guarantee of success.
              </p>
              <p className="text-xs text-primary">Factor variance risk into your purchase decision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Utilities, Access, and Hidden Costs */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plug className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Utilities, Access, and Hidden Costs
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            The purchase price is just the beginning. These factors determine your true cost to develop:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="font-bold text-foreground">Water</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Municipal water available? If not, you need a well. Wells cost $5,000-$15,000+ depending on depth. Some areas have poor water quality or low yield.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="font-bold text-foreground">Sewer</p>
              </div>
              <p className="text-sm text-muted-foreground">
                No sewer means septic system required. A perc test determines if soil can support septic. Septic installation runs $10,000-$30,000.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="font-bold text-foreground">Electric</p>
              </div>
              <p className="text-sm text-muted-foreground">
                How far is the nearest utility pole? Extending power lines can cost $10-$50 per linear foot. Remote parcels may require significant investment.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="font-bold text-foreground">Road Access</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Does the parcel have legal road frontage? Landlocked parcels require easements. Private roads may have maintenance obligations.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="font-bold text-foreground mb-4">Additional Hidden Costs to Budget</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Survey</p>
                <p className="font-bold text-foreground">$500-$2,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Perc Test</p>
                <p className="font-bold text-foreground">$300-$800</p>
              </div>
              <div>
                <p className="text-muted-foreground">Environmental Review</p>
                <p className="font-bold text-foreground">$500-$3,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Clearing/Grading</p>
                <p className="font-bold text-foreground">$5,000-$25,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Cost-to-Build Considerations */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Hammer className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Cost-to-Build Considerations
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            If you are buying land to build, understand current construction costs before you commit:
          </p>
          <div className="bg-background border border-border rounded-xl p-6 mb-6">
            <p className="font-bold text-foreground mb-4">Capital District Construction Costs (2024-2025)</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">$175-$225</p>
                <p className="text-xs text-muted-foreground mt-1">per sq ft — Basic Build</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">$225-$300</p>
                <p className="text-xs text-muted-foreground mt-1">per sq ft — Mid-Range</p>
              </div>
              <div className="text-center p-4 bg-card rounded-lg">
                <p className="text-2xl font-bold text-foreground">$300-$450+</p>
                <p className="text-xs text-muted-foreground mt-1">per sq ft — Custom/Luxury</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">The Math Matters</p>
              <p className="text-sm text-muted-foreground">
                A 2,000 sq ft mid-range home costs $450,000-$600,000 to build. Add land cost ($50,000-$150,000) and site work ($20,000-$50,000). Your all-in cost easily reaches $550,000-$800,000.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Compare to Existing Homes</p>
              <p className="text-sm text-muted-foreground">
                In many Capital District markets, buying an existing home is 20-40% cheaper than building new. Only build if you need something the market cannot provide.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Timeline Reality</p>
              <p className="text-sm text-muted-foreground">
                New construction takes 8-14 months minimum. Add permitting delays, weather, and contractor availability. Plan for 12-18 months from land purchase to move-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Resale and Exit Strategy */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Resale and Exit Strategy
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Before you buy, know how you will exit. Land is less liquid than homes — selling can take months or years.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Buildable Lots Sell Faster</p>
              <p className="text-sm text-muted-foreground">
                Land with confirmed utilities, road access, and clear zoning attracts more buyers. Do your due diligence before buying — it becomes a selling point later.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Location Drives Appreciation</p>
              <p className="text-sm text-muted-foreground">
                Land in growing areas (Saratoga County, suburban Albany) appreciates faster than rural parcels. Proximity to employers, schools, and amenities matters.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Subdivision Potential</p>
              <p className="text-sm text-muted-foreground">
                Large parcels that can be subdivided offer multiple exit options. Sell the whole parcel, sell individual lots, or build and sell homes.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Carrying Costs Add Up</p>
              <p className="text-sm text-muted-foreground">
                Property taxes, insurance, and loan interest accumulate while you hold. Factor these into your return calculations. A 5-year hold at $3,000/year in taxes is $15,000 off your profit.
              </p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-foreground font-semibold mb-2">Smart Exit Planning</p>
            <p className="text-muted-foreground text-sm">
              Define your exit before you buy. Will you build and live there? Build and sell? Hold and sell the land? Each strategy has different requirements for location, price, and timing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How do I know if land is buildable?</h3>
              <p className="text-muted-foreground text-sm">
                Buildability depends on zoning, wetlands, soil conditions, and utility access. Always verify with the town planning department, order a survey, and conduct a perc test for septic if no sewer is available. Never assume a parcel is buildable just because it is listed for sale.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What is a perc test and why does it matter?</h3>
              <p className="text-muted-foreground text-sm">
                A percolation (perc) test measures how quickly water drains through soil to determine if a septic system can be installed. If the land fails a perc test and has no municipal sewer access, you cannot build on it. Always make land purchases contingent on passing a perc test.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How much does it cost to build a home on vacant land?</h3>
              <p className="text-muted-foreground text-sm">
                In the Capital District, construction costs range from $175-$300+ per square foot depending on finishes. A 2,000 sq ft mid-range home costs $450,000-$600,000 to build. Add land cost, site work (clearing, driveway, utilities), and permit fees. Total investment often exceeds $550,000-$800,000.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Can I get a mortgage for vacant land?</h3>
              <p className="text-muted-foreground text-sm">
                Land loans exist but have stricter terms than home mortgages — typically 20-50% down, higher interest rates, and shorter terms (5-15 years). Construction-to-permanent loans are another option if you plan to build immediately. Some buyers use home equity loans or pay cash.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Is buying land a good investment in the Capital District?</h3>
              <p className="text-muted-foreground text-sm">
                Land can appreciate well in growing areas like Saratoga County and Albany suburbs, but it generates no income while you hold it and still incurs property taxes. Land works best as part of a specific plan (build, subdivide, hold for development) rather than pure speculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="px-[5%] py-16 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Request a Land Analysis
          </h2>
          <p className="text-muted-foreground mb-8">
            Considering a specific parcel? We will review zoning, utilities, buildability, and market value — so you know exactly what you are buying before you commit.
          </p>
          <Link
            to="/vip-buyer-access"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Request Land Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Local expertise
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No obligation
            </span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandBuyers;
