import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Forces window scroll to top on every route change (pathname, search, or hash
 * change without an explicit hash target). Uses behavior:"instant" so the jump
 * is immediate and feels native — no smooth animation between routes.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If the route includes a hash target (e.g. #weekly-feed), let the browser
    // handle anchor scrolling instead of forcing top.
    if (hash) return;

    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
