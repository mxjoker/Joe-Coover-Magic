# Joe Coover Magic — Website Handoff
_Last updated: Session 2 · All 6 pages built · Ready for polish phase_

---

## ✅ COMPLETED

### CSS / JS Foundation
| File | Status | Notes |
|------|--------|-------|
| `css/style.css` | ✅ Done | Full design system, all components, responsive |
| `css/animations.css` | ✅ Done | All keyframes, reduced-motion safe |
| `js/main.js` | ✅ Done | Nav, hamburger, scroll reveal, FAQ, smooth scroll |
| `js/gallery.js` | ✅ Done | Lightbox with keyboard nav + accessibility |

### Pages
| Page | Status | Notes |
|------|--------|-------|
| `index.html` | ✅ Done | All sections, real photos embedded as base64 |
| `about.html` | ✅ Done | Timeline, awards, job tags, gallery preview |
| `services.html` | ✅ Done | 4 service blocks, logistics grid, FAQ accordion, pricing |
| `media.html` | ✅ Done | Video placeholders (4), photo gallery with lightbox |
| `testimonials.html` | ✅ Done | All 44 real Google reviews, featured Thomas G. quote |
| `contact.html` | ✅ Done | Netlify form, Calendly placeholder, direct contact |

---

## ⏳ STILL NEEDED (Action Items for Joe)

### Must-Have Before Launch
- [ ] **YouTube or Vimeo embed URLs** — paste into `media.html` (4 `<!-- REPLACE THIS COMMENT -->` blocks)
- [ ] **Calendly URL** — create free account at calendly.com, paste into `contact.html` (clear placeholder marked)
- [ ] **Joe's email** — set up Netlify Forms notification in Netlify dashboard after first deploy
- [ ] **SVG logo** — the lightning bolt PNG works but an SVG would be sharper at all sizes
- [ ] **Domain** — point `joecoovermagic.com` to Netlify in dashboard

### Nice-to-Have Before Launch
- [ ] **Favicon** — 32×32 PNG, add `<link rel="icon">` to each HTML `<head>`
- [ ] **Additional photos** — add to `assets/images/` and reference in `media.html`
- [ ] **Joe's email address for contact page** — currently showing phone only

---

## 🚀 PHASE 3 — Next Session Tasks

### Session 9: Mobile Responsiveness Audit
- Test each page at 320px, 768px, 1024px, 1440px
- Fix any overflow, spacing, or font-size issues
- Test hamburger menu on real device
- Known to check: hero title sizing on 320px, photo strip on mobile

### Session 10: SEO + Performance
Add to every `<head>`:
```html
<!-- Open Graph -->
<meta property="og:title" content="Joe Coover Magic">
<meta property="og:description" content="The Corporate Event Nobody Forgets.">
<meta property="og:image" content="https://joecoovermagic.com/assets/images/hero-home.jpg">
<meta property="og:url" content="https://joecoovermagic.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">

<!-- Favicon -->
<link rel="icon" href="assets/icons/favicon.png" type="image/png">
```

Also create:
- `sitemap.xml` — list all 6 pages
- LocalBusiness JSON-LD schema block for `index.html`
- Google Analytics or Plausible script

### Possible Session 11: Image Optimization
- When real photos replace base64 embeds, link to `assets/images/` files instead
- Add `loading="lazy"` to all below-fold images (already on media.html)
- Add `width` and `height` attributes to prevent layout shift

---

## 🔧 DEPLOYMENT CHECKLIST

```bash
# One-time setup
# 1. Create GitHub repo: joe-coover-magic
# 2. Push this folder to GitHub
# 3. Connect Netlify to GitHub repo
# 4. Set custom domain in Netlify dashboard
# 5. Netlify auto-provisions SSL

# Every update after that:
git add .
git commit -m "your update message"
git push
# Netlify auto-deploys in ~30 seconds
```

### Netlify Forms Setup
The contact form already has `data-netlify="true"` and `name="contact"`.
After first deploy:
1. Go to Netlify Dashboard → Forms
2. You'll see "contact" form listed
3. Set up email notification to Joe's email

### Calendly Embed
Replace this block in `contact.html`:
```html
<div class="calendly-placeholder">
  ...placeholder content...
</div>
```
With:
```html
<div class="calendly-inline-widget"
  data-url="https://calendly.com/YOUR_CALENDLY_SLUG"
  style="min-width:320px;height:630px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

## 📐 DESIGN SYSTEM REFERENCE

| Token | Value | Used For |
|-------|-------|---------|
| `--magenta` | `#FF2D78` | Primary CTA, headlines, glow |
| `--cyan` | `#00F5FF` | Secondary accent, links |
| `--yellow` | `#FFE600` | Awards, badges, tertiary |
| `--bg` | `#0A0A0F` | Page background |
| `--bg-card` | `#12121A` | Section backgrounds |
| `--bg-card2` | `#1A1A26` | Card backgrounds |

### Fonts (Google Fonts)
- **Righteous** — headlines, display
- **Audiowide** — labels, nav, subheadings
- **Jost** — body copy
- **Black Han Sans** — CTA buttons

---

## 📞 JOE'S INFO (confirmed)
- Phone: (405) 431-6625
- Instagram: @joe_coover_magic
- Facebook: facebook.com/JoeCooverMagic
- Location: Oklahoma City, OK
- Tagline: "The Corporate Event Nobody Forgets"

---

## 💡 FUTURE UPGRADES (post-launch)
| Feature | When | How |
|---------|------|-----|
| CRM | When inquiry volume grows | Netlify Forms → Zapier → HubSpot Free |
| Blog / SEO | After launch | Add /blog folder with static HTML posts |
| Analytics | At or after launch | Google Analytics or Plausible (free tier) |
| Video hero bg | After getting right clip | YouTube iframe fallback |
| Magic lessons page | Joe mentioned this | Simple page + contact form |
