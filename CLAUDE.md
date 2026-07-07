# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A fork of FlowiseAI's `FlowiseChatEmbed` (v3.0.3), customized by Intershop (ISH) to inject an ICM access token from a browser cookie into every Flowise chatflow prediction request. The primary modification is in `src/components/Bot.tsx` inside `handleSubmit()`.

There are two independently deployable layers:

- **Frontend embed library** — a SolidJS web component bundle built with Rollup (`npm run build` → `dist/web.js` / `dist/web.umd.js`). Embedding sites include it via `<script type="module">`.
- **Proxy server** — an Express.js server (`server.js`) that maps short identifiers (e.g., `agent1`) to actual Flowise chatflow UUIDs, enforces domain allowlisting, and injects `FLOWISE_API_KEY` on all upstream calls.

## Commands

```bash
# Development (watch mode, dev server on port 5678 with livereload)
npm run dev

# Production build → dist/web.js + dist/web.umd.js
npm run build

# Start proxy server
npm start

# Lint
npm run lint
npm run lint-fix

# Format
npm run format
npm run format:check
```

There are no tests in this project.

## Environment / Configuration

Copy `.env.example` to `.env` for the proxy server. Required variables:

```
API_HOST=https://your-flowise-instance.com
FLOWISE_API_KEY=your-key
# One line per chatflow:
agent1=<uuid>,allowed-domain.com,another-domain.com
```

## Architecture

### Frontend Component Tree

```
src/web.ts          ← bundle entry; registers web components + window.Chatbot global
src/register.tsx    ← registers <flowise-chatbot> and <flowise-fullchatbot> custom elements
src/window.ts       ← exports init() / initFull() / destroy() API

features/bubble/    ← floating button + chat window (Bubble.tsx wraps Bot)
features/full/      ← full-page widget (Full.tsx wraps Bot, lazy-launches via IntersectionObserver)
features/popup/     ← source documents viewer (Popup.tsx) and disclaimer modal (DisclaimerPopup.tsx)

components/Bot.tsx  ← ~2100-line core component; owns all reactive state and message-send logic
components/bubbles/ ← GuestBubble, BotBubble, LoadingBubble, StarterPromptBubble, etc.
components/buttons/ ← SendButton, FeedbackButtons, RecordAudioButton, AttachmentUploadButton, etc.
components/inputs/  ← TextInput, ShortTextInput, FilePreview
components/treeview/ ← agent workflow tree visualization
```

### Request Flow

1. `Chatbot.init({ chatflowid: 'agent1', apiHost: window.location.origin })` embeds the widget.
2. `Bot.tsx` on mount: checks localStorage for existing session → `isStreamAvailableQuery` → `getChatbotConfig`.
3. On user send (`handleSubmit()`): reads `apiToken` cookie → injects as `overrideConfig.vars.user_token` → POSTs to `${apiHost}/api/v1/prediction/${chatflowid}`.
4. If streaming: SSE via `@microsoft/fetch-event-source`; events: `token`, `sourceDocuments`, `agentReasoning`, `agentFlowEvent`, `artifacts`, `end`, etc.
5. Proxy server (`server.js`) receives the request, resolves short ID → UUID, adds `Authorization: Bearer <FLOWISE_API_KEY>`, forwards to real Flowise `API_HOST`.
6. Messages persisted to `localStorage` keyed by `${chatflowid}_EXTERNAL`.

All API calls go through `src/queries/sendMessageQuery.ts`. The fetch/axios wrapper is `src/utils/index.ts`.

### ISH Custom Modification

The core ISH change lives in `Bot.tsx` inside `handleSubmit()`. It reads the `apiToken` cookie (URL-decoded JSON), extracts `.apiToken`, and injects it as `overrideConfig.vars.user_token`. The Flowise chatflow must have a static variable `user_token` with "allow variable overrides" enabled.

A commented-out localStorage alternative (`icm_access_token`) is still present above the cookie-based implementation.

### Key Technology Notes

- **SolidJS** (not React): uses signals and `createSignal`/`createMemo`/`onMount`/`onCleanup` — no VDOM diffing.
- **Tailwind CSS** with all rem values converted to px (`tailwind.config.cjs` `rem2px()`), so styles are unaffected by the host page's font-size root.
- **Rollup** (not Vite/webpack): config is `rollup.config.js`; dev mode adds `rollup-plugin-serve` on port 5678.
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json` and `rollup.config.js`).
- Husky pre-commit hook runs on every commit.
