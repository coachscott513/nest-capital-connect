import { useState, useEffect, useRef } from "react";
import { ExternalLink, MapPin, Instagram, Facebook, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// TikTok icon component (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface Business {
  id: string;
  name: string;
  logo: string;
  ownerPhoto: string;
  ownerName: string;
  story: string;
  offering: string;
  town: string;
  website?: string;
}

const featuredBusinesses: Business[] = [
  {
    id: "1",
    name: "Saratoga Coffee Traders",
    logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerName: "Michael Chen",
    story: "Started in a small garage roasting beans for neighbors, Michael grew Saratoga Coffee Traders into the region's premier specialty roaster. Now serving 40+ cafes across the Capital District.",
    offering: "Specialty coffee roasting & wholesale distribution",
    town: "Saratoga Springs"
  },
  {
    id: "2",
    name: "Delmar Fitness Studio",
    logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    ownerName: "Sarah Martinez",
    story: "After 15 years as a physical therapist, Sarah founded Delmar Fitness to bridge the gap between rehab and performance training for the community.",
    offering: "Boutique fitness & recovery services",
    town: "Delmar"
  },
  {
    id: "3",
    name: "Troy Brewing Co.",
    logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    ownerName: "James O'Brien",
    story: "A third-generation Troy native, James revived his grandfather's brewing recipes and opened Troy Brewing Co. in a renovated riverside warehouse.",
    offering: "Craft brewery & taproom experience",
    town: "Troy"
  },
  {
    id: "4",
    name: "Clifton Park Veterinary",
    logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    ownerName: "Dr. Emily Nguyen",
    story: "Dr. Nguyen brought cutting-edge veterinary care to Clifton Park after training at Cornell. Her clinic is now the go-to for pet families in the region.",
    offering: "Full-service veterinary care & pet wellness",
    town: "Clifton Park"
  },
  {
    id: "5",
    name: "Albany Tech Hub",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    ownerName: "David Park",
    story: "David left his Silicon Valley role to build a tech ecosystem in his hometown. Albany Tech Hub now supports 50+ startups and remote workers.",
    offering: "Coworking & startup incubator",
    town: "Albany"
  },
  {
    id: "6",
    name: "Niskayuna Gardens",
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    ownerName: "Lisa Thompson",
    story: "Lisa transformed her family's 50-acre farm into a sustainable nursery and landscape design studio, becoming the region's authority on native plants.",
    offering: "Landscape design & native plant nursery",
    town: "Niskayuna"
  },
  {
    id: "7",
    name: "Schenectady Provisions",
    logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    ownerName: "Marcus Williams",
    story: "Marcus left a corporate career to pursue his passion for artisanal charcuterie. Schenectady Provisions now supplies farm-to-table restaurants across the region.",
    offering: "Artisanal meats & local provisions",
    town: "Schenectady"
  },
  {
    id: "8",
    name: "Guilderland Yoga",
    logo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    ownerName: "Priya Sharma",
    story: "After training in India, Priya brought authentic yoga practices to Guilderland. Her studio has become a sanctuary for stressed professionals and families alike.",
    offering: "Yoga & mindfulness studio",
    town: "Guilderland"
  },
  {
    id: "9",
    name: "Queensbury Outfitters",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    ownerName: "Jake Morrison",
    story: "A Lake George native and outdoor enthusiast, Jake created Queensbury Outfitters to gear up hikers, kayakers, and adventurers exploring the Adirondacks.",
    offering: "Outdoor gear & guided adventures",
    town: "Queensbury"
  },
  {
    id: "10",
    name: "Colonie Flower Market",
    logo: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    ownerName: "Elena Rossi",
    story: "Elena's family has run Colonie Flower Market for three generations. Today she combines traditional floristry with modern sustainable practices.",
    offering: "Floral design & event styling",
    town: "Colonie"
  },
  {
    id: "11",
    name: "Latham Auto Collective",
    logo: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerName: "Tony Benedetto",
    story: "Tony turned his childhood passion for classic cars into Latham Auto Collective, a premium detailing and restoration shop trusted by collectors across the Northeast.",
    offering: "Auto detailing & restoration",
    town: "Latham"
  },
  {
    id: "12",
    name: "Voorheesville Bakehouse",
    logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    ownerName: "Rachel Kim",
    story: "Rachel left New York City's restaurant scene to open a neighborhood bakehouse. Her sourdough and pastries now draw visitors from across the Capital District.",
    offering: "Artisan breads & pastries",
    town: "Voorheesville"
  }
];

const BusinessSpotlight = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyingBusiness, setVerifyingBusiness] = useState<Business | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll animation for infinity scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate); };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSocialClick = (e: React.MouseEvent, business: Business) => {
    e.stopPropagation();
    setVerifyingBusiness(business);
    setShowVerifyModal(true);
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        message: `Business Verification Request - ${verifyingBusiness?.name}`,
        type: "business-verification",
        lead_type: "Business Owner",
        location: verifyingBusiness?.town || "Capital District",
      });

      if (error) throw error;

      toast({
        title: "Verification Request Sent",
        description: "We'll reach out within 24 hours to activate your listing.",
      });

      setShowVerifyModal(false);
      setFormData({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social icons component with blurred "locked" effect
  const SocialStack = ({ business }: { business: Business }) => (
    <div className="flex items-center justify-center gap-2 mt-2 relative">
      {/* Blurred overlay container */}
      <div className="flex items-center gap-1.5 filter blur-[2px] opacity-50">
        {[
          { Icon: Instagram, label: "Instagram" },
          { Icon: Facebook, label: "Facebook" },
          { Icon: TikTokIcon, label: "TikTok" },
          { Icon: Globe, label: "Website" },
        ].map(({ Icon, label }) => (
          <div
            key={label}
            className="p-1.5 rounded-full text-muted-foreground"
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
      {/* Clickable overlay */}
      <button
        onClick={(e) => handleSocialClick(e, business)}
        className="absolute inset-0 flex items-center justify-center cursor-pointer group"
        title="Verify to unlock social links"
      >
        <span className="opacity-0 group-hover:opacity-100 text-[10px] font-medium text-primary bg-background/90 px-2 py-0.5 rounded-full transition-opacity duration-200 whitespace-nowrap">
          Verify to unlock
        </span>
      </button>
    </div>
  );

  // Double the array for seamless loop
  const doubledBusinesses = [...featuredBusinesses, ...featuredBusinesses];

  return (
    <section className="section-massive bg-background overflow-hidden">
      {/* Full-width container */}
      <div className="px-[2%] lg:px-[3%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Local Partners</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
            Featured Local Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
            Discover the businesses that make the Capital District thrive
          </p>
        </div>

        {/* Infinity Scroll Row - Desktop */}
        <div className="hidden md:block relative">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden pb-8"
          >
            {doubledBusinesses.map((business, index) => (
              <div
                key={`${business.id}-${index}`}
                className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer"
                onClick={() => setSelectedBusiness(business)}
              >
                {/* Teal Glow Border */}
                <div className="relative spotlight">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full p-[2px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-105 transition-transform duration-300 glow-primary">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card p-0.5">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Verified
                  </div>
                </div>
                
                {/* Business Name */}
                <span className="text-sm font-medium text-foreground text-center max-w-[120px] leading-tight group-hover:text-primary transition-colors">
                  {business.name}
                </span>

                {/* Social Stack */}
                <SocialStack business={business} />
              </div>
            ))}
          </div>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden relative">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory -mx-[3%] px-[3%]">
            {featuredBusinesses.map((business) => (
              <div
                key={business.id}
                className="flex flex-col items-center gap-3 flex-shrink-0 snap-center group cursor-pointer"
                onClick={() => setSelectedBusiness(business)}
              >
                {/* Teal Glow Border */}
                <div className="relative spotlight">
                  <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-105 transition-transform duration-300 glow-primary">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card p-0.5">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Verified
                  </div>
                </div>
                
                {/* Business Name */}
                <span className="text-sm font-medium text-foreground text-center max-w-[100px] leading-tight group-hover:text-primary transition-colors">
                  {business.name}
                </span>

                {/* Social Stack */}
                <SocialStack business={business} />
              </div>
            ))}
          </div>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Business Detail Drawer */}
      <Sheet open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-l border-border">
          {selectedBusiness && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-foreground">
                  {selectedBusiness.name}
                </SheetTitle>
              </SheetHeader>

              {/* Owner Photo */}
              <div className="mb-6 relative spotlight rounded-2xl overflow-hidden">
                <img
                  src={selectedBusiness.ownerPhoto}
                  alt={selectedBusiness.ownerName}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Owner Name & Town */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedBusiness.ownerName}</h3>
                  <p className="text-sm text-muted-foreground">Owner & Founder</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedBusiness.town}
                </div>
              </div>

              {/* Story */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">The Story</h4>
                <p className="text-muted-foreground leading-relaxed body-airy">{selectedBusiness.story}</p>
              </div>

              {/* Offering */}
              <div className="p-5 glass rounded-2xl mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2">What They Offer</h4>
                <p className="text-muted-foreground">{selectedBusiness.offering}</p>
              </div>

              {/* Social Links - Gated */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {[Instagram, Facebook, TikTokIcon, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    onClick={(e) => handleSocialClick(e, selectedBusiness)}
                    className="p-3 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_12px_rgba(0,245,255,0.4)] transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Social links activate after business verification
              </p>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Verification Modal */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Verify This Listing
            </DialogTitle>
          </DialogHeader>
          
          <p className="text-muted-foreground text-sm mb-4">
            This listing is currently in <span className="text-primary font-medium">Community View</span>. 
            Are you the owner or manager? Verify to activate direct links and premium features.
          </p>

          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Smith"
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="(518) 555-1234"
                className="bg-background border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Business Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="you@yourbusiness.com"
                className="bg-background border-border"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full rounded-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Verification"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll reach out within 24 hours to verify and activate your listing.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BusinessSpotlight;
