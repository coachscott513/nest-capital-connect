import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, ArrowRight, Shield, Sparkles } from "lucide-react";
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
      // Save lead to Supabase
      const { error } = await supabase.from("leads").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: `Property search request${townName ? ` for ${townName}` : ""}${searchQuery ? `: ${searchQuery}` : ""}`,
        type: "property_search",
        location: townName || null,
      });

      if (error) throw error;

      toast.success("Access granted! Redirecting to search...");
      
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
      <DialogContent className="sm:max-w-md bg-background border-border glass-strong p-0 overflow-hidden">
        {/* Header with Glow Effect */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          {/* Teal glow orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-light text-foreground tracking-tight">
              Unlock Property Intelligence
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
              {townName 
                ? `Access professional underwriting data for ${townName}`
                : "Access professional-grade property search & analytics"
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {/* Google Sign-In */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 glass border-border hover:bg-muted/50 font-medium"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-name" className="text-sm text-muted-foreground">
              Full Name
            </Label>
            <Input
              id="gatekeeper-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-12 bg-muted/30 border-border focus:border-primary"
              required
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-email" className="text-sm text-muted-foreground">
              Email Address
            </Label>
            <Input
              id="gatekeeper-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 bg-muted/30 border-border focus:border-primary"
              required
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="gatekeeper-phone" className="text-sm text-muted-foreground">
              Phone <span className="text-muted-foreground/60">(optional)</span>
            </Label>
            <Input
              id="gatekeeper-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(518) 555-0123"
              className="h-12 bg-muted/30 border-border focus:border-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 font-semibold glow-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Unlocking..."
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Unlock Property Search
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[11px] text-muted-foreground">
              Your data stays private. No spam. Agent-neutral intelligence.
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MasterGatekeeperModal;
