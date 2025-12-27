import { useState, useEffect } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface ReportPasswordGateProps {
  reportSlug: string;
  validToken?: string;
  children: React.ReactNode;
}

const EXPIRY_DAYS = 7;
const REPORT_PASSWORD = import.meta.env.VITE_REPORT_PASSWORD || "RIDGE1999";

const ReportPasswordGate = ({ reportSlug, validToken, children }: ReportPasswordGateProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `report_unlocked_${reportSlug}`;

  useEffect(() => {
    // Check URL for token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token && validToken && token === validToken) {
      // Token is valid, unlock and store
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);
      localStorage.setItem(storageKey, JSON.stringify({ 
        unlocked: true, 
        expiry: expiryDate.toISOString() 
      }));
      setIsUnlocked(true);
      setIsLoading(false);
      return;
    }

    // Check localStorage for existing unlock
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      try {
        const { unlocked, expiry } = JSON.parse(storedData);
        if (unlocked && new Date(expiry) > new Date()) {
          setIsUnlocked(true);
        } else {
          // Expired, remove
          localStorage.removeItem(storageKey);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    setIsLoading(false);
  }, [storageKey, validToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === REPORT_PASSWORD) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);
      localStorage.setItem(storageKey, JSON.stringify({ 
        unlocked: true, 
        expiry: expiryDate.toISOString() 
      }));
      setIsUnlocked(true);
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Private Intelligence Report
            </h1>
            <p className="text-muted-foreground">
              Enter the password provided by Capital District Nest to view this report.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              Unlock Report
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

export default ReportPasswordGate;
