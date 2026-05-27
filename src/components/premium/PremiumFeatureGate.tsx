import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * PremiumFeatureGate — wraps premium business-owner features (specials,
 * events, featured placement, gallery, analytics). NEVER used to gate
 * basic resident search utilities (phone/website/directions/address).
 *
 * If `unlocked` is true, children render. Otherwise a polished glass
 * "Premium Feature" panel renders with a Claim CTA scoped to the business.
 */
export type PremiumFeatureGateProps = {
  unlocked: boolean;
  featureName?: string;
  businessName?: string;
  businessId?: string;
  town?: string;
  description?: string;
  children: ReactNode;
  /** Render children behind a soft blur preview behind the gate */
  showPreview?: boolean;
};

const PremiumFeatureGate = ({
  unlocked,
  featureName = "Premium Feature",
  businessName,
  businessId,
  town,
  description,
  children,
  showPreview = false,
}: PremiumFeatureGateProps) => {
  if (unlocked) return <>{children}</>;

  const subtext =
    description ??
    (businessName
      ? `Unlock priority placement, photo galleries, specials, events, and social media tools for ${businessName}.`
      : "Unlock priority placement, photo galleries, specials, events, and social media tools.");

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {showPreview && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none opacity-40"
          style={{ filter: "blur(14px) saturate(120%)" }}
        >
          {children}
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(94,234,212,0.10), transparent 60%), linear-gradient(180deg, rgba(11,15,25,0.55), rgba(11,15,25,0.85))",
        }}
      />

      <div className="relative px-8 py-12 md:px-12 md:py-16 text-center flex flex-col items-center">
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
          {featureName}
        </p>
        <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
          Premium Showcase
        </h3>
        <p className="mt-4 max-w-xl text-sm md:text-base text-white/65 font-light leading-relaxed">
          {subtext}
        </p>
        <Link
          to="/pricing"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
        >
          <Sparkles className="w-4 h-4" />
          Unlock Premium Showcase Features
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default PremiumFeatureGate;
