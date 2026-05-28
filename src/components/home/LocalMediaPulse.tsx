import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, ExternalLink, Newspaper, Radio, Tv } from "lucide-react";
import { type WeeklyFeedItem } from "@/data/weeklyFeed";
import LocalVideoModal, { isTrustedEmbedUrl } from "@/components/LocalVideoModal";
import MediaSourceModal from "@/components/MediaSourceModal";
import { useMediaStoriesWithState } from "@/hooks/useMediaStories";
import { trackGAEvent } from "@/components/GARouteTracker";

const videoProviderFromUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  try {
    const h = new URL(url).hostname.toLowerCase();
    if (h.includes("youtube")) return "youtube";
    if (h.includes("vimeo")) return "vimeo";
    if (h.includes("spectrum")) return "spectrum";
    if (h.includes("wnyt") || h.includes("cbs6")) return "wnyt";
    if (h.includes("news10")) return "news10";
    return h;
  } catch {
    return undefined;
  }
};

/**
 * LOCAL MEDIA PULSE — Capital District Nest
 * Curated coverage from trusted regional newsrooms. Embeds official iframes,
 * links back to the source. Never rehosts video.
 *
 * Editorial rule: only stories that help someone understand what's happening
 * locally — openings, development, events, community, sports, real estate.
 * No crime / tragedy / political controversy / weather filler.
 */

interface SourceCard {
  label: string;
  shortName: string;
  sourceName: string; // must match weeklyFeed.source_name
  description: string;
  drawerDescription: string;
  accent: string;
  Icon: typeof Tv;
}

const SOURCE_CARDS: SourceCard[] = [
  {
    label: "NEWS10 / ABC",
    shortName: "News10",
    sourceName: "News10 WTEN",
    description:
      "Business openings, community stories, restaurants, events, and regional updates.",
    drawerDescription:
      "Curated business, food, development, and community stories from News10 WTEN.",
    accent: "#5eead4",
    Icon: Tv,
  },
  {
    label: "WNYT / NBC",
    shortName: "WNYT",
    sourceName: "WNYT NewsChannel 13",
    description:
      "Capital Region coverage, development, local sports, and community reporting.",
    drawerDescription:
      "Development, sports, and community coverage curated from WNYT NewsChannel 13.",
    accent: "#5eead4",
    Icon: Radio,
  },
  {
    label: "SPECTRUM NEWS",
    shortName: "Spectrum",
    sourceName: "Spectrum News",
    description:
      "Regional video coverage, interviews, real estate, events, and neighborhood updates.",
    drawerDescription:
      "Real estate, events, and neighborhood stories curated from Spectrum News.",
    accent: "#5eead4",
    Icon: Newspaper,
  },
];

function isMediaItem(item: WeeklyFeedItem): boolean {
  if (!item.source_name) return false;
  const url = item.external_article_url || item.original_url;
  if (!url && !item.video_embed_url) return false;
  return true;
}


export default function LocalMediaPulse() {
  const [modal, setModal] = useState<WeeklyFeedItem | null>(null);
  const [sourceModal, setSourceModal] = useState<SourceCard | null>(null);

  const { stories: allStories, loading } = useMediaStoriesWithState();
  const stories = useMemo(() => allStories.slice(0, 6), [allStories]);

  // Hide module cleanly only if loading is done and nothing to show.
  if (!loading && stories.length === 0) return null;

  return (
    <section
      id="local-media-pulse"
      aria-label="Local Media Pulse"
      className="relative w-full bg-[#0B0F19] border-t border-[#2D3748]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-4">
            Local Media Pulse
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.05]">
            Today's local coverage, curated.
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/65 leading-relaxed max-w-2xl">
            Video and local reporting from trusted Capital District media sources —
            business openings, restaurants, development, events, neighborhoods, and
            local life.
          </p>
        </motion.div>

        {/* Source cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-20">
          {SOURCE_CARDS.map((card, i) => {
            const { label, description, Icon, accent } = card;
            return (
              <motion.button
                key={label}
                type="button"
                onClick={() => setSourceModal(card)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative text-left rounded-2xl border border-[#2D3748] bg-white/[0.03] backdrop-blur-sm p-6 md:p-7 transition-all duration-300 hover:border-[#5eead4]/50 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4]/60"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] group-hover:border-[#5eead4]/40 transition-colors"
                    style={{ color: accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/55 group-hover:text-[#5eead4] transition-colors">
                    Source
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-[0.04em] mb-2">
                  {label}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5">
                  {description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#5eead4]/90 group-hover:text-white transition-colors">
                  View Coverage
                  <span aria-hidden>→</span>
                </span>
              </motion.button>
            );
          })}
        </div>


        {/* Loading state */}
        {loading && stories.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#2D3748] bg-white/[0.04] backdrop-blur-sm px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-white/70">
              <span className="w-3 h-3 rounded-full border-2 border-[#5eead4]/40 border-t-[#5eead4] animate-spin" />
              Loading local coverage…
            </div>
          </div>
        )}

        {/* Curated stories */}
            {stories.map((s, i) => {
              const hasVideo = !!(s.has_video && isTrustedEmbedUrl(s.video_embed_url));
              const ctaLabel = hasVideo ? "Watch Coverage" : "Read Full Coverage";
              const href = s.external_article_url || s.original_url || "#";
              const baseMediaPayload = {
                story_id: (s as any).id,
                headline: s.title,
                category: s.categoryBadgeOverride || "Local News",
                town: s.town,
                source_name: s.source_name,
                has_video: hasVideo,
              };
              const handleCta = () => {
                trackGAEvent.mediaStoryClick(baseMediaPayload);
                if (hasVideo) {
                  trackGAEvent.videoCoverageClick({
                    ...baseMediaPayload,
                    video_provider: videoProviderFromUrl(s.video_embed_url),
                  });
                  setModal(s);
                }
              };
              const Tag: any = hasVideo ? "button" : "a";
              const tagProps = hasVideo
                ? { type: "button", onClick: handleCta }
                : { href, target: "_blank", rel: "noopener noreferrer", onClick: handleCta };

              return (
                <motion.article
                  key={`${s.title}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col rounded-2xl border border-[#2D3748] bg-white/[0.025] overflow-hidden transition-all duration-300 hover:border-[#5eead4]/45 hover:bg-white/[0.04]"
                >
                  <div className="p-6 md:p-7 flex flex-col h-full">
                    <div className="flex items-center gap-2 flex-wrap mb-4 text-[10px] font-semibold tracking-[0.18em] uppercase">
                      <span className="text-[#5eead4]">
                        {s.categoryBadgeOverride || "Local News"}
                      </span>
                      {s.town && (
                        <>
                          <span className="text-white/25">·</span>
                          <span className="text-white/55">{s.town}</span>
                        </>
                      )}
                      {hasVideo && (
                        <>
                          <span className="text-white/25">·</span>
                          <span className="inline-flex items-center gap-1 text-[#5eead4]">
                            <PlayCircle className="w-3 h-3" /> Video
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg md:text-[1.35rem] font-semibold text-white tracking-[-0.018em] leading-snug mb-3">
                      {s.title}
                    </h3>

                    {(s.summary || s.description) && (
                      <p className="text-sm text-white/60 leading-relaxed mb-5 line-clamp-4">
                        {s.summary || s.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                      {s.source_name && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
                          <Newspaper className="w-3 h-3" /> via {s.source_name}
                        </span>
                      )}
                      <Tag
                        {...tagProps}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.06em] text-[#5eead4] hover:text-white transition-colors"
                      >

        )}

        {/* View more — smooth-scrolls to the top of this section so the
            header is always the first visible element. */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("local-media-pulse");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2D3748] bg-white/[0.03] px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-white/80 hover:text-white hover:border-[#5eead4]/50 hover:bg-white/[0.06] transition"
          >
            View More Local Coverage
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <LocalVideoModal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title || ""}
        embedUrl={modal?.video_embed_url}
        sourceName={modal?.source_name}
        articleUrl={modal?.external_article_url || modal?.original_url}
        town={modal?.town}
        category={modal?.categoryBadgeOverride || "Local News"}
      />

      <MediaSourceModal
        open={!!sourceModal}
        onClose={() => setSourceModal(null)}
        sourceName={sourceModal?.sourceName || ""}
        sourceShortName={sourceModal?.shortName}
        sourceDescription={sourceModal?.drawerDescription}
        accentColor={sourceModal?.accent}
      />
    </section>
  );
}

