import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import heroTownsWide from "@/assets/hero-towns-wide.jpg";
import heroDiscoveryWide from "@/assets/hero-discovery-wide.jpg";
import heroBusinessWide from "@/assets/hero-business-wide.jpg";
import heroFinanceWide from "@/assets/hero-finance-wide.jpg";
import heroOwnersWide from "@/assets/hero-owners-wide.jpg";
import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryFinance from "@/assets/category-finance.jpg";
import categoryServices from "@/assets/category-services.jpg";
import categoryContractors from "@/assets/category-contractors.jpg";
import categoryRetail from "@/assets/category-retail.jpg";

type EcoCard = {
  eyebrow: string;
  title: string;
  copy: string;
  to: string;
  image: string;
};

const CARDS: EcoCard[] = [
  { eyebrow: "Find", title: "Homes", copy: "Search homes across the Capital District.", to: "/homes", image: heroDiscoveryWide },
  { eyebrow: "Guidance", title: "Real Estate Professionals", copy: "Local agents who know the neighborhoods.", to: "/homes/partners", image: categoryRealEstate },
  { eyebrow: "Financing", title: "Mortgage", copy: "Lenders and loan options for every buyer.", to: "/financing", image: heroFinanceWide },
  { eyebrow: "Due Diligence", title: "Home Inspectors", copy: "Know exactly what you're buying.", to: "/businesses/home-inspection", image: categoryServices },
  { eyebrow: "Legal", title: "Real Estate Attorneys", copy: "Protect your investment at the closing table.", to: "/businesses/real-estate-attorneys", image: categoryFinance },
  { eyebrow: "Closing", title: "Title Companies", copy: "Clear title, smooth closings.", to: "/businesses/title-companies", image: heroBusinessWide },
  { eyebrow: "Protection", title: "Homeowners Insurance", copy: "Coverage from trusted local agents.", to: "/businesses/insurance", image: heroOwnersWide },
  { eyebrow: "Settle In", title: "Moving & Storage", copy: "Local movers who show up on time.", to: "/businesses/movers", image: categoryRetail },
  { eyebrow: "Improve", title: "Contractors", copy: "Make the house feel like yours.", to: "/businesses/contractors", image: categoryContractors },
  { eyebrow: "Exterior", title: "Roofing", copy: "Protect what's over your head.", to: "/businesses/roofing", image: heroTownsWide },
  { eyebrow: "Exterior", title: "Windows", copy: "Efficiency, light, and curb appeal.", to: "/businesses/windows", image: heroBusinessWide },
  { eyebrow: "Outdoor", title: "Landscaping", copy: "Love where you live, inside and out.", to: "/businesses/landscaping", image: categoryServices },
  { eyebrow: "Interiors", title: "Interior Design", copy: "Bring the vision to life.", to: "/businesses/interior-design", image: categoryRetail },
  { eyebrow: "Own & Rent", title: "Property Management", copy: "Support for owners and investors.", to: "/businesses/property-management", image: heroOwnersWide },
];

export default function BuyingAndOwningHome() {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 720);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="buying-and-owning-a-home"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6 flex-wrap"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
              A Permanent Homeowner Ecosystem
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
              Buying &amp; Owning a Home.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/65 font-light leading-relaxed max-w-2xl">
              Everything you need before, during, and after your move.
            </p>
          </div>
          <p className="text-[12.5px] text-white/45 font-light">
            One connected local ecosystem.
          </p>
        </motion.div>

        {/* Rail */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-end justify-between mb-5">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/60">
              The homeowner journey
            </p>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition inline-flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition inline-flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="-mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-5 md:gap-6 pb-4">
              {CARDS.map((c) => (
                <Link
                  key={c.title}
                  to={c.to}
                  className="group shrink-0 snap-start w-[78%] sm:w-[46%] md:w-[32%] lg:w-[26%] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-[#5eead4]/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,15,25,0.10) 0%, rgba(11,15,25,0.55) 60%, rgba(11,15,25,0.94) 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                        {c.eyebrow}
                      </p>
                      <h4 className="mt-2 text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-[1.1] text-white">
                        {c.title}
                      </h4>
                      <p className="mt-2 text-[13px] text-white/70 font-light leading-relaxed">
                        {c.copy}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/80 group-hover:text-[#5eead4] group-hover:gap-2.5 transition-all">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12px] text-white/40 md:hidden">Swipe to explore →</p>
        </div>
      </div>
    </section>
  );
}
