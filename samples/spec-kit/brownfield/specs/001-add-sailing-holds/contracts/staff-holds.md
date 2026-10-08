# Contract: Staff holds

Page: `/staff`, in a section below the existing sailing table.

Each hold shows departure time, destination, visitor name, seat count, confirmation code, and status (`requested`, `accepted`, or `released`).

## Accept

| Name | Control |
| --- | --- |
| holdId | hidden, the hold's internal id |

Shown only when status is `requested`. On submit, that hold becomes `accepted`. The confirmation code stays the same. The sailing's delayed flag does not change. A hold that is not `requested` is left unchanged.

## Release

| Name | Control |
| --- | --- |
| holdId | hidden, the hold's internal id |

Shown when status is `requested` or `accepted`. On submit, that hold becomes `released`. No new code is issued. Accept is no longer shown. The sailing's delayed flag does not change. A `released` hold is left unchanged.

The delay control is not part of this contract. See [delay-control.md](./delay-control.md).
