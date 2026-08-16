import { TalkToScottButton } from "@/components/property/TalkToScott";
import { realEstateDisclosure } from "@/config/realEstateDisclosure";

const PLACEMENT = "homepage-talk-to-scott";

/**
 * Final homepage chapter. Human close, no form, no auto-dial —
 * every outbound action stays user-initiated inside the dialog.
 */
const TalkToScottChapter = () => (
  <section
    id="talk-to-scott"
    className="relative w-full overflow-hidden bg-[#080B12] border-t border-white/[0.06] scroll-mt-24"
  >
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(55% 60% at 50% 0%, rgba(94,234,212,0.10), transparent 70%)",
      }}
    />
    <div className="relative max-w-3xl mx-auto px-5 sm:px-6 py-24 md:py-32 text-center">
      <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
        Human Judgment
      </p>
      <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-white text-balance">
        When the decision gets real, talk to a person.
      </h2>
      <p className="mt-5 text-[15px] md:text-lg text-white/65 font-light leading-relaxed">
        Tools organize the evidence. A licensed local professional interprets it,
        flags what is missing, and tells you what to verify before you commit.
      </p>

      <div className="mt-9 flex justify-center">
        <TalkToScottButton context={{ placement: PLACEMENT }} label="Talk to Scott" />
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-white/40">
        {`${realEstateDisclosure.agent_name}, ${realEstateDisclosure.license_title}. ${realEstateDisclosure.equal_housing_text}.`}
      </p>
    </div>
  </section>
);

export default TalkToScottChapter;
