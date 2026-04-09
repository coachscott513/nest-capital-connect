import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import { getInvestmentListings, type Listing } from "@/lib/listings";
import { DealCard, UnlockModal, type UnlockedDetails } from "@/components/DealCard";

interface NewThisWeekSectionProps {
  townName: string;
}

const NewThisWeekSection = ({ townName }: NewThisWeekSectionProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlockListing, setUnlockListing] = useState<Listing | null>(null);
  const [unlockedMap, setUnlockedMap] = useState<Record<string, UnlockedDetails>>({});

  useEffect(() => {
    getInvestmentListings(townName, 6).then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, [townName]);

  const handleUnlocked = (mlsNumber: string, details: UnlockedDetails) => {
    setUnlockedMap((prev) => ({ ...prev, [mlsNumber]: details }));
  };

  if (!loading && listings.length === 0) return null;

  return (
    <section className="py-20 px-[5%] bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary tracking-widest uppercase">
            New This Week
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight mb-3">
          Investment Deals in <span className="font-semibold">{townName}</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Active investment properties scored by cap rate, cash flow, and DSCR. Updated from live MLS data.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-card p-8 animate-pulse border border-border">
                <div className="h-4 bg-muted rounded w-1/3 mb-6" />
                <div className="h-5 bg-muted rounded w-2/3 mb-2" />
                <div className="h-8 bg-muted rounded w-1/2 mb-7" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <DealCard
                key={listing.id}
                listing={listing}
                unlockedDetails={unlockedMap[listing.mls_number || listing.id]}
                onUnlockClick={setUnlockListing}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
          >
            View all Capital District deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {unlockListing && (
        <UnlockModal
          listing={unlockListing}
          onClose={() => setUnlockListing(null)}
          onUnlocked={handleUnlocked}
        />
      )}
    </section>
  );
};

export default NewThisWeekSection;
