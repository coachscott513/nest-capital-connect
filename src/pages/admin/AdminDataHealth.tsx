import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { NEUTRALITY_PRINCIPLES, ELIGIBILITY_LABELS, type EligibilityState } from "@/lib/constants/policy";

type Summary = {
  total_records: number;
  registry_only: number;
  verified_basic: number;
  claimed_enriched: number;
  editorial_featured: number;
  quarantined: number;
  suppressed: number;
  missing_phone: number;
  missing_website: number;
  missing_address: number;
  missing_description: number;
  missing_hours: number;
  missing_image: number;
  schenectady_concentration: number;
  with_provenance: number;
};

const PREVIEWS = [
  { key: "v_preview_poi_candidates", label: "Not-a-business candidates", desc: "ATMs, kiosks, carrier counters and in-store service points imported as standalone businesses." },
  { key: "v_preview_town_mismatch", label: "Town / city conflicts", desc: "Records whose stored city disagrees with the town slug they are published under." },
  { key: "v_preview_duplicates", label: "Duplicate clusters", desc: "Same name + phone, same address, or same website domain." },
  { key: "v_preview_category_conflicts", label: "Category conflicts", desc: "Business name signals a trade that the stored category contradicts." },
] as const;

export default function AdminDataHealth() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [active, setActive] = useState<string>(PREVIEWS[0].key);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from("v_data_health_summary").select("*").maybeSingle();
      if (error) setError(error.message);
      setSummary((data as Summary) ?? null);

      const next: Record<string, number> = {};
      for (const p of PREVIEWS) {
        const { count } = await supabase.from(p.key).select("*", { count: "exact", head: true });
        next[p.key] = count ?? 0;
      }
      setCounts(next);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setRowsLoading(true);
      const { data, error } = await supabase.from(active).select("*").limit(100);
      if (error) setError(error.message);
      setRows((data as Record<string, unknown>[]) ?? []);
      setRowsLoading(false);
    })();
  }, [active]);

  const columns = rows.length > 0 ? Object.keys(rows[0]).filter((c) => c !== "id") : [];

  return (
    <AdminLayout title="Data Health" description="Inventory integrity, provenance coverage and staged cleanup previews.">
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#5eead4]" />
        <p className="text-sm text-white/75">
          Everything below is <strong className="text-white">read-only</strong>. No record on this page has been
          edited, merged, deindexed or deleted. These are proposals waiting for your review.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertTriangle className="h-4 w-4" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-white/60"><Loader2 className="h-4 w-4 animate-spin" /> Loading inventory…</div>
      ) : summary ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Total records" value={summary.total_records} />
            <Stat label="With provenance" value={summary.with_provenance} sub={`${pct(summary.with_provenance, summary.total_records)} of inventory`} />
            <Stat label="Quarantined" value={summary.quarantined} />
            <Stat label="Schenectady bucket" value={summary.schenectady_concentration} sub={`${pct(summary.schenectady_concentration, summary.total_records)} of inventory`} />
          </section>

          <h2 className="mt-10 mb-3 text-sm uppercase tracking-[0.14em] text-white/45">Eligibility mix</h2>
          <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {(Object.keys(ELIGIBILITY_LABELS) as EligibilityState[]).map((k) => (
              <Stat key={k} label={ELIGIBILITY_LABELS[k]} value={(summary as unknown as Record<string, number>)[k] ?? 0} />
            ))}
          </section>

          <h2 className="mt-10 mb-3 text-sm uppercase tracking-[0.14em] text-white/45">Completeness gaps</h2>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Stat label="Missing phone" value={summary.missing_phone} />
            <Stat label="Missing website" value={summary.missing_website} />
            <Stat label="Missing address" value={summary.missing_address} />
            <Stat label="Missing description" value={summary.missing_description} />
            <Stat label="Missing hours" value={summary.missing_hours} />
            <Stat label="Missing image" value={summary.missing_image} />
          </section>
        </>
      ) : (
        <p className="text-sm text-white/60">No summary available.</p>
      )}

      <h2 className="mt-12 mb-3 text-sm uppercase tracking-[0.14em] text-white/45">Staged cleanup previews</h2>
      <div className="flex flex-wrap gap-2">
        {PREVIEWS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className={`rounded-full border px-4 py-2 text-xs transition-colors ${
              active === p.key
                ? "border-[#5eead4] bg-[#5eead4]/10 text-[#5eead4]"
                : "border-white/15 text-white/60 hover:border-white/35"
            }`}
          >
            {p.label} · {counts[p.key] ?? 0}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-white/55">{PREVIEWS.find((p) => p.key === active)?.desc}</p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-[#2D3748]">
        {rowsLoading ? (
          <div className="flex items-center gap-2 p-6 text-white/60"><Loader2 className="h-4 w-4 animate-spin" /> Loading preview…</div>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-white/55">Nothing flagged in this preview.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-white/50">
              <tr>{columns.map((c) => <th key={c} className="whitespace-nowrap px-3 py-2 font-medium">{c}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-white/5 text-white/75">
                  {columns.map((c) => (
                    <td key={c} className="max-w-[260px] truncate px-3 py-2">{fmt(r[c])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-2 text-[11px] text-white/40">Showing up to 100 rows per preview.</p>

      <h2 className="mt-12 mb-3 text-sm uppercase tracking-[0.14em] text-white/45">Neutrality principles</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {NEUTRALITY_PRINCIPLES.map((p) => (
          <div key={p.id} className="rounded-xl border border-[#2D3748] bg-[#1E2230] p-4">
            <p className="text-sm font-semibold text-white">{p.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/60">{p.body}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

function pct(n: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((n / total) * 100)}%`;
}

function fmt(v: unknown) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "yes" : "no";
  return String(v);
}

function Stat({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-xl border border-[#2D3748] bg-[#1E2230] p-4">
      <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
      {sub && <p className="mt-1 text-[11px] text-white/40">{sub}</p>}
    </div>
  );
}
