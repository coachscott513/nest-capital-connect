import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, X } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  category: string;
  brokerage_or_company: string | null;
  license_or_title: string | null;
  profile_photo_url: string | null;
  logo_url: string | null;
  bio: string | null;
  towns_served: string[] | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_tiktok: string | null;
  social_youtube: string | null;
  preferred_cta_label: string | null;
  preferred_cta_url: string | null;
  preferred_contact_email: string | null;
  preferred_contact_phone: string | null;
  status: string;
};

const CATEGORIES = [
  "agent","brokerage","mortgage","insurance","attorney","contractor","inspector","property_management","appraiser","moving_storage","other"
];
const STATUSES = ["prospect","contacted","interested","active","paused","cancelled"];

const EMPTY: Partial<Partner> = {
  name: "", company: "", email: "", phone: "", website: "", category: "agent",
  status: "prospect", towns_served: [],
};

export default function AdminPartners() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Partner> | null>(null);
  const [placementsCount, setPlacementsCount] = useState<Record<string, { count: number; mrr: number }>>({});

  async function load() {
    setLoading(true);
    const [{ data: partners, error }, { data: placements }] = await Promise.all([
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("partner_placements").select("partner_id,monthly_price,status").eq("status", "active"),
    ]);
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setRows((partners ?? []) as Partner[]);
    const map: Record<string, { count: number; mrr: number }> = {};
    (placements ?? []).forEach((p: any) => {
      if (!map[p.partner_id]) map[p.partner_id] = { count: 0, mrr: 0 };
      map[p.partner_id].count += 1;
      map[p.partner_id].mrr += Number(p.monthly_price) || 0;
    });
    setPlacementsCount(map);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    const payload: any = { ...editing };
    if (typeof payload.towns_served === "string") {
      payload.towns_served = payload.towns_served
        .split(",").map((s: string) => s.trim()).filter(Boolean);
    }
    const { error } = editing.id
      ? await supabase.from("partners").update(payload).eq("id", editing.id)
      : await supabase.from("partners").insert(payload);
    if (error) return toast({ variant: "destructive", title: "Save failed", description: error.message });
    setEditing(null);
    load();
  }

  return (
    <AdminLayout title="Partners" description="CRM of all professionals — agents, mortgage, contractors, etc.">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="inline-flex items-center gap-1 rounded-md bg-[#5eead4] text-[#0B0F19] px-3 py-1.5 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> New Partner
        </button>
      </div>

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr><Th>Name</Th><Th>Company</Th><Th>Category</Th><Th>Towns</Th><Th>Status</Th><Th>Placements</Th><Th>MRR</Th><Th></Th></tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const stats = placementsCount[r.id] ?? { count: 0, mrr: 0 };
                return (
                  <tr key={r.id} className="border-t border-white/5">
                    <Td><div className="text-white font-medium">{r.name}</div><div className="text-xs text-white/55">{r.email}</div></Td>
                    <Td>{r.company ?? "—"}</Td>
                    <Td className="capitalize">{r.category.replace(/_/g, " ")}</Td>
                    <Td className="max-w-[180px] text-xs">{r.towns_served?.join(", ") || "—"}</Td>
                    <Td><Pill status={r.status} /></Td>
                    <Td>{stats.count}</Td>
                    <Td>${stats.mrr.toLocaleString()}</Td>
                    <Td><button onClick={() => setEditing(r)} className="text-[#5eead4] text-xs hover:underline">Edit</button></Td>
                  </tr>
                );
              })}
              {rows.length === 0 && <tr><td colSpan={8} className="text-center py-8 text-white/45">No partners yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Drawer title={editing.id ? "Edit partner" : "New partner"} onClose={() => setEditing(null)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Name *"><In v={editing.name} on={(v) => setEditing({ ...editing, name: v })} /></Field>
            <Field label="Company"><In v={editing.company} on={(v) => setEditing({ ...editing, company: v })} /></Field>
            <Field label="Email"><In v={editing.email} on={(v) => setEditing({ ...editing, email: v })} /></Field>
            <Field label="Phone"><In v={editing.phone} on={(v) => setEditing({ ...editing, phone: v })} /></Field>
            <Field label="Category">
              <select className={fld} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select className={fld} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Website"><In v={editing.website} on={(v) => setEditing({ ...editing, website: v })} /></Field>
            <Field label="Brokerage / Company"><In v={editing.brokerage_or_company} on={(v) => setEditing({ ...editing, brokerage_or_company: v })} /></Field>
            <Field label="License / Title"><In v={editing.license_or_title} on={(v) => setEditing({ ...editing, license_or_title: v })} /></Field>
            <Field label="Photo URL"><In v={editing.profile_photo_url} on={(v) => setEditing({ ...editing, profile_photo_url: v })} /></Field>
            <Field label="Logo URL"><In v={editing.logo_url} on={(v) => setEditing({ ...editing, logo_url: v })} /></Field>
            <Field label="Preferred CTA label"><In v={editing.preferred_cta_label} on={(v) => setEditing({ ...editing, preferred_cta_label: v })} /></Field>
            <Field label="Preferred CTA URL"><In v={editing.preferred_cta_url} on={(v) => setEditing({ ...editing, preferred_cta_url: v })} /></Field>
            <Field label="Facebook"><In v={editing.social_facebook} on={(v) => setEditing({ ...editing, social_facebook: v })} /></Field>
            <Field label="Instagram"><In v={editing.social_instagram} on={(v) => setEditing({ ...editing, social_instagram: v })} /></Field>
            <Field label="LinkedIn"><In v={editing.social_linkedin} on={(v) => setEditing({ ...editing, social_linkedin: v })} /></Field>
            <Field label="YouTube"><In v={editing.social_youtube} on={(v) => setEditing({ ...editing, social_youtube: v })} /></Field>
            <div className="sm:col-span-2">
              <Field label="Towns served (comma-separated slugs)">
                <In
                  v={Array.isArray(editing.towns_served) ? editing.towns_served.join(", ") : (editing.towns_served as any) ?? ""}
                  on={(v) => setEditing({ ...editing, towns_served: v as any })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Bio">
                <textarea className={fld} rows={3} value={editing.bio ?? ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
              </Field>
            </div>
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
function In({ v, on }: { v: any; on: (s: string) => void }) {
  return <input value={v ?? ""} onChange={(e) => on(e.target.value)} className={fld} />;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs text-white/65 mb-1 block">{label}</span>{children}</label>;
}
function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 text-white/85 ${className}`}>{children}</td>;
}
function Pill({ status }: { status: string }) {
  const color =
    status === "active" ? "bg-[#5eead4]/15 text-[#5eead4]" :
    status === "paused" || status === "cancelled" ? "bg-white/10 text-white/60" :
    "bg-amber-400/10 text-amber-300";
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] capitalize ${color}`}>{status}</span>;
}
export function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1E2230] border border-white/10 rounded-t-2xl sm:rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/55 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
