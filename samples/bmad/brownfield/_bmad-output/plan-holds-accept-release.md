---
title: 'Sailing holds'
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
lenses_ran: ['quick']
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Visitors cannot request a seat hold, and staff cannot accept or release one. Today's sailings and the existing delay control already work.

**Approach:** Add `/hold` so a visitor can request a hold for a sailing, a name, and a seat count, and see a confirmation code. Extend `/staff` so staff can accept or release a hold. Keep sailings and holds in the TypeScript module. A delayed sailing cannot be held. Leave the delay control working.

</frozen-after-approval>

## Implementation Notes

Oneshot because the invocation pinned `workflow.route=oneshot`. Boundary, I/O, code-map, task, and design sections are omitted for that route.

Decisions: loose work because `core.active_initiative` is unset and the invocation said not to run the PRD path. The repo working tree was already dirty (this sample is untracked on `samples`); the invocation directed the change here, so the run continued. One user goal, so it was not split.

Holds live in the existing `globalThis` store in `lib/sailings.ts`. A new hold is `pending` until staff accept it (`accepted`) or release it (`released`). Release is still allowed after accept. A delayed sailing rejects `createHold`; an existing hold is left in place if that sailing is delayed later. Confirmation codes are six unambiguous characters. Seat count is a safe integer of at least 1. There is no boat capacity in the model, so no maximum was added. Name is trimmed and required.

`app/sailing-table.tsx` and `markSailingDelayed` were not rewritten. Files changed: `lib/sailings.ts`, `app/actions.ts`, `app/page.tsx`, `app/staff/page.tsx`, `app/layout.tsx`. Files added: `app/hold/page.tsx`, `app/hold/hold-form.tsx`.

Verified on port 3114: marking 14:00 The Breakwater delayed shows Delayed on `/staff` and `/`; a hold for Ada on 09:00 The Island returned confirmation code 2UMEU6; the delayed sailing was refused; staff accepted that hold, then released it. `npm run lint` exited 0. Quick review returned no findings.

## Plan Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run lint` -- expected: exits 0

**Manual checks (if no CLI):**
- `/staff` can still mark a sailing delayed, and `/` shows that delay.
- A hold on an on-time sailing returns a confirmation code.
- A hold on a delayed sailing is refused.
- Staff can accept a hold and release a hold.
