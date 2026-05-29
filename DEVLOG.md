# Portfolio-AU Dev Log

Project: portfolio-au
Stack: Laravel 12 · Inertia.js · React · TypeScript · Tailwind CSS
Started: 2026-04-25
Repo: portfolio-Au

---

## Session 001 — 2026-04-25

**Built:**
- Separated PortfolioController into Portfolio/ subfolder
- Extracted PortfolioAuthController, PortfolioMediaController, PortfolioApiController
- Created EnsurePortfolioEditUnlocked middleware + registered alias in bootstrap/app.php
- Split routes into routes/portfolio.php
- Extracted ProfileDataService and ProfileImageService
- Split PortfolioShowcase.tsx into 15+ focused components under Components/Portfolio/
- Created PortfolioLandingController + blank Landing.tsx
- Moved showcase to /showcase · landing confirmed loading at /
- Created design-system.md
- Created DEVLOG.md

**Learned:**
- Inertia::render() maps directly to resources/js/pages/ — path and string must match exactly
- Middleware aliases must be registered in bootstrap/app.php in Laravel 12
- Layered architecture: each layer only talks to the one directly below it
- Repository pattern is optional in Laravel — only add it where querying gets complex

**Next:** Phase 1 — role column migration, User model update, seeder, CheckRole middleware

---

## Session 002 — 2026-05-08

**Built:**
- Created RolePickerController with store() and destroy() methods
- Added /role POST and DELETE routes to routes/portfolio.php
- Updated HandleInertiaRequests to pass session role with ?? fallback chain
- Created Role type and Auth interface in types/index.ts
- Created useRole, useIsGuest, useIsRecruiter, useIsDeveloper hooks
- Created RolePicker component with active state highlight
- Created resources/js/pages/Portfolio/Landing.tsx
- Fixed app.tsx layout resolver to return null for Portfolio/Landing
- Fixed nav-user.tsx null crash for unauthenticated visitors

**Learned:**
- Inertia layout resolver in app.tsx wraps every page — public pages need explicit null cases
- ?? null coalescing chain: session role → auth user role → guest fallback
- router.post() from Inertia sends requests without full page reload
- preserveScroll: true prevents page jumping after role selection
- TypeScript as unknown as X is the escape hatch for overlapping type casts

**Next:** Phase 2 — build the actual Landing page visual design (hero, mode switcher, role-aware sections)