import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import HeroBand from "@/components/HeroBand";
import { delmarBusinesses } from "@/data/businesses";

const REMAX_DELMAR = "https://scottalvarez.remax.com/wide.php?city=Delmar";

const LivingInDelmar = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/app/living-in-delmar") {
      window.history.replaceState(
        null,
        "",
        "/living-in-delmar" + window.location.search + window.location.hash,
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Living in Delmar, NY | Homes, Market & Local Insight</title>
        <meta
          name="description"
          content="Homes for sale in Delmar, NY. Market trends, local businesses, schools and lifestyle in one of the Capital District's most desirable communities."
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/living-in-delmar" />
      </Helmet>

      <MainHeader />

      {/* 1 — DELMAR HERO · forest + gold */}
      <HeroBand
        mood="forest"
        eyebrow="Bethlehem · Albany County"
        headline={<>Living in Delmar, NY.</>}
        sub="Homes, schools, lifestyle, and local insight in one of the Capital District's most desirable communities."
        ctaLabel="View Delmar homes"
        ctaHref={REMAX_DELMAR}
        ctaExternal
        callouts={[
          { title: "Bethlehem Central schools", body: "One of the highest-ranked districts in the Capital Region." },
          { title: "10–15 minutes to Albany",  body: "Easy commute to downtown employers and amenities." },
          { title: "Strong residential demand", body: "Tight inventory and consistent sale activity year over year." },
        ]}
      />

      {/* 2 — HOMES · cream + teal */}
      <HeroBand
        mood="cream"
        eyebrow="Homes for Sale"
        headline={<>Homes for sale in Delmar.</>}
        sub="Browse current listings and see what's moving. Live MLS feed, updated continuously."
        ctaLabel="Open full search"
        ctaHref={REMAX_DELMAR}
        ctaExternal
        callouts={[
          { title: "Single-family",   body: "Classic Delmar colonials, capes, and ranches." },
          { title: "New construction", body: "Select infill and Bethlehem subdivisions." },
          { title: "Move-up homes",    body: "$500K–$900K range, where most of Delmar trades." },
        ]}
      >
        <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
          <iframe
            src={REMAX_DELMAR}
            title="Delmar Homes for Sale"
            className="w-full h-[720px] border-0"
            loading="lazy"
          />
        </div>
      </HeroBand>

      {/* 3 — MARKET SNAPSHOT · graphite + teal */}
      <HeroBand
        mood="graphite"
        eyebrow="Market Snapshot"
        headline={<>The Delmar market,<br />at a glance.</>}
        sub="A simple snapshot of price, inventory, and activity — refreshed regularly with MLS data."
        ctaLabel="Get market updates"
        ctaHref="/dealdesk"
        callouts={[
          { title: "Median price",      body: "~$465K · trending up year-over-year." },
          { title: "Active listings",   body: "~12 homes on market · tight inventory." },
          { title: "Days on market",    body: "~9 days median · fast-moving market." },
        ]}
      />

      {/* 4 — WHY DELMAR · cream + teal (warm beige variant) */}
      <HeroBand
        mood="cream"
        eyebrow="Why Delmar"
        headline={<>Quiet streets. Strong schools.<br />Close to Albany.</>}
        sub="Delmar combines suburban comfort with access to the Capital District's major employers and amenities. Tree-lined streets, a walkable Four Corners village, and one of the most respected school districts in the region."
        ctaLabel="Explore Delmar"
        ctaHref={REMAX_DELMAR}
        ctaExternal
        callouts={[
          { title: "Walkable village",    body: "Four Corners with cafés, library, and parks." },
          { title: "Bethlehem Central",   body: "Top-tier elementary through high school." },
          { title: "10 min to downtown",  body: "Direct access to Albany via Delaware Ave." },
        ]}
      />

      {/* 5 — LOCAL FAVORITES · ivory + green */}
      <HeroBand
        mood="ivory"
        eyebrow="Local Favorites"
        headline={<>Where Delmar<br />actually goes.</>}
        sub="Restaurants, coffee shops, home services, and local businesses that shape the community."
        ctaLabel="Talk to Scott"
        ctaHref="tel:+15185227265"
        ctaExternal
        callouts={[
          { title: "Four Corners",  body: "The unofficial center of Delmar." },
          { title: "Family-owned",  body: "Most of the businesses below are locally run." },
          { title: "Year-round",    body: "Farmers market, library events, and seasonal happenings." },
        ]}
      >
        <ul id="local-favorites" className="divide-y divide-foreground/10 border-y border-foreground/10 bg-white/40 rounded-2xl px-6">
          {delmarBusinesses.map((b) => (
            <li key={b.slug} className="py-6 flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-foreground">{b.name}</h3>
                <p className="mt-1 text-foreground/65">{b.tagline}</p>
                <p className="mt-2 text-sm text-foreground/55 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {b.address}
                </p>
              </div>
              {b.phone && (
                <a
                  href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                  className="shrink-0 text-foreground font-medium hover:text-[#5d7a4f] transition whitespace-nowrap"
                >
                  {b.phone}
                </a>
              )}
            </li>
          ))}
        </ul>
      </HeroBand>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
