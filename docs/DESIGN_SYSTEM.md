# SAGE Design System & Frontend Specifications

> **Framework:** Next.js, React, Styled-Components, CSS Custom Properties  
> **Target:** SAGE Web Applications & Educational Portal

---

## 1. Design Tokens & CSS Custom Properties

The system uses raw RGB channel variable definitions in [components/GlobalStyles.tsx](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/components/GlobalStyles.tsx).

### 1.1 Light Theme Tokens (`.next-light-theme`)
```css
.next-light-theme {
  --background: 255, 255, 255;       /* #FFFFFF */
  --secondBackground: 248, 251, 255; /* #F8FBFF - Soft Sky Tint */
  --text: 15, 23, 42;                /* #0F172A - Slate Ink */
  --textSecondary: 255, 255, 255;    /* #FFFFFF - High Contrast Text */
  --primary: 251, 107, 49;           /* #FB6B31 - Vibrant Orange */
  --brandBlue: 0, 106, 173;          /* #006AAD - Deep Blue */
  --skyBlue: 53, 169, 239;           /* #35A9EF - Sky Blue */
  --secondary: 0, 106, 173;         /* #006AAD - Secondary Brand Anchor */
  --tertiary: 235, 246, 254;         /* #EBF6FE - Soft Tag Background */
  --cardBackground: 255, 255, 255;
  --lineColor: 226, 232, 240;        /* #E2E8F0 */
  --mutedColor: 100, 116, 139;       /* #64748B */
  --errorColor: 220, 38, 38;
}
```

### 1.2 Dark Theme Tokens (`.next-dark-theme`)
```css
.next-dark-theme {
  --background: 15, 23, 42;          /* #0F172A - SAGE Slate Ink */
  --secondBackground: 30, 41, 59;    /* #1E293B */
  --text: 248, 250, 252;
  --textSecondary: 255, 255, 255;
  --primary: 251, 107, 49;           /* Vibrant Orange */
  --brandBlue: 0, 106, 173;
  --skyBlue: 53, 169, 239;
  --secondary: 0, 80, 130;
  --tertiary: 30, 58, 95;
  --cardBackground: 30, 41, 59;
  --lineColor: 51, 65, 85;
  --mutedColor: 148, 163, 184;
}
```

---

## 2. Responsive Breakpoints

Breakpoints are defined and handled via `utils/media.ts` (`css-in-js-media`):

| Token | Width | Target Devices |
| :--- | :--- | :--- |
| `smallPhone` | `320px` | Ultra-compact screens |
| `phone` | `375px` | Standard smartphones |
| `tablet` | `768px` | iPads / Vertical tablets |
| `desktop` | `1024px` | Standard laptops / Desktops |
| `largeDesktop` | `1440px` | High-resolution external monitors |

```tsx
import { media } from 'utils/media';

const ResponsiveCard = styled.div`
  padding: 1.5rem;
  
  ${media('<=tablet')} {
    padding: 1rem;
  }
`;
```

---

## 3. Core Component Library

### 3.1 Primitives
* **`Button.tsx`**: Multi-variant pill buttons with hover transform (`translateY(-2px)`) and active box-shadows.
* **`Container.tsx`**: Max-width wrapper (`130rem` / `1300px`) ensuring standardized horizontal gutters.
* **`AutofitGrid.tsx`**: Responsive CSS grid generator without manual media query clutter.
* **`SpotlightCard.tsx`**: Mouse-tracking interactive radial glow card for featured content.

### 3.2 Navigation & Overlays
* **`Navbar.tsx`**: Sticky blur top bar with scroll-direction awareness (auto-hides on scroll down, reappears on scroll up).
* **`BioDrawer.tsx`**: Slide-out modal sheet from the right for full faculty credentials, publications, and consultation triggers.
* **`FilterPills.tsx`**: Segmented pill filter controls for categorizing courses and faculty disciplines.
* **`PageHero.tsx`**: Unified inner-page parallax hero banner with multi-layer light field blur.
