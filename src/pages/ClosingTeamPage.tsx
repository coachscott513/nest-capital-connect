import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { ShieldCheck, Scale, Eye } from "lucide-react";
import { useClosingTeam, CLOSING_TEAM_CATEGORIES } from "@/components/property/useClosingTeam";
import { TalkToScottButton } from "@/components/property/TalkToScott";
import { realEstateDisclosure } from "@/config/realEstateDisclosure";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Inclusion is never sold",
    body: "No provider can pay to join the Closing Team, and no payment changes the order in which providers appear.",
  },
  {
    icon: Scale,
    title: "Neutral by role, not by relationship",
    body: "Providers are organized by the role they play in a transaction. Any business relationship is stated in plain language on the listing itself.",
  },
  {
    icon: Eye,
    title: "You are never required to use anyone here",
    body: "You may use any lender, attorney, inspector, or insurer you choose. This list exists to make the roles legible, not to steer you.",
  },
];

/**
 * Preview-only Closing Team page. Explicitly noindex until founder approval.
 */
const ClosingTeamPage = () => {
  const { members, loading } = useClosingTeam();

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="The Closing Team | Capital District Nest"
        description="How Capital District Nest organizes financing, legal, inspection, insurance, and closing support around a property transaction."
        noindex
      />
      <CleanHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(94,234,212,0.10), transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 py-24 md:py-32">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
              The Closing Team
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[1.03] text-white text-balance">
              The people who help move a transaction forward.
            </h1>
            <p className="mt-6 text-[16px] md:text-lg text-white/65 font-light leading-relaxed max-w-2xl">
              Buying property is not one decision. It is financing, legal review,
              inspection, insurance, and closing logistics — each handled by a
              different professional, each on its own clock.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
            The roles
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLOSING_TEAM_CATEGORIES.map((c) => (
              <div key={c.key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-[17px] font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-[14px] text-white/60 font-light leading-relaxed">{c.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16 md:pb-24">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
            Approved providers
          </h2>
          {!loading && members.length === 0 ? (
            <p className="mt-5 text-[15px] text-white/60 font-light leading-relaxed max-w-2xl">
              No providers have been approved yet. Rather than fill this page with
              placeholders, it stays empty until a real, named professional has been
              reviewed and approved — with any relationship disclosed.
            </p>
          ) : (
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <li key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                    {m.role_category}
                  </p>
                  <p className="mt-2 text-[17px] font-semibold text-white">
                    {m.partner?.company || m.partner?.name || "Provider"}
                  </p>
                  {m.service_area && (
                    <p className="mt-1 text-[13px] text-white/55">{m.service_area}</p>
                  )}
                  {m.relationship_disclosure && (
                    <p className="mt-3 text-[12px] text-white/45 leading-relaxed">
                      {m.relationship_disclosure}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border-t border-white/[0.06] bg-[#0E1220]">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 md:py-24">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white">
              How inclusion works
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p.icon className="w-5 h-5 text-[#5eead4]" />
                  <h3 className="mt-4 text-[17px] font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-[14px] text-white/60 font-light leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <TalkToScottButton
                context={{ placement: "closing-team-page" }}
                label="Ask which role you need next"
              />
            </div>

            <p className="mt-8 text-[12px] leading-relaxed text-white/40 max-w-3xl">
              {`${realEstateDisclosure.agent_name}, ${realEstateDisclosure.license_title}. ${realEstateDisclosure.equal_housing_text}.`}{" "}
              Capital District Nest is not a lender, law firm, inspection company,
              insurer, or title company, and does not provide financial, legal, or
              tax advice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ClosingTeamPage;
