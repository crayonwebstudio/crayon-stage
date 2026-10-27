# Migration audit

## Master website

- URL: https://crayonwebstudio.com, TYPO3 12 headless backend
  (typo312.crayonwebstudio.com) with a Next.js frontend (t3headless).
- Public pages: 23 (see page-inventory.md). No legal pages, no shop/cart
  pages, no search results pages in the sitemap.
- Assets: images served from typo312 fileadmin/user_upload and fileadmin
  root. Portfolio images, blog thumbnails, about images, and service images
  have been downloaded to public/crayon/ and are served locally.
- Brand: Crayonweb Studio, bird logo (grey facets), primary yellow #FCD16E,
  contact info@crayonwebstudio.com, hr@crayonwebstudio.com (CVs),
  +91 9624052424, Bhavnagar address above.

## Existing Astro project (Phase 2 findings, 2026-10-27)

- Astro 4.16, npm, `npm run build` = astro build + scripts/generate-sitemap.mjs
  (QA sitemap only, not submitted).
- Deployment: Dockerfile (node:22-alpine build, nginx:alpine serve), Coolify
  project crayon-stage, app stage, domain stage.woodwolfdigital.com.
- Architecture: src/layouts/Base.astro (head, meta, theme CSS/JS, form guard)
  + src/pages/**.astro each importing one src/fragments/*.html as raw HTML.
  Fragments are converted Artech template HTML (supplied files only, no
  WordPress/PHP runs) with Crayon content set into them.
- Staging guards (must stay until production launch): meta robots
  noindex,nofollow, nginx X-Robots-Tag noindex,nofollow, sitemap QA only.
- Known architecture debts to fix in Phase 3/4:
  - Footer duplicated in 31 fragments instead of one shared component.
  - Navigation duplicated per fragment (offcanvas menu) instead of central data.
  - Canonicals point at the staging domain; per migration spec they must
    point at the production domain (crayonwebstudio.com) while staging stays
    noindex.
  - og:site_name in Base.astro still says "Design Studio" (template leftover).
  - Theme CSS/JS lives under public/wp-content/ (static files only, no WP).
    Path migration to /assets/ is parked pending owner go-ahead; it does not
    block the migration.
  - Assets under public/wp-content/uploads are Artech demo files; demo-only
    images (blog slider dummies, work pages) are being replaced or removed.
- Verified live states: homepage (Artech sections + Crayon content), footer,
  portfolio slider, tabs, badge, values order, sitemap hierarchy, all 23
  master routes returning 200, all 4 blog details, all 4 career roles.

## Reusable components (target)

Header/nav, Footer, Hero, ServiceCard, ProjectCard, BlogCard, Stats,
SkillBars, Testimonials, CTA, Breadcrumbs, ContactBlock, SEO head. New inner
pages use shared inline section patterns first (matching live design), then
fold genuinely repeated patterns into src/components/*.astro.

## Interactions

- Offcanvas menu (jQuery restored), portfolio tabs + slider (Swiper),
  testimonial slider, FAQ accordion, rotating badge (CSS animation),
  back-to-top, newsletter form (front end only on staging, see Base.astro).

## Unresolved issues

- Category pages and /services/web-design removal + redirect (see inventory).
- Services URL mismatch: stage /services/<slug> vs master /service/<slug>
  for 7 services. Decide: move routes to /service/<slug> with redirects from
  old stage URLs, or keep stage URLs and record mapping. Master precedence
  says move to /service/<slug>.
- Live service page section details: audit subagent report pending at time
  of writing; service rebuilds use it.
- Lighthouse: not yet measured on the rebuilt site (Phase 8).

## Template design assets retained (not content)

Homepage capability card hover images (1-1.jpg, 2-1.jpg, 3-1.jpg, 4-1.jpg,
5.jpg and the numbered .svg icons under public/wp-content/uploads) are Artech
template design elements of the homepage layout milan chose as the stage
design base. They are not content images and were not replaced, because the
live capability cards have no equivalent per-card photos. All content images
(portfolio, blog, about, service, career, testimonial) are real TYPO3 assets.
