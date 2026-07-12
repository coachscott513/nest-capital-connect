import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, MapPin, ShieldCheck, Info } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import {
  getPreviewBySlug,
  PREVIEW_LABEL_TEXT,
  type PreviewBusiness,
} from "@/data/previewBusinesses";

const TEAL = "#5eead4";

const chipStyle = (label: PreviewBusiness["label"]) => {
  switch (label) {
    case "spotlight":
      return "bg-[hsl(174,60%,45%)]/15 text-[#5eead4] border border-[#5eead4]/40";
    case "owner_verified":
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-400/40";
    case "owner_review_pending":
      return "bg-amber-500/10 text-amber-300 border border-amber-400/40";
    case "preview":
    default:
      return "bg-white/5 text-white/80 border border-white/20";
  }
};

export default function BusinessPreviewPage() {
  const { slug = "" } = useParams();
  const business = getPreviewBySlug(slug);

  // Businesses with custom flagship pages route to their own components.
  if (business?.customRoute && business.customRoute !== `/business/${slug}`) {
    return <Navigate to={business.customRoute} replace />;
  }

  if (!business) {
    return <Navigate to="/businesses" replace />;
  }

  const claimHref = `/claim-business?slug=${encodeURIComponent(business.slug)}`;
  const isPreviewTier =
    business.label === "preview" || business.label === "owner_review_pending";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title={`${business.name} — ${business.town} | Capital District Nest`}
        description={business.summary}
        canonical={`https://www.capitaldistrictnest.com/business/${business.slug}`}
      />
      <CleanHeader />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/50 mb-10">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/businesses" className="hover:text-white">Businesses</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{business.name}</span>
        </nav>

        {/* Chip + owner sub-note */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase ${chipStyle(business.label)}`}
          >
            {PREVIEW_LABEL_TEXT[business.label]}
          </span>
          {isPreviewTier && (
            <span className="text-[12px] text-white/50 inline-flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Owner review pending — claim to complete this profile.
            </span>
          )}
        </div>

        {/* Hero */}
        <p
          className="text-[11px] font-semibold tracking-[0.28em] uppercase"
          style={{ color: TEAL }}
        >
          {business.displayCategory ?? business.category}
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.03]">
          {business.name}
        </h1>
        <div className="mt-5 flex items-center gap-2 text-white/60 text-sm">
          <MapPin className="w-4 h-4" />
          <span>
            {business.town}
            {business.county ? ` · ${business.county} County, NY` : ""}
          </span>
        </div>

        {/* Summary */}
        <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/75 font-light leading-relaxed">
          {business.summary}
        </p>
        {business.editorial && (
          <p className="mt-5 max-w-3xl text-base text-white/60 leading-relaxed">
            {business.editorial}
          </p>
        )}

        {/* Transparency block */}
        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#5eead4] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold">How this preview was built</h2>
              <p className="mt-2 text-sm text-white/65 leading-relaxed max-w-2xl">
                Capital District Nest built this profile from publicly available
                information so the business appears in our directory. We did not
                include phone numbers, hours, photos, staff bios, awards,
                reviews, or events — the owner adds those after claiming.
              </p>
              <p className="mt-3 text-sm text-white/50 max-w-2xl">
                Are you the owner? Claim this profile to add verified contact
                details, official social links, services, hours, and images.
              </p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to={claimHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5eead4] text-[#0B0F19] font-semibold hover:bg-white transition"
          >
            Claim or update this profile
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white/85 hover:bg-white/5 transition"
          >
            Browse all businesses
          </Link>
        </div>

        {/* Not the owner note */}
        <p className="mt-8 text-xs text-white/40 max-w-2xl">
          Not the owner but see something off? Email{" "}
          <a
            href="mailto:scott@capitaldistrictnest.com"
            className="underline hover:text-white/70"
          >
            scott@capitaldistrictnest.com
          </a>{" "}
          and we'll correct it.
        </p>
      </main>

      <Footer />
    </div>
  );
}
