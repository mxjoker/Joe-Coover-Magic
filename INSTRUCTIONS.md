# Joe Coover Magic — Site Instructions
*Last updated: March 2026*

---

## Accounts & Access

| Service | Login | Notes |
|---|---|---|
| **Netlify** | mxjoker@yahoo.com | Hosting, forms, SSL, deploy previews |
| **GitHub** | github.com/mxjoker/Joe-Coover-Magic | Source code |
| **GoDaddy** | — | Domain registrar for joecoover.com |
| **Google Analytics** | ID: G-PD2BNDP56N | Installed on all pages |
| **Google Search Console** | — | Verified, sitemap.xml submitted |
| **Zapier** | — | Form → Gmail + HubSpot CRM |
| **HubSpot** | — | CRM, receives form submissions via Zapier |
| **Calendly** | calendly.com/joe-coover-magic | Booking embed on contact page |
| **Phone** | (405) 431-6625 | |
| **Instagram** | @joe_coover_magic | |
| **Facebook** | JoeCooverMagic | |

---

## Deploy Process

```bash
cd ~/Downloads/Joe-Coover-Magic
git add .
git commit -m "your message here"
git push
# Netlify auto-deploys in ~30 seconds
```

Remote URL (capitalized — use this if you get warnings):
```bash
git remote set-url origin https://github.com/mxjoker/Joe-Coover-Magic.git
```

---

## File Structure

```
root/
  index.html, about.html, services.html, media.html,
  testimonials.html, contact.html, blog.html
  _redirects, sitemap.xml, INSTRUCTIONS.md
Blog/
  corporate-magician-oklahoma-city.html
  corporate-magician-tulsa.html
  corporate-magician-dallas.html
  corporate-magician-kansas-city.html
  corporate-magician-houston.html
  corporate-magician-denver.html
  corporate-event-entertainment-ideas.html
  how-to-hire-a-corporate-magician.html
  what-to-expect-at-a-corporate-magic-show.html
assets/images/   — hero.webp, headshot.webp, gallery-1..10.webp, og-image.jpg
assets/icons/    — bolt.png, favicon.png, apple-touch-icon.png
assets/videos/   — (reserved, do not host video files on Netlify)
css/             — style.css, animations.css
js/              — main.js, gallery.js
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--neon-magenta` | #FF2D78 | Primary CTA, headlines, glow |
| `--neon-cyan` | #00F5FF | Secondary accent, links, hover |
| `--neon-yellow` | #FFE600 | Tertiary punch, badges |
| `--bg-black` | #0A0A0F | Page background |
| `--bg-dark` | #12121A | Card/section backgrounds |
| Display font | Righteous (Google Fonts) | Headlines, nav, CTA buttons |
| Body font | Jost (Google Fonts) | Body copy |
| Sub font | Audiowide (Google Fonts) | Labels, eyebrows |
| CTA font | Black Han Sans (Google Fonts) | Button text |

**Icons:** Custom neon line-style SVG — no emojis anywhere on the site.
SVG stroke colors: magenta `#FF2D78`, cyan `#00F5FF`, yellow `#FFE600`.

---

## Critical Notes

### Nav
- Mobile nav uses class `.nav-drawer` (NOT `.nav-mobile`) — this is intentional, do not change.
- The "BOOK JOE" button in the nav uses class `nav-cta-desktop` — hidden on mobile via CSS.
- When adding a new page, copy the nav block from `index.html` exactly.

### Calendly
- Event URL ends in `the-20-minute-discovery-callf` — the trailing `f` is real, not a typo. Do not "fix" it.

### Blog articles
- Live in `/Blog/` subdirectory (capital B).
- All relative paths use `../` (e.g. `../index.html`, `../css/style.css`).
- Moving a blog article out of Blog/ will break all relative paths.
- Before writing a new article, read an existing one to match nav, footer, JSON-LD, and CSS class conventions exactly.

### Schema / SEO
- Street address is intentionally omitted from all structured data — city-level only for privacy.
- `postalCode` should NOT appear in any JSON-LD blocks.
- `priceRange: "$$$"` signals premium positioning — do not change to `$$`.
- testimonials.html has full `aggregateRating` + 24 individual `review` entries.

### Python scripts
- For complex string replacements, write as a standalone `.py` file rather than inline shell — zsh history expansion (the `!` character) causes quoting failures inline.

### Video
- Never host video files on Netlify. YouTube embeds only.
- Current YouTube ID in use: `0jXoiV5f-9E` (Corporate Highlight Reel).

### Desktop Commander
- Allowed directory must include `/Users/joecoover2022/Downloads/Joe-Coover-Magic` — if edits fail with a path error, re-add it via set_config_value.

---

## Remaining Tasks

| Priority | Task |
|---|---|
| Medium | Complete mobile responsiveness audit and fixes |
| Medium | Produce video reels (Corporate Booking Reel, Social Short, Event-Type Reel) |
| Low | Swap homepage video teaser with final reel once produced |
| Low | Additional SEO blog articles — more city targets |
| Low | Plausible Analytics ($9/mo privacy-friendly GA alternative) |
| Low | Calendly Pro upgrade (only if self-serve payment booking needed) |
