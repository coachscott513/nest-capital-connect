# Answer Pilot — acceptance package

Status: **built, tested, NOT released.** `ANSWER_PILOT_ENABLED = false` in
`src/lib/answerPilotFlag.ts`. No public business route renders the pilot.

## 1. Frozen cohorts

- `public.answerability_pilot_cohort` holds both arms with frozen snapshot
  fields (canonical URL, town, category, GSC impressions/clicks at selection).
- `trg_protect_frozen_cohort` blocks updates and deletes once a row is frozen,
  so the experiment set cannot drift mid-flight.
- 20 pilot pages, plus a matched 20-page control cohort of comparable
  high-impression profiles that receive no pilot treatment.
- The client-side list in `src/lib/answerPilotFlag.ts` mirrors the frozen pilot
  slugs and is the only set the flag will ever render.

## 2. Readiness derives from evidence, not eligibility

- `v_business_field_evidence` records which authoritative source supports each
  individual field (phone, website, hours, services).
- `v_business_answerability_readiness` reads that view: a profile stays at
  `identity_only` until its contact and service fields carry authoritative
  evidence. Profile-level eligibility alone can no longer promote a page.

## 3. Ask Nest data minimization

| Rule | Where enforced |
| --- | --- |
| `report_incorrect` may be fully anonymous | client, edge function, DB check `ask_nest_requests_contact_minimization` |
| All other types: name + **email OR phone** (never both) | same three layers |
| Honeypot field, silently accepted | `submit-ask-nest` |
| 5 requests per rolling hour per coarse salted fingerprint | `ask_nest_rate_limits`, hourly buckets |
| PII erased 180 days after close | `purge_ask_nest_pii()` |

Verified live against the deployed function:

| Case | Result |
| --- | --- |
| Anonymous correction, no contact fields | 200, stored |
| Name + email only, `Referer: chatgpt.com` | 200, `technical_source_family = ai_assistant` |
| Name + phone only | 200, stored |
| Non-correction with no contact details | 400 `contact required` |
| Honeypot filled | 200, nothing stored |
| 6th and 7th request in one hour | 429 |

## 4. Response promise, operationalized

- `/admin/ask-nest` — private inbox: unread indicator, overdue flag, status,
  owner, outcome, and the created/reviewed/resolved/closed timeline.
- `due_at` defaults to `ask_nest_next_business_day(now())`, so Friday–Sunday
  requests are due Monday.
- Each submission emails `team@capitaldistrictnest.com` (best effort — a mail
  failure never fails the visitor's request).
- Only admins can read or update the queue; grants are `authenticated`
  (gated by `has_role`) plus `service_role`.

## 5. Attribution

- Anonymous `session_id` (`src/lib/visitSession.ts`) links a landing visit to a
  later submission.
- `submit-ask-nest` resolves first touch **server-side** from the session's
  earliest engagement event; the Referer allowlist is the fallback.
  `first_touch_evidence` records which path was used
  (`server_session_lookup` / `server_referer_only` / `unavailable`).
- Self-reported discovery is stored separately and never becomes
  `traffic_source`.
- The edge function writes the single `ask_nest_submit` analytics event, so
  submissions cannot be double-counted from the browser.

## 6. Privacy boundary

`message`, `contact_name`, `contact_email`, `contact_phone` exist only in
`ask_nest_requests`. `engagement_events` receives request type, surface,
business/town slug, route, traffic class/source, and first-touch labels only.

## 7. Reversible release

Flip `ANSWER_PILOT_ENABLED` to `true` to activate; flip it back to roll back.
`shouldRenderAnswerPilot()` additionally requires the render to be additive —
no slug, canonical, title, meta, or index-state change — and phone, website and
directions actions always route straight to the business.

## Awaiting founder approval before activation.
