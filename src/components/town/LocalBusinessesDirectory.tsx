import { useMemo, useState } from "react";
import { Star, Phone, Globe, MapPin, X, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  town: string;
  phone: string;
  website: string;
  address: string;
  description?: string;
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
  { id: "1", name: "Joe's Plumbing", category: "Plumber", town: "Delmar", phone: "(518) 555-0101", website: "joesplumbing.com", address: "123 Delaware Ave, Delmar, NY", description: "Family-owned plumbing serving the Bethlehem area for over 25 years. Emergency service available.", featured: true },
  { id: "2", name: "Delaware Plaza Dental", category: "Dentist", town: "Delmar", phone: "(518) 555-0102", website: "delawareplazadental.com", address: "180 Delaware Ave, Delmar, NY" },
  { id: "3", name: "Perfect Blend Coffee", category: "Coffee", town: "Delmar", phone: "(518) 555-0103", website: "perfectblend.com", address: "4 Corners, Delmar, NY" },
  { id: "4", name: "Glenmont Auto Repair", category: "Auto", town: "Glenmont", phone: "(518) 555-0104", website: "glenmontauto.com", address: "350 Feura Bush Rd, Glenmont, NY" },
  { id: "5", name: "Bethlehem Insurance Agency", category: "Professional", town: "Delmar", phone: "(518) 555-0105", website: "bethlehemins.com", address: "239 Delaware Ave, Delmar, NY" },
  { id: "6", name: "My Place & Co", category: "Restaurants", town: "Delmar", phone: "(518) 555-0106", website: "myplaceandco.com", address: "144 Delaware Ave, Delmar, NY" },
  { id: "7", name: "Delmar Landscaping", category: "Home Services", town: "Delmar", phone: "(518) 555-0107", website: "delmarlandscaping.com", address: "Delmar, NY" },
  { id: "8", name: "Four Corners Legal", category: "Professional", town: "Delmar", phone: "(518) 555-0108", website: "fourcornerslegal.com", address: "Four Corners, Delmar, NY" },
  { id: "9", name: "Slingerlands Pediatrics", category: "Health", town: "Slingerlands", phone: "(518) 555-0109", website: "slingerlandspeds.com", address: "1365 New Scotland Rd, Slingerlands, NY" },
  { id: "10", name: "Spotlight Electric", category: "Home Services", town: "Delmar", phone: "(518) 555-0110", website: "spotlightelectric.com", address: "Delmar, NY" },
  { id: "11", name: "Normanside Realty", category: "Professional", town: "Delmar", phone: "(518) 555-0111", website: "normansiderealty.com", address: "Delmar, NY" },
  { id: "12", name: "Stewart's Shop", category: "Retail", town: "Delmar", phone: "(518) 555-0112", website: "stewartsshops.com", address: "Delaware Ave, Delmar, NY" },
];

const CATEGORIES = ["All", "Restaurants", "Coffee", "Home Services", "Professional", "Health", "Auto", "Retail"];

const Stars = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 text-foreground/20" />
    ))}
  </div>
);

const Avatar = ({ name }: { name: string }) => (
  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/60 font-semibold text-lg">
    {name.charAt(0)}
  </div>
);

const LocalBusinessesDirectory = ({
  townName = "Delmar",
  businesses = DEFAULT_BUSINESSES,
  eyebrow = "Local Directory",
  headline,
  sub = "Trusted local vendors — featured by Capital District Nest",
}: Props) => {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(9);
  const [active, setActive] = useState<LocalBusiness | null>(null);

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const catOk = activeCat === "All" || b.category === activeCat;
      const q = query.trim().toLowerCase();
      const qOk = !q || b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.town.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [businesses, activeCat, query]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="local-favorites" className="bg-white py-20 md:py-28 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="eyebrow-apple text-primary mb-3">{eyebrow}</p>
          <h2 className="h-hero text-foreground mb-4">{headline ?? `${townName} Businesses & Services`}</h2>
          <p className="body-apple text-foreground/60 max-w-2xl mx-auto">{sub}</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${townName} businesses...`}
            className="h-12 rounded-full bg-foreground/[0.04] border-foreground/10 px-5 text-base"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 justify-start md:justify-center scrollbar-none">
          {CATEGORIES.map((c) => {
            const isActive = activeCat === c;
            return (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setVisible(9); }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/[0.05] text-foreground/70 hover:bg-foreground/10"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((b) => {
            const featured = b.featured && activeCat === "All" && !query;
            return (
              <div
                key={b.id}
                className={`group relative rounded-2xl border border-foreground/10 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  featured ? "lg:col-span-2 lg:row-span-1 ring-1 ring-[#c9a449]/30" : ""
                }`}
              >
                {featured && (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c9a449]/10 text-[#9a7d2e] text-xs font-semibold">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar name={b.name} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">{b.name}</h3>
                    <p className="text-xs text-primary font-medium mt-1">{b.category}</p>
                  </div>
                </div>

                {featured && b.description && (
                  <p className="text-sm text-foreground/65 mb-4 leading-relaxed">{b.description}</p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <Stars />
                  <span className="text-xs text-foreground/50 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {b.town}, NY
                  </span>
                </div>

                {/* Blurred contact */}
                <div className="space-y-1.5 mb-4 select-none">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span className="blur-sm">{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="blur-sm">{b.website}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setActive(b)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  {featured ? "View Full Profile" : "Unlock Contact"}
                </Button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/50 py-12">No businesses match your search.</p>
        )}

        {visible < filtered.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={() => setVisible((v) => v + 6)}
              className="rounded-full px-8"
            >
              Load More
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-foreground/[0.03] rounded-3xl py-12 px-6">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Own a business in {townName}?
          </h3>
          <a
            href="/claim-business"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Get Listed — Starting at $5/month
          </a>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{active?.name}</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-medium">{active.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-medium">{active.website}</span>
                </div>
                <div className="flex items-start gap-3 text-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span className="font-medium">{active.address}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <a href={`tel:${active.phone.replace(/\D/g, "")}`} className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Call Now
                </a>
                <a href={`https://${active.website}`} target="_blank" rel="noopener noreferrer" className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-foreground/[0.06] text-foreground hover:bg-foreground/10">
                  Website
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(active.address)}`} target="_blank" rel="noopener noreferrer" className="text-center text-sm font-medium px-3 py-2.5 rounded-full bg-foreground/[0.06] text-foreground hover:bg-foreground/10">
                  Directions
                </a>
              </div>
              <p className="text-xs text-foreground/50 text-center pt-2">
                Want your business here? <a href="/claim-business" className="text-primary underline">List for $5/month</a>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LocalBusinessesDirectory;
