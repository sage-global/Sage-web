# Technical Architecture & Infrastructure Specification

> **Project:** SAGE (Shastry Associates Global Enterprises) Web Portal  
> **Status:** Finalized Infrastructure & Stack Architecture  
> **Target Production URL:** `https://shastryassociates.com`

---

## 1. Technical Stack & Infrastructure Decisions

| Layer | Selected Decision | Strategic Rationale |
| :--- | :--- | :--- |
| **Hosting & CI/CD** | **Netlify (Free Tier)** | Automated branch deploys from GitHub `main`, instant preview environments, zero-configuration Next.js SSG support. |
| **Content Layer** | **Git-based (`data/*.ts` + MDX)** | Pure TypeScript data files in `data/` and MDX articles in `posts/`. Maintained by MSV team; headless CMS visual UI deferred for direct Git workflow efficiency. |
| **Contact Form** | **Resend (Free Tier)** | High-deliverability transactional emails forwarding directly to `info@shastryassociates.com`. |
| **Media & Images** | **Cloudinary CDN** | High-performance image optimization, responsive format delivery (WebP/AVIF), and centralized hosting for faculty profile photos and event galleries. |
| **Analytics & SEO** | **Google Analytics 4 (GA4) + Google Search Console** | Configured under official SAGE email account; JSON-LD structured data and OpenGraph tags embedded in all page headers. |
| **DNS & Domain** | **DreamHost** | DNS records remain hosted at DreamHost; MSV possesses full cPanel/DNS panel access for seamless launch-day cutover without external registrar blockers. |
| **Rollback Plan** | **Parallel WordPress Host** | Legacy WordPress installation remains active during launch testing until the new Next.js platform is fully validated. |

---

## 2. System Architecture & Component Hierarchy

### 2.1 Global Page Flow & Shell

The top-level Next.js layout in `pages/_app.tsx` mounts global styling, providers, and layout frames:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        pages/_app.tsx Shell                            │
│                                                                        │
│  <GlobalStyle /> (RGB Variable Tokens)                                 │
│  <NewsletterModalContextProvider>                                      │
│    <NavigationDrawer> (Mobile menu drawer)                             │
│      <Navbar /> (Sticky header with theme switcher & active dropdowns)  │
│      <Component {...pageProps} /> (Active Page View)                   │
│      <WaveCta /> (Bottom conversion section)                           │
│      <Footer /> (Multi-column footer with social links)                │
│    </NavigationDrawer>                                                 │
│  </NewsletterModalContextProvider>                                     │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component & Data Architecture

```
next-saas-starter/
├── data/                         # Pure Data Layer
│   ├── site.data.ts              # Site config, brand color tokens, hero configs
│   ├── home.data.ts              # Hero copy, stats, why SAGE features, testimonials
│   ├── courses.data.ts           # Categories & 6 core course data structures
│   ├── team.data.ts              # 36 faculty & associate profiles with bios & credentials
│   ├── about.data.ts             # Mission, vision, goals, heritage timeline, pillars
│   └── footer.data.ts            # Footer links & copyright
├── pages/                        # Next.js Routing
│   ├── index.tsx                 # Homepage view aggregation
│   ├── about.tsx                 # /about (Mission, story, competencies)
│   ├── team.tsx                  # /team (Faculty directory & bio drawer)
│   ├── mission.tsx               # /mission (Standalone mission/vision)
│   ├── contact.tsx               # /contact (Inquiry form & office details)
│   ├── sitemap.tsx               # /sitemap (Visual navigation tree)
│   ├── privacy-policy.tsx        # Legal privacy policy
│   ├── cookies-policy.tsx        # Legal cookie terms
│   ├── blog/index.tsx            # /news & /blog article directory
│   ├── blog/[slug].tsx           # Dynamic MDX article rendering engine
│   └── api/sendEmail.ts          # Serverless email dispatch handler
├── views/                        # Section Composition
│   ├── HomePage/                 # Hero, FeaturesGallery, ServicesPortal, WhySage, etc.
│   ├── AboutPage/                # WhoWeAre, MissionVisionGoals, CoreCompetencies, etc.
│   ├── TeamPage/                 # TeamHero, FilterableTeamGrid
│   ├── ContactPage/              # FormSection, InformationSection
│   └── SingleArticlePage/        # Header, ShareWidget, SEO Head metadata
└── components/                   # 51 Modular Styled-Component Primitives
```

---

## 3. Styling Engine & Token System

The design system is powered by **Styled Components** with CSS Custom Properties representing **raw RGB channel triplets** (e.g., `251, 107, 49`).

### Token Mapping:
* **`--primary`**: `251, 107, 49` (`#FB6B31` - Vibrant Orange for high-visibility CTAs)
* **`--brandBlue`**: `0, 106, 173` (`#006AAD` - Deep Blue for headers, authority & dark surfaces)
* **`--skyBlue`**: `53, 169, 239` (`#35A9EF` - Sky Blue for active badges, hover rings & icons)
* **`--background`**: `255, 255, 255` (Light mode) / `15, 23, 42` (Dark mode Slate Ink)
* **`--secondBackground`**: `248, 251, 255` (Light mode) / `30, 41, 59` (Dark mode)

### RGB Channel Manipulation:
```tsx
const HighlightBadge = styled.span`
  background: rgba(var(--primary), 0.12);
  color: rgb(var(--primary));
  border: 1px solid rgba(var(--skyBlue), 0.35);
`;
```

---

## 4. Build & Deployment Commands

```bash
# Install all workspace dependencies
yarn install

# Run local development server
yarn dev

# Run TypeScript typechecks without emitting code
yarn tsc --noEmit

# Build production bundle
yarn build

# Test production build locally
yarn start

# Run ESLint validation
yarn lint
```
