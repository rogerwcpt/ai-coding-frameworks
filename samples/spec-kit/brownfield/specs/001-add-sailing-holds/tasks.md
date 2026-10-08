---

description: "Task list for add sailing holds"
---

# Tasks: Add Sailing Holds

**Input**: Design documents from `/specs/001-add-sailing-holds/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested. No test-runner tasks. Acceptance is the quickstart in the polish phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- App Router pages and components under `app/`
- Domain store in `lib/sailings.ts`
- Feature docs in `specs/001-add-sailing-holds/`
- Do not add dependencies in `package.json`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the brownfield app before editing it

- [X] T001 Confirm `package.json` stays on next 16.3.8 and react 19.2.8 with scripts `dev`, `build`, `start`, and `lint` only, and add no dependencies
- [X] T002 [P] Confirm `app/sailing-table.tsx`, `app/actions.ts`, and `lib/sailings.ts` exist and that the delay form still posts `sailingId` through `markSailingDelayed` before any hold work

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Hold records exist in the sailing store before any story adds behaviour

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Extend the store in `lib/sailings.ts` with `holds: Hold[]` on `globalThis.__northWharf`. Hold fields: `id` string; `code` string (8 characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, unique among all holds); `sailingId` string; `visitorName` string (trimmed, 1–80 characters); `seatCount` number (integer 1–20); `status` `requested` | `accepted` | `released`. If the store object already exists without `holds`, set `holds` to `[]` without resetting sailings. Do not change `listSailings` or `markDelayed`
- [X] T004 Add `listHolds` in `lib/sailings.ts` returning copies in append order, each joined with the sailing's `destination`, `departs`, and `delayed`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Request a hold (Priority: P1) 🎯 MVP

**Goal**: A visitor submits an on-time sailing, a name, and a seat count on `/hold` and sees a confirmation code

**Independent Test**: On The Island 09:00, submit name `Asha Reed` and seats `2`. The page shows an 8-character code plus that sailing, name, and seat count. No staff action.

### Implementation for User Story 1

- [X] T005 [US1] Implement `requestHold` in `lib/sailings.ts` so an on-time sailing, a trimmed name of 1–80 characters, and an integer seat count from 1 to 20 append a `requested` hold and return it with `destination` and `departs`. Draw `code` with `crypto.randomInt` from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` and redraw if that code already exists
- [X] T006 [US1] Add `requestHoldAction(prevState, formData)` in `app/actions.ts` that reads `sailingId`, `name`, and `seatCount`, calls `requestHold`, and returns either the confirmation (code, departure, destination, name, seat count) or a refusal message. Revalidate `/hold` and `/staff`
- [X] T007 [US1] Create the client form in `app/hold-form.tsx` with `useActionState` and fields `sailingId` (select), `name` (text), and `seatCount` (number), showing the confirmation block from `specs/001-add-sailing-holds/contracts/hold-request.md` on success
- [X] T008 [US1] Create `app/hold/page.tsx` that awaits `connection()`, lists today's sailings including delayed ones as select options labelled with departure time and destination, and renders the form from `app/hold-form.tsx`
- [X] T009 [P] [US1] Add a Hold link to `/hold` in `app/layout.tsx` beside Today and Staff

**Checkpoint**: User Story 1 is testable on `/hold` for an on-time sailing

---

## Phase 4: User Story 2 - Refuse a delayed sailing (Priority: P1)

**Goal**: A delayed sailing cannot be held, and invalid requests do not get a code

**Independent Test**: Mark Green Jetty 11:15 delayed, request a hold for it, and see the refusal with no confirmation code. A hold for an on-time sailing still succeeds.

### Implementation for User Story 2

- [X] T010 [US2] In `requestHold` in `lib/sailings.ts`, create nothing and return these reasons: delayed sailing → "A delayed sailing cannot be held."; unknown sailing id → "That sailing is not on today's board."; blank name → "Name is required."; name longer than 80 characters → "Name is too long."; seat count not an integer from 1 to 20 → "Seat count must be a whole number from 1 to 20."
- [X] T011 [US2] Show the refusal string from `requestHoldAction` in `app/hold-form.tsx` with no confirmation code, including "A delayed sailing cannot be held."

**Checkpoint**: Delayed and invalid requests are refused; on-time requests still return a code

---

## Phase 5: User Story 4 - Delay control stays as it is (Priority: P1)

**Goal**: Staff still mark a sailing delayed with the existing button, and `/` shows Delayed

**Independent Test**: With the sailing table only, mark one sailing delayed on `/staff` and see Delayed on `/`. The button reads Delayed and is disabled. Hold actions are not in that cell.

### Implementation for User Story 4

- [X] T012 [US4] Keep the delay form in `app/sailing-table.tsx` matching `specs/001-add-sailing-holds/contracts/delay-control.md`: hidden `sailingId`, button label `Mark delayed` when on time, label `Delayed` and disabled when delayed, action `markSailingDelayed`. Do not put hold actions in the status cell
- [X] T013 [US4] Keep `markDelayed` in `lib/sailings.ts` setting only `delayed` to true, and keep `markSailingDelayed` in `app/actions.ts` revalidating `/` and `/staff` without creating or updating holds

**Checkpoint**: The original delay control still works and is unchanged in behaviour

---

## Phase 6: User Story 3 - Staff accept or release a hold (Priority: P2)

**Goal**: Staff see holds on `/staff` and can accept or release them without changing the delay control

**Independent Test**: Accept one requested hold and release another. Status and the same confirmation code show on `/staff`. The sailing's on-time or delayed status does not change because of accept or release.

### Implementation for User Story 3

- [X] T014 [US3] Implement `acceptHold` and `releaseHold` in `lib/sailings.ts`. Transitions: `requested` → `accepted` via `acceptHold`; `requested` → `released` and `accepted` → `released` via `releaseHold`; `released` has none. A missing id or any other transition does nothing. Neither function changes `Sailing.delayed`
- [X] T015 [US3] Add `acceptHoldAction` and `releaseHoldAction` in `app/actions.ts`, each reading hidden `holdId` from `FormData`, calling the matching function in `lib/sailings.ts`, and revalidating `/staff` and `/hold`
- [X] T016 [US3] Create `app/staff-holds.tsx` listing each hold's departure time, destination, visitor name, seat count, confirmation code, and status. Accept is shown only for `requested`. Release is shown for `requested` or `accepted`. Use `acceptHoldAction` and `releaseHoldAction` from `app/actions.ts` per `specs/001-add-sailing-holds/contracts/staff-holds.md`
- [X] T017 [US3] Render the staff hold section from `app/staff-holds.tsx` below `SailingTable` in `app/staff/page.tsx`. Keep `<SailingTable sailings={sailings} staff />`. Replace the sentence that says there is no hold desk yet

**Checkpoint**: Staff can accept and release holds while the delay buttons stay as they are

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Public board copy and end-to-end validation

- [X] T018 [P] Update the intro on `app/page.tsx` so `/` still lists today's sailings as on time or delayed and points visitors to `/hold`. Do not change `SailingTable` on that page
- [X] T019 Run `npm run lint`, then run `specs/001-add-sailing-holds/quickstart.md` on port 3112 and stop the dev server

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on the user stories above

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational. No dependency on other stories
- **User Story 2 (P1)**: Starts after User Story 1 because it adds refusal branches to `requestHold` and the hold form
- **User Story 4 (P1)**: Starts after Foundational. No dependency on hold stories. It guards files User Story 3 must not rewrite
- **User Story 3 (P2)**: Starts after User Story 1 (a hold must exist to accept) and after User Story 4 (delay form stays out of the hold section). Independent of User Story 2 for accept/release logic

### Within Each User Story

- Store functions before server actions
- Server actions before the components that call them
- Page assembly after the component it renders
- Story complete before the next story that edits the same file

### Parallel Opportunities

- T002 can run alongside T001
- T009 can run alongside T007 and T008 (different file)
- T018 can run alongside other polish once `/hold` exists
- User Story 4 can be checked while User Story 1 is in progress because it does not edit `app/hold-form.tsx` or `app/hold/page.tsx`

---

## Parallel Example: User Story 1

```bash
# After T006 lands, different files:
Task: "T007 Create the client form in app/hold-form.tsx"
Task: "T009 Add a Hold link in app/layout.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Request a hold on an on-time sailing and read the confirmation code

### Incremental Delivery

1. Setup + Foundational → hold records can be stored
2. User Story 1 → confirmation code on `/hold`
3. User Story 2 → delayed sailings refused
4. User Story 4 → delay button still marks a sailing delayed
5. User Story 3 → staff accept and release
6. Polish → public copy and quickstart on port 3112

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Then:
   - Developer A: User Story 1, then User Story 2
   - Developer B: User Story 4
3. After User Story 1 and User Story 4: Developer A or B takes User Story 3

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests were not requested; do not add a test runner
- Do not edit the delay button behaviour while completing later tasks
- Commit after each task or logical group
- Stop at any checkpoint to validate the story independently
