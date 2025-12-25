import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Download, Phone } from "lucide-react";

const REPORT_URL = "https://www.narrpr.com/reports-v2/6817b29a-44d8-4221-a604-05c717acee81/pdf";

const DelmarMarketReport = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Delmar Market Report
          </h2>
          <p className="text-lg text-muted-foreground">
            Updates every 48 hours (new sales + pricing activity).
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg"
            asChild
          >
            <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">
              <FileText className="w-5 h-5 mr-2" />
              View Full Report (PDF)
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
            asChild
          >
            <Link to="/#due-diligence">Get My Free Intelligence Report</Link>
          </Button>
        </div>

        {/* Quick Contact Note */}
        <p className="text-center text-sm text-muted-foreground mb-10">
          Want the fastest answer on one address? Text it to{" "}
          <a href="tel:518-676-2347" className="text-primary font-medium hover:underline">
            518-676-2347
          </a>
          .
        </p>

        {/* Desktop PDF Embed */}
        <div
          className="hidden md:block w-full max-w-[980px] mx-auto rounded-[18px] overflow-hidden border-2 border-primary bg-white"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
        >
          <iframe
            title="Delmar Market Report"
            src={REPORT_URL}
            loading="lazy"
            className="w-full h-[900px] block border-0"
          />
        </div>

        {/* Mobile Card with Buttons */}
        <Card className="md:hidden p-6 bg-background border-primary/20 max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full py-6 text-lg"
              asChild
            >
              <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">
                <FileText className="w-5 h-5 mr-2" />
                View Delmar Market Report (PDF)
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 w-full"
              asChild
            >
              <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" download>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </Card>

        {/* SEO Copy */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-muted-foreground text-center leading-relaxed">
            This Delmar market report updates every 48 hours and reflects current pricing, 
            recent sales, and local trends. If you want a property-specific breakdown 
            (rent potential, taxes, cash flow, cap rate, and comps), request a{" "}
            <Link to="/#due-diligence" className="text-primary font-medium hover:underline">
              Free Intelligence Report
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default DelmarMarketReport;
