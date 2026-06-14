import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Lock, MapPin } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { supabase } from "@/integrations/supabase/client";

type Row = {
  id: string;
  mls_number: string;
  status: string;
  address: string;
  address_slug: string;
  city: string | null;
  town_slug: string | null;
  county: string | null;
  price: number | null;
  property_category: string | null;
  property_subtype: string | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  acres: number | null;
  year_built: number | null;
  days_on_market: number | null;
  agent_name: string | null;
  agent_slug: string | null;
  agent_phone: string | null;
  agent_email: string | null;
  agent_website: string | null;
  brokerage_name: string | null;
  public_listing_url: string | null;
  is_indexable: boolean;
  claim_status: string;
};

const titleize = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const fmtPrice = (n: number | null) => (n == null ? "Price pending" : `$${Number(n).toLocaleString()}`);

const ListingPreview = () => {
  const { townSlug = "", addressSlug = "" } = useParams<{ townSlug: string; addressSlug: string }>();
  const [row, setRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("property_listings")
        .select("*")
        .eq("town_slug", townSlug)
        .eq("address_slug", addressSlug)
        .neq("status", "archived")
        .maybeSingle();
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
      } else {
        setRow(data as Row);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [townSlug, addressSlug]);

  const indexable = row?.status === "approved" && !!row?.public_listing_url && row?.is_indexable;
  const townName = titleize(townSlug);

  const title = row
    ? `${row.address}, ${row.city ?? townName} | Capital District Nest`
    : "Property Link Preview | Capital District Nest";
  const description = row
    ? `${fmtPrice(row.price)} · ${row.property_subtype ?? "Listing"} property link in ${townName}.`
    : "Property link preview on the Capital District property board.";
  const canonical = `https://www.capitaldistrictnest.com/homes/listings/${townSlug}/${addressSlug}`;

  if (notFound) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Helmet>
          <title>Property not found | Capital District Nest</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <CleanHeader />
        <section className="px-[5%] pt-32 pb-24 text-center">
          <h1 className="text-3xl font-semibold text-white mb-3">Property not found</h1>
          <p className="text-white/65 mb-6">This property link isn't on the board.</p>
          <Link to={`/homes/listings/${townSlug}`} className="btn-primary-apple inline-flex">
            Back to {townName}
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const claimHref = `/homes/claim-listing?mls=${encodeURIComponent(row?.mls_number ?? "")}&town=${townSlug}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {!indexable && <meta name="robots" content="noindex,follow" />}
        <link rel="canonical" href={canonical} />
      </Helmet>

      <CleanHeader />

      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/homes/listings/${townSlug}`}
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {townName} property board
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">PROPERTY LINK PREVIEW</div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {row?.address}
          </h1>
          <div className="flex items-center gap-2 text-white/65 mb-6">
            <MapPin className="w-4 h-4 text-[#5eead4]" />
            <span>{row?.city ?? townName}{row?.county ? `, ${row.county} County` : ""}</span>
          </div>

          <div className="text-3xl font-semibold text-white mb-6">{fmtPrice(row?.price ?? null)}</div>

          <div className="flex flex-wrap gap-3 mb-2">
            {row?.public_listing_url ? (
              <a
                href={row.public_listing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-apple inline-flex items-center gap-2"
              >
                View Original Listing <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to={claimHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] hover:bg-[#5eead4]/20 text-sm"
              >
                <Lock className="w-4 h-4" /> Listing Link Pending — Claim
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#1E2230] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Property facts</h2>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <Fact label="Type" value={row?.property_subtype ?? row?.property_category ?? "—"} />
              <Fact label="Beds" value={row?.beds ?? "—"} />
              <Fact label="Baths" value={row?.baths ?? "—"} />
              <Fact label="Sqft" value={row?.sqft ? row.sqft.toLocaleString() : "—"} />
              <Fact label="Acres" value={row?.acres ?? "—"} />
              <Fact label="Year built" value={row?.year_built ?? "—"} />
              <Fact label="Days on market" value={row?.days_on_market ?? "—"} />
              <Fact label="MLS #" value={row?.mls_number ?? "—"} />
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Listed by</h2>
            {row?.agent_slug ? (
              <Link to={`/homes/agents/${row.agent_slug}`} className="text-white font-medium hover:text-[#5eead4]">
                {row?.agent_name}
              </Link>
            ) : (
              <div className="text-white">{row?.agent_name ?? "Listing source pending"}</div>
            )}
            {row?.brokerage_name && (
              <div className="text-white/65 text-sm mt-1">{row.brokerage_name}</div>
            )}
            <div className="mt-4 space-y-2 text-sm">
              {row?.agent_phone && (
                <a href={`tel:${row.agent_phone}`} className="block text-white/85 hover:text-[#5eead4]">{row.agent_phone}</a>
              )}
              {row?.agent_email && (
                <a href={`mailto:${row.agent_email}`} className="block text-white/85 hover:text-[#5eead4] truncate">{row.agent_email}</a>
              )}
              {row?.agent_website && (
                <a href={row.agent_website} target="_blank" rel="noopener noreferrer" className="block text-white/85 hover:text-[#5eead4] truncate">Website</a>
              )}
            </div>

            {!row?.public_listing_url && (
              <Link
                to={claimHref}
                className="mt-5 block text-center text-xs px-3 py-2 rounded-md border border-[#5eead4]/40 bg-[#5eead4]/10 text-[#5eead4] hover:bg-[#5eead4]/20"
              >
                Claim this listing link
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <HomesDisclaimer />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Fact = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <>
    <dt className="text-white/55">{label}</dt>
    <dd className="text-white font-medium">{value}</dd>
  </>
);

export default ListingPreview;
