/**
 * Lightweight client-side bot detection.
 *
 * Used to gate custom GA4 conversion events so scrapers, headless
 * browsers, automated indexers, and link-preview crawlers don't
 * inflate engagement metrics. We deliberately do NOT block page_view
 * or static rendering — legitimate search crawlers (Googlebot,
 * Bingbot, Twitterbot, facebookexternalhit, etc.) must still see
 * the content. This only suppresses *custom* engagement events.
 *
 * Detection signals (any one triggers suppression):
 *   - navigator.webdriver === true                 (Selenium / Playwright / Puppeteer)
 *   - User-agent matches common bot regex          (crawlers, scrapers, preview bots)
 *   - window.callPhantom / window._phantom         (PhantomJS)
 *   - Missing window.chrome on Chromium UA         (headless Chrome telltale)
 *   - 0x0 screen / no language preference          (typical headless defaults)
 */

const BOT_UA_REGEX =
  /(bot|crawl|spider|slurp|bingpreview|mediapartners|facebookexternalhit|embedly|quora link preview|outbrain|pinterest\/0\.|vkshare|w3c_validator|whatsapp|telegram|skypeuripreview|nuzzel|bitlybot|tumblr|chatgpt-user|gptbot|claudebot|claude-web|anthropic-ai|perplexitybot|amazonbot|bytespider|yandex|baiduspider|duckduckbot|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|seznambot|rogerbot|exabot|sogou|coccoc|magpie-crawler|headless|phantomjs|electron|puppeteer|playwright|cypress|selenium|nightmare|wkhtmltopdf|prerender|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|monitor|scrapy|python-requests|curl\/|wget\/|node-fetch|axios\/|httpclient|okhttp|java\/|go-http-client)/i;

let cachedIsBot: boolean | null = null;

export const isLikelyBot = (): boolean => {
  if (typeof window === "undefined") return true; // SSR / build: treat as bot.
  if (cachedIsBot !== null) return cachedIsBot;

  try {
    const nav = window.navigator;
    const ua = nav.userAgent || "";

    // 1. WebDriver flag — set by every modern automation framework.
    if ((nav as any).webdriver === true) {
      cachedIsBot = true;
      return true;
    }

    // 2. PhantomJS markers.
    if ((window as any).callPhantom || (window as any)._phantom) {
      cachedIsBot = true;
      return true;
    }

    // 3. User-agent matches a known bot pattern.
    if (BOT_UA_REGEX.test(ua)) {
      cachedIsBot = true;
      return true;
    }

    // 4. Headless Chrome heuristic (Chromium UA but no window.chrome object).
    if (/Chrome\//.test(ua) && !(window as any).chrome) {
      cachedIsBot = true;
      return true;
    }

    // 5. No languages array at all — common for headless environments.
    if (!nav.languages || nav.languages.length === 0) {
      cachedIsBot = true;
      return true;
    }

    cachedIsBot = false;
    return false;
  } catch {
    cachedIsBot = false;
    return false;
  }
};

/**
 * Whether a *human* search-engine crawler should still see content.
 * Always true — bot detection only affects analytics, never content
 * delivery or routing. Exported so callers can self-document intent.
 */
export const shouldRenderContentForBots = (): boolean => true;
