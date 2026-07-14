import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

/**
 * /go/:slug — first-party redirect + tracking.
 * Calls the track-click edge function, then window.location.replace()s
 * to the destination. Shows a minimal fallback for the split-second before
 * redirect and for JS-disabled crawlers.
 */
export default function GoRedirect() {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const [destination, setDestination] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const query: Record<string, string> = { slug };
        params.forEach((v, k) => { query[k] = v; });
        query.ref = document.referrer || "";

        const { data, error } = await supabase.functions.invoke("track-click", {
          method: "GET" as any,
          body: undefined,
          headers: {},
          // supabase-js doesn't pass query params directly; use url via fetch fallback
        });

        // Fallback: call via fetch to include query params reliably
        if (!data || (data as any).destination === undefined) {
          const url = new URL(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-click`
          );
          Object.entries(query).forEach(([k, v]) => v && url.searchParams.set(k, v));
          const res = await fetch(url.toString(), {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          });
          const json = await res.json();
          if (cancelled) return;
          const dest = json.destination || "/";
          setDestination(dest);
          window.location.replace(dest);
          return;
        }

        if (cancelled) return;
        const dest = (data as any).destination || "/";
        setDestination(dest);
        window.location.replace(dest);
      } catch (e) {
        console.error(e);
        setError("Redirect failed");
        setTimeout(() => window.location.replace("/"), 800);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [slug, params]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center opacity-70 text-sm">
        {error ? error : `Redirecting${destination ? `…` : "…"}`}
      </div>
    </div>
  );
}
