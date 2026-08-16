insert into public.engagement_event_types (event_type, is_active, category, description) values
('property_search_open', true, 'property', 'Homepage property search surface became interactive'),
('realscout_search_click', true, 'property', 'User engaged the RealScout property search widget or map link'),
('property_analysis_click', true, 'property', 'Click through to AnalyzeAnyProperty or an internal analyzer'),
('decision_path_click', true, 'property', 'Click on a Start With Your Decision card'),
('closing_team_open', true, 'property', 'Closing Team chapter or page opened'),
('closing_team_provider_open', true, 'property', 'Approved Closing Team provider opened'),
('home_services_open', true, 'property', 'Home Services rail or hub opened'),
('home_service_category_click', true, 'property', 'Home Services category clicked'),
('town_intelligence_open', true, 'property', 'Town intelligence rail or town card opened'),
('scott_contact_open', true, 'property', 'Talk to Scott concierge opened'),
('scott_call_click', true, 'property', 'Call Scott action clicked'),
('scott_text_click', true, 'property', 'Text Scott action clicked'),
('scott_email_click', true, 'property', 'Email Scott action clicked'),
('scott_schedule_click', true, 'property', 'Schedule with Scott action clicked')
on conflict (event_type) do update set is_active = true, category = excluded.category, description = excluded.description;

create table if not exists public.closing_team_members (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partners(id) on delete cascade,
  business_id uuid,
  role_category text not null,
  service_area text,
  membership_state text not null default 'proposed',
  evidence_reference text,
  relationship_disclosure text,
  effective_date date,
  review_due_date date,
  approved_by uuid,
  approved_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint closing_team_state_chk check (membership_state in ('proposed','approved','paused','archived')),
  constraint closing_team_subject_chk check (partner_id is not null or business_id is not null)
);

grant select on public.closing_team_members to anon;
grant select, insert, update, delete on public.closing_team_members to authenticated;
grant all on public.closing_team_members to service_role;

alter table public.closing_team_members enable row level security;

drop policy if exists "Public can read approved closing team members" on public.closing_team_members;
create policy "Public can read approved closing team members"
on public.closing_team_members for select
using (membership_state = 'approved');

drop policy if exists "Admins manage closing team members" on public.closing_team_members;
create policy "Admins manage closing team members"
on public.closing_team_members for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create index if not exists closing_team_members_state_idx on public.closing_team_members (membership_state, display_order);