# Lighthouse report (Phase 8)

## Measurement status: NOT YET MEASURED IN A LAB RUN

No Lighthouse lab scores are claimed here. Reason, stated plainly: this VM
has no Chrome binary available to the Lighthouse CLI, and the earlier
PageSpeed Insights API attempt (2026-10-26) returned 429 quota exceeded.
Running Lighthouse from Chrome DevTools on the deployed staging URLs is the
remaining step, and it must be done before any 95+ claim is made.

Run at launch readiness, desktop + mobile, on at least: /, /about-us/,
/services/, /service/web-development/, /portfolio/, /blogs/,
/pages/blog-detail/whats-new-in-typo3-v14-a-complete-overview-for-2025/,
/contact/. Record Performance, Accessibility, Best Practices, SEO, LCP,
CLS, and largest assets here.

## Performance work already done (measured from the build)

- Build output: 42 MB -> 40 MB after cleanup (theme assets dominate).
- Large content images recompressed 2026-10-27 (public/crayon):
  about1.jpg 1029 KB -> 223 KB, blog-typo3-v13.jpg 730 -> 456 KB,
  blog-typo3-v14-new.jpg 492 -> 400 KB, hero-team.png 1081 -> 886 KB,
  values-team.png 848 -> 711 KB, video-banner.png 850 -> 703 KB,
  journey-photo.png 457 -> 365 KB, blog-typo3-v14-lts.png 828 -> 778 KB.
  Total for those files: 7045 KB -> 5236 KB (-26%).
- Unreferenced assets removed: portfolio-arnoldpopl.png (711 KB duplicate
  of the .jpg actually used), hero-shapes.svg, journey-mask.png,
  header_shaps.png, vec6.svg, medium-shot-people-working-office.jpg.
- Static nginx serves assets with 30-day immutable caching.
- Known limitation, not hidden: the homepage loads the full Artech theme
  CSS/JS set (Bootstrap, Elementor frontend, Swiper, Font Awesome, theme
  stylesheets, ~20 stylesheets plus jQuery). That weight makes a 95+
  Performance score unlikely on the homepage without a theme-asset refactor,
  which would risk the verified homepage design. This is documented as the
  main open performance item, not claimed away.

## Accessibility and best practices (from build, not a lab audit)

- Semantic headings per page, unique titles/descriptions, alt text on
  content images, form labels on contact form, keyboard-operable offcanvas
  menu with focusable controls.
- No mixed content: all assets served from the same origin.
- Staging guards: meta noindex/nofollow, X-Robots-Tag noindex/nofollow,
  robots.txt Disallow. These must be removed at production launch.

## SEO (from build)

- 24 routes, production canonicals, unique titles/descriptions,
  Organization + WebSite JSON-LD (validated JSON in dist), QA sitemap.
