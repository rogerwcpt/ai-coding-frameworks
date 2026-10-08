# Quickstart: Ferry Seat Holds

Validation guide for the five acceptance checks. Details of fields and statuses are in [data-model.md](data-model.md) and [contracts/pages.md](contracts/pages.md).

## Setup

From this sample folder (`samples/spec-kit/greenfield`):

```bash
npm install
npm run dev -- --port 3111
```

Open `http://localhost:3111`. Stop the server when finished.

## Checks

1. **Board.** Open `/`. All four sailings are listed. Each shows On time. None shows Delayed yet.
2. **Hold.** Open `/hold`. Choose 11:30 Robben Island, enter a name, enter `2`, and submit. The page shows a confirmation code. `/staff` lists that hold as requested with the same code.
3. **Delayed sailing cannot be held.** On `/staff`, mark 09:00 Harbour Mouth delayed. Return to `/`. That sailing shows Delayed. On `/hold`, submit a hold for 09:00 Harbour Mouth. The page shows a refusal and no confirmation code. The staff list does not gain a hold for that attempt.
4. **Accept and release.** On `/staff`, accept the hold from check 2. Its status shows accepted and the code is unchanged. Request a second hold for 14:00 Harbour Mouth. Release that second hold. Its status shows released. The first hold stays accepted.
5. **Mark delayed.** Check 3 already marks a sailing delayed and the board shows it. Mark 16:30 Robben Island delayed as well. `/` and `/staff` both show it Delayed. The other sailings are unchanged.

## Expected refusals

- Blank name, seats outside 1–12, or a non-whole seat count: refusal, no code.
- Accept on a released hold, or release on an already released hold: that hold does not change status.
