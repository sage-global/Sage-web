# SAGE Project Documentation

Welcome to the technical and strategic documentation for the **SAGE (Shastry Associates Global Enterprises)** web platform.

---

## 📚 Documentation Index

| Guide | Description | Target Audience |
| :--- | :--- | :--- |
| 🏗️ [**Architecture & Tech Stack**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/ARCHITECTURE.md) | Technical stack decisions (Next.js, Netlify, Git-based content, Resend, Cloudinary, DNS). | Developers & DevOps |
| 🎨 [**Brand Guidelines**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/BRAND_GUIDELINES.md) | Master brand identity, voice, Master Trio color palette, and copywriting standards. | Designers, Copywriters & Stakeholders |
| 📐 [**Design System**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/DESIGN_SYSTEM.md) | CSS variable tokens, styled-components conventions, responsive breakpoints, UI primitives. | Frontend Engineers |
| 🖼️ [**Page Hero Specifications**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/PAGE_HERO_SPECS.md) | Specifications for the inner-page parallax blurred banner component. | Frontend Engineers |
| ☁️ [**Cloudinary Integration Guide**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/CLOUDINARY_GUIDE.md) | Cloudinary environment setup, `sage/` folder governance, presets, and Next.js developer usage. | Frontend Engineers, Vishwas, Manish, Shashank |
| 🔄 [**WordPress Migration Guide**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/MIGRATION_GUIDE.md) | Extraction procedures, XML parser scripts, security sanitization, and team data schema. | Data Engineers & Developers |
| 🗓️ [**Project Roadmap & Timeline**](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/docs/ROADMAP.md) | Launch phases (Phases 0–Launch, Aug 31 – Sep 30), stakeholder review gates, and rollback policy. | Project Managers & Stakeholders |

---

## ⚡ Quick Directory Structure

```
next-saas-starter/
├── docs/                  # All architectural, brand, design, and migration documentation
├── data/                  # Modular TypeScript constants (site, home, team, courses, etc.)
│   └── archive/           # Raw legacy WordPress XML exports & data backups
├── pages/                 # Next.js routes & serverless API endpoints
├── components/            # Reusable UI component library
├── views/                 # Composite section views per page (HomePage, AboutPage, TeamPage, etc.)
├── contexts/              # Global React Context providers (modals, drawers)
├── hooks/                 # Reusable React hooks
├── posts/                 # MDX blog & news articles
├── scripts/               # Migration, data transformation & utility scripts
├── tina/                  # TinaCMS visual editing schemas & config
└── public/                # Static assets, logos, and icons
```
