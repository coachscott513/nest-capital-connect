import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";

type Listing = {
  id: string;
  mls_number: string | null;
  full_address: string | null;
  city: string | null;
  town_slug: string | null;
  list_price: number | null;
  property_type: string | null;
  status: string | null;
  claim_status: string | null;
  public_listing_url: string | null;
  public_listing_url_approved: boolean | null;
  is_featured: boolean | null;
  is_indexable: boolean | null;
  listing_agent_name_internal: string | null;
  listing_agent_email_internal: string | null;
  listing_brokerage_internal: string | null;
};

export default function AdminPropertyListings() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [town, setTown] = useState("");
  const [claimFilter, setClaimFilter] = useState("");

  async function load() {
    setLoading(true);
    let query = supabase.from("listings").select("*").limit(500).order("updated_at", { ascending: false });
    const { data, error } = await query;
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setRows((data ?? []) as Listing[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const towns = useMemo(() => Array.from(new Set(rows.map((r) => r.town_slug).filter(Boolean))) as string[], [rows]);
  const filtered = useMemo(() => rows.filter((r) => {
    if (q && !`${r.full_address ?? ""} ${r.mls_number ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (town && r.town_slug !== town) return false;
    if (claimFilter && r.claim_status !== claimFilter) return false;
    return true;
  }), [rows, q, town, claimFilter]);

  async function patch(id: string, body: Partial<Listing>) {
    const { error } = await supabase.from("listings").update(body).eq("id", id);
    if (error) return toast({ variant: "destructive", title: "Update failed", description: error.message });
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...body } : r)));
  }

  return (
    <AdminLayout title="Property Listings" description="Internal listing manager. Internal agent contact remains admin-only.">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-white/45" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search address or MLS"
            className="bg-[#0B0F19] border border-white/10 rounded pl-8 pr-3 py-1.5 text-sm text-white w-64" />
        </div>
        <select value={town} onChange={(e) => setTown(e.target.value)} className="bg-[#0B0F19] border border-white/10 rounded px-2 py-1.5 text-sm text-white">
          <option value="">All towns</option>
          {towns.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={claimFilter} onChange={(e) => setClaimFilter(e.target.value)} className="bg-[#0B0F19] border border-white/10 rounded px-2 py-1.5 text-sm text-white">
          <option value="">All claim states</option>
          <option value="unclaimed">unclaimed</option>
          <option value="pending">pending</option>
          <option value="claimed">claimed</option>
        </select>
        <span className="text-xs text-white/45 ml-auto self-center">{filtered.length} / {rows.length}</span>
      </div>

      {loading ? <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" /> : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr><Th>Address</Th><Th>Town</Th><Th>Price</Th><Th>Type</Th><Th>Claim</Th><Th>Public URL</Th><Th>Approved</Th><Th>Featured</Th><Th>Indexable</Th><Th>Internal Agent</Th></tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5 align-top">
                  <Td><div className="text-white text-xs">{r.full_address ?? "—"}</div>{r.mls_number && <div className="text-[10px] text-white/45">#{r.mls_number}</div>}</Td>
                  <Td className="text-xs">{r.town_slug ?? r.city ?? "—"}</Td>
                  <Td className="text-xs">{r.list_price ? `$${Number(r.list_price).toLocaleString()}` : "—"}</Td>
                  <Td className="text-xs">{r.property_type ?? "—"}</Td>
                  <Td className="text-xs capitalize">{r.claim_status ?? "—"}</Td>
                  <Td>
                    <UrlEdit value={r.public_listing_url ?? ""} onSave={(v) => patch(r.id, { public_listing_url: v })} />
                  </Td>
                  <Td><input type="checkbox" checked={!!r.public_listing_url_approved} onChange={(e) => patch(r.id, { public_listing_url_approved: e.target.checked })} className="accent-[#5eead4]" /></Td>
                  <Td><input type="checkbox" checked={!!r.is_featured} onChange={(e) => patch(r.id, { is_featured: e.target.checked })} className="accent-[#5eead4]" /></Td>
                  <Td><input type="checkbox" checked={!!r.is_indexable} onChange={(e) => patch(r.id, { is_indexable: e.target.checked })} className="accent-[#5eead4]" /></Td>
                  <Td className="text-[11px] text-white/55 max-w-[180px]">
                    {r.listing_agent_name_internal ?? "—"}<br />
                    {r.listing_brokerage_internal && <span className="text-white/40">{r.listing_brokerage_internal}</span>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

function UrlEdit({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <input value={v} placeholder="https://" onChange={(e) => setV(e.target.value)} onBlur={() => v !== value && onSave(v)}
      className="w-48 bg-[#0B0F19] border border-white/10 rounded px-2 py-1 text-white text-xs" />
  );
}
function Th({ children }: { children?: React.ReactNode }) { return <th className="text-left px-3 py-2 font-medium">{children}</th>; }
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) { return <td className={`px-3 py-3 text-white/85 ${className}`}>{children}</td>; }
