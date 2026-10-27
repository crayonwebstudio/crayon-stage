# Final implementation report: TYPO3 to Astro migration (staging)

Date: 2026-10-27. Target: https://stage.woodwolfdigital.com (Astro 4.16,
static nginx on Coolify). Master: https://crayonwebstudio.com (TYPO3).

## 1. Pages discovered / implemented

- Master pages discovered: 23 (10 pages, 9 service routes, 4 blog details).
- Astro pages implemented: 23 master pages + 1 staging sitemap review page
  = 24 routes, verified in the production build.
- Pages incomplete in design terms: none missing; inner pages were restyled
  from plain text to the wide live layout (1300px, bold headings, card
  grids, live images). Homepage design is the verified Artech conversion
  with Crayon content, not a pixel rebuild of the Next.js homepage.

## 2. Components created or reused

- Created: src/components/Footer.astro (single footer source of truth),
  src/data/navigation.ts, src/data/site.ts, docs/migration/*.
- Reused: src/layouts/Base.astro (head, theme CSS/JS, form guard),
  fragment-based pages (Artech HTML converted, no WordPress/PHP runs).

## 3. Assets migrated

- All portfolio (6), blog thumbnail (4), about (office photo, shape,
  arrow), service detail (main + 2 detail images per service), careers
  hero, and logo/bird assets are real TYPO3 files served locally from
  public/crayon/. Images recompressed -26% (see lighthouse-report.md).
- Unreferenced assets removed (see lighthouse-report.md).

## 4. Navigation and routing changes

- Service routes moved to the master shape /service/<slug>/ with permanent
  nginx redirects from old stage /services/<slug>/ URLs; web-design
  redirects to /service/branding-design/.
- Category pages (7 Artech demo pages) and /services/web-design/ removed;
  they return 404. /work/* and /author/ already 404.
- Canonicals point at crayonwebstudio.com; staging stays noindex (meta,
  X-Robots-Tag, robots.txt Disallow).

## 5. SEO / AEO / GEO / SXO

- Unique titles/descriptions per page, production canonicals, QA sitemap
  (not submitted while staging), staging robots, Organization + WebSite
  JSON-LD (validated), breadcrumbs via sitemap hierarchy page, clear
  contact pathways, working internal links (sweep: no /work/, /category/,
  or old /services/<slug> links remain).

## 6. Structured data

- Organization, WebSite. No Service/Article/FAQ schema added yet; service
  and blog pages carry accurate titles/descriptions and can gain
  Service/BlogPosting schema in a follow-up without content changes.

## 7. Lighthouse

- No lab scores claimed: no Chrome binary on this VM, PageSpeed API quota
  exceeded previously. See lighthouse-report.md for the measured asset
  baseline and the theme-asset limitation.

## 8. Desktop and mobile validation

- Desktop browser checks passed for homepage (hero, badge, values order,
  tabs, slider images), footer, and about page structure. Mobile
  fat-nav hamburger under 768px remains unverified from earlier work.
  Full mobile visual comparison is an open item.

## 9. Forms and integrations tested

- Contact form: rebuilt with live fields, front end only on staging with
  an on-page note. Newsletter form: same guard in Base.astro. No form
  backend is claimed working. No GSC/GA connected (needs owner access).

## 10. Build and deployment status

- `npm run build` succeeds (24 routes + 404). Deploys via Coolify
  (project crayon-stage, app stage). Latest migration deploy verified
  live 2026-10-27 (routes 200, redirects 301, removed URLs 404).

## 11. Remaining issues and blockers (explicit)

- Lighthouse lab run still to do in Chrome DevTools (see section 7).
- Mobile visual comparison still to do.
- Header/nav still duplicated per fragment; only the footer was
  centralized in this batch.
- /service/branding-design serves web design content on live; kept
  faithful, owner decision pending on whether live is mistaken.
- Form backend endpoint decision pending (TYPO3 backend vs new endpoint).
- GSC/GA access pending owner authorization.
- Production launch checklist: flip staging noindex off, replace
  robots.txt with master robots, submit production sitemap, point
  canonicals (already production) and verify.

## 12. Manual steps required before production launch

1. Owner confirms branding-design question and mobile check.
2. Choose and connect a form endpoint; remove staging form notes.
3. Connect GSC/GA, submit sitemap, flip indexing on, verify live domain.
4. Run Lighthouse in DevTools and record scores in lighthouse-report.md.
