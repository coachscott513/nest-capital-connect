import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  profession_category: string | null;
  towns_of_interest: string[] | null;
  interested_package: string | null;
  website: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "reviewed", "contacted", "interested", "converted", "declined", "archived"];

export default function AdminPartnerInquiries() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("partner_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setRows((data ?? []) as Inquiry[]);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("partner_inquiries").update({ status }).eq("id", id);
    if (error) return toast({ variant: "destructive", title: "Update failed", description: error.message });
    setRows((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function convertToPartner(row: Inquiry) {
    const { error } = await supabase.from("partners").insert({
      name: row.name,
      company: row.company,
      email: row.email,
      phone: row.phone,
      category: (row.profession_category ?? "agent").toLowerCase().replace(/\s+/g, "_"),
      website: row.website,
      towns_served: row.towns_of_interest ?? [],
      status: "prospect",
    });
    if (error)
      return toast({ variant: "destructive", title: "Could not create partner", description: error.message });
    await updateStatus(row.id, "converted");
    toast({ title: "Converted to partner", description: `${row.name} added to Partners list.` });
  }

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <AdminLayout
      title="Partner Inquiries"
      description="Submissions from /homes/partner-inquiry. Review, contact, and convert to partners."
    >
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        {["all", ...STATUSES].map((s) => {
          const count = s === "all" ? rows.length : rows.filter((r) => r.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full border ${
                filter === s
                  ? "border-[#5eead4] text-[#5eead4] bg-[#5eead4]/10"
                  : "border-white/10 text-white/65 hover:text-white"
              }`}
            >
              {s} <span className="text-white/40">({count})</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr>
                <Th>Name</Th><Th>Company</Th><Th>Category</Th><Th>Towns</Th><Th>Package</Th><Th>Contact</Th><Th>Status</Th><Th>Date</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5 align-top">
                  <Td><div className="text-white font-medium">{r.name}</div></Td>
                  <Td>{r.company ?? "—"}</Td>
                  <Td>{r.profession_category ?? "—"}</Td>
                  <Td className="max-w-[200px]">{r.towns_of_interest?.join(", ") || "—"}</Td>
                  <Td>{r.interested_package ?? "—"}</Td>
                  <Td>
                    <div className="text-xs">{r.email}</div>
                    <div className="text-xs text-white/55">{r.phone}</div>
                  </Td>
                  <Td>
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="bg-[#0B0F19] border border-white/10 rounded px-2 py-1 text-white text-xs"
                    >
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Td>
                  <Td className="text-xs text-white/55">{new Date(r.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <button
                      onClick={() => convertToPartner(r)}
                      className="text-xs text-[#5eead4] hover:underline"
                    >
                      Convert →
                    </button>
                  </Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center text-white/45 py-8">No inquiries.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-3 text-white/85 ${className}`}>{children}</td>;
}
