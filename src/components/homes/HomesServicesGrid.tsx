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
  <section className="px-[5%] py-20 bg-background border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="eyebrow-apple text-primary mb-3">REAL ESTATE SERVICES</div>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
          Local experts for every part of the transaction.
        </h2>
        <p className="nest-lead max-w-2xl mx-auto">
          Find lenders, insurance agents, attorneys, contractors, inspectors,
          property managers, and other real estate service providers.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SERVICES.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            to={href}
            className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition flex flex-col gap-3"
          >
            <Icon className="w-6 h-6 text-primary" />
            <div className="text-sm font-semibold text-foreground">{label}</div>
            <div className="text-xs text-primary mt-auto">Browse →</div>
          </Link>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
        <div className="text-lg font-semibold text-foreground mb-1">
          Serve buyers, sellers, landlords, or property owners?
        </div>
        <p className="text-sm text-muted-foreground mb-4">
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
