import { useEffect, useRef } from "react";

/** Default markup is visible; entry animations are an optional, one-time enhancement. */
export function useHomepageEntry() {
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-entered", "true");
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "-40px", threshold: 0.08 });
      element.querySelectorAll("[data-entry-group]").forEach((group) => observer?.observe(group));
    } catch {
      observer?.disconnect();
    }
    return () => observer?.disconnect();
  }, []);
  return root;
}