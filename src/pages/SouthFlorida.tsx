import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, DollarSign, BarChart3, Building2, TrendingUp, Shield, MapPin, Home, Calculator, Users, ChevronRight, Palmtree } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const areas = [
  { name: "Miami", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80", desc: "World-class city with diverse neighborhoods and strong rental demand." },
  { name: "Brickell", image: "https://images.unsplash.com/photo-1545153996-e01b907329ff?auto=format&fit=crop&w=800&q=80", desc: "Manhattan of the South — luxury condos, walkability, and urban energy." },
  { name: "Coral Gables", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", desc: "Tree-lined streets, top schools, and timeless Mediterranean architecture." },
  { name: "Aventura", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", desc: "High-rise living, waterfront views, and world-class shopping." },
  { name: "Fort Lauderdale", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", desc: "Boating capital with a growing downtown and strong appreciation." },
  { name: "Boca Raton", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", desc: "Upscale community with excellent schools and resort-style living." },
];

const analyzerStats = [
  { label: "Est. Payment", value: "$3,240/mo", sub: "30yr fixed @ 6.5%" },
  { label: "Taxes", value: "$8,400/yr", sub: "Homestead eligible" },
  { label: "Insurance", value: "$4,200/yr", sub: "Wind + flood included" },
  { label: "HOA", value: "$650/mo", sub: "Full amenities" },
  { label: "Cash Flow", value: "+$420/mo", sub: "Based on market rent" },
  { label: "Cap Rate", value: "5.8%", sub: "Above market avg" },
];

const SouthFlorida = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", timeline: "", interest: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({ title: "Please fill in your name and email", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: `South Florida Lead — Timeline: ${formData.timeline || "Not specified"}, Interest: ${formData.interest || "Not specified"}`,
        type: "south-florida",
        origin_town: "south-florida",
      });
      if (error) throw error;
      toast({ title: "We'll be in touch!", description: "A South Florida specialist will reach out shortly." });
      setFormData({ name: "", email: "", phone: "", timeline: "", interest: "" });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead
        title="South Florida Real Estate | Property Intelligence"
        description="Search smarter. Understand financing. Analyze properties like a pro. South Florida real estate intelligence for buyers, sellers, and investors."
        keywords="South Florida real estate, Miami homes, Brickell condos, Coral Gables, Fort Lauderdale, Boca Raton, property analysis"
        canonical="https://capitaldistrictnest.com/south-florida"
      />
      <CleanHeader />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-32 pb-20">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-white/80 mb-6">South Florida Property Intelligence</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-8 leading-[1.05]">
            South Florida Real Estate,<br />
            <span className="font-normal">Explained Clearly</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Search smarter. Understand financing. Analyze properties like a pro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#areas" className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg">
              Explore South Florida <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/analyze-multifamily" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all">
              Analyze a Property
            </Link>
            <a href="#contact" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all">
              Get Pre-Approved
            </a>
          </div>
        </div>
      </section>

      {/* THREE FEATURES */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Search Smarter", desc: "Find homes, condos, and investment opportunities across South Florida." },
              { icon: DollarSign, title: "Understand Financing", desc: "Get clarity on payments, down payment options, and mortgage strategy." },
              { icon: BarChart3, title: "Analyze Any Property", desc: "Break down monthly cost, HOA impact, cash flow, and investment upside." },
            ].map((item) => (
              <div key={item.title} className="group p-10 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-8">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-6">
            Not Just Listings.<br />
            <span className="font-normal">Real Guidance.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-20 font-light leading-relaxed">
            Most sites show you homes. We help you understand what they mean.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Calculator, title: "Monthly Costs", desc: "True cost of ownership" },
              { icon: Building2, title: "Condo & HOA Review", desc: "Assessments, reserves, rules" },
              { icon: TrendingUp, title: "Investment Analysis", desc: "Cash flow & returns" },
              { icon: MapPin, title: "Local Market Insight", desc: "Neighborhood-level data" },
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED AREAS */}
      <section id="areas" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Explore the Market</p>
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 tracking-tight">
              Featured Areas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <div key={area.name} className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer">
                <img src={area.image} alt={area.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">{area.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCING */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Your First Step</p>
              <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight mb-6 leading-tight">
                Financing Starts<br />
                <span className="font-normal">Before the Search</span>
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                Before you fall in love with a property, understand what it will really cost.
              </p>
              <div className="space-y-6">
                {[
                  "Monthly payment scenarios",
                  "First-time buyer pathways",
                  "Condo financing clarity",
                  "Pre-approval guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/financing" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg mt-10 hover:scale-105 transition-transform">
                Get Pre-Approved <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
                  alt="South Florida luxury property"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT ACTUALLY COSTS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Cost Intelligence</p>
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-6">
              What It Actually Costs to Own<br />
              <span className="font-normal">in South Florida</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Beyond the purchase price — understand the full monthly cost before you buy.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Purchase Price", value: "$450,000", sub: null, highlight: false },
              { label: "Est. Monthly Payment", value: "$2,850", sub: "30yr fixed @ 6.5%", highlight: false },
              { label: "Property Taxes", value: "$450", sub: "/ month", highlight: false },
              { label: "Insurance", value: "$350", sub: "/ month · wind + flood", highlight: false },
              { label: "HOA / Condo Fees", value: "$600", sub: "/ month · full amenities", highlight: false },
              { label: "Total Monthly Cost", value: "$4,250", sub: "all-in monthly", highlight: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-8 rounded-3xl text-center transition-all duration-300 ${
                  stat.highlight
                    ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-[1.02]"
                    : "bg-gray-50 border border-gray-100 hover:shadow-lg"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${stat.highlight ? "text-gray-400" : "text-gray-400"}`}>
                  {stat.label}
                </p>
                <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.highlight ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </p>
                {stat.sub && (
                  <p className={`text-sm ${stat.highlight ? "text-gray-400" : "text-gray-500"}`}>{stat.sub}</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-lg text-gray-500 italic mb-10">
              Most buyers focus on the price.<br />
              <span className="font-semibold text-gray-900 not-italic">Smart buyers focus on the total cost.</span>
            </p>
            <Link to="/analyze-multifamily" className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform">
              Analyze Your Own Property <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>


      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">Your Edge</p>
            <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 tracking-tight mb-6">
              Analyze Any Property<br />
              <span className="font-normal">Like a Pro</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Search on Zillow. Analyze like a Pro.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {analyzerStats.map((stat) => (
              <div key={stat.label} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.sub}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/analyze-multifamily" className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform">
              Try the Analyzer <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight mb-6">
            Built for Real Buyers,<br />
            <span className="font-normal">Sellers & Investors</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
            Whether you're relocating, buying your first condo, investing in rental property, or exploring financing — this platform helps you make informed decisions, not guesses.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Home, label: "Moving to South Florida" },
              { icon: Building2, label: "First Condo" },
              { icon: TrendingUp, label: "Investment Property" },
              { icon: DollarSign, label: "Selling & Upgrading" },
              { icon: Shield, label: "Financing Options" },
            ].map((item) => (
              <div key={item.label} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <item.icon className="w-8 h-8 text-gray-900 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 tracking-tight mb-4">
              Planning a Move to<br />
              <span className="font-normal">South Florida?</span>
            </h2>
            <p className="text-lg text-gray-500">Tell us what you're looking for and we'll connect you with a local specialist.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 p-10 rounded-3xl border border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sf-name" className="text-gray-700 text-sm font-medium">Name *</Label>
                <Input id="sf-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="mt-2 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-12" />
              </div>
              <div>
                <Label htmlFor="sf-email" className="text-gray-700 text-sm font-medium">Email *</Label>
                <Input id="sf-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="mt-2 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-12" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sf-phone" className="text-gray-700 text-sm font-medium">Phone</Label>
                <Input id="sf-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 123-4567" className="mt-2 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl h-12" />
              </div>
              <div>
                <Label htmlFor="sf-timeline" className="text-gray-700 text-sm font-medium">Timeline</Label>
                <select id="sf-timeline" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="mt-2 w-full bg-white border border-gray-200 text-gray-900 rounded-xl h-12 px-3 text-sm">
                  <option value="">Select timeline</option>
                  <option value="now">Ready now</option>
                  <option value="3months">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="sf-interest" className="text-gray-700 text-sm font-medium">I'm interested in...</Label>
              <select id="sf-interest" value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="mt-2 w-full bg-white border border-gray-200 text-gray-900 rounded-xl h-12 px-3 text-sm">
                <option value="">Select one</option>
                <option value="buy">Buying</option>
                <option value="sell">Selling</option>
                <option value="invest">Investing</option>
                <option value="finance">Financing</option>
                <option value="exploring">Just starting</option>
              </select>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl h-14 text-lg font-semibold">
              {isSubmitting ? "Submitting..." : "Get Started"}
            </Button>
          </form>
        </div>
      </section>

      {/* POWERED BY */}
      <section className="py-12 px-6 bg-gray-50 text-center">
        <p className="text-sm text-gray-400 tracking-wider">
          Powered by <span className="font-semibold text-gray-500">Capital District Nest</span> Property Intelligence
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default SouthFlorida;
