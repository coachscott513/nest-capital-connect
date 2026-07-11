import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FEATURE_TYPE_CTA,
  FEATURE_TYPE_LABEL,
  getFeaturesForBusiness,
} from "@/data/businessFeatures";

interface FeaturedInModuleProps {
  businessSlug: string;
  currentPath?: string;
  maxItems?: number;
  showComingSoon?: boolean;
}

/**
 * "Featured In" — surfaces the editorial placements connected to a business
 * across the Capital District Nest ecosystem (categories, town guides,
 * stories, events, seasonal guides, collections).
 *
 * Renders nothing when there are no real placements — no empty state.
 */
export default function FeaturedInModule({
  businessSlug,
  currentPath,
  maxItems = 6,
  showComingSoon = true,
}: FeaturedInModuleProps) {
  const items = getFeaturesForBusiness(businessSlug, {
    currentPath,
    showComingSoon,
    maxItems,
  });

  if (items.length === 0) return null;

  const isSingle = items.length === 1;
  const headline = isSingle ? "Also featured in." : "Featured in.";

  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-teal-300/80">
            Across Capital District Nest
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight text-white">
            {headline}
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">
            Explore the stories, guides, collections, and community pages connected to this business.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const clickable =
              item.status === "published" && !!item.destination_url;
            const cta = FEATURE_TYPE_CTA[item.feature_type];
            const typeLabel = FEATURE_TYPE_LABEL[item.feature_type];

            const cardInner = (
              <div className="group h-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-black/50 border border-white/15 text-white/85 backdrop-blur">
                      {typeLabel}
                    </span>
                    {item.status === "coming_soon" && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-teal-300/15 border border-teal-300/30 text-teal-200 backdrop-blur">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-light text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <span className="text-white/40 uppercase tracking-[0.18em]">
                      {item.publish_date
                        ? new Date(item.publish_date).toLocaleDateString(undefined, {
                            month: "short",
                            year: "numeric",
                          })
                        : "\u00A0"}
                    </span>
                    {clickable ? (
                      <span className="inline-flex items-center gap-1.5 text-teal-300 font-medium tracking-wide">
                        {cta}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    ) : (
                      <span className="text-white/40 uppercase tracking-[0.18em]">
                        In production
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            if (!clickable) {
              return (
                <div key={item.id} className="h-full">
                  {cardInner}
                </div>
              );
            }

            const url = item.destination_url!;
            const isExternal = /^https?:\/\//.test(url);
            if (isExternal) {
              return (
                <a
                  key={item.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full block"
                >
                  {cardInner}
                </a>
              );
            }
            return (
              <Link key={item.id} to={url} className="h-full block">
                {cardInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
