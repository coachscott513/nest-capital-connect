import { Phone, ExternalLink, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import type { FeaturedProperty } from "@/data/featuredProperties";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: FeaturedProperty;
}

const ListingAgentModal = ({ open, onOpenChange, property }: Props) => {
  const { agent, brokerage, mls, source, address } = property;
  const telHref = agent.phone ? `tel:${agent.phone.replace(/\D/g, "")}` : undefined;
  const inquiryHref = `/homes/partner-inquiry?intent=property-inquiry&property=${encodeURIComponent(
    address.line1,
  )}&town=${property.townSlug}&agent=${encodeURIComponent(agent.name)}&source=${encodeURIComponent(
    `${mls.name} #${mls.number}`,
  )}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E2230] border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Listing Agent</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-[#5eead4]/15 border border-[#5eead4]/30 flex items-center justify-center text-[#5eead4] text-xl font-semibold">
            {agent.initials}
          </div>
          <div>
            <div className="text-white font-semibold text-lg leading-tight">
              {agent.name}
            </div>
            <div className="text-sm text-white/70">{brokerage.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          {agent.phone && (
            <Row label="Agent phone" value={agent.phone} />
          )}
          {brokerage.phone && (
            <Row label="Brokerage" value={brokerage.phone} />
          )}
          <Row label="Source" value={`${mls.name} #${mls.number}`} />
          <Row label="Property" value={address.line1} />
        </div>

        <div className="flex flex-col gap-2 pt-3">
          {telHref && (
            <a href={telHref} className="btn-dark-cta inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Agent
            </a>
          )}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-apple-dark inline-flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> View Original Source
          </a>
          <Link
            to={inquiryHref}
            className="btn-primary-apple inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Ask About This Property
          </Link>
        </div>

        <p className="text-[11px] text-white/50 pt-3 border-t border-white/10">
          This contacts the listing source / listing agent, not Capital
          District Nest. Capital District Nest is a local media and search
          platform and does not represent buyers or sellers.
        </p>
      </DialogContent>
    </Dialog>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-3 border-b border-white/5 py-1.5">
    <span className="text-white/55 text-xs uppercase tracking-wider">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);

export default ListingAgentModal;
