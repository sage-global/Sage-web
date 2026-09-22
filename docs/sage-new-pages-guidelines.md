# SAGE Website — New Pages Build Guide

> **For:** Team MSV (Vishwas — pages, Shashank — data/migration)
> **Guidelines & QA owner:** Manish
> **Target:** Oct 20 launch · Parity bar, not perfection
> **Rev 1.1** — decisions locked: Google Form registrations, no collaborators on cards, StatsBar uses real numbers, Cloudinary convention defined (§5.1)

This document is the single source of truth for building the eight new pages. Read sections 2–4 before writing any code. Every phase ends with test cases — a page is not "done" until they pass.

---

## 1. Scope

| # | Page | Route | Effort | Phase |
|---|------|-------|--------|-------|
| 1 | Events (+ gallery) | `/events` | 3–4 days | 1 |
| 2 | Services | `/services` | 2 days | 2 |
| 3 | Courses | `/courses` | 2 days | 3 |
| 4 | Tutorials | `/tutorials` | 1 day | 4 |
| 5 | Workshops | `/workshops` | 1 day | 4 |
| 6 | Training | `/training` | 1 day | 4 |
| 7 | Consulting | `/consulting` | 1 day | 4 |
| 8 | News (blog restructure) | `/news` | 1–2 days | 5 |

Total: ~2 weeks of build time inside the Sep 21 – Oct 4 window.

---

## 2. Component strategy — decision & rationale

**Question on the table:** adopt Chakra UI (or another component library) for the new pages?

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **A. Existing styled-components library** | Zero migration; visual consistency guaranteed; ~90% of needed components already exist (PageHero, FilterPills, SpotlightCard, StatsBar, Accordion, WaveCta, ArticleCard); smallest bundle; team knows it | Accessibility behaviors (focus trap, arrow-key nav) hand-built for the lightbox only | ✅ **Recommended** |
| **B. Chakra UI** | Battle-tested accessible Modal/Tabs/Accordion out of the box; good docs | Second styling runtime (Emotion) alongside styled-components; +~80–100KB gzipped; tokens must be duplicated into a Chakra theme (CSS vars → theme mapping); Chakra defaults fight the custom Master Trio design; SSR provider setup in `_app`; team unfamiliar; mid-project is the worst time to migrate; two systems to maintain forever | ❌ Rejected |
| **C. Headless primitives (Radix / React Aria)** | A11y behaviors with no styling opinions; composable with styled-components | New dependency for essentially one component (lightbox dialog) | ⚠️ Fallback only |
| **D. Point solution — `yet-another-react-lightbox`** | Tiny, purpose-built, keyboard + a11y handled, themeable to Master Trio | One new dependency | ✅ **Allowed for the gallery** |

**Decision: Option A for everything, plus Option D for the gallery lightbox.** If the lightbox turns out to need more than the library gives, escalate to Manish before reaching for Radix — do not adopt a UI framework on your own.

**Hard rule:** no new UI/styling dependencies without Manish's approval. One styling system sitewide.

---

## 3. Non-negotiables (read before building)

1. **Content layer rule.** Pages never import `data/*.ts` directly. All reads go through the content layer (`getEvents()`, `getServices()`, `getCourses()`…). If the getter doesn't exist, add it — don't bypass.
2. **Design tokens only.** Colors come from the CSS variables in `GlobalStyles` (Master Trio: `#006AAD` primary, `#35A9EF` light, `#FB6B31` accent). No hard-coded hex in page code.
3. **Standard chrome.** Every inner page: `PageHero` (compact, blurred text region, breadcrumb) at top, `WaveCta` at bottom. No exceptions, no custom heroes.
4. **Cloudinary only.** All photography via Cloudinary URLs using the asset conventions in §5.1. No images in `public/` except icons/logo/favicons.
5. **Alt text mandatory** on every image. No empty `alt` except pure decoration.
6. **Both themes.** Every section is reviewed in light and dark mode before marking done. Dark navy uses the softened shade from `DESIGN_SYSTEM.md`.
7. **No fake data.** No prices, no invented testimonials, no placeholder numbers. Hide the section if real data is missing.
8. **Wording rules.** "RF / wireless" (never plain "electronics"); "instructors" / "Meet Our Team" (never "faculty").
9. **Responsive-first.** Build at 375px, then verify up. No horizontal scroll at 320px.
10. **Branches & PRs.** One page = one branch (`feat/events-page`) = one PR into `main`. Manish reviews every PR. Preview deploy must be attached.

---

## 4. Shared page anatomy

Every new page follows this top-to-bottom skeleton:

```
PageHero            ~40vh, photo + dark overlay, breadcrumb, title, subtitle
[Filter pills]      only where filtering exists (Events, Courses)
Content sections    alternating backgrounds; OverTitle (orange label) + SectionTitle
Cards / grids       3–4 per row desktop, 1–2 mobile; rounded, shadow, hover lift
[StatsBar]          only where numbers are real
[Gallery / extra]   page-specific
WaveCta             wave edge → blue CTA band, 1–2 buttons
Footer              existing
```

---

## 5. Data & asset contracts

### 5.1 Cloudinary asset conventions

**Folder structure (create these folders in Cloudinary first):**

```
sage/
├── brand/                      # logo variants, OG images (og-<page>.png, 1200×630)
├── team/                       # profile photos
│   └── <member-id>.jpg         # member-id must match team.data.ts id
├── events/
│   └── <event-id>/             # event-id must match events.data.ts id
│       ├── cover.jpg           # exactly one — the card/hero image
│       └── gallery/            # gallery photos, past events only
│           ├── 01.jpg          # zero-padded numbers = stable display order
│           ├── 02.jpg
└── pages/                      # page hero images
    └── <route>.jpg             # events.jpg, services.jpg, courses.jpg, news.jpg…
```

**Naming rules:**

- All lowercase, hyphens only — no spaces, no underscores, no CamelCase
- `<event-id>` / `<member-id>` in Cloudinary **must exactly match** the `id` field in the corresponding data file — the id is the single link between data and assets
- `cover.jpg` is always the card image referenced by the event's `image` field
- Nothing gets uploaded to the Cloudinary root — everything lives inside a folder

**Transformation presets (apply via URL, never bake in):**

| Use | Transformation |
|---|---|
| Event/course card image | `f_auto,q_auto,w_800` |
| Gallery lightbox | `f_auto,q_auto,w_1600` |
| Page hero background | `f_auto,q_auto,w_1920` |
| Team avatar | `f_auto,q_auto,w_400,c_fill,g_face` |

**Example URL:**
`https://res.cloudinary.com/<cloud-name>/image/upload/f_auto,q_auto,w_800/sage/events/ieee-rf-hackathon-2026/cover.jpg`

### 5.2 Data schemas

Add these behind the content layer. Status is **derived from date**, never stored.

```ts
// data/events.data.ts
export interface SageEvent {
  id: string;              // slug, e.g. 'ieee-rf-hackathon-2026' — matches Cloudinary folder
  title: string;
  date: string;            // ISO 8601
  endDate?: string;
  location: string;        // 'Bengaluru, India' | 'Online'
  type: 'hackathon' | 'workshop' | 'seminar' | 'webinar' | 'bootcamp';
  description: string;     // 1–2 lines
  image: string;           // Cloudinary URL → sage/events/<id>/cover.jpg
  gallery?: string[];      // Cloudinary URLs → sage/events/<id>/gallery/*, past events only
  registrationUrl?: string;// GOOGLE FORM link; upcoming only; omit if none exists yet
}
```

```ts
// data/services.data.ts
export interface Service {
  id: 'training' | 'consulting' | 'custom-courses' | 'workshops';
  name: string;
  tagline: string;         // Scarlet's one-line description
  description: string;     // 2–3 sentences
  icon: string;            // icon id from Icon.tsx
  href: string;            // matching lightweight route
}
```

Content layer getters required:

```ts
getEvents(): SageEvent[]
getUpcomingEvents(): SageEvent[]   // date >= today, sorted ascending
getPastEvents(): SageEvent[]       // date < today, sorted descending
getServices(): Service[]
getCourses(): Course[]             // existing courses.data.ts
```

---

## 6. How to add any new page (7 steps)

1. Create/extend the data file + content-layer getter.
2. Create `views/<PageName>/` with section components.
3. Create `pages/<route>.tsx` — thin: hero + sections + CTA.
4. Add metadata (title, description, OG image, canonical) in the page's `<Head>`.
5. Add the route to `pages/sitemap.tsx` and the nav/footer data files where applicable.
6. Add any redirects in `next.config.js` (e.g., old WordPress URLs).
7. Open PR with preview deploy; run the phase's test cases; request review.

---

## 7. Phase-by-phase build specs

### Phase 1 — Events + Gallery (`/events`) — 3–4 days

**Sections top-to-bottom:**

1. `PageHero` — event crowd photo (from `sage/pages/events.jpg`), title "Events", subtitle "Hands-on hackathons, workshops & engineering meetups", breadcrumb `Home / Events`.
2. `FilterPills` — `All` / `Upcoming` / `Past` (reuse component from Team page).
3. Event card grid — `AutofitGrid` of new `EventCard`: image with `DateBadge` overlay, type tag, title, location, description. Upcoming cards: orange Register button linking to the event's **Google Form** (only if `registrationUrl` exists). Past cards: "View photos" anchor scrolling to gallery.
4. `StatsBar` — events held / participants / cities. **Real numbers only** (being collected from Scarlet — do not launch with estimates; drop the section if numbers aren't confirmed by launch).
5. Gallery — masonry wall of past-event photos from `sage/events/<id>/gallery/` (`GalleryGrid`), opens `yet-another-react-lightbox`. Filterable by event name via pills.
6. `WaveCta` — "Want SAGE at your campus?" → `/contact`.

**New components:** `EventCard`, `DateBadge`, `GalleryGrid`. **New dependency:** `yet-another-react-lightbox`.

**Empty state (required):** if no upcoming events, show "No upcoming events right now — check out what we've done" with past events visible.

**Phase 1 test cases:**

| ID | Test | Expected |
|---|---|---|
| EV-1 | Filter pills | All shows everything; Upcoming/Past filter correctly using a data set with dates on both sides of today |
| EV-2 | Status derivation | Changing an event date flips its card between Upcoming/Past without editing status fields |
| EV-3 | Register button | Renders only when `registrationUrl` present; opens the Google Form in a new tab |
| EV-4 | Date badge | Shows correctly formatted date; no timezone off-by-one |
| EV-5 | Lightbox | Opens on click; ←/→ navigate; Esc closes; body scroll locked while open; focus returns to trigger |
| EV-6 | Gallery filter | Picking an event shows only that event's photos |
| EV-7 | Empty state | No upcoming events → message + past events still render |
| EV-8 | Cards | Image (Cloudinary, transformed per §5.1), alt text, tag, location all present |
| EV-9 | Asset match | Every event's `image` resolves to `sage/events/<event-id>/cover.jpg` for its id |

**Exit criteria:** all EV tests pass + global suite (section 8) + both themes verified.

---

### Phase 2 — Services (`/services`) — 2 days

**Sections:**

1. `PageHero` — training-session photo (`sage/pages/services.jpg`), title "What We Offer", breadcrumb.
2. Four `SpotlightCard`s from `getServices()` — icon, name, tagline, "Explore →" linking to the matching lightweight route.
3. "How we engage" — three columns: On-site / Off-site / Online.
4. `Accordion` — delivery details, typical formats, durations.
5. `WaveCta` — "Let's design your program" → `/contact`.

**New components:** none. **Data:** `services.data.ts` with Scarlet's one-liners (pending from her — use the old site's sentences as placeholder copy in the data file, flagged with `// TODO(scarlet)`).

**Phase 2 test cases:**

| ID | Test | Expected |
|---|---|---|
| SV-1 | Cards | Exactly 4, each with tagline + working Explore link to correct route |
| SV-2 | Accordion | Opens/closes; keyboard operable (Enter/Space); only one panel open at a time |
| SV-3 | TODO copy | No `TODO(scarlet)` strings ship to production build (grep the built output) |
| SV-4 | CTA | Routes to `/contact` |

---

### Phase 3 — Courses (`/courses`) — 2 days

**Sections:**

1. `PageHero` — "Courses", subtitle "Master the art of RF & wireless engineering" (`sage/pages/courses.jpg`).
2. `FilterPills` by discipline (All / RF / Wireless / …) driven by the disciplines present in data.
3. Featured course — one large `SpotlightCard` (flagged `featured: true` in data).
4. Course grid — title, duration, level badge, `DisciplineTag`, two-line description. **No price anywhere.**
5. `Accordion` — sample syllabus preview.
6. `WaveCta` — "Talk to an expert" → `/contact`.

**New components:** none (reuse `DisciplineTag`, `FilterPills`, `SpotlightCard`).

**Phase 3 test cases:**

| ID | Test | Expected |
|---|---|---|
| CR-1 | Filters | Pills generated from data; filtering returns correct courses; empty discipline never renders a pill |
| CR-2 | No prices | Built page contains no price/currency strings |
| CR-3 | Featured | Exactly one featured card, visually distinct |
| CR-4 | Data source | Page renders from `getCourses()` via content layer (no direct import in review) |

---

### Phase 4 — Lightweight pages ×4 — 1 day each

One template, four contents. **Build the template once** (`views/LightweightPage/`), instantiate per route.

**Template sections:**

1. `PageHero` — page-specific photo + title + subtitle.
2. Intro — paragraph beside supporting image (2-col desktop, stacked mobile).
3. Highlights — 3–4 tiles (icon + heading + one line) in `AutofitGrid`.
4. Related teaser — Courses cards for tutorials/workshops/training; Services cards for consulting.
5. `WaveCta` — page-specific CTA → `/contact` or `/courses`.

**Content matrix:**

| Route | Hero title | Highlights source | Related | CTA |
|---|---|---|---|---|
| `/tutorials` | "Tutorials" | Step-by-step guided learning | Courses | "Browse courses" |
| `/workshops` | "Workshops" | Hands-on, design-and-test sessions | Courses | "See upcoming events" → `/events` |
| `/training` | "Training" | Corporate & academic programs | Courses | "Discuss a program" |
| `/consulting` | "Consulting" | Expert RF/wireless guidance | Services | "Talk to an expert" |

**Phase 4 test cases:**

| ID | Test | Expected |
|---|---|---|
| LP-1 | Consistency | All 4 pages follow identical section order — side-by-side comparison shows no structural drift |
| LP-2 | Related links | Each page's teaser pulls the correct collection and links work |
| LP-3 | Nav | All 4 routes reachable from Services page Explore links |
| LP-4 | Metadata | Each page has unique title/description (no copy-paste) |

---

### Phase 5 — News restructure (`/news`) — 1–2 days

**Tasks:**

1. Rename route `pages/blog` → `pages/news`; keep article system (`SingleArticlePage`, SEO heads, share widget) untouched.
2. `next.config.js` redirects: `/blog` → `/news`, `/blog/[slug]` → `/news/[slug]`.
3. `PageHero` — "News & Articles" (`sage/pages/news.jpg`).
4. Featured article = latest by date, large card; then `ArticleCard` grid.
5. Newsletter band — "Subscribe to the SAGE newsletter" → Google Form (new tab).
6. Migrate real WordPress posts (Shashank) into `posts/` as MDX with correct dates/authors.

**Phase 5 test cases:**

| ID | Test | Expected |
|---|---|---|
| NW-1 | Redirects | `/blog` and `/blog/any-slug` return 301 to `/news` equivalents |
| NW-2 | Featured | Newest post by date renders as featured card |
| NW-3 | Metadata | Article pages retain OpenGraph + structured data heads |
| NW-4 | Newsletter | Button opens Google Form in new tab |
| NW-5 | Test posts | No `test-article*.mdx` content reachable in production build |

---

## 8. Global test suite (run on every page before PR)

| Category | Cases |
|---|---|
| Responsive | No horizontal scroll at 320px; grids collapse 4→2→1; hero text wraps cleanly at 375px |
| Theming | Light + dark: no invisible/low-contrast text; softened navy used in dark; strip text readable |
| Accessibility | Tab order logical; focus visible on all interactive elements; Esc closes overlays; alt text on every image; contrast ≥ 4.5:1 for body text in both themes |
| SEO | Unique title + meta description; canonical URL; OG image; route listed in sitemap page |
| Performance | `next/image` everywhere; Cloudinary `f_auto,q_auto`; lazy-load below-fold; Lighthouse (prod build): Performance ≥ 90, Accessibility ≥ 90, SEO = 100 |
| Integrity | Zero console errors/warnings; no dead links (run a link check); breadcrumb matches route |
| Content layer | No direct `data/*.ts` imports in page code (check in review) |

---

## 9. Definition of Done (per page)

- [ ] All phase-specific test cases pass
- [ ] Global suite passes
- [ ] Both themes screenshotted and attached to PR
- [ ] Mobile screenshot attached
- [ ] Data flows through content layer
- [ ] Metadata + sitemap entry added
- [ ] Preview deploy link in PR description
- [ ] Manish's review approved

---

## 10. Guardrails — out of scope for launch

No CMS, no database, no auth, no payments, no event detail pages, no team profile routes (drawer only), no video embedding beyond the existing `YoutubeVideo`, no new UI frameworks (section 2). Touching any of these requires Manish's explicit approval first.

---

## 11. Open items (remaining action items)

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | Collect real stats numbers for Events StatsBar (events held / participants / cities) | Manish → Scarlet | Phase 1 StatsBar |
| 2 | Create the Google Form(s) for event registrations and collect the links | Manish → Scarlet | EV-3 |
| 3 | Final list of WP posts to migrate to News | Shashank | Phase 5 |

**Decisions locked (no longer open):** registrations via Google Form links · no collaborators shown on event cards (field removed from schema) · StatsBar uses real numbers only · Cloudinary conventions defined in §5.1.
