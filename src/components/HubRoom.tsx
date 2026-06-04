import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, LucideIcon } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

/* =============================================================
   HubRoom — shared Apple-style "room" page template.
   Used by /restaurants, /home-services, /wellness,
   /professional-services and any future second-level room page.
   Dark cinematic hero + category panel grid + business owner CTA.
   ============================================================= */

export interface HubPanel {
  key: string;
  icon: LucideIcon;
  headline: string;
  text: string;
  cta: string;
  href: string;
  external?: boolean;
  trackCategory: string;
}

export interface HubRoomProps {
  /** SEO + canonical */
  route: string;                    // e.g. "/restaurants"
  seoTitle: string;
  seoDescription: string;
  /** Hero */
  eyebrow: string;                  // e.g. "RESTAURANTS & TAVERNS"
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
  /** Panels */
  panelsEyebrow: string;
  panelsTitle: string;
  panels: HubPanel[];
  /** Business owner CTA */
  ownerEyebrow?: string;
  ownerHeadline: string;
  ownerText: string;
  claimCategory: string;            // appended to /claim-business?category=
  /** Analytics */
  hubViewEvent: string;             // e.g. "restaurant_hub_view"
  categoryClickEvent: string;       // e.g. "restaurant_category_click"
}

type GTag = (...args: any[]) => void;
const track = (name: string, payload: Record<string, any>) => {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GTag }).gtag;
  if (typeof gtag === "function") gtag("event", name, payload);
};

const HubRoom = (p: HubRoomProps) => {
  useEffect(() => {
    track(p.hubViewEvent, { source_page: p.route });
  }, [p.hubViewEvent, p.route]);

  const canonical = `https://www.capitaldistrictnest.com${p.route}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: p.seoTitle,
    description: p.seoDescription,
    url: canonical,
  };

  const renderCta = (
    cta: { label: string; href: string; external?: boolean },
    className: string,
    location: string,
  ) => {
    const isExternal = cta.external || /^https?:\/\//.test(cta.href);
    const onClick = () =>
      track("homepage_room_click", {
        room_name: p.route,
        destination_url: cta.href,
        source_section: location,
        page_path: p.route,
      });
    if (isExternal) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noreferrer"
          onClick={onClick}
          className={className}
        >
          {cta.label} <ArrowUpRight className="w-4 h-4" />
        </a>
      );
    }
    if (cta.href.startsWith("#")) {
      return (
        <a href={cta.href} onClick={onClick} className={className}>
          {cta.label}
        </a>
      );
    }
    return (
      <Link to={cta.href} onClick={onClick} className={className}>
        {cta.label} <ArrowRight className="w-4 h-4" />
      </Link>
    );
  };

  const handlePanelClick = (panel: HubPanel) => {
    track(p.categoryClickEvent, {
      category: panel.trackCategory,
      source_page: p.route,
      destination: panel.href,
    });
  };

  const handleClaimClick = (destination: string, tier?: string) => {
    track("add_business_click", {
      source_page: p.route,
      destination,
      category: p.claimCategory,
      tier: tier ?? "claim",
    });
  };

  return (
    <>
      <SEOHead
        title={p.seoTitle}
        description={p.seoDescription}
        canonical={canonical}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#0B0F19] text-white">
        <CleanHeader />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 70% 20%, rgba(94,234,212,0.10) 0%, rgba(11,15,25,0) 60%), radial-gradient(50% 60% at 20% 80%, rgba(13,110,102,0.18) 0%, rgba(11,15,25,0) 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28">
            <p className="eyebrow-apple text-[#5eead4] mb-6">{p.eyebrow}</p>
            <h1 className="h-hero max-w-4xl">{p.headline}</h1>
            <p className="mt-8 max-w-2xl body-apple-dark text-white/70">{p.subhead}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {renderCta(p.primaryCta, "btn-dark-cta cta-arrow", "hero_primary")}
              {p.secondaryCta &&
                renderCta(
                  p.secondaryCta,
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition",
                  "hero_secondary",
                )}
            </div>
          </div>
        </section>

        {/* PANELS */}
        <section className="bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="eyebrow-apple text-[#5eead4] mb-4">{p.panelsEyebrow}</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                {p.panelsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {p.panels.map((panel) => {
                const Icon = panel.icon;
                const isExternal = panel.external || /^https?:\/\//.test(panel.href);
                const className =
                  "group block rounded-2xl bg-[#1E2230] border border-[#2D3748] hover:border-[#5eead4]/40 p-7 md:p-8 transition-all hover:translate-y-[-2px] hover:shadow-[0_20px_60px_-20px_rgba(94,234,212,0.25)]";
                const inner = (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#0d6e66]/15 border border-[#5eead4]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#5eead4]" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#5eead4] transition" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                      {panel.headline}
                    </h3>
                    <p className="text-sm md:text-base text-white/65 leading-relaxed mb-8 min-h-[3.5rem]">
                      {panel.text}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#5eead4]">
                      {panel.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </>
                );
                return isExternal ? (
                  <a
                    key={panel.key}
                    href={panel.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handlePanelClick(panel)}
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={panel.key}
                    to={panel.href}
                    onClick={() => handlePanelClick(panel)}
                    className={className}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* OWNER CTA */}
        <section className="border-t border-[#2D3748]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="rounded-3xl bg-gradient-to-br from-[#1E2230] to-[#0d6e66]/15 border border-[#5eead4]/20 p-10 md:p-16">
              {p.ownerEyebrow && (
                <p className="eyebrow-apple text-[#5eead4] mb-5">{p.ownerEyebrow}</p>
              )}
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                {p.ownerHeadline}
              </h2>
              <p className="mt-6 body-apple-dark text-white/75 max-w-2xl">{p.ownerText}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to={`/claim-business?category=${p.claimCategory}`}
                  onClick={() =>
                    handleClaimClick(`/claim-business?category=${p.claimCategory}`, "claim")
                  }
                  className="btn-dark-cta cta-arrow"
                >
                  Claim Your Business <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/claim-business?tier=premier&category=${p.claimCategory}`}
                  onClick={() =>
                    handleClaimClick(
                      `/claim-business?tier=premier&category=${p.claimCategory}`,
                      "premier",
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
                >
                  Request Premier Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HubRoom;
