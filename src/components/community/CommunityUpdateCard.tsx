import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Building2, Calendar } from "lucide-react";
import type { CommunityUpdate } from "@/data/communityUpdates";

const TEAL_DARK = "#5eead4";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

interface CardProps {
  update: CommunityUpdate;
  variant?: "dark" | "light";
}

/**
 * Editorial card for a single community update.
 * Dark variant (default) for town pages; light variant for the hub page.
 */
export const CommunityUpdateCard = ({ update, variant = "dark" }: CardProps) => {
  const isDark = variant === "dark";
  const shell = isDark
    ? "bg-white/[0.03] border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.05]"
    : "bg-white border-black/[0.06] hover:border-black/[0.15] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]";
  const headline = isDark ? "text-white" : "text-[#0B0F19]";
  const summary = isDark ? "text-white/70" : "text-neutral-700";
  const meta = isDark ? "text-white/50" : "text-neutral-500";
  const eyebrow = isDark ? "text-[#5eead4]" : "text-[#0d6e66]";

  return (
    <article
      className={`group flex flex-col rounded-2xl border ${shell} p-6 md:p-7 transition-colors`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${eyebrow}`}
        >
          {update.department}
        </span>
        {update.verified && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
              isDark
                ? "bg-[#5eead4]/10 text-[#5eead4] border border-[#5eead4]/25"
                : "bg-[#0d6e66]/10 text-[#0d6e66] border border-[#0d6e66]/20"
            }`}
          >
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        )}
      </div>

      <h3
        className={`text-lg md:text-xl font-semibold leading-snug tracking-[-0.01em] ${headline}`}
      >
        {update.headline}
      </h3>

      <p className={`mt-3 text-sm md:text-[15px] leading-relaxed ${summary}`}>
        {update.summary}
      </p>

      <div className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] ${meta}`}>
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5" /> {update.source}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> {formatDate(update.publishedDate)}
        </span>
      </div>

      {update.officialLink && (
        <a
          href={update.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${
            isDark ? "text-[#5eead4] hover:text-white" : "text-[#0d6e66] hover:text-[#0B0F19]"
          } transition-colors`}
        >
          Official source <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </article>
  );
};

export default CommunityUpdateCard;
