# Verified report and guide self-email — November 24, 2026

## Rule
Only signed-in users whose account email is confirmed may request a guide or
report email, and the recipient must be that account's confirmed email.
Existing sent records, unrelated permissions, sender settings, providers and
public browsing remain unchanged.

## Every affected path inspected
- `JourneyLeadMagnet` is used by investor, first-time-buyer, land-buyer and
  financing journeys. All four now use `VerifiedEmailGate`, show a read-only
  confirmed account email, and invoke `send-journey-email` without supplying
  recipient, subject or guide content.
- The investor journey's separate browsing-only lead capture was read and
  retained. It does not invoke either email handler. Browser checks exercised
  its unlocked state with an intercepted insert rather than additional leads.
- `DelmarMarketReport` is retained in `DelmarHomesForSale` and
  `DelmarMarketInsights`; both callers were read. Their existing public aliases
  redirect to `/living-in/delmar` and remain unchanged. The retained component
  was mounted in a browser-only isolated root, using actual auth and its actual
  handler, to verify signed-out and signed-in states.
- Both email functions resolve the account with hosted `auth.getUser(token)`;
  missing/invalid sessions return 401, unconfirmed accounts return 403. Both
  derive the recipient from the hosted user, not request data. Resource choices
  are limited to existing server-owned guides and the existing Delmar report.
- Searches found only the two frontend callers above; there is no additional
  job or database function invoking these two handlers in the project sources.
- The retained Auth page and AuthForm were read. Auth was not mounted before;
  it is now available at `/auth` for the shared gate, with validated internal
  return paths. The existing partner sign-in route and hosted auth settings
  were not changed. Fresh signup/confirmation settings were not tested.

## Checks
- 42 tests passed: 14 tests execute the actual two function entrypoints with
  mocked hosted auth and mail transport; 2 return-path tests; 26 existing feed
  and directory-search tests.
- Concrete email-handler checks cover missing sessions, expired/invalid
  sessions, unconfirmed email, forged recipients/content, unknown resources,
  oversized names, and provider failure. Successful mocked sends target only
  the confirmed account plus the existing fixed internal notification address.
- Both functions deployed successfully and real anonymous/invalid-session
  requests returned 401.
- A temporary verified test user saw read-only account email on all four guide
  pages. A hydrated signed-in `/auth?redirect=...` returned to the requested
  guide page. Signed-out links opened the actual sign-in form.
- Actual guide submission through the financing page and actual retained
  report submission through the browser-only mount both reached the provider.
  The provider rejected both with 422, confirmed by restricted function logs.
  Client responses were safe 500 failures and did not claim delivery success.
  The provider's underlying rejection reason was not captured; delivery to a
  real confirmed mailbox remains unverified. Sender/provider configuration is
  outside this authorization and was left unchanged.
- Desktop 1440px and mobile 402px gate/report checks had no horizontal
  overflow. Screenshots inspected; signed-in checks had no page errors.
- Preview compilation: build OK. `git diff --check` passed.
- Only the two previously pending selected security findings were marked fixed.
  No other findings were fixed or ignored. App publication was not performed;
  deployed function protections apply immediately to the shared backend.