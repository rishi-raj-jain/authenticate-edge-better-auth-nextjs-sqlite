FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Required at build time — Next.js evaluates auth/database modules during `next build`.
# Pass these as build-args from GitHub Actions (see .github/workflows/build.yml).
ARG BUNNY_DATABASE_URL
ARG BUNNY_DATABASE_AUTH_TOKEN
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

ENV BUNNY_DATABASE_URL=$BUNNY_DATABASE_URL \
    BUNNY_DATABASE_AUTH_TOKEN=$BUNNY_DATABASE_AUTH_TOKEN \
    BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
    BETTER_AUTH_URL=$BETTER_AUTH_URL \
    NEXT_PUBLIC_BETTER_AUTH_URL=$BETTER_AUTH_URL

RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Runtime env is loaded by Magic Containers, not baked into the image:
#   BUNNY_DATABASE_URL, BUNNY_DATABASE_AUTH_TOKEN — auto-injected when the database is linked
#   BETTER_AUTH_SECRET, BETTER_AUTH_URL — set under Container Settings → Environment Variables
#   NEXT_PUBLIC_BETTER_AUTH_URL — optional at runtime; client bundle uses the build-time value

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV PORT=80
EXPOSE 80

CMD ["node", "server.js"]
