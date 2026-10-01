// Build-time switches (set in Cloudflare Pages → Settings → Environment variables).
//
// PUBLIC_SITE_LIVE=true: allow indexing. Until then every page is noindex and
//                           robots.txt disallows all, so previews never compete in search.
// PUBLIC_KIT_CHECKOUT_URL: where "Get the California Small Claims Kit" points.
//                           Unset = the button is shown as not yet available.
export const SITE_LIVE = import.meta.env.PUBLIC_SITE_LIVE === "true"
export const KIT_CHECKOUT_URL: string | undefined = import.meta.env.PUBLIC_KIT_CHECKOUT_URL || undefined

// Business details used on legal pages and checkout copy.
export const COMPANY = "PeopleShine Inc."
export const BRAND = "LegalFriend"
export const SUPPORT_EMAIL = "support@legalfriend.ai"
export const LEGAL_EFFECTIVE_DATE = "October 1, 2026"
export const KIT_PRICE_LABEL = "$79"

// Retirement of the hosted Lease Review service (lease.legalfriend.ai).
export const LEASE_SERVICE_ENDED = "October 1, 2026"
export const LEASE_ACCESS_UNTIL = "October 31, 2026"
export const LEASE_DELETION_BY = "November 15, 2026"

// California Lease Review Kit. The landing copy is new: keep it out of search until the
// attorney approves it (flip LEASE_LANDING_APPROVED), and the CTA off until checkout exists.
export const LEASE_LANDING_APPROVED = false
export const LEASE_KIT_CHECKOUT_URL: string | undefined = import.meta.env.PUBLIC_LEASE_KIT_CHECKOUT_URL || undefined
export const LEASE_KIT_PRICE_LABEL = "$49"
