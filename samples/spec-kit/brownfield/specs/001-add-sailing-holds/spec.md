# Feature Specification: Add Sailing Holds

**Feature Branch**: `001-add-sailing-holds`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "This folder already has the North Wharf Ferries app. `/` lists today's sailings. `/staff` can mark a sailing delayed. There are no holds. Add holds. Leave the existing delay control working. A visitor can request a hold (sailing, name, seat count) and is shown a confirmation code. A delayed sailing cannot be held. Staff can accept or release a hold. Add `/hold`, and extend `/staff`. Out of scope: payments, accounts, and any rewrite of the delay control."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Request a hold (Priority: P1)

A visitor opens the hold request page, chooses one of today's on-time sailings, gives their name and how many seats they need, and submits. The page shows a confirmation code for that hold.

**Why this priority**: Without a confirmation code there is no hold. This is the visitor-facing value of the change.

**Independent Test**: On an on-time sailing, submit a name and a valid seat count and read a confirmation code back on the same result. No staff action is required.

**Acceptance Scenarios**:

1. **Given** today's board includes an on-time sailing, **When** a visitor submits that sailing, a name, and a seat count of 2, **Then** the hold is recorded and the visitor is shown a confirmation code.
2. **Given** a successful hold request, **When** the visitor reads the result, **Then** the confirmation code is unique among holds currently on the desk and is shown together with the sailing, name, and seat count.
3. **Given** two successful requests for the same on-time sailing, **When** both visitors finish, **Then** each sees a different confirmation code.

---

### User Story 2 - Refuse a delayed sailing (Priority: P1)

A visitor tries to hold a sailing that is already delayed. The desk refuses the request and does not issue a confirmation code.

**Why this priority**: A delayed sailing must not be held. This is an explicit business rule, not a later enhancement.

**Independent Test**: Mark a sailing delayed, then submit a hold for it, and confirm the refusal shows no confirmation code. Other on-time sailings can still be held.

**Acceptance Scenarios**:

1. **Given** a sailing is delayed, **When** a visitor submits a hold for that sailing with a valid name and seat count, **Then** the request is refused, no hold is created, and no confirmation code is shown.
2. **Given** one sailing is delayed and another is on time, **When** a visitor requests a hold on the on-time sailing, **Then** that request still succeeds and shows a confirmation code.
3. **Given** a hold already exists for a sailing, **When** staff later mark that sailing delayed, **Then** the existing hold remains available for staff to accept or release, and any new hold request for that sailing is refused.

---

### User Story 3 - Staff accept or release a hold (Priority: P2)

Staff open the staff desk, see the holds visitors have requested, and either accept a hold or release it.

**Why this priority**: The visitor can request a hold on their own. Staff need a way to confirm it or give the seats back.

**Independent Test**: Create one hold, accept it from the staff desk, create a second hold, and release that one. Each action is visible on the staff desk without using the delay control.

**Acceptance Scenarios**:

1. **Given** a hold is requested, **When** staff accept it, **Then** the hold is shown as accepted and still shows the same confirmation code, sailing, name, and seat count.
2. **Given** a hold is requested or accepted, **When** staff release it, **Then** the hold is shown as released and can no longer be accepted.
3. **Given** a hold is released, **When** staff view the desk, **Then** no accept action is offered for that hold.
4. **Given** a hold is accepted, **When** staff view the desk, **Then** the sailing is not marked delayed by the act of accepting the hold.

---

### User Story 4 - Delay control stays as it is (Priority: P1)

Staff can still mark a sailing delayed with the existing delay control. The public board shows that sailing as delayed. The control is not replaced by a different kind of control.

**Why this priority**: Holds are an addition. The delay notice visitors already rely on must keep working.

**Independent Test**: With no holds involved, mark one sailing delayed from the staff desk and confirm the public board shows that sailing as delayed and the others as on time.

**Acceptance Scenarios**:

1. **Given** a sailing is on time, **When** staff use the existing delay control for that sailing, **Then** the staff desk shows it as delayed and the public board shows it as delayed.
2. **Given** the delay control has been used, **When** staff look at that sailing again, **Then** the same control shows the delayed state and does not offer a second, different delay action.
3. **Given** holds are listed on the staff desk, **When** staff mark a different sailing delayed, **Then** the delay control for each sailing still behaves as before.

---

### Edge Cases

- A missing or blank name is refused. No confirmation code is issued.
- A seat count that is not a whole number from 1 to 20 inclusive is refused. No confirmation code is issued.
- A sailing that is not on today's board is refused. No confirmation code is issued.
- Submitting the hold form does not mark a sailing delayed.
- Accepting or releasing a hold does not change a sailing's on-time or delayed status.
- Releasing a hold does not issue a new confirmation code.
- The visitor is not asked to sign in, pay, or create an account.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Visitors MUST be able to open a hold request page at `/hold` for today's sailings.
- **FR-002**: A hold request MUST collect the sailing, the visitor's name, and the seat count.
- **FR-003**: A successful request MUST show the visitor a confirmation code for that hold.
- **FR-004**: The confirmation code MUST be unique among holds currently on the desk.
- **FR-005**: A request for a delayed sailing MUST be refused and MUST NOT create a hold or show a confirmation code.
- **FR-006**: Staff MUST be able to mark a sailing delayed with the existing delay control, and the public board at `/` MUST show that sailing as delayed.
- **FR-007**: The delay control MUST keep its current behaviour: one action that marks the sailing delayed and then shows that delayed state. It MUST NOT be replaced by a different control.
- **FR-008**: Staff MUST see requested holds on `/staff`, including sailing, name, seat count, confirmation code, and status.
- **FR-009**: Staff MUST be able to accept a requested hold. The confirmation code MUST stay the same.
- **FR-010**: Staff MUST be able to release a requested or accepted hold. A released hold MUST NOT be acceptable afterwards.
- **FR-011**: Accepting or releasing a hold MUST NOT change whether the sailing is on time or delayed.
- **FR-012**: The public board MUST continue to list today's sailings and their on-time or delayed status.
- **FR-013**: Invalid requests (blank name, seat count outside 1–20, unknown sailing) MUST be refused with a visible reason and no confirmation code.
- **FR-014**: The change MUST NOT add payments or visitor accounts.

### Key Entities

- **Sailing**: One of today's departures. Visitors and staff recognise it by departure time and destination. It is either on time or delayed.
- **Hold**: A visitor's request for seats on one sailing. It records the sailing, the name, the seat count, a confirmation code, and a status of requested, accepted, or released.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor who has a sailing, a name, and a seat count can submit one request and see a confirmation code in under one minute.
- **SC-002**: 100% of hold requests for a delayed sailing are refused and show no confirmation code.
- **SC-003**: Staff can accept a requested hold in one action and release a hold in one action, and the desk shows the new status immediately after each action.
- **SC-004**: After staff mark one sailing delayed, the next view of the public board shows that sailing as delayed and leaves the other sailings unchanged.
- **SC-005**: On a first attempt with a valid on-time sailing, name, and seat count, a visitor receives a confirmation code without staff help.

## Assumptions

- The name is required after trimming spaces, and it is at most 80 characters. The brief did not set a length; 80 is enough for a person's name on a paper desk list.
- The seat count is a whole number from 1 to 20. The brief did not set a party size. Twenty is a sanity limit so a typo cannot reserve a nonsense party. Today's sailings have no published seat capacity, so a valid request is not checked against remaining seats.
- More than one hold may exist for the same on-time sailing. Each request gets its own confirmation code. The brief does not forbid this.
- A new hold starts as requested. Staff accept it or release it. Staff may also release a hold they have already accepted. Accept is only for a requested hold.
- A confirmation code is a short code of letters and digits. The visitor sees it on the result of the request. Staff see the same code on the desk so they can match the visitor.
- If a sailing is marked delayed after a hold exists, that hold stays on the desk until staff release it. Only new requests are refused. The brief forbids holding a delayed sailing; it does not say to cancel holds already taken.
- The visitor is not told later whether staff accepted or released the hold. There is no account to send that to. Staff status on `/staff` is the record.
- Holds last while the desk is open for today. Starting the desk afresh begins from today's sailings with no holds, the same way the board itself starts the day.
- Payments, accounts, and any replacement of the delay control are out of scope.
- The public board does not become a hold list. It keeps showing on time or delayed. The hold request is a separate page.
