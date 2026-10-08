# Research: Ferry Seat Holds

## Decision: Next.js 16 App Router scaffold, written into this folder

**Rationale**: The product is a small TypeScript web app with three pages. The sample must match the baseline create-next-app defaults: Next.js 16.3.8, React 19.2.8, TypeScript, App Router, Tailwind CSS 4, ESLint 9. This folder already holds Spec Kit files, so `create-next-app` is not run. Config files follow that scaffold shape. Feature pages are written for holds, which the baseline does not have.

**Alternatives considered**: Running `create-next-app` in this folder (refused by a non-empty directory, and it would not know about holds). A separate `src/` app (extra nesting the baseline does not use).

## Decision: One in-memory module, pinned on `globalThis`

**Rationale**: The constitution forbids a database and requires sailings and holds in one TypeScript module. A module-level array is wiped by Next.js dev hot reload, so the module keeps the store on `globalThis` and seeds it once per process. Pages and server actions call that module. They do not keep a second copy of the data.

**Alternatives considered**: A database or JSON file (forbidden). A second module for holds (forbidden). React context only (lost on refresh, and staff and visitors would not share one counter).

## Decision: Server actions and dynamic server pages

**Rationale**: Mutations are form posts. Server actions update the module, then `revalidatePath` for `/`, `/hold`, and `/staff`. Each page awaits `connection()` from `next/server` so Next.js does not freeze the board as a static render. The hold page redirects back to `/hold` with the confirmation code or the refusal message in the query string, because the route list does not include a fourth page.

**Alternatives considered**: Client-side `fetch` to a route handler (a second interface, and easy to split state). `useActionState` on a client form (works, but a redirect keeps the pages as server components). A `/hold/confirmed` route (not in the agreed route list).

## Decision: Confirmation codes are six letters and digits

**Rationale**: The visitor must read a code aloud. The module generates an uppercase code from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no O, 0, I, or 1) and checks it against codes already issued in the session. Accept and release do not change the code.

**Alternatives considered**: A UUID (hard to read at the counter). A sequential number (easy to guess, and the spec only requires uniqueness in the session, but a short random code is still unique and easier to say).

## Decision: Manual acceptance on the running app

**Rationale**: The definition of done is the five checks in `brief.md`, exercised in a browser. The baseline scaffold has no test runner. This sample does not add one.

**Alternatives considered**: Playwright or Vitest (more machinery than the constitution's small app, and the checks are UI flows).

## Decision: Timetable and hold rules from the spec assumptions

**Rationale**: The brief does not name departures, party size, or status transitions. The spec already records the defaults: four on-time sailings (09:00 Harbour Mouth, 11:30 Robben Island, 14:00 Harbour Mouth, 16:30 Robben Island), seat count 1–12, statuses requested → accepted or released, released is final, delay is one-way, existing holds survive a later delay.

**Alternatives considered**: Copying the baseline destinations (those sailings have no holds, and the spec already chose different names). Asking again (the specify pass treated these as assumptions, not open questions).
