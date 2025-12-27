import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import IntelReportUnlockForm from "@/components/IntelReportUnlockForm";
import RequestAnotherAddressForm from "@/components/RequestAnotherAddressForm";
import { 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Shield, 
  MapPin,
  ExternalLink,
  BarChart3,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const REPORT_SLUG = "1999-ridge-road-queensbury-ny";
const STORAGE_KEY = `intel_unlocked_${REPORT_SLUG}`;

// PDF URLs (replace with actual uploaded PDF URLs)
const RPR_PDF_URL = "/reports/1999-ridge-road-rpr.pdf";
const CRS_PDF_URL = "/reports/1999-ridge-road-crs.pdf";

const RidgeRoadIntelReport = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check localStorage for unlock status
    const unlocked = localStorage.getItem(STORAGE_KEY);
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const executiveHighlights = [
    {
      icon: MapPin,
      title: "4 Acres in Queensbury",
      description: "Prime acreage in Warren County with significant land value upside"
    },
    {
      icon: TrendingUp,
      title: "$44,975 Per Acre",
      description: "Competitive pricing for the Queensbury/Lake George corridor"
    },
    {
      icon: Shield,
      title: "Low-Risk Land Asset",
      description: "Acreage provides downside protection and multiple exit strategies"
    }
  ];

  const whatYouGet = [
    "Full Realtor Property Resource (RPR) analysis",
    "Comparative Residential Study (CRS) with market comps",
    "Price per acre breakdown vs. local market",
    "Zoning and land use analysis",
    "Exit strategy framework",
    "Long-term value trajectory insights"
  ];

  const reportSummary = [
    {
      title: "Property Overview",
      points: [
        "4-acre parcel with existing structure",
        "Located on Ridge Road, established Queensbury corridor",
        "Zoning allows for residential use with expansion potential",
        "No HOA restrictions"
      ]
    },
    {
      title: "Market Position",
      points: [
        "$179,900 list price ($44,975/acre)",
        "Below median price per acre for Warren County",
        "Strong demand for acreage in Lake George region",
        "Limited comparable inventory available"
      ]
    },
    {
      title: "Investment Thesis",
      points: [
        "Land value provides floor on downside risk",
        "Multiple use cases: hold, improve, subdivide",
        "3-7 year appreciation runway aligned with regional growth",
        "Privacy and space increasingly scarce in this market"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>1999 Ridge Road Intelligence Report | Capital District Nest</title>
        <meta 
          name="description" 
          content="Comprehensive property intelligence report for 1999 Ridge Road, Queensbury NY. 4 acres, detailed market analysis, and investment framework."
        />
        <link rel="canonical" href="https://capitaldistrict.nest/reports/1999-ridge-road-queensbury-ny" />
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Property Intelligence Report
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                1999 Ridge Road, Queensbury NY
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                4-acre property analysis with market data, investment thesis, and exit strategy framework
              </p>
            </div>
          </div>
        </section>

        {/* Executive Preview - Always Visible */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Executive Preview
              </h2>

              {/* Three Highlight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {executiveHighlights.map((item, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* What You'll Get */}
              <div className="bg-muted/30 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  What's Included in the Full Report
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {whatYouGet.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Report Section - Gated */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {!isUnlocked ? (
                /* Locked State */
                <IntelReportUnlockForm 
                  reportSlug={REPORT_SLUG} 
                  onUnlock={handleUnlock}
                />
              ) : (
                /* Unlocked State - Full Report */
                <div className="space-y-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <CheckCircle2 className="w-4 h-4" />
                      Report Unlocked
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Full Intelligence Report
                    </h2>
                  </div>

                  {/* Report Summary Sections */}
                  <div className="space-y-8">
                    {reportSummary.map((section, index) => (
                      <Card key={index} className="border-border">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* PDF Access Buttons */}
                  <div className="bg-muted/30 rounded-xl p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                      Download Full Reports
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() => window.open(RPR_PDF_URL, '_blank')}
                      >
                        <FileText className="w-5 h-5" />
                        Open RPR Report
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() => window.open(CRS_PDF_URL, '_blank')}
                      >
                        <FileText className="w-5 h-5" />
                        Open CRS Report
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      PDF reports open in a new tab for easy viewing and download
                    </p>
                  </div>

                  {/* Request Another Address */}
                  <RequestAnotherAddressForm />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RidgeRoadIntelReport;
