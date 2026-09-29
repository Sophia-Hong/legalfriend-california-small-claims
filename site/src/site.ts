// Build-time switches (set in Cloudflare Pages → Settings → Environment variables).
//
// PUBLIC_SITE_LIVE=true   — allow indexing. Until then every page is noindex and
//                           robots.txt disallows all, so previews never compete in search.
// PUBLIC_KIT_CHECKOUT_URL — where "Get the California Small Claims Kit" points.
//                           Unset = the button is shown as not yet available.
export const SITE_LIVE = import.meta.env.PUBLIC_SITE_LIVE === "true"
export const KIT_CHECKOUT_URL: string | undefined = import.meta.env.PUBLIC_KIT_CHECKOUT_URL || undefined

// Business details used on legal pages and checkout copy.
export const COMPANY = "PeopleShine Inc."
export const BRAND = "LegalFriend"
export const SUPPORT_EMAIL = "support@legalfriend.ai"
export const LEGAL_EFFECTIVE_DATE = "September 29, 2026"
export const KIT_PRICE_LABEL = "$79"
