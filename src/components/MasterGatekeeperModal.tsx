import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, Sparkles, Smartphone } from "lucide-react";
import { z } from "zod";

// Validation schema
const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().optional(),
});

interface MasterGatekeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
  townName?: string;
  searchQuery?: string;
}

// Data Nest Logo Component
const DataNestLogo = () => (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="nestGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Base line - Foundation */}
    <rect x="8" y="28" width="24" height="2" fill="white"/>
    {/* Middle line - Electric Teal Glow */}
    <rect x="12" y="22" width="16" height="2" fill="#00F5FF" filter="url(#nestGlow)"/>
    {/* Top line - Peak */}
    <rect x="18" y="16" width="4" height="2" fill="white"/>
  </svg>
);

const MasterGatekeeperModal = ({
  isOpen,
  onClose,
  redirectUrl,
  townName,
  searchQuery,
}: MasterGatekeeperModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    const result = leadSchema.safeParse({ name, email, phone });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to Supabase with origin tracking
      const { error } = await supabase.from("leads").insert({
        full_name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: `Nest Passport registration${townName ? ` for ${townName}` : ""}${searchQuery ? `: ${searchQuery}` : ""}`,
        type: "nest_passport",
        location: townName || null,
        origin_town: townName || null,
        lead_type: "buyer",
      });

      if (error) throw error;

      toast.success("Passport Authorized! Accessing the Vault...");
      
      // Redirect after short delay
      setTimeout(() => {
        window.open(redirectUrl, "_blank");
        onClose();
        setName("");
        setEmail("");
        setPhone("");
      }, 800);
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try manual entry.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md border-border p-0 overflow-hidden"
        style={{
          background: '#0B0B0B',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Header with Data Nest Logo */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          {/* Teal glow orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/15 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            {/* Data Nest Logo */}
            <div className="inline-flex items-center justify-center mb-4">
              <DataNestLogo />
            </div>
            
            {/* Nest Passport Branding */}
            <p className="text-[11px] text-primary tracking-[0.4em] uppercase font-medium mb-3">
              Nest Passport
            </p>
            
            <DialogTitle className="text-3xl font-extralight text-foreground tracking-tight mb-3">
              Unlock the Vault
            </DialogTitle>
            
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              {townName 
                ? `Access verified property intelligence and 36% yield reports for ${townName}. Your passport provides exclusive entry to the Capital District's most precise data.`
                : "Access verified property intelligence and exclusive yield reports. Your passport provides entry to the Capital District's most precise data."
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {/* Social Auth Buttons */}
          <div className="space-y-3">
            {/* Google Sign-In */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 glass border-border hover:bg-muted/50 font-medium text-base rounded-2xl"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            {/* Apple Sign-In (Visual only - not supported yet) */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 glass border-border hover:bg-muted/50 font-medium text-base rounded-2xl"
              onClick={() => toast.info("Apple Sign-In coming soon")}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">or enter details</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-name" className="text-xs text-muted-foreground uppercase tracking-wider">
              Full Name
            </Label>
            <Input
              id="gatekeeper-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12 bg-muted/20 border-border focus:border-primary rounded-xl"
              required
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-email" className="text-xs text-muted-foreground uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="gatekeeper-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 bg-muted/20 border-border focus:border-primary rounded-xl"
              required
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone Input with SMS Hook */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-phone" className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-3 h-3 text-primary" />
              Mobile Number
            </Label>
            <Input
              id="gatekeeper-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(518) 555-0123"
              className="h-12 bg-muted/20 border-border focus:border-primary rounded-xl"
            />
            <p className="text-[10px] text-primary/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Get SMS Alerts for off-market 30%+ yield opportunities
            </p>
          </div>

          {/* Authorize Passport Button */}
          <Button
            type="submit"
            className="w-full h-14 font-semibold text-base rounded-2xl glow-primary mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Authorizing..."
            ) : (
              <>
                Authorize Passport
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-[10px] text-muted-foreground tracking-wide">
              Your data stays private • No spam • Agent-neutral intelligence
            </span>
          </div>

          {/* Compliance Disclaimer */}
          <div className="pt-4 border-t border-border/50 mt-4">
            <p className="text-[9px] text-muted-foreground/60 text-center leading-relaxed">
              Capital District Nest is a neutral real estate resource platform. Registration is for the purpose of accessing expert-level property data and verified market insights. By continuing, you agree to our{" "}
              <Link to="/privacy" className="text-primary/60 hover:text-primary underline">terms</Link>.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MasterGatekeeperModal;
