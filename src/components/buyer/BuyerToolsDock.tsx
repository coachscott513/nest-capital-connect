import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { isBuyerToolsRoute } from "@/lib/routeExperience";
import BuyerToolsMenu from "@/components/buyer/BuyerToolsMenu";
import { trackBuyerToolsOpen } from "@/components/buyer/buyerToolsAnalytics";

const SOURCE = "buyer-tools-dock";

/**
 * BuyerToolsDock — persistent desktop right-edge launcher for the two
 * buyer products (Deal Calculator + Property Intelligence) plus a quiet
 * Talk to Scott action. Rendered only on buyer/property routes; the
 * local/business experience keeps Local Concierge instead.
 */
const BuyerToolsDock = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const show = isBuyerToolsRoute(pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!show) return null;

  return (
    <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-[1400]">
      <div className="relative flex items-center justify-end pr-0">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Buyer tools"
            className="mr-3 w-[340px] rounded-2xl border p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 duration-200"
            style={{
              backgroundColor: "#FBFAF7",
              borderColor: "#DFDCD4",
              boxShadow: "0 28px 70px -30px rgba(11,15,25,0.45)",
              fontFamily: "'Manrope', system-ui, sans-serif",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: "#0D6E66" }}>
                  Buyer tools
                </p>
                <p className="mt-1 text-[13px] font-light leading-snug" style={{ color: "#64748B" }}>
                  Two ways to test a property decision.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close buyer tools"
                className="w-9 h-9 rounded-full border inline-flex items-center justify-center transition hover:bg-[#F3F4F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60"
                style={{ borderColor: "#DFDCD4", color: "#14181F" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <BuyerToolsMenu
              pathname={pathname}
              sourceLocation={SOURCE}
              onNavigate={() => setOpen(false)}
            />
          </div>
        )}

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Buyer tools"
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) trackBuyerToolsOpen(SOURCE, pathname);
          }}
          className="inline-flex items-center gap-2 py-3 pl-3 pr-2.5 rounded-l-2xl border border-r-0 text-[12px] font-semibold tracking-wide transition hover:bg-[#0D6E66] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60"
          style={{
            backgroundColor: "#FBFAF7",
            borderColor: "#DFDCD4",
            color: "#14181F",
            writingMode: "vertical-rl",
            boxShadow: "0 18px 44px -26px rgba(11,15,25,0.5)",
            fontFamily: "'Manrope', system-ui, sans-serif",
          }}
        >
          <SlidersHorizontal className="w-4 h-4 rotate-90" />
          Buyer tools
        </button>
      </div>
    </div>
  );
};

export default BuyerToolsDock;
