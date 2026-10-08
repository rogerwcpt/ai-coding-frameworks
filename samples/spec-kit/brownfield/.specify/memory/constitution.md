<!--
Sync Impact Report
Version change: unratified template → 1.0.0
Modified principles: none (initial ratification; placeholders replaced)
Added sections:
- Core Principles I–V
- Technology Constraints
- Change Boundaries
Removed sections: none
Follow-up TODOs: none
Rationale: first concrete constitution for the existing North Wharf Ferries app.
MINOR would apply to a later principle addition; this is the initial 1.0.0.
-->

# North Wharf Ferries Constitution

## Core Principles

### I. Preserve Working Controls
Existing visitor and staff behaviour MUST keep working after a change.
The staff delay control MUST still mark a sailing delayed, and `/` MUST
still show that sailing as delayed. A change MUST NOT replace that control
with a different control or rewrite its behaviour.

Rationale: this is a brownfield app. The delay path is the regression
baseline for every later feature.

### II. Module Store
Sailings and holds MUST live in the TypeScript module `lib/sailings.ts`.
The project MUST NOT add a database, ORM, or other persistence service.
New domain state extends that module.

Rationale: the app already keeps today's sailings in process memory. Holds
belong in the same store so staff and visitors see one source of truth.

### III. Incremental Change
A feature MUST specify and implement only the behaviour named in its brief.
It MUST NOT rewrite routes, copy, or controls that already meet current
behaviour, except for the smallest edits required to add the new behaviour.

Rationale: a holds desk is an addition. It is not a new product.

### IV. Exercisable Acceptance
Every user-facing rule in the active spec MUST be demonstrable in the
running app. That includes the happy path, the refusal cases the spec
names, and the preserved delay control. A change is incomplete while a
named behaviour cannot be shown.

Rationale: acceptance is what a visitor or a staff member can do, not a
document that only describes it.

### V. Simplicity
The app MUST stay a Next.js UI over the TypeScript module. Payments,
accounts, queues, and extra services MUST NOT be added unless a later
amendment names them. Any structure beyond the current server-action and
module pattern MUST be justified in the plan.

Rationale: unused machinery hides whether the requested behaviour works.

## Technology Constraints

- The stack is the installed Next.js App Router app, React, and TypeScript.
- Mutations go through server actions. Pages read the module store.
- Domain data stays in `lib/sailings.ts`, using the existing in-memory
  store. No database.
- UI additions match the current pages: same layout, same table, same
  delay button behaviour.

## Change Boundaries

The following stay out of scope unless this constitution is amended:

- Payments and customer accounts.
- Replacing or redesigning the delay control.
- A rewrite of the sailing list, staff page, or store.

A change may add a route and extend `/staff` when the spec requires it.
It MUST leave the delay control able to mark a sailing delayed.

## Governance

This constitution supersedes conflicting local practice for this app.
Specs, plans, and tasks MUST comply with these principles. A review MUST
reject work that adds a database, rewrites the delay control, or expands
into payments or accounts.

Amendments change `.specify/memory/constitution.md` only, with a version
bump and a sync impact report:

- MAJOR: a principle is removed or redefined so existing specs no longer
  comply.
- MINOR: a principle or section is added or materially expanded.
- PATCH: wording clarifications that do not change obligations.

`RATIFICATION_DATE` is the first adoption date. `LAST_AMENDED_DATE` is the
date of the latest content change. Compliance is checked when a spec,
plan, or implementation is reviewed: preserved delay behaviour, module
store only, and scope limited to the active brief.

**Version**: 1.0.0 | **Ratified**: 2026-10-06 | **Last Amended**: 2026-10-06
