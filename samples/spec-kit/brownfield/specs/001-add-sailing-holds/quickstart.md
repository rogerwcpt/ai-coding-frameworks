# Quickstart: Add Sailing Holds

Validation guide for the holds change. Details of fields and refusals are in [contracts/](./contracts/). The store rules are in [data-model.md](./data-model.md).

## Setup

From this sample's directory:

```bash
npm run dev -- --port 3112
```

Open `http://localhost:3112`. The header links to Today (`/`), Hold (`/hold`), and Staff (`/staff`).

Stop the server when finished (Ctrl+C in that terminal).

## 1. Delay control still works

1. Open `/staff`. Each on-time sailing has a **Mark delayed** button.
2. Mark **Green Jetty 11:15** delayed.
3. The staff button for that sailing reads **Delayed** and does not submit again.
4. Open `/`. That sailing shows **Delayed**. The other three show **On time**.

## 2. Hold an on-time sailing

1. Open `/hold`.
2. Choose **The Island 09:00**, name `Asha Reed`, seats `2`, and submit.
3. The page shows a confirmation code of 8 letters and digits, plus that sailing, name, and seat count.
4. Submit a second hold for the same sailing with a different name. The code is different.

## 3. Refuse a delayed sailing

1. On `/hold`, choose **Green Jetty 11:15** (delayed in step 1), name `Sam Cole`, seats `1`, and submit.
2. The page says a delayed sailing cannot be held. No confirmation code is shown.

## 4. Staff accept and release

1. Open `/staff`. The delay buttons are unchanged. Holds are listed under them.
2. Accept Asha Reed's hold. Status becomes **accepted** and the same code remains. The Island 09:00 is still on time.
3. Release the second hold. Status becomes **released** and Accept is gone.
4. Release Asha Reed's accepted hold. It becomes **released**.

## 5. Invalid request

1. On `/hold`, submit a blank name or a seat count of `0`.
2. The page shows a reason and no confirmation code.

## Lint

```bash
npm run lint
```

Expect a clean run for the files this change touches.
