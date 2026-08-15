import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PROTECTION_TIER_LABELS,
  PROTECTION_TIER_RULES,
  type ProtectionTier,
} from "@/lib/constants/policy";

type ProtectedUrl = {
  id: string;
  url: string;
  route_family: string;
  business_slug: string | null;
  clicks_28d: number;
  clicks_90d: number;
  impressions_90d: number;
  average_position: number | null;
  protection_tier: ProtectionTier;
  protection_reason: string;
  source_window: string;
  allow_slug_change: boolean;
  allow_noindex: boolean;
  allow_merge: boolean;
  updated_at: string;
};

const TIERS: ProtectionTier[] = ["founder_locked", "protected", "opportunity"];

export default function AdminSEOManifest() {
  const [rows, setRows] = useState<ProtectedUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState<ProtectionTier | "all">("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_protected_urls")
      .select("*")
      .order("clicks_90d", { ascending: false })
      .limit(500);
    if (error) setError(error.message);
    setRows((data as ProtectedUrl[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const sync = async () => {
    setSyncing(true);
    setError(null);
    setMessage(null);
    const { data, error } = await supabase.functions.invoke("sync-seo-protection", { body: {} });
    if (error) {
      setError(error.message);
    } else if (data?.status === "selection_required") {
      setError(`Multiple verified properties match. Candidates: ${(data.candidates ?? []).join(", ")}`);
    } else {
      const c = data?.counts ?? {};
      setMessage(
        `Synced ${data?.written ?? 0} URLs from ${data?.site_url ?? "Search Console"} — ` +
        `${c.founder_locked ?? 0} founder locked, ${c.protected ?? 0} protected, ${c.opportunity ?? 0} opportunity.`,
      );
      await load();
    }
    setSyncing(false);
  };

  const toggle = async (row: ProtectedUrl, field: "allow_slug_change" | "allow_noindex" | "allow_merge") => {
    if (row.protection_tier === "founder_locked") return;
    const next = !row[field];
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, [field]: next } : r)));
    const { error } = await supabase
      .from("seo_protected_urls")
      .update({ [field]: next, review_status: "reviewed", reviewed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (error) {
      setError(error.message);
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, [field]: !next } : r)));
    }
  };

  const filtered = tier === "all" ? rows : rows.filter((r) => r.protection_tier === tier);
  const counts = TIERS.reduce<Record<string, number>>((acc, t) => {
    acc[t] = rows.filter((r) => r.protection_tier === t).length;
    return acc;
  }, {});

  return (
    <AdminLayout title="SEO Manifest" description="Which URLs are protected from cleanup, and why.">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3 rounded-xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#5eead4]" />
          <p className="max-w-2xl text-sm text-white/75">
            Any URL listed here is off-limits to slug changes, noindex and merges unless you explicitly
            grant the override on that row. Cleanup tooling must check this manifest first.
          </p>
        </div>
        <Button onClick={sync} disabled={syncing} className="gap-2">
          {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Sync from Search Console
        </Button>
      </div>

      {message && <p className="mb-4 rounded-lg border border-[#5eead4]/30 bg-[#5eead4]/5 p-3 text-sm text-[#5eead4]">{message}</p>}
      {error && (
        <p className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertTriangle className="h-4 w-4" /> {error}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setTier("all")}
          className={`rounded-full border px-4 py-2 text-xs ${tier === "all" ? "border-[#5eead4] bg-[#5eead4]/10 text-[#5eead4]" : "border-white/15 text-white/60"}`}
        >
          All · {rows.length}
        </button>
        {TIERS.map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`rounded-full border px-4 py-2 text-xs ${tier === t ? "border-[#5eead4] bg-[#5eead4]/10 text-[#5eead4]" : "border-white/15 text-white/60"}`}
          >
            {PROTECTION_TIER_LABELS[t]} · {counts[t] ?? 0}
          </button>
        ))}
      </div>

      {tier !== "all" && <p className="mb-4 text-sm text-white/55">{PROTECTION_TIER_RULES[tier]}</p>}

      {loading ? (
        <div className="flex items-center gap-2 text-white/60"><Loader2 className="h-4 w-4 animate-spin" /> Loading manifest…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border border-[#2D3748] bg-[#1E2230] p-6">
          <p className="text-sm text-white/70">
            The manifest is empty. Run <strong className="text-white">Sync from Search Console</strong> to build it
            from the last 90 days of real search data.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#2D3748]">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-white/50">
              <tr>
                <th className="px-3 py-2 font-medium">URL</th>
                <th className="px-3 py-2 font-medium">Family</th>
                <th className="px-3 py-2 font-medium">Tier</th>
                <th className="px-3 py-2 font-medium">Clicks 90d</th>
                <th className="px-3 py-2 font-medium">Impr. 90d</th>
                <th className="px-3 py-2 font-medium">Pos.</th>
                <th className="px-3 py-2 font-medium">Slug change</th>
                <th className="px-3 py-2 font-medium">Noindex</th>
                <th className="px-3 py-2 font-medium">Merge</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5 text-white/75">
                  <td className="max-w-[320px] truncate px-3 py-2" title={`${r.url} — ${r.protection_reason}`}>{r.url}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.route_family}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                      r.protection_tier === "founder_locked" ? "bg-[#c9a449]/15 text-[#c9a449]"
                        : r.protection_tier === "protected" ? "bg-[#5eead4]/15 text-[#5eead4]"
                        : "bg-white/10 text-white/60"
                    }`}>
                      {PROTECTION_TIER_LABELS[r.protection_tier]}
                    </span>
                  </td>
                  <td className="px-3 py-2">{r.clicks_90d}</td>
                  <td className="px-3 py-2">{r.impressions_90d}</td>
                  <td className="px-3 py-2">{r.average_position ? Number(r.average_position).toFixed(1) : "—"}</td>
                  <Override row={r} field="allow_slug_change" onToggle={toggle} />
                  <Override row={r} field="allow_noindex" onToggle={toggle} />
                  <Override row={r} field="allow_merge" onToggle={toggle} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

function Override({
  row,
  field,
  onToggle,
}: {
  row: ProtectedUrl;
  field: "allow_slug_change" | "allow_noindex" | "allow_merge";
  onToggle: (row: ProtectedUrl, field: "allow_slug_change" | "allow_noindex" | "allow_merge") => void;
}) {
  const locked = row.protection_tier === "founder_locked";
  return (
    <td className="px-3 py-2">
      <button
        disabled={locked}
        onClick={() => onToggle(row, field)}
        className={`rounded-full border px-2 py-0.5 text-[10px] ${
          locked
            ? "cursor-not-allowed border-white/10 text-white/30"
            : row[field]
              ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
              : "border-white/15 text-white/50 hover:border-white/35"
        }`}
      >
        {locked ? "locked" : row[field] ? "allowed" : "blocked"}
      </button>
    </td>
  );
}
