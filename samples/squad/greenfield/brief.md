# North Wharf Ferries

Build this Next.js app in this folder. Use the current create-next-app defaults: TypeScript, App Router, Tailwind, ESLint. No database. Sailings and holds live in a TypeScript module. No payments and no accounts.

North Wharf Ferries is a one-counter harbour ferry. Two staff. A visitor can hold seats. Staff accept or release the hold, and can mark a sailing delayed.

Routes:

- `/` today's sailings
- `/hold` request a hold: sailing, name, seat count
- `/staff` mark a sailing delayed, accept a hold, or release a hold

Acceptance:

- A visitor sees today's sailings and which are delayed.
- A visitor can request a hold and is shown a confirmation code.
- A delayed sailing cannot be held.
- Staff can accept or release a hold.
- Staff can mark a sailing delayed.
