import { Link } from "react-router-dom";
import {
  Landmark,
  Shield,
  Scale,
  Hammer,
  Building,
  Search,
  FileSearch,
  Truck,
} from "lucide-react";

const SERVICES = [
  { label: "Mortgage & Lending", icon: Landmark, href: "/local?category=finance-legal&search=mortgage" },
  { label: "Insurance", icon: Shield, href: "/local?category=insurance" },
  { label: "Real Estate Attorneys", icon: Scale, href: "/local?category=legal-services&search=attorney" },
  { label: "Contractors & Home Services", icon: Hammer, href: "/local?category=home-services" },
  { label: "Property Management", icon: Building, href: "/local?category=property-management" },
  { label: "Inspectors", icon: Search, href: "/local?category=home-services&search=inspector" },
  { label: "Appraisers", icon: FileSearch, href: "/local?category=finance-legal&search=appraiser" },
  { label: "Moving & Storage", icon: Truck, href: "/local?category=home-services&search=moving" },
];

const HomesServicesGrid = () => (
  <section className="px-[5%] py-20 bg-background border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="eyebrow-apple text-[#5eead4] mb-3">REAL ESTATE SERVICES</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
          Local experts for every part of the transaction.
        </h2>
        <p className="body-apple-dark max-w-2xl mx-auto">
          Find lenders, insurance agents, attorneys, contractors, inspectors,
          property managers, and other real estate service providers.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SERVICES.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            to={href}
            className="group rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/50 transition flex flex-col gap-3"
          >
            <Icon className="w-6 h-6 text-[#5eead4]" />
            <div className="text-sm font-semibold text-white">{label}</div>
            <div className="text-xs text-[#5eead4] mt-auto">Browse →</div>
          </Link>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-6 md:p-8 text-center">
        <div className="text-lg font-semibold text-white mb-1">
          Serve buyers, sellers, landlords, or property owners?
        </div>
        <p className="text-sm text-white/65 mb-4">
          Claim your business on Capital District Nest.
        </p>
        <Link
          to="/claim-business?category=real-estate"
          className="btn-dark-cta inline-flex"
        >
          Claim Your Business
        </Link>
      </div>
    </div>
  </section>
);

export default HomesServicesGrid;
