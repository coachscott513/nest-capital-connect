import { Link } from "react-router-dom";
import { ExternalLink, Lock, Calculator, Wallet } from "lucide-react";
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

const SUBTYPE_DISPLAY: Record<string, string> = {
  residential: "Residential",
  rental: "Rental",
  multi_family: "Multi-Family",
  land: "Land",
};

type Props = {
  townName: string;
  townSlug: string;
  listings: PreviewListing[];
  category?: string;
};

/**
 * Neutral public-facing property link row.
 * Per brand-neutrality rules, we DO NOT publicly show unclaimed agent name,
 * phone, email, or brokerage contact. Agent name is only rendered when the
 * profile has been claimed (agent_slug present + claim_status === "claimed").
 */
const PreviewListingsPanel = ({ townName, townSlug, listings, category }: Props) => {
  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center text-white/65">
        No {category ? CATEGORY_LABEL[category]?.toLowerCase() ?? category : "property"} link previews
        in {townName} yet — property links being updated during launch.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
      {listings.map((l) => {
        const hasUrl = !!l.public_listing_url;
        const claimHref = `/homes/claim-listing?mls=${encodeURIComponent(l.mls_number)}&town=${townSlug}`;
        const cat = l.property_category ?? "residential";
        const categoryLabel =
          SUBTYPE_DISPLAY[cat] ?? l.property_subtype ?? "Residential";

        const meta: string[] = [categoryLabel];
        if (l.acres && cat === "land") meta.push(`${l.acres} ac`);
        if (l.days_on_market != null) meta.push(`${l.days_on_market} DOM`);

        const analyzerParams = new URLSearchParams({ town: townSlug });
        if (l.price) analyzerParams.set("price", String(l.price));
        if (cat) analyzerParams.set("property_type", cat);

        const firstTimeParams = new URLSearchParams({
          tab: "first-time-buyer",
          town: townSlug,
        });
        if (l.price) firstTimeParams.set("price", String(l.price));

        const detailHref =
          l.town_slug && l.address_slug
            ? `/homes/listings/${l.town_slug}/${l.address_slug}`
            : null;

        // Only show agent name publicly if claimed.
        const isClaimed = l.claim_status === "claimed" && !!l.agent_slug;

        return (
          <div
            key={l.id}
            className="flex flex-col lg:flex-row lg:items-center gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors"
          >
            <div className="lg:w-28 text-lg font-semibold text-white shrink-0">
              {fmtPrice(l.price)}
            </div>
            <div className="flex-1 min-w-0">
              {detailHref ? (
                <Link
                  to={detailHref}
                  className="text-white font-medium truncate hover:text-[#5eead4] block"
                >
                  {l.address}
                </Link>
              ) : (
                <div className="text-white font-medium truncate">{l.address}</div>
              )}
              <div className="text-xs text-white/55 truncate mt-0.5">
                {meta.join(" · ")} · {l.city ?? townName}
              </div>
              <div className="text-[11px] text-white/45 mt-1">
                {hasUrl ? (
                  <>Property link preview · Source confirmed</>
                ) : (
                  <>Property link preview · Listing source pending</>
                )}
                {isClaimed && (
                  <>
                    {" · Listed by "}
                    <Link
                      to={`/homes/agents/${l.agent_slug}`}
                      className="text-white/70 hover:text-[#5eead4]"
                    >
                      {l.agent_name}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap lg:items-center gap-1.5 shrink-0">
              <Link
                to={`/investment-analyzer?${analyzerParams.toString()}`}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-white/15 bg-white/[0.04] text-white/85 hover:border-[#5eead4]/40 hover:text-[#5eead4]"
              >
                <Calculator className="w-3 h-3" /> Analyze
              </Link>
              <Link
                to={`/investment-analyzer?${firstTimeParams.toString()}`}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-white/15 bg-white/[0.04] text-white/85 hover:border-[#5eead4]/40 hover:text-[#5eead4]"
              >
                <Wallet className="w-3 h-3" /> Cash to Buy
              </Link>
              {hasUrl ? (
                <a
                  href={l.public_listing_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md bg-[#5eead4] text-[#0B0F19] font-medium hover:bg-[#5eead4]/90"
                >
                  View Original <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  to={claimHref}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] hover:bg-[#5eead4]/20"
                >
                  <Lock className="w-3 h-3" /> Claim Listing Link
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewListingsPanel;
