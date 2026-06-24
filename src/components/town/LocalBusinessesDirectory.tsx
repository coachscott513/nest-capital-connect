import { useMemo, useState } from "react";
import { Star, Phone, Globe, MapPin, Sparkles, Crown, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { businessTelHref, isValidBusinessPhone } from "@/lib/businessContact";

export type BusinessTier = "free" | "featured" | "premium";

export interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  town: string;
  phone: string;
  website: string;
  address: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  tier?: BusinessTier;
  /** @deprecated use tier */
  featured?: boolean;
}

interface Props {
  townName?: string;
  businesses?: LocalBusiness[];
  eyebrow?: string;
  headline?: string;
  sub?: string;
}

const DEFAULT_BUSINESSES: LocalBusiness[] = [
  { id: "1", name: "Joe's Plumbing", category: "Home Services", town: "Delmar", phone: "(518) 555-0101", website: "joesplumbing.com", address: "123 Delaware Ave, Delmar, NY", rating: 4.8, reviewCount: 127, tier: "free", description: "Family-owned plumbing serving Bethlehem for 25+ years. Emergency service available." },
  { id: "2", name: "Perfect Blend Coffee", category: "Restaurants", town: "Delmar", phone: "(518) 555-0102", website: "perfectblend.com", address: "4 Corners, Delmar, NY", rating: 4.9, reviewCount: 312, tier: "featured", description: "Locally roasted coffee, fresh pastries, and a community gathering spot at Four Corners." },
  { id: "3", name: "Delaware Plaza Dental", category: "Health", town: "Delmar", phone: "(518) 555-0103", website: "delawareplazadental.com", address: "180 Delaware Ave, Delmar, NY", rating: 4.7, reviewCount: 89, tier: "free" },
  { id: "4", name: "My Place & Co", category: "Restaurants", town: "Delmar", phone: "(518) 555-0104", website: "myplaceandco.com", address: "144 Delaware Ave, Delmar, NY", rating: 4.6, reviewCount: 204, tier: "free" },
  { id: "5", name: "Bethlehem Insurance", category: "Professional", town: "Delmar", phone: "(518) 555-0105", website: "bethlehemins.com", address: "239 Delaware Ave, Delmar, NY", rating: 4.8, reviewCount: 56, tier: "featured", description: "Independent agency offering home, auto, and business coverage tailored to Capital District families." },
  { id: "6", name: "Spotlight Electric", category: "Home Services", town: "Delmar", phone: "(518) 555-0106", website: "spotlightelectric.com", address: "Delmar, NY", rating: 5.0, reviewCount: 178, tier: "premium", description: "Licensed master electricians. Whole-home rewires, panel upgrades, EV chargers, and 24/7 emergency service." },
  { id: "7", name: "Four Corners Legal", category: "Professional", town: "Delmar", phone: "(518) 555-0107", website: "fourcornerslegal.com", address: "Four Corners, Delmar, NY", rating: 4.9, reviewCount: 41, tier: "free" },
  { id: "8", name: "Glenmont Auto Repair", category: "Auto", town: "Slingerlands", phone: "(518) 555-0108", website: "glenmontauto.com", address: "350 Feura Bush Rd, Glenmont, NY", rating: 4.7, reviewCount: 215, tier: "free" },
  { id: "9", name: "Delmar Landscaping", category: "Home Services", town: "Delmar", phone: "(518) 555-0109", website: "delmarlandscaping.com", address: "Delmar, NY", rating: 4.8, reviewCount: 92, tier: "featured", description: "Full-service landscape design, hardscaping, and seasonal maintenance across Bethlehem and Slingerlands." },
  { id: "10", name: "Slingerlands Pediatrics", category: "Health", town: "Slingerlands", phone: "(518) 555-0110", website: "slingerlandspeds.com", address: "1365 New Scotland Rd, Slingerlands, NY", rating: 4.9, reviewCount: 168, tier: "free" },
  { id: "11", name: "Capital Region HVAC", category: "Home Services", town: "Albany", phone: "(518) 555-0111", website: "capregionhvac.com", address: "Albany, NY", rating: 4.6, reviewCount: 134, tier: "free" },
  { id: "12", name: "The Local Eatery", category: "Restaurants", town: "Delmar", phone: "(518) 555-0112", website: "thelocaleatery.com", address: "Delmar, NY", rating: 4.5, reviewCount: 98, tier: "free" },
  { id: "13", name: "Bethlehem Roofing", category: "Home Services", town: "Delmar", phone: "(518) 555-0113", website: "bethlehemroofing.com", address: "Delmar, NY", rating: 4.7, reviewCount: 73, tier: "featured", description: "GAF-certified roofers serving Delmar and surrounding towns. Free inspections and lifetime warranties." },
  { id: "14", name: "Delaware Animal Hospital", category: "Health", town: "Delmar", phone: "(518) 555-0114", website: "delawareanimal.com", address: "Delmar, NY", rating: 4.8, reviewCount: 256, tier: "free" },
  { id: "15", name: "Tri-City Accounting", category: "Professional", town: "Albany", phone: "(518) 555-0115", website: "tricityaccounting.com", address: "Albany, NY", rating: 4.9, reviewCount: 47, tier: "free" },
  { id: "16", name: "Main Street Barber", category: "Retail", town: "Delmar", phone: "(518) 555-0116", website: "mainstbarber.com", address: "Delmar, NY", rating: 4.8, reviewCount: 142, tier: "free" },
  { id: "17", name: "Capital Plumbing Plus", category: "Home Services", town: "Colonie", phone: "(518) 555-0117", website: "capitalplumbingplus.com", address: "Colonie, NY", rating: 4.6, reviewCount: 88, tier: "free" },
  { id: "18", name: "Delmar Wine & Spirits", category: "Retail", town: "Delmar", phone: "(518) 555-0118", website: "delmarwine.com", address: "Delmar, NY", rating: 4.7, reviewCount: 119, tier: "free" },
  { id: "19", name: "Bethlehem Family Practice", category: "Health", town: "Delmar", phone: "(518) 555-0119", website: "bethlehemfp.com", address: "Delmar, NY", rating: 4.9, reviewCount: 198, tier: "premium", description: "Concierge-level family medicine, pediatrics, and women's health. Same-day appointments, no rushed visits." },
  { id: "20", name: "Hudson Valley Electric", category: "Home Services", town: "Troy", phone: "(518) 555-0120", website: "hudsonvalleyelectric.com", address: "Troy, NY", rating: 4.5, reviewCount: 64, tier: "free" },
];

const CATEGORIES = ["All", "Home Services", "Restaurants", "Professional", "Health", "Auto", "Retail"];

const tierOf = (b: LocalBusiness): BusinessTier =>
  b.tier ?? (b.featured ? "featured" : "free");

const StarsRating = ({ rating = 0, count = 0 }: { rating?: number; count?: number }) => (
  <div className="flex items-center gap-1.5 text-xs text-foreground/60">
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < Math.round(rating) ? "text-[#c9a449] fill-[#c9a449]" : "text-foreground/15"
          }`}
        />
      ))}
    </div>
    {rating > 0 && (
      <span className="font-medium text-foreground/70">
        {rating.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    )}
  </div>
);

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
      {initials}
    </div>
  );
};

const TierBadge = ({ tier }: { tier: BusinessTier }) => {
  if (tier === "featured")
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c9a449]/10 text-[#9a7d2e] text-[10px] font-bold tracking-wider uppercase">
        <Sparkles className="w-3 h-3" /> Featured
      </span>
    );
  if (tier === "premium")
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#c9a449] to-[#e0c068] text-white text-[10px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(201,164,73,0.5)]">
        <Crown className="w-3 h-3" /> Premium
      </span>
    );
  return null;
};

const LocalBusinessesDirectory = ({
  townName = "Delmar",
  businesses = DEFAULT_BUSINESSES,
  eyebrow = "Local Directory",
  headline,
  sub,
}: Props) => {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(12);
  const [active, setActive] = useState<LocalBusiness | null>(null);

  // Sort: premium → featured → free, then by rating
  const sorted = useMemo(() => {
    const rank = { premium: 0, featured: 1, free: 2 } as const;
    return [...businesses].sort((a, b) => {
      const r = rank[tierOf(a)] - rank[tierOf(b)];
      return r !== 0 ? r : (b.rating ?? 0) - (a.rating ?? 0);
    });
  }, [businesses]);

  const filtered = useMemo(() => {
    return sorted.filter((b) => {
      const catOk = activeCat === "All" || b.category === activeCat;
      const q = query.trim().toLowerCase();
      const qOk =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.town.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [sorted, activeCat, query]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: businesses.length };
    for (const b of businesses) m[b.category] = (m[b.category] ?? 0) + 1;
    return m;
  }, [businesses]);

  const shown = filtered.slice(0, visible);
  const activeTelHref = active ? businessTelHref(active.phone) : null;

  return (
    <section id="local-favorites" className="bg-white py-20 md:py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="eyebrow-apple text-primary mb-3">{eyebrow}</p>
          <h2 className="h-hero text-foreground mb-4">
            {headline ?? `${townName} Businesses & Services`}
          </h2>
          <p className="body-apple text-foreground/60 max-w-2xl mx-auto">
            {sub ?? `${businesses.length}+ local vendors — keeping dollars in our community`}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {businesses.length} businesses listed
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${townName} businesses...`}
              className="h-12 rounded-full bg-foreground/[0.04] border-foreground/10 pl-11 pr-5 text-base"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-start md:justify-center scrollbar-none">
          {CATEGORIES.map((c) => {
            const isActive = activeCat === c;
            const n = counts[c] ?? 0;
            return (
              <button
                key={c}
                onClick={() => {
                  setActiveCat(c);
                  setVisible(12);
                }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(13,110,102,0.3)]"
                    : "bg-foreground/[0.05] text-foreground/70 hover:bg-foreground/10"
                }`}
              >
                {c} {n > 0 && <span className="opacity-60">({n})</span>}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((b) => {
            const tier = tierOf(b);
            const isPremium = tier === "premium";
            const isFeatured = tier === "featured";
            return (
              <div
                key={b.id}
                className={`group relative rounded-2xl bg-white p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${
                  isPremium
                    ? "border-2 border-[#c9a449]/40 shadow-[0_0_24px_rgba(201,164,73,0.12)]"
                    : isFeatured
                    ? "border border-[#c9a449]/30"
                    : "border border-foreground/10"
                }`}
              >
                {tier !== "free" && (
                  <div className="absolute top-4 right-4">
                    <TierBadge tier={tier} />
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4 pr-20">
                  <Avatar name={b.name} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight truncate">
                      {b.name}
                    </h3>
                    <p className="text-xs text-foreground/55 mt-1">
                      {b.category} • {b.town}, NY
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <StarsRating rating={b.rating} count={b.reviewCount} />
                </div>

                {(isFeatured || isPremium) && b.description && (
                  <p className="text-sm text-foreground/65 mb-4 leading-relaxed line-clamp-2">
                    {b.description}
                  </p>
                )}

                {/* Blurred contact preview */}
                <div className="space-y-1.5 mb-4 select-none rounded-xl bg-foreground/[0.025] p-3">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{isValidBusinessPhone(b.phone) ? "Business phone available" : "Phone unavailable"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="blur-[3px]">{b.website}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setActive(b)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  Unlock Contact
                </Button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/50 py-12">
            No businesses match your search.
          </p>
        )}

        {visible < filtered.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setVisible((v) => v + 12)}
              className="rounded-full px-8"
            >
              Load More ({filtered.length - visible} more)
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl py-12 px-6 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Own a business in the Capital District?
          </h3>
          <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
            Join {businesses.length}+ local businesses already listed. Start FREE, upgrade anytime.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-[0_8px_24px_rgba(13,110,102,0.3)]"
          >
            Local Business Solutions — FREE
          </a>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl">{active?.name}</DialogTitle>
              {active && tierOf(active) !== "free" && <TierBadge tier={tierOf(active)} />}
            </div>
            {active && (
              <p className="text-sm text-foreground/55 pt-1">
                {active.category} • {active.town}, NY
              </p>
            )}
          </DialogHeader>
          {active && (
            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-medium">{isValidBusinessPhone(active.phone) ? active.phone : "Not available yet"}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-medium">Website available</span>
                </div>
                <div className="flex items-start gap-3 text-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span className="font-medium">{active.address}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {activeTelHref ? (
                  <a
                    href={activeTelHref}
                    className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Call Business
                  </a>
                ) : (
                  <span className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-foreground/[0.06] text-foreground/50">
                    Phone unavailable
                  </span>
                )}
                <a
                  href={`https://${active.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-foreground/[0.06] text-foreground hover:bg-foreground/10"
                >
                  Website
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(active.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-foreground/[0.06] text-foreground hover:bg-foreground/10"
                >
                  Directions
                </a>
              </div>
              <p className="text-xs text-foreground/50 text-center pt-2">
                Capital District Nest is not the listed business. Business information may be incomplete or pending verification.
              </p>
              <p className="text-xs text-foreground/50 text-center pt-2">
                Want your business here?{" "}
                <a href="/pricing" className="text-primary underline font-medium">
                  Get listed FREE
                </a>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LocalBusinessesDirectory;
