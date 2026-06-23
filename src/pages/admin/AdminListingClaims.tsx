import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Claim = {
  id: string;
  mls_number: string | null;
  property_listing_id: string | null;
  property_address: string | null;
  town_slug: string | null;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  claimant_company: string | null;
  claimant_role: string | null;
  preferred_listing_url: string | null;
  requested_public_url: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "pending", "verifying", "approved", "rejected", "completed"];

export default function AdminListingClaims() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing_claims")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setRows((data ?? []) as Claim[]);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(c: Claim, status: string) {
    const { error } = await supabase.from("listing_claims").update({ status }).eq("id", c.id);
    if (error) return toast({ variant: "destructive", title: "Failed", description: error.message });
    setRows((p) => p.map((r) => (r.id === c.id ? { ...r, status } : r)));
  }

  async function approve(c: Claim) {
    const url = c.preferred_listing_url ?? c.requested_public_url;
    if (!url) return toast({ variant: "destructive", title: "Add a preferred URL first" });
    // Update listing if we have a reference
    if (c.mls_number) {
      await supabase
        .from("listings")
        .update({
          public_listing_url: url,
          public_listing_url_approved: true,
          needs_agent_public_url: false,
          claim_status: "claimed",
          status: "approved",
        })
        .eq("mls_number", c.mls_number);
    }
    await setStatus(c, "approved");
    toast({ title: "Claim approved", description: "Listing now points to the approved URL." });
  }

  async function setUrl(c: Claim, url: string) {
    const { error } = await supabase.from("listing_claims").update({ preferred_listing_url: url }).eq("id", c.id);
    if (error) return toast({ variant: "destructive", title: "Failed", description: error.message });
    setRows((p) => p.map((r) => (r.id === c.id ? { ...r, preferred_listing_url: url } : r)));
  }

  return (
    <AdminLayout title="Listing Claims" description="Approve agent claims and set the approved public listing URL.">
      {loading ? <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" /> : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr><Th>Property / MLS</Th><Th>Town</Th><Th>Claimant</Th><Th>Role</Th><Th>Contact</Th><Th>Preferred URL</Th><Th>Status</Th><Th>Date</Th><Th></Th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/5 align-top">
                  <Td>
                    <div className="text-white text-sm">{r.property_address ?? "—"}</div>
                    {r.mls_number && <div className="text-xs text-white/55">#{r.mls_number}</div>}
                  </Td>
                  <Td>{r.town_slug ?? "—"}</Td>
                  <Td>
                    <div className="text-white">{r.claimant_name}</div>
                    {r.claimant_company && <div className="text-xs text-white/55">{r.claimant_company}</div>}
                  </Td>
                  <Td className="text-xs">{r.claimant_role ?? "—"}</Td>
                  <Td className="text-xs">
                    <div>{r.claimant_email}</div>
                    <div className="text-white/55">{r.claimant_phone}</div>
                  </Td>
                  <Td>
                    <UrlInput
                      value={r.preferred_listing_url ?? r.requested_public_url ?? ""}
                      onSave={(v) => setUrl(r, v)}
                    />
                  </Td>
                  <Td>
                    <select value={r.status} onChange={(e) => setStatus(r, e.target.value)}
                      className="bg-[#0B0F19] border border-white/10 rounded px-2 py-1 text-white text-xs">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Td>
                  <Td className="text-xs text-white/55">{new Date(r.created_at).toLocaleDateString()}</Td>
                  <Td><button onClick={() => approve(r)} className="text-xs text-[#5eead4] hover:underline">Approve →</button></Td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={9} className="text-center py-8 text-white/45">No claims yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

function UrlInput({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <input
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => v !== value && onSave(v)}
      placeholder="https://"
      className="w-56 bg-[#0B0F19] border border-white/10 rounded px-2 py-1 text-white text-xs"
    />
  );
}
function Th({ children }: { children?: React.ReactNode }) { return <th className="text-left px-3 py-2 font-medium">{children}</th>; }
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) { return <td className={`px-3 py-3 text-white/85 ${className}`}>{children}</td>; }
