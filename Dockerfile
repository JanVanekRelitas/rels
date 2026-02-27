FROM node:22-alpine AS base

# Build stage
FROM base AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY app/package.json app/
COPY shared/package.json shared/
COPY functions/package.json functions/
COPY e2e/package.json e2e/

# Skip Playwright browser download during install
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN pnpm install --frozen-lockfile

COPY shared/ shared/
RUN pnpm --filter @rels/shared build

COPY app/ app/
RUN pnpm --filter app build

# Production stage
FROM base
WORKDIR /app

COPY --from=build /app/app/.output .output/

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
