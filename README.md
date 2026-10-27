# Artech Stage (stage.woodwolfdigital.com)

Astro static conversion of the supplied Artech "Design Studio" WordPress demo,
built from supplied files only (site crawl + plugin assets). No WordPress or
Elementor PHP runs on this site; the original theme/plugin CSS and JS assets
are served as static files under /wp-content/ and /wp-includes/.

## Pages (19 built, 404 excluded from sitemap)
- / (homepage, "Design Studio")
- /category/agency/, /category/branding-strategy/, /category/digital-solutions/,
  /category/typography/, /category/uncategorized/, /category/ux-ui-design/,
  /category/web-solutions/
- /work/portrait-of-adult-male-working-from-home-at-night/ and the -2 to -10 variants
- /author/admin/
- 404 custom page

## Indexing
Staging only: meta robots noindex, nofollow on every page, robots.txt
Disallow /, X-Robots-Tag noindex, nofollow from nginx. The sitemap is
generated for QA only and is NOT submitted anywhere. No GSC/GA IDs.

## Notes
- All copy is the supplied demo placeholder copy, kept as-is.
- Forms (newsletter, comment) are front end only: submission is stopped in
  the browser and a note is shown; nothing is sent.
- Pages linked from the demo but not supplied (about, services, contact,
  careers, inner pages, other demo homepages) return the custom 404.
- Google Fonts stylesheets from the original head are dropped (they were
  external URLs, not supplied files), so text falls back to system fonts.
- Previous Crayon Stage content was removed 2026-10-27 at the owner's
  direction; a backup is at ~/workspace/crayon-stage-crayon-backup-2026-10-27/
  and the old tree is also preserved in this repo's history.
