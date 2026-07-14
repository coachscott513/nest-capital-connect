import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type Tab = "links" | "campaigns" | "clicks";

interface TrackedLink {
  id: string;
  slug: string;
  destination_url: string;
  label: string | null;
  click_count: number;
  is_active: boolean;
  campaign_id: string | null;
  created_at: string;
}
interface Campaign {
  id: string;
  name: string;
  segment: string | null;
  sent_at: string | null;
  created_at: string;
}
interface Click {
  id: string;
  slug: string;
  device: string | null;
  country: string | null;
  referrer: string | null;
  is_bot: boolean;
  created_at: string;
}

const SEED_LINKS: Array<Pick<TrackedLink, "slug" | "destination_url" | "label">> = [
  { slug: "roosevelt-room", destination_url: "/business/roosevelt-room", label: "Roosevelt Room spotlight" },
  { slug: "cassone", destination_url: "/business/cassone", label: "Cassone spotlight" },
  { slug: "pricing", destination_url: "/pricing", label: "Pricing" },
  { slug: "apply", destination_url: "/business/apply", label: "Business application" },
  { slug: "business", destination_url: "/for-businesses", label: "For businesses" },
  { slug: "founding-partner", destination_url: "/pricing", label: "Founding partner" },
];

export default function AdminOutreach() {
  const { isAdmin, loading } = useIsAdmin();
  const [tab, setTab] = useState<Tab>("links");
  const [links, setLinks] = useState<TrackedLink[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [newSlug, setNewSlug] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const refresh = async () => {
    const [l, c, cl] = await Promise.all([
      supabase.from("tracked_links").select("*").order("created_at", { ascending: false }),
      supabase.from("outreach_campaigns").select("*").order("created_at", { ascending: false }),
      supabase.from("link_clicks").select("id,slug,device,country,referrer,is_bot,created_at").order("created_at", { ascending: false }).limit(200),
    ]);
    if (l.data) setLinks(l.data as TrackedLink[]);
    if (c.data) setCampaigns(c.data as Campaign[]);
    if (cl.data) setClicks(cl.data as Click[]);
  };

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin]);

  const create = async () => {
    if (!newSlug || !newDest) return;
    const slug = newSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const { error } = await supabase.from("tracked_links").insert({
      slug, destination_url: newDest.trim(), label: newLabel.trim() || null,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setNewSlug(""); setNewDest(""); setNewLabel("");
    toast({ title: "Link created", description: `${origin}/go/${slug}` });
    refresh();
  };

  const seedDefaults = async () => {
    const rows = SEED_LINKS.filter(s => !links.some(l => l.slug === s.slug));
    if (!rows.length) return toast({ title: "All defaults already exist" });
    const { error } = await supabase.from("tracked_links").insert(rows);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: `Seeded ${rows.length} links` });
    refresh();
  };

  const toggle = async (l: TrackedLink) => {
    await supabase.from("tracked_links").update({ is_active: !l.is_active }).eq("id", l.id);
    refresh();
  };

  const copy = (slug: string) => {
    const url = `${origin}/go/${slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Copied", description: url });
  };

  const totalClicks = useMemo(() => links.reduce((s, l) => s + (l.click_count || 0), 0), [links]);
  const humanClicks = useMemo(() => clicks.filter(c => !c.is_bot).length, [clicks]);

  if (loading) return <div className="min-h-screen bg-background text-foreground p-8">Loading…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5eead4]">Outreach</p>
          <Link to="/admin" className="text-xs text-white/60 hover:text-white">← Admin</Link>
        </div>
        <h1 className="text-4xl font-semibold mb-3">Link tracking & engagement</h1>
        <p className="text-white/60 mb-8 max-w-2xl">
          First-party redirect engine. Every <code className="text-[#5eead4]">/go/*</code> link is tracked, scored, and yours — no bit.ly, no third parties.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <Stat label="Tracked links" value={links.length} />
          <Stat label="Total clicks" value={totalClicks} />
          <Stat label="Human clicks (last 200)" value={humanClicks} />
        </div>

        <div className="flex gap-2 border-b border-white/10 mb-6">
          {(["links", "campaigns", "clicks"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize transition ${
                tab === t ? "text-white border-b-2 border-[#5eead4]" : "text-white/50 hover:text-white/80"
              }`}
            >{t}</button>
          ))}
        </div>

        {tab === "links" && (
          <div>
            <div className="rounded-lg border border-white/10 bg-[#1E2230] p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Create /go link</h3>
              <div className="grid md:grid-cols-4 gap-3">
                <Input placeholder="slug (e.g. roosevelt-room)" value={newSlug} onChange={e => setNewSlug(e.target.value)} />
                <Input placeholder="destination (/pricing or https://…)" value={newDest} onChange={e => setNewDest(e.target.value)} className="md:col-span-2" />
                <Input placeholder="label (optional)" value={newLabel} onChange={e => setNewLabel(e.target.value)} />
              </div>
              <div className="flex gap-2 mt-3">
                <Button onClick={create} className="bg-[#0d6e66] hover:bg-[#0d6e66]/90">Create link</Button>
                <Button variant="outline" onClick={seedDefaults}>Seed default set</Button>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-white/60 text-left text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Slug</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Clicks</th>
                    <th className="p-3">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(l => (
                    <tr key={l.id} className="border-t border-white/5">
                      <td className="p-3 font-mono text-[#5eead4]">/go/{l.slug}</td>
                      <td className="p-3 text-white/70 truncate max-w-[300px]">{l.destination_url}</td>
                      <td className="p-3">{l.click_count}</td>
                      <td className="p-3">
                        <button onClick={() => toggle(l)} className={`text-xs px-2 py-1 rounded ${l.is_active ? "bg-[#0d6e66]/20 text-[#5eead4]" : "bg-white/10 text-white/50"}`}>
                          {l.is_active ? "active" : "paused"}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => copy(l.slug)} className="text-xs text-white/70 hover:text-white">Copy URL</button>
                      </td>
                    </tr>
                  ))}
                  {!links.length && (
                    <tr><td colSpan={5} className="p-8 text-center text-white/40">No links yet. Seed the defaults above.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "campaigns" && (
          <div className="rounded-lg border border-white/10 p-6 bg-[#1E2230]">
            <p className="text-white/60 text-sm mb-4">Campaigns group outreach batches (e.g. "Restaurant batch", "Contractors"). Create one, then attach /go links to it.</p>
            <CampaignCreate onCreated={refresh} />
            <ul className="mt-6 divide-y divide-white/5">
              {campaigns.map(c => (
                <li key={c.id} className="py-3 flex justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-white/50">{c.segment || "—"} · {new Date(c.created_at).toLocaleDateString()}</div>
                  </div>
                </li>
              ))}
              {!campaigns.length && <li className="py-6 text-center text-white/40 text-sm">No campaigns yet.</li>}
            </ul>
          </div>
        )}

        {tab === "clicks" && (
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/60 text-left text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3">When</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Device</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Referrer</th>
                  <th className="p-3">Bot</th>
                </tr>
              </thead>
              <tbody>
                {clicks.map(c => (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="p-3 text-white/60">{new Date(c.created_at).toLocaleString()}</td>
                    <td className="p-3 font-mono text-[#5eead4]">/go/{c.slug}</td>
                    <td className="p-3">{c.device || "—"}</td>
                    <td className="p-3">{c.country || "—"}</td>
                    <td className="p-3 truncate max-w-[240px] text-white/60">{c.referrer || "—"}</td>
                    <td className="p-3">{c.is_bot ? "yes" : ""}</td>
                  </tr>
                ))}
                {!clicks.length && <tr><td colSpan={6} className="p-8 text-center text-white/40">No clicks recorded yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#1E2230] p-5">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wider text-white/50 mt-1">{label}</div>
    </div>
  );
}

function CampaignCreate({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [segment, setSegment] = useState("");
  const submit = async () => {
    if (!name) return;
    const { error } = await supabase.from("outreach_campaigns").insert({ name, segment: segment || null });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    setName(""); setSegment("");
    onCreated();
    toast({ title: "Campaign created" });
  };
  return (
    <div className="grid md:grid-cols-3 gap-3">
      <Input placeholder="Campaign name" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="Segment (e.g. Restaurants)" value={segment} onChange={e => setSegment(e.target.value)} />
      <Button onClick={submit} className="bg-[#0d6e66] hover:bg-[#0d6e66]/90">Create campaign</Button>
    </div>
  );
}
