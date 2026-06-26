import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Globe, Mail, Phone, ShieldCheck } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { supabase } from "@/integrations/supabase/client";
import type { PreviewListing } from "@/hooks/usePreviewListings";
import PreviewListingsPanel from "@/components/homes/PreviewListingsPanel";

type AgentRow = {
  slug: string;
  name: string;
  brokerage_name: string | null;
  brokerage_slug: string | null;
  website: string | null;
  photo_url: string | null;
  claim_status: string;
  is_featured: boolean;
  active_count: number;
  towns: string[] | null;
};

const titleize = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const AgentProfile = () => {
  const { agentSlug = "" } = useParams<{ agentSlug: string }>();
  const [agent, setAgent] = useState<AgentRow | null>(null);
  const [listings, setListings] = useState<PreviewListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: a }, { data: l }] = await Promise.all([
        supabase.from("listing_agents").select("slug,name,brokerage_name,brokerage_slug,website,photo_url,claim_status,is_featured,active_count,towns").eq("slug", agentSlug).maybeSingle(),
        supabase
          .from("property_listings")
          .select(
            "id,mls_number,address,address_slug,price,property_category,property_subtype,town_slug,city,county,acres,year_built,days_on_market,agent_name,agent_slug,agent_website,public_listing_url,claim_status,is_featured"
          )
          .eq("agent_slug", agentSlug)
          .neq("status", "archived")
          .order("days_on_market", { ascending: true })
          .limit(500),
      ]);
      if (cancelled) return;
      if (!a) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setAgent(a as AgentRow);
      setListings((l ?? []) as PreviewListing[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [agentSlug]);

  const isClaimed = agent?.claim_status === "claimed" || agent?.is_featured;
  const title = agent
    ? `${agent.name} — Listing Agent | Capital District Nest`
    : "Listing Agent | Capital District Nest";
  const description = agent
    ? `${agent.name} has ${agent.active_count} active property link${agent.active_count === 1 ? "" : "s"} in the Capital District property board.`
    : "Listing agent profile on the Capital District property board.";
  const canonical = `https://www.capitaldistrictnest.com/homes/agents/${agentSlug}`;

  if (notFound) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Helmet>
          <title>Agent not found | Capital District Nest</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <CleanHeader />
        <section className="px-[5%] pt-32 pb-24 text-center">
          <h1 className="text-3xl font-semibold text-white mb-3">Agent not found</h1>
          <p className="text-white/65 mb-6">This agent profile isn't on the board yet.</p>
          <Link to="/homes" className="btn-primary-apple inline-flex">Back to Homes</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {!isClaimed && <meta name="robots" content="noindex,follow" />}
        <link rel="canonical" href={canonical} />
      </Helmet>

      <CleanHeader />

      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/homes"
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homes
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">LISTING AGENT</div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {agent?.name ?? "—"}
          </h1>
          {agent?.brokerage_name && (
            <p className="text-white/75 text-lg mb-4">{agent.brokerage_name}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
              {agent?.active_count ?? 0} active link{agent?.active_count === 1 ? "" : "s"}
            </span>
            {isClaimed ? (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4]">
                <ShieldCheck className="w-3 h-3" /> Profile Claimed
              </span>
            ) : (
              <Link
                to={`/homes/claim-listing?agent=${encodeURIComponent(agentSlug)}`}
                className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-[#5eead4]"
              >
                Agent public profile pending — claim
              </Link>
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {agent?.phone && (
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-white/85 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#5eead4]/40">
                <Phone className="w-4 h-4 text-[#5eead4]" /> {agent.phone}
              </a>
            )}
            {agent?.email && (
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-white/85 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#5eead4]/40 truncate">
                <Mail className="w-4 h-4 text-[#5eead4] shrink-0" /> <span className="truncate">{agent.email}</span>
              </a>
            )}
            {agent?.website && (
              <a href={agent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/85 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-[#5eead4]/40 truncate">
                <Globe className="w-4 h-4 text-[#5eead4] shrink-0" /> <span className="truncate">Website</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-1">Active property links</h2>
          <p className="text-white/55 text-sm mb-6">
            Property previews are organized by Capital District Nest. Original listing pages are owned by the listing agent or brokerage.
          </p>
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center text-white/65">Loading…</div>
          ) : (
            <PreviewListingsPanel
              townName={agent?.name ?? ""}
              townSlug={(agent?.towns?.[0]) ?? ""}
              listings={listings}
            />
          )}

          {agent?.towns && agent.towns.length > 0 && (
            <div className="mt-10">
              <h3 className="text-white/85 text-sm uppercase tracking-wider mb-3">Towns covered</h3>
              <div className="flex flex-wrap gap-2">
                {agent.towns.map((t) => (
                  <Link
                    key={t}
                    to={`/homes/listings/${t}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/85 hover:text-[#5eead4] hover:border-[#5eead4]/40"
                  >
                    {titleize(t)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <HomesDisclaimer />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentProfile;
