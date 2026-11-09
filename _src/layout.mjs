import { CONFIG } from "./config.mjs";

export const NAV = [
  { slug: "cultivation-science", label: "cultivation science" },
  { slug: "collaborate", label: "collaborate" },
  { slug: "about", label: "about" },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Enquiry link: email when configured, otherwise a public GitHub issue.
export function enquiry() {
  if (CONFIG.contactEmail) {
    return {
      href: `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Akaththi Research enquiry")}`,
      note: "",
    };
  }
  return {
    href: `${CONFIG.repo}/issues/new?title=${encodeURIComponent("Enquiry")}`,
    note: "This opens a GitHub issue, so your message will be public.",
  };
}

export function layout(page, r) {
  const url = CONFIG.url + page.path;
  const title = page.slug === "" ? `${CONFIG.name}: ${page.title}` : `${page.title} | ${CONFIG.name}`;
  const nav = NAV.map(
    (n) =>
      `<a href="${r}${n.slug}/"${page.slug === n.slug ? ' aria-current="page"' : ""}>${n.label}</a>`
  ).join("\n        ");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="theme-color" content="#f1f4f0">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(CONFIG.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${CONFIG.url}/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Akaththi Research. Science for living systems.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${CONFIG.url}/assets/og-image.png">
  <link rel="icon" href="${r}favicon.ico" sizes="any">
  <link rel="icon" href="${r}assets/favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="icon" href="${r}assets/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="${r}assets/favicon-16.png" sizes="16x16" type="image/png">
  <link rel="apple-touch-icon" href="${r}assets/apple-touch-icon.png">
  <link rel="manifest" href="${r}site.webmanifest">
  <link rel="preload" href="${r}assets/fonts/martian-mono-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${r}assets/fonts/instrument-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${r}assets/css/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap">
      <a class="mark" href="${r}"><img src="${r}assets/mark.svg" alt="" width="30" height="30">Akaththi Research</a>
      <nav class="nav" aria-label="Main">
        ${nav}
      </nav>
    </div>
  </header>
  <main id="main">
${page.body(r)}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <p>${esc(CONFIG.name)}, Chennai, India. Science for living systems.</p>
      <p>&copy; 2026 ${esc(CONFIG.parent)}. The source of this site is MIT licensed. Findings, designs and brand names are not covered by that licence.</p>
      <div class="footer-links">
        <a href="${CONFIG.github}">GitHub</a>
        <a href="${CONFIG.repo}/blob/main/LICENSE">Site licence</a>
        <a href="${r}about/#enquire">Enquiries</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}
