# Change

This folder already has the North Wharf Ferries app. `/` lists today's sailings. `/staff` can mark a sailing delayed. There are no holds.

Add holds. Leave the existing delay control working.

- A visitor can request a hold (sailing, name, seat count) and is shown a confirmation code.
- A delayed sailing cannot be held.
- Staff can accept or release a hold.

Add `/hold`, and extend `/staff`. Do not add a database. Keep sailings and holds in a TypeScript module.

Out of scope: payments, accounts, and any rewrite of the delay control.
