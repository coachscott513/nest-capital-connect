import { Link } from "react-router-dom";
import { ExternalLink, Lock } from "lucide-react";
import type { PreviewListing } from "@/hooks/usePreviewListings";

const fmtPrice = (n: number | null) =>
  n == null ? "Price pending" : `$${Number(n).toLocaleString()}`;

const CATEGORY_LABEL: Record<string, string> = {
  residential: "Residential",
  rental: "Rental",
  multi_family: "Multi-Family / Mixed-Use",
  land: "Land",
  commercial: "Commercial / Other",
};

type Props = {
  townName: string;
  townSlug: string;
  listings: PreviewListing[];
  category?: string;
};

const PreviewListingsPanel = ({ townName, townSlug, listings, category }: Props) => {
  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center text-white/65">
        No {category ? CATEGORY_LABEL[category]?.toLowerCase() ?? category : "property"} link previews
        in {townName} yet — being updated during launch.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
      {listings.map((l) => {
        const hasUrl = !!l.public_listing_url;
        const claimHref = `/homes/claim-listing?mls=${encodeURIComponent(l.mls_number)}&town=${townSlug}`;
        const meta: string[] = [];
        if (l.property_subtype) meta.push(l.property_subtype);
        if (l.acres) meta.push(`${l.acres} ac`);
        if (l.year_built) meta.push(`built ${l.year_built}`);
        if (l.days_on_market != null) meta.push(`${l.days_on_market} DOM`);

        return (
          <div key={l.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors">
            <div className="sm:w-28 text-lg font-semibold text-white shrink-0">{fmtPrice(l.price)}</div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">{l.address}</div>
              <div className="text-xs text-white/55 truncate">{meta.join(" · ")}</div>
              <div className="text-xs text-white/65 truncate mt-0.5">
                Listed by{" "}
                {l.agent_slug ? (
                  <Link to={`/homes/agents/${l.agent_slug}`} className="text-white/85 hover:text-[#5eead4]">
                    {l.agent_name}
                  </Link>
                ) : (
                  <span className="text-white/85">{l.agent_name ?? "Listing source pending"}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
              {hasUrl ? (
                <a
                  href={l.public_listing_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-apple inline-flex items-center gap-1.5 text-xs px-3 py-1.5"
                >
                  View Original Listing <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  to={claimHref}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] hover:bg-[#5eead4]/20"
                >
                  <Lock className="w-3 h-3" /> Listing Link Pending — Claim
                </Link>
              )}
              <span className="text-[10px] text-white/40">MLS #{l.mls_number}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewListingsPanel;
