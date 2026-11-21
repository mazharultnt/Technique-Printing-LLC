// Runs automatically before every build (npm run build). Writes public/sitemap.xml.
import fs from "node:fs";
import { SERVICES } from "../src/data/services.js";
import { POSTS } from "../src/data/posts.js";
import { BUSINESS } from "../src/config.js";

const pages = [["/", 1.0], ["/services", 0.9], ["/portfolio", 0.8], ["/about", 0.6], ["/blog", 0.7], ["/contact", 0.8]];
const urls = [...pages, ...SERVICES.map((s) => [`/services/${s.slug}`, 0.8]), ...POSTS.map((p) => [`/blog/${p.slug}`, 0.6])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/sitemap/0.9">\n${urls.map(([u, p]) => `  <url><loc>${BUSINESS.siteUrl}${u}</loc><priority>${p}</priority></url>`).join("\n")}\n</urlset>\n`.replace("schemas/sitemap", "sitemap");
fs.writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
