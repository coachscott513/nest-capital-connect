import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink } from "lucide-react";

type Town = {
  id: string;
  town_name: string;
  town_slug: string;
  county: string | null;
  town_tier: string;
  founding_price: number | null;
  future_price: number | null;
  property_count: number | null;
  is_active: boolean;
  notes: string | null;
};

const TIERS = ["starter", "growth", "premium", "specialty"];

export default function AdminTowns() {
  const { toast } = useToast();
  const [towns, setTowns] = useState<Town[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("towns")
      .select("*")
      .order("town_tier")
      .order("town_name");
    if (error) toast({ variant: "destructive", title: "Load failed", description: error.message });
    setTowns((data ?? []) as Town[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function update(id: string, patch: Partial<Town>) {
    setSavingId(id);
    const { error } = await supabase.from("towns").update(patch).eq("id", id);
    setSavingId(null);
    if (error) {
      toast({ variant: "destructive", title: "Save failed", description: error.message });
      return;
    }
    setTowns((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  return (
    <AdminLayout
      title="Towns"
      description="Manage town tiers, pricing, and activation state. Edits save instantly."
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-[#5eead4]" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E2230]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-white/60 text-xs uppercase">
              <tr>
                <Th>Town</Th>
                <Th>County</Th>
                <Th>Tier</Th>
                <Th>Founding $</Th>
                <Th>Future $</Th>
                <Th>Properties</Th>
                <Th>Active</Th>
                <Th>Notes</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {towns.map((t) => (
                <tr key={t.id} className="border-t border-white/5">
                  <Td>
                    <div className="font-medium text-white">{t.town_name}</div>
                    <div className="text-xs text-white/45">/{t.town_slug}</div>
                  </Td>
                  <Td>
                    <Input
                      value={t.county ?? ""}
                      onChange={(v) => update(t.id, { county: v })}
                    />
                  </Td>
                  <Td>
                    <select
                      value={t.town_tier}
                      onChange={(e) => update(t.id, { town_tier: e.target.value })}
                      className={baseField}
                    >
                      {TIERS.map((tier) => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>
                  </Td>
                  <Td>
                    <NumInput value={t.founding_price} onChange={(v) => update(t.id, { founding_price: v })} />
                  </Td>
                  <Td>
                    <NumInput value={t.future_price} onChange={(v) => update(t.id, { future_price: v })} />
                  </Td>
                  <Td>{t.property_count ?? 0}</Td>
                  <Td>
                    <input
                      type="checkbox"
                      checked={t.is_active}
                      onChange={(e) => update(t.id, { is_active: e.target.checked })}
                      className="accent-[#5eead4]"
                    />
                  </Td>
                  <Td>
                    <Input
                      value={t.notes ?? ""}
                      onChange={(v) => update(t.id, { notes: v })}
                    />
                  </Td>
                  <Td>
                    <Link
                      to={`/homes/listings/${t.town_slug}`}
                      target="_blank"
                      className="text-[#5eead4] hover:text-[#5eead4]/80 inline-flex items-center gap-1 text-xs"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </Link>
                    {savingId === t.id && (
                      <span className="text-xs text-white/45 ml-2">saving…</span>
                    )}
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

const baseField =
  "w-full bg-[#0B0F19] border border-white/10 rounded px-2 py-1 text-white text-sm focus:border-[#5eead4]/60 outline-none";

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left px-3 py-2 font-medium">{children}</th>;
}
function Td({ children }: { children?: React.ReactNode }) {
  return <td className="px-3 py-2 text-white/85 align-middle">{children}</td>;
}
function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);
  return (
    <input
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => v !== value && onChange(v)}
      className={baseField}
    />
  );
}
function NumInput({ value, onChange }: { value: number | null; onChange: (v: number) => void }) {
  const [v, setV] = useState(value?.toString() ?? "");
  useEffect(() => setV(value?.toString() ?? ""), [value]);
  return (
    <input
      type="number"
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => {
        const n = Number(v);
        if (!Number.isNaN(n) && n !== value) onChange(n);
      }}
      className={`${baseField} w-24`}
    />
  );
}
