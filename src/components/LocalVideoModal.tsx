import { useEffect } from "react";
import { X, ExternalLink, Newspaper } from "lucide-react";

/**
 * Trusted video iframe sources for Capital District Nest.
 * We only embed the OFFICIAL player from the source — never rehost.
 */
const ALLOWED_VIDEO_HOSTS = [
  "news10.com",
  "redir1.news10.com",
  "wnyt.com",
  "cbs6albany.com",
  "spectrumlocalnews.com",
  "timesunion.com",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "vimeo.com",
];

export function isTrustedEmbedUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    return ALLOWED_VIDEO_HOSTS.some((h) => host === h || host.endsWith("." + h));
  } catch {
    return false;
  }
}

/** Strip autoplay params; tap-to-play only. */
export function sanitizeEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    ["autoplay", "auto_play", "muted"].forEach((p) => u.searchParams.delete(p));
    // Force autoplay=0 for known providers that default on
    if (u.hostname.includes("youtube")) u.searchParams.set("autoplay", "0");
    return u.toString();
  } catch {
    return url;
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  embedUrl?: string;
  sourceName?: string;
  articleUrl?: string;
  town?: string;
  category?: string;
}

export default function LocalVideoModal({
  open,
  onClose,
  title,
  embedUrl,
  sourceName,
  articleUrl,
  town,
  category,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const safe = embedUrl && isTrustedEmbedUrl(embedUrl) ? sanitizeEmbedUrl(embedUrl) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#05070d]/85 backdrop-blur-md" />

      <div
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0B0F19] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-black/80 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
          {safe ? (
            <iframe
              src={safe}
              title={title}
              loading="lazy"
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
              Video unavailable. Open the source article below.
            </div>
          )}
        </div>

        <div className="p-6 md:p-7">
          <div className="flex items-center gap-3 mb-3 flex-wrap text-[11px] uppercase tracking-[0.18em] font-semibold">
            {category && <span className="text-[#5eead4]">{category}</span>}
            {town && (
              <>
                <span className="text-white/25">·</span>
                <span className="text-white/55">{town}</span>
              </>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.02em] leading-snug">
            {title}
          </h3>
          {sourceName && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/55">
              <Newspaper className="w-3.5 h-3.5" /> via {sourceName}
            </p>
          )}
          {articleUrl && (
            <div className="mt-5">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#2D3748] bg-[#0B0F19] px-4 py-2 text-sm font-semibold text-[#5eead4] hover:border-[#5eead4]/60 hover:text-white transition"
              >
                Open Source Article <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
