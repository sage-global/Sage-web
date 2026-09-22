# SAGE — Cloudinary Setup, Asset Governance & Next.js Integration Guide

> **Target Environment:** `sage-production`  
> **Launch Target:** September 30, 2026  
> **Audience:** Developers (Shashank), Asset Managers (Vishwas), Content Mapping & QA (Manish)  
> **Rule of Thumb:** Cloudinary is the single source of truth for photography and media; Git stores pure data records and Cloudinary **public IDs**.

---

## 1. Core Architecture & Governance

1. **Centralized Media Storage**: All faculty portraits, event photography, gallery pictures, and page hero banners are hosted on Cloudinary under the `sage-production` environment.
2. **Only UI Primitives in Git**: Keep only small SVG icons, local fallbacks, and the favicon in `public/`.
3. **Store Public IDs in Data, Not Hardcoded URLs**: Store clean, relative public IDs (e.g. `'sage/events/ieee-rf-hackathon-2026/cover'`) in TypeScript data files. Code controls image transformation policy (`utils/cloudinary.ts`), not static JSON/TS records.
4. **Dynamic URL Transformations**: Deliver responsive, optimized formats at request time with automatic format and quality negotiation (`f_auto/q_auto`). Never manually export multiple cropped copies.
5. **Zero Secrets in Frontend Code**: The Cloud Name (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`) is public configuration. API Key & API Secret are strictly confidential server-side credentials and must **never** be committed to Git or exposed in client bundles.

---

## 2. Media Library Folder Structure

All assets in the Cloudinary console must follow the structured `sage/` hierarchy. **Never upload into the Cloudinary root directory.**

```
sage/
├── brand/
│   ├── og/                         # OpenGraph social share cards (1200×630)
│   │   ├── og-home.png
│   │   └── og-events.png
│   └── logos/                      # High-res logo variants
│       └── Shastryhexagon_Orange.png
│
├── team/                           # 1 portrait photo per faculty / associate
│   ├── prasad-shastry.jpg          # Must match TeamMember.slug / id in data
│   ├── m-h-kori.jpg
│   └── scarlet-daoud.jpg
│
├── events/                         # Structured event directories
│   └── <event-id>/                 # Directory name must exactly match event id in data
│       ├── cover.jpg               # Primary landscape card / header photo
│       └── gallery/                # Event gallery photos with 2-digit zero padding
│           ├── 01.jpg
│           ├── 02.jpg
│           └── 03.jpg
│
└── pages/                          # Inner-page hero background banners
    ├── about.jpg
    ├── courses.jpg
    ├── events.jpg
    ├── news.jpg
    └── services.jpg
```

---

## 3. Naming & Public ID Rules

| Rule | Requirement | Example |
| :--- | :--- | :--- |
| **Casing & Characters** | Lowercase letters, numbers, and hyphens only. No spaces or underscores. | `ieee-rf-hackathon-2026` *(Never `IEEE_Hackathon_FINAL.jpg`)* |
| **Team Profiles** | Filename must exactly match the associate's slug in `data/team.data.ts`. | `sage/team/prasad-shastry` |
| **Event Folders** | Folder name must exactly match the event `id` in `data/events.data.ts`. | `sage/events/ieee-rf-hackathon-2026/cover` |
| **Event Cover** | The primary event card/banner image is always named `cover`. | `sage/events/<event-id>/cover` |
| **Gallery Images** | Sequential numbered images with zero padding. | `sage/events/<event-id>/gallery/01` |
| **No Extensions in IDs** | Cloudinary public IDs do not require file extensions in code. | `'sage/team/m-h-kori'` |

---

## 4. Delivery Transformations & Standard Presets

The helper at [`utils/cloudinary.ts`](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/utils/cloudinary.ts) manages all delivery transformations centrally:

| Preset Name | Transformation String | Purpose | Notes |
| :--- | :--- | :--- | :--- |
| **`card`** | `c_fill,g_auto,w_800,h_500/f_auto/q_auto` | Event & course cards | Standard 16:10 landscape crop |
| **`gallery`** | `c_fill,g_auto,w_700,h_520/f_auto/q_auto` | Gallery grid thumbnails | Uniform aspect grid previews |
| **`lightbox`** | `w_1600/f_auto/q_auto` | Fullscreen modal view | High-res full composition |
| **`hero`** | `c_fill,g_auto,w_1920,h_900/f_auto/q_auto` | Inner-page background banners | Ambient negative-space layout |
| **`avatar`** | `c_fill,g_face,w_400,h_400/f_auto/q_auto` | Faculty headshots & BioDrawer | Smart face-detection square crop |
| **`og`** | `c_fill,g_auto,w_1200,h_630/f_auto/q_auto` | Social media OpenGraph cards | Standard 1.91:1 social ratio |

---

## 5. Developer Implementation Guide

### 5.1 Using the Helper (`utils/cloudinary.ts`)

```typescript
import { cloudinaryUrl, imagePresets, getAvatarUrl } from 'utils/cloudinary';

// 1. Basic URL with default auto-optimization (f_auto/q_auto)
const basicUrl = cloudinaryUrl('sage/pages/about');

// 2. Transformed URL using a predefined preset
const cardImageUrl = cloudinaryUrl('sage/events/rf-hackathon/cover', imagePresets.card);

// 3. Faculty avatar resolver with safe fallback
const avatarSrc = getAvatarUrl(member.avatarPublicId, member.avatarUrl);
```

---

### 5.2 Rendering in Components with `next/image`

Always supply explicit `width`, `height`, and responsive `sizes` to prevent layout shifts:

```tsx
import Image from 'next/image';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

export default function EventCard({ event }) {
  return (
    <div className="card">
      <Image
        src={cloudinaryUrl(event.imagePublicId, imagePresets.card)}
        alt={`${event.title} event banner`}
        width={800}
        height={500}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        objectFit="cover"
        loading="lazy"
      />
      <h3>{event.title}</h3>
    </div>
  );
}
```

> [!IMPORTANT]
> **Priority Loading Rule**: Set `priority` **only** for the above-the-fold hero image (Largest Contentful Paint). All card images, gallery thumbnails, and below-the-fold elements must remain lazy-loaded.

---

### 5.3 Storing Data in TypeScript Records

#### Faculty & Team Profiles ([`data/team.data.ts`](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/data/team.data.ts)):
```typescript
export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    slug: "prasad-shastry",
    name: "Dr. Prasad Shastry",
    role: "Executive Board",
    discipline: "executive-board",
    avatarInitials: "PS",
    avatarPublicId: "sage/team/prasad-shastry", // Cloudinary Public ID
    avatarUrl: "https://...",                   // Fallback URL (optional)
    bio: "...",
  },
];
```

#### Event Records (`data/events.data.ts`):
```typescript
export interface SageEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'hackathon' | 'workshop' | 'seminar' | 'webinar' | 'bootcamp';
  description: string;
  imagePublicId: string;       // e.g. 'sage/events/ieee-rf-hackathon-2026/cover'
  galleryPublicIds?: string[]; // e.g. ['sage/events/ieee-rf-hackathon-2026/gallery/01', ...]
  registrationUrl?: string;
}
```

#### Inner Page Heroes ([`data/site.data.ts`](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/data/site.data.ts)):
```typescript
export const pageHeroes: Record<string, PageHeroData> = {
  '/about': {
    title: 'About Us',
    description: 'Applied electromagnetics, taught with engineering rigor.',
    imagePublicId: 'sage/pages/about', // Generates preset 'hero' URL automatically
  },
};
```

---

## 6. Team Roles & Responsibilities

| Role / Owner | Assigned | Responsibilities |
| :--- | :--- | :--- |
| **Asset Administration & Governance** | **Vishwas** | • Folder structure maintenance and access management.<br>• Curating, sizing, and uploading high-res event covers and team portraits.<br>• Staging environment performance and visual audits. |
| **Content Mapping & Data Integrity** | **Manish** | • Mapping Cloudinary `publicId`s into `data/*.ts` files.<br>• Verifying team member slugs and biographies match uploaded headshots.<br>• Ensuring accurate alt text and consent verification for all event attendees. |
| **Page Engineering & Components** | **Shashank** | • Implementing new page templates (`/events`, `/courses`, `/news`).<br>• Utilizing `next/image` and `utils/cloudinary.ts` presets.<br>• Implementing responsive lightbox gallery interactions and keyboard navigation (`ESC`, arrow keys). |

---

## 7. Quality Assurance Checklist

### Assets & Governance:
- [ ] Folder path strictly follows `sage/...` (no uploads in Cloudinary root).
- [ ] Public IDs use lowercase letters and hyphens only (matching data record slugs).
- [ ] Team portraits leave ample negative space around the face for automatic `g_face` square cropping.
- [ ] Event cover photos are horizontal/landscape composition.
- [ ] Photo permissions and attendee consent are verified prior to publication.

### Code & Performance:
- [ ] `next.config.js` has `res.cloudinary.com` in `images.domains`.
- [ ] Local `.env.local` and Netlify Environment Variables have `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=sage-production`.
- [ ] No API secrets, upload signatures, or private keys exist anywhere in the Git repository.
- [ ] All JSX image elements have descriptive `alt` tags (never raw file names).
- [ ] Only the top LCP Hero image uses `priority`; all cards and thumbnails use `loading="lazy"`.
- [ ] `yarn build` passes with zero static generation or TypeScript errors.

---

## 8. Troubleshooting Common Issues

| Symptom | Cause | Resolution |
| :--- | :--- | :--- |
| **`Invalid src prop ... hostname "res.cloudinary.com" is not configured`** | `next.config.js` missing domain whitelist. | Add `'res.cloudinary.com'` to `images.domains` in `next.config.js` and restart dev server. |
| **404 Not Found on image request** | Typo in public ID, wrong folder path, or wrong cloud name. | Check the exact public ID in Cloudinary Media Library and compare with `data/*.ts`. Ensure `.env.local` contains `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="sage-production"`. |
| **Awkward face cropping on team avatar** | `g_face` algorithm failed on profile angle or multiple people in photo. | Crop photo in Cloudinary console or adjust focal point metadata on that specific asset. Do not change global preset. |
| **Thumbnail in lightbox is blurry** | Lightbox modal was rendered using `imagePresets.gallery` instead of `imagePresets.lightbox`. | Ensure the full-screen modal passes `imagePresets.lightbox` to `cloudinaryUrl`. |
| **Layout shift / jumping on load** | Missing `width`/`height` or aspect-ratio wrapper. | Specify fixed aspect-ratio container or explicit dimensions in `next/image`. |
