import { ShieldCheck, PenLine, Heart, Leaf, Camera, Video } from "lucide-react";

export type EditorialBadgeKind =
  | "owner-verified"
  | "cdn-editorial"
  | "community-favorite"
  | "seasonally-updated"
  | "original-photography"
  | "video-available";

const CONFIG: Record<
  EditorialBadgeKind,
  { label: string; icon: typeof ShieldCheck; dot: string; ring: string; text: string; tooltip: string }
> = {
  "owner-verified": {
    label: "Owner Verified",
    icon: ShieldCheck,
    dot: "#22c55e",
    ring: "ring-emerald-400/30",
    text: "text-emerald-300",
    tooltip: "The owner has confirmed the details on this page.",
  },
  "cdn-editorial": {
    label: "CDN Editorial",
    icon: PenLine,
    dot: "#5eead4",
    ring: "ring-teal-300/30",
    text: "text-teal-200",
    tooltip: "Written and curated by the Capital District Nest editorial team.",
  },
  "community-favorite": {
    label: "Community Favorite",
    icon: Heart,
    dot: "#c084fc",
    ring: "ring-purple-300/30",
    text: "text-purple-200",
    tooltip: "Frequently mentioned by locals across reviews and community posts.",
  },
  "seasonally-updated": {
    label: "Seasonally Updated",
    icon: Leaf,
    dot: "#facc15",
    ring: "ring-yellow-300/30",
    text: "text-yellow-200",
    tooltip: "Menu, hours, or offerings refreshed within the current season.",
  },
  "original-photography": {
    label: "Original Photography",
    icon: Camera,
    dot: "#f472b6",
    ring: "ring-pink-300/30",
    text: "text-pink-200",
    tooltip: "Photos captured by Capital District Nest or provided by the owner.",
  },
  "video-available": {
    label: "Video Available",
    icon: Video,
    dot: "#60a5fa",
    ring: "ring-sky-300/30",
    text: "text-sky-200",
    tooltip: "Includes original or verified video content.",
  },
};

interface EditorialBadgesProps {
  badges: EditorialBadgeKind[];
  className?: string;
  size?: "sm" | "md";
}

const EditorialBadges = ({ badges, className = "", size = "md" }: EditorialBadgesProps) => {
  if (!badges?.length) return null;
  const pad = size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {badges.map((kind) => {
        const cfg = CONFIG[kind];
        const Icon = cfg.icon;
        return (
          <span
            key={kind}
            title={cfg.tooltip}
            className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md ${pad} font-medium tracking-[0.08em] uppercase ${cfg.text} ring-1 ${cfg.ring}`}
          >
            <Icon className={iconSize} style={{ color: cfg.dot }} />
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
};

export default EditorialBadges;
