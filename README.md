# VerifyNG

NAFDAC-registration checker for packaged foods and medicines — a mobile-first PWA built with Next.js, Tailwind CSS, and the VerifyNG Visual Style Guide.

## What it does

- **Scan to verify:** point the camera at a pack; the app reads the NAFDAC registration number and shows the status — **Registered**, **Not found in Greenbook**, or **Expired / inactive** — with product name, manufacturer, and registration number.
- **Enter number:** manual fallback when scanning fails, with NAFDAC-number validation and disambiguation.
- **Result screen:** status banner, details card, disclaimer ("registered does not guarantee this exact unit is genuine"), NAFDAC Greenbook source credit, "Scan another" and "Report a problem" actions.
- **Scan history:** searchable, Today/All filter, swipe to delete.
- **Report a product:** pack photo, store name, location, and a send-report flow pointing to NAFDAC's official channels.
- **Offline-tolerant:** service worker + offline banner; scans queue and re-check on reconnect.
- **Themes:** dark-first (deep navy `#0B0D1A`) with a light theme, indigo accent, status colours used only for status, and a glowing scan-line signature element.

## Tech stack

Next.js (App Router) + Tailwind CSS, self-hosted design tokens as CSS variables, Plus Jakarta Sans / JetBrains Mono font stack, PWA manifest + service worker.

## Routes

- `/` — Splash → opens on the scanner
- `/scan` — Camera scanner (home)
- `/result` — Verification result
- `/enter-number` — Manual NAFDAC number entry
- `/history` — Scan history
- `/report` — Report a suspicious product

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
npm run lint
npx tsc --noEmit
```

## Data

This release ships with a placeholder Greenbook registry (`lib/greenbook.ts`) so the full flow works end to end. Per the PRD, real Greenbook records require NAFDAC's written data permission — see `VerifyNG_PRD_and_NAFDAC_Outreach.md` (outreach note in Appendix A).

## Design

Implemented from `VerifyNG Visual Style Guide.pdf`: tokens, typography scale, shape/elevation, components (Button, Badge, ResultBanner, HistoryRow, BottomBar, SearchBar, NumberField), and the scan experience (viewfinder corners, 1.6s sweep scan line, toasts, offline banner).
