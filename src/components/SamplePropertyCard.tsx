import { Star, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import troyProperty from "@/assets/troy-quadruplex-45-south-lake.jpg";

export interface FeaturedDeal {
  city: string;
  state: string;
  zip: string;
  units: number;
  beds: number;
  sqft: number;
  price: number;
  capRate: number;
  monthlyCashFlow: number;
  cashToClose: number;
  grossRent: number;
  noi: number;
  taxes: number;
  yearBuilt: string;
  dealScore: number;
  photoUrl?: string;
  isNew: boolean;
}

const defaultDeal: FeaturedDeal = {
  city: "Troy",
  state: "NY",
  zip: "12180",
  units: 2,
  beds: 6,
  sqft: 2266,
  price: 198000,
  capRate: 10.5,
  monthlyCashFlow: 743,
  cashToClose: 55440,
  grossRent: 2720,
  noi: 12844,
  taxes: 1581,
  yearBuilt: "1901",
  dealScore: 98,
  isNew: true,
};

const fmt = (n: number) =>
  n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${n.toLocaleString()}`;

const SamplePropertyCard = ({ deal = defaultDeal }: { deal?: FeaturedDeal }) => {
  return (
    <div className="relative group">
      {/* Glow */}
      <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity" />

      <div className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Sample Deal · Live Data
            </span>
          </div>
          <div className="flex items-center gap-1 bg-primary/15 text-primary px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{deal.dealScore}</span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={deal.photoUrl || troyProperty}
            alt={`${deal.city}, ${deal.state} investment property`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4">
            <p className="text-xs text-muted-foreground">{deal.city}, {deal.state} {deal.zip}</p>
            <p className="text-xs text-muted-foreground/70">{deal.units} Unit · {deal.beds} Bed · {deal.sqft.toLocaleString()} sqft</p>
          </div>
          <div className="absolute bottom-3 right-4">
            <p className="text-2xl font-bold text-foreground">${deal.price.toLocaleString()}</p>
          </div>

          {deal.isNew && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              New Today
            </div>
          )}
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-px bg-border/20 border-t border-border/30">
          <div className="bg-card p-4 text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Cap Rate</p>
            <p className="text-xl font-bold text-primary">{deal.capRate}%</p>
          </div>
          <div className="bg-card p-4 text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Cash Flow</p>
            <p className="text-xl font-bold text-primary">+${deal.monthlyCashFlow}</p>
          </div>
          <div className="bg-card p-4 text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Cash to Close</p>
            <p className="text-xl font-bold text-foreground">{fmt(deal.cashToClose)}</p>
          </div>
        </div>

        {/* Additional stats */}
        <div className="grid grid-cols-4 gap-px bg-border/20">
          {[
            { label: "Gross Rent", value: `$${deal.grossRent.toLocaleString()}/mo` },
            { label: "NOI", value: `$${deal.noi.toLocaleString()}/yr` },
            { label: "Taxes", value: `$${deal.taxes.toLocaleString()}/yr` },
            { label: "Year Built", value: deal.yearBuilt },
          ].map((s) => (
            <div key={s.label} className="bg-card px-3 py-2.5 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60">{s.label}</p>
              <p className="text-xs font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-4">
          <Link
            to="/analyzer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
          >
            <Calculator className="w-4 h-4" />
            Run Full Analysis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SamplePropertyCard;
