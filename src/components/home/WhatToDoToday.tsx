import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CalendarHeart, Store, Home, Wallet, ArrowRight, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * "What do you want to do today?"
 * Premium dark utility section — app-style local discovery.
 * Five action cards · Near Me modal · Build My Weekend wizard.
 */

const TOWNS = [
  "Albany", "Delmar", "Bethlehem", "Clifton Park", "Saratoga Springs",
  "Schenectady", "Troy", "Niskayuna", "Guilderland", "Queensbury",
  "Voorheesville", "Mechanicville", "Amsterdam",
];

const VIBES = ["Cozy & Local", "Date Night", "Family Fun", "Outdoorsy", "Nightlife"];
const CATEGORIES = ["Events", "Dining", "Music", "Family", "Specials"];

type CardDef = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  Icon: typeof MapPin;
  action: "near-me" | "weekend" | "route";
  href?: string;
};

const CARDS: CardDef[] = [
  {
    id: "near-me",
    title: "Find something near me",
    desc: "Restaurants, coffee, events, services, and local spots open now.",
    cta: "Use Near Me",
    Icon: MapPin,
    action: "near-me",
  },
  {
    id: "weekend",
    title: "Plan this weekend",
    desc: "Events, music, dining, family activities, and local specials.",
    cta: "Build My Weekend",
    Icon: CalendarHeart,
    action: "weekend",
  },
  {
    id: "business",
    title: "Find a local business",
    desc: "Contractors, dentists, attorneys, salons, accountants, and more.",
    cta: "Search Businesses",
    Icon: Store,
    action: "route",
    href: "/local",
  },
  {
    id: "homes",
    title: "Search homes",
    desc: "Browse towns, homes, neighborhoods, and first-time buyer resources.",
    cta: "Search Homes",
    Icon: Home,
    action: "route",
    href: "/homes",
  },
  {
    id: "finance",
    title: "Get financial help",
    desc: "Mortgages, insurance, tax strategy, investing, banking, and advisors.",
    cta: "Explore Finances",
    Icon: Wallet,
    action: "route",
    href: "/finances",
  },
];

export default function WhatToDoToday() {
  const navigate = useNavigate();
  const [nearMeOpen, setNearMeOpen] = useState(false);
  const [weekendOpen, setWeekendOpen] = useState(false);

  const handleCardClick = (c: CardDef) => {
    if (c.action === "near-me") setNearMeOpen(true);
    else if (c.action === "weekend") setWeekendOpen(true);
    else if (c.action === "route" && c.href) navigate(c.href);
  };

  return (
    <section className="bg-[#0B0F19] w-full border-t border-[#2D3748]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 text-[#5eead4]">
            Search anything local
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            What do you want to do today?
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
            Search, plan, compare, and discover the Capital District from one local front door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => handleCardClick(c)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative text-left rounded-3xl bg-[#1E2230] border border-[#2D3748] p-6 md:p-7 min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:border-[#5eead4]/60 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(94,234,212,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0d6e66]/15 border border-[#5eead4]/20 flex items-center justify-center mb-5 group-hover:bg-[#0d6e66]/25 transition-colors">
                  <c.Icon className="w-6 h-6 text-[#5eead4]" />
                </div>
                <h3 className="text-xl md:text-[22px] font-semibold text-white tracking-[-0.015em] leading-tight">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm md:text-[15px] text-white/65 leading-relaxed font-light">
                  {c.desc}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                {c.cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <NearMeModal open={nearMeOpen} onOpenChange={setNearMeOpen} />
      <WeekendModal open={weekendOpen} onOpenChange={setWeekendOpen} />
    </section>
  );
}

/* ──────────────────────────── Near Me Modal ──────────────────────────── */

function NearMeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "denied">("idle");

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onOpenChange(false);
        navigate(`/local?nearby=1&lat=${latitude.toFixed(4)}&lng=${longitude.toFixed(4)}`);
      },
      () => setStatus("denied"),
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const pickTown = (town: string) => {
    onOpenChange(false);
    navigate(`/local?town=${encodeURIComponent(town)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0B0F19] border-[#2D3748] text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Find something near you</DialogTitle>
          <DialogDescription className="text-white/65">
            Share your location to see businesses and events open near you, or pick a town.
          </DialogDescription>
        </DialogHeader>

        {status !== "denied" ? (
          <div className="space-y-3 pt-2">
            <Button
              onClick={requestLocation}
              disabled={status === "loading"}
              className="w-full h-12 bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white rounded-full font-semibold"
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Locating…</>
              ) : (
                <><MapPin className="w-4 h-4 mr-2" /> Use my location</>
              )}
            </Button>
            <button
              onClick={() => setStatus("denied")}
              className="w-full text-sm text-white/55 hover:text-white/80 transition"
            >
              Pick a town instead
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5eead4] mb-3">
              Choose a town
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto">
              {TOWNS.map((t) => (
                <button
                  key={t}
                  onClick={() => pickTown(t)}
                  className="text-left px-4 py-3 rounded-xl bg-[#1E2230] border border-[#2D3748] text-white text-sm hover:border-[#5eead4]/60 hover:bg-[#0d6e66]/15 transition"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────── Weekend Modal ──────────────────────────── */

function WeekendModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [town, setTown] = useState("");
  const [vibe, setVibe] = useState("");
  const [category, setCategory] = useState("");

  const reset = () => { setStep(0); setTown(""); setVibe(""); setCategory(""); };

  const handleOpenChange = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const finish = (cat: string) => {
    setCategory(cat);
    setStep(3);
  };

  const goToResults = () => {
    const params = new URLSearchParams();
    if (town) params.set("town", town);
    if (category) params.set("cat", category.toLowerCase());
    if (vibe) params.set("vibe", vibe.toLowerCase().replace(/\s+/g, "-"));
    handleOpenChange(false);
    navigate(`/local?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg bg-[#0B0F19] border-[#2D3748] text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Build my weekend</DialogTitle>
          <DialogDescription className="text-white/65">
            Three quick taps. We'll curate things to do nearby.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-1.5 pt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#5eead4]" : "bg-[#2D3748]"}`}
            />
          ))}
        </div>

        {step === 0 && (
          <Step title="Where?">
            <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto">
              {TOWNS.map((t) => (
                <Chip key={t} label={t} onClick={() => { setTown(t); setStep(1); }} />
              ))}
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step title="What's the vibe?">
            <div className="grid grid-cols-2 gap-2">
              {VIBES.map((v) => (
                <Chip key={v} label={v} onClick={() => { setVibe(v); setStep(2); }} />
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Pick a category">
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <Chip key={c} label={c} onClick={() => finish(c)} />
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <div className="pt-2 space-y-4">
            <div className="rounded-2xl bg-[#1E2230] border border-[#2D3748] p-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5eead4] mb-3">
                Your weekend
              </p>
              <p className="text-white text-lg font-semibold leading-snug">
                {category} in {town}
              </p>
              <p className="text-white/65 text-sm mt-1">Vibe: {vibe}</p>
            </div>
            <Button
              onClick={goToResults}
              className="w-full h-12 bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white rounded-full font-semibold"
            >
              Show me results <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button
              onClick={reset}
              className="w-full text-sm text-white/55 hover:text-white/80 transition"
            >
              Start over
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-2">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5eead4] mb-3">{title}</p>
      {children}
    </div>
  );
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-3 rounded-xl bg-[#1E2230] border border-[#2D3748] text-white text-sm hover:border-[#5eead4]/60 hover:bg-[#0d6e66]/15 transition"
    >
      {label}
    </button>
  );
}
