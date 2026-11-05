# Figma design brief — HTHK Intranet homepage (SharePoint revamp)

**Sources:** [hthkh.com home](https://www.hthkh.com/en/global/home.php) (brand colors), legacy intranet snapshot, [SharePoint communication site grid](https://learn.microsoft.com/en-us/sharepoint/dev/design/grid-and-responsive-design), [Plan communication site](https://support.microsoft.com/en-us/sharepoint/sites-in-sharepoint/plan-your-sharepoint-communication-site), [Create communication site walkthrough](https://learn.microsoft.com/en-us/sharepoint/create-communication-site).

Copy everything inside the fenced block below into Figma AI / Figma Make.

---

```
PROJECT
Design a RESPONSIVE SharePoint Online communication-site HOMEPAGE for Hutchison Telecommunications Hong Kong (HTHK) staff intranet. Replaces legacy Microsoft FrontPage frameset (menu_top + menu_right). Platform: SharePoint hub communication site + standard modern web parts only (no custom frame layouts). Audiences: all staff; optional audience-targeted blocks for IT vs general staff.

Deliver Figma frames at SharePoint official breakpoints (see RESPONSIVE SPEC). Light theme required. Annotate every major block with the SharePoint web part name.

═══════════════════════════════════════════════════════════════
BRAND — hthkh.com corporate (https://www.hthkh.com/en/global/home.php)
Extracted from /en/css/style.css + live homepage (Nov 2026). Use for public-facing brand alignment on intranet.

PRIMARY PALETTE (use in SharePoint theme + components)
- Corporate link / IR blue (default links, primary actions): #007BC7  rgb(0, 123, 199)
- Navy / corp-color (headings, emphasis): #007EAD  rgb(0, 126, 173)
- Bright accent blue (highlights, borders, carousel accents): #02B0EF  rgb(2, 176, 239)
- Link hover fill (invert pattern on hthkh.com): background #007BC7, text #FFFFFF
- Focus / skip-link blue: #0074BD
- Body text: #000000
- Secondary text: #444444, #696969, #6E6E6E
- Page / section backgrounds: #FFFFFF, #F8F8F8, #EFEFEF, #E0E0E0
- Borders / dividers: #DADADA, #DDDDDD, #E9E9E9

SECTION ACCENT COLORS (optional tags / hub nav hover — from hthkh.com nav categories)
- About: #A50000
- Business: #C54601
- Investor Relations: #007BC7
- Sustainability (ESG): #255A00  (also #3A8006, #568223 greens in CSS)
- Media: #0058A2
- Related-content accent line: #17B9F4

TYPOGRAPHY (corporate site)
- Primary: Modena Condensed (corporate). For SharePoint implementation use: Segoe UI / Fluent UI as functional equivalent unless Modena is licensed for M365.
- Fallback stack: Arial, Helvetica, sans-serif (hthkh.com body fallback)
- Minimum body size: 12pt / 16px equivalent for accessibility (SharePoint guidance ≥12pt)

LEGACY INTRANET ACCENT (staff familiarity — use sparingly alongside corporate blues)
- Deep navy (old menu bar): #012D90 — hub nav background OR footer strip only
- Orange (old CTAs / “New” badges): #FF6600 — primary CTA buttons, NEW badges, active nav indicator
- Legacy link blue: #082EBD — only if needed for link distinction in news lists

BRAND RULE
- Default intranet feel: corporate hthkh.com blues + white/light gray surfaces.
- Orange #FF6600 and navy #012D90 are secondary accents for recognition with old intranet, NOT the dominant marketing palette.
- Do NOT clone consumer three.com.hk retail orange shop aesthetic.

LOGO
- Use Hutchison Telecom Hong Kong Holdings logo treatment (square quadrant mark + wordmark) as on hthkh.com header.
- Placeholder: “HTHK LOGO” if asset not imported.

═══════════════════════════════════════════════════════════════
SHAREPOINT INTRANET SPEC (MUST FOLLOW — design to buildability)

SITE TYPE
- SharePoint Online **communication site** (not team site homepage layout).
- Top navigation + **centered content column** (not full-bleed team site left nav only).
- **Maximum content width: 1204px** centered; **minimum viewport support: 320px** (Microsoft Learn grid spec).

RESPONSIVE BREAKPOINTS — create layouts for each
| Breakpoint | Width | Grid | Horizontal margin / gutter |
|------------|-------|------|----------------------------|
| Small (mobile) | 320px | 1 centered column | 20px left/right margins |
| Medium | 480px | 12 columns | 16px gutters |
| Large | 640px | 12 columns | 24px gutters |
| XL | 1024px | 12 columns | 24px gutters |
| XXL | 1366px | 12 columns | 32px gutters |
| XXXL | 1920px | 12 columns | 32px gutters |

Official SharePoint UI adaptation breakpoints to optimize: **320, 1024, 1366, 1920** px.

RESPONSIVE BEHAVIOR
- Single-column stack on mobile (320–639): order follows INFORMATION HIERARCHY below.
- Hub/dept nav: horizontal scroll pills OR hamburger drawer — never tiny multi-row tables.
- Quick Links: 2-column grid on tablet, 1-column on mobile; min touch target **44×44px**.
- Hero: full-width **section** allowed; text and CTAs remain readable at 320px (no clipped text).
- Sidebars (Applications, Popular): move **below** news on mobile, not hidden.
- Sticky: only site header + search (optional); do not sticky sidebars on mobile.

SHAREPOINT PAGE STRUCTURE
- Use **sections** with layout types: one-column, two-column, three-column, full-width (for Hero only).
- Enforce **white space** between sections (Microsoft communication site pattern).
- Web parts scale to column width — design components at 1-col, 2-col, and 3-col widths.

RECOMMENDED WEB PART STACK (top → bottom = priority)
1. (Optional) Text web part — mission/welcome one line — or skip for task-first home
2. **Hero** web part — 1 layer full-width OR Layers layout; max impact above fold
3. **Quick Links** — top 8 daily apps (see ONLINE APPLICATIONS)
4. **Quick Links** or pill row — Staff essentials
5. **News** web part — “What’s Hot” (list or card layout, 3–5 items + See all)
6. Two-column section: **News** (continued) | **Quick Links** Popular items
7. **Button** or **Quick Links** grid — Department hub sites
8. (Optional) **People** web part — directory snippet
9. (Optional) **Events** web part
10. Footer: utilities + help desk + privacy

DO NOT DESIGN
- HTML frames, iframe layouts, table-based page structure
- More than one H1 (page title only)
- Underlined non-link text; “click here” links
- Color as sole meaning (WCAG)
- Fixed 960px-only layout (hthkh.com legacy width) — intranet must use 1204px max + responsive

ACCESSIBILITY (WCAG 2.1 AA — SharePoint/Microsoft)
- Text contrast ≥ 4.5:1 (large text ≥ 3:1)
- Visible keyboard focus on links/buttons/search
- Heading order: H1 page title → H2 section titles → H3 card titles (no skips)
- Descriptive link text (“Download HCM user guide” not “click here”)
- Alt text on all meaningful images; decorative hero backgrounds marked decorative
- Sans-serif body; support high contrast mode (test #007BC7 on white)

AUDIENCE TARGETING (design two small variants or annotations)
- “All staff” default homepage
- “IT staff” — swap one Quick Links group (E-Req, IIDS, JOMEH prominent)

═══════════════════════════════════════════════════════════════
INFORMATION HIERARCHY (correct priority — Figma layer order + mobile stack)

LEVEL 0 — Global chrome (persistent)
- M365 suite bar (optional simplified)
- Site identity: logo + “HTHK Intranet”
- **Microsoft Search** (prominent) — people, policies, forms, news
- Hub navigation: department sites
- Utility links: Data Privacy | Staff Directory (emphasis) | Site map | Three.com.hk

LEVEL 1 — Task completion (above the fold on desktop; after search on mobile)
- **Quick Links: Online Applications** (8 items max above fold)
- Staff essentials chips (shuttle, cafeteria, jetso, etc.)

LEVEL 2 — Awareness
- **Hero**: single featured story (promoted news)
- **News feed**: “What’s Hot” chronological list with date + department metadata

LEVEL 3 — Reference
- **Popular items** / policies / forms / security PDFs
- Department site tiles (wayfinding to hub-associated sites)

LEVEL 4 — Support
- Footer: suggestion box, help contacts, first aiders link, accessibility statement

Each level must be visually distinct (spacing, H2 section labels); users scanning in <10 seconds should see Search → Apps → News.

═══════════════════════════════════════════════════════════════
CONTENT INVENTORY (real copy — no lorem ipsum in headlines)

DEPARTMENT HUB NAV
- Customer Services (legacy: no URL — “Coming soon” or TBD)
- Finance & Admin
- Human Resources
- Legal & Regulatory
- HTHK IT
- Sales & Marketing
- Sustainability
- Policy Portal
- Intranet Home (active)

STAFF ESSENTIALS
- Shuttle Bus Schedule | Staff Cafeteria [NEW] | Jetso Corner [NEW] | Telecom Glossary | ISO | JOMEH | SPHERE (external) | Meeting room booking guide

FEATURED / NEWS
- Standalone Device Offer for Staff — 28 Oct 2026 — Consumer Marketing
- CKHH Staff Offer healthESDlife — 13 Oct 2026 — HR
- Offer from Cornerstone — 25 Sep 2026 — HR
- Harbour Plaza staff offer — HR — external
- Staff Jetso Program — HR
- SPCA The Nest offer — Sustainability
- Zurich Insurance offer — Products & Services
- New HCM System GO LIVE — HR — Oracle + user guide

ONLINE APPLICATIONS (mark external with icon)
- HTHK Password Change | CKHH Employee Portal | CKHH Directory | IT E-Requisition | HCM System (Oracle) | Information Distribution | Car Booking (rms.three.com.hk)

POPULAR ITEMS
- Useful info | Common forms & policies | FAQ | Panel doctors | HCM user guide | Confidential paper guideline | Info Security Forum | Password mgmt PDF | Mobile computing policy + FAQ | iPhone Exchange setup | Mobile email form | First-aider list | Staff suggestion box | SSLVPN 2FA guide

═══════════════════════════════════════════════════════════════
DESIGN DELIVERABLES

1. **Cover** — color swatches (all hex above), typography, SharePoint theme JSON suggestion
2. **Desktop** 1920 and 1366 — full homepage with annotations
3. **Tablet** 1024 — 2-column collapse behavior
4. **Mobile** 320 and 390 — single column, nav pattern
5. **Component page**: buttons (primary #FF6600 or #007BC7), news card, quick link tile, dept tile, search, chips, external-link icon, NEW badge
6. **Three visual variants** (same IA + SharePoint spec):
   - A) Fluent + hthkh.com blues (default for production)
   - B) Corporate bold (hero imagery + #007BC7 bars like hthkh.com “Latest News” module)
   - C) Balanced workplace (3-column: Comms | How do I? | Community/Viva mock)
7. Prototype: search focus, hero CTA, one external app link, mobile nav open state

REFERENCE URL for brand mood (not layout copy): https://www.hthkh.com/en/global/home.php

OUT OF SCOPE: Department subsite interiors, custom SPFx, dark-mode ops dashboard (optional single frame only).
```

---

## Short prompt (character-limited tools)

```
HTHK SharePoint communication-site intranet homepage, responsive 320–1924px, max content width 1204px, 12-col SharePoint grid. Brand from hthkh.com: primary #007BC7 #007EAD #02B0EF, text #000/#444, bg #FFF #F8F8F8; legacy accents #012D90 #FF6600 for nav/CTA/NEW only. Segoe UI (Modena-like). IA: Search → Quick Links apps → Staff essentials → Hero news → What’s Hot → Popular items → Dept hubs. Web parts: Hero, News, Quick Links, Button grid. WCAG AA, one H1, descriptive links. Frames: 320, 1024, 1366, 1920. Real HTHK copy (HCM, jetso, shuttle). 3 variants: Fluent blue, corporate bold bars, 3-column balanced. Annotate SharePoint web parts.
```
