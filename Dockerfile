# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
RUN npm ci
COPY app ./
RUN npm run build

# --- runtime ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
# adapte le port si ton app utilise autre chose
ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/main.js"]
