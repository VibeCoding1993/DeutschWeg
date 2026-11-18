# DeutschWeg — app + API + on-demand neural TTS in one container
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-venv ca-certificates && rm -rf /var/lib/apt/lists/* \
 && python3 -m venv /opt/tts && /opt/tts/bin/pip install --no-cache-dir edge-tts
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev
ENV NODE_ENV=production TTS_BIN=/opt/tts/bin/edge-tts TTS_DIR=/tmp/tts-cache PORT=10000
EXPOSE 10000
CMD ["node", "server/index.mjs"]
