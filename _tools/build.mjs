// Builds the static site into the repository root. No dependencies.
// Usage: node _tools/build.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONFIG } from "../_src/config.mjs";
import { layout } from "../_src/layout.mjs";
import { PAGES } from "../_src/pages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function write(rel, content) {
  const full = join(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("wrote", rel);
}

// Point folder links at their index.html, so the site also works when the files
// are opened directly or served by a host that does not map folders to pages.
const explicit = (html) =>
  html.replace(/href="((?:\.{1,2}\/)+(?:[^"#.]*\/)?|\/[^"#.]*\/)(#[^"]*)?"/g, (m, p, h) => `href="${p}index.html${h || ""}"`);

for (const page of PAGES) {
  // Relative path back to the site root. The 404 page can be served from any
  // depth, so it uses the absolute base path instead.
  const depth = page.file.split("/").length - 1;
  const r = page.root === "base" ? `${CONFIG.base}/` : depth === 0 ? "./" : "../".repeat(depth);
  write(page.file, explicit(layout(page, r)));
}

const urls = PAGES.filter((p) => p.slug !== "404")
  .map((p) => `  <url><loc>${CONFIG.url}${p.path}</loc></url>`)
  .join("\n");
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.url}/sitemap.xml\n`);
