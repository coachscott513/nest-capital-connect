import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, EyeOff } from "lucide-react";
import AnswerFirstProfile, { type AnswerProfileInput } from "@/components/preview/AnswerFirstProfile";
import PopularNeedsRail from "@/components/preview/PopularNeedsRail";

export default function AdminPreviews() {
  const [options, setOptions] = useState<{ slug: string; name: string }[]>([]);
  const [slug, setSlug] = useState<string>("");
  const [business, setBusiness] = useState<AnswerProfileInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("businesses")
        .select("slug,name")
        .not("slug", "is", null)
        .order("name")
        .limit(200);
      const opts = (data ?? []) as { slug: string; name: string }[];
      setOptions(opts);
      if (opts.length > 0) setSlug(opts[0].slug);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("businesses")
        .select("id,name,category,subcategory,town_name,town_slug,county,state,address,phone,website,hours,description,long_description,eligibility_state,last_verified_at")
        .eq("slug", slug)
        .maybeSingle();
      if (!data) { setBusiness(null); return; }
      const { data: sources } = await supabase
        .from("business_sources")
        .select("source_type")
        .eq("business_id", data.id);
      setBusiness({
        ...(data as AnswerProfileInput),
        source_types: Array.from(new Set((sources ?? []).map((s) => s.source_type as string))),
      });
    })();
  }, [slug]);

  return (
    <AdminLayout title="Public Previews" description="Unpublished redesign candidates awaiting founder approval.">
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4">
        <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <p className="text-sm text-white/75">
          These components are <strong className="text-white">not mounted on any public route</strong>. Nothing on the
          live site has changed. Approve here first, then they get wired into the public pages.
        </p>
      </div>

      <h2 className="mb-3 text-sm uppercase tracking-[0.14em] text-white/45">Search / AI answer profile template</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-white/60"><Loader2 className="h-4 w-4 animate-spin" /> Loading businesses…</div>
      ) : (
        <>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mb-4 rounded-lg border border-[#2D3748] bg-[#1E2230] px-3 py-2 text-sm text-white"
          >
            {options.map((o) => (
              <option key={o.slug} value={o.slug}>{o.name}</option>
            ))}
          </select>
          {business ? <AnswerFirstProfile business={business} /> : <p className="text-sm text-white/55">No record loaded.</p>}
        </>
      )}

      <h2 className="mt-12 text-sm uppercase tracking-[0.14em] text-white/45">Demand-led discovery rail</h2>
      <PopularNeedsRail />
    </AdminLayout>
  );
}
