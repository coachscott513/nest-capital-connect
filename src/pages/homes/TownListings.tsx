import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Plus, List, LayoutGrid, Phone, Mail, Globe } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import AgentBusinessCard from "@/components/homes/AgentBusinessCard";
import AnalyzePropertyHero from "@/components/homes/AnalyzePropertyHero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getHomesTown } from "@/data/homesTowns";
import { getTownBoard, uniqueBrokerages, type TownAgent } from "@/data/townPropertyBoard";
import { usePreviewListings } from "@/hooks/usePreviewListings";
import PreviewListingsPanel from "@/components/homes/PreviewListingsPanel";

const fmtPrice = (n: number) =>
  n >= 1000 ? `$${n.toLocaleString()}` : `$${n}`;
const fmtMonthly = (n: number) => `${fmtPrice(n)}/mo`;
const fmtSoldDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const TownListings = () => {
  const { townSlug } = useParams<{ townSlug: string }>();
  const town = getHomesTown(townSlug);
  const board = useMemo(() => getTownBoard(townSlug), [townSlug]);
  const preview = usePreviewListings(townSlug);
  const [view, setView] = useState<"list" | "grid">("list");
  const [popupAgent, setPopupAgent] = useState<TownAgent | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [townSlug]);

  if (!town) return <Navigate to="/homes" replace />;

  const title = `${town.name} Property Board | Capital District Nest`;
  const description = `${town.name} property links, rentals, open houses, active listing agents, and recent sales — updated daily on Capital District Nest.`;
  const canonical = `https://www.capitaldistrictnest.com/homes/listings/${town.slug}`;

  const hasData = board.listings.length > 0 || board.agents.length > 0;
  const brokerageCount = uniqueBrokerages(board);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${town.name} Property Board — Capital District Nest`} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <CleanHeader />

      {/* 1. Town Property Board hero */}
      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link to="/homes#town-listings" className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6">
            <ArrowLeft className="w-4 h-4" /> All towns
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">{town.name.toUpperCase()} PROPERTY BOARD</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {town.name} Property Links
          </h1>
          <p className="body-apple-dark max-w-2xl mb-3">
            Browse active property links, listing agents, brokerages, and local
            real estate resources in {town.name}.
          </p>
          <p className="text-sm text-white/55 max-w-2xl mb-8">
            Capital District Nest organizes local property links by town.
            Contact the listing source directly for property inquiries.
          </p>

          {/* Stat row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatBlock label="Active property links" value={board.listings.length} />
            <StatBlock label="Listing agents" value={board.agents.length} />
            <StatBlock label="Brokerages" value={brokerageCount} />
            <StatBlock label="Status" value={board.updatedAt || "Updated during launch"} small />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to={`/homes/add-listing?town=${town.slug}`} className="btn-primary-apple inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Submit {town.name} Listing Link
            </Link>
            <Link to={`/claim-business?category=real-estate&town=${town.slug}`} className="btn-secondary-apple-dark inline-flex items-center gap-2">
              Claim Agent Card
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTMENT ANALYZER HERO — town-specific */}
      <AnalyzePropertyHero
        townName={town.name}
        browseHref={`/homes/listings/${town.slug}?type=investment`}
      />

      {/* 2-6. Tabs */}
      <section className="px-[5%] py-12">

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="bg-[#1E2230] border border-white/10 flex flex-wrap h-auto p-1 gap-1">
              <TabsTrigger value="listings" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">New Listings</TabsTrigger>
              <TabsTrigger value="rentals" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">Rentals</TabsTrigger>
              <TabsTrigger value="open" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">Open Houses</TabsTrigger>
              <TabsTrigger value="agents" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">Agents</TabsTrigger>
              <TabsTrigger value="sold" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">Recently Sold</TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70">Local Services</TabsTrigger>
            </TabsList>

            {/* New Listings */}
            <TabsContent value="listings" className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">New listings in {town.name}</h2>
                  <p className="text-sm text-white/55">Direct property links from listing agents.</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-[#1E2230] border border-white/10 rounded-lg p-1">
                  <button onClick={() => setView("list")} className={`p-1.5 rounded ${view === "list" ? "bg-[#5eead4] text-[#0B0F19]" : "text-white/65"}`} aria-label="List view">
                    <List className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("grid")} className={`p-1.5 rounded ${view === "grid" ? "bg-[#5eead4] text-[#0B0F19]" : "text-white/65"}`} aria-label="Card view">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {board.listings.length === 0 ? (
                <EmptyState town={town.name} action="Post Listing" slug={town.slug} note="Listing agents and property managers can post a direct link today." />
              ) : view === "list" ? (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
                  {board.listings.map((l) => (
                    <div key={l.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors">
                      <div className="sm:w-28 text-lg font-semibold text-white">{fmtPrice(l.price)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{l.address}</div>
                        <div className="text-sm text-white/65 truncate">
                          {l.beds ? `${l.beds} bed` : ""}{l.baths ? ` · ${l.baths} bath` : ""} · {l.propertyType} · Listed by <span className="text-white/85">{l.agentName}</span>, {l.brokerage}
                        </div>
                      </div>
                      <ListingLinkButton url={l.listingUrl} />

                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {board.listings.map((l) => (
                    <div key={l.id} className="rounded-2xl border border-white/10 bg-[#1E2230] p-5">
                      <div className="text-xl font-semibold text-white">{fmtPrice(l.price)}</div>
                      <div className="text-white/90 mt-1">{l.address}</div>
                      <div className="text-sm text-white/60 mt-1">
                        {l.beds ? `${l.beds} bed` : ""}{l.baths ? ` · ${l.baths} bath` : ""} · {l.propertyType}
                      </div>
                      <div className="text-xs text-white/55 mt-2">Listed by {l.agentName} · {l.brokerage}</div>
                      <div className="mt-4"><ListingLinkButton url={l.listingUrl} /></div>

                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Rentals */}
            <TabsContent value="rentals" className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-1">Rentals in {town.name}</h2>
              <p className="text-sm text-white/55 mb-4">Direct rental links posted by listing agents and property managers.</p>
              {board.rentals.length === 0 ? (
                <EmptyState town={town.name} action="Post Rental" slug={town.slug} />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
                  {board.rentals.map((r) => (
                    <div key={r.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                      <div className="sm:w-28 text-lg font-semibold text-white">{fmtMonthly(r.price)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{r.address}</div>
                        <div className="text-sm text-white/65 truncate">
                          {r.beds ? `${r.beds} bed` : ""}{r.baths ? ` · ${r.baths} bath` : ""} · {r.propertyType} · {r.agentName}, {r.brokerage}
                        </div>
                      </div>
                      <ListingLinkButton url={r.listingUrl} label="View Rental Link" />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Open Houses */}
            <TabsContent value="open" className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-1">Open houses in {town.name}</h2>
              <p className="text-sm text-white/55 mb-4">This weekend's scheduled open houses.</p>
              {board.openHouses.length === 0 ? (
                <EmptyState town={town.name} action="Submit Open House" slug={town.slug} />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
                  {board.openHouses.map((o) => (
                    <div key={o.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                      <div className="sm:w-32 text-sm font-medium text-[#5eead4]">{o.date}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{o.address} · {fmtPrice(o.price)}</div>
                        <div className="text-sm text-white/65 truncate">Hosted by {o.agentName}, {o.brokerage}</div>
                      </div>
                      <ListingLinkButton url={o.listingUrl} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Agents */}
            <TabsContent value="agents" className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-1">Agents active in {town.name}</h2>
              <p className="text-sm text-white/55 mb-4">
                Agents with active {town.name} listings and recent sold activity (last 12 months).
              </p>
              {board.agents.length === 0 ? (
                <EmptyState town={town.name} action="Claim Agent Card" slug={town.slug} />
              ) : (
                <div className="space-y-3">
                  {board.agents.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setPopupAgent(a)}
                      className={`w-full text-left rounded-2xl border p-5 transition-colors ${
                        a.featured
                          ? "border-[#5eead4]/40 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] hover:border-[#5eead4]/70"
                          : "border-white/10 bg-[#1E2230] hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {a.featured && (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5eead4] to-[#0d6e66] flex items-center justify-center text-[#0B0F19] font-semibold shrink-0">
                            {a.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="text-white font-semibold">{a.name}</div>
                            {a.featured && (
                              <span className="text-[10px] tracking-widest uppercase text-[#5eead4] bg-[#5eead4]/10 border border-[#5eead4]/30 px-2 py-0.5 rounded-full">
                                Featured {town.name} Agent
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-white/65">{a.brokerage}</div>
                          <div className="text-xs text-white/55 mt-1">
                            {a.activeCount} active in {town.name} · {a.soldLast12} sold last 12 mo
                          </div>
                        </div>
                        <div className="text-sm text-[#5eead4] whitespace-nowrap">View Agent Card →</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Pricing language */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6">
                  <div className="text-xs uppercase tracking-widest text-white/55 mb-2">Free Agent Presence</div>
                  <div className="text-2xl font-semibold text-white mb-2">$0 <span className="text-sm text-white/55 font-normal">/ always</span></div>
                  <p className="text-sm text-white/70">
                    Basic visibility for agents active in {town.name}. Includes name, brokerage, town activity, active listing count, recent sold count when available, and basic listing links.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] p-6">
                  <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-2">Featured Agent Card</div>
                  <div className="text-2xl font-semibold text-white mb-2">Stand out on town listing pages</div>
                  <p className="text-sm text-white/80 mb-4">
                    Photo, social links, business card popup, priority placement, featured badge, active listings, and contact buttons.
                  </p>
                  <Link
                    to={`/claim-business?category=real-estate&tier=featured&town=${town.slug}`}
                    className="btn-dark-cta inline-flex"
                  >
                    Request Featured Placement
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* Recently Sold */}
            <TabsContent value="sold" className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-1">Recently sold in {town.name}</h2>
              <p className="text-sm text-white/55 mb-4">Recent closings and the agents who represented them.</p>
              {board.sold.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center text-white/65">
                  Recent {town.name} sold activity will appear here.
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] divide-y divide-white/10">
                  {board.sold.map((s) => (
                    <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                      <div className="sm:w-32 text-sm text-white/55">{fmtSoldDate(s.soldDate)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{s.address}</div>
                        <div className="text-sm text-white/65 truncate">{s.agentName} · {s.brokerage}</div>
                      </div>
                      <div className="sm:w-28 sm:text-right text-white font-semibold">{fmtPrice(s.soldPrice)}</div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Local Services */}
            <TabsContent value="services" className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-1">Local real estate services</h2>
              <p className="text-sm text-white/55 mb-4">Vetted local providers for buyers and sellers in {town.name}.</p>
              {board.services.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center text-white/65">
                  Local services for {town.name} are being added.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {board.services.map((s) => (
                    <Link key={s.name} to={s.href} className="rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/40 transition-colors">
                      <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-1">{s.category}</div>
                      <div className="text-white font-medium">{s.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 7. Add listing / claim agent CTA */}
      <section className="px-[5%] py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6">
            <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-2">For Listing Agents</div>
            <div className="text-xl font-semibold text-white mb-2">Post a {town.name} property link</div>
            <p className="text-sm text-white/70 mb-4">Add a direct link to your active listing — free, no lead capture wrapper.</p>
            <Link to={`/homes/add-listing?town=${town.slug}`} className="btn-primary-apple inline-flex">Post Listing</Link>
          </div>
          <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] p-6">
            <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-2">For Agents</div>
            <div className="text-xl font-semibold text-white mb-2">Claim your {town.name} agent card</div>
            <p className="text-sm text-white/80 mb-4">Become a Featured {town.name} Agent with a full business card popup.</p>
            <Link to={`/claim-business?category=real-estate&tier=featured&town=${town.slug}`} className="btn-dark-cta inline-flex">
              Claim Agent Card
            </Link>
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />

      <AgentBusinessCard
        agent={popupAgent}
        townName={town.name}
        townSlug={town.slug}
        open={!!popupAgent}
        onOpenChange={(o) => !o && setPopupAgent(null)}
      />
    </div>
  );
};

const StatBlock = ({ label, value, small }: { label: string; value: string | number; small?: boolean }) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] px-5 py-4">
    <div className={`text-white font-semibold ${small ? "text-base" : "text-2xl"}`}>{value}</div>
    <div className="text-xs uppercase tracking-wider text-white/55 mt-1">{label}</div>
  </div>
);

const EmptyState = ({ town, action, slug, note }: { town: string; action: string; slug: string; note?: string }) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center">
    <div className="text-white/75 mb-2">{town} entries are being added.</div>
    {note && <p className="text-sm text-white/55 mb-6 max-w-md mx-auto">{note}</p>}
    <Link to={`/homes/add-listing?town=${slug}`} className="btn-primary-apple inline-flex mt-2">
      {action}
    </Link>
  </div>
);

/**
 * Renders the per-listing outbound CTA. Empty URL → neutral
 * "Listing Link Pending" state per brand-neutrality policy
 * (no agent or brokerage IDX fallbacks).
 */
const ListingLinkButton = ({ url, label = "View Original Listing" }: { url?: string; label?: string }) => {
  if (!url) {
    return (
      <span
        title="This property link is being prepared. Listing agents may submit their preferred public listing link."
        className="text-sm text-white/45 whitespace-nowrap inline-flex items-center gap-1 cursor-help"
      >
        Listing Link Pending
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5eead4] hover:underline whitespace-nowrap inline-flex items-center gap-1">
      {label} <ExternalLink className="w-3.5 h-3.5" />
    </a>
  );
};

export default TownListings;

