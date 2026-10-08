# Data Model: Ferry Seat Holds

Both entities live in one module, `lib/ferry.ts`. Nothing else stores them.

## Sailing

A departure on today's timetable.

| Field | Type | Rules |
| --- | --- | --- |
| id | string | Stable id. One of `harbour-0900`, `island-1130`, `harbour-1400`, `island-1630`. |
| destination | string | `Harbour Mouth` or `Robben Island`. |
| departs | string | `09:00`, `11:30`, `14:00`, or `16:30`. |
| delayed | boolean | `false` at seed. Staff may set it to `true`. It never returns to `false`. |

Seed, in departure order:

| id | destination | departs | delayed |
| --- | --- | --- | --- |
| harbour-0900 | Harbour Mouth | 09:00 | false |
| island-1130 | Robben Island | 11:30 | false |
| harbour-1400 | Harbour Mouth | 14:00 | false |
| island-1630 | Robben Island | 16:30 | false |

## Hold

A visitor's request to keep seats on one sailing.

| Field | Type | Rules |
| --- | --- | --- |
| code | string | Six characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. Unique in the session. Immutable. |
| sailingId | string | Must match a sailing id. |
| name | string | Trimmed. Must be non-empty. |
| seats | number | Whole number from 1 to 12 inclusive. |
| status | `requested` \| `accepted` \| `released` | Starts as `requested`. |

## State transitions

Hold:

- `requested` → `accepted` (staff accept)
- `requested` → `released` (staff release)
- `accepted` → `released` (staff release)
- `accepted` → `accepted` is rejected
- `released` → anything is rejected

Sailing:

- on time → delayed (staff)
- delayed → delayed is a no-op success (stays delayed)
- delayed → on time is not offered

## Validation for a new hold

Refuse, create nothing, and issue no code when any of these are true:

- The sailing id is not on today's board.
- That sailing is delayed.
- The name is blank after trimming.
- The seat count is missing, not a whole number, or outside 1–12.

A sailing that becomes delayed later does not change holds that already point at it.

## Relationships

- A sailing has zero or more holds.
- A hold belongs to exactly one sailing.
- There is no seat-capacity field. Several holds may name the same sailing.
