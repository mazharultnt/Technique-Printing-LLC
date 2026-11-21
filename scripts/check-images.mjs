// Run:  npm run check-images
// Checks that every service and portfolio item has an image in /public/assets.
import fs from "node:fs";
import { SERVICES } from "../src/data/services.js";
import { PORTFOLIO } from "../src/data/portfolio.js";

const has = (dir, name) => ["-800.webp", ".jpg", ".jpeg", ".png", ".webp"].some((e) => fs.existsSync(`public/assets/${dir}/${name}${e}`));
function check(title, dir, list) {
  const missing = list.filter(([name]) => !has(dir, name));
  console.log(`\n${title}: ${list.length - missing.length} of ${list.length} found`);
  if (missing.length) console.log(missing.map(([n, label]) => `  missing: ${n}  (${label})`).join("\n"));
}
check("Service images (public/assets/services)", "services", SERVICES.map((s) => [s.slug, s.title]));
check("Portfolio images (public/assets/portfolio)", "portfolio", PORTFOLIO.map((p) => [p.id, p.title]));
console.log("\nTip: after adding new JPG/PNG images, run  npm run optimize  to make them small and fast.");
