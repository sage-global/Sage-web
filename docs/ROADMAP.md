# SAGE Project Timeline & Release Roadmap

> **Target Launch Date:** September 25 – 30, 2026  
> **Key Stakeholders:** Scarlet Daoud, Dr. Prasad Shastry, Aparna Sankarasubram, Team MSV

---

## 🗓️ Master Release Schedule

```
Aug 31         Sep 4          Sep 10         Sep 25        Sep 30
  │              │              │              │             │
  ▼              ▼              ▼              ▼             ▼
Phase 0 ───► Phase 1 & 2 ───► Phase 3 ────► Phase 4 ───► LAUNCH
Foundation   Modifications    Content &       QA &       DNS Cutover
             & New Pages      Migration       UAT
```

---

## Detailed Phase Breakdown

### Phase 0 — Foundation & Infrastructure
**Dates:** Aug 31 – Sep 4
* Staging deployment configured on **Netlify Free Tier** (auto-deploying from GitHub `main`).
* **Resend** account setup and DNS domain verification for contact form routing to `info@shastryassociates.com`.
* **Cloudinary** media account setup and bulk photo upload (faculty headshots and lab photos).
* Repository hygiene and cleanup (documentation consolidation in `docs/`, scripts organization, unused template removal).
* Chase stakeholder initial comments from Scarlet.

### Phase 1 — Staging Modifications
**Dates:** Sep 1 – Sep 3
* Homepage trimming and visual polish.
* About page redesign and heritage section refinements.
* Team page layout, avatar fallbacks, and bio drawer adjustments.
* Navbar and Footer navigation hierarchy updates.
* Refine Master Trio theme colors based on Scarlet's feedback on staging.

### Phase 2 — New Pages Buildout
**Dates:** Sep 1 – Sep 5
* **Events Page** (`/events` or `/contact#events`) created first.
* **Services Portal** (`/services` with detailed sections for training, consulting, workshops).
* **Courses Catalog** (`/courses`, `/courses#tutorials`, `/courses#workshops`).
* **News & Publications** (`/news` with MDX article rendering).
* Reuse settled design system primitives across all new views.

### Phase 3 — Content Finalization & Migration
**Dates:** Sep 5 – Sep 10
* Replace all placeholder text, dummy prices, and draft descriptions with verified SAGE data.
* Migrate sanitized technical articles from legacy WordPress XML into MDX posts.
* Finalize permanent 301 redirect map in `next.config.js`.
* Integrate high-res faculty photos and verified biographies.

### Phase 4 — Quality Assurance & UAT
**Dates:** Sep 15 – Sep 25
* Cross-browser and responsive testing across mobile, tablet, and desktop devices.
* Dark/Light mode theme verification and contrast audits.
* Contact form end-to-end delivery testing via Resend.
* **Stakeholder Sign-Off** from Scarlet, Dr. Shastry, and Aparna.
* Buffer period for minor bug fixes and polish.

### Launch & Production Cutover
**Dates:** Sep 25 – Sep 30
* **DNS Cutover** at DreamHost (update A/CNAME records to Netlify production).
* Verify MX/email records remain completely untouched.
* Legacy WordPress site preserved on secondary host as an instant rollback safety measure.
