import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ClosingTeamMember = {
  id: string;
  role_category: string;
  service_area: string | null;
  relationship_disclosure: string | null;
  partner: { id: string; name: string | null; company: string | null; website: string | null } | null;
};

/**
 * Reads only APPROVED Closing Team membership. RLS also enforces this —
 * proposed / paused / archived rows are never public.
 */
export function useClosingTeam() {
  const [members, setMembers] = useState<ClosingTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from("closing_team_members")
        .select(
          "id, role_category, service_area, relationship_disclosure, partners:partner_id (id, name, company, website)",
        )
        .eq("membership_state", "approved")
        .order("display_order", { ascending: true });

      if (!alive) return;
      setMembers(
        ((data ?? []) as unknown as Array<Record<string, unknown>>).map((r) => ({
          id: String(r.id),
          role_category: String(r.role_category),
          service_area: (r.service_area as string) ?? null,
          relationship_disclosure: (r.relationship_disclosure as string) ?? null,
          partner: (r.partners as ClosingTeamMember["partner"]) ?? null,
        })),
      );
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { members, loading };
}

/** Factual, non-endorsing categories the Closing Team is organized around. */
export const CLOSING_TEAM_CATEGORIES = [
  {
    key: "financing",
    title: "Financing",
    copy: "Lenders and mortgage professionals who quote, pre-approve, and underwrite.",
  },
  {
    key: "attorney",
    title: "Real-estate attorneys",
    copy: "Contract review, negotiation of terms, and closing representation.",
  },
  {
    key: "inspection",
    title: "Home inspection",
    copy: "Condition inspections and specialty testing before a contingency expires.",
  },
  {
    key: "insurance",
    title: "Insurance",
    copy: "Homeowner, landlord, and flood coverage quoted ahead of closing.",
  },
  {
    key: "title",
    title: "Title / closing support",
    copy: "Title search, examination, and closing coordination where applicable.",
  },
  {
    key: "survey_appraisal",
    title: "Survey, appraisal & property management",
    copy: "Included only where the property type and transaction actually require it.",
  },
] as const;
