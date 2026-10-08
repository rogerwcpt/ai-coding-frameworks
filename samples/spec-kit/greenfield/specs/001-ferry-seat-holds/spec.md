# Feature Specification: Ferry Seat Holds

**Feature Branch**: `001-ferry-seat-holds`

**Created**: 2026-10-06

**Status**: Draft

**Input**: User description: "North Wharf Ferries is a one-counter harbour ferry. Two staff. A visitor can hold seats. Staff accept or release the hold, and can mark a sailing delayed. Pages: today's sailings, request a hold (sailing, name, seat count) with a confirmation code, and a staff counter to mark a sailing delayed, accept a hold, or release a hold. A visitor sees today's sailings and which are delayed. A visitor can request a hold and is shown a confirmation code. A delayed sailing cannot be held. Staff can accept or release a hold. Staff can mark a sailing delayed. No payments and no accounts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See today's sailings (Priority: P1)

A visitor opens the public board and sees every sailing scheduled for today, including which ones are delayed.

**Why this priority**: The board is the reason a visitor walks up to the counter. Holds and delays only make sense once the day's sailings are visible.

**Independent Test**: Open the public board with the day's timetable loaded and confirm each sailing shows its name, departure time, and whether it is on time or delayed.

**Acceptance Scenarios**:

1. **Given** today's timetable is published and no sailing is delayed, **When** a visitor opens the public board, **Then** every sailing for today is listed as on time.
2. **Given** staff have marked one sailing delayed, **When** a visitor opens the public board, **Then** that sailing is shown as delayed and the other sailings stay on time.

---

### User Story 2 - Request a hold (Priority: P1)

A visitor asks the counter to hold seats on a sailing that is still on time, gives their name and how many seats they need, and is shown a confirmation code.

**Why this priority**: Holding seats is the visitor's main action. The code is how staff later match the request.

**Independent Test**: Submit one hold for an on-time sailing with a name and a seat count, and read the confirmation code on the confirmation screen.

**Acceptance Scenarios**:

1. **Given** an on-time sailing, **When** a visitor submits a hold with a sailing, a name, and a seat count, **Then** the visitor is shown a confirmation code for that hold.
2. **Given** a hold was just created, **When** staff open the counter, **Then** they can see that hold, including its confirmation code, sailing, name, seat count, and that it is still requested.

---

### User Story 3 - Refuse a hold on a delayed sailing (Priority: P1)

A visitor cannot hold seats on a sailing that is delayed. The counter explains the refusal and does not issue a confirmation code.

**Why this priority**: A delayed sailing must not collect new holds. This is one of the five acceptance checks.

**Independent Test**: Mark one sailing delayed, try to hold it, and confirm the request is refused with no new confirmation code.

**Acceptance Scenarios**:

1. **Given** a sailing is delayed, **When** a visitor submits a hold for that sailing, **Then** the hold is refused, no confirmation code is shown, and no new hold is created.
2. **Given** one sailing is delayed and another is on time, **When** a visitor holds the on-time sailing, **Then** that hold succeeds and the delayed sailing still cannot be held.

---

### User Story 4 - Accept or release a hold (Priority: P2)

Staff accept a requested hold, or release a hold so those seats are no longer held.

**Why this priority**: Two staff share the counter. Accepting and releasing is how a request becomes a kept hold or is given up.

**Independent Test**: Create a hold, accept it, and confirm the status is accepted. Create another hold, release it, and confirm the status is released.

**Acceptance Scenarios**:

1. **Given** a hold is requested, **When** staff accept it, **Then** the hold is shown as accepted and its confirmation code stays the same.
2. **Given** a hold is requested or accepted, **When** staff release it, **Then** the hold is shown as released and its confirmation code stays the same.
3. **Given** two holds exist, **When** staff release one of them, **Then** the other hold is unchanged.

---

### User Story 5 - Mark a sailing delayed (Priority: P2)

Staff mark a sailing delayed. Visitors then see that delay on the public board, and new holds for that sailing are refused.

**Why this priority**: Delay is the other staff action, and it changes what visitors are allowed to hold.

**Independent Test**: Mark one on-time sailing delayed, then check the public board and try to hold that sailing.

**Acceptance Scenarios**:

1. **Given** a sailing is on time, **When** staff mark it delayed, **Then** the staff counter and the public board both show that sailing as delayed.
2. **Given** a sailing is already delayed, **When** staff mark it delayed again, **Then** it stays delayed and no extra change is recorded.

---

### Edge Cases

- A hold with a blank name is refused, and no confirmation code is issued.
- A seat count below 1, above 12, or not a whole number is refused, and no confirmation code is issued.
- A hold for a sailing that is not on today's board is refused, and no confirmation code is issued.
- Staff cannot accept or release a hold that does not exist. The counter says so and other holds stay as they were.
- A released hold cannot be accepted again. It stays released.
- An accepted hold cannot be accepted a second time. It stays accepted.
- Marking one sailing delayed does not delay the others.
- A hold that already exists when its sailing is later marked delayed stays on the counter. Staff can still accept or release it. New holds for that sailing are refused.
- Releasing a hold does not change the sailing's on-time or delayed status.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The public board MUST list every sailing scheduled for today.
- **FR-002**: Each sailing on the public board MUST show its name, departure time, and whether it is on time or delayed.
- **FR-003**: A visitor MUST be able to request a hold by choosing a sailing, entering a name, and entering a seat count.
- **FR-004**: A successful hold MUST show the visitor a confirmation code before they leave the confirmation screen.
- **FR-005**: A confirmation code MUST be unique among holds created in the same counter session.
- **FR-006**: The system MUST refuse a new hold when the chosen sailing is delayed, and MUST NOT issue a confirmation code for that attempt.
- **FR-007**: The system MUST refuse a hold when the name is blank, the seat count is not a whole number from 1 to 12, or the sailing is not on today's board.
- **FR-008**: Staff MUST be able to mark an on-time sailing delayed, after which visitors see it as delayed.
- **FR-009**: Staff MUST be able to accept a requested hold. The hold then shows as accepted and keeps the same confirmation code.
- **FR-010**: Staff MUST be able to release a requested or accepted hold. The hold then shows as released and keeps the same confirmation code.
- **FR-011**: The staff counter MUST list each hold with its confirmation code, sailing, name, seat count, and status (requested, accepted, or released).
- **FR-012**: The product MUST NOT take payment and MUST NOT require an account for visitors or staff.
- **FR-013**: Visitors use two pages: the public board of today's sailings, and the hold request page. Staff use one counter page to mark a delay, accept a hold, or release a hold.

### Key Entities

- **Sailing**: One departure on today's timetable. It has a name, a departure time, and a status of on time or delayed.
- **Hold**: A visitor's request to keep seats on one sailing. It has a confirmation code, the visitor's name, a seat count, the sailing it refers to, and a status of requested, accepted, or released.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can tell, from one view and within 10 seconds, which of today's sailings are delayed and which are on time.
- **SC-002**: A visitor with a valid sailing, name, and seat count receives a confirmation code in a single submission, in under 1 minute.
- **SC-003**: 100% of hold attempts on a delayed sailing are refused, and none of those attempts produce a confirmation code.
- **SC-004**: Staff can accept a requested hold and can release a requested or accepted hold, and can see the new status immediately afterward.
- **SC-005**: After staff mark a sailing delayed, the next view of the public board shows that sailing as delayed.
- **SC-006**: All five acceptance checks (see the board, receive a code, refuse a delayed sailing, accept or release a hold, mark a sailing delayed) pass in one counter session.

## Assumptions

- Today's timetable is a fixed list of four crossings, all on time when the counter opens: 09:00 Harbour Mouth, 11:30 Robben Island, 14:00 Harbour Mouth, and 16:30 Robben Island. There is no date picker and no other day.
- A visitor may place more than one hold, including more than one hold on the same on-time sailing. The board does not track remaining seat capacity.
- A party size is a whole number from 1 to 12 seats. That limit is a counter rule, not a boat capacity.
- The confirmation code is a short code of letters and digits that the visitor can read aloud. It does not change when staff accept or release the hold.
- A delay lasts for the rest of the counter session. Staff cannot mark a delayed sailing back to on time.
- Holds that already exist when a sailing is marked delayed remain. Only new holds are refused.
- Accept applies only to a requested hold. Release applies to a requested or accepted hold. Released is final.
- The counter does not ask who the staff member is. Anyone at the staff page can mark a delay, accept a hold, or release a hold.
- Holds and delays last for the current counter session. They are not kept after the counter closes, and nothing is sent to a payment service.
- The public board is the home page, the hold request is its own page, and the staff counter is its own page.
