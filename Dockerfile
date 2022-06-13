FROM node:18-alpine AS pnpm
RUN apk add --no-cache libc6-compat curl
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node


FROM pnpm AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

FROM pnpm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build


FROM pnpm AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./.next/standalone
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]
