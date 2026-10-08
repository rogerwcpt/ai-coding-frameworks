# Contract: Delay control (unchanged)

This contract records the behaviour that holds must not replace.

## Staff table

`app/sailing-table.tsx`, when `staff` is set, renders one form per sailing:

- Hidden field `sailingId` with the sailing id
- Submit button labelled `Mark delayed` when `delayed` is false
- The same button labelled `Delayed`, disabled, when `delayed` is true
- Action: `markSailingDelayed`

## Public board

When `staff` is omitted, the status cell is the text `Delayed` or `On time`. There is no delay button.

## Action

`markSailingDelayed` reads `sailingId`, calls `markDelayed` when the id is non-empty, and revalidates `/` and `/staff`. `markDelayed` sets `delayed` to true on a matching sailing and does not create or update holds.

## Obligation

Implementation of holds must leave this form, its labels, its disabled state, and `markDelayed`'s effect in place. Hold actions are not placed in the status cell.
