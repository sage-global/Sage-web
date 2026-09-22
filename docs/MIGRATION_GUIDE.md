# WordPress Legacy Migration & Content Sanitization Guide

> **Source Export:** `data/archive/shastryassociates.WordPress.2026-07-30.xml` (WXR 1.2 Format, 418 Items)  
> **Source Authors:** `snp@bradley.edu` (Dr. S.N. Prasad), `msv_group`  
> **Target Platform:** Next.js Static Pages + MDX News Articles (`posts/*.mdx`)

---

## 1. Security Audit & Spam Sanitization

> [!WARNING]
> **Legacy WordPress Compromise Identified:**  
> The legacy WordPress database contained spam/casino keyword injections from compromised historical plugins (e.g. Cyrillic terms, casino promo codes).

### Sanitization Rules:
1. **Never import XML dump blindly**: Filter posts strictly by authentic SAGE author emails and confirmed slugs.
2. **Backlink Scrubbing**: Strip all external hyperlink tags (`<a href="...">`) pointing outside verified SAGE/academic domains.
3. **HTML Sanitization**: Strip non-standard inline styles, base64 blobs, and obsolete page builder markup (e.g. `mfn-page-items`).

---

## 2. Migration Scripts (`scripts/`)

| Script | Purpose |
| :--- | :--- |
| **`scripts/parse_wp.js`** | Streams the 20MB XML export line-by-line, decodes Base64 Elementor meta values, extracts verified faculty bios and images, and logs structured profiles. |
| **`scripts/split_data.js`** | Deconstructs monolithic data into modular typed files in `data/` (`site`, `home`, `courses`, `team`, `about`, `footer`). |
| **`scripts/update_roles.js`** | Normalizes discipline IDs and labels across all team records. |
| **`scripts/fix_colors.js`** | Automatically wraps raw CSS custom properties in `rgb(var(...))` for Styled Components compatibility. |

---

## 3. URL Redirects & 301 Mapping

To preserve legacy SEO rankings and avoid broken bookmarks, configure permanent 301 redirects in [next.config.js](file:///c:/Users/MOG/Documents/Projects/Sage-new/next-saas-starter/next.config.js):

```js
async redirects() {
  return [
    { source: '/about-us', destination: '/about', permanent: true },
    { source: '/contact-us', destination: '/contact', permanent: true },
    { source: '/blog', destination: '/news', permanent: true },
    { source: '/blog/:slug*', destination: '/news/:slug*', permanent: true },
  ];
}
```
