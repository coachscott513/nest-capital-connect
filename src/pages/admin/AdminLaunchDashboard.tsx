import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { PREVIEW_BUSINESSES } from "@/data/PREVIEW_BUSINESSES";
import {
  Rocket,
  Mail,
  FileText,
  CheckCircle2,
  Users,
  Phone,
  MousePointerClick,
  MapPin,
  QrCode,
  Globe2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

type Counts = {
  applicationsStarted: number;
  applicationsCompleted: number;
  activePartners: number;
  claims: number;
  regionsLive: number;
  leads: number;
};

const ZERO: Counts = {
  applicationsStarted: 0,
  applicationsCompleted: 0,
  activePartners: 0,
  claims: 0,
  regionsLive: 0,
  leads: 0,
};

const SOP_LIST = [
  { name: "Business onboarding", done: true },
  { name: "Spotlight creation", done: true },
  { name: "Photo approval", done: false },
  { name: "Town launch", done: true },
  { name: "QR generation", done: false },
  { name: "Email outreach", done: false },
  { name: "Partner upgrades", done: true },
  { name: "Community stories", done: false },
];

export default function AdminLaunchDashboard() {
  const [counts, setCounts] = useState<Counts>(ZERO);

  useEffect(() => {
    (async () => {
      const [apps, appsCompleted, partners, claims, regions, leads] =
        await Promise.all([
          supabase.from("business_applications").select("*", { count: "exact", head: true }),
          supabase
            .from("business_applications")
            .select("*", { count: "exact", head: true })
            .in("status", ["completed", "approved", "published"]),
          supabase
            .from("partners")
            .select("*", { count: "exact", head: true })
            .eq("status", "active"),
          supabase.from("listing_claims").select("*", { count: "exact", head: true }),
          supabase
            .from("regions")
            .select("*", { count: "exact", head: true })
            .eq("launch_status", "live"),
          supabase.from("leads").select("*", { count: "exact", head: true }),
        ]);

      setCounts({
        applicationsStarted: apps.count ?? 0,
        applicationsCompleted: appsCompleted.count ?? 0,
        activePartners: partners.count ?? 0,
        claims: claims.count ?? 0,
        regionsLive: regions.count ?? 0,
        leads: leads.count ?? 0,
      });
    })();
  }, []);

  const spotlightsPublished = PREVIEW_BUSINESSES.filter(
    (b) => b.label === "spotlight" || b.label === "owner_verified"
  ).length;
  const previewsLive = PREVIEW_BUSINESSES.length;
  const sopsDone = SOP_LIST.filter((s) => s.done).length;

  const cards = [
    {
      label: "Spotlight Pages Published",
      value: spotlightsPublished,
      sub: `${previewsLive} total previews live`,
      icon: Rocket,
      to: "/businesses",
    },
    {
      label: "Businesses Contacted",
      value: "—",
      sub: "Log outreach in CRM",
      icon: Mail,
      to: "/admin",
    },
    {
      label: "Applications Started",
      value: counts.applicationsStarted,
      icon: FileText,
      to: "/admin/business-audit",
    },
    {
      label: "Applications Completed",
      value: counts.applicationsCompleted,
      icon: CheckCircle2,
      to: "/admin/business-audit",
    },
    {
      label: "Featured Partners",
      value: counts.activePartners,
      icon: Users,
      to: "/admin/partners",
    },
    {
      label: "Leads Captured",
      value: counts.leads,
      sub: "Across all forms",
      icon: MousePointerClick,
      to: "/admin",
    },
    {
      label: "Calls Generated",
      value: "GA4",
      sub: "View in Google Analytics",
      icon: Phone,
      to: "/admin",
    },
    {
      label: "Website Clicks",
      value: "GA4",
      sub: "View in Google Analytics",
      icon: MousePointerClick,
      to: "/admin",
    },
    {
      label: "Direction Requests",
      value: "GA4",
      sub: "View in Google Analytics",
      icon: MapPin,
      to: "/admin",
    },
    {
      label: "QR Scans",
      value: "—",
      sub: "Attach UTM to QR codes",
      icon: QrCode,
      to: "/admin",
    },
    {
      label: "Regions Live",
      value: counts.regionsLive,
      sub: "Capital District = Region #1",
      icon: Globe2,
      to: "/admin/towns",
    },
    {
      label: "SOPs Completed",
      value: `${sopsDone} / ${SOP_LIST.length}`,
      icon: BookOpen,
      to: "#sops",
    },
  ];

  return (
    <AdminLayout
      title="Launch Dashboard"
      description="Region #1 — Capital District Nest. Executive view of validation-phase progress."
    >
      <div className="mb-8 rounded-2xl border border-[#5eead4]/20 bg-[#1E2230] p-6">
        <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-2">
          V1 Launch — Validation Phase
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Acquire the first 25 Spotlight businesses.
        </h2>
        <p className="mt-2 text-sm text-white/65 max-w-2xl">
          Code freeze is in effect. The next great feature comes from a real
          business owner, not another design session. Track meaningful actions
          here — not page views.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.label} to={c.to}>
            <Card className="p-5 h-full bg-[#1E2230] border-white/10 hover:border-[#5eead4]/40 transition">
              <div className="flex items-start justify-between mb-3">
                <c.icon className="w-5 h-5 text-[#5eead4]" />
              </div>
              <div className="text-2xl font-semibold text-white">{c.value}</div>
              <div className="text-xs text-white/70 mt-1">{c.label}</div>
              {c.sub && (
                <div className="text-[11px] text-white/40 mt-1">{c.sub}</div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      <div id="sops" className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#1E2230] border-white/10">
          <h3 className="text-sm uppercase tracking-wide text-white/55 mb-4">
            Nest OS — Standard Operating Procedures
          </h3>
          <ul className="space-y-2">
            {SOP_LIST.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between text-sm text-white/85"
              >
                <span>{s.name}</span>
                <span
                  className={
                    s.done
                      ? "text-[#5eead4] text-xs"
                      : "text-white/40 text-xs"
                  }
                >
                  {s.done ? "Documented" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-[#1E2230] border-white/10">
          <h3 className="text-sm uppercase tracking-wide text-white/55 mb-4">
            Next 30 Days
          </h3>
          <ol className="space-y-3 text-sm text-white/85 list-decimal list-inside">
            <li>Send 20 personalized business invitations</li>
            <li>Complete 5 Spotlight pages with owner-supplied content</li>
            <li>Deliver 5 QR cards with UTM-tagged short links</li>
            <li>Measure engagement for 30 days</li>
            <li>Collect qualitative feedback from every participant</li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/businesses"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0e0f12] px-4 py-2 text-sm text-white/85 hover:border-[#5eead4]/40"
            >
              View public hub <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/admin/business-audit"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0e0f12] px-4 py-2 text-sm text-white/85 hover:border-[#5eead4]/40"
            >
              Review applications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
