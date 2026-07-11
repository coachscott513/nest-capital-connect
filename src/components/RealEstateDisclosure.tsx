import React from "react";
import { realEstateDisclosure as cfg } from "@/config/realEstateDisclosure";

interface RealEstateDisclosureProps {
  className?: string;
  variant?: "footer" | "inline";
}

/**
 * Renders the brokerage disclosure block for real-estate surfaces only.
 *
 * - When `disclosure_active` is true AND `brokerage_name` is filled, shows the
 *   full agent + brokerage + license + EHO block.
 * - Otherwise renders a neutral safe fallback so no unapproved brokerage
 *   wording is ever published.
 *
 * Do NOT mount this on the homepage, businesses, stories, communities, events,
 * or business-owner pages. Real estate is one product inside the platform —
 * not the identity of the entire site.
 */
const RealEstateDisclosure: React.FC<RealEstateDisclosureProps> = ({
  className = "",
  variant = "footer",
}) => {
  const active = cfg.disclosure_active && cfg.brokerage_name.trim().length > 0;

  const base =
    variant === "footer"
      ? "border-t border-white/10 bg-[#05080F] text-white/60"
      : "border border-white/10 bg-white/[0.02] text-white/70 rounded-xl";

  return (
    <section className={`${base} ${className}`} aria-label="Real estate disclosure">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-6">
        {active ? (
          <div className="text-[12px] leading-relaxed space-y-1 text-center">
            <p className="text-white/80">
              {cfg.agent_name}, {cfg.license_title}
              {cfg.license_number ? ` · License #${cfg.license_number}` : ""}
            </p>
            <p>
              {cfg.brokerage_name}
              {cfg.brokerage_office ? ` · ${cfg.brokerage_office}` : ""}
              {cfg.brokerage_phone ? ` · ${cfg.brokerage_phone}` : ""}
            </p>
            <p className="text-white/55">{cfg.equal_housing_text}</p>
          </div>
        ) : (
          <p className="text-[12px] leading-relaxed text-center">
            Real estate services provided by a licensed New York real estate
            salesperson. Brokerage details available on request.{" "}
            {cfg.equal_housing_text}.
          </p>
        )}
      </div>
    </section>
  );
};

export default RealEstateDisclosure;
