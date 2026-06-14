import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Phone, Mail, Globe, Facebook, Instagram, Linkedin, Youtube, ExternalLink, Lock } from "lucide-react";
import type { TownAgent } from "@/data/townPropertyBoard";
import { Link } from "react-router-dom";

type Props = {
  agent: TownAgent | null;
  townName: string;
  townSlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AgentBusinessCard = ({ agent, townName, townSlug, open, onOpenChange }: Props) => {
  if (!agent) return null;
  const featured = !!agent.featured;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#0B0F19] border-white/10 text-white p-0 overflow-hidden">
        {featured ? (
          <div>
            <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5eead4] to-[#0d6e66] flex items-center justify-center text-2xl font-semibold text-[#0B0F19]">
                {agent.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-block text-[10px] tracking-widest uppercase text-[#5eead4] bg-[#5eead4]/10 border border-[#5eead4]/30 px-2 py-0.5 rounded-full mb-2">
                  Featured {townName} Agent
                </div>
                <div className="text-xl font-semibold leading-tight">{agent.name}</div>
                <div className="text-sm text-white/65">{agent.brokerage}</div>
              </div>
            </div>

            <div className="px-6 py-4 grid grid-cols-2 gap-3 border-b border-white/10">
              {agent.phone && (
                <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm text-white hover:text-[#5eead4]">
                  <Phone className="w-4 h-4" /> {agent.phone}
                </a>
              )}
              {agent.email && (
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-white hover:text-[#5eead4] truncate">
                  <Mail className="w-4 h-4" /> <span className="truncate">{agent.email}</span>
                </a>
              )}
              {agent.website && (
                <a href={agent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-[#5eead4]">
                  <Globe className="w-4 h-4" /> Website
                </a>
              )}
              <div className="flex items-center gap-3 text-white/65">
                {agent.facebook && <a href={agent.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#5eead4]"><Facebook className="w-4 h-4" /></a>}
                {agent.instagram && <a href={agent.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#5eead4]"><Instagram className="w-4 h-4" /></a>}
                {agent.linkedin && <a href={agent.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#5eead4]"><Linkedin className="w-4 h-4" /></a>}
                {agent.youtube && <a href={agent.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#5eead4]"><Youtube className="w-4 h-4" /></a>}
              </div>
            </div>

            <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-white/10">
              <div>
                <div className="text-2xl font-semibold text-white">{agent.activeCount}</div>
                <div className="text-xs uppercase tracking-wider text-white/55">Active in {townName}</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{agent.soldLast12}</div>
                <div className="text-xs uppercase tracking-wider text-white/55">Sold last 12 mo</div>
              </div>
            </div>

            {!!agent.activeAddresses?.length && (
              <div className="px-6 py-4 border-b border-white/10">
                <div className="text-xs uppercase tracking-wider text-white/55 mb-2">Active listings</div>
                <ul className="space-y-1 text-sm text-white/85">
                  {agent.activeAddresses.map((a) => <li key={a}>· {a}</li>)}
                </ul>
              </div>
            )}

            {!!agent.recentSold?.length && (
              <div className="px-6 py-4 border-b border-white/10">
                <div className="text-xs uppercase tracking-wider text-white/55 mb-2">Recent sold activity</div>
                <ul className="space-y-1 text-sm text-white/85">
                  {agent.recentSold.map((a) => <li key={a}>· {a}</li>)}
                </ul>
              </div>
            )}

            <div className="px-6 py-4 flex flex-wrap gap-3">
              {agent.phone && (
                <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="btn-primary-apple inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Agent
                </a>
              )}
              {agent.website && (
                <a href={agent.website} target="_blank" rel="noopener noreferrer" className="btn-secondary-apple-dark inline-flex items-center gap-2">
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-xl font-semibold text-white">{agent.name}</div>
            <div className="text-sm text-white/65 mb-4">{agent.brokerage}</div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="text-2xl font-semibold text-white">{agent.activeCount}</div>
                <div className="text-xs uppercase tracking-wider text-white/55">Active in {townName}</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{agent.soldLast12}</div>
                <div className="text-xs uppercase tracking-wider text-white/55">Sold last 12 mo</div>
              </div>
            </div>

            <div className="rounded-xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-4 mb-4">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#5eead4] mt-0.5" />
                <div className="text-sm text-white/80">
                  <div className="font-medium text-white mb-1">Featured agent card available</div>
                  Add photo, social links, business card popup, and priority placement on the {townName} board.
                </div>
              </div>
            </div>

            <Link
              to={`/claim-business?category=real-estate&tier=featured&town=${townSlug}`}
              className="btn-dark-cta inline-flex w-full justify-center"
            >
              Request Featured Agent Placement
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgentBusinessCard;
