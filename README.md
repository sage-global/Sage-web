# SAGE — Shastry Associates Global Enterprises

> **Professional RF, Microwave & Wireless Engineering Education & Advisory**  
> *Built on Next.js 12, TypeScript, Styled Components, and Netlify.*

---

## 📌 Project Overview

This repository contains the web application and educational portal for **SAGE (Shastry Associates Global Enterprises, LLC)** (`shastryassociates.com`). SAGE is an international network of senior microwave engineers, university faculty, and industry leaders specializing in applied electromagnetics, radio frequency (RF) circuits, antennas, and wireless communication systems.

---

## 📚 Documentation Quick Links

All project guidelines, architecture specifications, design tokens, and migration procedures are organized in the [**`docs/`**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/README.md) directory:

1. 🏗️ [**Architecture & Tech Stack (`docs/ARCHITECTURE.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/ARCHITECTURE.md) — Technical stack, Netlify hosting, Resend, Cloudinary, and DNS details.
2. 🎨 [**Brand Guidelines (`docs/BRAND_GUIDELINES.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/BRAND_GUIDELINES.md) — Voice, tone, Master Trio color palette, and copywriting standards.
3. 📐 [**Design System (`docs/DESIGN_SYSTEM.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/DESIGN_SYSTEM.md) — Tokens, CSS RGB variables, components, and responsive breakpoints.
4. 🖼️ [**Page Hero Specifications (`docs/PAGE_HERO_SPECS.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/PAGE_HERO_SPECS.md) — Specs for the inner-page parallax blurred banner.
5. 🔄 [**WordPress Migration Guide (`docs/MIGRATION_GUIDE.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/MIGRATION_GUIDE.md) — Legacy XML extraction, security sanitization, and data scripts.
6. 🗓️ [**Project Roadmap & Milestones (`docs/ROADMAP.md`)**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/ROADMAP.md) — Target launch schedule (Sep 25–30, 2026) and QA phases.

---

## 🚀 Quick Start (Development)

```bash
# 1. Install dependencies
yarn install

# 2. Run local development server
yarn dev

# 3. Type-check TypeScript code
yarn tsc --noEmit

# 4. Build for production
yarn build

# 5. Start production server
yarn start
```

---

## 📂 Key Directory Layout

```
next-saas-starter/
├── docs/                  # Documentation suite (Architecture, Brand, Design, Roadmap)
├── data/                  # Modular TypeScript site data (site, home, team, courses, etc.)
│   └── archive/           # Raw WordPress XML export and data archives
├── pages/                 # Next.js routes (/about, /team, /mission, /contact, /blog)
├── components/            # Reusable Styled-Component UI library
├── views/                 # Multi-section composite page layouts
├── contexts/              # Global React Context providers
├── hooks/                 # Custom React utility hooks
├── posts/                 # MDX technical and announcement articles
├── scripts/               # Migration, data splitting, and maintenance scripts
└── public/                # Logos, emblems, icons, and static assets
```

---

## 👥 Credits & Stakeholders

* **Organization:** Shastry Associates Global Enterprises, LLC (SAGE)
* **Leadership & Stakeholders:** Dr. Prasad Shastry, Scarlet Daoud, Aparna Sankarasubram
* **Development & Engineering:** Team MSV
* **Base Template:** [Next SaaS Starter](https://github.com/Blazity/next-saas-starter) under MIT License
