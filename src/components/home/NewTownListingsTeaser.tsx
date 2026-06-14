import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Home, Plus } from "lucide-react";
import { REMAX_SEARCH_URL } from "@/data/homesTowns";

const NewTownListingsTeaser = () => {
  return (
    <section className="px-[5%] py-20 bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-[#1E2230] overflow-hidden p-8 md:p-12">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-80"
            style={{
              background:
                "radial-gradient(50% 60% at 80% 30%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(40% 60% at 10% 90%, rgba(13,110,102,0.18), transparent 70%)",
            }}
          />
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#5eead4] mb-3">
                <Home className="w-3.5 h-3.5" /> NEW TOWN LISTINGS
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
                Homes, rentals, and property links by town.
              </h2>
              <p className="body-apple-dark mb-6 max-w-xl">
                Browse new listings, rentals, open houses, and active listing
                agents across the Capital District.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/homes" className="btn-primary-apple inline-flex items-center gap-2">
                  Explore Homes <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={REMAX_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-apple-dark inline-flex items-center gap-2"
                >
                  Search MLS <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/homes/add-listing"
                  className="btn-secondary-apple-dark inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Post Listing Link
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Delmar", slug: "delmar" },
                { label: "Albany", slug: "albany" },
                { label: "Saratoga", slug: "saratoga-springs" },
                { label: "Troy", slug: "troy" },
                { label: "Schenectady", slug: "schenectady" },
                { label: "Clifton Park", slug: "clifton-park" },
              ].map((t) => (
                <Link
                  key={t.slug}
                  to={`/homes/listings/${t.slug}`}
                  className="rounded-xl border border-white/10 bg-[#0B0F19]/60 px-4 py-3 text-sm font-medium text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition"
                >
                  {t.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTownListingsTeaser;
