<!--
Sync Impact Report
- Version change: unratified template → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Small TypeScript Ferry App
  - [PRINCIPLE_2_NAME] → II. No Database
  - [PRINCIPLE_3_NAME] → III. No Payments
  - [PRINCIPLE_4_NAME] → IV. No Accounts
  - [PRINCIPLE_5_NAME] → V. Single Store Module
- Added sections:
  - Definition of Done
  - Scope Boundary
- Removed sections: none (template placeholders replaced)
- Follow-up TODOs: none
-->

# North Wharf Ferries Constitution

## Core Principles

### I. Small TypeScript Ferry App

North Wharf Ferries MUST remain a small TypeScript application for one harbour
counter. The product MUST NOT grow into a platform, a multi-service system, or
a shared library.

Rationale: Two staff run one counter. A small app is enough to meet the
definition of done.

### II. No Database

Sailings and holds MUST live in process memory. The app MUST NOT add a
database, an ORM, a file-backed store, or any external persistence service.

Rationale: State only has to last for a running demo of today's sailings and
holds.

### III. No Payments

The app MUST NOT take payment, store card data, calculate fares, or integrate
a payment provider.

Rationale: A hold is a seat request, not a purchase.

### IV. No Accounts

The app MUST NOT require visitor or staff accounts, login, sessions, or an
identity provider. A hold is identified by the visitor's name and a
confirmation code.

Rationale: Two staff share one counter. Visitors are not registered users.

### V. Single Store Module

Sailings and holds MUST live in one TypeScript module. Pages and actions MUST
read and write that module. They MUST NOT keep a second copy of sailing or
hold state.

Rationale: One module is the source of truth, so a hold and a delay cannot
diverge across layers.

## Definition of Done

The five acceptance checks in `brief.md` are the definition of done:

1. A visitor sees today's sailings and which are delayed.
2. A visitor can request a hold and is shown a confirmation code.
3. A delayed sailing cannot be held.
4. Staff can accept or release a hold.
5. Staff can mark a sailing delayed.

Work is complete only when all five checks pass against the running app.

## Scope Boundary

Behavior beyond `brief.md` is out of scope until this constitution is amended.
That includes payments, accounts, persistence, extra routes, and a second
store for sailings or holds.

## Governance

This constitution supersedes conflicting local practice for this sample. An
amendment MUST update this file, bump the version using the policy below, and
set Last Amended to the change date (ISO YYYY-MM-DD).

Versioning:

- MAJOR: a principle is removed or redefined in a backward-incompatible way.
- MINOR: a principle or section is added, or guidance is materially expanded.
- PATCH: wording is clarified without changing the rule.

Compliance review: planning and implementation MUST check these principles and
the definition of done before the work is called complete. `brief.md` states
the product. This file states the rules.

**Version**: 1.0.0 | **Ratified**: 2026-10-06 | **Last Amended**: 2026-10-06
