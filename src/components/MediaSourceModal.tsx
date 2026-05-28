import { useEffect, useMemo, useRef, useState } from "react";
import { X, ExternalLink, PlayCircle, Newspaper } from "lucide-react";
import { type WeeklyFeedItem } from "@/data/weeklyFeed";
import LocalVideoModal, { isTrustedEmbedUrl } from "@/components/LocalVideoModal";
import { useMediaStories } from "@/hooks/useMediaStories";
import { trackGAEvent } from "@/components/GARouteTracker";

const providerFromUrl = (url?: string | null) => {
  if (!url) return undefined;
  try {
    const h = new URL(url).hostname.toLowerCase();
    if (h.includes("youtube")) return "youtube";
    if (h.includes("vimeo")) return "vimeo";
    return h;
  } catch {
    return undefined;
  }
};


interface Props {
  open: boolean;
  onClose: () => void;
  sourceName: string;
  sourceShortName?: string;
  sourceDescription?: string;
  accentColor?: string;
}

/**
 * MediaSourceModal — premium dark drawer that surfaces curated stories from a
 * single regional newsroom. Stories with a trusted video embed open the
 * LocalVideoModal; otherwise the source article opens in a new tab.
 */
export default function MediaSourceModal({
  open,
  onClose,
  sourceName,
  sourceShortName,
  sourceDescription,
  accentColor = "#5eead4",
}: Props) {
  const [video, setVideo] = useState<WeeklyFeedItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const allStories = useMediaStories();
  const stories = useMemo(
    () => allStories.filter((s) => s.source_name === sourceName).slice(0, 6),
    [allStories, sourceName],
  );

  if (!open) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${sourceName} coverage`}
        className="fixed inset-0 z-[90] flex items-stretch md:items-center justify-end md:justify-center p-0 md:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[#05070d]/85 backdrop-blur-md" />

        <div
          className="relative w-full md:max-w-3xl max-h-[100dvh] md:max-h-[88vh] rounded-none md:rounded-2xl border border-white/10 bg-[#0B0F19] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 md:px-8 pt-7 pb-6 border-b border-white/[0.06]">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/15 text-white/80 hover:text-white hover:bg-white/[0.08] transition"
            >
              <X className="w-4 h-4" />
            </button>

            <p
              className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-3"
              style={{ color: accentColor }}
            >
              Source
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em] leading-tight">
              {sourceShortName || sourceName} Coverage
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-2xl">
              {sourceDescription ||
                `Curated local stories from ${sourceName}.`}
            </p>
          </div>

          {/* Stories */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-3">
            {stories.length === 0 && (
              <div className="text-center py-12 text-white/55 text-sm">
                No curated stories from this source yet — check back soon.
              </div>
            )}

            {stories.map((s, i) => {
              const hasVideo = !!(s.has_video && isTrustedEmbedUrl(s.video_embed_url));
              const href = s.external_article_url || s.original_url || "#";
              return (
                <article
                  key={`${s.title}-${i}`}
                  className="group rounded-xl border border-[#2D3748] bg-white/[0.025] p-5 md:p-6 hover:border-[#5eead4]/45 hover:bg-white/[0.04] transition-all"
                >
                  <div className="flex items-center gap-2 flex-wrap mb-3 text-[10px] font-semibold tracking-[0.18em] uppercase">
                    <span style={{ color: accentColor }}>
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
                        <span
                          className="inline-flex items-center gap-1"
                          style={{ color: accentColor }}
                        >
                          <PlayCircle className="w-3 h-3" /> Video
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-white tracking-[-0.015em] leading-snug mb-2">
                    {s.title}
                  </h3>
                  {(s.summary || s.description) && (
                    <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3">
                      {s.summary || s.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
                      <Newspaper className="w-3 h-3" /> via {s.source_name}
                    </span>
                    {hasVideo ? (
                      <button
                        type="button"
                        onClick={() => setVideo(s)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.06em] hover:text-white transition-colors"
                        style={{ color: accentColor }}
                      >
                        Watch Coverage <PlayCircle className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.06em] hover:text-white transition-colors"
                        style={{ color: accentColor }}
                      >
                        Read Full Coverage <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <LocalVideoModal
        open={!!video}
        onClose={() => setVideo(null)}
        title={video?.title || ""}
        embedUrl={video?.video_embed_url}
        sourceName={video?.source_name}
        articleUrl={video?.external_article_url || video?.original_url}
        town={video?.town}
        category={video?.categoryBadgeOverride || "Local News"}
      />
    </>
  );
}
