import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Routes to prerender at build time. Curated list of highest-SEO-value
// static pages. Dynamic routes (/towns/:slug, /blog/:slug, /listings/:id)
// are excluded — they need a build-time data fetch (separate task).
const PRERENDER_ROUTES = [
  "/",
  "/analyze",
  "/analyze-any-property",
  "/analyze-any-deal",
  "/analyze-home",
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
  "/land-buyers",
  "/sell-investment-property",
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
];

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
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-jsdom",
        rendererOptions: {
          // Prefer an explicit signal from React once the routed page has mounted.
          renderAfterDocumentEvent: "render-complete",
          // Fallback wait for pages with browser-only effects or slower content.
          renderAfterTime: 3000,
          // jsdom needs these to avoid crashing on browser-only APIs
          maxConcurrentRoutes: 4,
        },
        postProcess(renderedRoute: { route: string; html: string }) {
          // Strip any prerender-specific noise; ensure SPA still rehydrates
          renderedRoute.html = renderedRoute.html.replace(
            /<script (.*?)data-prerender(.*?)<\/script>/g,
            ""
          );
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
