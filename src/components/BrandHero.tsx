import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Home as HomeIcon,
  LineChart,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";

const TEAL = "#0D9488";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

/**
 * BrandHero — Premium glass dashboard hero (Vision Pro / Apple-style).
 * Replaces the previous abstract regional map. Soft white/teal gradient
 * background with blurred ambient shapes and a stack of frosted-glass
 * preview cards on the right.
 */
const BrandHero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #f7fafa 55%, #f1f5f6 100%)",
          }}
        />
        {/* Teal glow blob */}
        <div
          className="absolute -top-40 -right-32 w-[640px] h-[640px] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, rgba(13,148,136,0.22) 0%, rgba(13,148,136,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Cool blue blob */}
        <div
          className="absolute top-1/3 -left-40 w-[520px] h-[520px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,179,237,0.18) 0%, rgba(99,179,237,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Warm blob bottom */}
        <div
          className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,213,170,0.18) 0%, rgba(255,213,170,0) 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — Copy */}
          <div className="lg:col-span-6">
            <motion.div
              {...fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 px-4 py-1.5 mb-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: TEAL }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: TEAL }}
                />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-700">
                Capital District · Live Intelligence
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.04] tracking-tight text-neutral-900"
            >
              Capital District
              <br />
              Real Estate
              <br />
              <span style={{ color: TEAL }}>Intelligence.</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="mt-7 max-w-xl text-lg md:text-xl text-neutral-500 font-light leading-relaxed"
            >
              Search homes, analyze properties, and explore the towns that shape New York's Capital District.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition shadow-[0_8px_24px_-8px_rgba(13,148,136,0.5)] hover:shadow-[0_12px_30px_-8px_rgba(13,148,136,0.6)] hover:-translate-y-0.5"
                style={{ background: TEAL }}
              >
                Analyze a Property <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-white transition shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]"
              >
                Explore Towns
              </Link>
              <Link
                to="/homes-for-sale"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                Search Homes →
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Glass dashboard stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[520px] lg:max-w-none">
              {/* Card 1 — Market Snapshot */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: -1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="relative z-30 rounded-3xl p-6 lg:p-7"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  boxShadow:
                    "0 24px 60px -20px rgba(15,23,42,0.18), 0 1px 0 rgba(255,255,255,0.9) inset",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${TEAL}1A` }}
                    >
                      <LineChart className="w-4.5 h-4.5" style={{ color: TEAL }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
                        Albany Region
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">
                        Market Snapshot
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: `${TEAL}14`, color: TEAL }}
                  >
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Median", value: "$348K", trend: "+4.2%" },
                    { label: "Active", value: "412", trend: "−6%" },
                    { label: "Avg DOM", value: "18d", trend: "−3d" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl bg-white/60 border border-white/60 p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                        {m.label}
                      </p>
                      <p className="text-base font-bold text-neutral-900 mt-1 tracking-tight">
                        {m.value}
                      </p>
                      <p
                        className="text-[10px] font-semibold mt-0.5"
                        style={{ color: TEAL }}
                      >
                        {m.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Sparkline */}
                <svg
                  viewBox="0 0 200 40"
                  className="mt-4 w-full h-10"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={TEAL} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,30 L20,28 L40,24 L60,26 L80,18 L100,20 L120,14 L140,16 L160,10 L180,12 L200,6 L200,40 L0,40 Z"
                    fill="url(#sparkFill)"
                  />
                  <path
                    d="M0,30 L20,28 L40,24 L60,26 L80,18 L100,20 L120,14 L140,16 L160,10 L180,12 L200,6"
                    fill="none"
                    stroke={TEAL}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Card 2 — Delmar This Week (offset down-left) */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="relative z-20 -mt-6 ml-4 sm:ml-10 lg:ml-16 rounded-3xl p-6"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  boxShadow:
                    "0 24px 60px -20px rgba(15,23,42,0.16), 0 1px 0 rgba(255,255,255,0.9) inset",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${TEAL}1A` }}
                    >
                      <MapPin className="w-4.5 h-4.5" style={{ color: TEAL }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
                        Delmar · This Week
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">
                        3 closed · 2 new listings
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/living-in-delmar"
                    className="text-[11px] font-semibold inline-flex items-center gap-1 hover:gap-1.5 transition-all"
                    style={{ color: TEAL }}
                  >
                    Open <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {[
                    { icon: HomeIcon, label: "Roweland Ave", meta: "$485K · sold" },
                    { icon: TrendingUp, label: "Inventory", meta: "12 active · −15%" },
                    { icon: Sparkles, label: "Under $500K", meta: "Multiple offers" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl bg-white/60 border border-white/60 px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <row.icon
                          className="w-4 h-4"
                          style={{ color: TEAL }}
                        />
                        <span className="text-sm font-medium text-neutral-900">
                          {row.label}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-500 font-light">
                        {row.meta}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 3 — Analyze Any Property (offset down-right) */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="relative z-10 -mt-6 mr-2 sm:mr-6 lg:mr-12 rounded-3xl p-6"
                style={{
                  background: "rgba(20,30,45,0.92)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 30px 60px -20px rgba(15,23,42,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(13,148,136,0.18)" }}
                    >
                      <Sparkles className="w-4.5 h-4.5" style={{ color: "#5EEAD4" }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60">
                        Property Intelligence
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Analyze Any Property
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-1">
                    Address
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    137A Elsmere Ave, Delmar, NY
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Cap Rate", value: "6.8%" },
                    { label: "Cash Flow", value: "$412/mo" },
                    { label: "Score", value: "A−" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-2"
                    >
                      <p className="text-[9px] uppercase tracking-wider text-white/50 font-medium">
                        {m.label}
                      </p>
                      <p className="text-sm font-bold text-white mt-0.5 tracking-tight">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/analyze"
                  className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition w-full"
                  style={{ background: "#5EEAD4", color: "#0F172A" }}
                >
                  Run the Numbers <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>

              {/* Floating Live Help bubble */}
              <motion.a
                href="tel:+15186762347"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -bottom-4 -right-2 lg:bottom-2 lg:right-0 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-semibold text-white shadow-[0_12px_30px_-8px_rgba(220,28,46,0.5)] hover:-translate-y-0.5 transition"
                style={{ background: "#DC1C2E" }}
                aria-label="Talk to Scott"
              >
                <Phone className="w-3.5 h-3.5" /> Live Help
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
