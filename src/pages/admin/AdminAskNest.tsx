/**
 * Admin-only: Ask Nest private inbox and response workflow.
 *
 * This is the operational surface behind the "we typically respond within one
 * business day" promise: unread indicator, status, owner, outcome, and the
 * created / reviewed / resolved / closed timestamps, plus an overdue flag.
 *
 * Contact details and message text live only here and in the private table.
 * They are never written to engagement analytics.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Phone, AlertTriangle, Inbox } from "lucide-react";

type Request = {
  id: string;
  request_type: string;
  business_slug: string | null;
  town_slug: string | null;
  message: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  self_reported_discovery: string | null;
  technical_source_family: string | null;
  first_touch_source: string | null;
  first_touch_evidence: string | null;
  status: string;
  outcome: string | null;
  outcome_note: string | null;
  assigned_to: string | null;
  created_at: string;
  read_at: string | null;
  reviewed_at: string | null;
  resolved_at: string | null;
  closed_at: string | null;
  due_at: string;
};

const STATUSES = ["new", "in_review", "awaiting_business", "resolved", "closed", "spam"] as const;
const OUTCOMES = [
  "confirmed",
  "could_not_confirm",
  "corrected",
  "referred_to_business",
  "no_response_needed",
  "spam",
] as const;

const fmt = (v: string | null) => (v ? new Date(v).toLocaleString() : "—");

export default function AdminAskNest() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Request[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("ask_nest_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    setRows((data ?? []) as unknown as Request[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const unread = useMemo(() => rows.filter((r) => !r.read_at).length, [rows]);
  const overdue = useMemo(
    () =>
      rows.filter(
        (r) => !["resolved", "closed", "spam"].includes(r.status) && new Date(r.due_at) < new Date(),
      ).length,
    [rows],
  );

  const patch = async (id: string, changes: Partial<Request>) => {
    setSaving(id);
    const { data: userRes } = await supabase.auth.getUser();
    const payload: Record<string, unknown> = { ...changes };
    if (changes.status === "in_review") payload.reviewed_at = new Date().toISOString();
    if (changes.status === "resolved") payload.resolved_at = new Date().toISOString();
    if (changes.status === "closed" || changes.status === "spam")
      payload.closed_at = new Date().toISOString();
    if (changes.status && !changes.assigned_to) payload.assigned_to = userRes.user?.id ?? null;
    await supabase.from("ask_nest_requests").update(payload).eq("id", id);
    setSaving(null);
    void load();
  };

  const markRead = (r: Request) => {
    if (r.read_at) return;
    void patch(r.id, { read_at: new Date().toISOString() } as Partial<Request>);
  };

  return (
    <AdminLayout title="Ask Nest inbox" description="Private concierge queue — admin only.">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#5eead4]">Concierge operations</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">Ask Nest inbox</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
          Every request is answered by a person within one business day. Contact details and message text
          are stored only in this private queue and are erased 180 days after a request is closed.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat icon={<Inbox className="h-4 w-4" />} label="Unread" value={unread} tone={unread ? "alert" : "calm"} />
          <Stat
            icon={<AlertTriangle className="h-4 w-4" />}
            label="Overdue (past 1 business day)"
            value={overdue}
            tone={overdue ? "alert" : "calm"}
          />
          <Stat icon={<Mail className="h-4 w-4" />} label="Total requests" value={rows.length} tone="calm" />
        </div>

        {loading ? (
          <div className="mt-10 flex items-center gap-2 text-white/60">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading queue…
          </div>
        ) : rows.length === 0 ? (
          <p className="mt-10 rounded-xl border border-[#2D3748] bg-[#1E2230] p-6 text-sm text-white/60">
            No requests yet. The queue fills once Ask Nest is activated on a public page.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {rows.map((r) => {
              const isOverdue =
                !["resolved", "closed", "spam"].includes(r.status) && new Date(r.due_at) < new Date();
              return (
                <div
                  key={r.id}
                  onMouseEnter={() => markRead(r)}
                  className={`rounded-xl border p-5 ${
                    r.read_at ? "border-[#2D3748] bg-[#1E2230]" : "border-[#5eead4]/40 bg-[#5eead4]/5"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em]">
                    {!r.read_at && <span className="rounded-full bg-[#5eead4] px-2 py-0.5 text-black">Unread</span>}
                    {isOverdue && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-300">Overdue</span>
                    )}
                    <span className="text-white/45">{r.request_type.replace(/_/g, " ")}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/45">{r.business_slug ?? r.town_slug ?? "general"}</span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm text-white">{r.message ?? "(purged)"}</p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/60">
                    <span>{r.contact_name ?? "Anonymous"}</span>
                    {r.contact_email && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {r.contact_email}
                      </span>
                    )}
                    {r.contact_phone && (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {r.contact_phone}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid gap-1 text-[11px] text-white/40 sm:grid-cols-2">
                    <span>Created {fmt(r.created_at)} · Due {fmt(r.due_at)}</span>
                    <span>
                      Reviewed {fmt(r.reviewed_at)} · Resolved {fmt(r.resolved_at)} · Closed {fmt(r.closed_at)}
                    </span>
                    <span>
                      Technical source: {r.technical_source_family ?? "—"} · First touch:{" "}
                      {r.first_touch_source ?? "—"} ({r.first_touch_evidence ?? "unavailable"})
                    </span>
                    <span>Self-reported: {r.self_reported_discovery ?? "not stated"}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <select
                      value={r.status}
                      disabled={saving === r.id}
                      onChange={(e) => patch(r.id, { status: e.target.value } as Partial<Request>)}
                      className="rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-xs text-white"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                    <select
                      value={r.outcome ?? ""}
                      disabled={saving === r.id}
                      onChange={(e) =>
                        patch(r.id, { outcome: e.target.value || null } as Partial<Request>)
                      }
                      className="rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-xs text-white"
                    >
                      <option value="">Outcome — not set</option>
                      {OUTCOMES.map((o) => (
                        <option key={o} value={o}>
                          {o.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                    {!r.read_at && (
                      <button
                        onClick={() => markRead(r)}
                        className="text-xs font-medium text-[#5eead4] underline"
                      >
                        Mark read
                      </button>
                    )}
                    {saving === r.id && <Loader2 className="h-4 w-4 animate-spin text-white/50" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "alert" | "calm";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "alert" ? "border-[#5eead4]/40 bg-[#5eead4]/5" : "border-[#2D3748] bg-[#1E2230]"
      }`}
    >
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/45">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
