import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import alphaListReport from "@/assets/alpha-list-report.jpg";

const IntelListSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("You're on the list! Check your inbox for the Regional Insight Report.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          We Analyze 500+ Properties a Week.{" "}
          <span className="text-primary">You Get the Top 1%.</span>
        </h2>

        {/* Hook Text */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join our VIP list to get the weekly Capital District Nest Report. 
          Includes Rent Rolls, ROI projections, and Off-Market deals.
        </p>

        {/* Blurred Report Preview */}
        <div className="relative mb-10 mx-auto max-w-2xl rounded-2xl overflow-hidden border border-border">
          <img 
            src={alphaListReport} 
            alt="Investment Report Preview" 
            className="w-full h-auto blur-md opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-background/40">
            <div className="bg-card/90 backdrop-blur-sm px-6 py-4 rounded-2xl border border-border">
              <p className="text-foreground font-semibold text-lg">
                🔒 Sign up to unlock the full report
              </p>
            </div>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
            required
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-12 px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Me the List"}
          </Button>
        </form>

        {/* Trust indicator */}
        <p className="mt-4 text-sm text-muted-foreground">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
};

export default IntelListSection;
