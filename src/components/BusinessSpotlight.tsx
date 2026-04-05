import { useState, useEffect, useRef } from "react";
import { MapPin, Instagram, Facebook, Globe, Lock, TrendingUp } from "lucide-react";
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
  isVerified?: boolean; // SaaS Teaser - all start unverified
}

const featuredBusinesses: Business[] = [
  {
    id: "1",
    name: "Druthers Brewing Co.",
    logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    ownerName: "Chris Martell",
    story: "Founded in 2012, Druthers has grown from a single Saratoga brewpub to a regional powerhouse with locations in Albany, Clifton Park, and Schenectady. A true Capital District anchor.",
    offering: "Craft brewery, restaurant & neighborhood anchor",
    town: "Clifton Park",
    website: "https://www.druthersbrewing.com/"
  },
  {
    id: "2",
    name: "Clifton Park Coffee Co.",
    logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerName: "Michael Torres",
    story: "What started as a mobile coffee cart at Exit 9 farmers market became the town's daily gathering spot. Michael sources beans directly from small farms in Colombia and Ethiopia.",
    offering: "Specialty coffee & local community hub",
    town: "Clifton Park",
    website: "https://cliftonparkcoffee.com"
  },
  {
    id: "3",
    name: "Exit 9 Fitness Studio",
    logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    ownerName: "Jennifer Walsh",
    story: "A former D1 athlete, Jennifer built Exit 9 Fitness to bring elite training methods to everyday families in Clifton Park. Her studio now trains 500+ members monthly.",
    offering: "Boutique fitness & athletic training",
    town: "Clifton Park",
    website: "https://exit9fitness.com"
  },
  {
    id: "4",
    name: "Clifton Park Veterinary",
    logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    ownerName: "Dr. Emily Nguyen",
    story: "Dr. Nguyen brought cutting-edge veterinary care to Clifton Park after training at Cornell. Her clinic is now the go-to for pet families in the region.",
    offering: "Full-service veterinary care & pet wellness",
    town: "Clifton Park",
    website: "https://cliftonparkvet.com"
  },
  {
    id: "5",
    name: "The Tech Collective CP",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    ownerName: "David Park",
    story: "David left his Silicon Valley role to build a tech ecosystem in Clifton Park. The Tech Collective now supports 30+ startups and remote workers driving local innovation.",
    offering: "Coworking, tech incubator & innovation hub",
    town: "Clifton Park",
    website: "https://thetechcollectivecp.com"
  },
  {
    id: "6",
    name: "Wheatfields Bakehouse",
    logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    ownerName: "Rachel Anderson",
    story: "A Capital District institution since 1982, Wheatfields has expanded from a small bakery to multiple locations. Their artisan breads and pastries define local food culture.",
    offering: "Artisan bakery, café & catering",
    town: "Clifton Park",
    website: "https://wheatfields.com"
  },
  {
    id: "7",
    name: "Vischer Ferry Boutique",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    ownerName: "Lisa Crawford",
    story: "Lisa curates a collection of upscale home goods and fashion from designers across the Northeast. Vischer Ferry Boutique has become a destination for discerning shoppers.",
    offering: "High-end retail & lifestyle goods",
    town: "Clifton Park",
    website: "https://vischerferry.com"
  },
  {
    id: "8",
    name: "Saratoga Coffee Traders",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    ownerName: "Michael Chen",
    story: "Started in a small garage roasting beans for neighbors, Michael grew Saratoga Coffee Traders into the region's premier specialty roaster. Now serving 40+ cafes.",
    offering: "Specialty coffee roasting & wholesale distribution",
    town: "Saratoga Springs",
    website: "https://saratogacoffeetraders.com"
  },
  {
    id: "9",
    name: "Troy Brewing Co.",
    logo: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    ownerName: "James O'Brien",
    story: "A third-generation Troy native, James revived his grandfather's brewing recipes and opened Troy Brewing Co. in a renovated riverside warehouse.",
    offering: "Craft brewery & taproom experience",
    town: "Troy",
    website: "https://troybrewing.com"
  },
  {
    id: "10",
    name: "Albany Tech Hub",
    logo: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    ownerName: "Marcus Williams",
    story: "Marcus transformed a vacant downtown building into Albany's premier innovation center. The Tech Hub now anchors a growing ecosystem of startups and remote workers.",
    offering: "Coworking & startup incubator",
    town: "Albany",
    website: "https://albanytechhub.com"
  },
  {
    id: "11",
    name: "Delmar Fitness Studio",
    logo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    ownerName: "Sarah Martinez",
    story: "After 15 years as a physical therapist, Sarah founded Delmar Fitness to bridge the gap between rehab and performance training for the community.",
    offering: "Boutique fitness & recovery services",
    town: "Delmar",
    website: "https://delmarfitness.com"
  },
  {
    id: "12",
    name: "Niskayuna Gardens",
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    ownerName: "Elena Rossi",
    story: "Elena transformed her family's 50-acre property into a sustainable nursery and landscape design studio, becoming the region's authority on native plants.",
    offering: "Landscape design & native plant nursery",
    town: "Niskayuna",
    website: "https://niskayunagardens.com"
  }
];

const BusinessSpotlight = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyingBusiness, setVerifyingBusiness] = useState<Business | null>(null);
  const [shouldScrollToVerify, setShouldScrollToVerify] = useState(false);
  const verifyButtonRef = useRef<HTMLButtonElement>(null);
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
    // Open drawer and scroll to verify section
    setSelectedBusiness(business);
    setShouldScrollToVerify(true);
  };

  // Effect to scroll to verify button when drawer opens
  useEffect(() => {
    if (shouldScrollToVerify && selectedBusiness && verifyButtonRef.current) {
      // Small delay to ensure drawer is fully open
      setTimeout(() => {
        verifyButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setShouldScrollToVerify(false);
      }, 300);
    }
  }, [shouldScrollToVerify, selectedBusiness]);

  const handleOpenVerifyModal = (e: React.MouseEvent, business: Business) => {
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

  // Social icons component - visible but locked (grayscale teaser) until verified
  const SocialStack = ({ business }: { business: Business }) => {
    const isVerified = business.isVerified ?? false;
    
    return (
      <div className="flex items-center justify-center gap-1.5 mt-2 relative group/social">
        {[
          { Icon: Instagram, label: "Instagram", activeColor: "text-pink-500" },
          { Icon: Facebook, label: "Facebook", activeColor: "text-accent" },
          { Icon: TikTokIcon, label: "TikTok", activeColor: "text-foreground" },
          { Icon: Globe, label: "Website", activeColor: "text-primary" },
        ].map(({ Icon, label, activeColor }) => (
          <button
            key={label}
            onClick={(e) => {
              if (!isVerified) {
                handleSocialClick(e, business);
              }
            }}
            className={`relative p-1.5 rounded-full transition-all duration-300 group/icon ${
              isVerified 
                ? `${activeColor} hover:scale-110` 
                : "text-muted-foreground/50 grayscale hover:grayscale-0 hover:text-muted-foreground cursor-pointer"
            }`}
            title={isVerified ? label : `Business Unverified. Claim to activate ${label}.`}
          >
            <Icon className="w-4 h-4" />
            {/* Lock overlay for unverified */}
            {!isVerified && (
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-background/90 rounded-full flex items-center justify-center border border-border shadow-sm opacity-60 group-hover/icon:opacity-100 group-hover/icon:scale-110 transition-all">
                <Lock className="w-1.5 h-1.5 text-muted-foreground" />
              </div>
            )}
          </button>
        ))}
        
        {/* Hover tooltip for unverified */}
        {!isVerified && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
            <span className="text-[10px] font-medium text-primary bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full border border-primary/30 whitespace-nowrap shadow-lg">
              Claim to unlock
            </span>
          </div>
        )}
      </div>
    );
  };

  // Double the array for seamless loop
  const doubledBusinesses = [...featuredBusinesses, ...featuredBusinesses];

  return (
    <section className="section-massive overflow-hidden relative isolate">
      {/* Liquid Glass Background Layer (behind all content) */}
      <div className="absolute inset-0 z-0 bg-primary/40 backdrop-blur-[40px] pointer-events-none" />
      
      {/* Full-width container */}
      <div className="relative z-10 px-[2%] lg:px-[3%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Community</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
            Featured Local Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
            The staples that define Clifton Park living
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
                className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-2xl p-3"
                onClick={() => {
                  setSelectedBusiness(business);
                  setShouldScrollToVerify(true);
                }}
              >
                {/* Teal Glow Border */}
                <div className="relative spotlight">
                  <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full p-[2px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-110 transition-transform duration-300 glow-primary group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card p-0.5 filter-none backdrop-blur-none">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-full h-full rounded-full object-cover filter-none"
                      />
                    </div>
                  </div>
                  {/* Status Badge - Verified or Claim CTA */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap filter-none backdrop-blur-none ${
                    business.isVerified 
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]" 
                      : "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse"
                  }`}>
                    {business.isVerified ? "Verified" : "Claim"}
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
          
          {/* Fade edges - seamless with glass background */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden relative">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory -mx-[3%] px-[3%]">
            {featuredBusinesses.map((business) => (
              <div
                key={business.id}
                className="flex flex-col items-center gap-3 flex-shrink-0 snap-center group cursor-pointer transition-all duration-300 active:shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-2xl p-3"
                onClick={() => {
                  setSelectedBusiness(business);
                  setShouldScrollToVerify(true);
                }}
              >
                {/* Teal Glow Border */}
                <div className="relative spotlight">
                  <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-110 transition-transform duration-300 glow-primary group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card p-0.5 filter-none backdrop-blur-none">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-full h-full rounded-full object-cover filter-none"
                      />
                    </div>
                  </div>
                  {/* Status Badge - Verified or Claim CTA */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap filter-none backdrop-blur-none ${
                    business.isVerified 
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]" 
                      : "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse"
                  }`}>
                    {business.isVerified ? "Verified" : "Claim"}
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
          
          {/* Fade edges - seamless with glass background */}
          <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Business Detail Drawer */}
      <Sheet open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-primary/70 backdrop-blur-[30px] border-l border-white/10 overflow-y-auto">
          {selectedBusiness && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-foreground">
                  {selectedBusiness.name}
                </SheetTitle>
              </SheetHeader>

              {/* Owner Photo (Gated / hidden until verification) */}
              <div className="mb-6 relative spotlight rounded-2xl overflow-hidden">
                {/* Intentionally do NOT render the actual photo until verified */}
                <div className="w-full h-64 bg-gradient-to-br from-muted/40 via-background/30 to-muted/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/50 backdrop-blur-[25px] px-5 py-4 rounded-2xl text-center border border-border shadow-lg">
                    <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Photo Protected</p>
                    <p className="text-xs text-muted-foreground mt-1">Verify to unlock founder details</p>
                  </div>
                </div>
              </div>

              {/* Owner Name & Town */}
              <div className="flex items-center justify-between mb-6">
                <div className={`${!(selectedBusiness.isVerified ?? false) ? "blur-[5px] select-none" : ""}`}>
                  <h3 className="text-lg font-semibold text-foreground">{selectedBusiness.ownerName}</h3>
                  <p className="text-sm text-muted-foreground">Owner & Founder</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedBusiness.town}
                </div>
              </div>

              {/* Blurred Story Section - Premium Gated */}
              <div className="mb-6 relative">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">The Founding Story</h4>
                
                {/* Blurred Content Container */}
                <div className="relative rounded-xl overflow-hidden">
                  {/* Blurred Text - Redacted Document Effect */}
                  <div className="select-none pointer-events-none">
                    <p className="text-muted-foreground leading-relaxed body-airy blur-[6px] opacity-60">
                      {selectedBusiness.story}
                    </p>
                  </div>
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/80 backdrop-blur-[2px]" />
                  
                  {/* Verification CTA Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-primary/70 backdrop-blur-[30px] px-6 py-4 rounded-2xl text-center max-w-[280px] border border-white/10 shadow-lg shadow-primary/20">
                      <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground mb-3">
                        Story Protected
                      </p>
                      <Button
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={(e) => handleOpenVerifyModal(e, selectedBusiness)}
                      >
                        Owner: Verify to Unlock Narrative
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blurred About Founder Section */}
              <div className="mb-6 relative">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">About the Founder</h4>
                
                <div className="relative rounded-xl overflow-hidden">
                  {/* Blurred Bio Lines - Elegant Redacted Effect */}
                  <div className="select-none pointer-events-none space-y-2">
                    <div className="h-3 bg-muted-foreground/30 rounded blur-[4px] w-full" />
                    <div className="h-3 bg-muted-foreground/25 rounded blur-[4px] w-11/12" />
                    <div className="h-3 bg-muted-foreground/20 rounded blur-[4px] w-4/5" />
                    <div className="h-3 bg-muted-foreground/25 rounded blur-[4px] w-9/12" />
                  </div>
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50" />
                </div>
              </div>

              {/* Offering - Visible */}
              <div className="p-5 bg-primary/50 backdrop-blur-[25px] border border-white/10 rounded-2xl mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2">What They Offer</h4>
                <p className="text-muted-foreground">{selectedBusiness.offering}</p>
              </div>

              {/* Website Link - Visible */}
              {selectedBusiness.website && (
                <div className="p-4 bg-primary/50 backdrop-blur-[25px] border border-white/10 rounded-2xl mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Website</span>
                    </div>
                    <a 
                      href={selectedBusiness.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
                    >
                      {selectedBusiness.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  </div>
                </div>
              )}

              {/* Elite Features Preview - Gated Map & Specials */}
              <div className="p-5 bg-primary/50 backdrop-blur-[25px] border border-white/10 rounded-2xl mb-6 relative overflow-hidden">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Map & Weekly Specials
                </h4>
                
                {/* Blurred preview content */}
                <div className="relative">
                  <div className="blur-[6px] opacity-40 pointer-events-none select-none">
                    <div className="h-24 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
                      <div className="h-3 bg-muted-foreground/15 rounded w-1/2" />
                    </div>
                  </div>
                  
                  {/* Overlay CTA */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Lock className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      Unlock to list your current specials and menus
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-[10px] px-3 py-1 h-auto border-primary/30 text-primary hover:bg-primary/10"
                      onClick={(e) => handleOpenVerifyModal(e, selectedBusiness)}
                    >
                      Verify to Unlock Elite Features
                    </Button>
                  </div>
                </div>
              </div>

              {/* Market Intelligence Section */}
              <div className="p-5 bg-primary/50 backdrop-blur-[25px] border border-primary/30 rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Nest Intelligence</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="text-primary font-medium">{selectedBusiness.town} Market Strength:</span> Seller-Leaning (102.7% Sale-to-List)
                </p>
                <p className="text-xs text-muted-foreground">
                  57-69% of homes sold over list price in 2025. Median home value ~$460,503 with high inventory velocity (~11 days on market).
                </p>
              </div>

              {/* Profile Completion Teaser */}
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-primary/10 border border-emerald-500/30 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Profile Completion</span>
                  <span className="text-xs font-bold text-emerald-400">20%</span>
                </div>
                <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full w-1/5 bg-gradient-to-r from-emerald-500 to-primary rounded-full" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Verify to unlock: Social Links • Contact Info • Map • Weekly Specials
                </p>
              </div>

              {/* Primary Verify CTA with Pulse */}
              <div id="verify-section" className="mb-6">
                <Button
                  ref={verifyButtonRef}
                  onClick={(e) => handleOpenVerifyModal(e, selectedBusiness)}
                  className="w-full rounded-full text-sm py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse border border-emerald-400/50"
                >
                  Verify This Business
                </Button>
              </div>

              {/* Social Links - Blurred & Gated */}
              <div className="relative mb-6">
                <div className="flex items-center justify-center gap-3 blur-[3px] opacity-50 pointer-events-none">
                  {[Instagram, Facebook, TikTokIcon, Globe].map((Icon, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-full border border-border text-muted-foreground"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={(e) => handleOpenVerifyModal(e, selectedBusiness)}
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                >
                  <span className="text-xs font-medium text-primary bg-background/90 px-3 py-1.5 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Verify to activate links
                  </span>
                </button>
              </div>

              <p className="text-xs text-center text-muted-foreground italic">
                We protect business narratives until owner verification
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
