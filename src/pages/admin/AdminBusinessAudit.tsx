import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { businessTelHref, isPlatformPhone, normalizePhoneDigits } from "@/lib/businessContact";
import { Loader2, RefreshCw } from "lucide-react";

type AuditFilter = "all" | "missing-phone" | "duplicate-phone" | "possible-wrong-phone" | "unclaimed" | "needs-verification";

type BusinessAuditRow = {
  id: string;
  name: string;
  slug: string;
  town_name: string | null;
  city: string | null;
  category: string | null;
  phone: string | null;
  website: string | null;
  is_claimed: boolean | null;
  is_verified: boolean | null;
  contact_status: string | null;
  needs_review: boolean | null;
  data_status: string | null;
};

const FILTERS: { key: AuditFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "missing-phone", label: "Missing phone" },
  { key: "duplicate-phone", label: "Duplicate phone" },
  { key: "possible-wrong-phone", label: "Possible wrong phone" },
  { key: "unclaimed", label: "Unclaimed" },
  { key: "needs-verification", label: "Needs verification" },
];

const isMissingPhone = (row: BusinessAuditRow) => !normalizePhoneDigits(row.phone);
const isWrongPhone = (row: BusinessAuditRow) => {
  const digits = normalizePhoneDigits(row.phone);
  return Boolean(digits && (isPlatformPhone(row.phone) || !businessTelHref(row.phone, row.contact_status)));
};

export default function AdminBusinessAudit() {
  const { toast } = useToast();
  const [rows, setRows] = useState<BusinessAuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AuditFilter>("needs-verification");
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("businesses")
      .select("id,name,slug,town_name,city,category,phone,website,is_claimed,is_verified,contact_status,needs_review,data_status")
      .eq("is_active", true)
      .order("name", { ascending: true })
      .limit(5000);
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setRows((data ?? []) as BusinessAuditRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const phoneCounts = useMemo(() => {
    const map: Record<string, { count: number; names: Set<string> }> = {};
    rows.forEach((row) => {
      const digits = normalizePhoneDigits(row.phone);
      if (!digits) return;
      if (!map[digits]) map[digits] = { count: 0, names: new Set() };
      map[digits].count += 1;
      map[digits].names.add(row.name.toLowerCase().trim());
    });
    return map;
  }, [rows]);

  const isDuplicate = (row: BusinessAuditRow) => {
    const digits = normalizePhoneDigits(row.phone);
    if (!digits) return false;
    const record = phoneCounts[digits];
    return Boolean(record && record.count > 1 && record.names.size > 1);
  };

  const counts = useMemo(() => ({
    all: rows.length,
    "missing-phone": rows.filter(isMissingPhone).length,
    "duplicate-phone": rows.filter(isDuplicate).length,
    "possible-wrong-phone": rows.filter(isWrongPhone).length,
    unclaimed: rows.filter((r) => !r.is_claimed).length,
    "needs-verification": rows.filter((r) => r.contact_status === "needs_verification" || r.needs_review || r.data_status === "needs_review").length,
  }), [rows, phoneCounts]);

  const filtered = rows.filter((row) => {
    if (filter === "missing-phone") return isMissingPhone(row);
    if (filter === "duplicate-phone") return isDuplicate(row);
    if (filter === "possible-wrong-phone") return isWrongPhone(row);
    if (filter === "unclaimed") return !row.is_claimed;
    if (filter === "needs-verification") return row.contact_status === "needs_verification" || row.needs_review || row.data_status === "needs_review";
    return true;
  });

  async function markNeedsVerification(row: BusinessAuditRow, clearPhone = false) {
    setSavingId(row.id);
    const { error } = await supabase
      .from("businesses")
      .update({
        phone: clearPhone ? null : row.phone,
        contact_status: "needs_verification",
        needs_review: true,
        data_status: "needs_review",
        contact_notes: clearPhone ? "Phone cleared by admin audit as possible platform/wrong phone." : "Marked by admin contact audit.",
      } as any)
      .eq("id", row.id);
    setSavingId(null);
    if (error) return toast({ variant: "destructive", title: "Update failed", description: error.message });
    setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, phone: clearPhone ? null : r.phone, contact_status: "needs_verification", needs_review: true, data_status: "needs_review" } : r));
  }

  return (
    <AdminLayout title="Business Contact Audit" description="Find missing, duplicated, wrong, unclaimed, and unverified business contact records.">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full border ${
                filter === f.key ? "border-[#5eead4] text-[#5eead4] bg-[#5eead4]/10" : "border-white/10 text-white/65 hover:text-white"
              }`}
            >
              {f.label} <span className="text-white/40">({counts[f.key]})</span>
            </button>
          ))}
        </div>
        <button onClick={load} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:text-white">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr><Th>Business</Th><Th>Town</Th><Th>Category</Th><Th>Phone</Th><Th>Website</Th><Th>Flags</Th><Th></Th></tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const flags = [
                  isMissingPhone(row) ? "Missing phone" : null,
                  isDuplicate(row) ? "Duplicate phone" : null,
                  isWrongPhone(row) ? "Possible wrong phone" : null,
                  !row.website ? "Missing website" : null,
                  !row.is_claimed ? "Unclaimed" : null,
                  row.contact_status === "needs_verification" || row.needs_review ? "Needs verification" : null,
                ].filter(Boolean);
                return (
                  <tr key={row.id} className="border-t border-white/5 align-top">
                    <Td><a href={`/biz/${row.slug}`} target="_blank" rel="noreferrer" className="text-white font-medium hover:text-[#5eead4]">{row.name}</a></Td>
                    <Td>{row.town_name || row.city || "—"}</Td>
                    <Td>{row.category || "—"}</Td>
                    <Td>{row.phone || <span className="text-white/40">Not available</span>}</Td>
                    <Td className="max-w-[220px] truncate">{row.website || <span className="text-white/40">Missing</span>}</Td>
                    <Td><div className="flex flex-wrap gap-1">{flags.map((flag) => <Pill key={flag as string}>{flag}</Pill>)}</div></Td>
                    <Td>
                      <div className="flex flex-col gap-1 text-xs">
                        <button disabled={savingId === row.id} onClick={() => markNeedsVerification(row)} className="text-[#5eead4] hover:underline disabled:opacity-50">Needs verification</button>
                        {row.phone && <button disabled={savingId === row.id} onClick={() => markNeedsVerification(row, true)} className="text-red-300 hover:underline disabled:opacity-50">Clear phone</button>}
                      </div>
                    </Td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan={7} className="py-8 text-center text-white/45">No businesses match this filter.</td></tr>}
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
function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-200 text-[11px]">{children}</span>;
}