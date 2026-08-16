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
        // Tier A is browser-rendered and must stay small. /biz/* is owned by
        // Tier B (scripts/prerender-biz.mjs), which emits those same routes
        // deterministically from the database in seconds; rendering ~5,000
        // business pages through Puppeteer here would take hours and produce
        // duplicate output.
        if (route.startsWith("/admin") || route.startsWith("/biz/")) continue;
        routes.add(route);

      } catch {
        /* ignore malformed loc */
      }
    }
  } catch {
    console.warn("[prerender] public/sitemap.xml not found — using curated route list only");
  }
  return [...routes];
}

// Routes that must never receive a synthesised canonical and must never be
// treated as public/indexable by the build-time safety net.
const PRIVATE_ROUTE_PREFIXES: string[] = [
  "/admin",
  "/auth",
  "/dashboard",
  "/partner-dashboard",
  "/partner-auth",
  "/partner-success",
  "/reset-password",
  "/seo-audit",
  "/reports",
  "/closing-team",
  "/dealdesk-thanks",
  "/market-report-thanks",
];

/**
 * Emits two fallback documents that reuse the real hashed JS/CSS so
 * BrowserRouter hydrates the requested URL normally:
 *
 *  - `dist/spa-shell.html`   neutral, NO robots directive. Served to any
 *    unmatched path that is not explicitly private. This is deliberate: the
 *    app has ~5,000 valid DB-backed public dynamic routes (`/biz/:slug`,
 *    `/business/:slug`, categories, towns, stories) that are NOT in the
 *    prerender set. A raw `noindex` here would deindex live, click-bearing
 *    pages. Robots/canonical for those routes are owned by the route's own
 *    head (Helmet), and unknown slugs still fail closed at runtime by
 *    emitting `noindex` themselves.
 *  - `dist/private-shell.html`   raw `noindex, nofollow` for admin, auth and
 *    other non-public prefixes, which fail closed before hydration.
 *
 * Neither shell carries homepage identity: no homepage title, H1, body copy,
 * canonical, or Organization/WebSite/LocalBusiness/breadcrumb schema.
 * Runs in `closeBundle` so it observes the post-prerender dist output.
 */
function spaShellPlugin() {
  return {
    name: "cdn-spa-shell",
    apply: "build" as const,
    closeBundle() {
      const distIndex = path.resolve(__dirname, "dist/index.html");
      if (!fs.existsSync(distIndex)) return;
      const html = fs.readFileSync(distIndex, "utf8");

      const scripts = [...html.matchAll(/<script[^>]+type="module"[^>]*src="\/assets\/[^"]+"[^>]*><\/script>/g)]
        .map((m) => m[0])
        .join("\n    ");
      const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+"[^>]*>/g)]
        .map((m) => m[0])
        .join("\n    ");

      if (!scripts) {
        console.warn("[spa-shell] no hashed module script found in dist/index.html — shell not written");
        return;
      }

      const buildShell = (robots: string | null, title: string) => `<!DOCTYPE html>
<html lang="en" class="dark" style="background-color: #0B0B0B;">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${robots ? `    <meta name="robots" content="${robots}" />\n` : ""}    <title>${title}</title>
    ${styles}
    ${scripts}
  </head>
  <body style="background-color: #0B0B0B; color: #FFFFFF;">
    <div id="root"></div>
  </body>
</html>
`;

      fs.writeFileSync(
        path.resolve(__dirname, "dist/spa-shell.html"),
        buildShell(null, "Capital District Nest"),
        "utf8",
      );
      fs.writeFileSync(
        path.resolve(__dirname, "dist/private-shell.html"),
        buildShell("noindex, nofollow", "Capital District Nest"),
        "utf8",
      );
      console.log("[spa-shell] wrote dist/spa-shell.html (neutral) and dist/private-shell.html (noindex)");
    },
  };
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

          // og:url must agree with the canonical host, otherwise crawlers see
          // two competing URLs for the same document.
          renderedRoute.html = renderedRoute.html.replace(
            /(property="og:url"[^>]*content=")https:\/\/capitaldistrictnest\.com/g,
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
