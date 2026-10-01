# SAGE Web Platform — Automated Test Evidence Report

> **Generated On:** Thu, 01 Oct 2026 17:56:19 GMT  
> **Target:** `https://shastryassociates.com` (Local / Staging Verification)  
> **Test Engine:** Playwright Automated Suite  
> **Execution Duration:** 74.24s  

## 📊 Executive Summary

| Total Tests | Passed | Failed | Skipped | Pass Rate | Status |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **69** | **69** | **0** | **0** | **100.0%** | 🟢 **READY FOR LAUNCH** |

---

## 🧪 Detailed Test Evidence Log

| # | Category | Test Case Description | Environment / Viewport | Duration | Status | Evidence / Notes |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| 1 | **Forms** | Contact form validates required fields and prevents empty submission | Desktop Chrome | 2.52s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 2 | **Forms** | Server API endpoint (/api/sendEmail) rejects GET requests and requires POST | Desktop Chrome | 0.12s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 3 | **Functional** | Homepage mounts with main navigation and hero sections | Desktop Chrome | 1.39s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 4 | **Functional** | Faculty directory loads and allows clicking to individual profile | Desktop Chrome | 1.98s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 5 | **Functional** | Adjacent specialist navigation allows moving between faculty members | Desktop Chrome | 1.22s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 6 | **Responsive** | Mobile viewport: Previous / Next specialist navigation stays on 1 horizontal line | Desktop Chrome | 0.98s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 7 | **Responsive** | Mobile viewport: Hamburger drawer opens and exposes navigation links | Desktop Chrome | 1.00s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 8 | **Responsive** | Desktop viewport: Layout renders 2-column grid with sticky sidebar on profile | Desktop Chrome | 1.05s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 9 | **Seo and redirects** | Dynamic XML sitemap (/sitemap.xml) returns 200 OK and indexes all 56 pages | Desktop Chrome | 0.14s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 10 | **Seo and redirects** | Robots.txt returns 200 OK and references the sitemap | Desktop Chrome | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 11 | **Seo and redirects** | Homepage includes canonical, OpenGraph tags, and EducationalOrganization Schema | Desktop Chrome | 1.04s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 12 | **Seo and redirects** | Faculty profile includes Person Schema and individual canonical URL | Desktop Chrome | 1.04s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 13 | **Seo and redirects** | 301 Redirects: /about-us redirects to /about and /contact-us redirects to /contact | Desktop Chrome | 2.07s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 14 | **Smoke** | Uptime health check endpoint (/api/health) returns 200 OK and status ok | Desktop Chrome | 0.11s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 15 | **Smoke** | Smoke check: Route / returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.04s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 16 | **Smoke** | Smoke check: Route /about returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.21s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 17 | **Smoke** | Smoke check: Route /team returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.04s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 18 | **Smoke** | Smoke check: Route /contact returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.08s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 19 | **Smoke** | Smoke check: Route /mission returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.22s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 20 | **Smoke** | Smoke check: Route /blog returns 200 and renders with 0 uncaught errors | Desktop Chrome | 1.13s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 21 | **Smoke** | Smoke check: Route /privacy-policy returns 200 and renders with 0 uncaught errors | Desktop Chrome | 0.89s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 22 | **Smoke** | Smoke check: Route /sitemap returns 200 and renders with 0 uncaught errors | Desktop Chrome | 0.85s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 23 | **Themes** | Dark / Light mode switcher toggles body classes and maintains readable tokens | Desktop Chrome | 1.79s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 24 | **Forms** | Contact form validates required fields and prevents empty submission | Desktop Edge | 1.16s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 25 | **Forms** | Server API endpoint (/api/sendEmail) rejects GET requests and requires POST | Desktop Edge | 0.13s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 26 | **Functional** | Homepage mounts with main navigation and hero sections | Desktop Edge | 1.10s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 27 | **Functional** | Faculty directory loads and allows clicking to individual profile | Desktop Edge | 1.53s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 28 | **Functional** | Adjacent specialist navigation allows moving between faculty members | Desktop Edge | 1.50s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 29 | **Responsive** | Mobile viewport: Previous / Next specialist navigation stays on 1 horizontal line | Desktop Edge | 1.19s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 30 | **Responsive** | Mobile viewport: Hamburger drawer opens and exposes navigation links | Desktop Edge | 1.17s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 31 | **Responsive** | Desktop viewport: Layout renders 2-column grid with sticky sidebar on profile | Desktop Edge | 1.11s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 32 | **Seo and redirects** | Dynamic XML sitemap (/sitemap.xml) returns 200 OK and indexes all 56 pages | Desktop Edge | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 33 | **Seo and redirects** | Robots.txt returns 200 OK and references the sitemap | Desktop Edge | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 34 | **Seo and redirects** | Homepage includes canonical, OpenGraph tags, and EducationalOrganization Schema | Desktop Edge | 1.20s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 35 | **Seo and redirects** | Faculty profile includes Person Schema and individual canonical URL | Desktop Edge | 1.18s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 36 | **Seo and redirects** | 301 Redirects: /about-us redirects to /about and /contact-us redirects to /contact | Desktop Edge | 2.19s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 37 | **Smoke** | Uptime health check endpoint (/api/health) returns 200 OK and status ok | Desktop Edge | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 38 | **Smoke** | Smoke check: Route / returns 200 and renders with 0 uncaught errors | Desktop Edge | 1.19s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 39 | **Smoke** | Smoke check: Route /about returns 200 and renders with 0 uncaught errors | Desktop Edge | 1.32s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 40 | **Smoke** | Smoke check: Route /team returns 200 and renders with 0 uncaught errors | Desktop Edge | 1.22s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 41 | **Smoke** | Smoke check: Route /contact returns 200 and renders with 0 uncaught errors | Desktop Edge | 1.25s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 42 | **Smoke** | Smoke check: Route /mission returns 200 and renders with 0 uncaught errors | Desktop Edge | 1.19s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 43 | **Smoke** | Smoke check: Route /blog returns 200 and renders with 0 uncaught errors | Desktop Edge | 0.92s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 44 | **Smoke** | Smoke check: Route /privacy-policy returns 200 and renders with 0 uncaught errors | Desktop Edge | 0.96s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 45 | **Smoke** | Smoke check: Route /sitemap returns 200 and renders with 0 uncaught errors | Desktop Edge | 0.91s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 46 | **Themes** | Dark / Light mode switcher toggles body classes and maintains readable tokens | Desktop Edge | 1.89s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 47 | **Forms** | Contact form validates required fields and prevents empty submission | Mobile Chrome | 1.11s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 48 | **Forms** | Server API endpoint (/api/sendEmail) rejects GET requests and requires POST | Mobile Chrome | 0.02s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 49 | **Functional** | Homepage mounts with main navigation and hero sections | Mobile Chrome | 1.28s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 50 | **Functional** | Faculty directory loads and allows clicking to individual profile | Mobile Chrome | 1.33s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 51 | **Functional** | Adjacent specialist navigation allows moving between faculty members | Mobile Chrome | 1.36s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 52 | **Responsive** | Mobile viewport: Previous / Next specialist navigation stays on 1 horizontal line | Mobile Chrome | 1.09s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 53 | **Responsive** | Mobile viewport: Hamburger drawer opens and exposes navigation links | Mobile Chrome | 1.14s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 54 | **Responsive** | Desktop viewport: Layout renders 2-column grid with sticky sidebar on profile | Mobile Chrome | 1.20s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 55 | **Seo and redirects** | Dynamic XML sitemap (/sitemap.xml) returns 200 OK and indexes all 56 pages | Mobile Chrome | 0.02s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 56 | **Seo and redirects** | Robots.txt returns 200 OK and references the sitemap | Mobile Chrome | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 57 | **Seo and redirects** | Homepage includes canonical, OpenGraph tags, and EducationalOrganization Schema | Mobile Chrome | 1.15s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 58 | **Seo and redirects** | Faculty profile includes Person Schema and individual canonical URL | Mobile Chrome | 1.04s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 59 | **Seo and redirects** | 301 Redirects: /about-us redirects to /about and /contact-us redirects to /contact | Mobile Chrome | 1.81s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 60 | **Smoke** | Uptime health check endpoint (/api/health) returns 200 OK and status ok | Mobile Chrome | 0.01s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 61 | **Smoke** | Smoke check: Route / returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.14s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 62 | **Smoke** | Smoke check: Route /about returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.15s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 63 | **Smoke** | Smoke check: Route /team returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.09s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 64 | **Smoke** | Smoke check: Route /contact returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.11s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 65 | **Smoke** | Smoke check: Route /mission returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.03s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 66 | **Smoke** | Smoke check: Route /blog returns 200 and renders with 0 uncaught errors | Mobile Chrome | 1.08s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 67 | **Smoke** | Smoke check: Route /privacy-policy returns 200 and renders with 0 uncaught errors | Mobile Chrome | 0.97s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 68 | **Smoke** | Smoke check: Route /sitemap returns 200 and renders with 0 uncaught errors | Mobile Chrome | 0.86s | ✅ **PASS** | Verified successfully with 0 assertion errors. |
| 69 | **Themes** | Dark / Light mode switcher toggles body classes and maintains readable tokens | Mobile Chrome | 1.12s | ✅ **PASS** | Verified successfully with 0 assertion errors. |

---

### 📝 Sign-off Matrix

| Stakeholder | Role | Status | Date |
| :--- | :--- | :---: | :--- |
| **Dr. Prasad Shastry** | Founding Director & Principal Advisor | Pending Review | — |
| **Ms. Scarlet Daoud** | Strategy & Operations Lead | Pending Review | — |
| **Team MSV** | Core Engineering & DevOps | **PASSED** | 2026-10-01 |
