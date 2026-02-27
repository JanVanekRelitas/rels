# RELS — Claude Code Instructions

## Project Structure
Monorepo with pnpm workspaces: `app/` (Nuxt 3), `functions/` (Cloud Functions v2), `shared/` (types/utils), `e2e/` (Playwright), `docs/` (VitePress).

## Build Order
1. `pnpm --filter @rels/shared build` — must run first (other packages depend on it)
2. `pnpm --filter app build` — Nuxt app (node-server preset)
3. `pnpm --filter functions build` — Cloud Functions (CommonJS output)

## Key Conventions
- SP.ZN. (spisová značka) is the primary key: 500xxx = deals, 636xxx = legal cases
- Czech is the primary language, English secondary
- i18n config: `bundle.optimizeTranslationDirective: false` (avoids deprecation)
- i18n langDir is relative to .nuxt: `langDir: '../i18n'`
- `tailwindcss` must be an explicit dependency (Nuxt UI Pro needs it)
- Shared package uses ESM (`"type": "module"`), functions use CommonJS

## Auth Roles
Three roles via Firebase custom claims: `lawyer`, `assistant`, `client`.

## Tech Stack Quick Reference
- Frontend: Nuxt 3 + Nuxt UI Pro v3 + Pinia 3 + @nuxtjs/i18n v9
- Backend: Firebase Cloud Functions v2, Node 22, TypeScript
- DB: Firestore
- Deploy: Cloud Run (app), GitHub Pages (docs)
- CI: `.github/workflows/deploy.yml` (Cloud Run), `docs.yml` (Pages), `e2e.yml` (tests)

## Testing
- E2E: `pnpm test:e2e` (full) or `pnpm test:e2e:smoke` (smoke only)
- Typecheck: `pnpm -r typecheck`
- Lint: `pnpm -r lint`

## Common Gotchas
- pnpm install may error on Windows/Cygwin with @rels/shared symlinks — usually safe to ignore
- Always build shared before app or functions
- Firebase functions tsconfig uses `"module": "commonjs"`, shared uses `"module": "ESNext"`

## Phase Progress
- [x] Phase 0: Project Setup
- [ ] Phase 1: Core Data & Dashboard
- [ ] Phase 2–6: See memory/MEMORY.md for details
