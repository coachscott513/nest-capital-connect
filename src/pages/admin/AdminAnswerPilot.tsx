/**
 * Admin-only: AI answerability + concierge conversion pilot.
 *
 * Read-only except for opening a preview. Nothing here publishes, re-slugs,
 * merges, redirects or noindexes anything.
 */
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, EyeOff, Bot, MessageSquare } from "lucide-react";
import BusinessAnswerPage, { type AnswerPageBusiness } from "@/components/preview/BusinessAnswerPage";

const READINESS_ORDER = [
  "identity_only",
  "contact_ready",
  "service_ready",
  "owner_confirmed",
  "editorially_enriched",
  "blocked_by_conflict",
] as const;

const READINESS_LABELS: Record<string, string> = {
  identity_only: "Identity only",
  contact_ready: "Contact ready",
  service_ready: "Service ready",
  owner_confirmed: "Owner confirmed",
  editorially_enriched: "Editorially enriched",
  blocked_by_conflict: "Blocked by conflict",
};

const BUCKET_LABELS: Record<string, string> = {
  top_clicks: "Top clicks",
  impressions_weak_ctr: "Impressions, weak CTR",
  strategic_category: "Strategic category",
  fail_closed_example: "Fail-closed example",
};

type CohortRow = {
  id: string;
  url: string;
  business_slug: string | null;
  selection_bucket: string;
  selection_reason: string | null;
  clicks_90d: number | null;
  impressions_90d: number | null;
  ctr: number | null;
  protection_tier: string | null;
};

export default function AdminAnswerPilot() {
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState<CohortRow[]>([]);
  const [readiness, setReadiness] = useState<Record<string, number>>({});
  const [askCounts, setAskCounts] = useState<{ total: number; byType: Record<string, number>; bySelfReport: Record<string, number> }>({
    total: 0,
    byType: {},
    bySelfReport: {},
  });
  const [aiEvents, setAiEvents] = useState<{ total: number; ai: number; askOpen: number; askSubmit: number }>({
    total: 0,
    ai: 0,
    askOpen: 0,
    askSubmit: 0,
  });
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [preview, setPreview] = useState<AnswerPageBusiness | null>(null);

  useEffect(() => {
    (async () => {
      const [cohortRes, readinessRes, askRes, evRes] = await Promise.all([
        supabase
          .from("answerability_pilot_cohort")
          .select("id,url,business_slug,selection_bucket,selection_reason,clicks_90d,impressions_90d,ctr,protection_tier")
          .order("clicks_90d", { ascending: false }),
        supabase.from("v_business_answerability_readiness").select("readiness_state").limit(10000),
        supabase.from("ask_nest_requests").select("request_type,self_reported_discovery").limit(2000),
        supabase.from("engagement_events").select("event_type,traffic_source").limit(10000),
      ]);

      setCohort((cohortRes.data ?? []) as CohortRow[]);

      const rMix: Record<string, number> = {};
      for (const r of (readinessRes.data ?? []) as { readiness_state: string }[]) {
        rMix[r.readiness_state] = (rMix[r.readiness_state] ?? 0) + 1;
      }
      setReadiness(rMix);

      const byType: Record<string, number> = {};
      const bySelf: Record<string, number> = {};
      for (const a of (askRes.data ?? []) as { request_type: string; self_reported_discovery: string | null }[]) {
        byType[a.request_type] = (byType[a.request_type] ?? 0) + 1;
        const k = a.self_reported_discovery ?? "not_stated";
        bySelf[k] = (bySelf[k] ?? 0) + 1;
      }
      setAskCounts({ total: (askRes.data ?? []).length, byType, bySelfReport: bySelf });

      const events = (evRes.data ?? []) as { event_type: string; traffic_source: string | null }[];
      setAiEvents({
        total: events.length,
        ai: events.filter((e) => e.traffic_source === "ai_assistant").length,
        askOpen: events.filter((e) => e.event_type === "ask_nest_open").length,
        askSubmit: events.filter((e) => e.event_type === "ask_nest_submit").length,
      });

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!previewSlug) {
      setPreview(null);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("businesses")
        .select(
          "id,slug,name,category,subcategory,town_name,town_slug,county,state,address,phone,website,hours,description,long_description,eligibility_state,record_status,last_verified_at",
        )
        .eq("slug", previewSlug)
        .maybeSingle();
      if (!data) {
        setPreview(null);
        return;
      }
      const { data: readinessRow } = await supabase
        .from("v_business_answerability_readiness")
        .select("readiness_state")
        .eq("business_id", data.id)
        .maybeSingle();
      setPreview({
        ...(data as AnswerPageBusiness),
        readiness_state: readinessRow?.readiness_state ?? null,
      });
    })();
  }, [previewSlug]);

  const readinessTotal = useMemo(
    () => Object.values(readiness).reduce((a, b) => a + b, 0),
    [readiness],
  );

  return (
    <AdminLayout
      title="AI Answerability Pilot"
      description="20-page pilot cohort, readiness contract, and concierge conversion. Preview only."
    >
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
        <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <p className="text-sm leading-relaxed text-white/75">
          Nothing on this screen is published. No slug, canonical, redirect, merge or index setting is changed by
          the pilot. We cannot promise placement, citation or ranking in ChatGPT or any AI assistant, and nothing
          here should be sold as if we could.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Loader2 className="h-4 w-4 animate-spin" /> Reading current state…
        </div>
      ) : (
        <div className="space-y-10">
          {/* Readiness contract */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Answerability readiness — derived from evidence already on file
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {READINESS_ORDER.map((k) => (
                <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/40">{READINESS_LABELS[k]}</p>
                  <p className="mt-1 text-2xl font-semibold text-white tabular-nums">
                    {(readiness[k] ?? 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/40">
              {readinessTotal.toLocaleString()} records classified. This is a state, not a score — no number is
              invented, and readiness never affects ranking.
            </p>
          </section>

          {/* Conversion */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Concierge and assistant demand
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat icon={Bot} label="AI-assistant referred events" value={aiEvents.ai} />
              <Stat icon={MessageSquare} label="Ask Nest opened" value={aiEvents.askOpen} />
              <Stat icon={MessageSquare} label="Ask Nest submitted" value={aiEvents.askSubmit} />
              <Stat icon={MessageSquare} label="Requests stored (private)" value={askCounts.total} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Panel title="Request types" data={askCounts.byType} empty="No requests yet." />
              <Panel
                title="How visitors say they found us"
                data={askCounts.bySelfReport}
                empty="No self-reports yet."
                note="Self-reported only. Never merged into measured traffic source."
              />
            </div>
          </section>

          {/* Cohort */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Pilot cohort — {cohort.length} pages
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-white/[0.03] text-left text-[11px] uppercase tracking-wide text-white/40">
                  <tr>
                    <th className="p-3">Page</th>
                    <th className="p-3">Why chosen</th>
                    <th className="p-3 text-right">Clicks</th>
                    <th className="p-3 text-right">Impr.</th>
                    <th className="p-3 text-right">CTR</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody>
                  {cohort.map((r) => (
                    <tr key={r.id} className="border-t border-white/5">
                      <td className="p-3 text-white/85">{r.business_slug}</td>
                      <td className="p-3 text-white/55">
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px]">
                          {BUCKET_LABELS[r.selection_bucket] ?? r.selection_bucket}
                        </span>
                        <span className="ml-2 text-xs">{r.selection_reason}</span>
                      </td>
                      <td className="p-3 text-right tabular-nums text-white/75">{r.clicks_90d ?? 0}</td>
                      <td className="p-3 text-right tabular-nums text-white/75">{r.impressions_90d ?? 0}</td>
                      <td className="p-3 text-right tabular-nums text-white/55">
                        {r.ctr != null ? `${(r.ctr * 100).toFixed(1)}%` : "—"}
                      </td>
                      <td className="p-3 text-white/55">{r.protection_tier}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setPreviewSlug(r.business_slug)}
                          className="text-[#5eead4] underline"
                        >
                          Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Preview */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Answer page preview {previewSlug ? `— ${previewSlug}` : ""}
            </h2>
            {preview ? (
              <BusinessAnswerPage business={preview} />
            ) : (
              <p className="text-sm text-white/50">Choose a page above to render the proposed answer template.</p>
            )}
          </section>
        </div>
      )}
    </AdminLayout>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Bot; label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/40">
        <Icon className="h-3.5 w-3.5 text-teal-300" /> {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-white tabular-nums">{value.toLocaleString()}</p>
    </div>
  );
}

function Panel({
  title,
  data,
  empty,
  note,
}: {
  title: string;
  data: Record<string, number>;
  empty: string;
  note?: string;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {note && <p className="mt-1 text-xs text-white/40">{note}</p>}
      <div className="mt-3 space-y-2">
        {entries.length === 0 && <p className="text-xs text-white/40">{empty}</p>}
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-sm">
            <span className="text-white/65">{k.replace(/_/g, " ")}</span>
            <span className="font-semibold text-white tabular-nums">{v.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
