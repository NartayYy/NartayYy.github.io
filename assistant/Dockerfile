FROM node:22-alpine
WORKDIR /app
COPY assistant/server.mjs ./assistant/server.mjs
COPY assistant/quick-answers.mjs ./assistant/quick-answers.mjs
COPY assistant/speech.mjs ./assistant/speech.mjs
COPY assistant/telegram.mjs ./assistant/telegram.mjs
COPY content.json index.html styles.css script.js i18n.js content.js assistant.js assistant.css ./
COPY assets ./assets
ENV HOST=0.0.0.0 PORT=8787
USER node
EXPOSE 8787
CMD ["node", "assistant/server.mjs"]
