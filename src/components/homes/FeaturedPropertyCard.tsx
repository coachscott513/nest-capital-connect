import { Link } from "react-router-dom";
import { useState } from "react";
import { Calculator, Phone, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import type { FeaturedProperty } from "@/data/featuredProperties";
import ListingAgentModal from "./ListingAgentModal";

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const FeaturedPropertyCard = ({ property }: { property: FeaturedProperty }) => {
  const [agentOpen, setAgentOpen] = useState(false);
  const briefHref = `/homes/listings/${property.townSlug}/${property.slug}`;
  const analyzerHref = `/investment-analyzer?town=${property.townSlug}&property_type=multi_family&price=${property.price}&rent=${property.projectedMonthlyRent ?? ""}&taxes=${property.annualTaxes}&utilities=${property.annualSellerPaidUtilities ?? ""}`;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#5eead4]/25 bg-gradient-to-br from-[#0B0F19] via-[#11151f] to-[#1E2230] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5eead4]/60 to-transparent" />

      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#5eead4]" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#5eead4] font-medium">
          Featured {property.address.city} Investment Property
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {property.address.line1}
          </h3>
          <p className="text-sm text-white/65 mt-1">
            {property.propertyType} · {property.address.city}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-sm text-white/85">
            <Stat label="Price" value={fmtMoney(property.price)} />
            <Stat label="Beds" value={property.beds} />
            <Stat label="Baths" value={property.baths} />
            <Stat label="Sqft" value={property.sqft.toLocaleString()} />
            <Stat label="Rent potential" value={`${fmtMoney(property.projectedMonthlyRent ?? 0)}/mo`} />
          </div>

          <div className="mt-5 text-xs text-white/55 space-y-0.5">
            <div>Listed by <span className="text-white/85">{property.brokerage.name}</span></div>
            <div>Listing agent <span className="text-white/85">{property.agent.name}</span></div>
          </div>
        </div>

        <div className="hidden md:flex w-20 h-20 rounded-2xl bg-[#5eead4]/10 border border-[#5eead4]/30 items-center justify-center text-[#5eead4] text-2xl font-semibold shrink-0">
          {property.agent.initials}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/10">
        <Link to={briefHref} className="btn-primary-apple inline-flex items-center gap-2">
          View Property Brief <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to={analyzerHref} className="btn-secondary-apple-dark inline-flex items-center gap-2">
          <Calculator className="w-4 h-4" /> Analyze Numbers
        </Link>
        <button onClick={() => setAgentOpen(true)} className="btn-dark-cta inline-flex items-center gap-2">
          <Phone className="w-4 h-4" /> Contact Listing Agent
        </button>
        <a href={property.source.url} target="_blank" rel="noopener noreferrer" className="btn-secondary-apple-dark inline-flex items-center gap-2">
          <ExternalLink className="w-4 h-4" /> View Original Source
        </a>
      </div>

      <ListingAgentModal open={agentOpen} onOpenChange={setAgentOpen} property={property} />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <div className="text-white font-semibold text-base">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-white/45">{label}</div>
  </div>
);

export default FeaturedPropertyCard;
