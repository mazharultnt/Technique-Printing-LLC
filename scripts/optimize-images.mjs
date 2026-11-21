// Run:  npm run optimize
// Turns any big JPG/PNG you drop into public/assets/services or public/assets/portfolio into 3 small WebP files
// (-480, -800, -1200). The original is moved to raw-images/ (not uploaded to GitHub).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [480, 800, 1200];
let done = 0;
for (const dir of ["services", "portfolio"]) {
  const folder = `public/assets/${dir}`;
  for (const file of fs.existsSync(folder) ? fs.readdirSync(folder) : []) {
    const { name, ext } = path.parse(file);
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext.toLowerCase()) || /-(480|800|1200)$/.test(name)) continue;
    const input = path.join(folder, file);
    for (const w of WIDTHS) await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(folder, `${name}-${w}.webp`));
    fs.mkdirSync(`raw-images/${dir}`, { recursive: true });
    fs.renameSync(input, path.join(`raw-images/${dir}`, file));
    console.log(`optimized ${dir}/${file}`); done++;
  }
}
console.log(done ? `\nDone: ${done} image(s) optimized.` : "Nothing to optimize. All images are already small.");
