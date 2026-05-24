import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, MapPin } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import SEOHead from "@/components/SEOHead";

type Town = { name: string; slug: string; median: string };
type County = { name: string; landmark: string; towns: Town[] };

const COUNTIES: County[] = [
  {
    name: "Albany County",
    landmark: "Empire State Plaza · NYS Capitol",
    towns: [
      { name: "Albany", slug: "albany", median: "$245K" },
      { name: "Bethlehem", slug: "bethlehem", median: "$455K" },
      { name: "Colonie", slug: "colonie", median: "$315K" },
      { name: "Delmar", slug: "delmar", median: "$470K" },
      { name: "Guilderland", slug: "guilderland", median: "$385K" },
    ],
  },
  {
    name: "Saratoga County",
    landmark: "Saratoga Race Course · Broadway",
    towns: [
      { name: "Ballston Spa", slug: "ballston-spa", median: "$345K" },
      { name: "Clifton Park", slug: "clifton-park", median: "$395K" },
      { name: "Saratoga Springs", slug: "saratoga-springs", median: "$625K" },
      { name: "Wilton", slug: "wilton", median: "$475K" },
    ],
  },
  {
    name: "Rensselaer County",
    landmark: "Troy Brownstones · RPI",
    towns: [
      { name: "Brunswick", slug: "brunswick", median: "$365K" },
      { name: "East Greenbush", slug: "east-greenbush", median: "$375K" },
      { name: "Troy", slug: "troy", median: "$265K" },
    ],
  },
  {
    name: "Schenectady County",
    landmark: "Proctors Theatre · Stockade District",
    towns: [
      { name: "Glenville", slug: "glenville", median: "$295K" },
      { name: "Niskayuna", slug: "niskayuna", median: "$365K" },
      { name: "Schenectady", slug: "schenectady", median: "$215K" },
    ],
  },
];

const TEAL = "#5eead4";

const Communities = () => {
  const [openCounty, setOpenCounty] = useState<string | null>(COUNTIES[0].name);
  const totalTowns = COUNTIES.reduce((a, c) => a + c.towns.length, 0);

  return (
    <>
      <SEOHead
        title="Capital District Communities | Capital District Nest"
        description="The directory of every Capital Region town we cover — Albany, Saratoga, Rensselaer, and Schenectady counties. Median prices, landmarks, and direct links to each town's lifestyle page."
        canonical="https://capitaldistrictnest.com/communities"
      />

      <MainLayout>
        <div className="min-h-screen bg-background text-foreground">
          {/* Hero */}
          <section className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="max-w-6xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-5"
                style={{ color: TEAL }}
              >
                The Capital Region Directory
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-5"
              >
                Every town. One front door.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl text-base md:text-lg text-white/65 leading-relaxed"
              >
                {totalTowns} Capital District communities — organized by county, mapped to local
                landmarks, and tied directly into each town's lifestyle network.
              </motion.p>
            </div>
          </section>

          {/* Matrix */}
          <section className="px-6 pb-32">
            <div className="max-w-6xl mx-auto">
              {/* DESKTOP: 2-col county grid */}
              <div className="hidden md:grid md:grid-cols-2 gap-x-10 gap-y-14">
                {COUNTIES.map((c, idx) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CountyHeader county={c} />
                    <ul className="divide-y divide-white/10 border-t border-b border-white/10">
                      {c.towns.map((t) => (
                        <TownRow key={t.slug} town={t} />
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* MOBILE: accordion */}
              <div className="md:hidden space-y-3">
                {COUNTIES.map((c) => {
                  const isOpen = openCounty === c.name;
                  return (
                    <div
                      key={c.name}
                      className="rounded-2xl border border-white/10 overflow-hidden"
                      style={{ background: "#1E2230" }}
                    >
                      <button
                        onClick={() => setOpenCounty(isOpen ? null : c.name)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <div>
                          <div className="text-base font-semibold">{c.name}</div>
                          <div className="text-[11px] text-white/55 mt-0.5">{c.landmark}</div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-white/60 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <ul className="divide-y divide-white/10 border-t border-white/10">
                          {c.towns.map((t) => (
                            <TownRow key={t.slug} town={t} />
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
};

const CountyHeader = ({ county }: { county: County }) => (
  <div className="mb-4 flex items-start justify-between gap-4">
    <div>
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2"
        style={{ color: TEAL }}
      >
        County
      </p>
      <h2 className="text-2xl font-semibold tracking-tight">{county.name}</h2>
      <p className="text-sm text-white/55 mt-1 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        {county.landmark}
      </p>
    </div>
    <span className="text-xs text-white/45 mt-2">{county.towns.length} towns</span>
  </div>
);

const TownRow = ({ town }: { town: Town }) => (
  <li>
    <Link
      to={`/living-in/${town.slug}`}
      className="group flex items-center justify-between px-4 md:px-2 py-4 hover:bg-white/[0.04] transition-colors"
    >
      <span className="text-[15px] md:text-base font-semibold text-white">{town.name}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs md:text-sm text-white/55 tabular-nums">
          Median {town.median}
        </span>
        <ChevronRight
          className="w-4 h-4 text-white/35 transition-all group-hover:translate-x-0.5"
          style={{ color: "rgba(94,234,212,0.6)" }}
        />
      </div>
    </Link>
  </li>
);

export default Communities;
