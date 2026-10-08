# Research: Add Sailing Holds

## Decision: Extend the existing in-memory store

**Decision**: Add a `holds` array to the `Store` already kept on `globalThis.__northWharf` in `lib/sailings.ts`. If a hot reload left a store without `holds`, initialize that array in place.

**Rationale**: The constitution requires sailings and holds in that module and forbids a database. The sailing list already uses this store, so staff and visitors share one desk.

**Alternatives considered**: A second module that imports the sailing store (splits the desk). A database or file (forbidden). A new `globalThis` key (two stores that can drift).

## Decision: Show the confirmation with `useActionState`

**Decision**: The hold request form is a client component. Its server action takes `(prevState, formData)` and returns either a confirmation (code, sailing, name, seats) or a refusal message. Follow the Next.js 16 forms guide: validation messages from a server action use React `useActionState`.

**Rationale**: The delay action returns void and relies on revalidation because the next page render shows the new status. A confirmation code has to come back on the submission itself. `useActionState` is the documented pattern in `node_modules/next/dist/docs/01-app/02-guides/forms.md`. No schema library is added.

**Alternatives considered**: Redirect to `?code=` (works, but the result depends on the URL and a second read). Inline `"use server"` function inside the page (harder to keep validation next to the store). A toast library (new dependency, not needed).

## Decision: Staff accept and release follow the delay action

**Decision**: Accept and release are server actions with a hidden hold id, the same shape as `markSailingDelayed`. They call the module, then `revalidatePath` for `/staff` and `/hold`. They do not use `useActionState`.

**Rationale**: The next render of `/staff` shows the new status from the store. That is the same mechanism the delay button already uses. Keeping that shape avoids a second client form pattern on the staff desk.

**Alternatives considered**: One client form for the whole staff page (would wrap the delay control and risk changing it).

## Decision: Leave the delay button untouched

**Decision**: Do not edit the delay form inside `app/sailing-table.tsx`. Do not change `markSailingDelayed` or `markDelayed` behaviour. Holds render beside that table, not inside the status cell.

**Rationale**: The brief and constitution forbid replacing the delay control. The button text, disabled state, and hidden `sailingId` field are the behaviour under test.

**Alternatives considered**: A status cell that shows both delay and hold actions (replaces the control's layout and is easier to break). A different delay widget (forbidden).

## Decision: Confirmation codes are short and unique in the store

**Decision**: Generate an 8-character code from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` with `crypto.randomInt`. If the code is already on a hold, draw again.

**Rationale**: The spec asks for a short code of letters and digits, unique among current holds. The alphabet drops characters that are easy to misread on a desk list. `crypto` is in Node; no package is required.

**Alternatives considered**: A UUID (accurate, poor to read aloud). A sequential number (guessable and looks like a seat number). `Math.random` (weaker, no benefit).

## Decision: Validate in the module, not a new library

**Decision**: `requestHold` enforces the spec rules and returns a reason string. The form displays that string. Rules: sailing exists; sailing is not delayed; name trims to 1–80 characters; seat count is an integer from 1 to 20.

**Rationale**: Constitution principle V rejects extra services. Zod is not installed. One function keeps the page and any future caller on the same rules.

**Alternatives considered**: HTML `required` only (misses the delayed-sailing rule and the seat cap). Zod (new dependency for four checks).

## Decision: Manual quickstart plus lint

**Decision**: Do not add a test runner. `npm run lint` checks the edit. The running app on port 3112 is the acceptance check, using [quickstart.md](./quickstart.md).

**Rationale**: The app has no test script. Adding one is outside the holds change. The constitution wants the behaviour demonstrable in the app.

**Alternatives considered**: Vitest or Playwright (new toolchain for a one-page addition).
