import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DealAsset {
  id: string;
  address: string;
  price: string;
  property_type: string;
  cash_on_cash_return: number;
  cap_rate: number;
  units: number;
}

interface LiveDealFeedProps {
  townSlug: string;
  townName: string;
}

const LiveDealFeed = ({ townSlug, townName }: LiveDealFeedProps) => {
  const [deals, setDeals] = useState<DealAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const { data } = await supabase
        .from("high_yield_assets")
        .select("id, address, price, property_type, cash_on_cash_return, cap_rate, units")
        .eq("town_slug", townSlug)
        .eq("is_active", true)
        .order("cash_on_cash_return", { ascending: false })
        .limit(3);

      if (data) setDeals(data);
      setLoading(false);
    };
    fetchDeals();
  }, [townSlug]);

  if (loading) {
    return (
      <div className="bento-card p-6 h-full">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted/50 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bento-card p-6 hover-lift h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Deals</p>
          <h3 className="text-lg font-bold text-foreground">Cash-Flow Positive</h3>
        </div>
      </div>

      {deals.length > 0 ? (
        <div className="space-y-3">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              to="/dealdesk"
              className="flex items-center justify-between p-3 glass rounded-xl group hover:bg-primary/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {deal.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {deal.property_type} · {deal.units} unit{deal.units > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right ml-3">
                <p className="text-sm font-bold text-primary">{deal.price}</p>
                <p className="text-[10px] text-muted-foreground">{deal.cash_on_cash_return}% CoC</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Home className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">No active deals in {townName}</p>
          <Link to="/dealdesk" className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1">
            Submit an address <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {deals.length > 0 && (
        <Link
          to="/dealdesk"
          className="flex items-center justify-center gap-2 mt-4 text-sm text-primary font-semibold hover:underline"
        >
          View all {townName} deals <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default LiveDealFeed;
