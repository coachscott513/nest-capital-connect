import { Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import AnalystCard from "@/components/AnalystCard";
import { trackGAEvent } from "@/components/GARouteTracker";
import { isBuyerToolsRoute, isLocalDiscoveryRoute } from "@/lib/routeGroups";

/**
 * FloatingLiveAgent — single global floating contact (desktop).
 * On buyer/property routes it renders nothing: `BuyerToolsDock` is the single
 * persistent control there (Talk to Scott lives inside it), so the two never
 * overlap. Everywhere else this stays the neutral Local Concierge.
 * Brand-locked: charcoal pill, teal accent.
 */
const CHARCOAL = "#0e0f12";
const TEAL = "#0d6e66";

const FloatingLiveAgent = () => {
  const { pathname } = useLocation();
  const isBusinessPage = isLocalDiscoveryRoute(pathname);


  const pill = (label: string, onClick: () => void) => (
    <button
      aria-label={label}
      onClick={onClick}
      className="group flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full text-white font-semibold text-sm shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_20px_44px_-8px_rgba(94,234,212,0.35)] hover:scale-[1.03]"
      style={{ backgroundColor: CHARCOAL }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: TEAL }}
      >
        <Phone className="w-4 h-4" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[1500]">
      {isPropertyPage ? (
        <TalkToScottDialog context={{ placement: "floating-talk-to-scott" }}>
          {pill("Talk to Scott", () => trackGAEvent.chatOpen("floating_talk_to_scott"))}
        </TalkToScottDialog>
      ) : (
        <AnalystCard
          contextualDisclaimer={
            isBusinessPage
              ? "This contacts Capital District Nest, not the listed business."
              : undefined
          }
        >
          {pill("Local Concierge", () => trackGAEvent.chatOpen("floating_live_agent"))}
        </AnalystCard>
      )}
    </div>
  );
};

export default FloatingLiveAgent;
