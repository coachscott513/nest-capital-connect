import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Users,
  Inbox,
  CheckSquare,
  DollarSign,
  Crown,
  Tag,
  ArrowRight,
} from "lucide-react";

type Stats = {
  towns: number;
  listings: number;
  newInquiries: number;
  activePartners: number;
  pendingClaims: number;
  mrr: number;
  townPartners: number;
  categorySponsors: number;
};

const ZERO: Stats = {
  towns: 0,
  listings: 0,
  newInquiries: 0,
  activePartners: 0,
  pendingClaims: 0,
  mrr: 0,
  townPartners: 0,
  categorySponsors: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(ZERO);

  useEffect(() => {
    (async () => {
      const [
        towns,
        listings,
        inquiriesNew,
        partnersActive,
        claimsNew,
        placements,
      ] = await Promise.all([
        supabase.from("towns").select("*", { count: "exact", head: true }),
        supabase.from("listings").select("*", { count: "exact", head: true }),
        supabase
          .from("partner_inquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("partners")
          .select("*", { count: "exact", head: true })
          .eq("status", "active"),
        supabase
          .from("listing_claims")
          .select("*", { count: "exact", head: true })
          .in("status", ["new", "pending", "verifying"]),
        supabase
          .from("partner_placements")
          .select("monthly_price,placement_type,status")
          .eq("status", "active"),
      ]);

      const placementRows = (placements.data ?? []) as Array<{
        monthly_price: number | null;
        placement_type: string;
      }>;
      const mrr = placementRows.reduce(
        (sum, r) => sum + (Number(r.monthly_price) || 0),
        0
      );
      const townPartners = placementRows.filter(
        (r) => r.placement_type === "town_partner" || r.placement_type === "core_market_package"
      ).length;
      const categorySponsors = placementRows.filter(
        (r) => r.placement_type === "category_sponsor" || r.placement_type === "service_spotlight"
      ).length;

      setStats({
        towns: towns.count ?? 0,
        listings: listings.count ?? 0,
        newInquiries: inquiriesNew.count ?? 0,
        activePartners: partnersActive.count ?? 0,
        pendingClaims: claimsNew.count ?? 0,
        mrr,
        townPartners,
        categorySponsors,
      });
    })();
  }, []);

  const cards = [
    { label: "Total Towns", value: stats.towns, icon: Building2, to: "/admin/towns" },
    { label: "Active Property Links", value: stats.listings.toLocaleString(), icon: CheckSquare, to: "/admin/property-listings" },
    { label: "New Partner Inquiries", value: stats.newInquiries, icon: Inbox, to: "/admin/partner-inquiries", highlight: stats.newInquiries > 0 },
    { label: "Active Partners", value: stats.activePartners, icon: Users, to: "/admin/partners" },
    { label: "Pending Listing Claims", value: stats.pendingClaims, icon: CheckSquare, to: "/admin/listing-claims", highlight: stats.pendingClaims > 0 },
    { label: "Monthly Recurring Revenue", value: `$${stats.mrr.toLocaleString()}`, icon: DollarSign, to: "/admin/revenue" },
    { label: "Premium Town Partners", value: stats.townPartners, icon: Crown, to: "/admin/partner-placements" },
    { label: "Category Sponsors", value: stats.categorySponsors, icon: Tag, to: "/admin/partner-placements" },
  ];

  const quickLinks = [
    { to: "/admin/towns", label: "Manage Towns" },
    { to: "/admin/partner-inquiries", label: "Review Partner Inquiries" },
    { to: "/admin/partners", label: "Manage Partners" },
    { to: "/admin/listing-claims", label: "Review Listing Claims" },
    { to: "/admin/revenue", label: "View Revenue" },
  ];

  return (
    <AdminLayout
      title="Admin Overview"
      description="Capital District Nest Homes — operational dashboard"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} to={c.to}>
            <Card
              className={`p-5 bg-[#1E2230] border-white/10 hover:border-[#5eead4]/40 transition ${
                c.highlight ? "ring-1 ring-[#5eead4]/40" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <c.icon className="w-5 h-5 text-[#5eead4]" />
              </div>
              <div className="text-2xl font-semibold text-white">{c.value}</div>
              <div className="text-xs text-white/55 mt-1">{c.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-sm uppercase tracking-wide text-white/55 mb-3">Quick links</h2>
      <div className="flex flex-wrap gap-2">
        {quickLinks.map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1E2230] px-4 py-2 text-sm text-white/85 hover:border-[#5eead4]/40 hover:text-white"
          >
            {q.label} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
