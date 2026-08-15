import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Database, TrendingUp, Bot } from "lucide-react";

/**
 * Nest Mission Control — supply quality (what we hold) is deliberately
 * separated from consumer demand (what people actually ask for).
 * Read-only. No corrections, merges or publishing happen from this screen.
 */

type Tally = Record<string, number>;

function tally(rows: { k: string | null }[]): Tally {
  return rows.reduce<Tally>((acc, r) => {
    const key = r.k ?? "unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function Card({
  icon: Icon,
  title,
  subtitle,
  data,
  empty,
}: {
  icon: typeof Database;
  title: string;
  subtitle: string;
  data: Tally;
  empty: string;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal-300" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <p className="mt-1 text-xs text-white/45">{subtitle}</p>
      <div className="mt-4 space-y-2">
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

export default function AdminMissionControl() {
  const [loading, setLoading] = useState(true);
  const [supplyEligibility, setSupplyEligibility] = useState<Tally>({});
  const [supplyVerification, setSupplyVerification] = useState<Tally>({});
  const [seoCohort, setSeoCohort] = useState<Tally>({});
  const [demandSource, setDemandSource] = useState<Tally>({});
  const [demandEvents, setDemandEvents] = useState<Tally>({});
  const [totals, setTotals] = useState({ businesses: 0, protectedUrls: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: businesses }, { count: protectedUrls }] = await Promise.all([
        supabase.from("businesses").select("id", { count: "exact", head: true }),
        supabase.from("seo_protected_urls").select("id", { count: "exact", head: true }),
      ]);
      setTotals({ businesses: businesses ?? 0, protectedUrls: protectedUrls ?? 0 });

      const pageAll = async <T,>(
        table: "businesses" | "seo_protected_urls" | "engagement_events",
        column: string,
        filter?: (q: ReturnType<typeof supabase.from>) => unknown,
      ): Promise<{ k: string | null }[]> => {
        const out: { k: string | null }[] = [];
        for (let from = 0; from < 20000; from += 1000) {
          let q = supabase.from(table).select(column).range(from, from + 999);
          if (filter) q = filter(q as never) as typeof q;
          const { data } = await q;
          const rows = (data ?? []) as unknown as Record<string, string | null>[];
          out.push(...rows.map((r) => ({ k: r[column] ?? null })));
          if (rows.length < 1000) break;
        }
        return out as { k: string | null }[];
      };

      const [elig, verif, cohort, evtSource, evtType] = await Promise.all([
        pageAll("businesses", "eligibility_state"),
        pageAll("businesses", "verification_status"),
        pageAll("seo_protected_urls", "protection_tier"),
        pageAll("engagement_events", "traffic_source"),
        pageAll("engagement_events", "event_type"),
      ]);

      setSupplyEligibility(tally(elig));
      setSupplyVerification(tally(verif));
      setSeoCohort(tally(cohort));
      setDemandSource(tally(evtSource));
      setDemandEvents(tally(evtType));
      setLoading(false);
    })();
  }, []);

  return (
    <AdminLayout
      title="Nest Mission Control"
      description="Supply quality and consumer demand, held apart on purpose. Read-only."
    >
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Loader2 className="h-4 w-4 animate-spin" /> Reading current state…
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wide text-white/40">Business records held</p>
              <p className="mt-1 text-3xl font-semibold text-white tabular-nums">
                {totals.businesses.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wide text-white/40">URLs in the SEO protection manifest</p>
              <p className="mt-1 text-3xl font-semibold text-white tabular-nums">
                {totals.protectedUrls.toLocaleString()}
              </p>
            </div>
          </div>

          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Supply quality — what we actually hold
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card
                icon={Database}
                title="Eligibility state"
                subtitle="Whether a record may surface in discovery."
                data={supplyEligibility}
                empty="No eligibility states recorded."
              />
              <Card
                icon={ShieldCheck}
                title="Verification status"
                subtitle="How strongly the facts on a record are backed."
                data={supplyVerification}
                empty="No verification states recorded."
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Earned search value — separate from eligibility
            </h2>
            <Card
              icon={TrendingUp}
              title="SEO protection tiers"
              subtitle="Derived from Search Console performance, never from data quality."
              data={seoCohort}
              empty="Manifest is empty — run a Search Console sync."
            />
          </section>

          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Consumer demand — what people do here
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card
                icon={Bot}
                title="Traffic source"
                subtitle="Includes AI assistant referrals, classified from host only."
                data={demandSource}
                empty="No engagement events yet."
              />
              <Card
                icon={TrendingUp}
                title="Event types"
                subtitle="Deduplicated, bot-filtered consumer actions."
                data={demandEvents}
                empty="No engagement events yet."
              />
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
