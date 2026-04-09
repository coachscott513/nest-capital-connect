import { useState } from "react";
import { ChevronRight, ArrowRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getFullAddress, type Listing } from "@/lib/listings";
import { toast } from "sonner";

const NAVY = "#0B0F19";

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 8
    ? "bg-emerald-500/8 text-emerald-500 ring-1 ring-emerald-500/15"
    : score >= 5
      ? "bg-amber-500/8 text-amber-500 ring-1 ring-amber-500/15"
      : "bg-red-500/8 text-red-500 ring-1 ring-red-500/15";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${cls}`}>
      {score.toFixed(1)}
    </span>
  );
}

function MetricPill({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wider text-gray-400/70">{label}</span>
      <span className={`text-sm font-medium tabular-nums ${positive ? "text-emerald-500" : "text-red-400"}`}>{value}</span>
    </div>
  );
}

interface UnlockModalProps {
  listing: Listing;
  onClose: () => void;
  onUnlocked: (mlsNumber: string, details: { full_address: string | null; listing_agent: string | null; agency: string | null }) => void;
}

function UnlockModal({ listing, onClose, onUnlocked }: UnlockModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        full_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: `Unlock address: ${listing.masked_address || listing.city} (${listing.list_price ? `$${listing.list_price.toLocaleString()}` : "N/A"})`,
        type: "deal_unlock",
        lead_type: "investor",
        origin_town: listing.city,
      });

      const details = listing.mls_number
        ? await getFullAddress(listing.mls_number)
        : null;

      onUnlocked(listing.mls_number || listing.id, details || {
        full_address: listing.full_address,
        listing_agent: listing.listing_agent,
        agency: listing.agency,
      });
      toast.success("Address unlocked!");
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl" style={{ border: "1px solid rgba(0,0,0,0.06)" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition-colors"><X className="w-5 h-5" /></button>
        <h3 className="text-xl font-semibold text-gray-900 mb-1 tracking-tight">Unlock Full Address</h3>
        <p className="text-sm text-gray-400 mb-8">
          See the full address, listing agent, and agency for this {listing.property_type || "property"} at {listing.list_price ? `$${listing.list_price.toLocaleString()}` : ""}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100}
            className="w-full px-5 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-300 outline-none text-sm focus:ring-1 focus:ring-gray-200 transition-shadow" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255}
            className="w-full px-5 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-300 outline-none text-sm focus:ring-1 focus:ring-gray-200 transition-shadow" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />
          <button type="submit" disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-[13px] tracking-wide transition-all disabled:opacity-50 text-white hover:brightness-110"
            style={{ backgroundColor: NAVY }}>
            {submitting ? "Unlocking..." : "Unlock Address"}{!submitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-[11px] text-gray-300 text-center mt-5">Free · No spam · Your data stays private</p>
      </div>
    </div>
  );
}

interface UnlockedDetails {
  full_address: string | null;
  listing_agent: string | null;
  agency: string | null;
}

interface DealCardProps {
  listing: Listing;
  unlockedDetails?: UnlockedDetails | null;
  onUnlockClick: (listing: Listing) => void;
}

export function DealCard({ listing, unlockedDetails, onUnlockClick }: DealCardProps) {
  const price = listing.list_price ? `$${listing.list_price.toLocaleString()}` : "—";
  const capRate = listing.cap_rate ?? 0;
  const cashFlow = listing.cash_flow_monthly ?? 0;
  const grossRent = listing.gross_rent_monthly ? `$${listing.gross_rent_monthly.toLocaleString()}` : "—";
  const dscr = listing.dscr ?? 0;
  const dealScore = listing.deal_score ?? 0;

  const dom = listing.days_on_market ?? 999;
  const newBadge = dom <= 3 ? "NEW TODAY" : dom <= 7 ? "NEW THIS WEEK" : null;
  const isRehab = (listing.list_price ?? Infinity) < 100000;

  return (
    <div className="group rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_6px_32px_rgba(0,0,0,0.05)] hover:-translate-y-0.5" style={{ border: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-300 font-medium flex items-center gap-2">
            {newBadge && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/15">
                {newBadge}
              </span>
            )}
            {isRehab && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/15">
                POSSIBLE REHAB
              </span>
            )}
            {listing.property_type || "Residential"}{listing.units && listing.units > 1 ? ` · ${listing.units} units` : ""}
          </span>
          <ScoreBadge score={dealScore} />
        </div>
        <p className="text-gray-900 font-medium text-sm mb-1.5">
          {unlockedDetails ? (
            <>
              {unlockedDetails.full_address || listing.masked_address}
              {unlockedDetails.listing_agent && (
                <span className="block text-[11px] text-gray-400 mt-1">
                  Agent: {unlockedDetails.listing_agent} · {unlockedDetails.agency}
                </span>
              )}
            </>
          ) : (
            <>
              <span className="blur-[4px] select-none">XXX</span> {listing.masked_address || listing.city}
            </>
          )}
        </p>
        <p className="text-2xl font-semibold text-gray-900 tracking-tight mb-7">{price}</p>
        <div className="grid grid-cols-4 gap-3 pb-6 mb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
          <MetricPill label="Cap" value={`${capRate.toFixed(1)}%`} positive={capRate >= 7} />
          <MetricPill label="Flow" value={`${cashFlow >= 0 ? "+" : ""}$${Math.round(cashFlow)}`} positive={cashFlow >= 0} />
          <MetricPill label="Rent" value={grossRent} positive />
          <MetricPill label="DSCR" value={dscr.toFixed(2)} positive={dscr >= 1} />
        </div>
        {unlockedDetails ? (
          <span className="text-[11px] font-medium text-emerald-500 inline-flex items-center gap-1.5">✓ Address unlocked</span>
        ) : (
          <button onClick={() => onUnlockClick(listing)} className="text-[11px] font-medium inline-flex items-center gap-1 tracking-wide transition-all hover:gap-2 opacity-60 group-hover:opacity-100 text-gray-500">
            Unlock full address <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export { UnlockModal, ScoreBadge, MetricPill };
export type { UnlockedDetails };
