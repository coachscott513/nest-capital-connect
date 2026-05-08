import { ArrowUpRight } from "lucide-react";

export interface LocalPartner {
  id: string;
  name: string;
  category: string;
  tagline: string;
  href?: string;
  accent?: string; // tailwind gradient classes
}

interface Props {
  townName?: string;
  eyebrow?: string;
  headline?: string;
  sub?: string;
  partners?: LocalPartner[];
  variant?: "light" | "dark";
}

const DEFAULT_PARTNERS: LocalPartner[] = [
  {
    id: "broadview",
    name: "Broadview Federal Credit Union",
    category: "Local Lending",
    tagline: "Local lending and first-time buyer programs built for Capital District families.",
    href: "https://www.broadviewfcu.com",
    accent: "from-[#0d6e66]/25 via-[#0d6e66]/10 to-transparent",
  },
  {
    id: "us-mortgage",
    name: "US Mortgage",
    category: "Mortgage",
    tagline: "Low down payment and investor financing options across New York State.",
    href: "https://www.usmortgage.com",
    accent: "from-[#c9a449]/25 via-[#c9a449]/10 to-transparent",
  },
  {
    id: "deangelis-law",
    name: "DeAngelis Law Firm",
    category: "Real Estate Attorney",
    tagline: "Capital District residential real estate closings — calm, clear, and on time.",
    href: "#",
    accent: "from-[#0e0f12]/20 via-[#0e0f12]/5 to-transparent",
  },
];

const TrustedLocalPartners = ({
  townName = "Delmar",
  eyebrow = "Trusted Local Partners",
  headline,
  sub = "Recommended lenders, attorneys, and local services connected to the community.",
  partners = DEFAULT_PARTNERS,
  variant = "light",
}: Props) => {
  const isDark = variant === "dark";
  return (
    <section
      className={`${isDark ? "bg-[#0e0f12] text-white" : "bg-white text-[#1d1d1f]"} py-24 md:py-32 px-6 md:px-10`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <p className={`eyebrow-apple mb-3 ${isDark ? "text-[#5eead4]" : "text-[#0d6e66]"}`}>
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
            {headline ?? <>Local partners {townName} trusts.</>}
          </h2>
          <p className={`mt-5 text-lg font-light ${isDark ? "text-white/65" : "text-[#1d1d1f]/65"}`}>
            {sub}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {partners.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <a
                key={p.id}
                href={p.href || "#"}
                target={p.href?.startsWith("http") ? "_blank" : undefined}
                rel={p.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group block overflow-hidden rounded-[28px] border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                    : "border-[#1d1d1f]/[0.06] bg-[#f5efe4] hover:bg-[#f1ead d]"
                }`}
              >
                <div className={`grid md:grid-cols-5 gap-0 ${reverse ? "md:[direction:rtl]" : ""}`}>
                  {/* Visual */}
                  <div
                    className={`md:col-span-2 aspect-[16/10] md:aspect-auto md:min-h-[320px] relative overflow-hidden bg-gradient-to-br ${p.accent ?? "from-[#0d6e66]/20 to-transparent"}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-[120px] md:text-[160px] font-semibold tracking-tight transition-transform duration-700 group-hover:scale-105 ${
                          isDark ? "text-white/15" : "text-[#0d6e66]/25"
                        }`}
                      >
                        {p.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center [direction:ltr]">
                    <span
                      className={`text-xs font-semibold tracking-[0.12em] uppercase mb-4 ${
                        isDark ? "text-[#5eead4]" : "text-[#0d6e66]"
                      }`}
                    >
                      {p.category}
                    </span>
                    <h3 className="text-2xl md:text-[34px] font-semibold tracking-tight leading-[1.1]">
                      {p.name}
                    </h3>
                    <p
                      className={`mt-4 text-base md:text-lg font-light leading-relaxed max-w-xl ${
                        isDark ? "text-white/65" : "text-[#1d1d1f]/65"
                      }`}
                    >
                      {p.tagline}
                    </p>
                    <span
                      className={`mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 ${
                        isDark ? "text-white" : "text-[#0d6e66]"
                      }`}
                    >
                      Explore Partner <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <p
          className={`mt-12 text-center text-sm ${isDark ? "text-white/40" : "text-[#1d1d1f]/40"}`}
        >
          Curated by Capital District Nest. Want to be considered?{" "}
          <a href="/claim-business" className={isDark ? "text-[#5eead4] underline" : "text-[#0d6e66] underline"}>
            Apply here
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default TrustedLocalPartners;
