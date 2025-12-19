import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import FAQSection from "@/components/FAQSection";
import JourneyLeadMagnet from "@/components/JourneyLeadMagnet";
import { Mountain, CheckCircle, ArrowRight, MapPin, Ruler, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const landFaqs = [
  {
    question: "What should I check before buying land in Albany County?",
    answer: "Key due diligence items include: zoning/use restrictions, setback requirements, road frontage, water/sewer availability (or well/septic feasibility), soil/perc tests for septic, wetlands designations, easements, and survey boundaries. We help you evaluate all of these before you commit.",
  },
  {
    question: "How much does it cost to build on raw land?",
    answer: "Construction costs in the Capital District typically run $150-$250+ per square foot depending on finishes. Site prep (clearing, grading, utilities) can add $20,000-$100,000+. We help you get realistic estimates before you buy so there are no surprises.",
  },
  {
    question: "What's the difference between buildable and non-buildable land?",
    answer: "Buildable land has proper zoning for your intended use, adequate road access, and feasible utility connections. Non-buildable parcels may have restrictions, wetlands, steep grades, or lack of road frontage. We verify buildability before you make an offer.",
  },
  {
    question: "Can I subdivide land I purchase?",
    answer: "Subdivision depends on local zoning, minimum lot sizes, and planning board approval. Some parcels have subdivision potential that adds significant value; others are restricted. We research this upfront and can connect you with surveyors and attorneys who handle subdivisions.",
  },
  {
    question: "How do I finance a land purchase?",
    answer: "Land loans typically require 20-50% down and have higher interest rates than home mortgages. Some banks offer construction-to-permanent loans that roll land purchase and building into one loan. We work with lenders experienced in land financing.",
  },
];

const LandBuyerJourney = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Land Buyer Guide | Capital District Land for Sale | Capital District Nest</title>
        <meta 
          name="description" 
          content="Buying land in Albany, Troy, or Schenectady? Understand zoning, utilities, build costs, and long-term potential before you buy. Free land evaluation checklist." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-journey/land-buyer" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Mountain className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Land Buyer Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Buy Land With Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Land can be a smart investment — or a costly mistake. We help you understand zoning, utilities, build costs, and long-term potential before you commit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link to="/albany-land">
                  Browse Land Listings
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dealdesk">Get Land Evaluation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Due Diligence Checklist */}
        <section className="py-12 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Critical Due Diligence for Land Buyers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Zoning & Use</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Residential vs. commercial zoning</li>
                    <li>• Setback requirements</li>
                    <li>• Height restrictions</li>
                    <li>• Permitted uses</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <Ruler className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Site Conditions</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Road frontage & access</li>
                    <li>• Topography & drainage</li>
                    <li>• Soil & perc test results</li>
                    <li>• Wetlands & flood zones</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Utilities & Costs</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Water/sewer availability</li>
                    <li>• Well/septic feasibility</li>
                    <li>• Electric & gas hookups</li>
                    <li>• Estimated build costs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Red Flags to Watch For
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">No road frontage</h3>
                  <p className="text-sm text-muted-foreground">Landlocked parcels require easements that may be costly or impossible to obtain.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Failed perc test</h3>
                  <p className="text-sm text-muted-foreground">Without sewer access, a failed perc test can make land unbuildable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Wetlands designation</h3>
                  <p className="text-sm text-muted-foreground">Protected wetlands severely limit what you can build and where.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground">Unclear boundaries</h3>
                  <p className="text-sm text-muted-foreground">Always get a survey — fence lines and descriptions often don't match reality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-12 px-4 bg-background">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Get Your Free Land Due Diligence Guide
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our complete land evaluation checklist and zoning quick reference. Know exactly what to research before you make an offer.
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>20-point land evaluation checklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>Albany County zoning quick reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>Build cost estimator worksheet</span>
                </li>
              </ul>
            </div>
            <JourneyLeadMagnet
              journeyType="land"
              title="Free Land Buyer's Kit"
              description="Due diligence checklist + zoning guide delivered to your inbox."
              benefits={[
                "Avoid costly land mistakes",
                "Understand zoning restrictions",
                "Estimate true build costs",
              ]}
              downloadName="Land Buyer's Guide"
            />
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection 
          faqs={landFaqs}
          pageUrl="https://capitaldistrictnest.com/buyer-journey/land-buyer"
        />

        {/* Final CTA */}
        <section className="py-12 px-4 bg-amber-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Found Land You're Interested In?</h2>
            <p className="mb-6 opacity-90">
              Let us evaluate it for you. We'll research zoning, utilities, and feasibility before you commit.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/dealdesk">
                Request Land Evaluation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default LandBuyerJourney;
