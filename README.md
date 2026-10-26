# Crayon Stage

Astro migration of the supplied Crayonweb Studio HTML export, deployed as a staging site at https://stage.woodwolfdigital.com.

## Indexing decision, locked for this site

This is a STAGING site, so it is NON-INDEXED. Do not submit it to Google Search Console and do not treat it as the public site.

- Every page carries `<meta name="robots" content="noindex, nofollow">`.
- `public/robots.txt` is `Disallow: /` for all agents.
- `nginx.conf` sends `X-Robots-Tag: noindex, nofollow` on every response.
- The sitemap files (`sitemap-index.xml`, `sitemap-0.xml`) are generated at build time for QA verification only. They are not referenced in robots.txt and must not be submitted to Google Search Console while this site is staging.
- Flipping to public indexing later is a deliberate change: remove the noindex meta, change robots.txt to allow crawling and reference the sitemap, remove the X-Robots-Tag, and only then submit the sitemap.

## Source

Source of truth: the supplied zip `stage_1_n8y1.zip` (17 MB, 329 files in the extracted crawl, 30 MB uncompressed). The zip and the extracted crawl are NOT committed here. The extracted crawl was used only for inspection, at `~/workspace/crayon-stage-source/` on the build machine.

The supplied pages are Next.js output from the live Crayonweb Studio site. No live fetch was used for this migration. No Next.js JavaScript chunks, no WordPress or Elementor bundles, no Google Tag Manager code, and no Google site verification token were carried over. The GTM container ID and the verification token found in the source head were deliberately dropped, because this is a staging site with no tracking configured.

## Page inventory and URL mapping

14 supplied pages are built, plus a custom 404 page. Total built routes: 15 files (14 pages plus 404.html).

| Supplied file | Clean route | Title source |
|---|---|---|
| index.htm | / | Crayonweb Studio - Creative Digital Studio, TYPO3 Agency, TYPO3 Headless CMS |
| about-us.html | /about-us/ | About Us |
| service/ai-powered-business-solutions.html | /service/ai-powered-business-solutions/ | AI-Powered Business Solutions, AI Video Production and Automation by Crayonweb |
| service/branding-and-identity.html | /service/branding-and-identity/ | Professional Branding and Identity Services, Distinctive Brand Design by Crayonweb |
| service/branding-design.html | /service/branding-design/ | Professional Web Design Services, Custom Responsive Websites by Crayonweb |
| service/cms-solution.html | /service/cms-solution/ | CMS Solutions, Custom Content Management System Services by Crayonweb |
| service/media-creation-services.html | /service/media-creation-services/ | Creative Visual Production Services, Video, Motion Graphics and Animation by Crayonweb Studio |
| service/mobile-application.html | /service/mobile-application/ | Mobile App Development Services, Custom iOS and Android Apps by Crayonweb |
| service/smart-growth-marketing.html | /service/smart-growth-marketing/ | Professional SEO Services, Boost Your Search Rankings and Traffic Services by Crayonweb |
| service/web-development.html | /service/web-development/ | Crayonweb Web Development Services, Custom Websites and Applications |
| pages/blog-detail/complete-step-by-step-guide-to-installing-and-setting-up-coolify-on-a-vps.html | /blog-detail/complete-step-by-step-guide-to-installing-and-setting-up-coolify-on-a-vps/ | Complete Step-by-Step Guide to Installing and Setting Up Coolify on a VPS |
| pages/blog-detail/how-to-install-typo3-v13-lts-using-composer-step-by-step-guide.html | /blog-detail/how-to-install-typo3-v13-lts-using-composer-step-by-step-guide/ | How to Install TYPO3 v13 LTS Using Composer (Step-by-Step Guide) |
| pages/blog-detail/typo3-v14-lts-the-next-generation-of-enterprise-cms.html | /blog-detail/typo3-v14-lts-the-next-generation-of-enterprise-cms/ | What is New in TYPO3 v14 - The Biggest Leap Toward a Modern CMS Future |
| pages/blog-detail/whats-new-in-typo3-v14-a-complete-overview-for-2025.html | /blog-detail/whats-new-in-typo3-v14-a-complete-overview-for-2025/ | What is New in TYPO3 v14 - The Biggest Leap Toward a Modern CMS Future |

URL changes, documented: the `.htm` and `.html` extensions were removed for clean routes. nginx.conf returns 301 redirects for the old paths: `/index.htm` to `/`, `/about-us.html` to `/about-us/`, `/service/<slug>.html` to `/service/<slug>/`, and `/pages/blog-detail/<slug>.html` to `/blog-detail/<slug>/`. No other redirects were added, and missing URLs are never redirected to the homepage. They return the custom 404 page.

## Pages added after the initial migration

The blog list, services index, portfolio, careers, and contact pages were not in the supplied zip. They were later built from live content verified by curl (titles, headings, lists, and links), with no invented forms, endpoints, or prices, and are now live routes: `/blogs/`, `/services/`, `/portfolio/`, `/careers/` plus 4 role pages, and `/contact-us/` (front end only form, email message, no backend). Blog category and tag pages (blogs-1.html through blogs-27.html) are still not built, and return the custom 404 page.

Other gaps, carried over from the source, not fixed by invention:

- The main navigation menu in the supplied HTML was loaded by JavaScript from the live TYPO3 API and contained only a "Loading..." placeholder in the static files. The header navigation in this project was rebuilt from the supplied page links only: Home, About Us, the 8 service pages, and the 4 blog posts, plus a mailto contact link. There is no contact page link, because no contact page was supplied.
- Images in the source have no alt text (236 image references in the built site, all with empty alt in the source). No alt text was invented. Alt text still needs real descriptions from the content owner.
- The two TYPO3 v14 blog posts share the same title in the source, so they share a title tag here. That duplicate is from the source, not created by this migration.
- The homepage meta description from the source is 388 characters, longer than the usual display length. It was kept as supplied, not rewritten.
- Heading order follows the source (for example, small eyebrow headings marked h6 appear before the h1 on the homepage). It was kept as supplied, not restructured, to preserve the original layout.
- The Font Awesome thin font file in the source (`fa-thin-100.ttf.html`) is an HTML artifact, not a font, so its `@font-face` rule was dropped. Thin-weight icons fall back to the other Font Awesome weights.
- The home video section in the source is an image with a play icon and no video URL, so it renders as an image here. No video was invented.
- The subscribe form and the blog search form are front end only. Submitting shows a message explaining nothing was sent and gives the email address instead. No endpoint, API key, or backend was invented.

## Assets and deduplication

Supplied asset counts in the zip: 131 PNG, 126 JPEG, 24 SVG, 19 TTF fonts, 2 CSS files, 10 JavaScript files (Next.js chunks, not copied).

Deduplication result: the `_next` image files include resized variants with `-1` to `-5` suffixes for each image. Only the unsuffixed, full-size canonical file was copied for each image. The resized variants (212 extra files) were dropped. Result in `public/images/`: 68 images, of which 64 are referenced by the built pages and 4 are kept for the header and 404 page (logo, bird icon, crayon icon, 404 artwork). All 236 image references in the built output resolve to files in `dist/`, with 0 missing references at build QA time.

Fonts in `public/fonts/`: MonaSans (Bold, Light, Medium, SemiBold), Font Awesome (brands, duotone, light, regular, solid, v4 compatibility), and Hanken Grotesk (9 weights, in `public/fonts/hanken/`).

Styles: the supplied compiled CSS (`_next/static/css/dffa43b5d2dfe829.css`, 393 KB) is kept in `public/css/original.css` with its font URLs rewritten to `/fonts/` and its Google Fonts import replaced by the local Hanken Grotesk stylesheet in `public/css/hanken.css`. `public/css/site.css` adds only the header, dropdown, accordion, slider fallback, and reduced-motion rules. `public/js/site.js` is the only client script: mobile menu, dropdowns on small screens, accordion toggles, and front end form messages. No React, no Swiper library, no Bootstrap JavaScript. Sliders in the source render as horizontally scrollable rows, so all slides stay reachable without the library.

## Architecture

```text
crayon-stage/
├── public/
│   ├── images/          # deduplicated supplied images
│   ├── fonts/           # supplied fonts, including hanken/
│   ├── css/             # original.css, hanken.css, components.css, site.css
│   ├── js/site.js       # minimal vanilla interactions
│   └── robots.txt       # Disallow: / (staging)
├── src/
│   ├── components/      # Header.astro, Footer.astro
│   ├── layouts/Base.astro
│   ├── fragments/       # cleaned body sections from the supplied HTML
│   ├── pages/           # 14 pages plus 404.astro
│   └── styles/site.css
├── scripts/generate-sitemap.mjs
├── astro.config.mjs
├── package.json
├── Dockerfile
└── nginx.conf
```

Page bodies are the cleaned sections from the supplied HTML, with Next.js scripts, animation inline styles, blur placeholder backgrounds, and `srcset` query strings removed, and with image and link URLs rewritten to the clean routes above. The header and footer are real Astro components. The footer body and subscribe form are the cleaned supplied fragments.

## SEO, AEO, GEO, SXO checklist, what was actually done

- Unique title and meta description per page, taken from the supplied HTML, except the About page, which had no description in the source and uses its supplied lead sentence, and the duplicate TYPO3 v14 titles, which are a source duplicate noted above.
- Canonical URL on every page, using https://stage.woodwolfdigital.com plus the clean route.
- Robots noindex, nofollow on every page, plus robots.txt Disallow and the nginx X-Robots-Tag, because this is staging.
- Open Graph and Twitter card metadata on every page, from the same title and description.
- Semantic HTML5 from the supplied markup, a skip link, labelled form fields, keyboard accessible accordion and menu toggles, and a `prefers-reduced-motion` rule.
- JSON-LD on every page: Organization and WebSite on all pages, BreadcrumbList where a breadcrumb applies, Service on the 8 service pages, Article on the 4 blog posts, WebPage on the homepage and About page. No ratings, reviews, prices, or credentials were added, because none are in the supplied content.
- Images: lazy loading kept for below-fold images, removed for the first section of each page so hero images load eagerly. Image dimensions from the source are kept where supplied, to reduce layout shift.
- Performance: no frameworks, one small client script, one large supplied CSS file kept as is, fonts self-hosted, no third-party scripts, no tracking.
- AEO and GEO: content is rendered as crawlable HTML, headings and FAQs are kept as supplied, terminology is unchanged, and no new claims, FAQs, testimonials, or statistics were invented.
- SXO: navigation, calls to action, and contact details are kept as supplied, with the contact details below. Forms show a clear front end only message instead of silently failing.

Contact details, as supplied: info@crayonwebstudio.com, +91 9624052424, 319, 3rd Floor, Sagar Complex, Jasonath Chowk, Bhavnagar-364001, India.

## Sitemap note

The `@astrojs/sitemap` integration was tried first, as planned, and failed on this stack: version 3 crashed in the build hook with `Cannot read properties of undefined (reading 'reduce')`, and version 2 crashed with `destinationDir must be a relative path`. Both failures happened after all 15 pages had built successfully. The integration was therefore removed, and `scripts/generate-sitemap.mjs` runs as part of `npm run build` after `astro build`. It writes `dist/sitemap-index.xml` and `dist/sitemap-0.xml` with the 14 indexable routes (the 404 page is excluded). The output format matches the usual Astro sitemap layout, and it is for QA only while the site is noindex.

## Development and deployment

```bash
npm install
npm run build
npm run preview
```

Deployment is Docker through Coolify: `Dockerfile` builds with node:22-alpine and serves the static output with nginx:alpine on port 80. `nginx.conf` serves clean routes, the legacy `.html` 301 redirects listed above, the custom 404 page, and the noindex header. HTTPS is provided by the Coolify proxy. No DNS records were changed for this project, because `*.woodwolfdigital.com` already resolves to the Woodwolf server.

## Outstanding tasks

- Google Search Console and Google Analytics: not integrated, by design. No property ID, measurement ID, or verification token was invented. These will be added only after authorized access is provided, and only if the site is flipped from staging to public indexing.
- Blog list, portfolio, careers, and contact pages: not built, because they were not supplied. Supply those pages to build them.
- Real image alt text: needs descriptions from the content owner.
- Duplicate TYPO3 v14 titles and the long homepage description: needs a content decision from the owner, not a silent rewrite.
- Public indexing flip: needs an explicit decision, see the indexing section at the top.

## Deployment record, 2026-10-26

- GitHub repo: https://github.com/crayonwebstudio/crayon-stage, branch main, first commit 332a8d624863fabbde32bf6d2fa6f1f8abec6366 (138 files).
- Coolify project: crayon-stage, UUID th8cx5wbabrkrkqvit3miulh.
- Coolify app: stage, UUID paqd6rjewnp6rlodsfyjmhdu, domain https://stage.woodwolfdigital.com, Dockerfile build, port 80.
- First deployment: tm96qpqyvoci2ad9kvf97vlo, status finished, container started, rolling update completed, 2026-10-26T15:06:41Z to 15:07:39Z.
- Live check after that deployment, via curl: all 14 routes returned 200, robots.txt and sitemap-index.xml returned 200, legacy .html paths returned 301 to the clean https routes, and unknown routes returned a true 404 with the custom 404 page. Every response carried X-Robots-Tag noindex, nofollow.
- Note: the Coolify API app status field still read "exited:unhealthy" at check time, even though the deployment logs said the container started and the site returned 200. That status field is reported as observed, not as a running claim.
