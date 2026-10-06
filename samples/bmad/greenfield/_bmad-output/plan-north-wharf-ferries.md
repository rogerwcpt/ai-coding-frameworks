---
title: 'North Wharf Ferries'
type: 'feature'
ticket: ''
created: '2026-10-06'
status: 'built'
baseline_revision: '2e9ad943e347a70b1a49801825ceb577211e2122'
route: 'oneshot'
route_source: 'pinned'
risk: 'medium'
review: 'quick'
review_source: 'pinned'
lenses_ran:
  - quick
review_loop_iteration: 0
context:
  - '{project-root}/brief.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** This folder has no ferry app. Visitors cannot see today's sailings or which are delayed, and they cannot request a seat hold. Staff cannot accept or release a hold, or mark a sailing delayed.

**Approach:** Add a Next.js App Router app here (TypeScript, Tailwind, ESLint; Next.js 16.3.8 and React 19.2.8) with sailings and holds in a TypeScript module and no database, payments, or accounts. `/` lists today's sailings and delays, `/hold` takes sailing, name, and seat count and shows a confirmation code, and `/staff` marks a sailing delayed or accepts or releases a hold. A delayed sailing cannot be held.

</frozen-after-approval>

## Implementation Notes

Oneshot because the invocation pinned `workflow.route=oneshot`. There is no existing app to extend, so this is one greenfield pass from `brief.md`.

Assumptions where the workflow asked for a human:

- No `core.active_initiative`. Treated the work as loose instead of stopping to attach an initiative.
- The git tree was already dirty (`samples/bmad/greenfield/` untracked) on branch `samples`. Continued, because that untracked sample is this work.
- One user-facing goal (the ferry desk). Did not split routes into separate plans.
- Today's board is four sailings. The 09:00 to The Island starts delayed so the board shows a delay before staff acts. Green Jetty 11:15, The Breakwater 14:00, and The Island 16:30 start on time.
- A hold is pending until staff accepts it, or released if staff releases a pending or accepted hold. Confirmation codes look like `NW-` plus four characters.
- Seat count must be a whole number of at least 1. No seat cap and no payments.
- A delayed sailing cannot be requested or accepted. An existing hold can still be released after a delay. Staff has no login.

Files: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `lib/ferry.ts`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/actions.ts`, `app/hold/page.tsx`, `app/hold/hold-form.tsx`, `app/staff/page.tsx`, plus `AGENTS.md` and `CLAUDE.md` written by `next dev`. Sailings and holds sit on `globalThis` so one `next dev` process keeps them. `turbopack.root` is this folder because an empty lockfile in the parent repo was being inferred as the workspace root.

Quick review: a staff failure left `?error=` in the address bar, and a later success kept that alert. Success now redirects to `/staff` so the old message does not stay.

## Plan Change Log

## Review Triage Log

- medium, patch. A staff failure redirected to `/staff?error=`, and a later successful accept, release, or delay left that alert up because success only called `revalidatePath`. Success now redirects to `/staff` with no error query. Rechecked in the browser: each success landed on `/staff` and the old alert was gone.

## Verification

**Commands:**
- `npm run lint` -- expected: exits 0
- `npm run build` -- expected: exits 0

**Manual checks (if no CLI):**
- Dev server on port 3113. A visitor sees today's sailings and which are delayed. A visitor can request a hold and is shown a confirmation code. A delayed sailing cannot be held. Staff can accept or release a hold. Staff can mark a sailing delayed.
