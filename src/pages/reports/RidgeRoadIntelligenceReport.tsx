import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import IntelligenceReportTemplate, { PropertyData } from "@/components/IntelligenceReportTemplate";

const REPORT_SLUG = "1999-ridge-road-queensbury-ny";
const SESSION_KEY = `private_report_${REPORT_SLUG}`;

// The report contents are released by the server only after the access password
// is verified there; no password, token or private data ships in the app.
const readSession = (): PropertyData | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as PropertyData) : null;
  } catch {
    return null;
  }
};

const RidgeRoadIntelligenceReport = () => {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(readSession);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: fnError } = await supabase.functions.invoke("unlock-private-report", {
      body: { reportSlug: REPORT_SLUG, password },
    });
    setLoading(false);
    if (fnError || !data?.propertyData) {
      setError("Incorrect password. Try again.");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data.propertyData));
    setPropertyData(data.propertyData as PropertyData);
  };

  if (propertyData) {
    return (
      <IntelligenceReportTemplate
        reportSlug={REPORT_SLUG}
        pageTitle="1999 Ridge Rd, Queensbury, NY — Intelligence Report"
        pageSubtitle="Investor-style facts + verified public record. Fast. Clear. Local."
        propertyData={propertyData}
        metaDescription="Comprehensive property intelligence report for 1999 Ridge Road, Queensbury NY. Member public record, tax analysis, and buyer insights."
        canonicalUrl="https://www.capitaldistrictnest.com/reports/1999-ridge-road-queensbury-ny"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Private Intelligence Report</h1>
            <p className="text-muted-foreground">
              Enter the password provided by Capital District Nest to view this report.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              aria-label="Report password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border text-foreground"
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={loading || !password}>
              {loading ? "Checking…" : "Unlock Report"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            Don't have a password? Contact Capital District Nest to request access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RidgeRoadIntelligenceReport;
