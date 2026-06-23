import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Placement = {
  id: string;
  partner_id: string;
  town_slug: string | null;
  category: string | null;
  placement_type: string;
  tier: string | null;
  monthly_price: number | null;
  status: string;
};

export default function AdminRevenue() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [pendingInquiries, setPendingInquiries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [p, inq] = await Promise.all([
        supabase.from("partner_placements").select("*"),
        supabase.from("partner_inquiries").select("*", { count: "exact", head: true }).in("status", ["new", "reviewed", "contacted", "interested"]),
      ]);
      setPlacements((p.data ?? []) as Placement[]);
      setPendingInquiries(inq.count ?? 0);
      setLoading(false);
    })();
  }, []);

  const active = useMemo(() => placements.filter((p) => p.status === "active"), [placements]);
  const cancelled = useMemo(() => placements.filter((p) => p.status === "cancelled" || p.status === "expired"), [placements]);
  const mrr = active.reduce((s, r) => s + (Number(r.monthly_price) || 0), 0);

  const byTier = useMemo(() => groupSum(active, (p) => p.tier ?? "unspecified"), [active]);
  const byCategory = useMemo(() => groupSum(active, (p) => p.category ?? "unspecified"), [active]);
  const byType = useMemo(() => groupSum(active, (p) => p.placement_type), [active]);

  const townPartners = active.filter((p) => p.placement_type === "town_partner" || p.placement_type === "core_market_package").length;
  const categorySponsors = active.filter((p) => p.placement_type === "category_sponsor" || p.placement_type === "service_spotlight").length;
  const featuredCards = active.filter((p) => p.placement_type === "featured_card").length;

  if (loading) return <AdminLayout title="Revenue"><Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" /></AdminLayout>;

  return (
    <AdminLayout title="Revenue" description="Monthly recurring revenue across active partner placements.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Total MRR" value={`$${mrr.toLocaleString()}`} />
        <Stat label="Active Town Partners" value={townPartners} />
        <Stat label="Active Category Sponsors" value={categorySponsors} />
        <Stat label="Active Featured Cards" value={featuredCards} />
        <Stat label="Pending Inquiries" value={pendingInquiries} />
        <Stat label="Cancelled / Expired" value={cancelled.length} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Table title="Revenue by Tier" rows={byTier} />
        <Table title="Revenue by Category" rows={byCategory} />
        <Table title="Revenue by Placement Type" rows={byType} />
      </div>
    </AdminLayout>
  );
}

function groupSum(rows: Placement[], key: (p: Placement) => string) {
  const m = new Map<string, number>();
  rows.forEach((r) => m.set(key(r), (m.get(key(r)) ?? 0) + (Number(r.monthly_price) || 0)));
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <Card className="p-5 bg-[#1E2230] border-white/10">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-white/55 mt-1">{label}</div>
    </Card>
  );
}
function Table({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <Card className="p-5 bg-[#1E2230] border-white/10">
      <div className="text-sm font-medium text-white mb-3">{title}</div>
      {rows.length === 0 ? <div className="text-xs text-white/45">No active placements.</div> : (
        <ul className="space-y-1.5 text-sm">
          {rows.map(([k, v]) => (
            <li key={k} className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-white/75 capitalize">{k.replace(/_/g, " ")}</span>
              <span className="text-[#5eead4] font-medium">${v.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
