# RELS — Real Estate Legal Solutions

Web application for managing real estate deals and legal cases. Replaces a legacy Apple Numbers spreadsheet with a modern, multi-role system for lawyers, assistants, and clients.

## Architecture

```
rels/
├── app/           Nuxt 3 frontend (Nuxt UI Pro v3, Pinia, i18n)
├── functions/     Firebase Cloud Functions v2 (Node 22)
├── shared/        Shared types & utilities (ESM)
├── e2e/           End-to-end tests (Playwright)
└── docs/          User manual (VitePress, cs + en)
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Nuxt 3 + Vue 3 + Nuxt UI Pro v3 + Tailwind CSS v4 |
| State | Pinia 3 |
| i18n | @nuxtjs/i18n v9 (Czech primary, English) |
| Backend | Firebase Cloud Functions v2 |
| Database | Cloud Firestore |
| Auth | Firebase Auth with custom claims (lawyer / assistant / client) |
| Hosting | Google Cloud Run |
| CI/CD | GitHub Actions (Cloud Run deploy + GitHub Pages docs) |

### Data Model

Every record is identified by **SP.ZN.** (spisov&aacute; značka — file reference number):

- `500xxx` — Real estate deals
- `636xxx` — Legal cases

### Key Modules

Deals &middot; Cases &middot; Tasks &middot; Contacts &middot; Escrow &middot; Cadastral &middot; Finance &middot; Attendance &middot; Registry lookups (ARES, R&Uacute;IAN, Katastr)

## Getting Started

```bash
# Prerequisites: Node ≥ 22, pnpm ≥ 10

pnpm install
pnpm --filter @rels/shared build   # compile shared types first
pnpm dev                            # start Nuxt dev server
```

### Other Commands

```bash
pnpm build                # build Nuxt app (node-server preset)
pnpm docs:dev             # local docs dev server
pnpm docs:build           # build static docs site
pnpm test:e2e             # run E2E tests
pnpm test:e2e:smoke       # run smoke tests only
```

## Documentation

User manual is available at **[GitHub Pages](https://janvanekrelitas.github.io/rels/)** (Czech + English).

To run locally: `pnpm docs:dev`

## License

Private — all rights reserved.
