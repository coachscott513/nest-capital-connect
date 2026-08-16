import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";
import fs from "fs";

// Routes to prerender at build time. Curated list of highest-SEO-value
// static pages. Dynamic routes (/towns/:slug, /blog/:slug, /listings/:id)
// are excluded — they need a build-time data fetch (separate task).
const PRERENDER_ROUTES = [
  "/",
  "/analyze",
  "/analyze-any-property",
  "/analyze-any-deal",
  "/analyze-home",
  "/analyze-any-home",
  "/financing",
  "/first-time-buyers",
  "/first-time-homebuyers",
  "/first-time-home-buyers",
  "/rentals",
  "/blog",
  "/communities",
  "/intelligence",
  "/grants",
  "/buyer-roadmap",
  "/reviews",
  "/privacy-policy",
  "/markets",
  "/investment-properties",
  "/investor-tools",
  "/land-buyers",
  "/sell-investment-property",
  // High-value Delmar landing pages
  "/living-in-delmar",
  "/delmar-homes-for-sale",
  "/delmar-market-insights",
  // Explicit high-value town intelligence pages
  "/towns/albany",
  "/towns/troy",
  "/towns/schenectady",
  "/towns/saratoga-springs",
  "/towns/clifton-park",
  "/towns/amsterdam",
  "/towns/delmar",
  "/towns/niskayuna",
  "/towns/guilderland",
  "/towns/queensbury",
  "/towns/voorheesville",
  "/towns/mechanicville",
  // Featured business profiles — prerendered so iMessage/Facebook/LinkedIn
  // see the correct OG tags without executing client JS.
  "/biz/denofio-insurance-agency",
  // Hub routes that are linked in navigation and self-canonical but were
  // absent from both the sitemap and the prerender list, so raw fetches
  // fell through to the SPA shell (a homepage snapshot).
  "/businesses",
  "/for-businesses",
  "/pricing",
];

/**
 * Systemic fix for the prerender/canonical defect: the crawler-facing route
 * list is derived from the generated sitemap (public/sitemap.xml, written by
 * the predev/prebuild hook) and unioned with the curated list above. Any URL
 * we advertise for indexing therefore gets its own prerendered HTML file
 * instead of falling back to the SPA shell (which is the homepage snapshot).
 */
function resolvePrerenderRoutes(): string[] {
  const routes = new Set(PRERENDER_ROUTES);
  try {
    const xml = fs.readFileSync(path.resolve(__dirname, "public/sitemap.xml"), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        const u = new URL(m[1]);
        const route = u.pathname.replace(/\/+$/, "") || "/";
        if (!route.startsWith("/admin")) routes.add(route);
      } catch {
        /* ignore malformed loc */
      }
    }
  } catch {
    console.warn("[prerender] public/sitemap.xml not found — using curated route list only");
  }
  return [...routes];
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/coverage/**",
        "**/.nyc_output/**",
        "**/tmp/**",
        "**/temp/**",
      ],
    },
    fs: {
      strict: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Only prerender on production builds
    mode !== "development" &&
      prerender({
        routes: resolvePrerenderRoutes(),
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          // Prefer an explicit signal from React once the routed page has mounted.
          renderAfterDocumentEvent: "render-complete",
          // Fallback wait for pages with browser-only effects or slower content.
          renderAfterTime: 12000,
          maxConcurrentRoutes: 3,
          // Must stay false: Supabase-backed routes (/biz/:slug, town pages)
          // need their data request to resolve, otherwise they snapshot in the
          // fail-closed "not found" state.
          skipThirdPartyRequests: false,
          launchOptions: {
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/bin/chromium",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        },
        postProcess(renderedRoute: { route: string; html: string }) {
          // Strip any prerender-specific noise; ensure SPA still rehydrates
          renderedRoute.html = renderedRoute.html.replace(
            /<script (.*?)data-prerender(.*?)<\/script>/g,
            ""
          );

          const route = renderedRoute.route;

          // Drop a stray homepage canonical that survived on a non-home route.
          if (route !== "/") {
            renderedRoute.html = renderedRoute.html.replace(
              /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.capitaldistrictnest\.com\/"[^>]*>/g,
              ""
            );
          }

          // ── Canonical safety net ───────────────────────────────────────
          // Adds a self-referencing canonical ONLY when every condition holds:
          //  - the route is a known, prerendered, public route
          //  - no canonical already exists (external canonical ownership, e.g.
          //    Analyze Any Deal -> analyzeanydeal.com, is therefore preserved)
          //  - the route is not private/auth/admin
          //  - the snapshot is not noindex
          // It never invents a canonical for an unknown route.
          const isPrivate = PRIVATE_ROUTE_PREFIXES.some(
            (p) => route === p || route.startsWith(p + "/")
          );
          const hasCanonical = /rel="canonical"/.test(renderedRoute.html);
          const isNoindex = /<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(
            renderedRoute.html
          );
          if (!isPrivate && !hasCanonical && !isNoindex) {
            const canonical =
              "https://www.capitaldistrictnest.com" +
              (route === "/" ? "/" : route.replace(/\/+$/, ""));
            renderedRoute.html = renderedRoute.html.replace(
              "</head>",
              `<link rel="canonical" href="${canonical}">` +
                `<meta property="og:url" content="${canonical}">` +
                `</head>`
            );
          }

          // Normalise any non-www canonical to the www host of record.
          renderedRoute.html = renderedRoute.html.replace(
            /(rel="canonical"[^>]*href=")https:\/\/capitaldistrictnest\.com/g,
            "$1https://www.capitaldistrictnest.com"
          );
        },
      }),
    // Neutral SPA fallback document for unmatched / non-prerendered routes.
    mode !== "development" && spaShellPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
