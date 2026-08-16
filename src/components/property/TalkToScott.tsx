import { useState, createContext, useContext, type ReactNode } from "react";
import { Phone, MessageSquare, Mail, CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SCOTT_NAME,
  SCOTT_PHONE_DISPLAY,
  SCOTT_PHONE_TEL,
  SCOTT_EMAIL,
} from "@/config/contact";
import { realEstateDisclosure } from "@/config/realEstateDisclosure";
import { SCOTT_SCHEDULING_URL } from "@/config/externalProducts";
import { logEngagement } from "@/lib/engagement";

const TEAL = "#0d6e66";
const RED_CALL = "#DC1C2E";

/**
 * Privacy-safe context carried with a Talk to Scott interaction.
 * Never include message bodies, names, addresses, phone numbers, emails,
 * MLS remarks, or private analysis details here.
 */
export type ScottContext = {
  placement: string;
  decisionType?: string;
  townSlug?: string;
  serviceSlug?: string;
};

const Ctx = createContext<ScottContext>({ placement: "unknown" });
export const ScottContextProvider = ({
  value,
  children,
}: {
  value: ScottContext;
  children: ReactNode;
}) => <Ctx.Provider value={value}>{children}</Ctx.Provider>;

const smsHref = SCOTT_PHONE_TEL.replace("tel:", "sms:");

function ActionRow({
  icon: Icon,
  iconColor,
  label,
  sub,
  href,
  onClick,
  external,
}: {
  icon: typeof Phone;
  iconColor?: string;
  label: string;
  sub: string;
  href: string;
  onClick: () => void;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-4 min-h-[56px] px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#5eead4]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4]"
    >
      <span
        className="w-10 h-10 rounded-full inline-flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        <Icon className="w-4 h-4" style={{ color: iconColor ?? "#5eead4" }} />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-white">{label}</span>
        <span className="block text-[13px] text-white/60 truncate">{sub}</span>
      </span>
    </a>
  );
}

/**
 * Shared premium "Talk to Scott" concierge used across property surfaces.
 * Every outbound action is a deliberate user tap — nothing is sent
 * automatically, and no CRM record or webhook is triggered.
 */
export function TalkToScottDialog({
  children,
  context,
}: {
  children: ReactNode;
  context?: ScottContext;
}) {
  const inherited = useContext(Ctx);
  const ctx = context ?? inherited;
  const [open, setOpen] = useState(false);

  const dims = { town_slug: ctx.townSlug, service_slug: ctx.serviceSlug };
  const meta = {
    source_location: ctx.placement,
    ...(ctx.decisionType ? { intent_type: ctx.decisionType } : {}),
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) logEngagement("scott_contact_open", {}, meta, dims);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-white/10 bg-[#0E1220] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-[-0.02em] text-white">
            Talk it through with {SCOTT_NAME.split(" ")[0]}.
          </DialogTitle>
          <DialogDescription className="text-white/65">
            Call, text, or email an experienced local real-estate professional.
            Nothing is sent until you choose an action.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-2.5">
          <ActionRow
            icon={Phone}
            iconColor={RED_CALL}
            label={`Call ${SCOTT_NAME.split(" ")[0]}`}
            sub={SCOTT_PHONE_DISPLAY}
            href={SCOTT_PHONE_TEL}
            onClick={() => logEngagement("scott_call_click", {}, meta, dims)}
          />
          <ActionRow
            icon={MessageSquare}
            label={`Text ${SCOTT_NAME.split(" ")[0]}`}
            sub={SCOTT_PHONE_DISPLAY}
            href={smsHref}
            onClick={() => logEngagement("scott_text_click", {}, meta, dims)}
          />
          <ActionRow
            icon={Mail}
            label={`Email ${SCOTT_NAME.split(" ")[0]}`}
            sub={SCOTT_EMAIL}
            href={`mailto:${SCOTT_EMAIL}`}
            onClick={() => logEngagement("scott_email_click", {}, meta, dims)}
          />
          {SCOTT_SCHEDULING_URL && (
            <ActionRow
              icon={CalendarClock}
              label="Choose a time"
              sub="Book a conversation"
              href={SCOTT_SCHEDULING_URL}
              external
              onClick={() => logEngagement("scott_schedule_click", {}, meta, dims)}
            />
          )}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-white/45">
          {`${realEstateDisclosure.agent_name}, ${realEstateDisclosure.license_title}. ${realEstateDisclosure.equal_housing_text}.`}
        </p>
      </DialogContent>
    </Dialog>
  );
}

/** Convenience button used in hero and chapter CTAs. */
export function TalkToScottButton({
  context,
  className,
  label = "Talk to Scott",
}: {
  context?: ScottContext;
  className?: string;
  label?: string;
}) {
  return (
    <TalkToScottDialog context={context}>
      <button
        type="button"
        className={
          className ??
          "inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full border border-white/15 bg-white/[0.05] text-white text-sm font-semibold hover:bg-white/[0.1] transition"
        }
        style={className ? undefined : { boxShadow: `0 0 0 1px ${TEAL}22` }}
      >
        {label}
      </button>
    </TalkToScottDialog>
  );
}

export default TalkToScottDialog;
