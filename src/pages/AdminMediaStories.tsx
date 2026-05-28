import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

/**
 * Admin-only "Add Media Story" form. Writes to public.media_stories.
 * Visibility on the homepage requires `approved = true`.
 * Access is enforced by RLS via has_role(auth.uid(), 'admin').
 */

const SOURCES = [
  { value: "News10 WTEN", short: "News10" },
  { value: "WNYT NewsChannel 13", short: "WNYT" },
  { value: "Spectrum News", short: "Spectrum" },
  { value: "CBS6 Albany", short: "CBS6" },
  { value: "Times Union", short: "Times Union" },
];

const CATEGORIES = [
  "Business",
  "Food & Drink",
  "Development",
  "Events",
  "Sports",
  "Real Estate",
  "Education",
  "Community",
  "Finance",
  "Entertainment",
  "Local Government",
];

const StorySchema = z.object({
  headline: z.string().trim().min(4).max(220),
  summary: z.string().trim().max(600).optional().or(z.literal("")),
  category: z.string().min(1),
  town: z.string().trim().max(80).optional().or(z.literal("")),
  source_name: z.string().min(1),
  source_article_url: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional()
    .or(z.literal("")),
  video_embed_url: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional()
    .or(z.literal("")),
  has_video: z.boolean(),
  featured: z.boolean(),
  approved: z.boolean(),
  published_at: z.string().min(1),
});

type StoryRow = {
  id: string;
  headline: string;
  source_name: string;
  category: string;
  town: string | null;
  approved: boolean;
  featured: boolean;
  has_video: boolean;
  published_at: string;
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const blankForm = {
  headline: "",
  summary: "",
  category: CATEGORIES[0],
  town: "",
  source_name: SOURCES[0].value,
  source_article_url: "",
  video_embed_url: "",
  has_video: false,
  featured: false,
  approved: true,
  published_at: todayIso(),
};

export default function AdminMediaStories() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [form, setForm] = useState(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [recent, setRecent] = useState<StoryRow[]>([]);

  // Check admin role
  useEffect(() => {
    if (loading || !user) return;
    (async () => {
      const { data, error } = await (supabase as any)
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(!!data);
    })();
  }, [user, loading]);

  // Load recent (admins can see all via RLS)
  const loadRecent = async () => {
    const { data } = await (supabase as any)
      .from("media_stories")
      .select("id, headline, source_name, category, town, approved, featured, has_video, published_at")
      .order("published_at", { ascending: false })
      .limit(20);
    setRecent((data as StoryRow[]) || []);
  };

  useEffect(() => {
    if (isAdmin) loadRecent();
  }, [isAdmin]);

  const shortName = useMemo(
    () => SOURCES.find((s) => s.value === form.source_name)?.short || null,
    [form.source_name],
  );

  if (loading) return null;
  if (!user) return <Navigate to="/auth?redirect=/admin/media-stories" replace />;

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white/70 flex items-center justify-center text-sm">
        Checking access…
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-semibold mb-3">Admin access required</h1>
        <p className="text-white/60 text-sm mb-6 max-w-md text-center">
          Your account is signed in but doesn't have the <code>admin</code> role.
          Ask Scott to grant access in <code>user_roles</code>.
        </p>
        <Link to="/" className="text-[#5eead4] text-sm hover:text-white">
          ← Back to homepage
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const parsed = StorySchema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast({
        title: "Please review the form",
        description: first || "Check the highlighted fields.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    const payload = {
      ...parsed.data,
      summary: parsed.data.summary || null,
      town: parsed.data.town || null,
      source_article_url: parsed.data.source_article_url || null,
      video_embed_url: parsed.data.video_embed_url || null,
      source_short_name: shortName,
      published_at: new Date(parsed.data.published_at).toISOString(),
      created_by: user.id,
    };

    const { error } = await (supabase as any).from("media_stories").insert(payload);
    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not save story",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Story added to Local Media Pulse." });
    setForm({ ...blankForm, published_at: todayIso() });
    loadRecent();
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const inputCx =
    "w-full rounded-lg border border-[#2D3748] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#5eead4]/60 transition";
  const labelCx =
    "block text-[10px] font-semibold tracking-[0.22em] uppercase text-white/55 mb-2";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="mb-10">
          <Link to="/" className="text-xs text-white/40 hover:text-[#5eead4]">
            ← Back to homepage
          </Link>
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mt-6 mb-3">
            Admin · Local Media Pulse
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
            Add Media Story
          </h1>
          <p className="text-white/55 text-sm mt-2 max-w-2xl">
            Only approved stories appear on the homepage. Featured stories surface first.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={labelCx}>Headline</label>
            <input
              className={inputCx}
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              maxLength={220}
              required
            />
          </div>

          <div>
            <label className={labelCx}>Summary</label>
            <textarea
              className={inputCx}
              rows={3}
              maxLength={600}
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              placeholder="1–2 sentences describing the story."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className={labelCx}>Source</label>
              <select
                className={inputCx}
                value={form.source_name}
                onChange={(e) => set("source_name", e.target.value)}
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCx}>Category</label>
              <select
                className={inputCx}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCx}>Town</label>
              <input
                className={inputCx}
                value={form.town}
                onChange={(e) => set("town", e.target.value)}
                placeholder="e.g. Albany"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelCx}>Source article URL</label>
              <input
                type="url"
                className={inputCx}
                value={form.source_article_url}
                onChange={(e) => set("source_article_url", e.target.value)}
                placeholder="https://www.news10.com/…"
              />
            </div>
            <div>
              <label className={labelCx}>Video embed URL (optional)</label>
              <input
                type="url"
                className={inputCx}
                value={form.video_embed_url}
                onChange={(e) => set("video_embed_url", e.target.value)}
                placeholder="https://…/embed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <label className={labelCx}>Published</label>
              <input
                type="date"
                className={inputCx}
                value={form.published_at}
                onChange={(e) => set("published_at", e.target.value)}
                required
              />
            </div>
            <label className="flex items-end gap-2 pb-2.5 text-sm text-white/75 cursor-pointer">
              <input
                type="checkbox"
                checked={form.has_video}
                onChange={(e) => set("has_video", e.target.checked)}
                className="h-4 w-4 accent-[#5eead4]"
              />
              Has video
            </label>
            <label className="flex items-end gap-2 pb-2.5 text-sm text-white/75 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 accent-[#5eead4]"
              />
              Featured
            </label>
            <label className="flex items-end gap-2 pb-2.5 text-sm text-white/75 cursor-pointer">
              <input
                type="checkbox"
                checked={form.approved}
                onChange={(e) => set("approved", e.target.checked)}
                className="h-4 w-4 accent-[#5eead4]"
              />
              Approved (visible)
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase hover:bg-white transition disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Story"}
            </button>
          </div>
        </form>

        {/* Recent */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold mb-4">Recent stories</h2>
          <div className="rounded-xl border border-[#2D3748] divide-y divide-white/[0.06] overflow-hidden">
            {recent.length === 0 && (
              <div className="p-5 text-sm text-white/45">No stories yet.</div>
            )}
            {recent.map((r) => (
              <div
                key={r.id}
                className="p-4 md:p-5 flex items-center justify-between gap-4 text-sm"
              >
                <div className="min-w-0">
                  <div className="text-white truncate">{r.headline}</div>
                  <div className="text-[11px] text-white/45 mt-1 tracking-wide uppercase">
                    {r.source_name} · {r.category}
                    {r.town ? ` · ${r.town}` : ""} ·{" "}
                    {new Date(r.published_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-semibold shrink-0">
                  {r.featured && <span className="text-[#5eead4]">Featured</span>}
                  {r.has_video && <span className="text-white/55">Video</span>}
                  <span
                    className={
                      r.approved ? "text-[#5eead4]" : "text-amber-300/80"
                    }
                  >
                    {r.approved ? "Live" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
