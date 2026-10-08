# UI Contract: Pages

Three routes. No accounts, no payments, no other pages.

## `GET /` Public board

Shows every sailing from the data model, in departure order.

Each row shows destination, departure time, and either "On time" or "Delayed".

The header links to Today (`/`), Hold (`/hold`), and Staff (`/staff`).

## `GET /hold` Hold request

Form fields:

| Field | Control | Posted name |
| --- | --- | --- |
| Sailing | select of today's sailings, including delayed ones so the refusal can be seen | `sailingId` |
| Name | text | `name` |
| Seats | number | `seats` |

Submit posts to the `requestHold` action.

After a successful post the response is `GET /hold?code={code}`. The page shows that confirmation code in full, plus the sailing, name, and seat count.

After a refused post the response is `GET /hold?error={message}`. The page shows the message and does not show a confirmation code. No hold was created.

## `GET /staff` Staff counter

Two sections.

Sailings: each on-time sailing has a control that posts `sailingId` to `markDelayed`. A sailing that is already delayed is labelled Delayed and has no second action that would clear it.

Holds: each hold shows code, sailing destination and time, name, seats, and status. A requested hold has Accept and Release. An accepted hold has Release only. A released hold has neither.

Accept posts `code` to `acceptHold`. Release posts `code` to `releaseHold`.

After a staff post the response is `GET /staff`. The lists show the new sailing or hold status.

## Server actions

All three live in `app/actions.ts`. They call `lib/ferry.ts` and do not store sailings or holds themselves.

| Action | Input | Success | Refusal |
| --- | --- | --- | --- |
| `requestHold` | `sailingId`, `name`, `seats` | Redirect `/hold?code=` | Redirect `/hold?error=` and no new hold |
| `markDelayed` | `sailingId` | Redirect `/staff`. Sailing is delayed. Unknown id does not change state. | Already delayed stays delayed. |
| `acceptHold` | `code` | Redirect `/staff`. Status is accepted. | Unknown code, or status other than requested, does not change that hold. |
| `releaseHold` | `code` | Redirect `/staff`. Status is released. | Unknown code, or status `released`, does not change that hold. |

Each successful mutation revalidates `/`, `/hold`, and `/staff`.
