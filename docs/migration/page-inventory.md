# Page inventory: crayonwebstudio.com (master) to stage.woodwolfdigital.com (Astro)

Master sitemaps checked 2026-10-27: sitemap.xml indexes sitemap-pages.xml,
sitemap-blog.xml, sitemap-service.xml. Master robots.txt allows all crawlers
except /admin, /cart, /search. Total master URLs: 23.

Status key: live = built in Astro and returning 200 on stage; design = content
present but page still uses a plain text section instead of the live design;
pending = rebuild to live design still to do.

## Pages (sitemap-pages.xml, 10)

| Master URL | Target Astro route | Page type | Migration status |
|---|---|---|---|
| / | / | Homepage | live, verified browser + server 2026-10-27 |
| /about-us | /about-us/ | About/company | live, rebuilt to live design 2026-10-27 (hero, ABOUT watermark, rotating badge, office photo, stats, skill bars 95/95/95/85, testimonials) |
| /portfolio | /portfolio/ | Portfolio listing | live, real TYPO3 images; design pending |
| /blogs | /blogs/ | Blog listing | live, real TYPO3 thumbnails; design pending |
| /contact | /contact/ | Contact | live; design pending |
| /careers | /careers/ | Careers listing | live; design pending |
| /ui-ux-designer | /ui-ux-designer/ | Career role | live, verbatim live content |
| /business-development-executive | /business-development-executive/ | Career role | live, verbatim live content |
| /seo-executive | /seo-executive/ | Career role | live, verbatim live content |
| /front-end-developer | /front-end-developer/ | Career role | live, verbatim live content |

## Services (sitemap-service.xml, 9)

| Master URL | Target Astro route | Migration status |
|---|---|---|
| /services | /services/ | live; design pending |
| /service/branding-design | /service/branding-design/ | live. NOTE: live serves WEB DESIGN content at this URL (title "Professional Web Design Services"). Flagged to owner; kept faithful to live until he says it is a live-site mistake. |
| /service/web-development | /services/web-development/ | live; URL differs from master (see url-mapping.md); design pending |
| /service/branding-and-identity | /services/branding-and-identity/ | live; URL differs; design pending |
| /service/smart-growth-marketing | /services/smart-growth-marketing/ | live; URL differs; design pending |
| /service/cms-solution | /services/cms-solution/ | live; URL differs; design pending |
| /service/mobile-application | /services/mobile-application/ | live; URL differs; design pending |
| /service/media-creation-services | /services/media-creation-services/ | live; URL differs; design pending |
| /service/ai-powered-business-solutions | /services/ai-powered-business-solutions/ | live; URL differs; design pending |

## Blog details (sitemap-blog.xml, 4)

| Master URL | Target Astro route | Migration status |
|---|---|---|
| /pages/blog-detail/how-to-install-typo3-v13-lts-using-composer-step-by-step-guide | same | live, full article, real TYPO3 hero image |
| /pages/blog-detail/complete-step-by-step-guide-to-installing-and-setting-up-coolify-on-a-vps | same | live, full article, real TYPO3 hero image. Caveat: live example env password was redacted by fetch, stage uses placeholder ROOT_USER_PASSWORD=<your-password>. |
| /pages/blog-detail/whats-new-in-typo3-v14-a-complete-overview-for-2025 | same | live, full article, real TYPO3 hero image. Live repeats one section twice; stage keeps it once. |
| /pages/blog-detail/typo3-v14-lts-the-next-generation-of-enterprise-cms | same | live, full article, real TYPO3 hero image. Page H1 used (browser tab title wrongly shows the What's New title). |

## Stage-only routes (not on master, to remove per migration rules)

- /category/* (7 Artech demo category pages: agency, branding-strategy,
  digital-solutions, typography, uncategorized, ux-ui-design, web-solutions).
  They also link to removed work/author pages, so they 404 internally.
- /services/web-design/ (not in master sitemap; its content is already served
  at /service/branding-design/ on master). Redirect to /service/branding-design/.
- /sitemap/ (staging QA page, hierarchical, kept for QA only, not a master page).

## No legal/policy pages found

Master sitemap, navigation, and footer contain no privacy policy, terms, or
other legal pages. None invented. If the owner adds them, they go here.

## Navigation (live, to be confirmed by audit)

Header: Home, About Us, Services (dropdown with the 8 services), Careers,
Portfolio, Blogs, Contact, plus phone +91 9624052424 and email
info@crayonwebstudio.com in the top bar. Mobile menu: offcanvas/hamburger.
Footer: dark footer, bird + crayon wordmark, Subscribe Now form, phone/email,
address (319, 3rd Floor, Sagar Complex, Jasonath Chowk, Bhavnagar-364001,
India, #India), giant TYPO3 AGENCY text, bottom bar "Copyright: (c) 2026 by
Crayonweb Studio Pvt. Ltd. All Rights Reserved. Made with TYPO3".

## Known gaps and open decisions (do not settle by silence)

- Live /service/branding-design serving web design content: mistake on live
  or intentional? Owner decision pending.
- GSC/GA: not connected, needs owner access and a deliberate flip from
  staging noindex to production indexing.
- Form backends: master forms are TYPO3-backed; stage forms are front end
  only with a staging note (see Base.astro). Real endpoint decision pending.
- Live stat counter numbers on about page (projects/clients/years) were not
  captured as numbers; stage shows the labels with a "+" mark, no invented
  counts.
