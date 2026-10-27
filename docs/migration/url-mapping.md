# URL mapping: master to Astro

Rule: master URL shape wins. Stage keeps staging noindex; canonicals point at
the production domain (crayonwebstudio.com) at launch readiness, per spec
Phase 7. During staging, canonicals in Base pages are updated to production
equivalents in the same change as the route moves below.

## Direct matches (no change)

| Master URL | Astro route |
|---|---|
| / | / |
| /about-us | /about-us/ |
| /portfolio | /portfolio/ |
| /blogs | /blogs/ |
| /contact | /contact/ |
| /careers | /careers/ |
| /ui-ux-designer | /ui-ux-designer/ |
| /business-development-executive | /business-development-executive/ |
| /seo-executive | /seo-executive/ |
| /front-end-developer | /front-end-developer/ |
| /services | /services/ |
| /service/branding-design | /service/branding-design/ |
| /pages/blog-detail/<slug> (4) | same |

## Routes moving to the master shape (301 from old stage URL)

| Old stage URL | New Astro route (master shape) |
|---|---|
| /services/web-development/ | /service/web-development/ |
| /services/branding-and-identity/ | /service/branding-and-identity/ |
| /services/smart-growth-marketing/ | /service/smart-growth-marketing/ |
| /services/cms-solution/ | /service/cms-solution/ |
| /services/mobile-application/ | /service/mobile-application/ |
| /services/media-creation-services/ | /service/media-creation-services/ |
| /services/ai-powered-business-solutions/ | /service/ai-powered-business-solutions/ |
| /services/web-design/ | /service/branding-design/ (master serves web design content there) |

Redirects are implemented in nginx.conf (permanent, no chains, no loops).

## Removed (no redirect target on master, return 404)

- /category/agency/, /category/branding-strategy/,
  /category/digital-solutions/, /category/typography/,
  /category/uncategorized/, /category/ux-ui-design/,
  /category/web-solutions/ (Artech demo pages, not on master).
- /work/* and /author/ (already removed 2026-10-27, verified 404).
- Old inner-page paths /inner-pages/* (template leftovers, if any remain).

## Trailing slash

Stage uses trailing-slash directory URLs (nginx try_files $uri $uri/).
Master Next.js serves without trailing slash; both forms resolve on stage,
canonical uses the trailing-slash form consistently.

## 404

Custom 404 page at /404.html (nginx error_page 404), styled with the site
header/footer, links to home, services, portfolio, blogs, contact.
