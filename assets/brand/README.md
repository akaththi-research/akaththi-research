# Akaththi Research brand files

The mark is a ring with a round seed breaking the top-right of its edge. Colours: black `#000000`, ink `#1b2620`, paper `#f1f4f0`, white `#ffffff`.

Regenerate everything with `node _tools/make-brand.mjs` (needs Playwright and Chrome). Edit the mark in that one file.

## Vector (use these first)

| File | Use |
| --- | --- |
| `svg/mark-black.svg`, `mark-ink.svg`, `mark-white.svg` | The mark alone, any size |
| `svg/lockup-black.svg`, `lockup-ink.svg`, `lockup-white.svg` | Mark plus the name, name converted to outlines |

White versions are for dark backgrounds.

## PNG, transparent

| File | Sizes |
| --- | --- |
| `png/mark-black-<px>.png` | 16, 32, 48, 64, 96, 128, 192, 256, 384, 512, 1024, 2048 |
| `png/mark-ink-<px>.png`, `png/mark-white-<px>.png` | 128 and up |
| `png/lockup-<colour>-<w>w.png` | 800, 1600, 3200 wide |

## Square icons with a background

`png/icon-paper-1024.png`, `icon-ink-1024.png`, `icon-white-1024.png`, `icon-black-1024.png`. For app stores, directories and anywhere a transparent logo does not work.

## Social

| File | Where |
| --- | --- |
| `social/github-org-avatar-500.png` | GitHub organisation avatar |
| `social/linkedin-logo-400.png`, `linkedin-banner-1584x396.png` | LinkedIn page |
| `social/x-profile-400.png`, `x-header-1500x500.png` | X profile |
| `social/whatsapp-profile-640.png` | WhatsApp Business |
| `social/instagram-profile-1080.png` | Instagram |
| `social/github-social-1200x400.png` | Repository social preview (use 1280x640 if GitHub asks, scale up) |
| `social/og-image-1200x630.png` | Link previews (Open Graph, X, LinkedIn, Slack) |

## Used by the website

In `assets/`: `favicon.svg` (light and dark), `favicon-16.png`, `favicon-32.png`, `favicon-48.png` (bolder cut for tab sizes), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `og-image.png`. At the repo root: `favicon.ico` (16, 32, 48) and `site.webmanifest`.

## Rules

- Keep clear space around the mark of at least the seed's width.
- Do not recolour outside black, ink, paper and white.
- Do not stretch, rotate or outline the mark.
