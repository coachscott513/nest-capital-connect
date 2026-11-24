# Public navigation additive steering — Nov 24, 2026

Built on `1a00555720ce209488f3c458c51a3247b2c63e27`; the complete town/sidebar, mobile Towns dialog and Latest/Browse implementation is retained.

- Added a shared slim frosted public header: Live feed, Browse, Towns, Homes, Businesses, Finance & more. Uses Nest identity only; no Apple assets or new marketing content.
- Desktop groups open on click/keyboard via existing Radix popovers; Escape restores trigger focus after the closing transition and outside-click dismisses. Dropdowns scroll, preserve original section/column destinations and expose each existing section overview. No hover dependency.
- Mobile navigation is a separate modal menu with expandable groups, comfortable targets, focus trapping, Escape/outside dismissal and automatic close on link selection. The independent prominent Towns filtering dialog remains intact.
- Homepage view links preserve town/search and reset pagination via the original URL helper. Town-page links carry the town into homepage browsing. Existing destinations, including `/local`, homes, rentals, contractor categories and finance guides, remain reachable.
- `CleanHeader` chooses the new header on existing public routes only; legacy header rendering is retained on excluded private/auth/admin routes. Non-header page content/layout, palette, security, data, SEO and tracking files are unchanged.

## Verification
- 46 tests passed: all 43 browse/model/directory tests plus three header URL/destination tests.
- Preview compilation passed; diff whitespace check passed.
- Browser: 1440×1000, 390×844 and 320×844, each light/dark: no horizontal overflow or page errors. Same public header verified on `/towns/voorheesville` at all sizes/themes.
- Opened every desktop grouped menu; Enter, Escape/focus return and outside-click tested. Mobile Tab remained inside the modal; Escape restored focus. Mobile Browse → Businesses preserved `town=delmar&search=coffee`, closed navigation and displayed the existing browse area. Independent Towns dialog still opened afterward.
- Visually inspected `/tmp/browser/public-nav/1440-light-menu.png`, `390-dark-menu.png`, `320-light.png`, `1440-light-town.png` plus narrow/dark captures. Desktop menu remains compact; mobile menu and Towns control are separate.

No deployment, database writes, lead submissions, emails, accounts, auth changes, packages or integrations.