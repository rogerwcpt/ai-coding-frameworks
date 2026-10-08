# Contract: Hold request

Page: `/hold`

The visitor chooses a sailing, enters a name and a seat count, and submits once.

## Fields

| Name | Control | Notes |
| --- | --- | --- |
| sailingId | select | Options are today's sailings, including delayed ones, labelled with departure time and destination. Value is the sailing id. |
| name | text | Visitor name. |
| seatCount | number | Seats requested. |

## Success

The action returns a confirmation and does not create a second hold on re-render. The page shows:

- The confirmation code
- The sailing's departure time and destination
- The name
- The seat count

The hold status in the store is `requested`.

## Refusal

The action returns a visible reason and no confirmation code. Nothing is appended to `holds`.

| Condition | Reason shown |
| --- | --- |
| Delayed sailing | A delayed sailing cannot be held. |
| Unknown sailing id | That sailing is not on today's board. |
| Blank name | Name is required. |
| Name longer than 80 characters | Name is too long. |
| Seat count not an integer from 1 to 20 | Seat count must be a whole number from 1 to 20. |

Submitting this form does not change `delayed` on any sailing.
