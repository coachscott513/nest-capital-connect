import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { getSearchRoute } from "@/lib/searchIntent";
import { trackGAEvent } from "@/components/GARouteTracker";

/* =============================================================
   FLOATING OMNI-SEARCH CONSOLE
   ============================================================= */

const FloatingOmniSearch = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(window.innerHeight * 0.7, 480);
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackGAEvent.searchSubmit({ query: q, source_location: "floating_omni" });
    navigate(getSearchRoute(q));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3"
        >
          <form
            onSubmit={onSubmit}
            role="search"
            aria-label="Omni search"
            className="mx-auto flex items-center gap-2 max-w-3xl rounded-full border border-white/12 bg-[#0B0F19]/65 pl-4 pr-2 py-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
            style={{
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            }}
          >
            <Search className="w-4 h-4 text-white/65 shrink-0" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 140))}
              placeholder="Search homes, businesses, towns, events…"
              className="flex-1 min-w-0 bg-transparent text-[13.5px] sm:text-sm text-white placeholder:text-white/45 focus:outline-none py-1.5"
              aria-label="Search the Capital District"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white text-[#0e0f12] text-[12.5px] font-semibold hover:opacity-90 transition"
            >
              Search <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingOmniSearch;
