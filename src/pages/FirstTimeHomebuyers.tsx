import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, MessageCircle, Mail } from "lucide-react";

const FirstTimeHomebuyers = () => {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  const cityName = cityParam
    ? cityParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  const displayCity = cityName || "Capital District";
  const areaLabel = cityName ? `the ${cityName} area` : "Albany County";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    concern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        type: "first-time-buyer",
        message: `Biggest concern: ${formData.concern || "Not specified"}. City: ${displayCity}`,
        origin_town: cityParam || null,
      });
      if (error) throw error;
      toast.success("Thanks! We'll be in touch shortly.");
      setFormData({ fullName: "", email: "", phone: "", concern: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{displayCity} First-Time Home Buyer Grants &amp; Low-Down Programs</title>
        <meta name="description" content={`See every ${displayCity}-area grant, low-down, and first-time buyer option. Check eligibility in minutes.`} />
        <meta name="keywords" content={`${displayCity.toLowerCase()} first time home buyer, down payment assistance, fha loans, grants`} />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {displayCity} First-Time Home Buyer
            </h1>
            <p className="text-xl text-muted-foreground">
              Grants &amp; Low-Down Programs
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-background">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Unlock down-payment help, reduced rates, and closing cost assistance available in {areaLabel}. We&apos;ll match you with the right lender and program, then guide your purchase from search to keys.
            </p>

            <h2 className="text-2xl font-semibold mb-3 mt-8 text-foreground">Programs We Track</h2>
            <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
              <li>State and local down-payment assistance grants</li>
              <li>FHA, VA, USDA, SONYMA, and lender credits</li>
              <li>Seller concessions and inspection credits strategies</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3 mt-8 text-foreground">Next Steps</h2>
            <p className="text-muted-foreground mb-6">
              Get pre-approved, set your budget, and browse homes using our live search (top of homepage). We&apos;ll line up tours and negotiate the best terms.
            </p>

            <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
              <a href="/albany-investment-properties" className="text-primary hover:underline">Investment</a>
              <span className="text-muted-foreground">·</span>
              <a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit</a>
              <span className="text-muted-foreground">·</span>
              <a href="/cash-flow-report" className="text-primary hover:underline">Cash-Flow Report</a>
            </nav>
          </div>
        </section>

        <section className="py-12 bg-card border-t border-border">
          <div className="container mx-auto max-w-lg px-4">
            <h2 className="text-3xl font-semibold mb-2 text-foreground text-center">
              Still have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Let us know if there&apos;s anything we can help answer to make this important time stress-free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-10">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11"
                />
              </div>
              <div>
                <Label htmlFor="concern">What&apos;s your biggest concern about buying?</Label>
                <Select value={formData.concern} onValueChange={(v) => setFormData({ ...formData, concern: v })}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select one…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Down payment">Down payment</SelectItem>
                    <SelectItem value="Monthly payment">Monthly payment</SelectItem>
                    <SelectItem value="Getting approved">Getting approved</SelectItem>
                    <SelectItem value="Finding the right home">Finding the right home</SelectItem>
                    <SelectItem value="Understanding the process">Understanding the process</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full h-12 font-semibold" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send My Question"}
              </Button>
            </form>

            <div className="border-t border-border pt-8">
              <p className="text-center text-sm text-muted-foreground mb-4">Or reach Scott directly</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:5186762347" className="flex-1">
                  <Button className="w-full h-12 gap-2 bg-[#C9A84C] hover:bg-[#b89740] text-white font-semibold">
                    <Phone className="w-4 h-4" />
                    Call Scott
                  </Button>
                </a>
                <a href="sms:5186762347" className="flex-1">
                  <Button variant="outline" className="w-full h-12 gap-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-semibold">
                    <MessageCircle className="w-4 h-4" />
                    Text Scott
                  </Button>
                </a>
                <a href="mailto:scott@capitaldistrictnest.com" className="flex-1">
                  <Button variant="outline" className="w-full h-12 gap-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-semibold">
                    <Mail className="w-4 h-4" />
                    Email Scott
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FirstTimeHomebuyers;
