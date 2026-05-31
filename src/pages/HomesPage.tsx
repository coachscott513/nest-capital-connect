import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Search, ExternalLink } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TOWNS = [
  { name: "Delmar", slug: "delmar", display: "Delmar" },
  { name: "Albany", slug: "albany", display: "Albany" },
  { name: "Saratoga Springs", slug: "saratoga-springs", display: "Saratoga Springs" },
  { name: "Troy", slug: "troy", display: "Troy" },
  { name: "Schenectady", slug: "schenectady", display: "Schenectady" },
  { name: "Clifton Park", slug: "clifton-park", display: "Clifton Park" },
  { name: "Niskayuna", slug: "niskayuna", display: "Niskayuna" },
  { name: "Colonie", slug: "colonie", display: "Colonie" },
  { name: "Guilderland", slug: "guilderland", display: "Guilderland" },
];

const REMAX_BASE = "https://scottalvarez.remax.com/";
const REMAX_ADVANCED = "https://scottalvarez.remax.com/index.php";

// RE/MAX IDX property type codes
const TYPE_CODE: Record<string, string[]> = {
  "single-family": ["1"],
  multifamily: ["3"],
  condo: ["2", "31"],
  land: ["5"],
};

const PRICE_LABEL: Record<string, string> = {
  "0-300000": "Under $300K",
  "300000-500000": "$300K – $500K",
  "500000-750000": "$500K – $750K",
  "750000-1000000": "$750K – $1M",
  "1000000-": "$1M+",
};

const TYPE_LABEL: Record<string, string> = {
  "single-family": "Single-Family",
  multifamily: "Multifamily",
  condo: "Condo / Townhome",
  land: "Land",
};

function track(event: string, payload: Record<string, unknown>) {
  try {
    // @ts-expect-error gtag may be injected by analytics
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      // @ts-expect-error gtag
      window.gtag("event", event, payload);
    }
  } catch {
    /* no-op */
  }
}

function buildRemaxUrl(opts: { townSlug?: string; price?: string; type?: string }) {
  const town = TOWNS.find((t) => t.slug === opts.townSlug);
  if (!town && !opts.price && !opts.type) return REMAX_BASE;

  const params = new URLSearchParams();
  params.set("advanced", "1");
  if (town) params.set("display", town.display);
  params.set("beds", "0");
  params.set("baths", "0");

  if (opts.price) {
    const [min, max] = opts.price.split("-");
    params.set("min", min || "0");
    params.set("max", max || "100000000");
  } else {
    params.set("min", "0");
    params.set("max", "100000000");
  }

  const codes = opts.type ? TYPE_CODE[opts.type] : undefined;
  const tail: string[] = [];
  if (codes) codes.forEach((c) => tail.push(`types%5B%5D=${c}`));
  tail.push("statuses%5B%5D=0");
  if (town) tail.push(`keywords=City%3D${encodeURIComponent(town.display)}`);
  tail.push("sortby=listings.price+ASC", "rtype=map");

  return `${REMAX_ADVANCED}?${params.toString()}&${tail.join("&")}`;
}

const HomesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [town, setTown] = useState(searchParams.get("town") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [leadOpen, setLeadOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState({
    full_name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Keep URL in sync (without reload)
  useEffect(() => {
    const next = new URLSearchParams();
    if (town) next.set("town", town);
    if (price) next.set("price", price);
    if (type) next.set("type", type);
    setSearchParams(next, { replace: true });
  }, [town, price, type, setSearchParams]);

  const currentTownLabel = useMemo(
    () => TOWNS.find((t) => t.slug === town)?.name || "",
    [town]
  );

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    track("homes_search_click", { town, price, type, source_page: "/homes" });
    const url = buildRemaxUrl({ townSlug: town, price, type });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleTownChip = (slug: string, name: string) => {
    track("homes_town_chip_click", { town: slug, source_page: "/homes" });
    setTown(slug);
    const url = buildRemaxUrl({ townSlug: slug, price, type });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleFullMls = () => {
    track("full_mls_search_click", { source_page: "/homes" });
    window.open(REMAX_BASE, "_blank", "noopener,noreferrer");
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.full_name.trim() || !lead.email.trim() || !lead.phone.trim()) {
      toast({
        title: "Missing info",
        description: "Name, email, and phone are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        `Source: /homes`,
        currentTownLabel ? `Town: ${currentTownLabel}` : "Town: (any)",
        price ? `Price: ${PRICE_LABEL[price] || price}` : "Price: (any)",
        type ? `Type: ${TYPE_LABEL[type] || type}` : "Type: (any)",
        lead.notes ? `Notes: ${lead.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("leads").insert({
        full_name: lead.full_name.trim(),
        email: lead.email.trim(),
        phone: lead.phone.trim(),
        type: "homes_search_request",
        lead_type: "buyer",
        message,
        location: currentTownLabel || null,
        origin_town: currentTownLabel || null,
        price_range: price ? PRICE_LABEL[price] || price : null,
      });
      if (error) throw error;

      track("homes_lead_form_submit", { town, price, type, source_page: "/homes" });
      toast({
        title: "Request received",
        description:
          "Thanks — your home search request was received. Our team will review it and follow up shortly.",
      });
      setLead({ full_name: "", email: "", phone: "", notes: "" });
      setLeadOpen(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Couldn't submit",
        description:
          "We couldn't submit this right now. Please email team@capitaldistrictnest.com or call/text 518-207-9348 and we'll help get it handled.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full bg-transparent text-[15px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Search Homes Across the Capital District | Capital District Nest</title>
        <meta
          name="description"
          content="Browse active home listings across the Capital District by town, price, and property type — straight from the live MLS feed."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes" />
      </Helmet>

      <CleanHeader />

      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
              Homes
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.02]">
              Search homes across the Capital District.
            </h1>
            <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light">
              Pick a town, price, and property type — we'll open live MLS results in a new tab.
            </p>
          </div>

          <form
            onSubmit={submitSearch}
            className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2"
          >
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Town</span>
              <select value={town} onChange={(e) => setTown(e.target.value)} className={fieldClass}>
                <option value="">All towns</option>
                {TOWNS.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Price</span>
              <select value={price} onChange={(e) => setPrice(e.target.value)} className={fieldClass}>
                <option value="">Any price</option>
                {Object.entries(PRICE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Type</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
                <option value="">All types</option>
                {Object.entries(TYPE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
            >
              <Search className="w-4 h-4" /> Search Homes
            </button>
          </form>

          {/* Secondary actions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setLeadOpen(true)}
              className="text-[#0d6e66] font-semibold underline-offset-4 hover:underline"
            >
              Want us to send matching homes instead?
            </button>
            {town && (
              <Link
                to={`/living-in/${town}`}
                className="text-[#1d1d1f]/70 hover:text-[#0d6e66] transition"
              >
                · Explore {currentTownLabel}
              </Link>
            )}
          </div>

          {/* Town shortcuts */}
          <div className="mt-12">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#1d1d1f]/55 text-center mb-5">
              Jump to a Town
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TOWNS.map((t) => (
                <div key={t.slug} className="inline-flex items-center gap-1 rounded-full border border-[#1d1d1f]/10 hover:border-[#0d6e66]/35 transition overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleTownChip(t.slug, t.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[#1d1d1f] hover:text-[#0d6e66] transition"
                  >
                    {t.name}
                  </button>
                  <Link
                    to={`/living-in/${t.slug}`}
                    aria-label={`Explore ${t.name}`}
                    className="pr-3 pl-1 py-2 text-[11px] uppercase tracking-wider text-[#1d1d1f]/50 hover:text-[#0d6e66] border-l border-[#1d1d1f]/10"
                  >
                    Explore
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleFullMls}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
            >
              Open Full MLS Search <ExternalLink className="w-4 h-4" />
            </button>
            <p className="mt-3 text-xs text-[#1d1d1f]/55">Live MLS via RE/MAX — opens in a new tab</p>
          </div>
        </div>
      </section>

      <Dialog open={leadOpen} onOpenChange={setLeadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send me matching homes</DialogTitle>
            <DialogDescription>
              Tell us what you're looking for and our team will follow up with curated listings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitLead} className="space-y-3">
            <Input
              placeholder="Full name *"
              value={lead.full_name}
              onChange={(e) => setLead({ ...lead, full_name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email *"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Phone *"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Any town</option>
                {TOWNS.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Any price</option>
                {Object.entries(PRICE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Any type</option>
                {Object.entries(TYPE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <Textarea
              placeholder="Notes (bedrooms, neighborhoods, must-haves...)"
              value={lead.notes}
              onChange={(e) => setLead({ ...lead, notes: e.target.value })}
              rows={3}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "Sending…" : (<><ArrowRight className="w-4 h-4" /> Send my request</>)}
            </button>
            <p className="text-[11px] text-[#1d1d1f]/55 text-center">
              Or call/text Scott directly at 518-207-9348
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default HomesPage;
