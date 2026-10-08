# Data Model: Add Sailing Holds

Source of truth: `lib/sailings.ts`. No database.

## Sailing (existing)

| Field | Type | Rules |
| --- | --- | --- |
| id | string | Stable id already seeded (`island-0900`, `green-1115`, `breakwater-1400`, `island-1630`) |
| destination | string | Display name |
| departs | string | Display time, `HH:MM` |
| delayed | boolean | `false` on time, `true` delayed. Only set to `true` by `markDelayed`. Never cleared. |

`listSailings` returns copies. `markDelayed(id)` sets `delayed` on a known id and ignores an unknown id. Holds must not write this flag.

## Hold (new)

| Field | Type | Rules |
| --- | --- | --- |
| id | string | Internal id, unique, not shown as the confirmation code |
| code | string | 8 characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`, unique among all holds in the store |
| sailingId | string | Must match a sailing id |
| visitorName | string | Trimmed, 1–80 characters |
| seatCount | number | Integer 1–20 |
| status | `requested` \| `accepted` \| `released` | Starts as `requested` |

A hold belongs to one sailing. A sailing may have many holds.

## Store

```text
Store
  sailings: Sailing[]
  holds: Hold[]
```

Kept on `globalThis.__northWharf`. Seed sailings only when the store is first created. Seed holds as an empty array. If the object already exists without `holds`, set `holds` to `[]` without resetting sailings.

## requestHold

Input: `sailingId`, `name`, `seatCount` (seat count may arrive as a string from the form).

Refuse, creating nothing, when:

- The sailing id is not on today's board. Reason: sailing was not found.
- The sailing is delayed. Reason: a delayed sailing cannot be held.
- The trimmed name is empty or longer than 80 characters. Reason: name is required (or too long).
- The seat count is not an integer from 1 to 20. Reason: seat count must be a whole number from 1 to 20.

Otherwise append a `requested` hold and return it, including the code and the sailing's destination and departure time for the confirmation.

## State transitions

```text
requested → accepted   acceptHold
requested → released   releaseHold
accepted  → released   releaseHold
released  → (none)
```

`acceptHold` on a missing id or a hold that is not `requested` does nothing. `releaseHold` on a missing id or a `released` hold does nothing. Neither function changes `Sailing.delayed`.

## listHolds

Return copies of every hold, newest last (append order), with the sailing's destination, departure time, and delayed flag joined on so the staff desk does not need a second lookup to render a row.
