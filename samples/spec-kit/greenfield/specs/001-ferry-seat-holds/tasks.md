---

description: "Task list for ferry seat holds"
---

# Tasks: Ferry Seat Holds

**Input**: Design documents from `/specs/001-ferry-seat-holds/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested. No test tasks. Validation is the manual quickstart.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `app/` and `lib/` at the sample root (`samples/spec-kit/greenfield`)
- Store module: `lib/ferry.ts` only
- Paths below are relative to that sample root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Next.js 16 App Router scaffold in this folder. Do not run `create-next-app` (the folder is not empty).

- [X] T001 Create `package.json` with `next` 16.3.8, `react` 19.2.8, `react-dom` 19.2.8, and devDependencies `@tailwindcss/postcss` ^4, `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19, `eslint` ^9, `eslint-config-next` 16.3.8, `tailwindcss` ^4, `typescript` ^5. Scripts: `dev` = `next dev`, `build` = `next build`, `start` = `next start`, `lint` = `eslint`
- [X] T002 [P] Create `tsconfig.json` with strict TypeScript, `jsx` `react-jsx`, and paths `@/*` → `./*`
- [X] T003 [P] Create `next.config.ts` with an empty Next.js config object
- [X] T004 [P] Create `postcss.config.mjs` with the `@tailwindcss/postcss` plugin
- [X] T005 [P] Create `eslint.config.mjs` using `eslint-config-next` core-web-vitals and typescript
- [X] T006 [P] Create `.gitignore` ignoring `node_modules`, `.next`, `out`, and `next-env.d.ts`
- [X] T007 [P] Create `app/globals.css` with `@import "tailwindcss"`
- [X] T008 Run `npm install` from `package.json` so the App Router toolchain is present

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The single store and the shared shell. No user story UI yet.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Create `lib/ferry.ts` with `Sailing` (`id`, `destination`, `departs`, `delayed`) and `Hold` (`code`, `sailingId`, `name`, `seats`, `status`). Seed exactly: `harbour-0900` Harbour Mouth 09:00 delayed false; `island-1130` Robben Island 11:30 delayed false; `harbour-1400` Harbour Mouth 14:00 delayed false; `island-1630` Robben Island 16:30 delayed false. Hold `status` is `requested` | `accepted` | `released`. Pin the store on `globalThis` and seed it once per process. Export `listSailings` and `listHolds`, each returning copies. Holds start empty. No second store.
- [X] T010 [P] Create `app/layout.tsx` with the title North Wharf Ferries and header links to `/` (Today), `/hold` (Hold), and `/staff` (Staff)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - See today's sailings (Priority: P1) 🎯 MVP

**Goal**: A visitor sees every sailing for today and whether it is on time or delayed.

**Independent Test**: Open `/`. Four sailings are listed in departure order. Each shows destination, departure time, and On time.

### Implementation for User Story 1

- [X] T011 [US1] Create `app/page.tsx` that awaits `connection()` from `next/server`, calls `listSailings` from `lib/ferry.ts`, and shows destination, departure time, and either "On time" or "Delayed" for each sailing, in departure order, per `specs/001-ferry-seat-holds/contracts/pages.md`

**Checkpoint**: User Story 1 is testable on its own

---

## Phase 4: User Story 2 - Request a hold (Priority: P1)

**Goal**: A visitor holds seats on an on-time sailing and is shown a confirmation code. Staff can see that hold.

**Independent Test**: Submit sailing `island-1130`, a non-empty name, and seats `2`. `/hold` shows a confirmation code. `/staff` lists that hold as requested with the same code, sailing, name, and seat count.

### Implementation for User Story 2

- [X] T012 [US2] Add `requestHold` to `lib/ferry.ts`. Refuse, create nothing, and issue no code when the sailing id is not on today's board, the name is blank after trimming, or the seat count is missing, not a whole number, or outside 1–12. On success, store a hold whose `code` is six characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, unique in the session, and immutable, whose `status` starts as `requested`, and whose `name` is the trimmed name.
- [X] T013 [US2] Add `requestHold` in `app/actions.ts` (`"use server"`). Read `sailingId`, `name`, and `seats`. On success redirect to `/hold?code={code}`. On refusal redirect to `/hold?error={message}` and do not create a hold. Revalidate `/`, `/hold`, and `/staff`.
- [X] T014 [US2] Create `app/hold/page.tsx` with a sailing `<select>` named `sailingId` that includes delayed sailings, a name field named `name`, and a seats field named `seats`, posting to the `requestHold` action. When `code` is in the query, show that confirmation code in full plus sailing, name, and seat count. When `error` is in the query, show the message and do not show a confirmation code. Await `connection()`.
- [X] T015 [P] [US2] Create `app/staff/page.tsx` that awaits `connection()` and lists each hold from `listHolds` with confirmation code, sailing destination and time, name, seat count, and status (`requested`, `accepted`, or `released`)

**Checkpoint**: User Stories 1 and 2 work. A valid hold shows a code.

---

## Phase 5: User Story 3 - Refuse a hold on a delayed sailing (Priority: P1)

**Goal**: A delayed sailing cannot be held. No confirmation code is issued.

**Independent Test**: Set one sailing delayed via `markDelayed`, submit a hold for it, and confirm the hold page shows a refusal and no code, and the staff list has no new hold.

### Implementation for User Story 3

- [X] T016 [US3] In `lib/ferry.ts`, make `requestHold` refuse when that sailing's `delayed` field is true (create nothing, issue no code). Add `markDelayed(id)`: an unknown id does not change state; a sailing that is already delayed stays delayed; an on-time sailing becomes delayed and never returns to false. Marking one sailing delayed does not delay the others.
- [X] T017 [US3] In `app/hold/page.tsx`, show the delayed-sailing refusal from the `error` query and render no confirmation code for that attempt

**Checkpoint**: A delayed sailing is refused. An on-time sailing can still be held.

---

## Phase 6: User Story 4 - Accept or release a hold (Priority: P2)

**Goal**: Staff accept a requested hold or release a requested or accepted hold. The confirmation code does not change.

**Independent Test**: Accept the hold from story 2 and see status accepted with the same code. Create a second hold, release it, and see status released while the first hold stays accepted.

### Implementation for User Story 4

- [X] T018 [US4] Add `acceptHold(code)` and `releaseHold(code)` to `lib/ferry.ts`. Transitions: `requested` → `accepted`; `requested` → `released`; `accepted` → `released`. Reject `accepted` → `accepted`. Reject any transition whose current status is `released`. Unknown code does not change holds. The confirmation code stays the same. Releasing one hold does not change another.
- [X] T019 [US4] Add `acceptHold` and `releaseHold` in `app/actions.ts`. Each reads `code`, calls `lib/ferry.ts`, redirects to `/staff`, and revalidates `/`, `/hold`, and `/staff`.
- [X] T020 [US4] On `app/staff/page.tsx`, a requested hold posts Accept (`acceptHold`) and Release (`releaseHold`). An accepted hold posts Release only. A released hold has neither control.

**Checkpoint**: Accept and release are visible on the staff counter.

---

## Phase 7: User Story 5 - Mark a sailing delayed (Priority: P2)

**Goal**: Staff mark a sailing delayed. Visitors see it on the public board, and new holds for it are refused.

**Independent Test**: Mark 09:00 Harbour Mouth delayed. `/` and `/staff` show it Delayed. A new hold for it is refused. Other sailings stay on time.

### Implementation for User Story 5

- [X] T021 [US5] Add `markDelayed` in `app/actions.ts`. Read `sailingId`, call `markDelayed` in `lib/ferry.ts`, redirect to `/staff`, and revalidate `/`, `/hold`, and `/staff`. An unknown id does not change state.
- [X] T022 [US5] On `app/staff/page.tsx`, each on-time sailing posts `sailingId` to `markDelayed`. A sailing that is already delayed is labelled Delayed and has no control that sets `delayed` back to false.
- [X] T023 [US5] Keep `app/page.tsx` reading `listSailings` from `lib/ferry.ts` so a sailing marked delayed on `/staff` shows "Delayed" on `/` and the other sailings stay unchanged

**Checkpoint**: All five user stories are functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Constitution check and the five acceptance checks

- [X] T024 Confirm `lib/ferry.ts` is the only store for sailings and holds, and that the app has no payment and no account UI
- [X] T025 Run the five checks in `specs/001-ferry-seat-holds/quickstart.md` on port 3111

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Then sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Uses the board's sailings but is independently testable
- **User Story 3 (P1)**: Depends on `requestHold` from User Story 2. Adds the delayed refusal and `markDelayed` in the store
- **User Story 4 (P2)**: Depends on holds existing from User Story 2. Adds accept and release
- **User Story 5 (P2)**: Depends on `markDelayed` in the store from User Story 3 and the staff page from User Story 2. Adds the staff control and the board update

### Within Each User Story

- Store changes in `lib/ferry.ts` before the server action
- Server action before the page that posts to it
- Story complete before moving to the next priority

### Parallel Opportunities

- T002–T007 can run in parallel (different config files)
- T009 and T010 can run in parallel after Setup
- T013 and T015 can run in parallel after T012 (action file vs staff list)
- User Stories 4 and 5 both edit `app/staff/page.tsx` and `app/actions.ts`, so they stay sequential

---

## Parallel Example: User Story 2

```bash
# After T012 (requestHold in lib/ferry.ts):
Task: "T013 Add requestHold in app/actions.ts"
Task: "T015 Create the hold list in app/staff/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open `/` and read today's sailings
5. Demo the board if that is all that is needed

### Incremental Delivery

1. Setup + Foundational → store and shell ready
2. User Story 1 → public board
3. User Story 2 → hold plus confirmation code
4. User Story 3 → delayed sailing refused
5. User Story 4 → accept and release
6. User Story 5 → staff mark delayed, board updates
7. Polish → five checks in `quickstart.md`

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (`app/page.tsx`)
   - Developer B: User Story 2 store and hold page
3. Stories 3–5 share `lib/ferry.ts`, `app/actions.ts`, and `app/staff/page.tsx`, so one person continues those

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

## Phase 9: Convergence

- [X] T026 Show "That hold does not exist." on `app/staff/page.tsx` when `acceptHold` or `releaseHold` in `app/actions.ts` is given a code that is not in `lib/ferry.ts`, and leave every other hold unchanged, per spec edge case (partial)
