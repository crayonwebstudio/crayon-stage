// QA-only sitemap for the staging site. The site is noindex, so this file is
// for verification only and is NOT submitted to Google Search Console.
// It is generated after astro build, from the built routes in dist/.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const site = "https://stage.woodwolfdigital.com";
const dist = new URL("../dist/", import.meta.url).pathname;
const routes = [];
function walk(dir, prefix) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, prefix + entry + "/");
    else if (entry === "index.html") routes.push(prefix || "/");
  }
}
walk(dist, "/");
routes.sort();
const urls = routes.map((r) => `  <url><loc>${site}${r}</loc></url>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(dist, "sitemap-0.xml"), sitemap);
writeFileSync(join(dist, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${site}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>\n`);
console.log(`Sitemap QA: ${routes.length} routes written to dist/sitemap-0.xml and dist/sitemap-index.xml`);
