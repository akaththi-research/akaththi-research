// Regenerates every logo file from one definition of the mark.
// Optional dev tool: needs Playwright and Chrome, and Python Pillow for favicon.ico.
//   PLAYWRIGHT=/path/to/playwright/index.mjs CHROME=/usr/bin/google-chrome node _tools/make-brand.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const A = (p) => path.join(root, "assets", p);
const { chromium } = await import(process.env.PLAYWRIGHT || "playwright");
const WORD = fs.readFileSync(path.join(root, "_tools/brand/wordmark-100.txt"), "utf8").trim();

const C = { black: "#000000", white: "#ffffff", ink: "#1b2620", paper: "#f1f4f0", muted: "#56625a" };

// The mark: a ring with a round seed breaking the top-right of its edge.
// Geometry is on a 200 grid. Tight box is x 18..182, y 18..182 (4 unit margin).
const ang = (-45 * Math.PI) / 180;
const at = (r) => [100 + r * Math.cos(ang), 100 + r * Math.sin(ang)];
const ring = (fill, sw, r, seedR, cutR, id, cls) => {
  const [sx, sy] = at(r);
  return `<defs><mask id="${id}"><rect width="200" height="200" fill="#fff"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${cutR}" fill="#000"/></mask></defs>` +
    `<circle${cls ? ' class="r"' : ""} cx="100" cy="100" r="${r}" fill="none" stroke="${fill}" stroke-width="${sw}" mask="url(#${id})"/>` +
    `<circle${cls ? ' class="s"' : ""} cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${seedR}" fill="${fill}"/>`;
};
const markInner = (fill, id = "g", cls = false) => ring(fill, 16, 70, 19, 33, id, cls);
// Bolder cut for tab sizes (16 to 48 px), where the regular stroke is too thin.
const boldInner = (fill, id = "g", cls = false) => ring(fill, 24, 68, 26, 42, id, cls);
const NS = 'xmlns="http://www.w3.org/2000/svg"';
const markSvg = (fill) => `<svg ${NS} viewBox="18 18 164 164">${markInner(fill)}</svg>\n`;
const boldSvg = (fill) => `<svg ${NS} viewBox="16 16 168 168">${boldInner(fill)}</svg>\n`;
const NAME_UNITS = 17; // characters in "akaththi research"
const LW = Math.ceil(164 + 36 + NAME_UNITS * 70 * 0.84); // lockup width
// Lockup: mark, then the name as outlines (Martian Mono 600) so it needs no font.
const lockupSvg = (fill) => {
  const s = 0.84, tx = 164 + 36, ty = 82 + (0.6 * 100 * s) / 2;
  return `<svg ${NS} viewBox="0 0 ${LW} 164">` +
    `<g transform="translate(-18 -18)">${markInner(fill)}</g>` +
    `<path transform="translate(${tx} ${ty.toFixed(1)}) scale(${s})" fill="${fill}" d="${WORD}"/></svg>\n`;
};
const faviconSvg =
  `<svg ${NS} viewBox="16 16 168 168"><style>@media (prefers-color-scheme:dark){.r{stroke:${C.paper}}.s{fill:${C.paper}}}</style>` +
  boldInner(C.ink, "g", true) + `</svg>\n`;

const write = (p, data) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data); };
const names = { black: C.black, white: C.white, ink: C.ink };
for (const [n, c] of Object.entries(names)) {
  write(A(`brand/svg/mark-${n}.svg`), markSvg(c));
  write(A(`brand/svg/lockup-${n}.svg`), lockupSvg(c));
}
write(A("favicon.svg"), faviconSvg);
write(A("mark.svg"), markSvg(C.ink));

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const uri = (s) => "data:image/svg+xml;base64," + Buffer.from(s).toString("base64");
const font = (f) => "file://" + A(`fonts/${f}`);
async function shot(html, w, h, out, transparent = false) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<style>@font-face{font-family:"Martian Mono";src:url("${font("martian-mono-latin-wght-normal.woff2")}");font-weight:100 800}
@font-face{font-family:"Instrument Sans";src:url("${font("instrument-sans-latin-wght-normal.woff2")}");font-weight:400 700}
*{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;${transparent ? "background:transparent" : ""}}</style>${html}`);
  await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await p.screenshot({ path: out, omitBackground: transparent });
  await p.close();
}
// mark centred on a square, as a fraction of the canvas
const markPng = (px, bg, fill, frac, out, svgFn = markSvg) => shot(
  `<div style="width:${px}px;height:${px}px;display:grid;place-items:center;background:${bg}"><img src="${uri(svgFn(fill))}" width="${Math.round(px * frac)}" height="${Math.round(px * frac)}"></div>`,
  px, px, out, bg === "transparent");

// 1. Transparent marks at every common size
for (const px of [16, 32, 48, 64, 96, 128, 192, 256, 384, 512, 1024, 2048])
  for (const n of ["black", "white", "ink"])
    if (n === "black" || px >= 128) await markPng(px, "transparent", names[n], 1, A(`brand/png/mark-${n}-${px}.png`));
// 2. Lockups
for (const w of [800, 1600, 3200])
  for (const n of ["black", "white", "ink"]) {
    const h = Math.round((w * 164) / LW);
    await shot(`<img src="${uri(lockupSvg(names[n]))}" width="${w}" height="${h}">`, w, h, A(`brand/png/lockup-${n}-${w}w.png`), true);
  }
// 3. Square icons on a background (stores, avatars)
await markPng(1024, C.paper, C.ink, 0.56, A("brand/png/icon-paper-1024.png"));
await markPng(1024, C.ink, C.paper, 0.56, A("brand/png/icon-ink-1024.png"));
await markPng(1024, C.white, C.black, 0.56, A("brand/png/icon-white-1024.png"));
await markPng(1024, C.black, C.white, 0.56, A("brand/png/icon-black-1024.png"));
// 4. Site and web-app icons
for (const px of [16, 32, 48]) await markPng(px, "transparent", C.ink, 1, A(`favicon-${px}.png`), boldSvg);
await markPng(180, C.paper, C.ink, 0.62, A("apple-touch-icon.png"));
await markPng(192, C.paper, C.ink, 0.62, A("icon-192.png"));
await markPng(512, C.paper, C.ink, 0.62, A("icon-512.png"));
await markPng(512, C.ink, C.paper, 0.42, A("icon-maskable-512.png")); // inside the 80% safe zone
// 5. Social
for (const [name, px] of [["github-org-avatar", 500], ["linkedin-logo", 400], ["x-profile", 400], ["whatsapp-profile", 640], ["instagram-profile", 1080]])
  await markPng(px, C.paper, C.ink, 0.56, A(`brand/social/${name}-${px}.png`));
const card = (w, h, pad, big, sub) => `
<div style="width:${w}px;height:${h}px;background:${C.paper};color:${C.ink};padding:${pad}px;display:flex;flex-direction:column;justify-content:space-between;font-family:'Martian Mono',monospace">
  <img src="${uri(lockupSvg(C.ink))}" style="height:${Math.round(h * 0.13)}px;width:auto;align-self:flex-start">
  <div><div style="font-weight:600;font-size:${big}px;line-height:1.05;letter-spacing:-0.04em;max-width:16ch">Science for living systems.</div>
  <div style="margin-top:${Math.round(big * 0.38)}px;font-size:${sub}px;color:${C.muted}">cultivation science &nbsp;/&nbsp; mushroom strains &nbsp;/&nbsp; cooling</div></div>
</div>`;
await shot(card(1200, 630, 72, 76, 24), 1200, 630, A("og-image.png"));
await shot(card(1200, 630, 72, 76, 24), 1200, 630, A("brand/social/og-image-1200x630.png"));
const banner = (w, h) => `
<div style="width:${w}px;height:${h}px;background:${C.paper};color:${C.ink};display:flex;align-items:center;padding:0 ${Math.round(w * 0.07)}px;gap:${Math.round(w * 0.05)}px;font-family:'Martian Mono',monospace">
  <img src="${uri(lockupSvg(C.ink))}" style="height:${Math.round(h * 0.3)}px;width:auto">
  <div style="margin-left:auto;font-weight:600;font-size:${Math.round(h * 0.11)}px;letter-spacing:-0.03em;text-align:right;line-height:1.15;white-space:nowrap">Science<br>for living systems.</div>
</div>`;
await shot(banner(1500, 500), 1500, 500, A("brand/social/x-header-1500x500.png"));
await shot(banner(1584, 396), 1584, 396, A("brand/social/linkedin-banner-1584x396.png"));
await shot(banner(1200, 400), 1200, 400, A("brand/social/github-social-1200x400.png"));
await browser.close();

// 6. favicon.ico (16, 32, 48) from the black-on-transparent PNGs
execFileSync("python3", ["-c", `
from PIL import Image
im=Image.open(r"${A("favicon-48.png")}").convert("RGBA")
im.save(r"${path.join(root, "favicon.ico")}", sizes=[(16,16),(32,32),(48,48)])`]);
write(A("../site.webmanifest"), JSON.stringify({
  name: "Akaththi Research", short_name: "Akaththi Research", description: "Science for living systems.",
  start_url: "./", display: "standalone", background_color: C.paper, theme_color: C.paper,
  icons: [
    { src: "assets/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "assets/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "assets/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 2) + "\n");
console.log("brand files written");
