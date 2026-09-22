# PageHero Component Specification

> **Component:** `components/PageHero.tsx`  
> **Target:** All inner pages (`/about`, `/team`, `/mission`, `/services`, `/courses`, `/news`, `/contact`)

---

## 1. Overview & Architecture

The `PageHero` is a compact, responsive, high-impact header band (approx. 380px–480px height on desktop, stacking on mobile). It combines:
1. **Left Column**: Breadcrumbs (`Home › About Us`), Eyebrow badge with orange accent line, bold `<h1>` headline, and descriptive subtitle.
2. **Right & Background**: Ambient full-bleed photograph with subtle Ken Burns motion, scroll-based parallax translation, and a multi-layer radial light-field blur protecting text legibility.

---

## 2. Props Interface (`PageHeroData`)

```ts
export interface Crumb {
  label: string;
  href: string;
}

export interface PageHeroData {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  extra?: React.ReactNode;
}
```

---

## 3. Visual & Styling Layers

The component stacks 5 visual layers to ensure high contrast in both Light and Dark themes:

1. **`HeroImage`**: Parallax translated (`transform: translate3d(0, ${parallaxY}px, 0)`) and animated with slow Ken Burns keyframes (`28s ease-in-out infinite alternate`).
2. **`ImageShade`**: Linear gradient overlays darkening edges and corners.
3. **`AtmosphericBlur`**: Radial backdrop-filter blur (`blur(28px)`) with gradient alpha masks creating a soft glowing field behind typography.
4. **`TextGlow`**: Secondary soft radial glow.
5. **`StyledContainer`**: Content wrapper holding the typography elements.

---

## 4. Usage Pattern in Pages

```tsx
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import { pageHeroes } from 'sage-data';

export default function AboutPage() {
  return (
    <Page title="About Us | SAGE">
      <PageHero {...pageHeroes['/about']} />
      {/* Page body content */}
    </Page>
  );
}
```
