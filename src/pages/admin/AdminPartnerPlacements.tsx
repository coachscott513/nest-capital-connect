import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";
import { Drawer } from "./AdminPartners";

type Placement = {
  id: string;
  partner_id: string;
  town_id: string | null;
  town_slug: string | null;
  category: string | null;
  placement_type: string;
  tier: string | null;
  monthly_price: number | null;
  founding_rate_locked: boolean | null;
  start_date: string | null;
  renewal_date: string | null;
  status: string;
  badge_text: string | null;
  featured_position: number | null;
  notes: string | null;
};

const PLACEMENT_TYPES = ["free_profile","featured_card","town_partner","core_market_package","category_sponsor","service_spotlight"];
const STATUSES = ["pending","active","paused","cancelled","expired"];

export default function AdminPartnerPlacements() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Placement[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [towns, setTowns] = useState<{ id: string; town_slug: string; town_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Placement> | null>(null);

  async function load() {
    setLoading(true);
    const [p, pa, t] = await Promise.all([
      supabase.from("partner_placements").select("*").order("created_at", { ascending: false }),
      supabase.from("partners").select("id,name").order("name"),
      supabase.from("towns").select("id,town_slug,town_name").order("town_name"),
    ]);
    if (p.error) toast({ variant: "destructive", title: "Load failed", description: p.error.message });
    setRows((p.data ?? []) as Placement[]);
    setPartners((pa.data ?? []) as any);
    setTowns((t.data ?? []) as any);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    if (!editing.partner_id) return toast({ variant: "destructive", title: "Partner required" });
    const payload: any = { ...editing, monthly_price: Number(editing.monthly_price) || 0 };
    const { error } = editing.id
      ? await supabase.from("partner_placements").update(payload).eq("id", editing.id)
      : await supabase.from("partner_placements").insert(payload);
    if (error) return toast({ variant: "destructive", title: "Save failed", description: error.message });
    setEditing(null);
    load();
  }

  const partnerName = (id: string) => partners.find((p) => p.id === id)?.name ?? "—";
  const townName = (slug: string | null) => towns.find((t) => t.town_slug === slug)?.town_name ?? slug ?? "—";

  return (
    <AdminLayout title="Partner Placements" description="Town and category placements. Only active ones appear publicly.">
      <div className="flex justify-end mb-4">
        <button onClick={() => setEditing({ status: "pending", placement_type: "free_profile", monthly_price: 0 })}
          className="inline-flex items-center gap-1 rounded-md bg-[#5eead4] text-[#0B0F19] px-3 py-1.5 text-sm font-medium">
          <Plus className="w-4 h-4" /> New Placement
        </button>
      </div>

      {loading ? <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" /> : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr><Th>Partner</Th><Th>Town</Th><Th>Category</Th><Th>Type</Th><Th>Tier</Th><Th>Monthly $</Th><Th>Status</Th><Th>Start</Th><Th>Renewal</Th><Th></Th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <Td>{partnerName(r.partner_id)}</Td>
                  <Td>{townName(r.town_slug)}</Td>
                  <Td>{r.category ?? "—"}</Td>
                  <Td className="text-xs">{r.placement_type.replace(/_/g, " ")}</Td>
                  <Td>{r.tier ?? "—"}</Td>
                  <Td>${Number(r.monthly_price) || 0}</Td>
                  <Td><Pill status={r.status} /></Td>
                  <Td className="text-xs">{r.start_date ?? "—"}</Td>
                  <Td className="text-xs">{r.renewal_date ?? "—"}</Td>
                  <Td><button onClick={() => setEditing(r)} className="text-[#5eead4] text-xs hover:underline">Edit</button></Td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={10} className="text-center py-8 text-white/45">No placements yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Drawer title={editing.id ? "Edit placement" : "New placement"} onClose={() => setEditing(null)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Partner *">
              <select className={fld} value={editing.partner_id ?? ""} onChange={(e) => setEditing({ ...editing, partner_id: e.target.value })}>
                <option value="">Select…</option>
                {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Town">
              <select className={fld} value={editing.town_slug ?? ""} onChange={(e) => {
                const t = towns.find((x) => x.town_slug === e.target.value);
                setEditing({ ...editing, town_slug: e.target.value, town_id: t?.id ?? null });
              }}>
                <option value="">—</option>
                {towns.map((t) => <option key={t.id} value={t.town_slug}>{t.town_name}</option>)}
              </select>
            </Field>
            <Field label="Category"><In v={editing.category} on={(v) => setEditing({ ...editing, category: v })} /></Field>
            <Field label="Placement type">
              <select className={fld} value={editing.placement_type} onChange={(e) => setEditing({ ...editing, placement_type: e.target.value })}>
                {PLACEMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Tier"><In v={editing.tier} on={(v) => setEditing({ ...editing, tier: v })} /></Field>
            <Field label="Monthly price"><input type="number" className={fld} value={editing.monthly_price ?? 0} onChange={(e) => setEditing({ ...editing, monthly_price: Number(e.target.value) })} /></Field>
            <Field label="Status">
              <select className={fld} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Founding rate locked">
              <input type="checkbox" checked={!!editing.founding_rate_locked} onChange={(e) => setEditing({ ...editing, founding_rate_locked: e.target.checked })} className="accent-[#5eead4] mt-2" />
            </Field>
            <Field label="Start date"><input type="date" className={fld} value={editing.start_date ?? ""} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} /></Field>
            <Field label="Renewal date"><input type="date" className={fld} value={editing.renewal_date ?? ""} onChange={(e) => setEditing({ ...editing, renewal_date: e.target.value })} /></Field>
            <Field label="Badge text"><In v={editing.badge_text} on={(v) => setEditing({ ...editing, badge_text: v })} /></Field>
            <Field label="Featured position"><input type="number" className={fld} value={editing.featured_position ?? ""} onChange={(e) => setEditing({ ...editing, featured_position: e.target.value ? Number(e.target.value) : null })} /></Field>
            <div className="sm:col-span-2"><Field label="Notes"><textarea className={fld} rows={3} value={editing.notes ?? ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></Field></div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-white/70 hover:text-white">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded bg-[#5eead4] text-[#0B0F19] font-medium">Save</button>
          </div>
        </Drawer>
      )}
    </AdminLayout>
  );
}

const fld = "w-full bg-[#0B0F19] border border-white/10 rounded px-2 py-1.5 text-white text-sm focus:border-[#5eead4]/60 outline-none";
function In({ v, on }: { v: any; on: (s: string) => void }) { return <input value={v ?? ""} onChange={(e) => on(e.target.value)} className={fld} />; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="text-xs text-white/65 mb-1 block">{label}</span>{children}</label>; }
function Th({ children }: { children?: React.ReactNode }) { return <th className="text-left px-3 py-2 font-medium">{children}</th>; }
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) { return <td className={`px-3 py-3 text-white/85 ${className}`}>{children}</td>; }
function Pill({ status }: { status: string }) {
  const c = status === "active" ? "bg-[#5eead4]/15 text-[#5eead4]" :
    status === "paused" || status === "cancelled" || status === "expired" ? "bg-white/10 text-white/60" :
    "bg-amber-400/10 text-amber-300";
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] capitalize ${c}`}>{status}</span>;
}
